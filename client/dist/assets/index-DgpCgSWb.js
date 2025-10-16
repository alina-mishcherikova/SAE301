(function () {
  const e = document.createElement("link").relList;
  if (e && e.supports && e.supports("modulepreload")) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) r(o);
  new MutationObserver((o) => {
    for (const s of o)
      if (s.type === "childList")
        for (const a of s.addedNodes)
          a.tagName === "LINK" && a.rel === "modulepreload" && r(a);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(o) {
    const s = {};
    return (
      o.integrity && (s.integrity = o.integrity),
      o.referrerPolicy && (s.referrerPolicy = o.referrerPolicy),
      o.crossOrigin === "use-credentials"
        ? (s.credentials = "include")
        : o.crossOrigin === "anonymous"
          ? (s.credentials = "omit")
          : (s.credentials = "same-origin"),
      s
    );
  }
  function r(o) {
    if (o.ep) return;
    o.ep = !0;
    const s = n(o);
    fetch(o.href, s);
  }
})();
class A {
  constructor(e, n = {}) {
    let r = document.getElementById(e);
    (r ||
      ((r = document.createElement("div")),
      console.warn(
        `Element with id "${e}" not found. Creating a new div as root.`
      ),
      document.body.appendChild(r)),
      (this.root = r),
      (this.routes = []),
      (this.layouts = {}),
      (this.currentRoute = null),
      (this.isAuthenticated = !1),
      (this.loginPath = n.loginPath || "/login"),
      window.addEventListener("popstate", () => this.handleRoute()),
      document.addEventListener("click", (o) => {
        o.target.matches("[data-link]") &&
          (o.preventDefault(), this.navigate(o.target.getAttribute("href")));
      }));
  }
  setAuth(e) {
    this.isAuthenticated = e;
  }
  addLayout(e, n) {
    return ((this.layouts[e] = n), this);
  }
  findLayout(e) {
    let n = null,
      r = 0;
    for (const [o, s] of Object.entries(this.layouts))
      e.startsWith(o) && o.length > r && ((n = s), (r = o.length));
    return n;
  }
  addRoute(e, n, r = {}) {
    const o = this.pathToRegex(e),
      s = this.extractParams(e);
    return (
      this.routes.push({
        path: e,
        regex: o,
        keys: s,
        handler: n,
        requireAuth: r.requireAuth || !1,
        useLayout: r.useLayout !== !1,
      }),
      this
    );
  }
  pathToRegex(e) {
    if (e === "*") return /.*/;
    const n = e
      .replace(/\//g, "\\/")
      .replace(/:(\w+)/g, "([^\\/]+)")
      .replace(/\*/g, ".*");
    return new RegExp("^" + n + "$");
  }
  extractParams(e) {
    const n = [],
      r = e.matchAll(/:(\w+)/g);
    for (const o of r) n.push(o[1]);
    return n;
  }
  getParams(e, n) {
    const r = n.match(e.regex);
    if (!r) return {};
    const o = {};
    return (
      e.keys.forEach((s, a) => {
        o[s] = r[a + 1];
      }),
      o
    );
  }
  navigate(e) {
    (window.history.pushState(null, null, e), this.handleRoute());
  }
  handleRoute() {
    const e = window.location.pathname;
    for (const r of this.routes)
      if (r.regex.test(e)) {
        if (r.requireAuth && !this.isAuthenticated) {
          (sessionStorage.setItem("redirectAfterLogin", e),
            this.navigate(this.loginPath));
          return;
        }
        this.currentRoute = e;
        const o = this.getParams(r, e),
          s = r.handler(o);
        s instanceof Promise
          ? s.then((a) => {
              this.renderContent(a, r, e);
            })
          : this.renderContent(s, r, e);
        return;
      }
    const n = this.routes.find((r) => r.path === "*");
    if (n) {
      const r = n.handler({});
      this.root.innerHTML = r;
    }
  }
  renderContent(e, n, r) {
    const o = e instanceof DocumentFragment;
    if (n.useLayout) {
      const s = this.findLayout(r);
      if (s) {
        const a = s(),
          x = a.querySelector("slot");
        if (x)
          if (o) x.replaceWith(e);
          else {
            const w = document.createElement("template");
            ((w.innerHTML = e), x.replaceWith(w.content));
          }
        else
          console.warn(
            "Layout does not contain a <slot> element. Content will not be inserted."
          );
        ((this.root.innerHTML = ""), this.root.appendChild(a));
      } else
        o
          ? ((this.root.innerHTML = ""), this.root.appendChild(e))
          : (this.root.innerHTML = e);
    } else
      o
        ? ((this.root.innerHTML = ""), this.root.appendChild(e))
        : (this.root.innerHTML = e);
    this.attachEventListeners(r);
  }
  attachEventListeners(e) {
    const n = document.getElementById("loginBtn");
    n &&
      n.addEventListener("click", () => {
        this.login();
      });
    const r = document.getElementById("logoutBtn");
    r &&
      r.addEventListener("click", () => {
        this.logout();
      });
  }
  login() {
    this.setAuth(!0);
    const e = sessionStorage.getItem("redirectAfterLogin");
    (sessionStorage.removeItem("redirectAfterLogin"),
      this.navigate(e || "/dashboard"));
  }
  logout() {
    (this.setAuth(!1), this.navigate(this.loginPath));
  }
  start() {
    this.handleRoute();
  }
}
const C = `<div class="mx-auto max-w-4xl p-6">\r
  <h1 class="mb-6 text-4xl font-bold text-gray-900">À propos</h1>\r
  <p class="mb-6 text-lg text-gray-700">\r
    Base de code pour la SAE 3.01. Octobre 2025</p>\r
<p class="mb-6 text-lg text-gray-700">\r
    Se référer à la documentation pour comprendre comment l'utiliser\r
    </p>\r
   \r
</div>`;
function R() {
  return C;
}
const M = `<div class="mx-auto max-w-4xl p-6">\r
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
`;
function B() {
  return M;
}
let S = "http://mmi.unilim.fr/~mishcherikova1/api/",
  v = async function (t) {
    let e = { method: "GET" };
    try {
      var n = await fetch(S + t, e);
    } catch (o) {
      return (console.error("Echec de la requête : " + o), !1);
    }
    return n.status != 200
      ? (console.error("Erreur de requête : " + n.status), !1)
      : await n.json();
  },
  p = {},
  k = [
    {
      id: 1,
      name: "Sabrina Carpenter - Man's Best Friend - Vinyle Luxe Packaging (Exclusivité)",
      price: "€59,99",
    },
    {
      id: 2,
      name: "Various Artist - Almost Famous - Double Vinyle Violet & Magenta Exclusif",
      price: "€34,99",
    },
    {
      id: 3,
      name: "KPop Demon Hunters (Soundtrack from the Netflix Film) - Vinyle Smokey Fushia Exclusif",
      price: "€29,99",
    },
  ];
p.fetch = async function (t) {
  let e = await v("products/" + t);
  return e == !1 ? k.pop() : [e];
};
p.fetchAll = async function () {
  let t = await v("products");
  return t == !1 ? k : t;
};
let L = {},
  T = [
    { id: 1, name: "Mobilier" },
    { id: 2, name: "Électronique" },
    { id: 3, name: "Bureautique" },
    { id: 4, name: "Cuisine" },
    { id: 5, name: "Extérieur" },
  ];
L.fetchAll = async function () {
  let t = await v("categories");
  return t == !1 ? T.pop() : [t];
};
let f = function (t, e) {
  let n = t;
  for (let r in e) n = n.replaceAll(new RegExp("{{" + r + "}}", "g"), e[r]);
  return n;
};
function i(t) {
  const e = document.createElement("template");
  return ((e.innerHTML = t.trim()), e.content);
}
const H = `<a href="/products/{{id}}/{{name}}"\r
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
`;
let P = {
  html: function (t) {
    let e =
      '<div class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">';
    for (let n of t) e += f(H, n);
    return e + "</div>";
  },
  dom: function (t) {
    return i(P.html(t));
  },
};
const q = `<button\r
  class="bg-[#f6f5fa] gap-1 items-center justify-center font-normal text-black text-sm uppercase whitespace-nowrap font-rethink eading-5 px-3 py-[14px] rounded-lg transition hover:bg-accent-hover xl:hidden"\r
>\r
  Filtre\r
</button>\r
<section class="hidden xl:flex xl:max-w-1/4 flex-col">\r
  <div class="rounded-lg pr-6 w-80 max-w-xs">\r
    <!-- Header with title and toggle -->\r
    <div class="flex items-center justify-between mb-6">\r
      <h2 class="font-bold text-2xl text-black uppercase font-bebas">Filtre</h2>\r
      <button class="p-2 hover:bg-gray-50 rounded transition-colors">\r
        <svg\r
          class="w-5 h-5"\r
          viewBox="0 0 20 20"\r
          fill="none"\r
          xmlns="http://www.w3.org/2000/svg"\r
        >\r
          <path\r
            d="M5 7.5L10 12.5L15 7.5"\r
            stroke="#212121"\r
            stroke-width="2"\r
            stroke-linecap="round"\r
            stroke-linejoin="round"\r
          />\r
        </svg>\r
      </button>\r
    </div>\r
\r
    <!-- Type de produit section -->\r
    <div class="mb-6">\r
      <h3 class="font-bold text-sm text-black uppercase mb-3 font-bebas">\r
        Type de produit\r
      </h3>\r
      <div class="flex flex-col gap-2">{{cat}}</div>\r
    </div>\r
\r
    <!-- Reset button -->\r
    <button\r
      class="w-full bg-[#f6f5fa] gap-1 items-center justify-center font-normal text-black text-sm uppercase whitespace-nowrap font-rethink leading-5 px-3 py-[14px] rounded-lg transition hover:bg-accent-hover"\r
    >\r
      TOUT RÉINITIALISER\r
    </button>\r
  </div>\r
</section>\r
`,
  F = `<label\r
  class="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"\r
>\r
  <input\r
    type="checkbox"\r
    class="w-4 h-4 border-2 border-gray-300 rounded cursor-pointer"\r
  />\r
  <span class="text-black text-sm font-rethink">{{category}}</span>\r
</label>\r
`;
let j = {
  html: function (t) {
    let e = "";
    t || (t = []);
    for (let n = 0; n < t.length; n++) {
      let r = t[n];
      e += f(F, { category: r });
    }
    return f(q, { cat: e });
  },
  dom: function (t) {
    return i(j.html(t));
  },
};
const O = `<div class="flex flex-col items-start self-stretch gap-4 md:gap-8 lg:gap-8">\r
  <h1\r
    class="text-fg font-bebas tracking-tighter text-mh2 md:text-dh2 lg:text-dh2 uppercase leading-[95%]"\r
  >\r
    le catalogue de produits\r
  </h1>\r
  <p class="font-rethink text-gray-50 w-full md:w-[40rem] lg:w-[40rem]">\r
    Faites le plein des pépites fraîchement ajoutées à notre catalogue :\r
    nouveautés en précommande et dernières (re)mises en vente, maintenant\r
    disponibles !\r
  </p>\r
  <section class="bg-bg flex flex-col xl:flex-row flex-1 gap-8">\r
    <slot name="filter"></slot>\r
    <slot name="products"></slot>\r
  </section>\r
</div>\r
`;
let u = { products: [], categories: [] },
  g = {};
g.handler_clickOnProduct = function (t) {
  if (t.target.dataset.buy !== void 0) {
    let e = t.target.dataset.buy;
    alert(`Le produit d'identifiant ${e} ? Excellent choix !`);
  }
};
g.init = async function () {
  return (
    (u.products = await p.fetchAll()),
    (u.categories = L.fetchAll()),
    c.init(u.products, u.categories)
  );
};
let c = {};
c.init = function (t, e) {
  let n = c.createPageFragment(t, e);
  return (c.attachEvents(n), n);
};
c.createPageFragment = function (t, e) {
  let n = i(O),
    r = e.map((a) => a.name),
    o = P.dom(t),
    s = j.dom(r);
  return (
    n.querySelector('slot[name="products"]').replaceWith(o),
    n.querySelector('slot[name="filter"]').replaceWith(s),
    n
  );
};
c.attachEvents = function (t) {
  return (
    t.firstElementChild.addEventListener("click", g.handler_clickOnProduct),
    t
  );
};
function I(t) {
  return (console.log("ProductsPage", t), g.init());
}
const V = `<article class="mx-auto max-w-2xl rounded-lg bg-white p-8 shadow-lg">\r
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
`;
let E = {
  html: function (t) {
    return f(V, t);
  },
  dom: function (t) {
    return i(E.html(t));
  },
};
const $ = `<div>\r
<h1 style="font-size: 2rem; font-weight: bold; margin-bottom: 2rem; color: #111; text-align: center;">Allez, click click ! On achète !</h1>\r
   <slot name="detail"></slot>\r
</div>\r
`;
let h = { products: [] };
h.getProductById = function (t) {
  return h.products.find((e) => e.id == t);
};
let m = {};
m.handler_clickOnProduct = function (t) {
  t.target.dataset.buy !== void 0 &&
    (t.target.dataset.buy,
    alert("Produit ajouté au panier ! (Quand il y en aura un)"));
};
m.init = async function (t) {
  const e = t.id;
  h.products = await p.fetchAll();
  let n = h.getProductById(e);
  return (console.log("Product loaded:", n), d.init(n));
};
let d = {};
d.init = function (t) {
  let e = d.createPageFragment(t);
  return (d.attachEvents(e), e);
};
d.createPageFragment = function (t) {
  let e = i($),
    n = E.dom(t);
  return (e.querySelector('slot[name="detail"]').replaceWith(n), e);
};
d.attachEvents = function (t) {
  return (
    t
      .querySelector("[data-buy]")
      .addEventListener("click", m.handler_clickOnProduct),
    t
  );
};
function D(t) {
  return (console.log("ProductDetailPage", t), m.init(t));
}
const N = `<div style="min-height: 100vh; display: flex; flex-direction: column">\r
  <slot name="header"></slot>\r
  <main class="bg-bg" style="flex: 1; padding: 2rem">\r
    <slot></slot>\r
  </main>\r
  <slot name="footer"></slot>\r
</div>\r
`,
  b = `<header\r
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
  <nav class="hidden sm:flex gap-4 items-start w-full">\r
    <a\r
      href="/products"\r
      data-link\r
      class="flex gap-1 items-center justify-center p-3 rounded-lg hover:bg-accent-hover transition-colors"\r
    >\r
      <p\r
        class="font-normal leading-5 text-fg text-sm uppercase whitespace-nowrap text-rethink"\r
      >\r
        Vinyles\r
      </p>\r
    </a>\r
    <a\r
      href="/accessories"\r
      data-link\r
      class="flex gap-1 items-center justify-center p-3 rounded-lg hover:bg-accent-hover transition-colors"\r
    >\r
      <p\r
        class="font-normal leading-5 text-fg text-sm uppercase whitespace-nowrap text-rethink"\r
      >\r
        Accessoires vinyle\r
      </p>\r
    </a>\r
    <a\r
      href="/merchandising"\r
      data-link\r
      class="flex gap-1 items-center justify-center p-3 rounded-lg hover:bg-accent-hover transition-colors"\r
    >\r
      <p\r
        class="font-normal leading-5 text-fg text-sm uppercase whitespace-nowrap text-rethink"\r
      >\r
        merchandising\r
      </p>\r
    </a>\r
  </nav>\r
</header>\r
`;
let _ = {
  html: function () {
    return b;
  },
  dom: function () {
    return i(b);
  },
};
const y = `<footer\r
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
`;
let W = {
  html: function () {
    return y;
  },
  dom: function () {
    return i(y);
  },
};
function z() {
  let t = i(N),
    e = _.dom(),
    n = W.dom();
  return (
    t.querySelector('slot[name="header"]').replaceWith(e),
    t.querySelector('slot[name="footer"]').replaceWith(n),
    t
  );
}
const K = ` <section>\r
    <h1>404 - Page non trouvée</h1>\r
        <p>Cette page n'existe pas</p>\r
    <nav>\r
        <a href="/" data-link>Retour à l'accueil</a>\r
    </nav>\r
</section>`;
function U() {
  return K;
}
const l = new A("app");
l.addLayout("/", z);
l.addRoute("/", B);
l.addRoute("/about", R);
l.addRoute("/products", I);
l.addRoute("/products/:id/:slug", D);
l.addRoute("*", U);
l.start();
