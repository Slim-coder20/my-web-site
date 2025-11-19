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
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[project]/app/api/stripe/webhook/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Route API : POST /api/stripe/webhook
 *
 * Cette route reçoit les événements Stripe via webhook pour mettre à jour
 * le statut des commandes après paiement.
 *
 * FLUX DE TRAVAIL :
 * 1. Stripe envoie un événement après chaque action (paiement réussi, échoué, etc.)
 * 2. On vérifie la signature du webhook pour s'assurer qu'il vient bien de Stripe
 * 3. Si l'événement est "checkout.session.completed" (paiement réussi) :
 *    - On retrouve l'Order via le stripeSessionId
 *    - On met à jour le statut de l'Order à "paid"
 *
 * IMPORTANT : Cette route doit être configurée dans le Dashboard Stripe
 * avec l'URL : https://ton-domaine.com/api/stripe/webhook
 * et l'événement : checkout.session.completed
 *
 * SÉCURITÉ : La signature du webhook est vérifiée pour éviter les requêtes frauduleuses.
 */ __turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$stripe$2f$esm$2f$stripe$2e$esm$2e$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/stripe/esm/stripe.esm.node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prisma.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$resend$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/resend/dist/index.mjs [app-route] (ecmascript)");
;
;
;
;
// Initialisation du client Stripe
const stripe = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$stripe$2f$esm$2f$stripe$2e$esm$2e$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-10-29.clover"
});
// Secret du webhook (récupéré depuis le Dashboard Stripe)
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
// Initialisation du client Resend pour l'envoi d'emails
const resend = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$resend$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Resend"](process.env.RESEND_API_KEY);
async function POST(request) {
    console.log("🔔 Webhook reçu !");
    // Récupération du body brut (important pour la vérification de signature)
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");
    console.log("📝 Signature présente:", !!signature);
    if (!signature) {
        console.error("❌ Pas de signature dans les headers");
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "No signature"
        }, {
            status: 400
        });
    }
    let event;
    /**
   * VÉRIFICATION DE LA SIGNATURE DU WEBHOOK
   *
   * Stripe signe chaque webhook avec le secret pour garantir l'authenticité.
   * Si la signature ne correspond pas, cela signifie que la requête
   * ne vient pas de Stripe et on la rejette.
   */ try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
        console.log("✅ Signature vérifiée, type d'événement:", event.type);
    } catch (err) {
        console.error("❌ Webhook signature verification failed:", err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Invalid signature"
        }, {
            status: 400
        });
    }
    /**
   * GESTION DE L'ÉVÉNEMENT checkout.session.completed
   *
   * Cet événement est envoyé par Stripe quand un paiement est complété avec succès.
   * On utilise le stripeSessionId pour retrouver l'Order dans notre base de données
   * et mettre à jour son statut à "paid".
   */ if (event.type === "checkout.session.completed") {
        console.log("💳 Événement checkout.session.completed reçu");
        const session = event.data.object;
        console.log("📦 Session ID:", session.id);
        try {
            /**
       * MISE À JOUR DU STATUT DE L'ORDER
       *
       * On retrouve l'Order via le stripeSessionId (qui a été stocké lors de la création)
       * et on met à jour son statut de "pending" à "paid".
       */ // Vérifier d'abord si la commande existe
            console.log(`🔍 Recherche de la commande avec stripeSessionId: ${session.id}`);
            const existingOrder = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].order.findUnique({
                where: {
                    stripeSessionId: session.id
                }
            });
            if (!existingOrder) {
                // Vérifier s'il y a des commandes en pending (pour debug)
                const pendingOrders = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].order.findMany({
                    where: {
                        status: "pending"
                    },
                    select: {
                        id: true,
                        stripeSessionId: true,
                        email: true
                    },
                    take: 5
                });
                console.log(`⚠️  Commande non trouvée pour la session: ${session.id}`);
                console.log(`📋 Commandes en pending trouvées: ${pendingOrders.length}`);
                if (pendingOrders.length > 0) {
                    console.log(`📋 Dernières commandes pending:`, pendingOrders.map((o)=>({
                            id: o.id,
                            sessionId: o.stripeSessionId?.substring(0, 20) + "..."
                        })));
                }
                // Retourner 200 pour ne pas faire échouer le webhook
                // C'est normal pour les événements de test qui n'ont pas de commande réelle
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    received: true,
                    message: "Order not found (test event or session mismatch)"
                });
            }
            const updatedOrder = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].order.update({
                where: {
                    stripeSessionId: session.id
                },
                data: {
                    status: "paid"
                },
                include: {
                    items: {
                        include: {
                            product: true
                        }
                    }
                }
            });
            console.log(`✅ Order updated to paid for session: ${session.id}`);
            /**
       * ENVOI DE L'EMAIL DE CONFIRMATION DE COMMANDE
       *
       * Après la mise à jour du statut à "paid", on envoie un email de confirmation
       * au client avec les détails de sa commande.
       */ if (process.env.RESEND_API_KEY) {
                try {
                    // Formatage du montant total
                    const totalAmount = (updatedOrder.amountTotal / 100).toFixed(2);
                    // Construction de la liste des produits commandés
                    const productsList = updatedOrder.items.map((item)=>`
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">
                <strong>${item.product.title}</strong>
              </td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">
                ${item.quantity}
              </td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">
                ${(item.unitPrice / 100).toFixed(2)} €
              </td>
            </tr>
          `).join("");
                    // Envoi de l'email de confirmation
                    await resend.emails.send({
                        from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
                        to: updatedOrder.email,
                        subject: "Confirmation de votre commande - Slim Abida",
                        html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #333; border-bottom: 2px solid #333; padding-bottom: 10px;">
                  Merci pour votre commande !
                </h2>
                
                <p>Bonjour,</p>
                
                <p>Nous avons bien reçu votre commande et votre paiement a été confirmé.</p>
                
                <h3 style="color: #333; margin-top: 30px;">Détails de votre commande</h3>
                
                <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                  <thead>
                    <tr style="background-color: #f5f5f5;">
                      <th style="padding: 10px; text-align: left; border-bottom: 2px solid #333;">Produit</th>
                      <th style="padding: 10px; text-align: center; border-bottom: 2px solid #333;">Quantité</th>
                      <th style="padding: 10px; text-align: right; border-bottom: 2px solid #333;">Prix</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${productsList}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colspan="2" style="padding: 10px; text-align: right; font-weight: bold; border-top: 2px solid #333;">
                        Total :
                      </td>
                      <td style="padding: 10px; text-align: right; font-weight: bold; border-top: 2px solid #333;">
                        ${totalAmount} €
                      </td>
                    </tr>
                  </tfoot>
                </table>
                
                <p style="margin-top: 30px;">
                  Votre commande sera traitée dans les plus brefs délais.
                </p>
                
                <p>
                  Si vous avez des questions, n'hésitez pas à nous contacter.
                </p>
                
                <p style="margin-top: 30px; color: #666; font-size: 14px;">
                  Cordialement,<br>
                  L'équipe Slim Abida
                </p>
              </div>
            `
                    });
                    console.log(`Confirmation email sent to ${updatedOrder.email}`);
                } catch (emailError) {
                    // On log l'erreur mais on ne bloque pas le webhook
                    // Le paiement est déjà confirmé, l'email est secondaire
                    console.error("Error sending confirmation email:", emailError);
                }
            }
        } catch (error) {
            console.error("❌ Error updating order:", error);
            // Logger plus de détails pour le débogage
            if (error instanceof Error) {
                console.error("Error message:", error.message);
                console.error("Error stack:", error.stack);
            }
            // Retourner 200 pour ne pas faire échouer le webhook
            // Stripe réessaiera automatiquement si nécessaire
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Failed to update order",
                details: ("TURBOPACK compile-time truthy", 1) ? error instanceof Error ? error.message : String(error) : "TURBOPACK unreachable"
            }, {
                status: 200
            } // Retourner 200 pour éviter que Stripe réessaie indéfiniment
            );
        }
    }
    // Retour d'une confirmation à Stripe
    console.log("✅ Webhook traité avec succès");
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        received: true
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__862016d2._.js.map