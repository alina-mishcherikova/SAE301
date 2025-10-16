import { ProductData } from "../../data/product.js";
import { CategoryData } from "../../data/category.js";
import { ProductView } from "../../ui/product/index.js";
import { CategoryView } from "../../ui/category/index.js";
import { htmlToFragment } from "../../lib/utils.js";
import template from "./template.html?raw";
let categoryName;
let M = {
  products: [],
  categories: [],
  selectedCategory: null,
};

let C = {};

C.handler_clickOnProduct = function (ev) {
  if (ev.target.dataset.buy !== undefined) {
    let id = ev.target.dataset.buy;
    alert(`Le produit d'identifiant ${id} ? Excellent choix !`);
  }
};

C.init = async function (categoryName) {
  M.selectedCategory = categoryName;

  M.categories = await CategoryData.fetchAll();
  M.products = await ProductData.fetchAll();

  return V.init(M.products, M.categories, M.selectedCategory);
};

C.handler_ClickOnLabel = async function (ev) {
  if (ev.target.tagName === "LABEL") {
    const label = ev.target;
    const id = label.dataset.id || label.querySelector("input")?.dataset.id;
    M.selectedCategory = id;

    const inputs = ev.currentTarget.querySelectorAll(
      "input[type='radio'], input[type='checkbox']"
    );
    inputs.forEach((input) => {
      input.checked = false;
    });

    const input = label.querySelector("input");
    if (input) {
      input.checked = true;
    }

    M.products = await ProductData.parCategory(id);
    console.log(M.products);

    const newFragment = V.createPageFragment(
      M.products,
      M.categories,
      M.selectedCategory
    );
    const newRoot = newFragment.firstElementChild;
    const currentRoot = ev.currentTarget;
    currentRoot.replaceWith(newRoot);

    V.attachEvents(newFragment);
  }
};

let V = {};

V.init = function (products, categories, selectedCategory) {
  let fragment = V.createPageFragment(products, categories, selectedCategory);
  V.attachEvents(fragment);
  return fragment;
};

V.createPageFragment = function (products, categories, selectedCategory) {
  let pageFragment = htmlToFragment(template);

  let productsDOM = ProductView.dom(products);
  let categoriesDOM = CategoryView.dom(categories);

  const prodSlot = pageFragment.querySelector('slot[name="products"]');
  const catSlot = pageFragment.querySelector('slot[name="categories"]');

  if (!prodSlot) {
    console.error("Products slot not found in template");
  } else {
    prodSlot.replaceWith(productsDOM);
  }

  if (!catSlot) {
    console.error("Categories slot not found in template");
  } else {
    catSlot.replaceWith(categoriesDOM);
  }

  return pageFragment;
};

V.attachEvents = function (pageFragment) {
  let root = pageFragment.firstElementChild;
  root.addEventListener("click", C.handler_clickOnProduct);
  root.addEventListener("click", C.handler_ClickOnLabel);
  return pageFragment;
};

export function ProductsPage(params) {
  console.log("ProductsPage", params);
  return C.init(params);
}
