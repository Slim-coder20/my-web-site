module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/app/discographie/music.module.css [app-rsc] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "albumCard": "music-module__vTp0JW__albumCard",
  "albumCover": "music-module__vTp0JW__albumCover",
  "albumDescription": "music-module__vTp0JW__albumDescription",
  "albumFooter": "music-module__vTp0JW__albumFooter",
  "albumInfo": "music-module__vTp0JW__albumInfo",
  "albumPrice": "music-module__vTp0JW__albumPrice",
  "albumTitle": "music-module__vTp0JW__albumTitle",
  "albumsGrid": "music-module__vTp0JW__albumsGrid",
  "buyButton": "music-module__vTp0JW__buyButton",
  "coverImage": "music-module__vTp0JW__coverImage",
  "coverPlaceholder": "music-module__vTp0JW__coverPlaceholder",
  "description": "music-module__vTp0JW__description",
  "discographieContainer": "music-module__vTp0JW__discographieContainer",
  "discographieSection": "music-module__vTp0JW__discographieSection",
  "emptyState": "music-module__vTp0JW__emptyState",
  "title": "music-module__vTp0JW__title",
});
}),
"[project]/app/discographie/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Discographie
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$discographie$2f$music$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/app/discographie/music.module.css [app-rsc] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-rsc] (ecmascript)");
;
;
;
async function getProducts() {
    try {
        const baseUrl = ("TURBOPACK compile-time value", "http://localhost:3000") || "http://localhost:3000";
        const res = await fetch(`${baseUrl}/api/products`, {
            cache: "no-store"
        });
        if (!res.ok) {
            throw new Error("Failed to fetch products");
        }
        return res.json();
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}
function formatPrice(priceCents) {
    return new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR"
    }).format(priceCents / 100);
}
async function Discographie() {
    const products = await getProducts();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$discographie$2f$music$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].discographieContainer,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$discographie$2f$music$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].discographieSection,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$discographie$2f$music$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].title,
                    children: "Discographie"
                }, void 0, false, {
                    fileName: "[project]/app/discographie/page.tsx",
                    lineNumber: 42,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$discographie$2f$music$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].description,
                    children: "Découvrez les albums de Slim Abida et soutenez l'artiste en achetant ses œuvres."
                }, void 0, false, {
                    fileName: "[project]/app/discographie/page.tsx",
                    lineNumber: 43,
                    columnNumber: 9
                }, this),
                products.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$discographie$2f$music$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].emptyState,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "Aucun album disponible pour le moment."
                    }, void 0, false, {
                        fileName: "[project]/app/discographie/page.tsx",
                        lineNumber: 50,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/discographie/page.tsx",
                    lineNumber: 49,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$discographie$2f$music$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].albumsGrid,
                    children: products.map((product)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$discographie$2f$music$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].albumCard,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$discographie$2f$music$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].albumCover,
                                    children: product.coverUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                        src: product.coverUrl,
                                        alt: product.title,
                                        width: 400,
                                        height: 400,
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$discographie$2f$music$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].coverImage,
                                        priority: true
                                    }, void 0, false, {
                                        fileName: "[project]/app/discographie/page.tsx",
                                        lineNumber: 58,
                                        columnNumber: 21
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$discographie$2f$music$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].coverPlaceholder,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Pas de pochette"
                                        }, void 0, false, {
                                            fileName: "[project]/app/discographie/page.tsx",
                                            lineNumber: 68,
                                            columnNumber: 23
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/discographie/page.tsx",
                                        lineNumber: 67,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/discographie/page.tsx",
                                    lineNumber: 56,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$discographie$2f$music$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].albumInfo,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$discographie$2f$music$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].albumTitle,
                                            children: product.title
                                        }, void 0, false, {
                                            fileName: "[project]/app/discographie/page.tsx",
                                            lineNumber: 73,
                                            columnNumber: 19
                                        }, this),
                                        product.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$discographie$2f$music$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].albumDescription,
                                            children: product.description
                                        }, void 0, false, {
                                            fileName: "[project]/app/discographie/page.tsx",
                                            lineNumber: 75,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$discographie$2f$music$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].albumFooter,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$discographie$2f$music$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].albumPrice,
                                                    children: formatPrice(product.priceCents)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/discographie/page.tsx",
                                                    lineNumber: 80,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$discographie$2f$music$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].buyButton,
                                                    children: "Acheter"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/discographie/page.tsx",
                                                    lineNumber: 83,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/discographie/page.tsx",
                                            lineNumber: 79,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/discographie/page.tsx",
                                    lineNumber: 72,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, product.id, true, {
                            fileName: "[project]/app/discographie/page.tsx",
                            lineNumber: 55,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/discographie/page.tsx",
                    lineNumber: 53,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/discographie/page.tsx",
            lineNumber: 41,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/discographie/page.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/discographie/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/discographie/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__a0758632._.js.map