import { genericRenderer, htmlToFragment } from "../../lib/utils.js";
import template from "./template.html?raw";
import { CartData } from "../../data/cart.js";
import { ToastView } from "../toast/index.js";

let DetailView = {
  html: function (data) {
    return genericRenderer(template, data);
  },

  dom: function (data) {
    const fragment = htmlToFragment(DetailView.html(data));

    // Show vinyl-specific info only if artist or label exists
    if (data.artist || data.label) {
      const infosupp = fragment.querySelector("#infosupp");
      if (infosupp) {
        infosupp.classList = "flex flex-col gap-2";
      }
    } else {
      // For other categories or if no vinyl data, remove the section
      const infosupp = fragment.querySelector("#infosupp");
      if (infosupp) {
        infosupp.remove();
      }
    }

    // Add "Add to cart" functionality
    const buyButton = fragment.querySelector("[data-buy]");
    if (buyButton && data) {
      buyButton.addEventListener("click", (e) => {
        e.preventDefault();

        CartData.add(data, 1);

        // Show toast notification
        ToastView.showAddedToCart(data.name || data.title || "Produit");

        // Visual feedback
        const originalText = buyButton.textContent;
        buyButton.textContent = "Ajouté au panier ✓";
        buyButton.style.opacity = "0.7";

        setTimeout(() => {
          buyButton.textContent = originalText;
          buyButton.style.opacity = "1";
        }, 1500);
      });
    }

    return fragment;
  },
};

export { DetailView };
