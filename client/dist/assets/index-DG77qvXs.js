(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function t(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(o){if(o.ep)return;o.ep=!0;const a=t(o);fetch(o.href,a)}})();class H{constructor(r,t={}){let n=document.getElementById(r);n||(n=document.createElement("div"),console.warn(`Element with id "${r}" not found. Creating a new div as root.`),document.body.appendChild(n)),this.root=n,this.routes=[],this.layouts={},this.currentRoute=null,this.isAuthenticated=!1,this.loginPath=t.loginPath||"/login",window.addEventListener("popstate",()=>this.handleRoute()),document.addEventListener("click",o=>{o.target.matches("[data-link]")&&(o.preventDefault(),this.navigate(o.target.getAttribute("href")))})}setAuth(r){this.isAuthenticated=r}addLayout(r,t){return this.layouts[r]=t,this}findLayout(r){let t=null,n=0;for(const[o,a]of Object.entries(this.layouts))r.startsWith(o)&&o.length>n&&(t=a,n=o.length);return t}addRoute(r,t,n={}){const o=this.pathToRegex(r),a=this.extractParams(r);return this.routes.push({path:r,regex:o,keys:a,handler:t,requireAuth:n.requireAuth||!1,useLayout:n.useLayout!==!1}),this}pathToRegex(r){if(r==="*")return/.*/;const t=r.replace(/\//g,"\\/").replace(/:(\w+)/g,"([^\\/]+)").replace(/\*/g,".*");return new RegExp("^"+t+"$")}extractParams(r){const t=[],n=r.matchAll(/:(\w+)/g);for(const o of n)t.push(o[1]);return t}getParams(r,t){const n=t.match(r.regex);if(!n)return{};const o={};return r.keys.forEach((a,l)=>{o[a]=n[l+1]}),o}navigate(r){window.history.pushState(null,null,r),this.handleRoute()}handleRoute(){const r=window.location.pathname;for(const n of this.routes)if(n.regex.test(r)){if(n.requireAuth&&!this.isAuthenticated){sessionStorage.setItem("redirectAfterLogin",r),this.navigate(this.loginPath);return}this.currentRoute=r;const o=this.getParams(n,r),a=n.handler(o,this);a instanceof Promise?a.then(l=>{this.renderContent(l,n,r)}):this.renderContent(a,n,r);return}const t=this.routes.find(n=>n.path==="*");if(t){const n=t.handler({},this);this.root.innerHTML=n}}renderContent(r,t,n){const o=r instanceof DocumentFragment;if(t.useLayout){const a=this.findLayout(n);if(a){const l=a(),c=l.querySelector("slot");if(c)if(o)c.replaceWith(r);else{const i=document.createElement("template");i.innerHTML=r,c.replaceWith(i.content)}else console.warn("Layout does not contain a <slot> element. Content will not be inserted.");this.root.innerHTML="",this.root.appendChild(l)}else o?(this.root.innerHTML="",this.root.appendChild(r)):this.root.innerHTML=r}else o?(this.root.innerHTML="",this.root.appendChild(r)):this.root.innerHTML=r;this.attachEventListeners(n)}attachEventListeners(r){const t=document.getElementById("loginBtn");t&&t.addEventListener("click",()=>{this.login()});const n=document.getElementById("logoutBtn");n&&n.addEventListener("click",()=>{this.logout()})}login(){this.setAuth(!0);const r=sessionStorage.getItem("redirectAfterLogin");sessionStorage.removeItem("redirectAfterLogin"),this.navigate(r||"/dashboard")}logout(){this.setAuth(!1),this.navigate(this.loginPath)}start(){this.handleRoute()}}const I=`<div class="mx-auto max-w-4xl p-6">\r
  <h1 class="mb-6 text-4xl font-bold text-gray-900">À propos</h1>\r
  <p class="mb-6 text-lg text-gray-700">\r
    Base de code pour la SAE 3.01. Octobre 2025</p>\r
<p class="mb-6 text-lg text-gray-700">\r
    Se référer à la documentation pour comprendre comment l'utiliser\r
    </p>\r
   \r
</div>`;function _(){return I}const W=`<div class="mx-auto max-w-4xl p-6">\r
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
`;function U(){return W}let A="https://mmi.unilim.fr/~mishcherikova1/api/",L=async function(e){let r={method:"GET"};try{var t=await fetch(A+e,r)}catch(o){return console.error("Echec de la requête : "+o),!1}return t.status!=200?(console.error("Erreur de requête : "+t.status),!1):await t.json()},M=async function(e,r){let t={credentials:"include",method:"POST",header:{"Content-Type":"miltipart/form-data"},body:JSON.stringify(r)};try{var n=await fetch(A+e,t)}catch(a){return console.error("Echec de la requête : "+a),!1}if(!n.ok){const a=await n.text();return console.error("Erreur de requête : "+n.status),console.error("Réponse du serveur:",a),!1}return await n.json()},p={},F=[{id:1,name:"Sabrina Carpenter - Man's Best Friend - Vinyle Luxe Packaging (Exclusivité)",price:"€59,99",category:1},{id:2,name:"Various Artist - Almost Famous - Double Vinyle Violet & Magenta Exclusif",price:"€34,99",category:1},{id:3,name:"KPop Demon Hunters (Soundtrack from the Netflix Film) - Vinyle Smokey Fushia Exclusif",price:"€29,99",category:1}];p.fetch=async function(e){let r=await L("products/"+e);return r==!1?r[0]:r};p.fetchAll=async function(){let e=await L("products");return e==!1?F:e};p.parCategory=async function(e){let r=await L(`products?category=${e}`);return r===!1?F.filter(t=>t.category==e):r};let w={},N=[{id:1,name:"Mobilier"},{id:2,name:"Électronique"},{id:3,name:"Bureautique"}];w.fetchAll=async function(){let e=await L("categories");return e===!1?N:e};w.findNameOfCategory=async function(e){let r=await L(`categories/${e}`);if(r===!1||!r){const t=N.find(n=>n.id==e);return t?t.name:null}return r.name||null};let k=function(e,r){let t=e;for(let n in r)t=t.replaceAll(new RegExp("{{"+n+"}}","g"),r[n]);return t};function u(e){const r=document.createElement("template");return r.innerHTML=e.trim(),r.content}const G=`<a href="/products/{{id}}/{{name}}"\r
  ><div class="flex flex-col items-start rounded-lg w-full">\r
    <!-- Photo + border container -->\r
    <div\r
      class="border border-gray-20 border-solid flex flex-col gap-1 h-[24.75rem] md:h-[24.75rem] items-center justify-center p-4 rounded-lg w-full"\r
    >\r
      <div class="flex-grow rounded-[5px] w-full overflow-hidden">\r
        <img\r
          src="../../../public/images/{{image}}"\r
          alt="{{name}}"\r
          class="w-full h-full object-cover"\r
        />\r
      </div>\r
    </div>\r
\r
    <!-- Title + price -->\r
    <div\r
      class="flex flex-col gap-3 items-start p-[10px] text-fg text-base leading-6 w-full"\r
    >\r
      <p\r
        class="font-normal overflow-hidden text-ellipsis w-full font-rethink"\r
        style="\r
          display: -webkit-box;\r
          -webkit-line-clamp: 2;\r
          -webkit-box-orient: vertical;\r
        "\r
      >\r
        {{name}}\r
      </p>\r
      <p class="font-bold w-full tracking-[0.16px] font-rethink">€{{price}}</p>\r
    </div>\r
\r
    <!-- Button -->\r
    <button\r
      data-buy="{{id}}"\r
      class="bg-[#f6f5fa] gap-1 items-center justify-center font-normal text-black text-sm uppercase whitespace-nowrap font-rethink eading-5 px-3 py-[14px] rounded-lg w-full transition hover:bg-accent-hover hidden"\r
    >\r
      Ajouter au panier\r
    </button>\r
  </div>\r
</a>\r
`;let $={html:function(e){const r=Array.isArray(e)?e:e&&typeof e=="object"?[e]:[];let t='<div class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">';for(let n of r)t+=k(G,n);return t+"</div>"},dom:function(e){return u($.html(e))}};const J=`<aside class="w-full xl:w-80 flex flex-col gap-4">\r
  <div class="flex items-center justify-between">\r
    <h3 class="text-fg font-bebas text-xl tracking-wide uppercase">Filtre</h3>\r
  </div>\r
\r
  <div class="flex flex-col gap-3">\r
    <div data-category-list class="flex flex-col gap-2"></div>\r
\r
    <button\r
      type="button"\r
      data-reset-filters\r
      class="mt-2 w-full bg-[#f6f5fa] text-black font-rethink text-sm uppercase px-3 py-3 rounded-lg transition hover:bg-accent-hover"\r
    >\r
      Tout réinitialiser\r
    </button>\r
  </div>\r
</aside>\r
`,K=(e,r)=>`
  <div class="flex items-center gap-3">
    <input
      type="radoio"
      name="category"
      id="cat-${e}"
      value="${e}"
      }
      class="peer sr-only"
    />
    <label
      for="cat-${e}"
      data-id="${e}"
      class="flex items-center gap-3 cursor-pointer select-none hover:bg-accent-hover rounded p-2 transition-colors peer-checked:bg-gray-100"
    >
      ${r}
    </label>
  </div>
`,Y={dom(e,r={}){const t=u(J),n=t.querySelector("[data-category-list]"),o=Array.isArray(e)?e:[];let a="";for(let l=0;l<o.length;l++){const c=o[l];a+=K(c.id,c.name||c.label||`Cat ${c.id}`)}return n&&n.replaceChildren(u(a)),t}},Z=`<div class="flex flex-col items-start self-stretch gap-4 md:gap-8 lg:gap-8">\r
  <h1\r
    class="text-fg font-bebas tracking-tighter text-mh2 md:text-dh2 lg:text-dh2 uppercase leading-[95%]"\r
  >\r
    {{categoryName}}\r
    <span class="md:text-dind lg:text-dind align-top"\r
      >(<span data-nombre>{{nombre}}</span>)</span\r
    >\r
  </h1>\r
  <p class="font-rethink text-gray-50 w-full md:w-[40rem] lg:w-[40rem]">\r
    Faites le plein des pépites fraîchement ajoutées à notre catalogue :\r
    nouveautés en précommande et dernières (re)mises en vente, maintenant\r
    disponibles !\r
  </p>\r
  <section class="bg-bg flex flex-col xl:flex-row flex-1 gap-8">\r
    <!-- <slot name="categories"></slot> -->\r
    <div data-products-host>\r
      <slot name="products"></slot>\r
    </div>\r
  </section>\r
</div>\r
`;let s={products:[],categories:[],selectedCategory:null,categoryName:"Le catalogue de produits",totalProducts:0};s.getCategoryById=function(e){return s.categories.find(r=>r.id==e)};let m={};m.handler_clickOnProduct=function(e){const r=e.target.closest("[data-buy]");r&&alert(`Le produit d'identifiant ${r.dataset.buy} ? Excellent choix !`)};m.updateProductsForCategory=async function(e,r){r?(s.selectedCategory=r,s.categoryName=w.findNameOfCategory(r)):s.selectedCategory=null,s.selectedCategory?s.products=await p.parCategory(s.selectedCategory):s.products=await p.fetchAll(),s.totalProducts=s.products.length;let t=null;if(s.selectedCategory){for(const o of s.categories)if(String(o.id)===String(s.selectedCategory)){t=o;break}}s.categoryName=t?t.name:"Le catalogue de produits";const n=e.querySelector("[data-products-host]");if(n){const o=$.dom(s.products);n.replaceChildren(o);const a=e.querySelector("[data-nombre]");a&&(a.textContent=s.products.length);const l=e.querySelector("[data-category-name]");l&&(l.textContent=s.categoryName)}};m.onLabelClick=async function(e){const r=e.target.closest("label");if(!r)return;const t=e.currentTarget,n=r.getAttribute("for"),o=t.querySelector(`#${n}`);o&&await m.updateProductsForCategory(t,o.value)};m.init=async function(e){let r=e.id;if(s.selectedCategory=r,s.categories=await w.fetchAll(),s.selectedCategory?s.products=await p.parCategory(s.selectedCategory):s.products=await p.fetchAll(),s.totalProducts=s.products.length,s.selectedCategory){const t=s.categories.find(n=>String(n.id)===String(s.selectedCategory));s.categoryName=t?t.name:"Le catalogue de produits"}else s.categoryName="Le catalogue de produits";return b.init(s.products,s.categories,s.selectedCategory,s.totalProducts)};let b={};b.init=function(e,r,t=null,n){let o=b.createPageFragment(e,r,t,n);return b.attachEvents(o),o};b.createPageFragment=function(e,r){let t=Z.replaceAll("{{categoryName}}",s.categoryName);console.log(s.categoryName);let n=u(t),o=Y.dom(r),a=n.querySelector('slot[name="categories"]');a&&a.replaceWith(o);let l=$.dom(e),c=document.createElement("div");c.setAttribute("data-products-host",""),c.appendChild(l);let i=n.querySelector('slot[name="products"]');i&&i.replaceWith(c);let f=n.querySelector("[data-nombre]");return f&&(f.textContent=e.length),n};b.attachEvents=function(e){const r=e.firstElementChild;return r.addEventListener("click",m.handler_clickOnProduct),r.addEventListener("click",m.onLabelClick),e};function V(e){return console.log("ProductsPage params:",e),m.init(e)}const Q=`<!-- Breadcrumb -->\r
<nav\r
  class="flex gap-[0.5rem] items-center text-[0.875rem] font-rethink text-gray-50 pb-10"\r
>\r
  <a href="/products" data-link class="hover:text-fg transition-colors"\r
    >Produits</a\r
  >\r
  <span>›</span>\r
  <a\r
    href="/category/{{id}}/{{categoryName}}"\r
    data-link\r
    class="hover:text-fg transition-colors"\r
    >{{categoryName}}</a\r
  >\r
  <span>›</span>\r
  <span class="text-fg">{{name}}</span>\r
</nav>\r
`;let X={html:function(e){return k(Q,e)},dom:function(e){return u(this.html(e))}};const ee=`<article\r
  class="flex flex-col lg:flex-row lg:gap-[2.5rem] w-full max-w-[90rem] mx-auto p-[1rem] gap-4"\r
>\r
  <div class="flex-1 flex flex-col gap-[1rem] lg:gap-[1.5rem]">\r
    <!-- Product Title -->\r
    <h1\r
      class="font-bebas text-fg text-mh2 lg:text-dh2 uppercase leading-[95%] tracking-tighter"\r
    >\r
      {{name}}\r
    </h1>\r
\r
    <!-- Description -->\r
    <div class="flex flex-col gap-[0.75rem]">\r
      <p class="font-rethink text-gray-50 text-[1rem] leading-relaxed">\r
        {{description}}\r
      </p>\r
    </div>\r
    <section id="infosupp" class="hidden flex-col">\r
      <h3 class="font-bebas font-bold text-size22">Information principales</h3>\r
      <ul class="w-full">\r
        <li class="flex font-rethink text-size16">\r
          <p>\r
            <span class="font-bold w-[50%] pr-4">Interprète / Groupe</span>\r
            {{artist}}\r
          </p>\r
        </li>\r
        <li class="flex font-rethink text-size16">\r
          <p><span class="font-bold w-[50%] pr-4">Label</span> {{label}}</p>\r
        </li>\r
        <li class="flex font-rethink text-size16">\r
          <p>\r
            <span class="font-bold w-[50%] pr-4">Pays d'origine</span>\r
            {{country}}\r
          </p>\r
        </li>\r
        <li class="flex font-rethink text-size16">\r
          <p>\r
            <span class="font-bold w-[50%] pr-4"\r
              >Année de sortie / réédition</span\r
            >\r
            {{year}}\r
          </p>\r
        </li>\r
        <li class="flex font-rethink text-size16">\r
          <p><span class="font-bold w-[50%] pr-4">Genre(s)</span> {{genre}}</p>\r
        </li>\r
        <li class="flex font-rethink text-size16">\r
          <p>\r
            <span class="font-bold w-[50%] pr-4">État de l'édition</span>\r
            {{etat}}\r
          </p>\r
        </li>\r
        <li class="flex font-rethink text-size16">\r
          <p>\r
            <span class="font-bold w-[50%] pr-4"\r
              >Caractéristiques spéciales</span\r
            >\r
            {{special}}\r
          </p>\r
        </li>\r
      </ul>\r
    </section>\r
    <!-- Price & Add to Cart -->\r
    <div class="flex flex-col gap-[1rem] mt-auto">\r
      <div class="flex items-baseline gap-[0.5rem]">\r
        <span class="font-bebas text-fg text-[3rem] lg:text-[3.5rem]">\r
          €{{price}}\r
        </span>\r
      </div>\r
\r
      <button\r
        data-buy="{{id}}"\r
        class="w-full px-[1.5rem] py-[1rem] bg-fg text-bg font-rethink font-semibold text-[0.875rem] lg:text-[1rem] rounded-lg hover:opacity-90 transition-opacity uppercase tracking-wide"\r
      >\r
        Ajouter au panier\r
      </button>\r
    </div>\r
  </div>\r
</article>\r
`;let D={html:function(e){return k(ee,e)},dom:function(e){const r=u(D.html(e));if(e.artist||e.label){const t=r.querySelector("#infosupp");t&&(t.classList="flex flex-col gap-2")}else{const t=r.querySelector("#infosupp");t&&t.remove()}return r}};const re=`<div class="flex-1 min-w-0">\r
  <div class="flex flex-col gap-[1rem]">\r
    <div class="relative w-full" data-gallery-container>\r
      <img\r
        data-main-image\r
        src="../../../public/images/{{mainImage}}"\r
        alt="Product image"\r
        class="w-full aspect-square object-cover rounded-lg border border-gray-20 lg:max-w-[41rem]"\r
      />\r
    </div>\r
    <div class="grid grid-cols-2 gap-2" data-thumbs>{{thumbs}}</div>\r
    <div class="flex justify-between items-center pt-4 pb-4">\r
      <button\r
        data-gallery-prev\r
        class="flex justify-center items-center gap-[0.25rem] px-[0.875rem] py-[0.875rem] rounded-lg bg-accent-hover hover:opacity-80 transition-opacity"\r
        aria-label="Previous image"\r
        type="button"\r
      >\r
        <!-- left icon -->\r
        <svg\r
          xmlns="http://www.w3.org/2000/svg"\r
          width="1.25rem"\r
          height="1.25rem"\r
          viewBox="0 0 20 20"\r
          fill="none"\r
        >\r
          <path\r
            d="M12.5 5L7.5 10L12.5 15"\r
            stroke="#212121"\r
            stroke-width="2"\r
            stroke-linecap="round"\r
            stroke-linejoin="round"\r
          />\r
        </svg>\r
      </button>\r
\r
      <button\r
        data-gallery-next\r
        class="flex justify-center items-center gap-[0.25rem] px-[0.875rem] py-[0.875rem] rounded-lg bg-accent-hover hover:opacity-80 transition-opacity"\r
        aria-label="Next image"\r
        type="button"\r
      >\r
        <!-- right icon -->\r
        <svg\r
          xmlns="http://www.w3.org/2000/svg"\r
          width="1.25rem"\r
          height="1.25rem"\r
          viewBox="0 0 20 20"\r
          fill="none"\r
        >\r
          <path\r
            d="M7.5 5L12.5 10L7.5 15"\r
            stroke="#212121"\r
            stroke-width="2"\r
            stroke-linecap="round"\r
            stroke-linejoin="round"\r
          />\r
        </svg>\r
      </button>\r
    </div>\r
  </div>\r
</div>\r
`;let te={html:function(e){if(!e||e.length===0)return"<div class='flex-1 min-w-0'><p class='text-center text-gray-500'>Aucune image disponible</p></div>";const r=e[0],t=(a,l)=>`
      <button
        type="button"
        class="group relative rounded-md overflow-hidden border border-gray-300 hover:border-accent-hover transition-colors cursor-pointer"
        data-thumb-index="${l}"
      >
        <img 
          src="/images/${a}" 
          alt="Miniature ${l+1}" 
          class="w-full h-full object-cover aspect-square" 
          loading="lazy" 
        />
      </button>
    `,n=e[1]?t(e[1],1):"",o=e[2]?t(e[2],2):"";return k(re,{mainImage:r,thumbs:n+o})},dom:function(e){const r=u(this.html(e));if(!e||e.length===0)return r;const t=r.querySelector("[data-main-image]"),n=r.querySelector("[data-gallery-prev]"),o=r.querySelector("[data-gallery-next]"),a=r.querySelector("[data-thumbs]");let l=0;const c=()=>{const f=(l+1)%e.length,h=(l+2)%e.length;let x="";e[f]&&(x+=`
          <button type="button" 
                  class="group relative rounded-md overflow-hidden border border-gray-300 hover:border-accent-hover transition-colors cursor-pointer"
                  data-thumb-index="${f}">
            <img src="/images/${e[f]}" 
                 alt="Miniature ${f+1}"
                 class="w-full h-full object-cover aspect-square" 
                 loading="lazy" />
          </button>
        `),e.length>2&&e[h]&&(x+=`
          <button type="button" 
                  class="group relative rounded-md overflow-hidden border border-gray-300 hover:border-accent-hover transition-colors cursor-pointer"
                  data-thumb-index="${h}">
            <img src="/images/${e[h]}" 
                 alt="Miniature ${h+1}"
                 class="w-full h-full object-cover aspect-square" 
                 loading="lazy" />
          </button>
        `),a.innerHTML=x},i=()=>{t.src=`/images/${e[l]}`,t.alt=`Product image ${l+1}`,c()};return n&&n.addEventListener("click",()=>{l=(l-1+e.length)%e.length,i()}),o&&o.addEventListener("click",()=>{l=(l+1)%e.length,i()}),a&&a.addEventListener("click",f=>{const h=f.target.closest("[data-thumb-index]");if(!h)return;const x=Number(h.getAttribute("data-thumb-index"));Number.isFinite(x)&&(l=x,i())}),i(),r}};const ne=`<div>\r
  <slot name="profile"></slot>\r
</div>\r
`;let P={product:null,ImageGallery:[]};P.getProductById=function(e){return P.product.find(r=>r.id==e)};let z={};z.init=async function(e){let r=e.id,t=await p.fetch(r);console.log(t),t.gallery.forEach(function(o){P.ImageGallery.push(o)});let n=await w.findNameOfCategory(t.category);return n=await w.findNameOfCategory(t.category),q.init(t,n)};let q={};q.init=function(e,r){return q.createPageFragment(e,r)};q.createPageFragment=function(e,r){let t=u(ne),n={categoryName:r,name:e.name},o=X.dom(n),a=D.dom(e),l=te.dom(P.ImageGallery);return t.querySelector('slot[name="breadcrumb"]').replaceWith(o),t.querySelector('slot[name="gallery"]').replaceWith(l),t.querySelector('slot[name="detail"]').replaceWith(a),t};function oe(e){return z.init(e)}const ae=`<section\r
  class="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-10"\r
>\r
  <article\r
    class="w-full max-w-[25rem] bg-white rounded-lg border border-gray-20 border-solid p-8"\r
  >\r
    <!-- Header -->\r
    <div class="flex flex-col gap-2 mb-6">\r
      <h2 class="font-bebas text-mh2 sm:text-mh2 text-fg leading-tight">\r
        Créer un compte\r
      </h2>\r
      <p class="font-rethink text-size16 text-gray-50">\r
        Vous pourrez passer plus rapidement au paiement, enregistrer plusieurs\r
        adresses de livraison et bien plus encore.\r
      </p>\r
    </div>\r
\r
    <!-- Form -->\r
    <form id="connectionForm" class="flex flex-col gap-6">\r
      <div class="flex flex-col gap-2">\r
        <label for="name" class="font-bebas text-size16 text-fg font-medium">\r
          Prénom\r
        </label>\r
        <input\r
          type="text"\r
          id="name"\r
          name="name"\r
          required\r
          placeholder="Alina"\r
          class="w-full px-4 py-3 border border-gray-20 border-solid rounded-lg font-rethink text-size16 text-fg placeholder:text-gray-50 focus:outline-none focus:border-fg hover:border-gray-50 transition-colors"\r
        />\r
        <label for="surname" class="font-bebas text-size16 text-fg font-medium">\r
          Nom\r
        </label>\r
        <input\r
          type="text"\r
          id="surname"\r
          name="surname"\r
          required\r
          placeholder="Mishcherikova"\r
          class="w-full px-4 py-3 border border-gray-20 border-solid rounded-lg font-rethink text-size16 text-fg placeholder:text-gray-50 focus:outline-none focus:border-fg hover:border-gray-50 transition-colors"\r
        />\r
        <label for="email" class="font-bebas text-size16 text-fg font-medium">\r
          Email\r
        </label>\r
        <input\r
          type="email"\r
          id="email"\r
          name="email"\r
          required\r
          placeholder="exemple@email.com"\r
          class="w-full px-4 py-3 border border-gray-20 border-solid rounded-lg font-rethink text-size16 text-fg placeholder:text-gray-50 focus:outline-none focus:border-fg hover:border-gray-50 transition-colors"\r
        />\r
      </div>\r
      <div class="flex flex-col gap-2">\r
        <label\r
          for="password"\r
          class="font-bebas text-size16 text-fg font-medium"\r
        >\r
          Mot de passe\r
        </label>\r
        <input\r
          type="password"\r
          id="password"\r
          name="password"\r
          required\r
          placeholder="********"\r
          class="w-full px-4 py-3 border border-gray-20 border-solid rounded-lg font-rethink text-size16 text-fg placeholder:text-gray-50 focus:outline-none focus:border-fg hover:border-gray-50 transition-colors"\r
        />\r
        <!-- <section>\r
          <p>Le mot de passe doit :</p>\r
          <ul class="pl-8">\r
            <li class="list-disc">comporter au moins 8 caractères</li>\r
            <li class="list-disc">contenir un chiffre</li>\r
            <li class="list-disc">\r
              contenir des caractères majuscules et minuscules\r
            </li>\r
            <li class="list-disc">contenir au moins un caractère spécial</li>\r
          </ul>\r
        </section> -->\r
      </div>\r
      <button\r
        type="submit"\r
        class="w-full bg-fg text-bg px-6 py-3 rounded-lg font-rethink text-size16 font-medium hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-fg focus:ring-offset-2 uppercase"\r
      >\r
        Créer\r
      </button>\r
    </form>\r
  </article>\r
</section>\r
`;let R={html:function(){return ae},dom:function(){return u(R.html())}},E={};E.login=async function(e){return console.log("UserData.login called with:",e),await M("users?login",e)};E.connection=async function(e){console.log("UserData.connection called with:",e);const r=await M("users",e);return console.log("UserData.connection response:",r),r};const le=`<div id="connection-page" class="w-full">\r
  <slot name="form"></slot>\r
</div>\r
`;let S={};S.handler_form=async function(e){e.preventDefault(),e.stopPropagation();let r=e.target,t=new FormData(r);const n=t.get("email").trim().toLowerCase(),o=t.get("name").trim(),a=t.get("surname").trim(),l=t.get("password").trim();if(!n||!n.includes("@")||l.length<8){alert("Veuillez entrer un email valide et un mot de passe (8 caractères minimum).");return}const c={email:n,password:l,firstName:o,secondName:a};console.log("Données de connexion :",c);try{const i=await E.connection(c);if(!i||i===!1){alert("Erreur lors de la création du compte. Vérifiez la console.");return}i.error?alert("Erreur: "+i.error):(console.log("Compte créé avec succès !",i),alert("Compte créé avec succès !"),typeof router<"u"&&(router.setAuth(!0),router.navigate("/")))}catch(i){console.error("Erreur de connexion :",i),alert("Erreur technique: "+i.message)}};S.init=function(){return y.init()};let y={};y.init=function(){let e=y.createPageFragment();return y.attachEvents(e),e};y.createPageFragment=function(){let e=u(le),r=R.dom();return e.querySelector("slot[name=form]").replaceWith(r),e};y.attachEvents=function(e){return e.querySelector("#connectionForm").addEventListener("submit",S.handler_form),e};function se(){return S.init()}const ie=`<section\r
  class="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-10"\r
>\r
  <article\r
    class="w-full max-w-[25rem] bg-white rounded-lg border border-gray-20 border-solid p-8"\r
  >\r
    <!-- Header -->\r
    <h2 class="font-bebas text-mh2 sm:text-mh2 text-fg leading-tight">\r
      Connexion\r
    </h2>\r
\r
    <!-- Form -->\r
    <form id="connectionForm" class="flex flex-col gap-6">\r
      <div class="flex flex-col gap-2">\r
        <label for="email" class="font-bebas text-size16 text-fg font-medium">\r
          Email\r
        </label>\r
        <input\r
          type="email"\r
          id="email"\r
          name="email"\r
          required\r
          placeholder="exemple@email.com"\r
          class="w-full px-4 py-3 border border-gray-20 border-solid rounded-lg font-rethink text-size16 text-fg placeholder:text-gray-50 focus:outline-none focus:border-fg hover:border-gray-50 transition-colors"\r
        />\r
        <label\r
          for="password"\r
          class="font-bebas text-size16 text-fg font-medium"\r
        >\r
          Mot de passe\r
        </label>\r
        <input\r
          type="password"\r
          id="password"\r
          name="password"\r
          required\r
          placeholder="********"\r
          class="w-full px-4 py-3 border border-gray-20 border-solid rounded-lg font-rethink text-size16 text-fg placeholder:text-gray-50 focus:outline-none focus:border-fg hover:border-gray-50 transition-colors"\r
        />\r
      </div>\r
      <button\r
        type="submit"\r
        class="w-full bg-fg text-bg px-6 py-3 rounded-lg font-rethink text-size16 font-medium hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-fg focus:ring-offset-2 uppercase"\r
      >\r
        Connéxion\r
      </button>\r
    </form>\r
  </article>\r
</section>\r
`;let B={html:function(){return ie},dom:function(){return u(B.html())}};const ce=`<div id="connection-page" class="w-full">\r
  <slot name="form"></slot>\r
</div>\r
`;let g={};g.handler_form=async function(e){e.preventDefault(),e.stopPropagation();let r=e.target,t=new FormData(r);const n=t.get("email").trim().toLowerCase(),o=t.get("password").trim();if(!n||!n.includes("@")||o.length<8){alert("Veuillez entrer un email valide et un mot de passe (8 caractères minimum).");return}const a={email:n,password:o};console.log("Données de connexion :",a);try{const l=await E.login(a);if(!l||l===!1){alert("Erreur lors de la connexion. Vérifiez vos identifiants.");return}l.error?alert("Erreur: "+l.error):(console.log("Connexion réussie",l),localStorage.setItem("connectedUser",JSON.stringify(l)),g.router?(g.router.setAuth(!0),g.router.navigate("/profile")):console.error("Router is not available!"))}catch(l){console.error("Erreur de connexion :",l),alert("Erreur technique: "+l.message)}};g.init=function(e){return g.router=e,v.init()};let v={};v.init=function(){let e=v.createPageFragment();return v.attachEvents(e),e};v.createPageFragment=function(){let e=u(ce),r=B.dom();return e.querySelector("slot[name=form]").replaceWith(r),e};v.attachEvents=function(e){return e.querySelector("#connectionForm").addEventListener("submit",g.handler_form),e};function ue(e,r){return g.init(r)}const de=`<article\r
  class="flex flex-col lg:flex-row lg:gap-[2.5rem] w-full max-w-[90rem] mx-auto p-[1rem] gap-4"\r
>\r
  <div class="flex-1 flex flex-col gap-[1rem] lg:gap-[1.5rem]">\r
    <h1\r
      class="font-bebas text-fg text-mh2 lg:text-dh2 uppercase leading-[95%] tracking-tighter"\r
    >\r
      Content de vous revoir, {{firstName}}\r
    </h1>\r
    <section class="flex gap-4 bg-fg">\r
      <button\r
        data-buy="{{id_user}}"\r
        class="w-full px-[1.5rem] py-[1rem]  text-bg font-rethink font-semibold text-[0.875rem] lg:text-[1rem] rounded-lg hover:opacity-90 transition-opacity uppercase tracking-wide"\r
      >\r
        Déconnexion \r
      </button>\r
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">\r
  <g clip-path="url(#clip0_179_2026)">\r
    <path d="M8.33398 6.66659V4.99992C8.33398 4.55789 8.50958 4.13397 8.82214 3.82141C9.1347 3.50885 9.55862 3.33325 10.0007 3.33325H15.834C16.276 3.33325 16.6999 3.50885 17.0125 3.82141C17.3251 4.13397 17.5007 4.55789 17.5007 4.99992V14.9999C17.5007 15.4419 17.3251 15.8659 17.0125 16.1784C16.6999 16.491 16.276 16.6666 15.834 16.6666H10.0007C9.55862 16.6666 9.1347 16.491 8.82214 16.1784C8.50958 15.8659 8.33398 15.4419 8.33398 14.9999V13.3333" stroke="#212121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\r
    <path d="M12.5 10H2.5L5 7.5" stroke="#212121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\r
    <path d="M5 12.5L2.5 10" stroke="#212121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\r
  </g>\r
  <defs>\r
    <clipPath id="clip0_179_2026">\r
      <rect width="20" height="20" fill="white"/>\r
    </clipPath>\r
  </defs>\r
</svg></section>\r
    </div>\r
  </div>\r
</article>\r
`;let O={html:function(e){console.log("ProfileView.html data:",e);const r=k(de,e);return console.log("ProfileView.html result:",r),r},dom:function(e){return console.log("ProfileView.dom called with:",e),u(O.html(e))}};const fe=`<div>\r
  <slot name="profile"></slot>\r
</div>\r
`;let T={};T.init=async function(e){const r=localStorage.getItem("connectedUser"),t=r?JSON.parse(r):null;return t?C.init(t):(console.error("Aucun utilisateur connecté trouvé"),C.init(null))};let C={};C.init=function(e){return C.createPageFragment(e)};C.createPageFragment=function(e){let r=u(fe),t=O.dom(e);return r.querySelector('slot[name="profile"]').replaceWith(t),r};function ge(e){return T.init(e)}const pe=`<div style="min-height: 100vh; display: flex; flex-direction: column">\r
  <slot name="header"></slot>\r
  <main class="bg-bg" style="flex: 1; padding: 2rem">\r
    <slot></slot>\r
  </main>\r
  <slot name="footer"></slot>\r
</div>\r
`,me=`<header\r
  class="bg-white border-b border-gray-20 border-solid flex flex-col gap-2 items-center px-10 py-[.8rem] w-full"\r
>\r
  <!-- Header top section -->\r
  <div class="flex items-center justify-between w-full">\r
    <!-- Logo -->\r
    <div class="h-[2.375rem] relative flex-shrink-0">\r
      <a href="/" data-link class="block w-full h-full">\r
        <svg\r
          viewBox="0 0 94 38"\r
          fill="none"\r
          xmlns="http://www.w3.org/2000/svg"\r
          class="w-full h-full"\r
        >\r
          <text\r
            x="0"\r
            y="28"\r
            font-family="'Bebas Neue', sans-serif"\r
            font-size="24"\r
            font-weight="400"\r
            fill="#212121"\r
          >\r
            VINYL COLLECTOR\r
          </text>\r
        </svg>\r
      </a>\r
    </div>\r
\r
    <!-- Top buttons -->\r
    <div data-header-buttons class="flex gap-[.375rem] items-center">\r
      <!-- Account button -->\r
      <button\r
        class="hidden sm:flex gap-1 items-center justify-center p-3 rounded-lg hover:bg-accent-hover transition-colors"\r
      >\r
        <svg\r
          class="w-5 h-5"\r
          viewBox="0 0 20 20"\r
          fill="none"\r
          xmlns="http://www.w3.org/2000/svg"\r
        >\r
          <circle\r
            cx="10"\r
            cy="6.66667"\r
            r="3.33333"\r
            stroke="#212121"\r
            stroke-width="1.5"\r
            fill="none"\r
          />\r
          <path\r
            d="M5 15.8333C5 13.5322 6.84315 11.6667 9.16667 11.6667H10.8333C13.1569 11.6667 15 13.5322 15 15.8333V17.5H5V15.8333Z"\r
            stroke="#212121"\r
            stroke-width="1.5"\r
            fill="none"\r
          />\r
        </svg>\r
      </button>\r
\r
      <!-- Cart button -->\r
      <!-- <button\r
        class="flex items-center justify-center px-3 py-[14px] rounded-lg hover:bg-accent-hover transition-colors"\r
      >\r
        <svg\r
          class="w-5 h-5"\r
          viewBox="0 0 20 20"\r
          fill="none"\r
          xmlns="http://www.w3.org/2000/svg"\r
        >\r
          <path\r
            d="M3.33334 3.33334H5.00001L7.08334 13.3333H16.6667L18.3333 6.66667H6.66667"\r
            stroke="#212121"\r
            stroke-width="1.5"\r
            fill="none"\r
            stroke-linecap="round"\r
            stroke-linejoin="round"\r
          />\r
          <circle cx="8.33334" cy="16.6667" r="1.66667" fill="#212121" />\r
          <circle cx="15" cy="16.6667" r="1.66667" fill="#212121" />\r
        </svg>\r
      </button> -->\r
      <!-- Burger button-->\r
      <button\r
        id="#burgerMenu"\r
        class="flex sm:hidden items-center justify-center px-3 py-[14px] rounded-lg hover:bg-accent-hover transition-colors"\r
      >\r
        <svg\r
          xmlns="http://www.w3.org/2000/svg"\r
          width="20"\r
          height="20"\r
          viewBox="0 0 20 20"\r
          fill="none"\r
        >\r
          <g clip-path="url(#clip0_69_148)">\r
            <path\r
              d="M3.33325 5H16.6666"\r
              stroke="#212121"\r
              stroke-width="2"\r
              stroke-linecap="round"\r
              stroke-linejoin="round"\r
            />\r
            <path\r
              d="M3.33325 10H16.6666"\r
              stroke="#212121"\r
              stroke-width="2"\r
              stroke-linecap="round"\r
              stroke-linejoin="round"\r
            />\r
            <path\r
              d="M3.33325 15H16.6666"\r
              stroke="#212121"\r
              stroke-width="2"\r
              stroke-linecap="round"\r
              stroke-linejoin="round"\r
            />\r
          </g>\r
          <defs>\r
            <clipPath id="clip0_69_148">\r
              <rect width="20" height="20" fill="white" />\r
            </clipPath>\r
          </defs>\r
        </svg>\r
      </button>\r
    </div>\r
  </div>\r
\r
  <!-- Divider -->\r
  <div class="hidden sm:flex w-full items-center justify-center">\r
    <div class="w-full h-[2px] bg-gray-20 rounded"></div>\r
  </div>\r
\r
  <!-- Menu navigation -->\r
  <ul\r
    class="sm:flex gap-4 items-start w-full hidden lg:flex-row"\r
    data-category-menu\r
  >\r
    <li>\r
      <a\r
        href="/products"\r
        data-link\r
        class="flex gap-1 items-center justify-center p-3 rounded-lg hover:bg-accent-hover transition-colors font-normal leading-5 text-fg text-sm uppercase whitespace-nowrap text-rethink"\r
      >\r
        Tout les produits\r
      </a>\r
    </li>\r
    <li\r
      class="focus:outline-violet-500 active:bg-violet-700 active:border border-b-1-black"\r
    >\r
      <a\r
        href="/category/1/vinyles"\r
        data-link\r
        class="flex gap-1 items-center justify-center p-3 rounded-lg hover:bg-accent-hover transition-colors font-normal leading-5 text-fg text-sm uppercase whitespace-nowrap text-rethink"\r
      >\r
        Vinyles\r
      </a>\r
    </li>\r
    <li\r
      class="focus:outline-violet-500 active:bg-violet-700 active:border border-b-1-black"\r
    >\r
      <a\r
        href="/category/2/merch"\r
        data-link\r
        class="flex gap-1 items-center justify-center p-3 rounded-lg hover:bg-accent-hover transition-colors font-normal leading-5 text-fg text-sm uppercase whitespace-nowrap text-rethink"\r
      >\r
        Merch\r
      </a>\r
    </li>\r
    <li\r
      class="focus:outline-violet-500 active:bg-violet-700 active:border border-b-1-black"\r
    >\r
      <a\r
        href="/category/3/accessoires"\r
        data-link\r
        class="flex gap-1 items-center justify-center p-3 rounded-lg hover:bg-accent-hover transition-colors font-normal leading-5 text-fg text-sm uppercase whitespace-nowrap text-rethink"\r
      >\r
        Accessoires\r
      </a>\r
    </li>\r
  </ul>\r
</header>\r
`;let he={html:function(e){return k(me,e||{})},dom:function(e){const r=this.html(e),t=u(r),n=t.querySelector("#\\#burgerMenu"),o=t.querySelector("ul[data-category-menu]");return n&&o&&n.addEventListener("click",()=>{o.classList.toggle("hidden"),o.classList.toggle("flex"),o.classList.toggle("flex-col"),o.classList.toggle("gap-4"),o.classList.toggle("items-start"),o.classList.toggle("w-full")}),t}};const j=`<footer\r
  class="bg-white border-t border-white border-solid flex flex-col gap-3 items-center pb-10 pt-4 px-10 w-full"\r
>\r
  <!-- Logo -->\r
  <div class="h-[38px] w-[94px] relative flex-shrink-0">\r
    <a href="/" data-link class="block w-full h-full">\r
      <svg\r
        viewBox="0 0 94 38"\r
        fill="none"\r
        xmlns="http://www.w3.org/2000/svg"\r
        class="w-full h-full"\r
      >\r
        <text\r
          x="0"\r
          y="28"\r
          font-family="'Bebas Neue', sans-serif"\r
          font-size="24"\r
          font-weight="400"\r
          fill="#212121"\r
        >\r
          VINYL COLLECTOR\r
        </text>\r
      </svg>\r
    </a>\r
  </div>\r
\r
  <!-- Divider -->\r
  <div class="w-full flex items-center justify-center">\r
    <div class="w-full h-[2px] bg-[#d3d3d3] rounded"></div>\r
  </div>\r
\r
  <!-- Menu navigation -->\r
  <nav class="flex gap-[10px] flex-col items-start justify-center">\r
    <a\r
      href="/products"\r
      data-link\r
      class="flex gap-1 items-center justify-center p-3 rounded-lg hover:bg-accent-hover transition-colors w-[12.5rem]"\r
    >\r
      <p\r
        class="font-normal leading-5 text-[#212121] text-sm uppercase whitespace-nowrap"\r
        style="font-family: &quot;Rethink Sans&quot;, sans-serif"\r
      >\r
        Vinyles\r
      </p>\r
    </a>\r
    <a\r
      href="/accessories"\r
      data-link\r
      class="flex gap-1 items-center justify-center p-3 rounded-lg hover:bg-accent-hover transition-colors w-[12.5rem]"\r
    >\r
      <p\r
        class="font-normal leading-5 text-[#212121] text-sm uppercase whitespace-nowrap"\r
        style="font-family: &quot;Rethink Sans&quot;, sans-serif"\r
      >\r
        Accessoires vinyle\r
      </p>\r
    </a>\r
    <a\r
      href="/merchandising"\r
      data-link\r
      class="flex gap-1 items-center justify-center p-3 rounded-lg hover:bg-accent-hover transition-colors w-[12.5rem]"\r
    >\r
      <p\r
        class="font-normal leading-5 text-fg text-sm uppercase whitespace-nowrap"\r
        style="font-family: &quot;Rethink Sans&quot;, sans-serif"\r
      >\r
        merchandising\r
      </p>\r
    </a>\r
  </nav>\r
</footer>\r
`;let xe={html:function(){return j},dom:function(){return u(j)}};function be(){let e=u(pe),r=he.dom(),t=xe.dom();return e.querySelector('slot[name="header"]').replaceWith(r),e.querySelector('slot[name="footer"]').replaceWith(t),e}const ye=` <section>\r
    <h1>404 - Page non trouvée</h1>\r
        <p>Cette page n'existe pas</p>\r
    <nav>\r
        <a href="/" data-link>Retour à l'accueil</a>\r
    </nav>\r
</section>`;function ve(){return ye}const d=new H("app",{loginPath:"/login"});d.setAuth(!0);d.setAuth(!1);d.addLayout("/",be);d.addRoute("/",U);d.addRoute("/about",_);d.addRoute("/login",ue,{useLayout:!1});d.addRoute("/connection",se,{useLayout:!1});d.addRoute("/profile",ge,{requireAuth:!0});d.addRoute("/products",V);d.addRoute("/category/:id/:name",V);d.addRoute("/products/:id/:slug",oe);d.addRoute("*",ve);d.start();
