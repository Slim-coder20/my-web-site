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
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[project]/app/api/contact/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Cette route est utilisée pour envoyer un email depuis le formulaire de contact
__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$resend$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/resend/dist/index.mjs [app-route] (ecmascript)");
;
;
// Vérification de la clé API Resend
if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY n'est pas définie dans les variables d'environnement");
}
const resend = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$resend$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Resend"](process.env.RESEND_API_KEY);
async function POST(request) {
    try {
        // Vérification de la clé API
        if (!process.env.RESEND_API_KEY) {
            console.error("RESEND_API_KEY manquante");
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Configuration serveur manquante"
            }, {
                status: 500
            });
        }
        // Récupération des données du formulaire
        const { name, email, subject, message } = await request.json();
        // Validation des champs requis
        if (!name || !email || !message || !subject) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Tous les champs sont requis (nom, email, sujet, message)"
            }, {
                status: 400
            });
        }
        // Validation de l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Adresse email invalide"
            }, {
                status: 400
            });
        }
        // En mode test, Resend ne permet d'envoyer qu'à l'adresse email du compte
        // Pour la production, il faut vérifier un domaine sur resend.com/domains
        const contactEmail = process.env.CONTACT_EMAIL || "slimabidaproject@gmail.com";
        // En développement/test, utiliser l'adresse email du compte Resend
        // (Remplacez par votre adresse email associée au compte Resend)
        const recipientEmail = ("TURBOPACK compile-time truthy", 1) ? process.env.RESEND_TEST_EMAIL || "slimdev20@gmail.com" // Email du compte Resend pour les tests
         : "TURBOPACK unreachable"; // Email de production
        // Fonction pour échapper le HTML (sécurité)
        const escapeHtml = (text)=>{
            const map = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#039;"
            };
            return text.replace(/[&<>"']/g, (m)=>map[m]);
        };
        // Échapper les données pour éviter les injections HTML
        const safeName = escapeHtml(name);
        const safeEmail = escapeHtml(email);
        const safeSubject = escapeHtml(subject || "Non spécifié");
        const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");
        // Envoi de l'email via Resend
        const response = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: recipientEmail,
            subject: safeSubject || "Nouveau message depuis le formulaire de contact",
            html: `
        <h2>Nouveau message de contact</h2>
        <p><strong>Nom:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Sujet:</strong> ${safeSubject}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
        ${("TURBOPACK compile-time truthy", 1) ? `<p><em>Note: Email envoyé en mode test. Le destinataire réel serait: ${contactEmail}</em></p>` : "TURBOPACK unreachable"}
      `
        });
        // Vérification de la réponse
        if (response.error) {
            console.error("Erreur Resend:", response.error);
            console.error("Détails de l'erreur:", JSON.stringify(response.error, null, 2));
            // Message d'erreur plus explicite selon le type d'erreur
            if (response.error.statusCode === 403) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: "Limitation Resend: En mode test, vous ne pouvez envoyer qu'à votre adresse email de compte. Pour envoyer à d'autres adresses, vérifiez un domaine sur resend.com/domains"
                }, {
                    status: 403
                });
            }
            if (response.error.statusCode === 500) {
                // Erreur serveur Resend - peut être temporaire
                console.error("Erreur serveur Resend (500) - peut être temporaire");
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: "Erreur temporaire du service d'envoi d'email. Veuillez réessayer dans quelques instants."
                }, {
                    status: 500
                });
            }
            // Autres erreurs
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: response.error.message || "Erreur lors de l'envoi de l'email",
                details: ("TURBOPACK compile-time truthy", 1) ? response.error : "TURBOPACK unreachable"
            }, {
                status: response.error.statusCode || 500
            });
        }
        // Retourner une réponse de succès
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: "Email envoyé avec succès",
            id: response.data?.id
        }, {
            status: 200
        });
    } catch (error) {
        // Logger l'erreur pour le débogage
        console.error("Erreur lors de l'envoi de l'email:", error);
        // Retourner un message d'erreur plus détaillé en développement
        const errorMessage = ("TURBOPACK compile-time truthy", 1) ? error instanceof Error ? error.message : "Erreur serveur lors de l'envoi de l'email" : "TURBOPACK unreachable";
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: errorMessage
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__a6a9c253._.js.map