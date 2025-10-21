(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function r(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(o){if(o.ep)return;o.ep=!0;const a=r(o);fetch(o.href,a)}})();class E{constructor(e,r={}){let n=document.getElementById(e);n||(n=document.createElement("div"),console.warn(`Element with id "${e}" not found. Creating a new div as root.`),document.body.appendChild(n)),this.root=n,this.routes=[],this.layouts={},this.currentRoute=null,this.isAuthenticated=!1,this.loginPath=r.loginPath||"/login",window.addEventListener("popstate",()=>this.handleRoute()),document.addEventListener("click",o=>{o.target.matches("[data-link]")&&(o.preventDefault(),this.navigate(o.target.getAttribute("href")))})}setAuth(e){this.isAuthenticated=e}addLayout(e,r){return this.layouts[e]=r,this}findLayout(e){let r=null,n=0;for(const[o,a]of Object.entries(this.layouts))e.startsWith(o)&&o.length>n&&(r=a,n=o.length);return r}addRoute(e,r,n={}){const o=this.pathToRegex(e),a=this.extractParams(e);return this.routes.push({path:e,regex:o,keys:a,handler:r,requireAuth:n.requireAuth||!1,useLayout:n.useLayout!==!1}),this}pathToRegex(e){if(e==="*")return/.*/;const r=e.replace(/\//g,"\\/").replace(/:(\w+)/g,"([^\\/]+)").replace(/\*/g,".*");return new RegExp("^"+r+"$")}extractParams(e){const r=[],n=e.matchAll(/:(\w+)/g);for(const o of n)r.push(o[1]);return r}getParams(e,r){const n=r.match(e.regex);if(!n)return{};const o={};return e.keys.forEach((a,s)=>{o[a]=n[s+1]}),o}navigate(e){window.history.pushState(null,null,e),this.handleRoute()}handleRoute(){const e=window.location.pathname;for(const n of this.routes)if(n.regex.test(e)){if(n.requireAuth&&!this.isAuthenticated){sessionStorage.setItem("redirectAfterLogin",e),this.navigate(this.loginPath);return}this.currentRoute=e;const o=this.getParams(n,e),a=n.handler(o);a instanceof Promise?a.then(s=>{this.renderContent(s,n,e)}):this.renderContent(a,n,e);return}const r=this.routes.find(n=>n.path==="*");if(r){const n=r.handler({});this.root.innerHTML=n}}renderContent(e,r,n){const o=e instanceof DocumentFragment;if(r.useLayout){const a=this.findLayout(n);if(a){const s=a(),i=s.querySelector("slot");if(i)if(o)i.replaceWith(e);else{const d=document.createElement("template");d.innerHTML=e,i.replaceWith(d.content)}else console.warn("Layout does not contain a <slot> element. Content will not be inserted.");this.root.innerHTML="",this.root.appendChild(s)}else o?(this.root.innerHTML="",this.root.appendChild(e)):this.root.innerHTML=e}else o?(this.root.innerHTML="",this.root.appendChild(e)):this.root.innerHTML=e;this.attachEventListeners(n)}attachEventListeners(e){const r=document.getElementById("loginBtn");r&&r.addEventListener("click",()=>{this.login()});const n=document.getElementById("logoutBtn");n&&n.addEventListener("click",()=>{this.logout()})}login(){this.setAuth(!0);const e=sessionStorage.getItem("redirectAfterLogin");sessionStorage.removeItem("redirectAfterLogin"),this.navigate(e||"/dashboard")}logout(){this.setAuth(!1),this.navigate(this.loginPath)}start(){this.handleRoute()}}const $=`<div class="mx-auto max-w-4xl p-6">\r
  <h1 class="mb-6 text-4xl font-bold text-gray-900">À propos</h1>\r
  <p class="mb-6 text-lg text-gray-700">\r
    Base de code pour la SAE 3.01. Octobre 2025</p>\r
<p class="mb-6 text-lg text-gray-700">\r
    Se référer à la documentation pour comprendre comment l'utiliser\r
    </p>\r
   \r
</div>`;function M(){return $}const B=`<div class="mx-auto max-w-4xl p-6">\r
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
`;function N(){return B}let R="https://mmi.unilim.fr/~mishcherikova1/api/",b=async function(t){let e={method:"GET"};try{var r=await fetch(R+t,e)}catch(o){return console.error("Echec de la requête : "+o),!1}return r.status!=200?(console.error("Erreur de requête : "+r.status),!1):await r.json()},f={},P=[{id:1,name:"Sabrina Carpenter - Man's Best Friend - Vinyle Luxe Packaging (Exclusivité)",price:"€59,99",category:1},{id:2,name:"Various Artist - Almost Famous - Double Vinyle Violet & Magenta Exclusif",price:"€34,99",category:1},{id:3,name:"KPop Demon Hunters (Soundtrack from the Netflix Film) - Vinyle Smokey Fushia Exclusif",price:"€29,99",category:1}];f.fetch=async function(t){let e=await b("products/"+t);return e==!1?e[0]:e};f.fetchAll=async function(){let t=await b("products");return t==!1?P:t};f.parCategory=async function(t){let e=await b(`products?category=${t}`);return e===!1?P.filter(r=>r.category==t):e};let y={},S=[{id:1,name:"Mobilier"},{id:2,name:"Électronique"},{id:3,name:"Bureautique"}];y.fetchAll=async function(){let t=await b("categories");return t===!1?S:t};y.findNameOfCategory=async function(t){let e=await b(`categories/${t}`);if(e===!1||!e){const r=S.find(n=>n.id==t);return r?r.name:null}return e.name||null};let v=function(t,e){let r=t;for(let n in e)r=r.replaceAll(new RegExp("{{"+n+"}}","g"),e[n]);return r};function c(t){const e=document.createElement("template");return e.innerHTML=t.trim(),e.content}const T=`<a href="/products/{{id}}/{{name}}"\r
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
`;let L={html:function(t){const e=Array.isArray(t)?t:t&&typeof t=="object"?[t]:[];let r='<div class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">';for(let n of e)r+=v(T,n);return r+"</div>"},dom:function(t){return c(L.html(t))}};const O=`<aside class="w-full xl:w-80 flex flex-col gap-4">\r
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
`,F=(t,e)=>`
  <div class="flex items-center gap-3">
    <input
      type="radoio"
      name="category"
      id="cat-${t}"
      value="${t}"
      }
      class="peer sr-only"
    />
    <label
      for="cat-${t}"
      data-id="${t}"
      class="flex items-center gap-3 cursor-pointer select-none hover:bg-accent-hover rounded p-2 transition-colors peer-checked:bg-gray-100"
    >
      ${e}
    </label>
  </div>
`,H={dom(t,e={}){const r=c(O),n=r.querySelector("[data-category-list]"),o=Array.isArray(t)?t:[];let a="";for(let s=0;s<o.length;s++){const i=o[s];a+=F(i.id,i.name||i.label||`Cat ${i.id}`)}return n&&n.replaceChildren(c(a)),r}},I=`<div class="flex flex-col items-start self-stretch gap-4 md:gap-8 lg:gap-8">\r
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
`;let l={products:[],categories:[],selectedCategory:null,categoryName:"Le catalogue de produits",totalProducts:0};l.getCategoryById=function(t){return l.categories.find(e=>e.id==t)};let g={};g.handler_clickOnProduct=function(t){const e=t.target.closest("[data-buy]");e&&alert(`Le produit d'identifiant ${e.dataset.buy} ? Excellent choix !`)};g.updateProductsForCategory=async function(t,e){e?(l.selectedCategory=e,l.categoryName=y.findNameOfCategory(e)):l.selectedCategory=null,l.selectedCategory?l.products=await f.parCategory(l.selectedCategory):l.products=await f.fetchAll(),l.totalProducts=l.products.length;let r=null;if(l.selectedCategory){for(const o of l.categories)if(String(o.id)===String(l.selectedCategory)){r=o;break}}l.categoryName=r?r.name:"Le catalogue de produits";const n=t.querySelector("[data-products-host]");if(n){const o=L.dom(l.products);n.replaceChildren(o);const a=t.querySelector("[data-nombre]");a&&(a.textContent=l.products.length);const s=t.querySelector("[data-category-name]");s&&(s.textContent=l.categoryName)}};g.onLabelClick=async function(t){const e=t.target.closest("label");if(!e)return;const r=t.currentTarget,n=e.getAttribute("for"),o=r.querySelector(`#${n}`);o&&await g.updateProductsForCategory(r,o.value)};g.init=async function(t){let e=t.id;if(l.selectedCategory=e,l.categories=await y.fetchAll(),l.selectedCategory?l.products=await f.parCategory(l.selectedCategory):l.products=await f.fetchAll(),l.totalProducts=l.products.length,l.selectedCategory){const r=l.categories.find(n=>String(n.id)===String(l.selectedCategory));l.categoryName=r?r.name:"Le catalogue de produits"}else l.categoryName="Le catalogue de produits";return x.init(l.products,l.categories,l.selectedCategory,l.totalProducts)};let x={};x.init=function(t,e,r=null,n){let o=x.createPageFragment(t,e,r,n);return x.attachEvents(o),o};x.createPageFragment=function(t,e){let r=I.replaceAll("{{categoryName}}",l.categoryName);console.log(l.categoryName);let n=c(r),o=H.dom(e),a=n.querySelector('slot[name="categories"]');a&&a.replaceWith(o);let s=L.dom(t),i=document.createElement("div");i.setAttribute("data-products-host",""),i.appendChild(s);let d=n.querySelector('slot[name="products"]');d&&d.replaceWith(i);let u=n.querySelector("[data-nombre]");return u&&(u.textContent=t.length),n};x.attachEvents=function(t){const e=t.firstElementChild;return e.addEventListener("click",g.handler_clickOnProduct),e.addEventListener("click",g.onLabelClick),t};function A(t){return console.log("ProductsPage params:",t),g.init(t)}const V=`<!-- Breadcrumb -->\r
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
`;let D={html:function(t){return v(V,t)},dom:function(t){return c(this.html(t))}};const z=`<article\r
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
`;let q={html:function(t){return v(z,t)},dom:function(t){const e=c(q.html(t));if(t.artist||t.label){const r=e.querySelector("#infosupp");r&&(r.classList="flex flex-col gap-2")}else{const r=e.querySelector("#infosupp");r&&r.remove()}return e}};const W=`<div class="flex-1 min-w-0">\r
  <div class="flex flex-col gap-[1rem]">\r
    <div class="relative w-full" data-gallery-container>\r
      <img\r
        data-main-image\r
        src="../../../public/images/{{mainImage}}"\r
        alt="Product image"\r
        class="w-full aspect-square object-cover rounded-lg border border-gray-20"\r
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
`;let G={html:function(t){if(!t||t.length===0)return"<div class='flex-1 min-w-0'><p class='text-center text-gray-500'>Aucune image disponible</p></div>";const e=t[0],r=(a,s)=>`
      <button
        type="button"
        class="group relative rounded-md overflow-hidden border border-gray-300 hover:border-accent-hover transition-colors cursor-pointer"
        data-thumb-index="${s}"
      >
        <img 
          src="/images/${a}" 
          alt="Miniature ${s+1}" 
          class="w-full h-full object-cover aspect-square" 
          loading="lazy" 
        />
      </button>
    `,n=t[1]?r(t[1],1):"",o=t[2]?r(t[2],2):"";return v(W,{mainImage:e,thumbs:n+o})},dom:function(t){const e=c(this.html(t));if(!t||t.length===0)return e;const r=e.querySelector("[data-main-image]"),n=e.querySelector("[data-gallery-prev]"),o=e.querySelector("[data-gallery-next]"),a=e.querySelector("[data-thumbs]");let s=0;const i=()=>{const u=(s+1)%t.length,m=(s+2)%t.length;let h="";t[u]&&(h+=`
          <button type="button" 
                  class="group relative rounded-md overflow-hidden border border-gray-300 hover:border-accent-hover transition-colors cursor-pointer"
                  data-thumb-index="${u}">
            <img src="/images/${t[u]}" 
                 alt="Miniature ${u+1}"
                 class="w-full h-full object-cover aspect-square" 
                 loading="lazy" />
          </button>
        `),t.length>2&&t[m]&&(h+=`
          <button type="button" 
                  class="group relative rounded-md overflow-hidden border border-gray-300 hover:border-accent-hover transition-colors cursor-pointer"
                  data-thumb-index="${m}">
            <img src="/images/${t[m]}" 
                 alt="Miniature ${m+1}"
                 class="w-full h-full object-cover aspect-square" 
                 loading="lazy" />
          </button>
        `),a.innerHTML=h},d=()=>{r.src=`/images/${t[s]}`,r.alt=`Product image ${s+1}`,i()};return n&&n.addEventListener("click",()=>{s=(s-1+t.length)%t.length,d()}),o&&o.addEventListener("click",()=>{s=(s+1)%t.length,d()}),a&&a.addEventListener("click",u=>{const m=u.target.closest("[data-thumb-index]");if(!m)return;const h=Number(m.getAttribute("data-thumb-index"));Number.isFinite(h)&&(s=h,d())}),d(),e}};const _=`<div>\r
  <slot name="breadcrumb"></slot>\r
  <section class="flex flex-col ls:flex-row">\r
    <slot name="gallery"></slot>\r
    <slot name="detail"></slot>\r
  </section>\r
</div>\r
`;let w={product:null,ImageGallery:[]};w.getProductById=function(t){return w.product.find(e=>e.id==t)};let j={};j.init=async function(t){let e=t.id,r=await f.fetch(e);console.log(r),r.gallery.forEach(function(o){w.ImageGallery.push(o)});let n=await y.findNameOfCategory(r.category);return n=await y.findNameOfCategory(r.category),k.init(r,n)};let k={};k.init=function(t,e){return k.createPageFragment(t,e)};k.createPageFragment=function(t,e){let r=c(_),n={categoryName:e,name:t.name},o=D.dom(n),a=q.dom(t),s=G.dom(w.ImageGallery);return r.querySelector('slot[name="breadcrumb"]').replaceWith(o),r.querySelector('slot[name="gallery"]').replaceWith(s),r.querySelector('slot[name="detail"]').replaceWith(a),r};function K(t){return j.init(t)}const Y=`<div style="min-height: 100vh; display: flex; flex-direction: column">\r
  <slot name="header"></slot>\r
  <main class="bg-bg" style="flex: 1; padding: 2rem">\r
    <slot></slot>\r
  </main>\r
  <slot name="footer"></slot>\r
</div>\r
`,U=`<header\r
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
`;let Z={html:function(t){return v(U,t||{})},dom:function(t){const e=this.html(t),r=c(e),n=r.querySelector("#\\#burgerMenu"),o=r.querySelector("ul[data-category-menu]");return n&&o&&n.addEventListener("click",()=>{o.classList.toggle("hidden"),o.classList.toggle("flex"),o.classList.toggle("flex-col"),o.classList.toggle("gap-4"),o.classList.toggle("items-start"),o.classList.toggle("w-full")}),r}};const C=`<footer\r
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
`;let J={html:function(){return C},dom:function(){return c(C)}};function Q(){let t=c(Y),e=Z.dom(),r=J.dom();return t.querySelector('slot[name="header"]').replaceWith(e),t.querySelector('slot[name="footer"]').replaceWith(r),t}const X=` <section>\r
    <h1>404 - Page non trouvée</h1>\r
        <p>Cette page n'existe pas</p>\r
    <nav>\r
        <a href="/" data-link>Retour à l'accueil</a>\r
    </nav>\r
</section>`;function ee(){return X}const p=new E("app");p.addLayout("/",Q);p.addRoute("/",N);p.addRoute("/about",M);p.addRoute("/products",A);p.addRoute("/category/:id/:name",A);p.addRoute("/products/:id/:slug",K);p.addRoute("*",ee);p.start();
