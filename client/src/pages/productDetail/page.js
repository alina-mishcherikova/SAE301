import { ProductData } from "../../data/product.js";
import { htmlToFragment } from "../../lib/utils.js";
import { DetailView } from "../../ui/detail/index.js";
import { DetailView as DetailVinyleView } from "../../ui/detailVinyle/index.js";
import template from "./template.html?raw";

let M = {
  products: [],
};

M.getProductById = function (id) {
  return M.products.find((product) => product.id == id);
};

let C = {};

C.handler_clickOnProduct = function (ev) {
  if (ev.target.dataset.buy !== undefined) {
    let id = ev.target.dataset.buy;
    alert(`Produit ajouté au panier ! (Quand il y en aura un)`);
  }
};

C.init = async function (params) {
  const productId = params.id;

  const product = await ProductData.fetch(productId);
  console.log("Product loaded:", product);
  console.log("Gallery:", product?.gallery);

  return V.init(product);
};

let V = {};

V.init = function (data) {
  let fragment = V.createPageFragment(data);
  V.attachEvents(fragment);
  return fragment;
};

V.createPageFragment = function (data) {
  // Créer le fragment depuis le template
  let pageFragment = htmlToFragment(template);

  console.log("Product data in createPageFragment:", data);

  // Choisir le composant selon la catégorie du produit
  let detailDOM;
  if (data && (data.category == 1 || data.interprete)) {
    detailDOM = DetailVinyleView.dom(data);
  } else {
    detailDOM = DetailView.dom(data);
  }

  // Remplacer le slot par le composant detail
  pageFragment.querySelector('slot[name="detail"]').replaceWith(detailDOM);

  return pageFragment;
};

V.attachEvents = function (pageFragment) {
  // Attacher un event listener au bouton
  const addToCartBtn = pageFragment.querySelector("[data-buy]");
  addToCartBtn.addEventListener("click", C.handler_clickOnProduct);
  return pageFragment;
};

export function ProductDetailPage(params) {
  console.log("ProductDetailPage", params);
  return C.init(params);
}
