(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) n(o);
  new MutationObserver((o) => {
    for (const a of o)
      if (a.type === "childList")
        for (const s of a.addedNodes)
          s.tagName === "LINK" && s.rel === "modulepreload" && n(s);
  }).observe(document, { childList: !0, subtree: !0 });
  function r(o) {
    const a = {};
    return (
      o.integrity && (a.integrity = o.integrity),
      o.referrerPolicy && (a.referrerPolicy = o.referrerPolicy),
      o.crossOrigin === "use-credentials"
        ? (a.credentials = "include")
        : o.crossOrigin === "anonymous"
          ? (a.credentials = "omit")
          : (a.credentials = "same-origin"),
      a
    );
  }
  function n(o) {
    if (o.ep) return;
    o.ep = !0;
    const a = r(o);
    fetch(o.href, a);
  }
})();
class ie {
  constructor(t, r = {}) {
    let n = document.getElementById(t);
    (n ||
      ((n = document.createElement("div")),
      console.warn(
        `Element with id "${t}" not found. Creating a new div as root.`
      ),
      document.body.appendChild(n)),
      (this.root = n),
      (this.routes = []),
      (this.layouts = {}),
      (this.currentRoute = null),
      (this.isAuthenticated = !1),
      (this.loginPath = r.loginPath || "/login"),
      window.addEventListener("popstate", () => this.handleRoute()),
      document.addEventListener("click", (o) => {
        o.target.matches("[data-link]") &&
          (o.preventDefault(), this.navigate(o.target.getAttribute("href")));
      }));
  }
  setAuth(t) {
    this.isAuthenticated = t;
  }
  addLayout(t, r) {
    return ((this.layouts[t] = r), this);
  }
  findLayout(t) {
    let r = null,
      n = 0;
    for (const [o, a] of Object.entries(this.layouts))
      t.startsWith(o) && o.length > n && ((r = a), (n = o.length));
    return r;
  }
  addRoute(t, r, n = {}) {
    const o = this.pathToRegex(t),
      a = this.extractParams(t);
    return (
      this.routes.push({
        path: t,
        regex: o,
        keys: a,
        handler: r,
        requireAuth: n.requireAuth || !1,
        useLayout: n.useLayout !== !1,
      }),
      this
    );
  }
  pathToRegex(t) {
    if (t === "*") return /.*/;
    const r = t
      .replace(/\//g, "\\/")
      .replace(/:(\w+)/g, "([^\\/]+)")
      .replace(/\*/g, ".*");
    return new RegExp("^" + r + "$");
  }
  extractParams(t) {
    const r = [],
      n = t.matchAll(/:(\w+)/g);
    for (const o of n) r.push(o[1]);
    return r;
  }
  getParams(t, r) {
    const n = r.match(t.regex);
    if (!n) return {};
    const o = {};
    return (
      t.keys.forEach((a, s) => {
        o[a] = n[s + 1];
      }),
      o
    );
  }
  navigate(t) {
    (window.history.pushState(null, null, t), this.handleRoute());
  }
  handleRoute() {
    const t = window.location.pathname;
    for (const n of this.routes)
      if (n.regex.test(t)) {
        if (n.requireAuth && !this.isAuthenticated) {
          (sessionStorage.setItem("redirectAfterLogin", t),
            this.navigate(this.loginPath));
          return;
        }
        this.currentRoute = t;
        const o = this.getParams(n, t),
          a = n.handler(o, this);
        a instanceof Promise
          ? a.then((s) => {
              this.renderContent(s, n, t);
            })
          : this.renderContent(a, n, t);
        return;
      }
    const r = this.routes.find((n) => n.path === "*");
    if (r) {
      const n = r.handler({}, this);
      this.root.innerHTML = n;
    }
  }
  renderContent(t, r, n) {
    const o = t instanceof DocumentFragment;
    if (r.useLayout) {
      const a = this.findLayout(n);
      if (a) {
        const s = a(),
          i = s.querySelector("slot");
        if (i)
          if (o) i.replaceWith(t);
          else {
            const l = document.createElement("template");
            ((l.innerHTML = t), i.replaceWith(l.content));
          }
        else
          console.warn(
            "Layout does not contain a <slot> element. Content will not be inserted."
          );
        ((this.root.innerHTML = ""), this.root.appendChild(s));
      } else
        o
          ? ((this.root.innerHTML = ""), this.root.appendChild(t))
          : (this.root.innerHTML = t);
    } else
      o
        ? ((this.root.innerHTML = ""), this.root.appendChild(t))
        : (this.root.innerHTML = t);
    this.attachEventListeners(n);
  }
  attachEventListeners(t) {
    const r = document.getElementById("loginBtn");
    r &&
      r.addEventListener("click", () => {
        this.login();
      });
    const n = document.getElementById("logoutBtn");
    n &&
      n.addEventListener("click", () => {
        this.logout();
      });
  }
  login() {
    this.setAuth(!0);
    const t = sessionStorage.getItem("redirectAfterLogin");
    (sessionStorage.removeItem("redirectAfterLogin"),
      this.navigate(t || "/dashboard"));
  }
  logout() {
    (this.setAuth(!1), this.navigate(this.loginPath));
  }
  start() {
    this.handleRoute();
  }
}
const le = `<div class="mx-auto max-w-4xl p-6">\r
  <h1 class="mb-6 text-4xl font-bold text-gray-900">À propos</h1>\r
  <p class="mb-6 text-lg text-gray-700">\r
    Base de code pour la SAE 3.01. Octobre 2025</p>\r
<p class="mb-6 text-lg text-gray-700">\r
    Se référer à la documentation pour comprendre comment l'utiliser\r
    </p>\r
   \r
</div>`;
function ce() {
  return le;
}
const B = `<section class="flex flex-col gap-10">\r
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
`;
let T = "https://mmi.unilim.fr/~mishcherikova1/api/",
  L = async function (e) {
    let t = { method: "GET", credentials: "include" };
    try {
      var r = await fetch(T + e, t);
    } catch (o) {
      return (console.error("Echec de la requête : " + o), !1);
    }
    return r.status != 200
      ? (console.error("Erreur de requête : " + r.status), !1)
      : await r.json();
  },
  Q = async function (e, t) {
    let r = {
      credentials: "include",
      method: "POST",
      headers: { "Content-Type": "miltipart/form-data" },
      body: JSON.stringify(t),
    };
    try {
      var n = await fetch(T + e, r);
    } catch (a) {
      return (console.error("Echec de la requête : " + a), !1);
    }
    if (!n.ok) {
      const a = await n.text();
      return (
        console.error("Erreur de requête : " + n.status),
        console.error("Réponse du serveur:", a),
        !1
      );
    }
    return await n.json();
  },
  de = async function (e) {
    let t = { method: "DELETE", credentials: "include" };
    try {
      var r = await fetch(T + e, t);
    } catch (o) {
      return (console.error("Echec de la requête : " + o), !1);
    }
    return r.status != 200
      ? (console.error("Erreur de requête : " + r.status), !1)
      : await r.json();
  },
  ue = async function (e, t) {
    let r = {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(t),
    };
    try {
      var n = await fetch(T + e, r);
    } catch (a) {
      return (console.error("Echec de la requête : " + a), !1);
    }
    if (!n.ok) {
      const a = await n.text();
      return (
        console.error("Erreur de requête : " + n.status),
        console.error("Réponse du serveur:", a),
        !1
      );
    }
    return await n.json();
  },
  q = {},
  J = [
    {
      id: 1,
      name: "Sabrina Carpenter - Man's Best Friend - Vinyle Luxe Packaging (Exclusivité)",
      price: "€59,99",
      category: 1,
    },
    {
      id: 2,
      name: "Various Artist - Almost Famous - Double Vinyle Violet & Magenta Exclusif",
      price: "€34,99",
      category: 1,
    },
    {
      id: 3,
      name: "KPop Demon Hunters (Soundtrack from the Netflix Film) - Vinyle Smokey Fushia Exclusif",
      price: "€29,99",
      category: 1,
    },
  ];
q.fetch = async function (e) {
  let t = await L("products/" + e);
  return t == !1 ? t[0] : t;
};
q.fetchAll = async function () {
  let e = await L("products");
  return e == !1 ? J : e;
};
q.parCategory = async function (e) {
  let t = await L(`products?category=${e}`);
  return t === !1 ? J.filter((r) => r.category == e) : t;
};
let E = {},
  Y = [
    { id: 1, name: "Mobilier" },
    { id: 2, name: "Électronique" },
    { id: 3, name: "Bureautique" },
  ];
E.fetchAll = async function () {
  let e = await L("categories");
  return e === !1 ? Y : e;
};
E.findNameOfCategory = async function (e) {
  let t = await L(`categories/${e}`);
  if (t === !1 || !t) {
    const r = Y.find((n) => n.id == e);
    return r ? r.name : null;
  }
  return t.name || null;
};
let w = function (e, t) {
  if (!t) return (console.warn("genericRenderer: No data provided"), e);
  let r = e;
  for (let n in t) {
    const o = t[n] !== null && t[n] !== void 0 ? t[n] : "";
    r = r.replaceAll(new RegExp("{{" + n + "}}", "g"), o);
  }
  return r;
};
function g(e) {
  const t = document.createElement("template");
  return ((t.innerHTML = e.trim()), t.content);
}
const fe = `<a href="/products/{{id}}/{{name}}"\r
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
      data-add-to-cart="{{id}}"\r
      class="bg-[#f6f5fa] gap-1 items-center justify-center font-normal text-black text-sm uppercase whitespace-nowrap font-rethink leading-5 px-3 py-[14px] rounded-lg w-full transition hover:bg-accent-hover flex"\r
    >\r
      Ajouter au panier\r
    </button>\r
  </div>\r
</a>\r
`,
  H = "SAE301_cart",
  b = {
    items: [],
    load() {
      try {
        const e = localStorage.getItem(H);
        this.items = e ? JSON.parse(e) : [];
      } catch (e) {
        (console.error("Cart load failed:", e), (this.items = []));
      }
      return (this.notifyChange(), this.items);
    },
    save() {
      try {
        localStorage.setItem(H, JSON.stringify(this.items));
      } catch (e) {
        console.error("Cart save failed:", e);
      }
      this.notifyChange();
    },
    notifyChange() {
      const e = {
          count: this.getCount(),
          total: this.getTotal(),
          items: this.getItems(),
        },
        t = new CustomEvent("cart:changed", { detail: e });
      window.dispatchEvent(t);
    },
    clear() {
      ((this.items = []), this.save());
    },
    getItems() {
      return this.items.slice();
    },
    getCount() {
      return this.items.reduce((e, t) => e + (t.qty || 0), 0);
    },
    getTotal() {
      return this.items.reduce(
        (e, t) => e + Number(t.price || 0) * (t.qty || 0),
        0
      );
    },
    find(e) {
      return this.items.find((t) => String(t.productId) === String(e));
    },
    add(e, t = 1) {
      if (!e || (!e.id && !e.productId)) {
        console.error("Invalid product", e);
        return;
      }
      const r = e.id || e.productId,
        n = this.find(r);
      (n
        ? (n.qty = (n.qty || 0) + t)
        : this.items.push({
            productId: r,
            name: e.name || e.title || e.label || "",
            price: Number(e.price || e.unitPrice || 0),
            qty: t,
            image: e.image || "",
            meta: { ...e },
          }),
        this.save());
    },
    updateQuantity(e, t) {
      const r = this.find(e);
      if (!r) return;
      const n = Number(t);
      n <= 0 ? this.remove(e) : ((r.qty = n), this.save());
    },
    increase(e) {
      const t = this.find(e);
      t && ((t.qty = (t.qty || 0) + 1), this.save());
    },
    decrease(e) {
      const t = this.find(e);
      t &&
        ((t.qty = Math.max(0, (t.qty || 0) - 1)),
        t.qty === 0 ? this.remove(e) : this.save());
    },
    remove(e) {
      ((this.items = this.items.filter(
        (t) => String(t.productId) !== String(e)
      )),
        this.save());
    },
  },
  ge = `<div\r
  data-toast\r
  class="fixed bottom-6 right-6 bg-fg text-bg px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 z-50 transition-all duration-300 transform translate-y-0 opacity-100"\r
  style="transform: translateY(100px); opacity: 0"\r
>\r
  <!-- Success Icon -->\r
  <svg\r
    xmlns="http://www.w3.org/2000/svg"\r
    width="24"\r
    height="24"\r
    viewBox="0 0 24 24"\r
    fill="none"\r
  >\r
    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />\r
    <path\r
      d="M8 12L11 15L16 9"\r
      stroke="currentColor"\r
      stroke-width="2"\r
      stroke-linecap="round"\r
      stroke-linejoin="round"\r
    />\r
  </svg>\r
\r
  <!-- Message -->\r
  <div class="flex flex-col gap-1">\r
    <p class="font-rethink font-semibold text-sm">Produit ajouté au panier</p>\r
    <p class="font-rethink text-xs opacity-90">{{name}}</p>\r
  </div>\r
\r
  <!-- Close button -->\r
  <button\r
    data-toast-close\r
    class="ml-4 hover:opacity-70 transition-opacity"\r
    aria-label="Fermer"\r
  >\r
    <svg\r
      xmlns="http://www.w3.org/2000/svg"\r
      width="20"\r
      height="20"\r
      viewBox="0 0 20 20"\r
      fill="none"\r
    >\r
      <path\r
        d="M15 5L5 15M5 5L15 15"\r
        stroke="currentColor"\r
        stroke-width="2"\r
        stroke-linecap="round"\r
        stroke-linejoin="round"\r
      />\r
    </svg>\r
  </button>\r
</div>\r
`;
let K = {
    show: function (e = "Produit ajouté au panier", t = "", r = 3e3) {
      const n = document.querySelector("[data-toast]");
      n && n.remove();
      const a = w(ge, { name: t }),
        i = g(a).querySelector("[data-toast]");
      if (!i) return;
      if (e !== "Produit ajouté au panier") {
        const m = i.querySelector("p.font-semibold");
        m && (m.textContent = e);
      }
      (document.body.appendChild(i),
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            ((i.style.transform = "translateY(0)"), (i.style.opacity = "1"));
          });
        }));
      const l = i.querySelector("[data-toast-close]"),
        u = () => {
          ((i.style.transform = "translateY(100px)"),
            (i.style.opacity = "0"),
            setTimeout(() => i.remove(), 300));
        };
      (l && l.addEventListener("click", u), r > 0 && setTimeout(u, r));
    },
    showAddedToCart: function (e, t = 3e3) {
      this.show("Produit ajouté au panier", e, t);
    },
  },
  R = {
    html: function (e) {
      const t = Array.isArray(e) ? e : e && typeof e == "object" ? [e] : [];
      let r =
        '<div class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">';
      for (let n of t) r += w(fe, n);
      return r + "</div>";
    },
    dom: function (e) {
      const t = g(R.html(e));
      return (
        t.querySelectorAll("[data-add-to-cart]").forEach((n) => {
          n.addEventListener("click", (o) => {
            (o.preventDefault(), o.stopPropagation());
            const a = n.getAttribute("data-add-to-cart"),
              i = (Array.isArray(e) ? e : [e]).find(
                (l) => String(l.id) === String(a)
              );
            if (i) {
              (b.add(i, 1), K.showAddedToCart(i.name || i.title || "Produit"));
              const l = n.textContent;
              ((n.textContent = "Ajouté ✓"),
                n.classList.add("bg-accent-hover"),
                setTimeout(() => {
                  ((n.textContent = l), n.classList.remove("bg-accent-hover"));
                }, 1e3));
            }
          });
        }),
        t
      );
    },
  },
  p = {};
