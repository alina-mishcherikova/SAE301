import { genericRenderer, htmlToFragment } from "../../lib/utils.js";
import template from "./template.html?raw";
import { CartData } from "../../data/cart.js";

let HeaderView = {
  html: function (data) {
    return genericRenderer(template, data || {});
  },

  dom: function (data) {
    const html = this.html(data);
    const fragment = htmlToFragment(html);

    const burgerBtn = fragment.querySelector("#\\#burgerMenu");
    const navigation = fragment.querySelector("ul[data-category-menu]");

    if (burgerBtn && navigation) {
      burgerBtn.addEventListener("click", () => {
        navigation.classList.toggle("hidden");
        navigation.classList.toggle("flex");
        navigation.classList.toggle("flex-col");
        navigation.classList.toggle("gap-4");
        navigation.classList.toggle("items-start");
        navigation.classList.toggle("w-full");
      });
    }

    // Cart counter functionality
    const cartCountEl = fragment.querySelector("[data-cart-count]");

    function updateCartCount() {
      if (!cartCountEl) return;
      const count = CartData.getCount();

      if (count > 0) {
        cartCountEl.textContent = String(count);
        cartCountEl.style.display = "flex";
      } else {
        cartCountEl.style.display = "none";
      }
    }

    // Initial update
    updateCartCount();

    // Listen to cart changes
    window.addEventListener("cart:changed", updateCartCount);

    return fragment;
  },
};

export { HeaderView };
