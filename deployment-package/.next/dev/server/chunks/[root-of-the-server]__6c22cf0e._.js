module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/child_process [external] (child_process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("child_process", () => require("child_process"));

module.exports = mod;
}),
"[externals]/@prisma/client [external] (@prisma/client, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@prisma/client", () => require("@prisma/client"));

module.exports = mod;
}),
"[project]/lib/prisma.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "prisma",
    ()=>prisma
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
;
const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma ?? new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]({
    log: ("TURBOPACK compile-time truthy", 1) ? [
        "query",
        "error",
        "warn"
    ] : "TURBOPACK unreachable"
});
if ("TURBOPACK compile-time truthy", 1) globalForPrisma.prisma = prisma;
}),
"[project]/app/api/checkout/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Route API : POST /api/checkout
 * 
 * Cette route gère la création d'une session de paiement Stripe Checkout.
 * 
 * FLUX DE TRAVAIL :
 * 1. Reçoit productId et email depuis le formulaire de checkout
 * 2. Récupère le produit depuis la base de données MySQL via Prisma
 * 3. Crée une Order en statut "pending" dans la table Order
 * 4. Crée un OrderItem associé dans la table OrderItem
 * 5. Crée une session Stripe Checkout avec les détails du produit
 * 6. Met à jour l'Order avec le stripeSessionId pour pouvoir la retrouver plus tard
 * 7. Retourne l'URL de la session Stripe pour rediriger l'utilisateur
 * 
 * IMPORTANT : L'Order est créée AVANT le paiement pour pouvoir la tracker.
 * Le statut passera à "paid" via le webhook Stripe après paiement réussi.
 */ __turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$stripe$2f$esm$2f$stripe$2e$esm$2e$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/stripe/esm/stripe.esm.node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prisma.ts [app-route] (ecmascript)");
;
;
;
// Initialisation du client Stripe avec la clé secrète
const stripe = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$stripe$2f$esm$2f$stripe$2e$esm$2e$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-10-29.clover"
});
async function POST(request) {
    try {
        // Récupération des données du body (productId et email)
        const body = await request.json();
        const { productId, email } = body;
        // Validation des données requises
        if (!productId || !email) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Product ID and email are required"
            }, {
                status: 400
            });
        }
        // Récupération du produit depuis la base de données MySQL
        const product = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].product.findUnique({
            where: {
                id: parseInt(productId)
            }
        });
        if (!product) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Product not found"
            }, {
                status: 404
            });
        }
        /**
     * ÉTAPE 1 : Création de l'Order en base de données
     * 
     * On crée l'Order AVANT le paiement pour pouvoir la tracker.
     * Statut initial : "pending" (en attente de paiement)
     * Le statut sera mis à jour à "paid" par le webhook Stripe après paiement réussi.
     */ const order = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].order.create({
            data: {
                email,
                amountTotal: product.priceCents,
                status: "pending",
                items: {
                    // Création simultanée de l'OrderItem associé
                    create: {
                        productId: product.id,
                        quantity: 1,
                        unitPrice: product.priceCents
                    }
                }
            }
        });
        /**
     * ÉTAPE 2 : Création de la session Stripe Checkout
     * 
     * Stripe Checkout est une page de paiement hébergée par Stripe.
     * On configure :
     * - Les items à payer (l'album avec son prix)
     * - Les URLs de redirection (succès/annulation)
     * - L'email du client
     * - Les métadonnées pour retrouver l'Order (orderId)
     */ const session = await stripe.checkout.sessions.create({
            payment_method_types: [
                "card"
            ],
            line_items: [
                {
                    price_data: {
                        currency: "eur",
                        product_data: {
                            name: product.title,
                            description: product.description || undefined,
                            images: product.coverUrl ? [
                                product.coverUrl
                            ] : undefined
                        },
                        unit_amount: product.priceCents
                    },
                    quantity: 1
                }
            ],
            mode: "payment",
            success_url: `${("TURBOPACK compile-time value", "http://localhost:3000") || "http://localhost:3000"}/discographie?success=true&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${("TURBOPACK compile-time value", "http://localhost:3000") || "http://localhost:3000"}/discographie?canceled=true`,
            customer_email: email,
            metadata: {
                orderId: order.id.toString()
            }
        });
        /**
     * ÉTAPE 3 : Mise à jour de l'Order avec le stripeSessionId
     * 
     * On stocke le stripeSessionId dans l'Order pour pouvoir :
     * - Retrouver l'Order depuis le webhook Stripe
     * - Vérifier le statut du paiement si besoin
     */ await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].order.update({
            where: {
                id: order.id
            },
            data: {
                stripeSessionId: session.id
            }
        });
        // Retour de l'URL de la session Stripe pour rediriger l'utilisateur
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            sessionId: session.id,
            url: session.url
        });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to create checkout session"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__6c22cf0e._.js.map