p.login = async function (e) {
  return await Q("auth", e);
};
p.logout = async function () {
  return await de("auth");
};
p.status = async function () {
  return (console.log("UserData.status called"), await L("auth"));
};
p.register = async function (e) {
  const t = await Q("users", e);
  return (console.log("UserData.register response:", t), t);
};
p.update = async function (e, t) {
  return (
    console.log("UserData.update called with:", e, t),
    await ue(`users/${e}`, t)
  );
};
p.findUserEmail = async function (e) {
  if (!e) return null;
  const t = await L(`users/${e}`);
  return t === !1 || !t ? null : (t.firstName ?? null);
};
let d = { products: [], categories: [], user: null, isAuthenticated: !1 };
d.getCategories = async function () {
  return (
    (d.categories = await E.fetchAll()),
    console.log("categories:", d.categories),
    d.categories
  );
};
d.checkAuth = async function () {
  try {
    const e = await p.status();
    (console.log("Auth status:", e),
      e && e !== !1 && e.authenticated && e.user
        ? ((d.isAuthenticated = !0),
          (d.user = e.user),
          console.log("User authenticated:", d.user))
        : ((d.isAuthenticated = !1), (d.user = null)));
  } catch (e) {
    (console.error("Auth check failed:", e),
      (d.isAuthenticated = !1),
      (d.user = null));
  }
};
d.getProducts = async function () {
  return (
    (d.products = await q.fetchAll()),
    console.log("products:", d.products),
    d.products
  );
};
let Z = {};
Z.init = async function () {
  try {
    await Promise.all([d.checkAuth(), d.getCategories(), d.getProducts()]);
  } catch (e) {
    (console.error("Failed loading data:", e),
      (d.categories = d.categories || []),
      (d.products = d.products || []));
  }
};
let M = {};
M.init = function (e, t, r, n) {
  return M.createPageFragment(e, t, r, n);
};
M.createPageFragment = function (e = [], t = [], r = null, n = !1) {
  let o = B;
  n && r && r.firstName
    ? (o = w(B, { firstName: r.firstName }))
    : (o = B.replace(/\{\{firstName\}\}/g, ""));
  let a = g(o);
  const s = a.querySelector("h1");
  return (
    s && (n || s.classList.add("hidden")),
    [
      { element: a.querySelector("[data-vinyles]"), categoryIndex: 0 },
      { element: a.querySelector("[data-merch]"), categoryIndex: 1 },
      { element: a.querySelector("[data-accessories]"), categoryIndex: 2 },
    ].forEach(({ element: l, categoryIndex: u }) => {
      if (!l || !t[u]) return;
      const m = t[u],
        k = l.querySelector("h2");
      k && (k.textContent = m.name || m.title || `Catégorie ${u + 1}`);
      const O = e.filter(
        (D) =>
          D.id_category === m.id || D.categoryId === m.id || D.category === m.id
      );
      console.log(`Category ${m.name}: ${O.length} products`);
      const se = l.querySelector("[data-products-host]"),
        _ = l.querySelector('slot[name="products"]');
      if (se && _) {
        const D = R.dom(O);
        _.replaceWith(D);
      }
    }),
    a
  );
};
async function me() {
  return (
    await Z.init(),
    M.init(d.products, d.categories, d.user, d.isAuthenticated)
  );
}
const pe = `<aside class="w-full xl:w-80 flex flex-col gap-4">\r
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
`,
  he = (e, t) => `
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
`,
  xe = {
    dom(e, t = {}) {
      const r = g(pe),
        n = r.querySelector("[data-category-list]"),
        o = Array.isArray(e) ? e : [];
      let a = "";
      for (let s = 0; s < o.length; s++) {
        const i = o[s];
        a += he(i.id, i.name || i.label || `Cat ${i.id}`);
      }
      return (n && n.replaceChildren(g(a)), r);
    },
  },
  ye = `<div class="flex flex-col items-start self-stretch gap-4 md:gap-8 lg:gap-8">\r
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
`;
let c = {
  products: [],
  categories: [],
  selectedCategory: null,
  categoryName: "Le catalogue de produits",
  totalProducts: 0,
};
c.getCategoryById = function (e) {
  return c.categories.find((t) => t.id == e);
};
let P = {};
P.handler_clickOnProduct = function (e) {
  const t = e.target.closest("[data-buy]");
  t && alert(`Le produit d'identifiant ${t.dataset.buy} ? Excellent choix !`);
};
P.updateProductsForCategory = async function (e, t) {
  (t
    ? ((c.selectedCategory = t), (c.categoryName = E.findNameOfCategory(t)))
    : (c.selectedCategory = null),
    c.selectedCategory
      ? (c.products = await q.parCategory(c.selectedCategory))
      : (c.products = await q.fetchAll()),
    (c.totalProducts = c.products.length));
  let r = null;
  if (c.selectedCategory) {
    for (const o of c.categories)
      if (String(o.id) === String(c.selectedCategory)) {
        r = o;
        break;
      }
  }
  c.categoryName = r ? r.name : "Le catalogue de produits";
  const n = e.querySelector("[data-products-host]");
  if (n) {
    const o = R.dom(c.products);
    n.replaceChildren(o);
    const a = e.querySelector("[data-nombre]");
    a && (a.textContent = c.products.length);
    const s = e.querySelector("[data-category-name]");
    s && (s.textContent = c.categoryName);
  }
};
P.onLabelClick = async function (e) {
  const t = e.target.closest("label");
  if (!t) return;
  const r = e.currentTarget,
    n = t.getAttribute("for"),
    o = r.querySelector(`#${n}`);
  o && (await P.updateProductsForCategory(r, o.value));
};
P.init = async function (e) {
  let t = e.id;
  if (
    ((c.selectedCategory = t),
    (c.categories = await E.fetchAll()),
    c.selectedCategory
      ? (c.products = await q.parCategory(c.selectedCategory))
      : (c.products = await q.fetchAll()),
    (c.totalProducts = c.products.length),
    c.selectedCategory)
  ) {
    const r = c.categories.find(
      (n) => String(n.id) === String(c.selectedCategory)
    );
    c.categoryName = r ? r.name : "Le catalogue de produits";
  } else c.categoryName = "Le catalogue de produits";
  return A.init(c.products, c.categories, c.selectedCategory, c.totalProducts);
};
let A = {};
A.init = function (e, t, r = null, n) {
  let o = A.createPageFragment(e, t, r, n);
  return (A.attachEvents(o), o);
};
A.createPageFragment = function (e, t) {
  let r = ye.replaceAll("{{categoryName}}", c.categoryName);
  console.log(c.categoryName);
  let n = g(r),
    o = xe.dom(t),
    a = n.querySelector('slot[name="categories"]');
  a && a.replaceWith(o);
  let s = R.dom(e),
    i = document.createElement("div");
  (i.setAttribute("data-products-host", ""), i.appendChild(s));
  let l = n.querySelector('slot[name="products"]');
  l && l.replaceWith(i);
  let u = n.querySelector("[data-nombre]");
  return (u && (u.textContent = e.length), n);
};
A.attachEvents = function (e) {
  const t = e.firstElementChild;
  return (
    t.addEventListener("click", P.handler_clickOnProduct),
    t.addEventListener("click", P.onLabelClick),
    e
  );
};
function X(e) {
  return (console.log("ProductsPage params:", e), P.init(e));
}
const be = `<!-- Breadcrumb -->\r
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
`;
let ve = {
  html: function (e) {
    return w(be, e);
  },
  dom: function (e) {
    return g(this.html(e));
  },
};
const we = `<article\r
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
`;
let ee = {
  html: function (e) {
    return w(we, e);
  },
  dom: function (e) {
    const t = g(ee.html(e));
    if (e.artist || e.label) {
      const n = t.querySelector("#infosupp");
      n && (n.classList = "flex flex-col gap-2");
    } else {
      const n = t.querySelector("#infosupp");
      n && n.remove();
    }
    const r = t.querySelector("[data-buy]");
    return (
      r &&
        e &&
        r.addEventListener("click", (n) => {
          (n.preventDefault(),
            b.add(e, 1),
            K.showAddedToCart(e.name || e.title || "Produit"));
          const o = r.textContent;
          ((r.textContent = "Ajouté au panier ✓"),
            (r.style.opacity = "0.7"),
            setTimeout(() => {
              ((r.textContent = o), (r.style.opacity = "1"));
            }, 1500));
        }),
      t
    );
  },
};
const ke = `<div class="flex-1 min-w-0">\r
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
`;
let Ce = {
  html: function (e) {
    if (!e || e.length === 0)
      return "<div class='flex-1 min-w-0'><p class='text-center text-gray-500'>Aucune image disponible</p></div>";
    const t = e[0],
      r = (a, s) => `
      <button
        type="button"
        class="group relative rounded-md overflow-hidden border border-gray-300 hover:border-accent-hover transition-colors cursor-pointer"
        data-thumb-index="${s}"
      >
        <img 
          src="/images/${a}" 
          alt="Miniature ${s + 1}" 
          class="w-full h-full object-cover aspect-square" 
          loading="lazy" 
        />
      </button>
    `,
      n = e[1] ? r(e[1], 1) : "",
      o = e[2] ? r(e[2], 2) : "";
    return w(ke, { mainImage: t, thumbs: n + o });
  },
  dom: function (e) {
    const t = g(this.html(e));
    if (!e || e.length === 0) return t;
    const r = t.querySelector("[data-main-image]"),
      n = t.querySelector("[data-gallery-prev]"),
      o = t.querySelector("[data-gallery-next]"),
      a = t.querySelector("[data-thumbs]");
    let s = 0;
    const i = () => {
        const u = (s + 1) % e.length,
          m = (s + 2) % e.length;
        let k = "";
        (e[u] &&
          (k += `
          <button type="button" 
                  class="group relative rounded-md overflow-hidden border border-gray-300 hover:border-accent-hover transition-colors cursor-pointer"
                  data-thumb-index="${u}">
            <img src="/images/${e[u]}" 
                 alt="Miniature ${u + 1}"
                 class="w-full h-full object-cover aspect-square" 
                 loading="lazy" />
          </button>
        `),
          e.length > 2 &&
            e[m] &&
            (k += `
          <button type="button" 
                  class="group relative rounded-md overflow-hidden border border-gray-300 hover:border-accent-hover transition-colors cursor-pointer"
                  data-thumb-index="${m}">
            <img src="/images/${e[m]}" 
                 alt="Miniature ${m + 1}"
                 class="w-full h-full object-cover aspect-square" 
                 loading="lazy" />
          </button>
        `),
          (a.innerHTML = k));
      },
      l = () => {
        ((r.src = `/images/${e[s]}`), (r.alt = `Product image ${s + 1}`), i());
      };
    return (
      n &&
        n.addEventListener("click", () => {
          ((s = (s - 1 + e.length) % e.length), l());
        }),
      o &&
        o.addEventListener("click", () => {
          ((s = (s + 1) % e.length), l());
        }),
      a &&
        a.addEventListener("click", (u) => {
          const m = u.target.closest("[data-thumb-index]");
          if (!m) return;
          const k = Number(m.getAttribute("data-thumb-index"));
          Number.isFinite(k) && ((s = k), l());
        }),
      l(),
      t
    );
  },
};
const qe = `<div>\r
  <slot name="breadcrumb"></slot>\r
  <section class="flex flex-col md:grid md:grid-cols-2 md:">\r
    <slot name="gallery"></slot>\r
    <slot name="detail"></slot>\r
  </section>\r
</div>\r
`;
let F = { product: null, ImageGallery: [] };
F.getProductById = function (e) {
  return F.product.find((t) => t.id == e);
};
let te = {};
te.init = async function (e) {
  let t = e.id,
    r = await q.fetch(t);
  (console.log(r),
    r.gallery.forEach(function (o) {
      F.ImageGallery.push(o);
    }));
  let n = await E.findNameOfCategory(r.category);
  return ((n = await E.findNameOfCategory(r.category)), V.init(r, n));
};
let V = {};
V.init = function (e, t) {
  return V.createPageFragment(e, t);
};
V.createPageFragment = function (e, t) {
  let r = g(qe),
    n = { categoryName: t, name: e.name },
    o = ve.dom(n),
    a = ee.dom(e),
    s = Ce.dom(F.ImageGallery);
  return (
    r.querySelector('slot[name="breadcrumb"]').replaceWith(o),
    r.querySelector('slot[name="gallery"]').replaceWith(s),
    r.querySelector('slot[name="detail"]').replaceWith(a),
    r
  );
};
function Se(e) {
  return te.init(e);
}
const Pe = `<section\r
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
`;
let re = {
  html: function () {
    return Pe;
  },
  dom: function () {
    return g(re.html());
  },
};
const Ee = `<div id="connection-page" class="w-full">\r
  <slot name="form"></slot>\r
</div>\r
`;
let v = {};
v.handler_form = async function (e) {
  (e.preventDefault(), e.stopPropagation());
  let t = e.target,
    r = new FormData(t);
  const n = r.get("email").trim().toLowerCase(),
    o = r.get("name").trim(),
    a = r.get("surname").trim(),
    s = r.get("password").trim();
  if (!n || !n.includes("@") || s.length < 8) {
    alert(
      "Veuillez entrer un email valide et un mot de passe (8 caractères minimum)."
    );
    return;
  }
  const i = { email: n, password: s, firstName: o, secondName: a };
  console.log("Données de connexion :", i);
  try {
    const l = await p.register(i);
    if (!l || l === !1) {
      alert("Erreur lors de la création du compte. Vérifiez la console.");
      return;
    }
    if (l.error) alert("Erreur: " + l.error);
    else {
      console.log("Compte créé avec succès !", l);
      const u = await p.login({ email: n, password: s });
      u && u.success
        ? (console.log("Connexion automatique réussie"),
          v.router
            ? (v.router.setAuth(!0), v.router.navigate("/profile"))
            : (window.location.href = "/profile"))
        : (alert("Compte créé ! Veuillez vous connecter."),
          v.router
            ? v.router.navigate("/profile")
            : (window.location.href = "/profile"));
    }
  } catch (l) {
    (console.error("Erreur de connexion :", l),
      alert("Erreur technique: " + l.message));
  }
};
v.init = function (e) {
  return ((v.router = e), $.init());
};
let $ = {};
$.init = function () {
  let e = $.createPageFragment();
  return ($.attachEvents(e), e);
};
$.createPageFragment = function () {
  let e = g(Ee),
    t = re.dom();
  return (e.querySelector("slot[name=form]").replaceWith(t), e);
};
$.attachEvents = function (e) {
  return (
    e
      .querySelector("#connectionForm")
      .addEventListener("submit", v.handler_form),
    e
  );
};
function Le(e, t) {
  return v.init(t);
}
const je = `<section\r
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
`;
let ne = {
  html: function () {
    return je;
  },
  dom: function () {
    return g(ne.html());
  },
};
const Ae = `<div id="connection-page" class="w-full">\r
  <slot name="form"></slot>\r
</div>\r
`;
let S = {};
S.handler_form = async function (e) {
  (e.preventDefault(), e.stopPropagation());
  let t = e.target,
    r = new FormData(t);
  const n = r.get("email").trim().toLowerCase(),
    o = r.get("password").trim();
  if (!n || !n.includes("@") || o.length < 8) {
    alert(
      "Veuillez entrer un email valide et un mot de passe (8 caractères minimum)."
    );
    return;
  }
  const a = { email: n, password: o };
  console.log("Données de connexion :", a);
  try {
    const s = await p.login(a);
    if (!s || s.success === !1) {
      alert(
        s.error || "Erreur lors de la connexion. Vérifiez vos identifiants."
      );
      return;
    }
    (console.log("Connexion réussie", s),
      S.router
        ? (S.router.setAuth(!0), S.router.navigate("/profile"))
        : (console.error("Router is not available!"),
          (window.location.href = "/profile")));
  } catch (s) {
    (console.error("Erreur de connexion :", s),
      alert("Erreur technique: " + s.message));
  }
};
S.init = function (e) {
  return ((S.router = e), N.init());
};
let N = {};
N.init = function () {
  let e = N.createPageFragment();
  return (N.attachEvents(e), e);
};
N.createPageFragment = function () {
  let e = g(Ae),
    t = ne.dom();
  return (e.querySelector("slot[name=form]").replaceWith(t), e);
};
N.attachEvents = function (e) {
  return (
    e
      .querySelector("#connectionForm")
      .addEventListener("submit", S.handler_form),
    e
  );
};
function $e(e, t) {
  return S.init(t);
}
const W = `<article\r
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
`;
let z = {
  html: function (e) {
    return e
      ? (console.log("ProfileView rendering with data:", e), w(W, e))
      : (console.warn("ProfileView: No data provided"),
        W.replace(/{{firstName}}/g, "Utilisateur"));
  },
  dom: function (e) {
    return g(z.html(e));
  },
};
const U = `<section class="flex items-center justify-center w-full">\r
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
`;
let oe = {
  html: function (e) {
    return e ? w(U, e) : U;
  },
  dom: function (e) {
    const t = g(oe.html(e));
    if (e) {
      const r = t.querySelector("#dataForm");
      if (r) {
        const n = r.querySelector("#firstName"),
          o = r.querySelector("#secondName"),
          a = r.querySelector("#email");
        (n && e.firstName && (n.value = e.firstName),
          o && e.secondName && (o.value = e.secondName),
          a && e.email && (a.value = e.email));
      }
    }
    return t;
  },
};
const Ne = `<section class="flex flex-col md:flex-row gap-8 md:gap-16 lg:gap-24 px-2 py-2">\r
  <slot name="profile-navigation"> </slot>\r
  <slot profile-info name="profile-info"> </slot>\r
</section>\r
`;
let j = {},
  y = {};
