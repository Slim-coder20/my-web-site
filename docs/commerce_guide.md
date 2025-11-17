## E‑commerce Discographie (MySQL + Stripe) — Méthode et Guide

Objectif: récupérer les albums depuis une base MySQL (tables `Product`, `Order`, `OrderItem`), permettre l’achat via Stripe Checkout, et déployer sur votre serveur o2switch.


### 1) Pré‑requis
- **Comptes/accès**: o2switch (cPanel + MySQL), Stripe (mode test d’abord).
- **Projet**: Next.js (App Router), Node 18+, npm.
- **Clés/secret** Stripe: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` (mode test).


### 2) Choix technique: Prisma (ORM) + MySQL
Prisma simplifie le schéma, les migrations et l’accès DB.

1. Installer Prisma et le client MySQL
```bash
npm i -D prisma
npm i @prisma/client
npx prisma init
```
2. Dans `.env`, configurez la chaîne MySQL fournie par o2switch:
```bash
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DB_NAME"
```
3. Modèle Prisma (`prisma/schema.prisma`) minimal pour discographie:
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model Product {
  id          Int       @id @default(autoincrement())
  slug        String    @unique
  title       String
  description String?
  priceCents  Int       // prix en centimes (ex: 1299 = 12,99€)
  coverUrl    String?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  orderItems  OrderItem[]
}

model Order {
  id              Int         @id @default(autoincrement())
  email           String
  stripeSessionId String?     @unique
  amountTotal     Int
  status          String      // 'created' | 'paid' | 'failed' | 'canceled'
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
  items           OrderItem[]
}

model OrderItem {
  id        Int     @id @default(autoincrement())
  orderId   Int
  productId Int
  quantity  Int     @default(1)
  unitPrice Int     // copie du prix au moment de l'achat (en centimes)

  order   Order   @relation(fields: [orderId], references: [id])
  product Product @relation(fields: [productId], references: [id])
}
```
4. Appliquer le schéma:
```bash
npx prisma migrate dev --name init_discography
```
5. (Optionnel) Script de seed `prisma/seed.ts` pour insérer des albums de test.


### 3) Variables d’environnement (développement)
Créez `.env.local` à la racine:
```bash
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DB_NAME"
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```


### 4) API: Produits (lecture) et Checkout (commande)
Structure proposée (App Router):
- `app/api/products/route.ts` — GET: liste des albums
- `app/api/checkout/route.ts` — POST: crée une session Stripe Checkout
- `app/api/stripe/webhook/route.ts` — POST: traite les événements Stripe (paiement réussi)

Exemple minimal — `app/api/products/route.ts`:
```ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(products);
}
```

