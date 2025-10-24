import template from "./template.html?raw";
import { ProductData } from "../../data/product";
import { CategoryData } from "../../data/category";
import { ProductView } from "../../ui/product/index.js";
import { UserData } from "../../data/user.js";
import { htmlToFragment, genericRenderer } from "../../lib/utils.js";

let M = {
  products: [],
  categories: [],
  user: null,
  isAuthenticated: false,
};

M.getCategories = async function () {
  M.categories = await CategoryData.fetchAll();
  console.log("categories:", M.categories);
  return M.categories;
};

M.checkAuth = async function () {
  try {
    const authStatus = await UserData.status();
    console.log("Auth status:", authStatus);

    // Перевіряємо чи отримали валідну відповідь (не false від api-request)
    if (
      authStatus &&
      authStatus !== false &&
      authStatus.authenticated &&
      authStatus.user
    ) {
      M.isAuthenticated = true;
      M.user = authStatus.user;
      console.log("User authenticated:", M.user);
    } else {
      M.isAuthenticated = false;
      M.user = null;
    }
  } catch (err) {
    console.error("Auth check failed:", err);
    M.isAuthenticated = false;
    M.user = null;
  }
};

M.getProducts = async function () {
  M.products = await ProductData.fetchAll();
  console.log("products:", M.products);
  return M.products;
};

let C = {};
C.init = async function () {
  try {
    // Завантажуємо дані паралельно
    await Promise.all([M.checkAuth(), M.getCategories(), M.getProducts()]);
  } catch (err) {
    console.error("Failed loading data:", err);
    M.categories = M.categories || [];
    M.products = M.products || [];
  }
};

let V = {};

V.init = function (products, categories, user, isAuthenticated) {
  return V.createPageFragment(products, categories, user, isAuthenticated);
};

V.createPageFragment = function (
  products = [],
  categories = [],
  user = null,
  isAuthenticated = false
) {
  // Підставляємо firstName в template
  let html = template;

  if (isAuthenticated && user && user.firstName) {
    html = genericRenderer(template, { firstName: user.firstName });
  } else {
    // Якщо не автентифікований, замінюємо placeholder на порожній рядок
    html = template.replace(/\{\{firstName\}\}/g, "");
  }

  let pageFragment = htmlToFragment(html);

  // Приховуємо h1 якщо користувач не автентифікований
  const h1 = pageFragment.querySelector("h1");
  if (h1) {
    if (!isAuthenticated) {
      h1.classList.add("hidden");
    }
  }

  const sections = [
    { element: pageFragment.querySelector("[data-vinyles]"), categoryIndex: 0 },
    { element: pageFragment.querySelector("[data-merch]"), categoryIndex: 1 },
    {
      element: pageFragment.querySelector("[data-accessories]"),
      categoryIndex: 2,
    },
  ];

  sections.forEach(({ element, categoryIndex }) => {
    if (!element || !categories[categoryIndex]) return;

    const category = categories[categoryIndex];

    const h2 = element.querySelector("h2");
    if (h2) {
      h2.textContent =
        category.name || category.title || `Catégorie ${categoryIndex + 1}`;
    }

    const categoryProducts = products.filter(
      (product) =>
        product.id_category === category.id ||
        product.categoryId === category.id ||
        product.category === category.id
    );

    console.log(
      `Category ${category.name}: ${categoryProducts.length} products`
    );

    const productsHost = element.querySelector("[data-products-host]");
    const slot = element.querySelector('slot[name="products"]');

    if (productsHost && slot) {
      const productsDOM = ProductView.dom(categoryProducts);
      slot.replaceWith(productsDOM);
    }
  });

  return pageFragment;
};

export async function HomePage() {
  await C.init();
  return V.init(M.products, M.categories, M.user, M.isAuthenticated);
}