y.handler_clickOnDisconnect = async function (e) {
  if (e.target.closest("[data-disconnect]")) {
    try {
      const r = await p.logout();
      r && r.success
        ? console.log("Déconnexion réussie")
        : console.warn("Erreur lors de la déconnexion", r);
    } catch (r) {
      console.error("Erreur de déconnexion:", r);
    }
    y.router
      ? (y.router.setAuth(!1), y.router.navigate("/"))
      : (window.location.href = "/");
  }
};
y.handler_clickOnProfileInfo = function (e) {
  if (!e.target.closest("[data-profil-info]")) return;
  console.log("Profile Info button clicked");
  const r = e.currentTarget;
  if (!r) {
    console.error("currentTarget is null");
    return;
  }
  const n = r.querySelector('slot[name="profile-info"]');
  if (!n) {
    console.error("profile-info slot not found");
    return;
  }
  const o = r.querySelector("[data-profile-form]");
  if (o) {
    o.remove();
    return;
  }
  const a = oe.dom(j.userData),
    s = a.querySelector("section") || a;
  s && s.setAttribute("data-profile-form", "");
  const i = a.querySelector("#dataForm");
  (i && i.addEventListener("submit", y.handler_submitProfileForm),
    n.replaceWith(a));
};
y.handler_submitProfileForm = async function (e) {
  e.preventDefault();
  const t = e.target,
    r = new FormData(t),
    n = {
      firstName: r.get("firstName"),
      secondName: r.get("secondName"),
      email: r.get("email"),
    },
    o = r.get("password");
  (o && o.trim() !== "" && (n.password = o),
    console.log("Updating user profile with data:", n));
  try {
    const a = j.userData.id || j.userData.id_user;
    if ((console.log("User ID:", a), !a)) {
      (console.error("No user ID found"),
        alert("Erreur: ID utilisateur introuvable"));
      return;
    }
    const s = await p.update(a, n);
    s
      ? (console.log("Profile updated successfully:", s),
        alert("Profil mis à jour avec succès!"),
        (j.userData = { ...j.userData, ...s }),
        y.router && y.router.navigate("/profile"))
      : (console.error("Failed to update profile"),
        alert("Erreur lors de la mise à jour du profil"));
  } catch (a) {
    (console.error("Error updating profile:", a),
      alert("Erreur lors de la mise à jour du profil"));
  }
};
y.init = async function (e, t) {
  y.router = t;
  const r = await p.status();
  console.log("[C.init] UserData.status result:", r);
};
let I = {};
I.init = function (e) {
  (console.log("[V.init] Called with data:", e), (j.userData = e));
  const t = I.createPageFragment(e);
  return (
    console.log("[V.init] createPageFragment returned:", t),
    I.attachEvents(t, !!e),
    console.log("[V.init] Returning fragment"),
    t
  );
};
I.createPageFragment = function (e) {
  console.log("[V.createPageFragment] Called with data:", e);
  const t = g(Ne);
  if ((console.log("[V.createPageFragment] pageFragment:", t), !e))
    return (
      console.warn(
        "[V.createPageFragment] No data provided, returning empty fragment"
      ),
      t
    );
  z.dom(e);
  const r = z.dom(e),
    n = t.querySelector('slot[name="profile-navigation"]');
  return (
    n &&
      (n.replaceWith(r),
      console.log(
        "[V.createPageFragment] Navigation slot replaced with profileDOM"
      )),
    t
  );
};
I.attachEvents = function (e, t) {
  const r = e && e.firstElementChild ? e.firstElementChild : e;
  return (
    r &&
      t &&
      (r.addEventListener("click", y.handler_clickOnProfileInfo),
      r.addEventListener("click", y.handler_clickOnDisconnect)),
    e
  );
};
async function Ie() {
  console.log("[ProfilePage] START");
  const e = await p.status();
  if (!e || !e.authenticated)
    return (
      console.warn(
        "[ProfilePage] REDIRECT to /login because:",
        e ? "not authenticated" : "no result"
      ),
      document.createDocumentFragment()
    );
  console.log("[ProfilePage] Calling V.init with user:", e.user);
  const t = I.init(e.user);
  return (console.log("[ProfilePage] V.init returned:", t), t);
}
const De = `<article\r
  class="flex flex-col md:flex-row gap-4 md:gap-6 p-4 border-b border-gray-20 border-solid"\r
>\r
  <!-- Product Image -->\r
  <div\r
    class="flex-shrink-0 w-full md:w-[10rem] h-[10rem] border border-gray-20 border-solid rounded-lg overflow-hidden"\r
  >\r
    <img\r
      src="../../../public/images/{{image}}"\r
      alt="{{name}}"\r
      class="w-full h-full object-cover"\r
    />\r
  </div>\r
\r
  <!-- Product Info -->\r
  <div class="flex flex-col flex-grow gap-3">\r
    <!-- Title and Remove Button -->\r
    <div class="flex justify-between items-start gap-4">\r
      <h3\r
        class="font-rethink font-semibold text-fg text-base md:text-lg leading-6"\r
      >\r
        {{name}}\r
      </h3>\r
      <button\r
        data-remove="{{productId}}"\r
        class="flex-shrink-0 p-2 hover:bg-accent-hover rounded-lg transition-colors"\r
        aria-label="Supprimer du panier"\r
      >\r
        <svg\r
          xmlns="http://www.w3.org/2000/svg"\r
          width="20"\r
          height="20"\r
          viewBox="0 0 20 20"\r
          fill="none"\r
        >\r
          <path\r
            d="M15 5L5 15M5 5L15 15"\r
            stroke="#212121"\r
            stroke-width="2"\r
            stroke-linecap="round"\r
            stroke-linejoin="round"\r
          />\r
        </svg>\r
      </button>\r
    </div>\r
\r
    <!-- Price and Quantity Controls -->\r
    <div\r
      class="flex flex-col md:flex-row md:items-center justify-between gap-4"\r
    >\r
      <!-- Price per unit -->\r
      <p class="font-rethink font-bold text-fg text-base tracking-[0.16px]">\r
        €{{price}}\r
      </p>\r
\r
      <!-- Quantity Controls -->\r
      <div class="flex items-center gap-3">\r
        <button\r
          data-decrease="{{productId}}"\r
          class="flex items-center justify-center w-8 h-8 border border-gray-20 border-solid rounded-lg hover:bg-accent-hover transition-colors"\r
          aria-label="Diminuer la quantité"\r
        >\r
          <svg\r
            xmlns="http://www.w3.org/2000/svg"\r
            width="16"\r
            height="16"\r
            viewBox="0 0 16 16"\r
            fill="none"\r
          >\r
            <path\r
              d="M3.33334 8H12.6667"\r
              stroke="#212121"\r
              stroke-width="1.5"\r
              stroke-linecap="round"\r
              stroke-linejoin="round"\r
            />\r
          </svg>\r
        </button>\r
\r
        <input\r
          type="number"\r
          data-quantity="{{productId}}"\r
          value="{{qty}}"\r
          min="1"\r
          max="99"\r
          class="w-14 h-8 text-center border border-gray-20 border-solid rounded-lg font-rethink text-fg text-sm focus:outline-none focus:border-fg"\r
        />\r
\r
        <button\r
          data-increase="{{productId}}"\r
          class="flex items-center justify-center w-8 h-8 border border-gray-20 border-solid rounded-lg hover:bg-accent-hover transition-colors"\r
          aria-label="Augmenter la quantité"\r
        >\r
          <svg\r
            xmlns="http://www.w3.org/2000/svg"\r
            width="16"\r
            height="16"\r
            viewBox="0 0 16 16"\r
            fill="none"\r
          >\r
            <path\r
              d="M8 3.33334V12.6667M3.33334 8H12.6667"\r
              stroke="#212121"\r
              stroke-width="1.5"\r
              stroke-linecap="round"\r
              stroke-linejoin="round"\r
            />\r
          </svg>\r
        </button>\r
      </div>\r
\r
      <!-- Subtotal -->\r
      <p\r
        class="font-rethink font-bold text-fg text-base md:text-lg tracking-[0.16px]"\r
      >\r
        €{{subtotal}}\r
      </p>\r
    </div>\r
  </div>\r
</article>\r
`;
let ae = {
  html: function (e) {
    if (!e) return "";
    const t = ((e.price || 0) * (e.qty || 0)).toFixed(2),
      r = { ...e, subtotal: t };
    return w(De, r);
  },
  dom: function (e, t = {}) {
    const r = g(ae.html(e));
    if (!e || !e.productId) return r;
    const n = e.productId,
      o = r.querySelector(`[data-remove="${n}"]`),
      a = r.querySelector(`[data-decrease="${n}"]`),
      s = r.querySelector(`[data-increase="${n}"]`),
      i = r.querySelector(`[data-quantity="${n}"]`);
    return (
      o &&
        t.onRemove &&
        o.addEventListener("click", (l) => {
          (l.preventDefault(), t.onRemove(n));
        }),
      a &&
        t.onDecrease &&
        a.addEventListener("click", (l) => {
          (l.preventDefault(), t.onDecrease(n));
        }),
      s &&
        t.onIncrease &&
        s.addEventListener("click", (l) => {
          (l.preventDefault(), t.onIncrease(n));
        }),
      i &&
        t.onQuantityChange &&
        i.addEventListener("change", (l) => {
          const u = parseInt(l.target.value, 10);
          !isNaN(u) && u > 0 && t.onQuantityChange(n, u);
        }),
      r
    );
  },
};
const Me = `<section class="w-full max-w-[90rem] mx-auto px-4 md:px-10 py-8 md:py-12">\r
  <!-- Header -->\r
  <div class="flex flex-col gap-4 mb-8">\r
    <h1\r
      class="font-bebas text-fg text-mh2 md:text-dh2 uppercase leading-[95%] tracking-tighter"\r
    >\r
      Mon panier\r
    </h1>\r
    <p class="font-rethink text-fg text-base">\r
      <span data-cart-count>0</span> article(s) dans votre panier\r
    </p>\r
  </div>\r
\r
  <!-- Cart Content -->\r
  <div class="flex flex-col lg:flex-row gap-8">\r
    <!-- Cart Items List -->\r
    <div class="flex-1">\r
      <div data-cart-items class="flex flex-col">\r
        <!-- Cart items will be inserted here -->\r
      </div>\r
    </div>\r
  </div>\r
\r
  <div\r
    data-summary\r
    class="lg:hidden mt-8 border border-gray-20 border-solid rounded-lg p-6"\r
    style="display: none"\r
  >\r
    <h2\r
      class="font-bebas text-fg text-size22 uppercase leading-tight mb-6 tracking-tight"\r
    >\r
      Récapitulatif\r
    </h2>\r
\r
    <div class="flex flex-col gap-4 mb-6">\r
      <div class="flex justify-between font-rethink text-fg text-base">\r
        <span>Sous-total</span>\r
        <span data-subtotal>€0.00</span>\r
      </div>\r
      <div class="flex justify-between font-rethink text-fg text-base">\r
        <span>Livraison</span>\r
        <span>Gratuite</span>\r
      </div>\r
      <div class="w-full h-[1px] bg-gray-20"></div>\r
      <div class="flex justify-between font-rethink text-fg text-lg font-bold">\r
        <span>Total</span>\r
        <span data-total>€0.00</span>\r
      </div>\r
    </div>\r
\r
    <button\r
      data-checkout\r
      class="w-full bg-fg text-bg font-rethink font-semibold text-sm uppercase px-6 py-4 rounded-lg hover:opacity-90 transition-opacity"\r
    >\r
      Commander\r
    </button>\r
\r
    <button\r
      data-clear-cart\r
      class="w-full mt-3 border border-gray-20 border-solid text-fg font-rethink font-normal text-sm uppercase px-6 py-3 rounded-lg hover:bg-accent-hover transition-colors"\r
    >\r
      Vider le panier\r
    </button>\r
  </div>\r
</section>\r
`;
let C = { items: [], total: 0 },
  f = {};
