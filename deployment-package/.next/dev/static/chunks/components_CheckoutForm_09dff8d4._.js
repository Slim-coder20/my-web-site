(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/CheckoutForm/CheckoutForm.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "cancelButton": "CheckoutForm-module__ymEITq__cancelButton",
  "checkoutForm": "CheckoutForm-module__ymEITq__checkoutForm",
  "errorMessage": "CheckoutForm-module__ymEITq__errorMessage",
  "formActions": "CheckoutForm-module__ymEITq__formActions",
  "formGroup": "CheckoutForm-module__ymEITq__formGroup",
  "helpText": "CheckoutForm-module__ymEITq__helpText",
  "input": "CheckoutForm-module__ymEITq__input",
  "label": "CheckoutForm-module__ymEITq__label",
  "submitButton": "CheckoutForm-module__ymEITq__submitButton",
});
}),
"[project]/components/CheckoutForm/CheckoutForm.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Composant : CheckoutForm
 * 
 * Ce composant gère le formulaire de saisie de l'email et la création
 * de la session Stripe Checkout.
 * 
 * FLUX DE TRAVAIL :
 * 1. L'utilisateur saisit son email
 * 2. Validation de l'email (format basique)
 * 3. Appel à l'API /api/checkout avec productId et email
 * 4. L'API crée l'Order en base et la session Stripe
 * 5. Redirection automatique vers la page de paiement Stripe
 * 
 * NOTE : Ce composant est un Client Component car il gère :
 * - L'état du formulaire (useState)
 * - Les interactions utilisateur (onSubmit, onChange)
 * - La navigation (useRouter)
 */ __turbopack_context__.s([
    "default",
    ()=>CheckoutForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CheckoutForm$2f$CheckoutForm$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/CheckoutForm/CheckoutForm.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function CheckoutForm({ productId }) {
    _s();
    // État du formulaire
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(""); // Email saisi par l'utilisateur
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false); // État de chargement pendant la requête
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null); // Message d'erreur éventuel
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    /**
   * Gestion de la soumission du formulaire
   * 
   * Cette fonction est appelée quand l'utilisateur clique sur "Procéder au paiement"
   */ const handleSubmit = async (e)=>{
        e.preventDefault(); // Empêche le rechargement de la page
        setLoading(true); // Active l'état de chargement
        setError(null); // Réinitialise les erreurs
        // Validation basique de l'email (vérifie la présence d'un @)
        if (!email || !email.includes("@")) {
            setError("Veuillez entrer une adresse email valide");
            setLoading(false);
            return;
        }
        try {
            /**
       * APPEL À L'API /api/checkout
       * 
       * Cette API va :
       * - Récupérer le produit depuis la base de données
       * - Créer une Order en statut "pending"
       * - Créer un OrderItem associé
       * - Créer une session Stripe Checkout
       * - Retourner l'URL de la session Stripe
       */ const response = await fetch("/api/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    productId,
                    email
                })
            });
            const data = await response.json();
            // Vérification de la réponse de l'API
            if (!response.ok) {
                throw new Error(data.error || "Erreur lors de la création de la commande");
            }
            /**
       * REDIRECTION VERS STRIPE CHECKOUT
       * 
       * Si tout s'est bien passé, on redirige l'utilisateur vers
       * la page de paiement Stripe hébergée par Stripe.
       * Après le paiement, Stripe redirigera vers success_url ou cancel_url
       * configurées dans l'API checkout.
       */ if (data.url) {
                window.location.href = data.url;
            } else {
                throw new Error("URL de checkout non disponible");
            }
        } catch (err) {
            // Gestion des erreurs : affichage du message d'erreur à l'utilisateur
            console.error("Checkout error:", err);
            setError(err instanceof Error ? err.message : "Une erreur est survenue");
            setLoading(false); // Désactive l'état de chargement pour permettre une nouvelle tentative
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        onSubmit: handleSubmit,
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CheckoutForm$2f$CheckoutForm$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].checkoutForm,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CheckoutForm$2f$CheckoutForm$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].formGroup,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "email",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CheckoutForm$2f$CheckoutForm$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                        children: "Adresse email *"
                    }, void 0, false, {
                        fileName: "[project]/components/CheckoutForm/CheckoutForm.tsx",
                        lineNumber: 108,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "email",
                        id: "email",
                        name: "email",
                        value: email,
                        onChange: (e)=>setEmail(e.target.value),
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CheckoutForm$2f$CheckoutForm$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input,
                        placeholder: "votre.email@exemple.com",
                        required: true,
                        disabled: loading
                    }, void 0, false, {
                        fileName: "[project]/components/CheckoutForm/CheckoutForm.tsx",
                        lineNumber: 111,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CheckoutForm$2f$CheckoutForm$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].helpText,
                        children: "Vous recevrez la confirmation de commande à cette adresse"
                    }, void 0, false, {
                        fileName: "[project]/components/CheckoutForm/CheckoutForm.tsx",
                        lineNumber: 122,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/CheckoutForm/CheckoutForm.tsx",
                lineNumber: 107,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CheckoutForm$2f$CheckoutForm$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].errorMessage,
                children: error
            }, void 0, false, {
                fileName: "[project]/components/CheckoutForm/CheckoutForm.tsx",
                lineNumber: 128,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CheckoutForm$2f$CheckoutForm$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].formActions,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>router.back(),
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CheckoutForm$2f$CheckoutForm$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cancelButton,
                        disabled: loading,
                        children: "Retour"
                    }, void 0, false, {
                        fileName: "[project]/components/CheckoutForm/CheckoutForm.tsx",
                        lineNumber: 133,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CheckoutForm$2f$CheckoutForm$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].submitButton,
                        disabled: loading || !email,
                        children: loading ? "Traitement..." : "Procéder au paiement"
                    }, void 0, false, {
                        fileName: "[project]/components/CheckoutForm/CheckoutForm.tsx",
                        lineNumber: 142,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/CheckoutForm/CheckoutForm.tsx",
                lineNumber: 131,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/CheckoutForm/CheckoutForm.tsx",
        lineNumber: 105,
        columnNumber: 5
    }, this);
}
_s(CheckoutForm, "hx9JOUY+3goFQPquEkfW+Fp6RII=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = CheckoutForm;
var _c;
__turbopack_context__.k.register(_c, "CheckoutForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_CheckoutForm_09dff8d4._.js.map