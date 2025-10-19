(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const l of r)if(l.type==="childList")for(const o of l.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const l={};return r.integrity&&(l.integrity=r.integrity),r.referrerPolicy&&(l.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?l.credentials="include":r.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function a(r){if(r.ep)return;r.ep=!0;const l=n(r);fetch(r.href,l)}})();class P{constructor(t,n={}){let a=document.getElementById(t);a||(a=document.createElement("div"),console.warn(`Element with id "${t}" not found. Creating a new div as root.`),document.body.appendChild(a)),this.root=a,this.routes=[],this.layouts={},this.currentRoute=null,this.isAuthenticated=!1,this.loginPath=n.loginPath||"/login",window.addEventListener("popstate",()=>this.handleRoute()),document.addEventListener("click",r=>{r.target.matches("[data-link]")&&(r.preventDefault(),this.navigate(r.target.getAttribute("href")))})}setAuth(t){this.isAuthenticated=t}addLayout(t,n){return this.layouts[t]=n,this}findLayout(t){let n=null,a=0;for(const[r,l]of Object.entries(this.layouts))t.startsWith(r)&&r.length>a&&(n=l,a=r.length);return n}addRoute(t,n,a={}){const r=this.pathToRegex(t),l=this.extractParams(t);return this.routes.push({path:t,regex:r,keys:l,handler:n,requireAuth:a.requireAuth||!1,useLayout:a.useLayout!==!1}),this}pathToRegex(t){if(t==="*")return/.*/;const n=t.replace(/\//g,"\\/").replace(/:(\w+)/g,"([^\\/]+)").replace(/\*/g,".*");return new RegExp("^"+n+"$")}extractParams(t){const n=[],a=t.matchAll(/:(\w+)/g);for(const r of a)n.push(r[1]);return n}getParams(t,n){const a=n.match(t.regex);if(!a)return{};const r={};return t.keys.forEach((l,o)=>{r[l]=a[o+1]}),r}navigate(t){window.history.pushState(null,null,t),this.handleRoute()}handleRoute(){const t=window.location.pathname;for(const a of this.routes)if(a.regex.test(t)){if(a.requireAuth&&!this.isAuthenticated){sessionStorage.setItem("redirectAfterLogin",t),this.navigate(this.loginPath);return}this.currentRoute=t;const r=this.getParams(a,t),l=a.handler(r);l instanceof Promise?l.then(o=>{this.renderContent(o,a,t)}):this.renderContent(l,a,t);return}const n=this.routes.find(a=>a.path==="*");if(n){const a=n.handler({});this.root.innerHTML=a}}renderContent(t,n,a){const r=t instanceof DocumentFragment;if(n.useLayout){const l=this.findLayout(a);if(l){const o=l(),c=o.querySelector("slot");if(c)if(r)c.replaceWith(t);else{const p=document.createElement("template");p.innerHTML=t,c.replaceWith(p.content)}else console.warn("Layout does not contain a <slot> element. Content will not be inserted.");this.root.innerHTML="",this.root.appendChild(o)}else r?(this.root.innerHTML="",this.root.appendChild(t)):this.root.innerHTML=t}else r?(this.root.innerHTML="",this.root.appendChild(t)):this.root.innerHTML=t;this.attachEventListeners(a)}attachEventListeners(t){const n=document.getElementById("loginBtn");n&&n.addEventListener("click",()=>{this.login()});const a=document.getElementById("logoutBtn");a&&a.addEventListener("click",()=>{this.logout()})}login(){this.setAuth(!0);const t=sessionStorage.getItem("redirectAfterLogin");sessionStorage.removeItem("redirectAfterLogin"),this.navigate(t||"/dashboard")}logout(){this.setAuth(!1),this.navigate(this.loginPath)}start(){this.handleRoute()}}const E=`<div class="mx-auto max-w-4xl p-6">\r
  <h1 class="mb-6 text-4xl font-bold text-gray-900">À propos</h1>\r
  <p class="mb-6 text-lg text-gray-700">\r
    Base de code pour la SAE 3.01. Octobre 2025</p>\r
<p class="mb-6 text-lg text-gray-700">\r
    Se référer à la documentation pour comprendre comment l'utiliser\r
    </p>\r
   \r
</div>`;function j(){return E}const I=`<div class="mx-auto max-w-4xl p-6">\r
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
`;function S(){return I}let $="http://mmi.unilim.fr/~mishcherikova1/api/",x=async function(e){let t={method:"GET"};try{var n=await fetch($+e,t)}catch(r){return console.error("Echec de la requête : "+r),!1}return n.status!=200?(console.error("Erreur de requête : "+n.status),!1):await n.json()},g={},b=[{id:1,name:"Sabrina Carpenter - Man's Best Friend - Vinyle Luxe Packaging (Exclusivité)",price:"€59,99",category:1},{id:2,name:"Various Artist - Almost Famous - Double Vinyle Violet & Magenta Exclusif",price:"€34,99",category:1},{id:3,name:"KPop Demon Hunters (Soundtrack from the Netflix Film) - Vinyle Smokey Fushia Exclusif",price:"€29,99",category:1}];g.fetch=async function(e){let t=await x(`products/${e}`);return t==!1?b.pop():t};g.fetchAll=async function(){let e=await x("products");return e==!1?b:e};g.parCategory=async function(e){let t=await x(`products?category=${e}`);return t===!1?b.filter(n=>n.category==e):t};let w={},q=[{id:1,name:"Mobilier"},{id:2,name:"Électronique"},{id:3,name:"Bureautique"},{id:4,name:"Cuisine"},{id:5,name:"Extérieur"}];w.fetchAll=async function(){let e=await x("categories");return e==!1?q:e};let T=function(e,t){let n=e;for(let a in t)n=n.replaceAll(new RegExp("{{"+a+"}}","g"),t[a]);return n};function d(e){const t=document.createElement("template");return t.innerHTML=e.trim(),t.content}const M=`<a href="/products/{{id}}/{{name}}"\r
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
`;let y={html:function(e){const t=Array.isArray(e)?e:e&&typeof e=="object"?[e]:[];let n='<div class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">';for(let a of t)n+=T(M,a);return n+"</div>"},dom:function(e){return d(y.html(e))}};const D=`<aside class="w-full xl:w-80 flex flex-col gap-4">\r
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
`,B=(e,t)=>`
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
      ${t}
    </label>
  </div>
`,R={dom(e,t={}){const n=d(D),a=n.querySelector("[data-category-list]"),r=Array.isArray(e)?e:[];let l="";for(let o=0;o<r.length;o++){const c=r[o];l+=B(c.id,c.name||c.label||`Cat ${c.id}`)}return a&&a.replaceChildren(d(l)),n}},G=`<div class="flex flex-col items-start self-stretch gap-4 md:gap-8 lg:gap-8">\r
  <h1\r
    class="text-fg font-bebas tracking-tighter text-mh2 md:text-dh2 lg:text-dh2 uppercase leading-[95%]"\r
  >\r
    le catalogue de produits\r
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
`;let i={products:[],categories:[],selectedCategory:null};i.getCategoryByName=function(e){return i.categories.find(t=>t.name.toLowerCase()===e.toLowerCase())};let u={};u.handler_clickOnProduct=function(e){const t=e.target.closest("[data-buy]");t&&alert(`Le produit d'identifiant ${t.dataset.buy} ? Excellent choix !`)};u.updateProductsForCategory=async function(e,t,n){t?i.selectedCategory=t:i.selectedCategory=null,i.selectedCategory?(i.products=await g.parCategory(i.selectedCategory),n=i.products.length):(i.products=await g.fetchAll(),n=i.products.length);const a=e.querySelector("[data-products-host]");if(a){const l=y.dom(i.products);a.replaceChildren(l)}const r=e.querySelector("[data-nombre]");r&&(r.textContent=n)};u.onLabelClick=async function(e){const t=e.target.closest("label");if(!t)return;const n=e.currentTarget,a=t.getAttribute("for"),r=n.querySelector(`#${a}`);r&&await u.updateProductsForCategory(n,r.value)};u.onRenitialiseClick=async function(e){if(!e.target.closest("[data-reset-filters]"))return;const n=e.currentTarget;i.selectedCategory=null,i.products=await g.fetchAll();const a=n.querySelector("[data-products-host]");if(a){const l=y.dom(i.products);a.replaceChildren(l)}const r=n.querySelector("[data-nombre]");r&&(r.textContent=i.products.length)};u.init=async function(e){const t=e.slug;if(i.categories=await w.fetchAll(),t){const n=i.getCategoryByName(t);n?(i.selectedCategory=n.id,i.products=await g.parCategory(n.id)):(i.selectedCategory=null,i.products=await g.fetchAll())}else i.selectedCategory=null,i.products=await g.fetchAll();return h.init(i.products,i.categories)};let h={};h.init=function(e,t){const n=h.createPageFragment(e,t);return h.attachEvents(n),n};h.createPageFragment=function(e,t){const n=d(G),a=R.dom(t),r=n.querySelector('slot[name="categories"]');r&&r.replaceWith(a);const l=y.dom(e),o=document.createElement("div");o.setAttribute("data-products-host",""),o.appendChild(l);const c=n.querySelector('slot[name="products"]');c&&c.replaceWith(o);const p=n.querySelector("[data-nombre]");return p&&(p.textContent=e.length),n};h.attachEvents=function(e){const t=e.firstElementChild;return t.addEventListener("click",u.handler_clickOnProduct),t.addEventListener("click",u.onLabelClick),t.addEventListener("click",u.onRenitialiseClick),e};function L(e){return console.log("ProductsPage params:",e),u.init(e)}const F=`<article\r
  class="flex flex-col md:flex-row lg:flex-row gap-6 md:gap-8 lg:gap-8 w-full max-w-[90rem] mx-auto"\r
>\r
  <div class="flex-1 min-w-0">\r
    <!-- Gallery Images Only (3 images from Gallery table) -->\r
    <div class="grid grid-cols-1 gap-4">\r
      <!-- Main large image from gallery -->\r
      <div\r
        class="aspect-square w-full rounded-lg overflow-hidden border border-gray-20 border-solid"\r
      >\r
        {{mainGalleryImage}}\r
      </div>\r
      <section class="flex justify-between items-center self-stretch">\r
        <button\r
          data-gallery-prev\r
          class="flex justify-center items-center gap-1 px-3.5 py-[14px] rounded-lg bg-accent-hover hover:bg-accent-hover-hover transition-colors"\r
          aria-label="Previous image"\r
        >\r
          <svg\r
            xmlns="http://www.w3.org/2000/svg"\r
            width="20"\r
            height="20"\r
            viewBox="0 0 20 20"\r
            fill="none"\r
          >\r
            <g clip-path="url(#clip0_142_1035)">\r
              <path\r
                d="M12.5 5L7.5 10L12.5 15"\r
                stroke="#212121"\r
                stroke-width="2"\r
                stroke-linecap="round"\r
                stroke-linejoin="round"\r
              />\r
            </g>\r
            <defs>\r
              <clipPath id="clip0_142_1035">\r
                <rect width="20" height="20" fill="white" />\r
              </clipPath>\r
            </defs>\r
          </svg>\r
        </button>\r
        <button\r
          data-gallery-next\r
          class="flex justify-center items-center gap-1 px-3.5 py-[14px] rounded-lg bg-accent-hover hover:bg-accent-hover-hover transition-colors"\r
          aria-label="Next image"\r
        >\r
          <svg\r
            xmlns="http://www.w3.org/2000/svg"\r
            width="20"\r
            height="20"\r
            viewBox="0 0 20 20"\r
            fill="none"\r
          >\r
            <g clip-path="url(#clip0_142_1354)">\r
              <path\r
                d="M7.5 5L12.5 10L7.5 15"\r
                stroke="#212121"\r
                stroke-width="2"\r
                stroke-linecap="round"\r
                stroke-linejoin="round"\r
              />\r
            </g>\r
            <defs>\r
              <clipPath id="clip0_142_1354">\r
                <rect width="20" height="20" fill="white" />\r
              </clipPath>\r
            </defs>\r
          </svg>\r
        </button>\r
      </section>\r
\r
      <!-- Thumbnail images from gallery (up to 3) -->\r
      <div class="grid grid-cols-3 gap-2">{{galleryImages}}</div>\r
    </div>\r
  </div>\r
\r
  <div class="flex-1 flex flex-col gap-4 md:gap-6 lg:gap-6">\r
    <h1\r
      class="font-bebas text-fg text-mh2 md:text-dh2 lg:text-dh2 uppercase leading-[95%] tracking-tighter"\r
    >\r
      {{name}}\r
    </h1>\r
\r
    <div class="flex flex-col gap-3">\r
      <p class="font-rethink text-gray-50 text-base leading-relaxed">\r
        {{description}}\r
      </p>\r
    </div>\r
\r
    <div class="flex flex-col gap-4 mt-auto">\r
      <div class="flex items-baseline gap-2">\r
        <span\r
          class="font-bebas text-fg text-[3rem] md:text-[3.5rem] lg:text-[3.5rem]"\r
        >\r
          €{{price}}\r
        </span>\r
      </div>\r
\r
      <button\r
        data-buy="{{id}}"\r
        class="w-full px-6 py-4 bg-fg text-bg font-rethink font-semibold text-sm md:text-base lg:text-base rounded-lg hover:opacity-90 transition-opacity uppercase tracking-wide"\r
      >\r
        Ajouter au panier\r
      </button>\r
    </div>\r
  </div>\r
</article>\r
`;let s={currentGalleryIndex:0,galleryData:[],html:function(e){if(!e)return'<div class="text-fg font-rethink p-4">Produit non trouvé</div>';console.log("DetailView - product:",e),console.log("DetailView - gallery:",e.gallery),this.galleryData=e.gallery||[],this.currentGalleryIndex=0;let t="",n="";if(e.gallery&&Array.isArray(e.gallery)&&e.gallery.length>0){console.log("Processing gallery, images count:",e.gallery.length),e.gallery[0]&&(t=`
          <img
            data-main-image
            src="../../../public/images/${e.gallery[0].image}"
            alt="${e.name}"
            class="w-full h-full object-cover"
          />
        `);const r=3;for(let l=0;l<e.gallery.length&&l<r;l++){const o=e.gallery[l];n+=`
          <div 
            class="aspect-square rounded-lg overflow-hidden border ${l===0?"border-red":"border-gray-20"} cursor-pointer hover:border-fg transition-colors" 
            data-gallery-thumb="${l}"
          >
            <img
              src="../../../public/images/${o.image}"
              alt="${e.name}"
              class="w-full h-full object-cover"
            />
          </div>
        `}console.log(`Gallery: 1 main image + ${Math.min(e.gallery.length,r)} thumbnails`)}else console.log("No gallery images found");return F.replace(/{{id}}/g,e.product_id||e.id||"").replace(/{{name}}/g,e.name||"Unknown").replace(/{{description}}/g,e.description||"No description").replace(/{{price}}/g,e.price||"0.00").replace(/{{mainGalleryImage}}/g,t).replace(/{{galleryImages}}/g,n)},dom:function(e){const t=d(s.html(e));return s.attachGalleryEvents(t),t},attachGalleryEvents:function(e){const t=e.querySelector("article");t&&t.addEventListener("click",n=>{if(n.target.closest("[data-gallery-prev]")){s.navigateGallery(-1,t);return}if(n.target.closest("[data-gallery-next]")){s.navigateGallery(1,t);return}const l=n.target.closest("[data-gallery-thumb]");if(l){const o=parseInt(l.dataset.galleryThumb,10);s.setGalleryImage(o,t);return}})},navigateGallery:function(e,t){!s.galleryData||s.galleryData.length===0||(s.currentGalleryIndex+=e,s.currentGalleryIndex<0?s.currentGalleryIndex=s.galleryData.length-1:s.currentGalleryIndex>=s.galleryData.length&&(s.currentGalleryIndex=0),s.updateMainImage(t))},setGalleryImage:function(e,t){!s.galleryData||e<0||e>=s.galleryData.length||(s.currentGalleryIndex=e,s.updateMainImage(t))},updateMainImage:function(e){const t=e.querySelector("[data-main-image]");if(!t||!s.galleryData[s.currentGalleryIndex])return;const n=s.galleryData[s.currentGalleryIndex];t.src=`../../../public/images/${n.image}`,s.updateActiveThumbnail(e),console.log(`Gallery switched to index ${s.currentGalleryIndex}:`,n.image)},updateActiveThumbnail:function(e){e.querySelectorAll("[data-gallery-thumb]").forEach(a=>{a.classList.remove("border-accent-hover"),a.classList.add("border-gray-20")});const n=e.querySelector(`[data-gallery-thumb="${s.currentGalleryIndex}"]`);n&&(n.classList.remove("border-gray-20"),n.classList.add("border-accent-hover"))}};const _=`<article\r
  class="flex flex-col md:flex-row lg:flex-row gap-6 md:gap-8 lg:gap-8 w-full max-w-[90rem] mx-auto"\r
>\r
  <!-- Image Section -->\r
  <div class="flex-1 min-w-0">\r
    <div\r
      class="aspect-square w-full rounded-lg overflow-hidden border border-gray-20 border-solid"\r
    >\r
      <img\r
        src="../../../public/images/{{image}}"\r
        alt="{{name}}"\r
        class="w-full h-full object-cover"\r
      />\r
    </div>\r
  </div>\r
\r
  <!-- Content Section -->\r
  <div class="flex-1 flex flex-col gap-6">\r
    <!-- Title -->\r
    <h1\r
      class="font-bebas text-fg text-mh2 md:text-dh2 lg:text-dh2 uppercase leading-[95%] tracking-tighter"\r
    >\r
      {{name}}\r
    </h1>\r
    <div class="flex flex-col gap-4 mt-auto">\r
      <div class="flex items-baseline gap-2">\r
        <span\r
          class="font-bebas text-fg text-[3rem] md:text-[3.5rem] lg:text-[3.5rem]"\r
        >\r
          €{{price}}\r
        </span>\r
      </div>\r
\r
      <div class="flex flex-col gap-4">\r
        <div class="flex flex-col gap-2">\r
          <div class="flex gap-2">\r
            <span class="font-rethink font-semibold text-fg text-base"\r
              >Artiste:</span\r
            >\r
            <span class="font-rethink text-gray-50 text-base">{{artist}}</span>\r
          </div>\r
          <div class="flex gap-2">\r
            <span class="font-rethink font-semibold text-fg text-base"\r
              >Année:</span\r
            >\r
            <span class="font-rethink text-gray-50 text-base">{{year}}</span>\r
          </div>\r
          <div class="flex gap-2">\r
            <span class="font-rethink font-semibold text-fg text-base"\r
              >Label:</span\r
            >\r
            <span class="font-rethink text-gray-50 text-base">{{label}}</span>\r
          </div>\r
          <div class="flex gap-2">\r
            <span class="font-rethink font-semibold text-fg text-base"\r
              >Format:</span\r
            >\r
            <span class="font-rethink text-gray-50 text-base">{{format}}</span>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <!-- Description -->\r
      <div class="flex flex-col gap-3">\r
        <h2\r
          class="font-rethink font-semibold text-fg text-base md:text-lg lg:text-lg"\r
        >\r
          Description\r
        </h2>\r
        <p class="font-rethink text-gray-50 text-base leading-relaxed">\r
          {{description}}\r
        </p>\r
      </div>\r
      <div class="flex flex-col gap-2">\r
        <div class="flex gap-2">\r
          <span class="font-rethink font-semibold text-fg text-base"\r
            >Artiste:</span\r
          >\r
          <span class="font-rethink text-gray-50 text-base">{{artist}}</span>\r
        </div>\r
        <div class="flex gap-2">\r
          <span class="font-rethink font-semibold text-fg text-base"\r
            >Année:</span\r
          >\r
          <span class="font-rethink text-gray-50 text-base">{{year}}</span>\r
        </div>\r
        <div class="flex gap-2">\r
          <span class="font-rethink font-semibold text-fg text-base"\r
            >Label:</span\r
          >\r
          <span class="font-rethink text-gray-50 text-base">{{label}}</span>\r
        </div>\r
        <div class="flex gap-2">\r
          <span class="font-rethink font-semibold text-fg text-base"\r
            >Genre:</span\r
          >\r
          <span class="font-rethink text-gray-50 text-base">{{format}}</span>\r
        </div>\r
        <div class="flex gap-2">\r
          <span class="font-rethink font-semibold text-fg text-base"\r
            >Pays:</span\r
          >\r
          <span class="font-rethink text-gray-50 text-base">{{country}}</span>\r
        </div>\r
        <div class="flex gap-2">\r
          <span class="font-rethink font-semibold text-fg text-base"\r
            >Édition limitée:</span\r
          >\r
          <span class="font-rethink text-gray-50 text-base">{{limite}}</span>\r
        </div>\r
        <div class="flex gap-2">\r
          <span class="font-rethink font-semibold text-fg text-base"\r
            >Livraison:</span\r
          >\r
          <span class="font-rethink text-gray-50 text-base">{{livraison}}</span>\r
        </div>\r
      </div>\r
      <button\r
        data-buy="{{id}}"\r
        class="w-full px-6 py-4 bg-fg text-bg font-rethink font-semibold text-sm md:text-base lg:text-base rounded-lg hover:opacity-90 transition-opacity uppercase tracking-wide"\r
      >\r
        Ajouter au panier\r
      </button>\r
    </div>\r
  </div>\r
</article>\r
`;let C={html:function(e){if(!e)return'<div class="text-fg font-rethink p-4">Produit non trouvé</div>';let t="";return e.tracklist&&(t=e.tracklist.split(/[,\n]+/).map(r=>r.trim()).filter(r=>r).map(r=>`<li>${r}</li>`).join("")),_.replace(/{{id}}/g,e.product_id||e.id||"").replace(/{{name}}/g,e.name||"Unknown").replace(/{{artist}}/g,e.interprete||"Unknown Artist").replace(/{{year}}/g,e.annee||"N/A").replace(/{{label}}/g,e.label||"N/A").replace(/{{format}}/g,e.genre||"Vinyl").replace(/{{country}}/g,e.pays||"N/A").replace(/{{limite}}/g,e.limite||"Non").replace(/{{livraison}}/g,e.livraison||"N/A").replace(/{{description}}/g,e.infosupp||e.description||"No description").replace(/{{tracklist}}/g,t||"<li>Aucune piste disponible</li>").replace(/{{price}}/g,e.price||"0.00").replace(/{{image}}/g,e.image||"placeholder.jpg")},dom:function(e){return d(C.html(e))}};const H=`<div class="flex flex-col items-start self-stretch gap-8 w-full">\r
  <slot name="detail"></slot>\r
</div>\r
`;let v={};v.handler_clickOnProduct=function(e){e.target.dataset.buy!==void 0&&(e.target.dataset.buy,alert("Produit ajouté au panier ! (Quand il y en aura un)"))};v.init=async function(e){const t=e.id,n=await g.fetch(t);return console.log("Product loaded:",n),console.log("Gallery:",n?.gallery),m.init(n)};let m={};m.init=function(e){let t=m.createPageFragment(e);return m.attachEvents(t),t};m.createPageFragment=function(e){let t=d(H);console.log("Product data in createPageFragment:",e);let n;return e&&(e.category==1||e.interprete)?n=C.dom(e):n=s.dom(e),t.querySelector('slot[name="detail"]').replaceWith(n),t};m.attachEvents=function(e){return e.querySelector("[data-buy]").addEventListener("click",v.handler_clickOnProduct),e};function V(e){return console.log("ProductDetailPage",e),v.init(e)}const O=`<div style="min-height: 100vh; display: flex; flex-direction: column">\r
  <slot name="header"></slot>\r
  <main class="bg-bg" style="flex: 1; padding: 2rem">\r
    <slot></slot>\r
  </main>\r
  <slot name="footer"></slot>\r
</div>\r
`,N=`<header\r
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
    <div class="flex gap-[.375rem] items-center">\r
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
      <button\r
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
      </button>\r
      <!-- Burger button-->\r
      <button\r
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
  <nav class="flex gap-4 items-start w-full overflow-x-auto">\r
    <a\r
      href="/products"\r
      data-link\r
      class="flex gap-1 items-center justify-center p-3 rounded-lg hover:bg-accent-hover transition-colors font-normal leading-5 text-fg text-sm uppercase whitespace-nowrap text-rethink"\r
    >\r
      Tout les produits\r
    </a>\r
  </nav>\r
</header>\r
`,W=`
    <a
      href="/products/category/{{name}}"
      data-link
    >
    <button class="flex gap-1 items-center justify-center p-3 rounded-lg hover:bg-accent-hover focus:bg-accent-hover transition-colors font-normal leading-5 text-fg text-sm uppercase whitespace-nowrap text-rethink">
      {{name}}
      </button>
    </a>`;let A={html:function(e=[],t=null){let n=d(N),a=n.querySelector("nav");return!a||!Array.isArray(e)||e.length===0||e.forEach(r=>{let l=W.replace("{{name}}",r.name).replace("{{name}}",r.name),o=d(l);a.appendChild(o)}),n},dom:function(e,t=null){return A.html(e,t)}};const k=`<footer\r
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
`;let z={html:function(){return k},dom:function(){return d(k)}};function U(){let e=d(O);const t=window.__categories||[];let a=A.dom(t,null),r=z.dom();return e.querySelector('slot[name="header"]').replaceWith(a),e.querySelector('slot[name="footer"]').replaceWith(r),e}const K=` <section>\r
    <h1>404 - Page non trouvée</h1>\r
        <p>Cette page n'existe pas</p>\r
    <nav>\r
        <a href="/" data-link>Retour à l'accueil</a>\r
    </nav>\r
</section>`;function Y(){return K}window.__categories=await w.fetchAll();const f=new P("app");await f.addLayout("/",U);f.addRoute("/",S);f.addRoute("/about",j);f.addRoute("/products",L);f.addRoute("/products/category/:slug",L);f.addRoute("/products/:id/:slug",V);f.addRoute("*",Y);f.start();