f.init = function () {
  return ((C.items = b.getItems()), (C.total = b.getTotal()), x.init());
};
f.handleRemove = function (e) {
  (b.remove(e), f.refresh());
};
f.handleIncrease = function (e) {
  (b.increase(e), f.refresh());
};
f.handleDecrease = function (e) {
  (b.decrease(e), f.refresh());
};
f.handleQuantityChange = function (e, t) {
  (b.updateQuantity(e, t), f.refresh());
};
f.handleClearCart = function () {
  confirm("Êtes-vous sûr de vouloir vider votre panier ?") &&
    (b.clear(), f.refresh());
};
f.handleCheckout = function () {
  alert("Fonctionnalité de commande à venir !");
};
f.refresh = function () {
  ((C.items = b.getItems()), (C.total = b.getTotal()));
  const e = document.querySelector("section");
  e && (x.updateCartItems(e), x.updateSummary(e), x.updateVisibility(e));
};
let x = {};
x.init = function () {
  const e = g(Me);
  return (
    x.updateCartItems(e),
    x.updateSummary(e),
    x.updateVisibility(e),
    x.attachEvents(e),
    e
  );
};
x.updateCartItems = function (e) {
  const t = e.querySelector("[data-cart-items]");
  t &&
    ((t.innerHTML = ""),
    C.items.forEach((r) => {
      const n = ae.dom(r, {
        onRemove: f.handleRemove,
        onIncrease: f.handleIncrease,
        onDecrease: f.handleDecrease,
        onQuantityChange: f.handleQuantityChange,
      });
      t.appendChild(n);
    }));
};
x.updateSummary = function (e) {
  const t = C.total.toFixed(2),
    r = C.total.toFixed(2);
  (e
    .querySelectorAll("[data-subtotal]")
    .forEach((s) => (s.textContent = `€${t}`)),
    e
      .querySelectorAll("[data-total]")
      .forEach((s) => (s.textContent = `€${r}`)));
  const a = e.querySelector("[data-cart-count]");
  a && (a.textContent = String(C.items.length));
};
x.updateVisibility = function (e) {
  const t = C.items.length === 0,
    r = e.querySelector("[data-empty-message]"),
    n = e.querySelector("[data-cart-items]"),
    o = e.querySelector("[data-summary]"),
    a = e.querySelector("[data-mobile-summary]");
  t
    ? (r && (r.classList.remove("hidden"), r.classList.add("flex")),
      n && (n.style.display = "none"),
      o && (o.style.display = "none"),
      a && (a.style.display = "none"))
    : (r && (r.classList.add("hidden"), r.classList.remove("flex")),
      n && (n.style.display = "flex"),
      o && (o.style.display = "block"),
      a && (a.style.display = "block"));
};
x.attachEvents = function (e) {
  const t = e.querySelector("[data-clear-cart]"),
    r = e.querySelector("[data-clear-cart-mobile]");
  (t && t.addEventListener("click", f.handleClearCart),
    r && r.addEventListener("click", f.handleClearCart));
  const n = e.querySelector("[data-checkout]"),
    o = e.querySelector("[data-checkout-mobile]");
  return (
    n && n.addEventListener("click", f.handleCheckout),
    o && o.addEventListener("click", f.handleCheckout),
    e
  );
};
async function Fe() {
  return f.init();
}
const Ve = `<div style="min-height: 100vh; display: flex; flex-direction: column">\r
  <slot name="header"></slot>\r
  <main class="bg-bg" style="flex: 1; padding: 2rem">\r
    <slot></slot>\r
  </main>\r
  <slot name="footer"></slot>\r
</div>\r
`,
  Te = `<header\r
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
      <a href="/pannier" class="relative">\r
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
          <!-- Cart counter badge -->\r
          <span\r
            data-cart-count\r
            class="absolute -top-1 -right-1 bg-fg text-bg text-xs font-rethink font-semibold rounded-full min-w-[1.25rem] h-5 items-center justify-center px-1"\r
            style="display: none"\r
          ></span>\r
        </button>\r
      </a>\r
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
`;
let Re = {
  html: function (e) {
    return w(Te, e || {});
  },
  dom: function (e) {
    const t = this.html(e),
      r = g(t),
      n = r.querySelector("#\\#burgerMenu"),
      o = r.querySelector("ul[data-category-menu]");
    n &&
      o &&
      n.addEventListener("click", () => {
        (o.classList.toggle("hidden"),
          o.classList.toggle("flex"),
          o.classList.toggle("flex-col"),
          o.classList.toggle("gap-4"),
          o.classList.toggle("items-start"),
          o.classList.toggle("w-full"));
      });
    const a = r.querySelector("[data-cart-count]");
    function s() {
      if (!a) return;
      const i = b.getCount();
      i > 0
        ? ((a.textContent = String(i)), (a.style.display = "flex"))
        : (a.style.display = "none");
    }
    return (s(), window.addEventListener("cart:changed", s), r);
  },
};
const G = `<footer\r
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
`;
let Be = {
  html: function () {
    return G;
  },
  dom: function () {
    return g(G);
  },
};
function ze() {
  let e = g(Ve),
    t = Re.dom(),
    r = Be.dom();
  return (
    e.querySelector('slot[name="header"]').replaceWith(t),
    e.querySelector('slot[name="footer"]').replaceWith(r),
    e
  );
}
const Oe = ` <section>\r
    <h1>404 - Page non trouvée</h1>\r
        <p>Cette page n'existe pas</p>\r
    <nav>\r
        <a href="/" data-link>Retour à l'accueil</a>\r
    </nav>\r
</section>`;
function _e() {
  return Oe;
}
const h = new ie("app", { loginPath: "/login" });
async function He() {
  const e = await p.status();
  e && e.authenticated ? h.setAuth(!0) : h.setAuth(!1);
}
h.addLayout("/", ze);
h.addRoute("/", me);
h.addRoute("/about", ce);
h.addRoute("/login", $e, { useLayout: !1 });
h.addRoute("/connection", Le, { useLayout: !1 });
h.addRoute("/profile", Ie, { requireAuth: !0 });
h.addRoute("/products", X);
h.addRoute("/category/:id/:name", X);
h.addRoute("/products/:id/:slug", Se);
h.addRoute("/pannier", Fe);
h.addRoute("*", _e);
async function We() {
  (b.load(), await He(), h.start());
}
We();
