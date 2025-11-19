module.exports = [
"[project]/components/ConcertCard/ConcertCard.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "concertCard": "ConcertCard-module__CpezlW__concertCard",
  "concertCardDate": "ConcertCard-module__CpezlW__concertCardDate",
  "concertCardImage": "ConcertCard-module__CpezlW__concertCardImage",
  "concertCardImageContainer": "ConcertCard-module__CpezlW__concertCardImageContainer",
  "concertCardInfo": "ConcertCard-module__CpezlW__concertCardInfo",
  "concertCardLocation": "ConcertCard-module__CpezlW__concertCardLocation",
  "concertCardTitle": "ConcertCard-module__CpezlW__concertCardTitle",
  "imagePlaceholder": "ConcertCard-module__CpezlW__imagePlaceholder",
});
}),
"[project]/components/ConcertCard/ConcertCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ConcertCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ConcertCard$2f$ConcertCard$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/ConcertCard/ConcertCard.module.css [app-ssr] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function ConcertCard({ title, date, location, imageUrl, imageAlt }) {
    const [imageError, setImageError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [imageSrc, setImageSrc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(imageUrl);
    // Vérifier si l'URL est une URL locale (commence par /)
    const isLocalImage = imageUrl.startsWith("/");
    // Gérer les erreurs de chargement d'image
    const handleImageError = ()=>{
        if (!imageError) {
            setImageError(true);
            // Utiliser une image placeholder si l'image externe échoue
            if (!isLocalImage) {
                setImageSrc("/images/placeholder.jpg");
            }
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ConcertCard$2f$ConcertCard$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].concertCard,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ConcertCard$2f$ConcertCard$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].concertCardImageContainer,
                children: imageError && !isLocalImage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ConcertCard$2f$ConcertCard$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].imagePlaceholder,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Image non disponible"
                    }, void 0, false, {
                        fileName: "[project]/components/ConcertCard/ConcertCard.tsx",
                        lineNumber: 43,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/ConcertCard/ConcertCard.tsx",
                    lineNumber: 42,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    src: imageSrc,
                    alt: imageAlt,
                    width: 300,
                    height: 200,
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ConcertCard$2f$ConcertCard$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].concertCardImage,
                    onError: handleImageError,
                    unoptimized: !isLocalImage
                }, void 0, false, {
                    fileName: "[project]/components/ConcertCard/ConcertCard.tsx",
                    lineNumber: 46,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ConcertCard/ConcertCard.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ConcertCard$2f$ConcertCard$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].concertCardInfo,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ConcertCard$2f$ConcertCard$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].concertCardTitle,
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/components/ConcertCard/ConcertCard.tsx",
                        lineNumber: 58,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ConcertCard$2f$ConcertCard$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].concertCardDate,
                        children: date
                    }, void 0, false, {
                        fileName: "[project]/components/ConcertCard/ConcertCard.tsx",
                        lineNumber: 59,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ConcertCard$2f$ConcertCard$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].concertCardLocation,
                        children: location
                    }, void 0, false, {
                        fileName: "[project]/components/ConcertCard/ConcertCard.tsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ConcertCard/ConcertCard.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ConcertCard/ConcertCard.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=components_ConcertCard_0643e4c0._.js.map