import { ProductData } from "../../data/product.js";
import { CategoryData } from "../../data/category.js";
import { htmlToFragment } from "../../lib/utils.js";
import { BreadcrumbView } from "../../ui/breadcrumb/index.js";
import { DetailView } from "../../ui/detail/index.js";
import { ImageGalleryView } from "../../ui/imageGallery/index.js";
import template from "./template.html?raw";

let M = {
  product: null,
  ImageGallery: [],
};

M.getProductById = function (id) {
  return M.product.find((product) => product.id == id);
};

let C = {};

C.init = async function (params) {
  // Récupérer l'ID depuis les paramètres de route
  let productId = params.id;
  // Charger le produit depuis l'API
  let product = await ProductData.fetch(productId);
  console.log(product);
  product.gallery.forEach(function (gallery) {
    M.ImageGallery.push(gallery);
  });

  let categoryName = await CategoryData.findNameOfCategory(product.category);

  categoryName = await CategoryData.findNameOfCategory(product.category);

  return V.init(product, categoryName);
};

let V = {};

V.init = function (product, categoryName) {
  let fragment = V.createPageFragment(product, categoryName);
  return fragment;
};

V.createPageFragment = function (product, categoryName) {
  let pageFragment = htmlToFragment(template);

  let breadcrumbData = {
    categoryName: categoryName,
    name: product.name,
  };

  let breadcrumbDOM = BreadcrumbView.dom(breadcrumbData);
  let detailDOM = DetailView.dom(product);
  let galleryDOM = ImageGalleryView.dom(M.ImageGallery);

  // Remplacer les slots
  pageFragment
    .querySelector('slot[name="breadcrumb"]')
    .replaceWith(breadcrumbDOM);
  pageFragment.querySelector('slot[name="gallery"]').replaceWith(galleryDOM);
  pageFragment.querySelector('slot[name="detail"]').replaceWith(detailDOM);

  return pageFragment;
};

export function ProductDetailPage(params) {
  return C.init(params);
}
