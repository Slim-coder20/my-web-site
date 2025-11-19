(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/BuyButton/BuyButton.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "buyButton": "BuyButton-module__3jIF6a__buyButton",
});
}),
"[project]/components/BuyButton/BuyButton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Composant : BuyButton
 *
 * Ce composant affiche le bouton "Acheter" sur chaque carte d'album
 * dans la page discographie.
 *
 * FONCTIONNALITÉ :
 * - Au clic, redirige l'utilisateur vers la page de récapitulatif de commande
 * - La page de checkout gérera ensuite la saisie de l'email et le paiement
 *
 * NOTE : Ce composant est un Client Component ("use client") car il utilise
 * le hook useRouter de Next.js pour la navigation.
 */ __turbopack_context__.s([
    "default",
    ()=>BuyButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$BuyButton$2f$BuyButton$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/BuyButton/BuyButton.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function BuyButton({ productId }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    /**
   * Gestion du clic sur le bouton "Acheter"
   *
   * Redirige vers la page de checkout avec l'ID du produit.
   * Exemple : /checkout/1 pour l'album avec l'ID 1
   */ const handleClick = ()=>{
        router.push(`/checkout/${productId}`);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$BuyButton$2f$BuyButton$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].buyButton,
        onClick: handleClick,
        children: "Acheter"
    }, void 0, false, {
        fileName: "[project]/components/BuyButton/BuyButton.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
_s(BuyButton, "fN7XvhJ+p5oE6+Xlo0NJmXpxjC8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = BuyButton;
var _c;
__turbopack_context__.k.register(_c, "BuyButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/PaymentVerifier/PaymentVerifier.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Composant : PaymentVerifier
 *
 * Ce composant vérifie le statut d'un paiement Stripe après la redirection
 * depuis Stripe Checkout et met à jour la commande si nécessaire.
 *
 * UTILISATION :
 * Ajouté à la page discographie pour vérifier automatiquement le paiement
 * quand success=true est dans l'URL.
 */ __turbopack_context__.s([
    "default",
    ()=>PaymentVerifier
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function PaymentVerifier() {
    _s();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PaymentVerifier.useEffect": ()=>{
            const sessionId = searchParams.get("session_id");
            // Si pas de session_id dans l'URL, ne rien faire
            if (!sessionId) {
                return;
            }
            // Vérifier le statut du paiement
            const verifyPayment = {
                "PaymentVerifier.useEffect.verifyPayment": async ()=>{
                    setStatus("checking");
                    setMessage("Vérification du paiement...");
                    try {
                        const response = await fetch("/api/stripe/verify-payment", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                sessionId
                            })
                        });
                        const data = await response.json();
                        if (response.ok && data.status === "paid") {
                            setStatus("success");
                            setMessage("Paiement confirmé ! Vous recevrez un email de confirmation.");
                        } else {
                            setStatus("error");
                            setMessage(data.message || "Erreur lors de la vérification du paiement");
                        }
                    } catch (error) {
                        console.error("Erreur lors de la vérification du paiement:", error);
                        setStatus("error");
                        setMessage("Erreur lors de la vérification du paiement");
                    }
                }
            }["PaymentVerifier.useEffect.verifyPayment"];
            verifyPayment();
        }
    }["PaymentVerifier.useEffect"], [
        searchParams
    ]);
    if (!status) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            padding: "1rem",
            margin: "1rem 0",
            borderRadius: "4px",
            backgroundColor: status === "success" ? "#d4edda" : status === "error" ? "#f8d7da" : "#d1ecf1",
            color: status === "success" ? "#155724" : status === "error" ? "#721c24" : "#0c5460",
            border: `1px solid ${status === "success" ? "#c3e6cb" : status === "error" ? "#f5c6cb" : "#bee5eb"}`
        },
        children: [
            status === "checking" && "⏳ ",
            status === "success" && "✅ ",
            status === "error" && "❌ ",
            message
        ]
    }, void 0, true, {
        fileName: "[project]/components/PaymentVerifier/PaymentVerifier.tsx",
        lineNumber: 70,
        columnNumber: 5
    }, this);
}
_s(PaymentVerifier, "M8Ndfyc04W/XFd4fe16tWJ3ejbE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c = PaymentVerifier;
var _c;
__turbopack_context__.k.register(_c, "PaymentVerifier");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_9dbe256c._.js.map