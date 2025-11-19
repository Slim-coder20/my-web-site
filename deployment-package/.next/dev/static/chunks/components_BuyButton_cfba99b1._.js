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
]);

//# sourceMappingURL=components_BuyButton_cfba99b1._.js.map