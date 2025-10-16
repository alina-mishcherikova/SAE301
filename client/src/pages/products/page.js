// client/src/pages/products/page.js
import { ProductData } from "../../data/product.js";
import { CategoryData } from "../../data/category.js";
import { ProductView } from "../../ui/product/index.js";
import { CategoryView } from "../../ui/category/index.js";
import { htmlToFragment } from "../../lib/utils.js";
import template from "./template.html?raw";

// ===== Model =====
let M = {
  products: [],
  categories: [],
  selectedCategory: null, // number|null
};

// ===== Controller =====
let C = {};

// Клік по кнопці "купити"
C.handler_clickOnProduct = function (ev) {
  const buyBtn = ev.target.closest("[data-buy]");
  if (!buyBtn) return;
  alert(`Le produit d'identifiant ${buyBtn.dataset.buy} ? Excellent choix !`);
};

// Нормалізація відповіді у масив
C.asArray = (data) =>
  Array.isArray(data) ? data : data && typeof data === "object" ? [data] : [];

// Оновлення лише блоку товарів + оновлення URL
C.updateProductsForCategory = async function (root, categoryId) {
  // 1) нормалізуємо і запам’ятовуємо вибір
  const id =
    categoryId != null && categoryId !== "" ? parseInt(categoryId, 10) : null;
  M.selectedCategory = Number.isFinite(id) ? id : null;

  // 2) тягнемо дані
  M.products = M.selectedCategory
    ? await ProductData.parCategory(M.selectedCategory)
    : await ProductData.fetchAll();

  M.products = C.asArray(M.products);

  // 3) точково перемальовуємо список продуктів
  const host = root.querySelector("[data-products-host]");
  if (host) {
    const productsDOM = ProductView.dom(M.products);
    host.replaceChildren(productsDOM);
  }

  // 4) підправляємо URL (щоб було /products?category=ID або /products)
  const url = new URL(window.location.href);
  if (M.selectedCategory)
    url.searchParams.set("category", String(M.selectedCategory));
  else url.searchParams.delete("category");
  window.history.replaceState({}, "", `${url.pathname}${url.search}`);
};

// Зміна radio (клік прямо на кружечок)
C.onCategoryChange = async function (ev) {
  const input = ev.target;
  if (!input.matches("input[type='radio'][name='category']")) return;
  const root = ev.currentTarget;
  await C.updateProductsForCategory(root, input.value ?? null);
};

// Клік по label (працює по вкладених елементах)
C.onLabelClick = async function (ev) {
  const label = ev.target.closest("label[for], label[data-id]");
  if (!label) return;

  const root = ev.currentTarget;
  let input = null;

  if (label.hasAttribute("for")) {
    input = root.querySelector(`#${CSS.escape(label.getAttribute("for"))}`);
  } else if (label.dataset.id) {
    input =
      label.querySelector("input[name='category']") ||
      root.querySelector(
        `input[name='category'][value="${CSS.escape(label.dataset.id)}"]`
      );
  }
  if (!input) return;

  if (!input.checked) input.checked = true;
  await C.updateProductsForCategory(root, input.value ?? null);
};

// Початкове завантаження
C.init = async function (startCategory = null) {
  // якщо категорію не передали з роутера — читаємо з URL
  let initial = startCategory;
  if (initial == null) {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get("category");
    initial = fromUrl != null && fromUrl !== "" ? parseInt(fromUrl, 10) : null;
  }
  M.selectedCategory = Number.isFinite(initial) ? initial : null;

  // дані довідників
  M.categories = C.asArray(await CategoryData.fetchAll());

  // продукти (фільтровано або всі)
  M.products = M.selectedCategory
    ? await ProductData.parCategory(M.selectedCategory)
    : await ProductData.fetchAll();
  M.products = C.asArray(M.products);

  return V.init(M.products, M.categories, M.selectedCategory);
};

// ===== View =====
let V = {};

V.init = function (products, categories, selectedCategory) {
  const fragment = V.createPageFragment(products, categories, selectedCategory);
  V.attachEvents(fragment);
  return fragment;
};

V.createPageFragment = function (products, categories, selectedCategory) {
  const pageFragment = htmlToFragment(template);

  // Categories (передаємо selected для підсвітки peer-checked)
  const categoriesDOM = CategoryView.dom(categories, {
    selected: selectedCategory,
  });
  const catSlot = pageFragment.querySelector('slot[name="categories"]');
  if (catSlot) catSlot.replaceWith(categoriesDOM);

  // Products у контейнері data-products-host (для точкового оновлення)
  const productsDOM = ProductView.dom(products);
  const host = document.createElement("div");
  host.setAttribute("data-products-host", "");
  host.appendChild(productsDOM);

  const prodSlot = pageFragment.querySelector('slot[name="products"]');
  if (prodSlot) prodSlot.replaceWith(host);

  return pageFragment;
};

V.attachEvents = function (pageFragment) {
  const root = pageFragment.firstElementChild;
  root.addEventListener("click", C.handler_clickOnProduct);
  root.addEventListener("click", C.onLabelClick);
  root.addEventListener("change", C.onCategoryChange);
  return pageFragment;
};

// ===== Entry =====
export function ProductsPage(params) {
  const startCategory =
    params && typeof params === "object" && "category" in params
      ? params.category
      : null;
  return C.init(startCategory);
}
