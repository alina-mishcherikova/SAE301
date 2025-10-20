import { ProductData } from "../../data/product.js";
import { CategoryData } from "../../data/category.js";
import { ProductView } from "../../ui/product/index.js";
import { CategoryView } from "../../ui/category/index.js";
import { htmlToFragment } from "../../lib/utils.js";
import template from "./template.html?raw";

let M = {
  products: [],
  categories: [],
  selectedCategory: null,
  categoryName: "Le catalogue de produits",
  totalProducts: 0,
};
//filter products by category
// M.filterProducts = function (categoryId) {
//   if (categoryId === null || categoryId === undefined || categoryId === "all") {
//     return M.Products;
//   } else {
//     return M.Products.filter((p) => p.category == categoryId);
//   }
// };

//get category by id
M.getCategoryById = function (id) {
  return M.categories.find((category) => category.id == id);
};

let C = {};

C.handler_clickOnProduct = function (ev) {
  const buyBtn = ev.target.closest("[data-buy]");
  if (!buyBtn) return;
  alert(`Le produit d'identifiant ${buyBtn.dataset.buy} ? Excellent choix !`);
};

C.updateProductsForCategory = async function (root, categoryId) {
  if (categoryId) {
    M.selectedCategory = categoryId;
    M.categoryName = CategoryData.findNameOfCategory(categoryId);
  } else {
    M.selectedCategory = null;
  }
  if (M.selectedCategory) {
    M.products = await ProductData.parCategory(M.selectedCategory);
  } else {
    M.products = await ProductData.fetchAll();
  }
  M.totalProducts = M.products.length;

  let category = null;

  if (M.selectedCategory) {
    for (const c of M.categories) {
      if (String(c.id) === String(M.selectedCategory)) {
        category = c;
        break;
      }
    }
  }
  M.categoryName = category ? category.name : "Le catalogue de produits";

  const host = root.querySelector("[data-products-host]");
  if (host) {
    const productsDOM = ProductView.dom(M.products);
    host.replaceChildren(productsDOM);

    const nombreEl = root.querySelector("[data-nombre]");
    if (nombreEl) nombreEl.textContent = M.products.length;

    const categoryNameEl = root.querySelector("[data-category-name]");
    if (categoryNameEl) {
      categoryNameEl.textContent = M.categoryName;
    }
  }
};
C.onLabelClick = async function (ev) {
  const label = ev.target.closest("label");
  if (!label) return;

  const root = ev.currentTarget;

  const inputId = label.getAttribute("for");
  const input = root.querySelector(`#${inputId}`);
  if (!input) return;
  await C.updateProductsForCategory(root, input.value);
};

C.init = async function (params) {
  let categoryId = params.id;
  M.selectedCategory = categoryId;

  M.categories = await CategoryData.fetchAll();

  if (M.selectedCategory) {
    M.products = await ProductData.parCategory(M.selectedCategory);
  } else {
    M.products = await ProductData.fetchAll();
  }
  M.totalProducts = M.products.length;

  if (M.selectedCategory) {
    const category = M.categories.find(
      (c) => String(c.id) === String(M.selectedCategory)
    );
    M.categoryName = category ? category.name : "Le catalogue de produits";
  } else {
    M.categoryName = "Le catalogue de produits";
  }

  console.log("Category ID:", M.selectedCategory); // ← ПЕРЕВІРКА
  console.log("Category name:", M.categoryName); // ← ПЕРЕВІРКА

  return V.init(M.products, M.categories, M.selectedCategory, M.totalProducts);
};

let V = {};

V.init = function (
  products,
  categories,
  selectedCategoryId = null,
  totalProducts
) {
  let fragment = V.createPageFragment(
    products,
    categories,
    selectedCategoryId,
    totalProducts
  );
  V.attachEvents(fragment);
  return fragment;
};

V.createPageFragment = function (
  products,
  categories,
  selectedCategoryId,
  totalProducts
) {
  let html = template.replaceAll("{{categoryName}}", M.categoryName);
  console.log(M.categoryName);
  let pageFragment = htmlToFragment(html);

  let categoriesDOM = CategoryView.dom(categories);
  let catSlot = pageFragment.querySelector('slot[name="categories"]');
  if (catSlot) {
    catSlot.replaceWith(categoriesDOM);
  }

  let productsDOM = ProductView.dom(products);
  let host = document.createElement("div");
  host.setAttribute("data-products-host", "");
  host.appendChild(productsDOM);

  let prodSlot = pageFragment.querySelector('slot[name="products"]');
  if (prodSlot) {
    prodSlot.replaceWith(host);
  }
  let nombreElement = pageFragment.querySelector("[data-nombre]");
  if (nombreElement) {
    nombreElement.textContent = products.length;
  }

  return pageFragment;
};

V.attachEvents = function (pageFragment) {
  const root = pageFragment.firstElementChild;
  root.addEventListener("click", C.handler_clickOnProduct);
  root.addEventListener("click", C.onLabelClick);
  return pageFragment;
};

export function ProductsPage(params) {
  console.log("ProductsPage params:", params);
  return C.init(params);
}