Exemple — `app/api/checkout/route.ts`:
```ts
import Stripe from "stripe";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-06-20" });
const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, items } = await req.json();
  // items: [{ productId: number, quantity: number }]

  // Récupérer les produits
  const productIds = items.map((i: any) => i.productId);
  const products = await prisma.product.findMany({ where: { id: { in: productIds } } });

  // Construire line_items Stripe
  const line_items = items.map((i: any) => {
    const p = products.find((x) => x.id === i.productId)!;
    return {
      quantity: i.quantity,
      price_data: {
        currency: "eur",
        product_data: { name: p.title },
        unit_amount: p.priceCents,
      },
    };
  });

  // Créer Order (status 'created')
  const amountTotal = items.reduce((sum: number, i: any) => {
    const p = products.find((x) => x.id === i.productId)!;
    return sum + p.priceCents * i.quantity;
  }, 0);
  const order = await prisma.order.create({
    data: {
      email,
      amountTotal,
      status: "created",
      items: {
        create: items.map((i: any) => {
          const p = products.find((x) => x.id === i.productId)!;
          return { productId: p.id, quantity: i.quantity, unitPrice: p.priceCents };
        }),
      },
    },
  });

  // Créer la session Checkout
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items,
    customer_email: email,
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/discography/success?orderId=${order.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/discography/cancel`,
    metadata: { orderId: String(order.id) },
  });

  // Sauvegarder l'id de session Stripe
  await prisma.order.update({ where: { id: order.id }, data: { stripeSessionId: session.id } });

  return NextResponse.json({ url: session.url });
}
```

Exemple — `app/api/stripe/webhook/route.ts`:
```ts
import Stripe from "stripe";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export const config = { api: { bodyParser: false } } as any; // Next App Router: pas nécessaire côté edge

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const sig = request.headers.get("stripe-signature") as string;
  const buf = Buffer.from(await request.arrayBuffer());
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-06-20" });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = Number(session.metadata?.orderId);
    await prisma.order.update({ where: { id: orderId }, data: { status: "paid" } });
  }

  return NextResponse.json({ received: true });
}
```


### 5) UI Discographie
- `app/discography/page.tsx`: lire la liste via `fetch("/api/products")`, afficher les albums (cover, titre, prix), bouton “Acheter”.
- Au clic sur “Acheter”, POST vers `/api/checkout` avec `{ email, items }` puis rediriger vers `session.url`.

Extrait du bouton achat (client component):
```ts
async function checkout(items) {
  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, items }),
  });
  const { url } = await res.json();
  window.location.href = url;
}
```


### 6) Déploiement sur o2switch
o2switch offre MySQL + hébergement web. Pour Next.js, 2 options:

1) NodeJS App (recommandé si vous avez besoin d’API/server)
- Dans cPanel: Application NodeJS (ou Passenger App Manager).
- Uploader le projet (via Git ou File Manager), installer les dépendances `npm ci`.
- Définir `NODE_ENV=production` et vos variables dans l’interface (DATABASE_URL, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, NEXT_PUBLIC_SITE_URL).
- Build: `npm run build` puis démarrer l’app (`npm start`) ou config Passenger pour pointer sur `.output/server/index.mjs` si vous utilisez `output: standalone`.
- Ouvrir le port interne n’est pas nécessaire; o2switch proxifie via Apache.

2) Export statique (non adapté ici car on a des routes API et webhook).

Base MySQL:
- Créez la base et l’utilisateur dans cPanel (MySQL® Databases).
- Mettez à jour `DATABASE_URL` côté app.
- Exécutez les migrations sur le serveur si nécessaire:
```bash
npx prisma migrate deploy
```

Webhook Stripe:
- Dans le Dashboard Stripe (mode test), ajoutez un endpoint vers `https://votre-domaine.tld/api/stripe/webhook` et récupérez `STRIPE_WEBHOOK_SECRET`.


### 7) Sécurité et conformité
- Ne stockez jamais les clés Stripe côté client.
- Validez les quantités/prix côté serveur (on utilise `price_data` depuis la DB, pas les données du client).
- Activez HTTPS (certificat AutoSSL sur o2switch).
- RGPD: si vous collectez des emails, ajoutez une politique de confidentialité et gérez la suppression sur demande.


### 8) Tests rapides
- Mode test Stripe: utilisez des cartes de test (`4242 4242 4242 4242`).
- Vérifiez: création d’`Order` en `created`, passage à `paid` après webhook.
- Tentez une annulation pour vérifier les redirections `cancel_url`.


### 9) Checklist de mise en prod
- [ ] Variables `.env` renseignées dans cPanel
- [ ] `npx prisma migrate deploy` exécuté
- [ ] Webhook Stripe configuré (URL + secret)
- [ ] Build `npm run build` OK
- [ ] Logs (Passenger/Node) surveillés au démarrage


### 10) Aller plus loin
- Comptes clients, emails de confirmation (Stripe + SMTP), factures PDF.
- Codes promo (Stripe Coupons/Promotions) ou bundles d’albums.
- Téléchargements numériques sécurisés (lien signé après paiement).


Ce guide vous donne l’ossature complète: schéma MySQL, endpoints API, intégration Stripe et déploiement o2switch. Implémentons ensuite la page `discography` et la UI d’achat quand vous êtes prêt.


