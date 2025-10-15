(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}})();class q{constructor(e,n={}){let r=document.getElementById(e);r||(r=document.createElement("div"),console.warn(`Element with id "${e}" not found. Creating a new div as root.`),document.body.appendChild(r)),this.root=r,this.routes=[],this.layouts={},this.currentRoute=null,this.isAuthenticated=!1,this.loginPath=n.loginPath||"/login",window.addEventListener("popstate",()=>this.handleRoute()),document.addEventListener("click",o=>{o.target.matches("[data-link]")&&(o.preventDefault(),this.navigate(o.target.getAttribute("href")))})}setAuth(e){this.isAuthenticated=e}addLayout(e,n){return this.layouts[e]=n,this}findLayout(e){let n=null,r=0;for(const[o,i]of Object.entries(this.layouts))e.startsWith(o)&&o.length>r&&(n=i,r=o.length);return n}addRoute(e,n,r={}){const o=this.pathToRegex(e),i=this.extractParams(e);return this.routes.push({path:e,regex:o,keys:i,handler:n,requireAuth:r.requireAuth||!1,useLayout:r.useLayout!==!1}),this}pathToRegex(e){if(e==="*")return/.*/;const n=e.replace(/\//g,"\\/").replace(/:(\w+)/g,"([^\\/]+)").replace(/\*/g,".*");return new RegExp("^"+n+"$")}extractParams(e){const n=[],r=e.matchAll(/:(\w+)/g);for(const o of r)n.push(o[1]);return n}getParams(e,n){const r=n.match(e.regex);if(!r)return{};const o={};return e.keys.forEach((i,a)=>{o[i]=r[a+1]}),o}navigate(e){window.history.pushState(null,null,e),this.handleRoute()}handleRoute(){const e=window.location.pathname;for(const r of this.routes)if(r.regex.test(e)){if(r.requireAuth&&!this.isAuthenticated){sessionStorage.setItem("redirectAfterLogin",e),this.navigate(this.loginPath);return}this.currentRoute=e;const o=this.getParams(r,e),i=r.handler(o);i instanceof Promise?i.then(a=>{this.renderContent(a,r,e)}):this.renderContent(i,r,e);return}const n=this.routes.find(r=>r.path==="*");if(n){const r=n.handler({});this.root.innerHTML=r}}renderContent(e,n,r){const o=e instanceof DocumentFragment;if(n.useLayout){const i=this.findLayout(r);if(i){const a=i(),h=a.querySelector("slot");if(h)if(o)h.replaceWith(e);else{const b=document.createElement("template");b.innerHTML=e,h.replaceWith(b.content)}else console.warn("Layout does not contain a <slot> element. Content will not be inserted.");this.root.innerHTML="",this.root.appendChild(a)}else o?(this.root.innerHTML="",this.root.appendChild(e)):this.root.innerHTML=e}else o?(this.root.innerHTML="",this.root.appendChild(e)):this.root.innerHTML=e;this.attachEventListeners(r)}attachEventListeners(e){const n=document.getElementById("loginBtn");n&&n.addEventListener("click",()=>{this.login()});const r=document.getElementById("logoutBtn");r&&r.addEventListener("click",()=>{this.logout()})}login(){this.setAuth(!0);const e=sessionStorage.getItem("redirectAfterLogin");sessionStorage.removeItem("redirectAfterLogin"),this.navigate(e||"/dashboard")}logout(){this.setAuth(!1),this.navigate(this.loginPath)}start(){this.handleRoute()}}const R=`<div class="mx-auto max-w-4xl p-6">\r
  <h1 class="mb-6 text-4xl font-bold text-gray-900">À propos</h1>\r
  <p class="mb-6 text-lg text-gray-700">\r
    Base de code pour la SAE 3.01. Octobre 2025</p>\r
<p class="mb-6 text-lg text-gray-700">\r
    Se référer à la documentation pour comprendre comment l'utiliser\r
    </p>\r
   \r
</div>`;function C(){return R}const S=`<div class="mx-auto max-w-4xl p-6">\r
  <h1 class="mb-6 text-4xl font-bold text-gray-900">Accueil</h1>\r
  \r
<img \r
    src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=400&fit=crop" \r
    alt="Image d'accueil - Shopping" \r
    class="mb-6 rounded-lg shadow-lg w-full h-64 object-cover"\r
    style="filter: grayscale(1);"\r
  />\r
\r
  <p>\r
    Bienvenue sur notre plateforme de Click & Collect ! Découvrez une sélection variée de produits et profitez d'une expérience d'achat simple et rapide.\r
  </p>\r
</div>\r
`;function M(){return S}let j="http://mmi.unilim.fr/~mishcherikova1/api/",m=async function(t){let e={method:"GET"};try{var n=await fetch(j+t,e)}catch(o){return console.error("Echec de la requête : "+o),!1}return n.status!=200?(console.error("Erreur de requête : "+n.status),!1):await n.json()},g={},P=[{id:1,name:"Sabrina Carpenter - Man's Best Friend - Vinyle Luxe Packaging (Exclusivité)",price:"€59,99"},{id:2,name:"Various Artist - Almost Famous - Double Vinyle Violet & Magenta Exclusif",price:"€34,99"},{id:3,name:"KPop Demon Hunters (Soundtrack from the Netflix Film) - Vinyle Smokey Fushia Exclusif",price:"€29,99"}];g.fetch=async function(t){let e=await m("products/"+t);return e==!1?P.pop():[e]};g.fetchAll=async function(){let t=await m("products");return t==!1?P:t};let k=function(t,e){let n=t;for(let r in e)n=n.replaceAll(new RegExp("{{"+r+"}}","g"),e[r]);return n};function s(t){const e=document.createElement("template");return e.innerHTML=t.trim(),e.content}const F=`<div class="flex flex-col items-start rounded-lg w-full">\r
  <!-- Photo + border container -->\r
  <div\r
    class="border border-gray-20 border-solid flex flex-col gap-1 h-[34rem] md:w-[14.6875rem] ld:w-[20.125rem] items-center justify-center p-4 rounded-lg w-full"\r
  >\r
    <div class="bg-[#d9d9d9] flex-grow rounded-[5px] w-full overflow-hidden">\r
      <img\r
        src="{{image}}"\r
        alt="{{name}}"\r
        class="w-full h-full object-cover"\r
        onerror="this.style.display='none'"\r
      />\r
    </div>\r
  </div>\r
\r
  <!-- Title + price -->\r
  <div\r
    class="flex flex-col gap-3 items-start p-[10px] text-[#212121] text-base leading-6 w-full"\r
  >\r
    <p\r
      class="font-normal overflow-hidden text-ellipsis w-full"\r
      style="\r
        display: -webkit-box;\r
        -webkit-line-clamp: 2;\r
        -webkit-box-orient: vertical;\r
        font-family: &quot;Rethink Sans&quot;, sans-serif;\r
      "\r
    >\r
      {{name}}\r
    </p>\r
    <p\r
      class="font-bold w-full tracking-[0.16px]"\r
      style="font-family: &quot;Rethink Sans&quot;, sans-serif"\r
    >\r
      €{{price}}\r
    </p>\r
  </div>\r
\r
  <!-- Button -->\r
  <button\r
    data-buy="{{id}}"\r
    class="bg-[#f6f5fa] gap-1 items-center justify-center px-3 py-[14px] rounded-lg w-full transition hover:bg-[#e8e7f0] hidden"\r
  >\r
    <p\r
      class="font-normal leading-5 text-[#212121] text-sm uppercase whitespace-nowrap"\r
      style="font-family: &quot;Rethink Sans&quot;, sans-serif"\r
    >\r
      Ajouter au panier\r
    </p>\r
  </button>\r
</div>\r
`;let L={html:function(t){let e='<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">';for(let n of t)e+=k(F,n);return e+"</div>"},dom:function(t){return s(L.html(t))}};const I=`<div class="flex flex-col items-start self-stretch gap-4 md:gap-8 lg:gap-8">\r
  <h1\r
    class="text-fg font-bebas tracking-tighter text-mh2 md:text-dh2 lg:text-dh2 uppercase leading-[95%]"\r
  >\r
    le catalogue de produits\r
  </h1>\r
  <p class="font-rethink text-gray-50 w-full md:w-[40rem] lg:w-[40rem]">\r
    Faites le plein des pépites fraîchement ajoutées à notre catalogue :\r
    nouveautés en précommande et dernières (re)mises en vente, maintenant\r
    disponibles ! \r
  </p>\r
  <slot name="products"></slot>\r
</div>\r
`;let x={products:[]},p={};p.handler_clickOnProduct=function(t){if(t.target.dataset.buy!==void 0){let e=t.target.dataset.buy;alert(`Le produit d'identifiant ${e} ? Excellent choix !`)}};p.init=async function(){return x.products=await g.fetchAll(),u.init(x.products)};let u={};u.init=function(t){let e=u.createPageFragment(t);return u.attachEvents(e),e};u.createPageFragment=function(t){let e=s(I),n=L.dom(t);return e.querySelector('slot[name="products"]').replaceWith(n),e};u.attachEvents=function(t){return t.firstElementChild.addEventListener("click",p.handler_clickOnProduct),t};function $(t){return console.log("ProductsPage",t),p.init()}let y={},E=[{id:1,name:"Marteau",description:"Un marteau est un outil utilisé pour enfoncer des clous dans du bois ou d'autres matériaux. Il se compose d'une tête lourde en métal fixée à un manche en bois ou en fibre de verre.",price:9.99},{id:2,name:"Tournevis",description:"Un tournevis est un outil utilisé pour visser ou dévisser des vis. Il se compose d'une tige en métal avec une tête qui s'adapte à la fente de la vis.",price:5.99},{id:3,name:"Clé à molette",description:"Une clé à molette est un outil utilisé pour serrer ou desserrer des écrous et des boulons. Elle se compose d'une mâchoire réglable qui s'adapte à différentes tailles d'écrous.",price:12.99},{id:4,name:"Pince",description:"Une pince est un outil utilisé pour saisir, tenir ou plier des objets. Elle se compose de deux bras articulés qui se rejoignent en un point de pivot.",price:7.99},{id:5,name:"Scie",description:"Une scie est un outil utilisé pour couper des matériaux, généralement en bois. Elle se compose d'une lame dentée fixée à un manche.",price:14.99},{id:6,name:"Perceuse",description:"Une perceuse est un outil utilisé pour percer des trous dans divers matériaux. Elle se compose d'un moteur qui fait tourner une mèche.",price:49.99},{id:7,name:"Ponceuse",description:"Une ponceuse est un outil utilisé pour lisser des surfaces en bois ou en métal. Elle se compose d'un moteur qui fait vibrer ou tourner un abrasif.",price:79.99},{id:8,name:"Mètre",description:"Un mètre est un outil utilisé pour mesurer des distances. Il se compose d'une bande graduée en métal ou en plastique.",price:19.99},{id:9,name:"Niveau à bulle",description:"Un niveau à bulle est un outil utilisé pour vérifier l'horizontalité ou la verticalité d'une surface. Il se compose d'un tube rempli de liquide avec une bulle d'air à l'intérieur.",price:9.99}];y.fetch=async function(t){let e=await m("products/"+t);return e==!1?E.pop():[e]};y.fetchAll=async function(){let t=await m("products");return t==!1?E:t};const T=`<article class="mx-auto max-w-2xl rounded-lg bg-white p-8 shadow-lg">\r
  <!-- Placeholder pour l'image du produit -->\r
  <div class="mb-6 flex h-64 items-center justify-center rounded-lg bg-gray-200">\r
    <svg class="h-20 w-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">\r
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>\r
    </svg>\r
  </div>\r
  \r
  <div class="mb-2 text-sm font-medium text-gray-500">ID: {{id}}</div>\r
  <h1 class="mb-4 text-3xl font-bold text-gray-900">{{name}}</h1>\r
  <p class="mb-6 text-lg text-gray-700">{{description}}</p>\r
  \r
  <div class="mb-6">\r
    <span class="text-2xl font-bold text-green-600">{{price}} €</span>\r
  </div>\r
  \r
  <button \r
    data-buy="{{id}}" \r
    class="w-full rounded-lg bg-green-600 px-6 py-3 text-lg font-semibold text-white transition hover:bg-green-700"\r
  >\r
    Ajouter au panier\r
  </button>\r
</article>\r
`;let A={html:function(t){return k(T,t)},dom:function(t){return s(A.html(t))}};const B=`<div>\r
<h1 style="font-size: 2rem; font-weight: bold; margin-bottom: 2rem; color: #111; text-align: center;">Allez, click click ! On achète !</h1>\r
   <slot name="detail"></slot>\r
</div>\r
`;let d={products:[]};d.getProductById=function(t){return d.products.find(e=>e.id==t)};let f={};f.handler_clickOnProduct=function(t){t.target.dataset.buy!==void 0&&(t.target.dataset.buy,alert("Produit ajouté au panier ! (Quand il y en aura un)"))};f.init=async function(t){const e=t.id;d.products=await y.fetchAll();let n=d.getProductById(e);return console.log("Product loaded:",n),c.init(n)};let c={};c.init=function(t){let e=c.createPageFragment(t);return c.attachEvents(e),e};c.createPageFragment=function(t){let e=s(B),n=A.dom(t);return e.querySelector('slot[name="detail"]').replaceWith(n),e};c.attachEvents=function(t){return t.querySelector("[data-buy]").addEventListener("click",f.handler_clickOnProduct),t};function O(t){return console.log("ProductDetailPage",t),f.init(t)}const D=`<div style="min-height: 100vh; display: flex; flex-direction: column;">\r
    <slot name="header"></slot>\r
    <main style="flex: 1; padding: 2rem;">\r
        <slot></slot>\r
    </main>\r
    <slot name="footer"></slot>\r
</div>\r
    `,v=`<header style="background: #333; color: white; padding: 1rem;">\r
    <div style="display: flex; justify-content: space-between; align-items: center;">\r
        <h2 style="margin: 0;">Click & Collect</h2>\r
        <nav style="display: flex; gap: 1rem;">\r
            <a href="/" data-link style="color: white; text-decoration: none; padding: 0.5rem 1rem; border-radius: 4px; transition: background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='transparent'">Accueil</a>\r
            <a href="/products" data-link style="color: white; text-decoration: none; padding: 0.5rem 1rem; border-radius: 4px; transition: background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='transparent'">Produits</a>\r
            <a href="/about" data-link style="color: white; text-decoration: none; padding: 0.5rem 1rem; border-radius: 4px; transition: background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='transparent'">À propos</a>\r
        </nav>\r
    </div>\r
</header>\r
`;let H={html:function(){return v},dom:function(){return s(v)}};const w=`<footer style="background: #f5f5f5; padding: 1rem; text-align: center;">\r
    <p style="margin: 0;">&copy; 2025 - MMI - SAE 3.01</p>\r
</footer>\r
`;let V={html:function(){return w},dom:function(){return s(w)}};function U(){let t=s(D),e=H.dom(),n=V.dom();return t.querySelector('slot[name="header"]').replaceWith(e),t.querySelector('slot[name="footer"]').replaceWith(n),t}const W=` <section>\r
    <h1>404 - Page non trouvée</h1>\r
        <p>Cette page n'existe pas</p>\r
    <nav>\r
        <a href="/" data-link>Retour à l'accueil</a>\r
    </nav>\r
</section>`;function z(){return W}const l=new q("app");l.addLayout("/",U);l.addRoute("/",M);l.addRoute("/about",C);l.addRoute("/products",$);l.addRoute("/products/:id/:slug",O);l.addRoute("*",z);l.start();
