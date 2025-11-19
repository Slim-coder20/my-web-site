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
"[project]/app/api/stripe/verify-payment/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Route API : POST /api/stripe/verify-payment
 *
 * Cette route vérifie le statut d'un paiement Stripe et met à jour
 * la commande si le paiement est réussi.
 *
 * UTILISATION :
 * Appelée depuis la page de succès après un paiement Stripe
 * pour vérifier et mettre à jour le statut de la commande.
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
// Initialisation du client Resend pour l'envoi d'emails
const resend = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$resend$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Resend"](process.env.RESEND_API_KEY);
async function POST(request) {
    try {
        const { sessionId } = await request.json();
        if (!sessionId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "sessionId is required"
            }, {
                status: 400
            });
        }
        console.log(`🔍 Vérification du paiement pour la session: ${sessionId}`);
        // Récupérer la session Stripe
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        // Vérifier si le paiement est réussi
        if (session.payment_status !== "paid") {
            console.log(`⚠️  Paiement non complété pour la session: ${sessionId}`);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                status: session.payment_status,
                message: "Payment not completed"
            });
        }
        console.log(`✅ Paiement confirmé pour la session: ${sessionId}`);
        // Rechercher la commande
        let order = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].order.findUnique({
            where: {
                stripeSessionId: sessionId
            }
        });
        // Si pas trouvé par stripeSessionId, essayer avec orderId des métadonnées
        if (!order && session.metadata?.orderId) {
            console.log(`🔍 Commande non trouvée par sessionId, recherche par orderId: ${session.metadata.orderId}`);
            order = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].order.findUnique({
                where: {
                    id: parseInt(session.metadata.orderId)
                }
            });
            // Si trouvé par orderId, mettre à jour le stripeSessionId
            if (order) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].order.update({
                    where: {
                        id: order.id
                    },
                    data: {
                        stripeSessionId: sessionId
                    }
                });
                console.log(`✅ stripeSessionId mis à jour pour la commande ${order.id}`);
            }
        }
        if (!order) {
            console.log(`⚠️  Commande non trouvée pour la session: ${sessionId}`);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Order not found"
            });
        }
        // Si la commande est déjà payée, ne rien faire
        if (order.status === "paid") {
            console.log(`ℹ️  Commande ${order.id} déjà payée`);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                status: "paid",
                message: "Order already paid"
            });
        }
        // Mettre à jour le statut de la commande
        const updatedOrder = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].order.update({
            where: {
                id: order.id
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
        console.log(`✅ Commande ${order.id} mise à jour à "paid"`);
        // Envoyer l'email de confirmation
        if (process.env.RESEND_API_KEY) {
            try {
                const totalAmount = (updatedOrder.amountTotal / 100).toFixed(2);
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
                console.log(`✅ Email de confirmation envoyé à ${updatedOrder.email}`);
            } catch (emailError) {
                console.error("❌ Erreur lors de l'envoi de l'email:", emailError);
            }
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            status: "paid",
            message: "Order updated successfully",
            orderId: updatedOrder.id
        });
    } catch (error) {
        console.error("❌ Erreur lors de la vérification du paiement:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to verify payment",
            details: ("TURBOPACK compile-time truthy", 1) ? error instanceof Error ? error.message : String(error) : "TURBOPACK unreachable"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__3878e7c6._.js.map