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
};
M.getCategoryById = function (id) {
  return M.categories.find((category) => category.id == id);
};
let C = {};

C.handler_clickOnProduct = function (ev) {
  const buyBtn = ev.target.closest("[data-buy]");
  if (!buyBtn) return;
  alert(`Le produit d'identifiant ${buyBtn.dataset.buy} ? Excellent choix !`);
};

C.updateProductsForCategory = async function (
  root,
  categoryId,
  nomberOfProducts
) {
  if (categoryId) {
    M.selectedCategory = categoryId;
  } else {
    M.selectedCategory = null;
  }

  if (M.selectedCategory) {
    M.products = await ProductData.parCategory(M.selectedCategory);
    nomberOfProducts = M.products.length;
  } else {
    M.products = await ProductData.fetchAll();
    nomberOfProducts = M.products.length;
  }

  const host = root.querySelector("[data-products-host]");
  if (host) {
    const productsDOM = ProductView.dom(M.products);
    host.replaceChildren(productsDOM);
  }

  const nombreElement = root.querySelector("[data-nombre]");
  if (nombreElement) {
    nombreElement.textContent = nomberOfProducts;
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

C.onRenitialiseClick = async function (ev) {
  const btn = ev.target.closest("[data-reset-filters]");
  if (!btn) return;

  const root = ev.currentTarget;

  M.selectedCategory = null;

  M.products = await ProductData.fetchAll();
  const host = root.querySelector("[data-products-host]");
  if (host) {
    const productsDOM = ProductView.dom(M.products);
    host.replaceChildren(productsDOM);
  }
  const nombreElement = root.querySelector("[data-nombre]");
  if (nombreElement) {
    nombreElement.textContent = M.products.length;
  }
};

C.init = async function (params) {
  const categoryId = params.id;
  M.selectedCategory = categoryId;

  M.categories = await CategoryData.fetchAll();

  if (M.selectedCategory) {
    M.products = await ProductData.parCategory(M.selectedCategory);
  } else {
    M.products = await ProductData.fetchAll();
  }
  if (categoryId) {
    const p = M.getCategoryById(categoryId);
  }
  return V.init(M.products, M.categories);
};

let V = {};

V.init = function (products, categories) {
  const fragment = V.createPageFragment(products, categories);
  V.attachEvents(fragment);
  return fragment;
};

V.createPageFragment = function (products, categories) {
  const pageFragment = htmlToFragment(template);

  const categoriesDOM = CategoryView.dom(categories);
  const catSlot = pageFragment.querySelector('slot[name="categories"]');
  if (catSlot) {
    catSlot.replaceWith(categoriesDOM);
  }

  const productsDOM = ProductView.dom(products);
  const host = document.createElement("div");
  host.setAttribute("data-products-host", "");
  host.appendChild(productsDOM);

  const prodSlot = pageFragment.querySelector('slot[name="products"]');
  if (prodSlot) {
    prodSlot.replaceWith(host);
  }
  const nombreElement = pageFragment.querySelector("[data-nombre]");
  if (nombreElement) {
    nombreElement.textContent = products.length;
  }

  return pageFragment;
};

V.attachEvents = function (pageFragment) {
  const root = pageFragment.firstElementChild;
  root.addEventListener("click", C.handler_clickOnProduct);
  root.addEventListener("click", C.onLabelClick);
  root.addEventListener("click", C.onRenitialiseClick);
  return pageFragment;
};

export function ProductsPage(params) {
  console.log("ProductsPage params:", params);
  return C.init(params);
}
