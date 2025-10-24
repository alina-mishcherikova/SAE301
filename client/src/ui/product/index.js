import { genericRenderer, htmlToFragment } from "../../lib/utils.js";
import template from "./template.html?raw";
import { CartData } from "../../data/cart.js";
import { ToastView } from "../toast/index.js";

let ProductView = {
  html: function (data) {
    const list = Array.isArray(data)
      ? data
      : data && typeof data === "object"
        ? [data]
        : [];

    let htmlString =
      '<div class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">';
    for (let obj of list) {
      htmlString += genericRenderer(template, obj);
    }
    return htmlString + "</div>";
  },

  dom: function (data) {
    const fragment = htmlToFragment(ProductView.html(data));

    // Attach "Add to cart" handlers
    const addToCartButtons = fragment.querySelectorAll("[data-add-to-cart]");

    addToCartButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        const productId = button.getAttribute("data-add-to-cart");

        // Find the product data
        const list = Array.isArray(data) ? data : [data];
        const product = list.find((p) => String(p.id) === String(productId));

        if (product) {
          CartData.add(product, 1);

          // Show toast notification
          ToastView.showAddedToCart(product.name || product.title || "Produit");

          // Visual feedback on button (optional, since we have toast now)
          const originalText = button.textContent;
          button.textContent = "Ajouté ✓";
          button.classList.add("bg-accent-hover");

          setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove("bg-accent-hover");
          }, 1000);
        }
      });
    });

    return fragment;
  },
};

export { ProductView };
