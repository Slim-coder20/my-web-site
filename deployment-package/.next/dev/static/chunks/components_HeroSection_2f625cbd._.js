(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/HeroSection/HeroSection.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "emailInput": "HeroSection-module__2k8MBW__emailInput",
  "heroSection": "HeroSection-module__2k8MBW__heroSection",
  "newsletterCard": "HeroSection-module__2k8MBW__newsletterCard",
  "newsletterDescription": "HeroSection-module__2k8MBW__newsletterDescription",
  "newsletterForm": "HeroSection-module__2k8MBW__newsletterForm",
  "newsletterTitle": "HeroSection-module__2k8MBW__newsletterTitle",
  "signUpButton": "HeroSection-module__2k8MBW__signUpButton",
});
}),
"[project]/components/HeroSection/HeroSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HeroSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$HeroSection$2f$HeroSection$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/HeroSection/HeroSection.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function HeroSection() {
    _s();
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const handleSubmit = (e)=>{
        e.preventDefault();
        // Ici vous pouvez ajouter la logique pour envoyer l'email
        console.log("Email submitted:", email);
        // Réinitialiser le champ après soumission
        setEmail("");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$HeroSection$2f$HeroSection$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heroSection,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$HeroSection$2f$HeroSection$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].newsletterCard,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$HeroSection$2f$HeroSection$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].newsletterTitle,
                    children: "JOIN MY MAILING LIST"
                }, void 0, false, {
                    fileName: "[project]/components/HeroSection/HeroSection.tsx",
                    lineNumber: 21,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$HeroSection$2f$HeroSection$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].newsletterDescription,
                    children: "Be the first to know about my new music releases, and get a free track right now"
                }, void 0, false, {
                    fileName: "[project]/components/HeroSection/HeroSection.tsx",
                    lineNumber: 22,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$HeroSection$2f$HeroSection$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].newsletterForm,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "email",
                            placeholder: "Your email",
                            value: email,
                            onChange: (e)=>setEmail(e.target.value),
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$HeroSection$2f$HeroSection$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].emailInput,
                            required: true
                        }, void 0, false, {
                            fileName: "[project]/components/HeroSection/HeroSection.tsx",
                            lineNumber: 26,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$HeroSection$2f$HeroSection$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].signUpButton,
                            children: "SIGN UP"
                        }, void 0, false, {
                            fileName: "[project]/components/HeroSection/HeroSection.tsx",
                            lineNumber: 34,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/HeroSection/HeroSection.tsx",
                    lineNumber: 25,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/HeroSection/HeroSection.tsx",
            lineNumber: 20,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/HeroSection/HeroSection.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
_s(HeroSection, "Pe1zWWKcsJK82m3WyFiCTurRPxo=");
_c = HeroSection;
var _c;
__turbopack_context__.k.register(_c, "HeroSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_HeroSection_2f625cbd._.js.map