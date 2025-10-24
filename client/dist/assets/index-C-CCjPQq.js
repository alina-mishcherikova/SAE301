(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function t(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(o){if(o.ep)return;o.ep=!0;const a=t(o);fetch(o.href,a)}})();class ee{constructor(r,t={}){let n=document.getElementById(r);n||(n=document.createElement("div"),console.warn(`Element with id "${r}" not found. Creating a new div as root.`),document.body.appendChild(n)),this.root=n,this.routes=[],this.layouts={},this.currentRoute=null,this.isAuthenticated=!1,this.loginPath=t.loginPath||"/login",window.addEventListener("popstate",()=>this.handleRoute()),document.addEventListener("click",o=>{o.target.matches("[data-link]")&&(o.preventDefault(),this.navigate(o.target.getAttribute("href")))})}setAuth(r){this.isAuthenticated=r}addLayout(r,t){return this.layouts[r]=t,this}findLayout(r){let t=null,n=0;for(const[o,a]of Object.entries(this.layouts))r.startsWith(o)&&o.length>n&&(t=a,n=o.length);return t}addRoute(r,t,n={}){const o=this.pathToRegex(r),a=this.extractParams(r);return this.routes.push({path:r,regex:o,keys:a,handler:t,requireAuth:n.requireAuth||!1,useLayout:n.useLayout!==!1}),this}pathToRegex(r){if(r==="*")return/.*/;const t=r.replace(/\//g,"\\/").replace(/:(\w+)/g,"([^\\/]+)").replace(/\*/g,".*");return new RegExp("^"+t+"$")}extractParams(r){const t=[],n=r.matchAll(/:(\w+)/g);for(const o of n)t.push(o[1]);return t}getParams(r,t){const n=t.match(r.regex);if(!n)return{};const o={};return r.keys.forEach((a,s)=>{o[a]=n[s+1]}),o}navigate(r){window.history.pushState(null,null,r),this.handleRoute()}handleRoute(){const r=window.location.pathname;for(const n of this.routes)if(n.regex.test(r)){if(n.requireAuth&&!this.isAuthenticated){sessionStorage.setItem("redirectAfterLogin",r),this.navigate(this.loginPath);return}this.currentRoute=r;const o=this.getParams(n,r),a=n.handler(o,this);a instanceof Promise?a.then(s=>{this.renderContent(s,n,r)}):this.renderContent(a,n,r);return}const t=this.routes.find(n=>n.path==="*");if(t){const n=t.handler({},this);this.root.innerHTML=n}}renderContent(r,t,n){const o=r instanceof DocumentFragment;if(t.useLayout){const a=this.findLayout(n);if(a){const s=a(),u=s.querySelector("slot");if(u)if(o)u.replaceWith(r);else{const c=document.createElement("template");c.innerHTML=r,u.replaceWith(c.content)}else console.warn("Layout does not contain a <slot> element. Content will not be inserted.");this.root.innerHTML="",this.root.appendChild(s)}else o?(this.root.innerHTML="",this.root.appendChild(r)):this.root.innerHTML=r}else o?(this.root.innerHTML="",this.root.appendChild(r)):this.root.innerHTML=r;this.attachEventListeners(n)}attachEventListeners(r){const t=document.getElementById("loginBtn");t&&t.addEventListener("click",()=>{this.login()});const n=document.getElementById("logoutBtn");n&&n.addEventListener("click",()=>{this.logout()})}login(){this.setAuth(!0);const r=sessionStorage.getItem("redirectAfterLogin");sessionStorage.removeItem("redirectAfterLogin"),this.navigate(r||"/dashboard")}logout(){this.setAuth(!1),this.navigate(this.loginPath)}start(){this.handleRoute()}}const re=`<div class="mx-auto max-w-4xl p-6">\r
  <h1 class="mb-6 text-4xl font-bold text-gray-900">À propos</h1>\r
  <p class="mb-6 text-lg text-gray-700">\r
    Base de code pour la SAE 3.01. Octobre 2025</p>\r
<p class="mb-6 text-lg text-gray-700">\r
    Se référer à la documentation pour comprendre comment l'utiliser\r
    </p>\r
   \r
</div>`;function te(){return re}const M=`<section class="flex flex-col gap-10">\r
  <h1\r
    class="font-bebas text-fg text-mh2 md:text-dh2 lg:text-dh2 uppercase leading-[95%] tracking-tighter"\r
  >\r
    Bonjour {{firstName}}\r
  </h1>\r
  <div\r
    data-vinyles\r
    class="flex flex-col items-start self-stretch gap-4 md:gap-8 lg:gap-8"\r
  >\r
    <h2\r
      class="text-fg font-bebas tracking-tighter text-mh3 md:text-dh3 lg:text-dh3 uppercase leading-[95%]"\r
    >\r
      {{categoryName}}\r
    </h2>\r
    <section class="bg-bg flex flex-col xl:flex-row flex-1 gap-8">\r
      <!-- <slot name="categories"></slot> -->\r
      <div data-products-host>\r
        <slot name="products"></slot>\r
      </div>\r
    </section>\r
  </div>\r
  <div\r
    data-merch\r
    class="flex flex-col items-start self-stretch gap-4 md:gap-8 lg:gap-8"\r
  >\r
    <h2\r
      class="text-fg font-bebas tracking-tighter text-mh3 md:text-dh3 lg:text-dh3 uppercase leading-[95%]"\r
    >\r
      {{categoryName}}\r
    </h2>\r
    <section data-merch class="bg-bg flex flex-col xl:flex-row flex-1 gap-8">\r
      <div data-products-host>\r
        <slot name="products"></slot>\r
      </div>\r
    </section>\r
  </div>\r
  <div\r
    data-accessories\r
    class="flex flex-col items-start self-stretch gap-4 md:gap-8 lg:gap-8"\r
  >\r
    <h2\r
      class="text-fg font-bebas tracking-tighter text-mh3 md:text-dh3 lg:text-dh3 uppercase leading-[95%]"\r
    >\r
      {{categoryName}}\r
    </h2>\r
    <section class="bg-bg flex flex-col xl:flex-row flex-1 gap-8">\r
      <div data-products-host>\r
        <slot name="products"></slot>\r
      </div>\r
    </section>\r
  </div>\r
</section>\r
`;let D="https://mmi.unilim.fr/~mishcherikova1/api/",P=async function(e){let r={method:"GET",credentials:"include"};try{var t=await fetch(D+e,r)}catch(o){return console.error("Echec de la requête : "+o),!1}return t.status!=200?(console.error("Erreur de requête : "+t.status),!1):await t.json()},_=async function(e,r){let t={credentials:"include",method:"POST",headers:{"Content-Type":"miltipart/form-data"},body:JSON.stringify(r)};try{var n=await fetch(D+e,t)}catch(a){return console.error("Echec de la requête : "+a),!1}if(!n.ok){const a=await n.text();return console.error("Erreur de requête : "+n.status),console.error("Réponse du serveur:",a),!1}return await n.json()},ne=async function(e){let r={method:"DELETE",credentials:"include"};try{var t=await fetch(D+e,r)}catch(o){return console.error("Echec de la requête : "+o),!1}return t.status!=200?(console.error("Erreur de requête : "+t.status),!1):await t.json()},oe=async function(e,r){let t={method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)};try{var n=await fetch(D+e,t)}catch(a){return console.error("Echec de la requête : "+a),!1}if(!n.ok){const a=await n.text();return console.error("Erreur de requête : "+n.status),console.error("Réponse du serveur:",a),!1}return await n.json()},y={},H=[{id:1,name:"Sabrina Carpenter - Man's Best Friend - Vinyle Luxe Packaging (Exclusivité)",price:"€59,99",category:1},{id:2,name:"Various Artist - Almost Famous - Double Vinyle Violet & Magenta Exclusif",price:"€34,99",category:1},{id:3,name:"KPop Demon Hunters (Soundtrack from the Netflix Film) - Vinyle Smokey Fushia Exclusif",price:"€29,99",category:1}];y.fetch=async function(e){let r=await P("products/"+e);return r==!1?r[0]:r};y.fetchAll=async function(){let e=await P("products");return e==!1?H:e};y.parCategory=async function(e){let r=await P(`products?category=${e}`);return r===!1?H.filter(t=>t.category==e):r};let C={},W=[{id:1,name:"Mobilier"},{id:2,name:"Électronique"},{id:3,name:"Bureautique"}];C.fetchAll=async function(){let e=await P("categories");return e===!1?W:e};C.findNameOfCategory=async function(e){let r=await P(`categories/${e}`);if(r===!1||!r){const t=W.find(n=>n.id==e);return t?t.name:null}return r.name||null};let k=function(e,r){if(!r)return console.warn("genericRenderer: No data provided"),e;let t=e;for(let n in r){const o=r[n]!==null&&r[n]!==void 0?r[n]:"";t=t.replaceAll(new RegExp("{{"+n+"}}","g"),o)}return t};function d(e){const r=document.createElement("template");return r.innerHTML=e.trim(),r.content}const ae=`<a href="/products/{{id}}/{{name}}"\r
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
`;let V={html:function(e){const r=Array.isArray(e)?e:e&&typeof e=="object"?[e]:[];let t='<div class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">';for(let n of r)t+=k(ae,n);return t+"</div>"},dom:function(e){return d(V.html(e))}},g={};g.login=async function(e){return await _("auth",e)};g.logout=async function(){return await ne("auth")};g.status=async function(){return console.log("UserData.status called"),await P("auth")};g.register=async function(e){const r=await _("users",e);return console.log("UserData.register response:",r),r};g.update=async function(e,r){return console.log("UserData.update called with:",e,r),await oe(`users/${e}`,r)};g.findUserEmail=async function(e){if(!e)return null;const r=await P(`users/${e}`);return r===!1||!r?null:r.firstName??null};let i={products:[],categories:[],user:null,isAuthenticated:!1};i.getCategories=async function(){return i.categories=await C.fetchAll(),console.log("categories:",i.categories),i.categories};i.checkAuth=async function(){try{const e=await g.status();console.log("Auth status:",e),e&&e!==!1&&e.authenticated&&e.user?(i.isAuthenticated=!0,i.user=e.user,console.log("User authenticated:",i.user)):(i.isAuthenticated=!1,i.user=null)}catch(e){console.error("Auth check failed:",e),i.isAuthenticated=!1,i.user=null}};i.getProducts=async function(){return i.products=await y.fetchAll(),console.log("products:",i.products),i.products};let U={};U.init=async function(){try{await Promise.all([i.checkAuth(),i.getCategories(),i.getProducts()])}catch(e){console.error("Failed loading data:",e),i.categories=i.categories||[],i.products=i.products||[]}};let $={};$.init=function(e,r,t,n){return $.createPageFragment(e,r,t,n)};$.createPageFragment=function(e=[],r=[],t=null,n=!1){let o=M;n&&t&&t.firstName?o=k(M,{firstName:t.firstName}):o=M.replace(/\{\{firstName\}\}/g,"");let a=d(o);const s=a.querySelector("h1");return s&&(n||s.classList.add("hidden")),[{element:a.querySelector("[data-vinyles]"),categoryIndex:0},{element:a.querySelector("[data-merch]"),categoryIndex:1},{element:a.querySelector("[data-accessories]"),categoryIndex:2}].forEach(({element:c,categoryIndex:f})=>{if(!c||!r[f])return;const p=r[f],b=c.querySelector("h2");b&&(b.textContent=p.name||p.title||`Catégorie ${f+1}`);const R=e.filter(N=>N.id_category===p.id||N.categoryId===p.id||N.category===p.id);console.log(`Category ${p.name}: ${R.length} products`);const Y=c.querySelector("[data-products-host]"),I=c.querySelector('slot[name="products"]');if(Y&&I){const N=V.dom(R);I.replaceWith(N)}}),a};async function se(){return await U.init(),$.init(i.products,i.categories,i.user,i.isAuthenticated)}const le=`<aside class="w-full xl:w-80 flex flex-col gap-4">\r
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
`,ie=(e,r)=>`
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
`,ce={dom(e,r={}){const t=d(le),n=t.querySelector("[data-category-list]"),o=Array.isArray(e)?e:[];let a="";for(let s=0;s<o.length;s++){const u=o[s];a+=ie(u.id,u.name||u.label||`Cat ${u.id}`)}return n&&n.replaceChildren(d(a)),t}},ue=`<div class="flex flex-col items-start self-stretch gap-4 md:gap-8 lg:gap-8">\r
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
`;let l={products:[],categories:[],selectedCategory:null,categoryName:"Le catalogue de produits",totalProducts:0};l.getCategoryById=function(e){return l.categories.find(r=>r.id==e)};let w={};w.handler_clickOnProduct=function(e){const r=e.target.closest("[data-buy]");r&&alert(`Le produit d'identifiant ${r.dataset.buy} ? Excellent choix !`)};w.updateProductsForCategory=async function(e,r){r?(l.selectedCategory=r,l.categoryName=C.findNameOfCategory(r)):l.selectedCategory=null,l.selectedCategory?l.products=await y.parCategory(l.selectedCategory):l.products=await y.fetchAll(),l.totalProducts=l.products.length;let t=null;if(l.selectedCategory){for(const o of l.categories)if(String(o.id)===String(l.selectedCategory)){t=o;break}}l.categoryName=t?t.name:"Le catalogue de produits";const n=e.querySelector("[data-products-host]");if(n){const o=V.dom(l.products);n.replaceChildren(o);const a=e.querySelector("[data-nombre]");a&&(a.textContent=l.products.length);const s=e.querySelector("[data-category-name]");s&&(s.textContent=l.categoryName)}};w.onLabelClick=async function(e){const r=e.target.closest("label");if(!r)return;const t=e.currentTarget,n=r.getAttribute("for"),o=t.querySelector(`#${n}`);o&&await w.updateProductsForCategory(t,o.value)};w.init=async function(e){let r=e.id;if(l.selectedCategory=r,l.categories=await C.fetchAll(),l.selectedCategory?l.products=await y.parCategory(l.selectedCategory):l.products=await y.fetchAll(),l.totalProducts=l.products.length,l.selectedCategory){const t=l.categories.find(n=>String(n.id)===String(l.selectedCategory));l.categoryName=t?t.name:"Le catalogue de produits"}else l.categoryName="Le catalogue de produits";return E.init(l.products,l.categories,l.selectedCategory,l.totalProducts)};let E={};E.init=function(e,r,t=null,n){let o=E.createPageFragment(e,r,t,n);return E.attachEvents(o),o};E.createPageFragment=function(e,r){let t=ue.replaceAll("{{categoryName}}",l.categoryName);console.log(l.categoryName);let n=d(t),o=ce.dom(r),a=n.querySelector('slot[name="categories"]');a&&a.replaceWith(o);let s=V.dom(e),u=document.createElement("div");u.setAttribute("data-products-host",""),u.appendChild(s);let c=n.querySelector('slot[name="products"]');c&&c.replaceWith(u);let f=n.querySelector("[data-nombre]");return f&&(f.textContent=e.length),n};E.attachEvents=function(e){const r=e.firstElementChild;return r.addEventListener("click",w.handler_clickOnProduct),r.addEventListener("click",w.onLabelClick),e};function G(e){return console.log("ProductsPage params:",e),w.init(e)}const de=`<!-- Breadcrumb -->\r
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
`;let fe={html:function(e){return k(de,e)},dom:function(e){return d(this.html(e))}};const ge=`<article\r
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
`;let J={html:function(e){return k(ge,e)},dom:function(e){const r=d(J.html(e));if(e.artist||e.label){const t=r.querySelector("#infosupp");t&&(t.classList="flex flex-col gap-2")}else{const t=r.querySelector("#infosupp");t&&t.remove()}return r}};const pe=`<div class="flex-1 min-w-0">\r
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
`;let me={html:function(e){if(!e||e.length===0)return"<div class='flex-1 min-w-0'><p class='text-center text-gray-500'>Aucune image disponible</p></div>";const r=e[0],t=(a,s)=>`
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
    `,n=e[1]?t(e[1],1):"",o=e[2]?t(e[2],2):"";return k(pe,{mainImage:r,thumbs:n+o})},dom:function(e){const r=d(this.html(e));if(!e||e.length===0)return r;const t=r.querySelector("[data-main-image]"),n=r.querySelector("[data-gallery-prev]"),o=r.querySelector("[data-gallery-next]"),a=r.querySelector("[data-thumbs]");let s=0;const u=()=>{const f=(s+1)%e.length,p=(s+2)%e.length;let b="";e[f]&&(b+=`
          <button type="button" 
                  class="group relative rounded-md overflow-hidden border border-gray-300 hover:border-accent-hover transition-colors cursor-pointer"
                  data-thumb-index="${f}">
            <img src="/images/${e[f]}" 
                 alt="Miniature ${f+1}"
                 class="w-full h-full object-cover aspect-square" 
                 loading="lazy" />
          </button>
        `),e.length>2&&e[p]&&(b+=`
          <button type="button" 
                  class="group relative rounded-md overflow-hidden border border-gray-300 hover:border-accent-hover transition-colors cursor-pointer"
                  data-thumb-index="${p}">
            <img src="/images/${e[p]}" 
                 alt="Miniature ${p+1}"
                 class="w-full h-full object-cover aspect-square" 
                 loading="lazy" />
          </button>
        `),a.innerHTML=b},c=()=>{t.src=`/images/${e[s]}`,t.alt=`Product image ${s+1}`,u()};return n&&n.addEventListener("click",()=>{s=(s-1+e.length)%e.length,c()}),o&&o.addEventListener("click",()=>{s=(s+1)%e.length,c()}),a&&a.addEventListener("click",f=>{const p=f.target.closest("[data-thumb-index]");if(!p)return;const b=Number(p.getAttribute("data-thumb-index"));Number.isFinite(b)&&(s=b,c())}),c(),r}};const he=`<div>\r
  <slot name="breadcrumb"></slot>\r
  <section class="flex flex-col md:grid md:grid-cols-2 md:">\r
    <slot name="gallery"></slot>\r
    <slot name="detail"></slot>\r
  </section>\r
</div>\r
`;let A={product:null,ImageGallery:[]};A.getProductById=function(e){return A.product.find(r=>r.id==e)};let K={};K.init=async function(e){let r=e.id,t=await y.fetch(r);console.log(t),t.gallery.forEach(function(o){A.ImageGallery.push(o)});let n=await C.findNameOfCategory(t.category);return n=await C.findNameOfCategory(t.category),F.init(t,n)};let F={};F.init=function(e,r){return F.createPageFragment(e,r)};F.createPageFragment=function(e,r){let t=d(he),n={categoryName:r,name:e.name},o=fe.dom(n),a=J.dom(e),s=me.dom(A.ImageGallery);return t.querySelector('slot[name="breadcrumb"]').replaceWith(o),t.querySelector('slot[name="gallery"]').replaceWith(s),t.querySelector('slot[name="detail"]').replaceWith(a),t};function xe(e){return K.init(e)}const be=`<section\r
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
`;let Z={html:function(){return be},dom:function(){return d(Z.html())}};const ye=`<div id="connection-page" class="w-full">\r
  <slot name="form"></slot>\r
</div>\r
`;let x={};x.handler_form=async function(e){e.preventDefault(),e.stopPropagation();let r=e.target,t=new FormData(r);const n=t.get("email").trim().toLowerCase(),o=t.get("name").trim(),a=t.get("surname").trim(),s=t.get("password").trim();if(!n||!n.includes("@")||s.length<8){alert("Veuillez entrer un email valide et un mot de passe (8 caractères minimum).");return}const u={email:n,password:s,firstName:o,secondName:a};console.log("Données de connexion :",u);try{const c=await g.register(u);if(!c||c===!1){alert("Erreur lors de la création du compte. Vérifiez la console.");return}if(c.error)alert("Erreur: "+c.error);else{console.log("Compte créé avec succès !",c);const f=await g.login({email:n,password:s});f&&f.success?(console.log("Connexion automatique réussie"),x.router?(x.router.setAuth(!0),x.router.navigate("/profile")):window.location.href="/profile"):(alert("Compte créé ! Veuillez vous connecter."),x.router?x.router.navigate("/profile"):window.location.href="/profile")}}catch(c){console.error("Erreur de connexion :",c),alert("Erreur technique: "+c.message)}};x.init=function(e){return x.router=e,L.init()};let L={};L.init=function(){let e=L.createPageFragment();return L.attachEvents(e),e};L.createPageFragment=function(){let e=d(ye),r=Z.dom();return e.querySelector("slot[name=form]").replaceWith(r),e};L.attachEvents=function(e){return e.querySelector("#connectionForm").addEventListener("submit",x.handler_form),e};function ve(e,r){return x.init(r)}const we=`<section\r
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
\r
    <hr>\r
    <section class="flex gap-4 pt-8">\r
      <h2>Vous n'avez pas de compte?</h2>\r
      <a href="/connection">\r
        <button\r
          class="w-full bg-bg border-fg border text-fg px-6 py-3 rounded-lg font-rethink text-size16 font-medium hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-fg focus:ring-offset-2 uppercase"\r
        >\r
          S'inscrire\r
        </button>\r
    </section>\r
  </article>\r
</section>\r
`;let Q={html:function(){return we},dom:function(){return d(Q.html())}};const ke=`<div id="connection-page" class="w-full">\r
  <slot name="form"></slot>\r
</div>\r
`;let v={};v.handler_form=async function(e){e.preventDefault(),e.stopPropagation();let r=e.target,t=new FormData(r);const n=t.get("email").trim().toLowerCase(),o=t.get("password").trim();if(!n||!n.includes("@")||o.length<8){alert("Veuillez entrer un email valide et un mot de passe (8 caractères minimum).");return}const a={email:n,password:o};console.log("Données de connexion :",a);try{const s=await g.login(a);if(!s||s.success===!1){alert(s.error||"Erreur lors de la connexion. Vérifiez vos identifiants.");return}console.log("Connexion réussie",s),v.router?(v.router.setAuth(!0),v.router.navigate("/profile")):(console.error("Router is not available!"),window.location.href="/profile")}catch(s){console.error("Erreur de connexion :",s),alert("Erreur technique: "+s.message)}};v.init=function(e){return v.router=e,S.init()};let S={};S.init=function(){let e=S.createPageFragment();return S.attachEvents(e),e};S.createPageFragment=function(){let e=d(ke),r=Q.dom();return e.querySelector("slot[name=form]").replaceWith(r),e};S.attachEvents=function(e){return e.querySelector("#connectionForm").addEventListener("submit",v.handler_form),e};function Ce(e,r){return v.init(r)}const O=`<article\r
  class="flex flex-col lg:flex-row lg:gap-[2.5rem] items-start p-[1rem] gap-4"\r
>\r
  <div class="flex-1 flex flex-col gap-[1rem] lg:gap-[1.5rem]">\r
    <h1\r
      class="font-bebas text-fg text-mh3 lg:text-dh3 uppercase leading-[95%] tracking-tighter"\r
    >\r
      Content de vous revoir, {{firstName}}\r
    </h1>\r
    <section class="flex flex-col gap-4 items-start text-left  md:ju">\r
      <button\r
       data-disconnect\r
        class="w-max-[12.5rem] text-fg font-rethink font-semibold text-[0.875rem] lg:text-[1rem] rounded-lg hover:opacity-90 transition-opacity uppercase tracking-wide flex gap-2 py-4"\r
      > Déconnexion  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">\r
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
</svg>\r
      </button>\r
       <button\r
       data-profil-info\r
        class="w-max-[12.5rem] text-fg font-rethink font-semibold text-[0.875rem] lg:text-[1rem] rounded-lg hover:opacity-90 transition-opacity uppercase tracking-wide flex gap-2 py-4"\r
      >\r
        Profil\r
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">\r
  <g clip-path="url(#clip0_194_2257)">\r
    <path d="M6.66699 5.83333C6.66699 6.71739 7.01818 7.56524 7.6433 8.19036C8.26842 8.81548 9.11627 9.16667 10.0003 9.16667C10.8844 9.16667 11.7322 8.81548 12.3573 8.19036C12.9825 7.56524 13.3337 6.71739 13.3337 5.83333C13.3337 4.94928 12.9825 4.10143 12.3573 3.47631C11.7322 2.85119 10.8844 2.5 10.0003 2.5C9.11627 2.5 8.26842 2.85119 7.6433 3.47631C7.01818 4.10143 6.66699 4.94928 6.66699 5.83333Z" stroke="#212121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\r
    <path d="M5 17.5V15.8333C5 14.9493 5.35119 14.1014 5.97631 13.4763C6.60143 12.8512 7.44928 12.5 8.33333 12.5H11.6667C12.5507 12.5 13.3986 12.8512 14.0237 13.4763C14.6488 14.1014 15 14.9493 15 15.8333V17.5" stroke="#212121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\r
  </g>\r
  <defs>\r
    <clipPath id="clip0_194_2257">\r
      <rect width="20" height="20" fill="white"/>\r
    </clipPath>\r
  </defs>\r
</svg>\r
      </button>\r
   </section>\r
    </div>\r
  </div>\r
</article>\r
`;let z={html:function(e){return e?(console.log("ProfileView rendering with data:",e),k(O,e)):(console.warn("ProfileView: No data provided"),O.replace(/{{firstName}}/g,"Utilisateur"))},dom:function(e){return d(z.html(e))}};const T=`<section class="flex items-center justify-center w-full">\r
  <article\r
    class="w-full max-w-[25rem] bg-white rounded-lg border border-gray-20 border-solid p-8"\r
  >\r
    <!-- Form -->\r
    <form id="dataForm" class="flex flex-col gap-6">\r
      <div class="flex flex-col gap-2">\r
        <label\r
          for="firstName"\r
          class="font-bebas text-size16 text-fg font-medium"\r
        >\r
          Prenom\r
        </label>\r
        <input\r
          type="text"\r
          id="firstName"\r
          name="firstName"\r
          class="w-full px-4 py-3 border border-gray-20 border-solid rounded-lg font-rethink text-size16 text-fg placeholder:text-gray-50 focus:outline-none focus:border-fg hover:border-gray-50 transition-colors"\r
        />\r
      </div>\r
\r
      <div class="flex flex-col gap-2">\r
        <label\r
          for="secondName"\r
          class="font-bebas text-size16 text-fg font-medium"\r
        >\r
          Nom\r
        </label>\r
        <input\r
          type="text"\r
          id="secondName"\r
          name="secondName"\r
          class="w-full px-4 py-3 border border-gray-20 border-solid rounded-lg font-rethink text-size16 text-fg placeholder:text-gray-50 focus:outline-none focus:border-fg hover:border-gray-50 transition-colors"\r
        />\r
      </div>\r
\r
      <div class="flex flex-col gap-2">\r
        <label for="email" class="font-bebas text-size16 text-fg font-medium">\r
          Email\r
        </label>\r
        <input\r
          type="email"\r
          id="email"\r
          name="email"\r
          placeholder="exemple@email.com"\r
          class="w-full px-4 py-3 border border-gray-20 border-solid rounded-lg font-rethink text-size16 text-fg placeholder:text-gray-50 focus:outline-none focus:border-fg hover:border-gray-50 transition-colors"\r
        />\r
      </div>\r
\r
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
          placeholder="********"\r
          class="w-full px-4 py-3 border border-gray-20 border-solid rounded-lg font-rethink text-size16 text-fg placeholder:text-gray-50 focus:outline-none focus:border-fg hover:border-gray-50 transition-colors"\r
        />\r
      </div>\r
      <button\r
        class="w-full bg-bg border-fg border text-fg px-6 py-3 rounded-lg font-rethink text-size16 font-medium hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-fg focus:ring-offset-2 uppercase"\r
      >\r
        Enregistrer\r
      </button>\r
    </form>\r
  </article>\r
</section>\r
`;let X={html:function(e){return e?k(T,e):T},dom:function(e){const r=d(X.html(e));if(e){const t=r.querySelector("#dataForm");if(t){const n=t.querySelector("#firstName"),o=t.querySelector("#secondName"),a=t.querySelector("#email");n&&e.firstName&&(n.value=e.firstName),o&&e.secondName&&(o.value=e.secondName),a&&e.email&&(a.value=e.email)}}return r}};const Pe=`<section class="flex flex-col md:flex-row gap-8 md:gap-16 lg:gap-24 px-2 py-2">\r
  <slot name="profile-navigation"> </slot>\r
  <slot profile-info name="profile-info"> </slot>\r
</section>\r
`;let q={},h={};h.handler_clickOnDisconnect=async function(e){if(e.target.closest("[data-disconnect]")){try{const t=await g.logout();t&&t.success?console.log("Déconnexion réussie"):console.warn("Erreur lors de la déconnexion",t)}catch(t){console.error("Erreur de déconnexion:",t)}h.router?(h.router.setAuth(!1),h.router.navigate("/")):window.location.href="/"}};h.handler_clickOnProfileInfo=function(e){if(!e.target.closest("[data-profil-info]"))return;console.log("Profile Info button clicked");const t=e.currentTarget;if(!t){console.error("currentTarget is null");return}const n=t.querySelector('slot[name="profile-info"]');if(!n){console.error("profile-info slot not found");return}const o=t.querySelector("[data-profile-form]");if(o){o.remove();return}const a=X.dom(q.userData),s=a.querySelector("section")||a;s&&s.setAttribute("data-profile-form","");const u=a.querySelector("#dataForm");u&&u.addEventListener("submit",h.handler_submitProfileForm),n.replaceWith(a)};h.handler_submitProfileForm=async function(e){e.preventDefault();const r=e.target,t=new FormData(r),n={firstName:t.get("firstName"),secondName:t.get("secondName"),email:t.get("email")},o=t.get("password");o&&o.trim()!==""&&(n.password=o),console.log("Updating user profile with data:",n);try{const a=q.userData.id||q.userData.id_user;if(console.log("User ID:",a),!a){console.error("No user ID found"),alert("Erreur: ID utilisateur introuvable");return}const s=await g.update(a,n);s?(console.log("Profile updated successfully:",s),alert("Profil mis à jour avec succès!"),q.userData={...q.userData,...s},h.router&&h.router.navigate("/profile")):(console.error("Failed to update profile"),alert("Erreur lors de la mise à jour du profil"))}catch(a){console.error("Error updating profile:",a),alert("Erreur lors de la mise à jour du profil")}};h.init=async function(e,r){h.router=r;const t=await g.status();console.log("[C.init] UserData.status result:",t)};let j={};j.init=function(e){console.log("[V.init] Called with data:",e),q.userData=e;const r=j.createPageFragment(e);return console.log("[V.init] createPageFragment returned:",r),j.attachEvents(r,!!e),console.log("[V.init] Returning fragment"),r};j.createPageFragment=function(e){console.log("[V.createPageFragment] Called with data:",e);const r=d(Pe);if(console.log("[V.createPageFragment] pageFragment:",r),!e)return console.warn("[V.createPageFragment] No data provided, returning empty fragment"),r;z.dom(e);const t=z.dom(e),n=r.querySelector('slot[name="profile-navigation"]');return n&&(n.replaceWith(t),console.log("[V.createPageFragment] Navigation slot replaced with profileDOM")),r};j.attachEvents=function(e,r){const t=e&&e.firstElementChild?e.firstElementChild:e;return t&&r&&t.addEventListener("click",h.handler_clickOnProfileInfo),e};async function qe(){console.log("[ProfilePage] START");const e=await g.status();if(!e||!e.authenticated)return console.warn("[ProfilePage] REDIRECT to /login because:",e?"not authenticated":"no result"),document.createDocumentFragment();console.log("[ProfilePage] Calling V.init with user:",e.user);const r=j.init(e.user);return console.log("[ProfilePage] V.init returned:",r),r}const Ee=`<div style="min-height: 100vh; display: flex; flex-direction: column">\r
  <slot name="header"></slot>\r
  <main class="bg-bg" style="flex: 1; padding: 2rem">\r
    <slot></slot>\r
  </main>\r
  <slot name="footer"></slot>\r
</div>\r
`,Le=`<header\r
  class="bg-white border-b border-gray-20 border-solid flex flex-col gap-2 items-center px-10 py-[.8rem] w-full"\r
>\r
  <!-- Header top section -->\r
  <div class="flex items-center justify-between w-full">\r
    <!-- Logo -->\r
    <div class="h-[2.375rem] relative flex-shrink-0">\r
      <a href="/" data-link class="block w-full h-full">\r
        <img\r
          src="../../../public/images/VC_LOGO_NOIR_1.webp"\r
          alt="Vinyles collector logo"\r
          class="w-full h-full object-contain"\r
        />\r
      </a>\r
    </div>\r
\r
    <!-- Top buttons -->\r
    <div data-header-buttons class="flex gap-[.375rem] items-center">\r
      <!-- Account button -->\r
      <a href="/profile"\r
        ><button\r
          data-login\r
          class="sm:flex gap-1 items-center justify-center p-3 rounded-lg hover:bg-accent-hover transition-colors"\r
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
          </svg></button\r
      ></a>\r
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
        href="/"\r
        data-link\r
        class="flex gap-1 items-center justify-center p-3 rounded-lg hover:bg-accent-hover transition-colors font-normal leading-5 text-fg text-sm uppercase whitespace-nowrap text-rethink"\r
      >\r
        Accueil\r
      </a>\r
    </li>\r
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
`;let Se={html:function(e){return k(Le,e||{})},dom:function(e){const r=this.html(e),t=d(r),n=t.querySelector("#\\#burgerMenu"),o=t.querySelector("ul[data-category-menu]");return n&&o&&n.addEventListener("click",()=>{o.classList.toggle("hidden"),o.classList.toggle("flex"),o.classList.toggle("flex-col"),o.classList.toggle("gap-4"),o.classList.toggle("items-start"),o.classList.toggle("w-full")}),t}};const B=`<footer\r
  class="bg-white border-t border-white border-solid flex flex-col gap-3 items-center pb-10 pt-4 px-10 w-full"\r
>\r
  <!-- Logo -->\r
  <div class="h-[38px] w-[94px] relative flex-shrink-0">\r
    <a href="/" data-link class="block w-full h-full">\r
      <img\r
        src="../../../public/images/VC_LOGO_NOIR_1.webp"\r
        alt="Vinyles collector logo"\r
        class="w-full h-full object-contain"\r
      />\r
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
`;let je={html:function(){return B},dom:function(){return d(B)}};function Ne(){let e=d(Ee),r=Se.dom(),t=je.dom();return e.querySelector('slot[name="header"]').replaceWith(r),e.querySelector('slot[name="footer"]').replaceWith(t),e}const $e=` <section>\r
    <h1>404 - Page non trouvée</h1>\r
        <p>Cette page n'existe pas</p>\r
    <nav>\r
        <a href="/" data-link>Retour à l'accueil</a>\r
    </nav>\r
</section>`;function Ae(){return $e}const m=new ee("app",{loginPath:"/login"});async function Fe(){const e=await g.status();e&&e.authenticated?m.setAuth(!0):m.setAuth(!1)}m.addLayout("/",Ne);m.addRoute("/",se);m.addRoute("/about",te);m.addRoute("/login",Ce,{useLayout:!1});m.addRoute("/connection",ve,{useLayout:!1});m.addRoute("/profile",qe,{requireAuth:!0});m.addRoute("/products",G);m.addRoute("/category/:id/:name",G);m.addRoute("/products/:id/:slug",xe);m.addRoute("*",Ae);async function De(){await Fe(),m.start()}De();
