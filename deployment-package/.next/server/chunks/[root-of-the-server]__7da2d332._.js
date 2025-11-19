module.exports=[70406,(e,t,r)=>{t.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},93695,(e,t,r)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},18622,(e,t,r)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},56704,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},24725,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},24361,(e,t,r)=>{t.exports=e.x("util",()=>require("util"))},29173,(e,t,r)=>{t.exports=e.x("@prisma/client",()=>require("@prisma/client"))},15270,e=>{"use strict";var t=e.i(29173);let r=globalThis.prisma??new t.PrismaClient({log:["error"]});e.s(["prisma",0,r])},26101,e=>{"use strict";var t=e.i(47909),r=e.i(74017),a=e.i(96250),o=e.i(59756),n=e.i(61916),i=e.i(14444),s=e.i(37092),d=e.i(69741),l=e.i(16795),p=e.i(87718),u=e.i(95169),c=e.i(47587),x=e.i(66012),m=e.i(70101),h=e.i(26937),g=e.i(10372),v=e.i(93695);e.i(52474);var f=e.i(220),y=e.i(89171),R=e.i(22880),b=e.i(15270),w=e.i(46245);let E=new R.default(process.env.STRIPE_SECRET_KEY,{apiVersion:"2025-10-29.clover"}),C=new w.Resend(process.env.RESEND_API_KEY);async function A(e){try{let{sessionId:t}=await e.json();if(!t)return y.NextResponse.json({error:"sessionId is required"},{status:400});console.log(`🔍 V\xe9rification du paiement pour la session: ${t}`);let r=await E.checkout.sessions.retrieve(t);if("paid"!==r.payment_status)return console.log(`⚠️  Paiement non compl\xe9t\xe9 pour la session: ${t}`),y.NextResponse.json({status:r.payment_status,message:"Payment not completed"});console.log(`✅ Paiement confirm\xe9 pour la session: ${t}`);let a=await b.prisma.order.findUnique({where:{stripeSessionId:t}});if(!a&&r.metadata?.orderId&&(console.log(`🔍 Commande non trouv\xe9e par sessionId, recherche par orderId: ${r.metadata.orderId}`),(a=await b.prisma.order.findUnique({where:{id:parseInt(r.metadata.orderId)}}))&&(await b.prisma.order.update({where:{id:a.id},data:{stripeSessionId:t}}),console.log(`✅ stripeSessionId mis \xe0 jour pour la commande ${a.id}`))),!a)return console.log(`⚠️  Commande non trouv\xe9e pour la session: ${t}`),y.NextResponse.json({error:"Order not found"});if("paid"===a.status)return console.log(`ℹ️  Commande ${a.id} d\xe9j\xe0 pay\xe9e`),y.NextResponse.json({status:"paid",message:"Order already paid"});let o=await b.prisma.order.update({where:{id:a.id},data:{status:"paid"},include:{items:{include:{product:!0}}}});if(console.log(`✅ Commande ${a.id} mise \xe0 jour \xe0 "paid"`),process.env.RESEND_API_KEY)try{let e=(o.amountTotal/100).toFixed(2),t=o.items.map(e=>`
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">
                <strong>${e.product.title}</strong>
              </td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">
                ${e.quantity}
              </td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">
                ${(e.unitPrice/100).toFixed(2)} €
              </td>
            </tr>
          `).join("");await C.emails.send({from:process.env.RESEND_FROM_EMAIL||"onboarding@resend.dev",to:o.email,subject:"Confirmation de votre commande - Slim Abida",html:`
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #333; border-bottom: 2px solid #333; padding-bottom: 10px;">
                Merci pour votre commande !
              </h2>

              <p>Bonjour,</p>

              <p>Nous avons bien re\xe7u votre commande et votre paiement a \xe9t\xe9 confirm\xe9.</p>

              <h3 style="color: #333; margin-top: 30px;">D\xe9tails de votre commande</h3>

              <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <thead>
                  <tr style="background-color: #f5f5f5;">
                    <th style="padding: 10px; text-align: left; border-bottom: 2px solid #333;">Produit</th>
                    <th style="padding: 10px; text-align: center; border-bottom: 2px solid #333;">Quantit\xe9</th>
                    <th style="padding: 10px; text-align: right; border-bottom: 2px solid #333;">Prix</th>
                  </tr>
                </thead>
                <tbody>
                  ${t}
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="2" style="padding: 10px; text-align: right; font-weight: bold; border-top: 2px solid #333;">
                      Total :
                    </td>
                    <td style="padding: 10px; text-align: right; font-weight: bold; border-top: 2px solid #333;">
                      ${e} €
                    </td>
                  </tr>
                </tfoot>
              </table>

              <p style="margin-top: 30px;">
                Votre commande sera trait\xe9e dans les plus brefs d\xe9lais.
              </p>

              <p>
                Si vous avez des questions, n'h\xe9sitez pas \xe0 nous contacter.
              </p>

              <p style="margin-top: 30px; color: #666; font-size: 14px;">
                Cordialement,<br>
                L'\xe9quipe Slim Abida
              </p>
            </div>
          `}),console.log(`✅ Email de confirmation envoy\xe9 \xe0 ${o.email}`)}catch(e){console.error("❌ Erreur lors de l'envoi de l'email:",e)}return y.NextResponse.json({status:"paid",message:"Order updated successfully",orderId:o.id})}catch(e){return console.error("❌ Erreur lors de la vérification du paiement:",e),y.NextResponse.json({error:"Failed to verify payment",details:void 0},{status:500})}}e.s(["POST",()=>A],72217);var P=e.i(72217);let N=new t.AppRouteRouteModule({definition:{kind:r.RouteKind.APP_ROUTE,page:"/api/stripe/verify-payment/route",pathname:"/api/stripe/verify-payment",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/app/api/stripe/verify-payment/route.ts",nextConfigOutput:"standalone",userland:P}),{workAsyncStorage:S,workUnitAsyncStorage:j,serverHooks:I}=N;function T(){return(0,a.patchFetch)({workAsyncStorage:S,workUnitAsyncStorage:j})}async function _(e,t,a){N.isDev&&(0,o.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let y="/api/stripe/verify-payment/route";y=y.replace(/\/index$/,"")||"/";let R=await N.prepare(e,t,{srcPage:y,multiZoneDraftMode:!1});if(!R)return t.statusCode=400,t.end("Bad Request"),null==a.waitUntil||a.waitUntil.call(a,Promise.resolve()),null;let{buildId:b,params:w,nextConfig:E,parsedUrl:C,isDraftMode:A,prerenderManifest:P,routerServerContext:S,isOnDemandRevalidate:j,revalidateOnlyGenerated:I,resolvedPathname:T,clientReferenceManifest:_,serverActionsManifest:q}=R,O=(0,d.normalizeAppPath)(y),k=!!(P.dynamicRoutes[O]||P.routes[T]),$=async()=>((null==S?void 0:S.render404)?await S.render404(e,t,C,!1):t.end("This page could not be found"),null);if(k&&!A){let e=!!P.routes[T],t=P.dynamicRoutes[O];if(t&&!1===t.fallback&&!e){if(E.experimental.adapterPath)return await $();throw new v.NoFallbackError}}let M=null;!k||N.isDev||A||(M="/index"===(M=T)?"/":M);let U=!0===N.isDev||!k,D=k&&!U;q&&_&&(0,i.setReferenceManifestsSingleton)({page:y,clientReferenceManifest:_,serverActionsManifest:q,serverModuleMap:(0,s.createServerModuleMap)({serverActionsManifest:q})});let H=e.method||"GET",F=(0,n.getTracer)(),K=F.getActiveScopeSpan(),L={params:w,prerenderManifest:P,renderOpts:{experimental:{authInterrupts:!!E.experimental.authInterrupts},cacheComponents:!!E.cacheComponents,supportsDynamicResponse:U,incrementalCache:(0,o.getRequestMeta)(e,"incrementalCache"),cacheLifeProfiles:E.cacheLife,waitUntil:a.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,r,a)=>N.onRequestError(e,t,a,S)},sharedContext:{buildId:b}},B=new l.NodeNextRequest(e),V=new l.NodeNextResponse(t),z=p.NextRequestAdapter.fromNodeNextRequest(B,(0,p.signalFromNodeResponse)(t));try{let i=async e=>N.handle(z,L).finally(()=>{if(!e)return;e.setAttributes({"http.status_code":t.statusCode,"next.rsc":!1});let r=F.getRootSpanAttributes();if(!r)return;if(r.get("next.span_type")!==u.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${r.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let a=r.get("next.route");if(a){let t=`${H} ${a}`;e.setAttributes({"next.route":a,"http.route":a,"next.span_name":t}),e.updateName(t)}else e.updateName(`${H} ${y}`)}),s=!!(0,o.getRequestMeta)(e,"minimalMode"),d=async o=>{var n,d;let l=async({previousCacheEntry:r})=>{try{if(!s&&j&&I&&!r)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let n=await i(o);e.fetchMetrics=L.renderOpts.fetchMetrics;let d=L.renderOpts.pendingWaitUntil;d&&a.waitUntil&&(a.waitUntil(d),d=void 0);let l=L.renderOpts.collectedTags;if(!k)return await (0,x.sendResponse)(B,V,n,L.renderOpts.pendingWaitUntil),null;{let e=await n.blob(),t=(0,m.toNodeOutgoingHttpHeaders)(n.headers);l&&(t[g.NEXT_CACHE_TAGS_HEADER]=l),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let r=void 0!==L.renderOpts.collectedRevalidate&&!(L.renderOpts.collectedRevalidate>=g.INFINITE_CACHE)&&L.renderOpts.collectedRevalidate,a=void 0===L.renderOpts.collectedExpire||L.renderOpts.collectedExpire>=g.INFINITE_CACHE?void 0:L.renderOpts.collectedExpire;return{value:{kind:f.CachedRouteKind.APP_ROUTE,status:n.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:r,expire:a}}}}catch(t){throw(null==r?void 0:r.isStale)&&await N.onRequestError(e,t,{routerKind:"App Router",routePath:y,routeType:"route",revalidateReason:(0,c.getRevalidateReason)({isStaticGeneration:D,isOnDemandRevalidate:j})},S),t}},p=await N.handleResponse({req:e,nextConfig:E,cacheKey:M,routeKind:r.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:P,isRoutePPREnabled:!1,isOnDemandRevalidate:j,revalidateOnlyGenerated:I,responseGenerator:l,waitUntil:a.waitUntil,isMinimalMode:s});if(!k)return null;if((null==p||null==(n=p.value)?void 0:n.kind)!==f.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==p||null==(d=p.value)?void 0:d.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});s||t.setHeader("x-nextjs-cache",j?"REVALIDATED":p.isMiss?"MISS":p.isStale?"STALE":"HIT"),A&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let u=(0,m.fromNodeOutgoingHttpHeaders)(p.value.headers);return s&&k||u.delete(g.NEXT_CACHE_TAGS_HEADER),!p.cacheControl||t.getHeader("Cache-Control")||u.get("Cache-Control")||u.set("Cache-Control",(0,h.getCacheControlHeader)(p.cacheControl)),await (0,x.sendResponse)(B,V,new Response(p.value.body,{headers:u,status:p.value.status||200})),null};K?await d(K):await F.withPropagatedContext(e.headers,()=>F.trace(u.BaseServerSpan.handleRequest,{spanName:`${H} ${y}`,kind:n.SpanKind.SERVER,attributes:{"http.method":H,"http.target":e.url}},d))}catch(t){if(t instanceof v.NoFallbackError||await N.onRequestError(e,t,{routerKind:"App Router",routePath:O,routeType:"route",revalidateReason:(0,c.getRevalidateReason)({isStaticGeneration:D,isOnDemandRevalidate:j})}),k)throw t;return await (0,x.sendResponse)(B,V,new Response(null,{status:500})),null}}e.s(["handler",()=>_,"patchFetch",()=>T,"routeModule",()=>N,"serverHooks",()=>I,"workAsyncStorage",()=>S,"workUnitAsyncStorage",()=>j],26101)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__7da2d332._.js.map