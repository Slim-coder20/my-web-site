module.exports = [
"[project]/components/HeroSection/HeroSection.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "contentWrapper": "HeroSection-module__2k8MBW__contentWrapper",
  "emailInput": "HeroSection-module__2k8MBW__emailInput",
  "heroSection": "HeroSection-module__2k8MBW__heroSection",
  "newsletterCard": "HeroSection-module__2k8MBW__newsletterCard",
  "newsletterDescription": "HeroSection-module__2k8MBW__newsletterDescription",
  "newsletterForm": "HeroSection-module__2k8MBW__newsletterForm",
  "newsletterTitle": "HeroSection-module__2k8MBW__newsletterTitle",
  "signUpButton": "HeroSection-module__2k8MBW__signUpButton",
});
}),
"[project]/components/ImageCarousel/ImageCarousel.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "active": "ImageCarousel-module__zx-LpG__active",
  "carousel": "ImageCarousel-module__zx-LpG__carousel",
  "carouselButton": "ImageCarousel-module__zx-LpG__carouselButton",
  "carouselContainer": "ImageCarousel-module__zx-LpG__carouselContainer",
  "indicator": "ImageCarousel-module__zx-LpG__indicator",
  "indicators": "ImageCarousel-module__zx-LpG__indicators",
  "slide": "ImageCarousel-module__zx-LpG__slide",
  "slideImage": "ImageCarousel-module__zx-LpG__slideImage",
  "slidesContainer": "ImageCarousel-module__zx-LpG__slidesContainer",
});
}),
"[project]/components/ImageCarousel/ImageCarousel.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ImageCarousel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ImageCarousel$2f$ImageCarousel$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/ImageCarousel/ImageCarousel.module.css [app-ssr] (css module)");
"use client";
;
;
;
function ImageCarousel({ images, autoPlayInterval = 3000 }) {
    const [currentIndex, setCurrentIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (images.length === 0) return;
        const interval = setInterval(()=>{
            setCurrentIndex((prevIndex)=>(prevIndex + 1) % images.length);
        }, autoPlayInterval);
        return ()=>clearInterval(interval);
    }, [
        images.length,
        autoPlayInterval
    ]);
    const goToSlide = (index)=>{
        setCurrentIndex(index);
    };
    const goToPrevious = ()=>{
        setCurrentIndex((prevIndex)=>prevIndex === 0 ? images.length - 1 : prevIndex - 1);
    };
    const goToNext = ()=>{
        setCurrentIndex((prevIndex)=>(prevIndex + 1) % images.length);
    };
    if (images.length === 0) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ImageCarousel$2f$ImageCarousel$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].carouselContainer,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ImageCarousel$2f$ImageCarousel$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].carousel,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ImageCarousel$2f$ImageCarousel$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].carouselButton,
                        onClick: goToPrevious,
                        "aria-label": "Image précédente",
                        children: "‹"
                    }, void 0, false, {
                        fileName: "[project]/components/ImageCarousel/ImageCarousel.tsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ImageCarousel$2f$ImageCarousel$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].slidesContainer,
                        children: images.map((image, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ImageCarousel$2f$ImageCarousel$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].slide} ${index === currentIndex ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ImageCarousel$2f$ImageCarousel$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].active : ""}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: image,
                                    alt: `Slide ${index + 1}`,
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ImageCarousel$2f$ImageCarousel$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].slideImage
                                }, void 0, false, {
                                    fileName: "[project]/components/ImageCarousel/ImageCarousel.tsx",
                                    lineNumber: 64,
                                    columnNumber: 15
                                }, this)
                            }, index, false, {
                                fileName: "[project]/components/ImageCarousel/ImageCarousel.tsx",
                                lineNumber: 58,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/ImageCarousel/ImageCarousel.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ImageCarousel$2f$ImageCarousel$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].carouselButton,
                        onClick: goToNext,
                        "aria-label": "Image suivante",
                        children: "›"
                    }, void 0, false, {
                        fileName: "[project]/components/ImageCarousel/ImageCarousel.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ImageCarousel/ImageCarousel.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ImageCarousel$2f$ImageCarousel$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].indicators,
                children: images.map((_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ImageCarousel$2f$ImageCarousel$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].indicator} ${index === currentIndex ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ImageCarousel$2f$ImageCarousel$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].active : ""}`,
                        onClick: ()=>goToSlide(index),
                        "aria-label": `Aller à l'image ${index + 1}`
                    }, index, false, {
                        fileName: "[project]/components/ImageCarousel/ImageCarousel.tsx",
                        lineNumber: 85,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/ImageCarousel/ImageCarousel.tsx",
                lineNumber: 83,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ImageCarousel/ImageCarousel.tsx",
        lineNumber: 46,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/HeroSection/HeroSection.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HeroSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$HeroSection$2f$HeroSection$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/HeroSection/HeroSection.module.css [app-ssr] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ImageCarousel$2f$ImageCarousel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ImageCarousel/ImageCarousel.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function HeroSection() {
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    // Exemple d'images - remplacez par vos propres images
    const carouselImages = [
        "/images/image1.jpg",
        "/images/image2.jpg",
        "/images/image3.jpg",
        "/images/image4.jpg"
    ];
    const handleSubmit = (e)=>{
        e.preventDefault();
        // Ici vous pouvez ajouter la logique pour envoyer l'email
        console.log("Email submitted:", email);
        // Réinitialiser le champ après soumission
        setEmail("");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$HeroSection$2f$HeroSection$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].heroSection,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$HeroSection$2f$HeroSection$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].contentWrapper,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$HeroSection$2f$HeroSection$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].newsletterCard,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$HeroSection$2f$HeroSection$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].newsletterTitle,
                            children: "JOIN MY MAILING LIST"
                        }, void 0, false, {
                            fileName: "[project]/components/HeroSection/HeroSection.tsx",
                            lineNumber: 31,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$HeroSection$2f$HeroSection$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].newsletterDescription,
                            children: "Be the first to know about my new music releases, and get a free track right now"
                        }, void 0, false, {
                            fileName: "[project]/components/HeroSection/HeroSection.tsx",
                            lineNumber: 32,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleSubmit,
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$HeroSection$2f$HeroSection$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].newsletterForm,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "email",
                                    placeholder: "Your email",
                                    value: email,
                                    onChange: (e)=>setEmail(e.target.value),
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$HeroSection$2f$HeroSection$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].emailInput,
                                    required: true
                                }, void 0, false, {
                                    fileName: "[project]/components/HeroSection/HeroSection.tsx",
                                    lineNumber: 36,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$HeroSection$2f$HeroSection$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].signUpButton,
                                    children: "SIGN UP"
                                }, void 0, false, {
                                    fileName: "[project]/components/HeroSection/HeroSection.tsx",
                                    lineNumber: 44,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/HeroSection/HeroSection.tsx",
                            lineNumber: 35,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/HeroSection/HeroSection.tsx",
                    lineNumber: 30,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ImageCarousel$2f$ImageCarousel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    images: carouselImages,
                    autoPlayInterval: 4000
                }, void 0, false, {
                    fileName: "[project]/components/HeroSection/HeroSection.tsx",
                    lineNumber: 51,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/HeroSection/HeroSection.tsx",
            lineNumber: 28,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/HeroSection/HeroSection.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=components_6e318223._.js.map