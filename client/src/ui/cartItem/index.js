import { genericRenderer, htmlToFragment } from "../../lib/utils.js";
import template from "./template.html?raw";

let CartItemView = {
  html: function (data) {
    if (!data) return "";

    // Calculate subtotal for this item
    const subtotal = ((data.price || 0) * (data.qty || 0)).toFixed(2);

    // Prepare data with subtotal
    const itemData = {
      ...data,
      subtotal: subtotal,
    };

    return genericRenderer(template, itemData);
  },

  dom: function (data, handlers = {}) {
    const fragment = htmlToFragment(CartItemView.html(data));

    if (!data || !data.productId) return fragment;

    const productId = data.productId;

    // Attach event handlers
    const removeBtn = fragment.querySelector(`[data-remove="${productId}"]`);
    const decreaseBtn = fragment.querySelector(
      `[data-decrease="${productId}"]`
    );
    const increaseBtn = fragment.querySelector(
      `[data-increase="${productId}"]`
    );
    const quantityInput = fragment.querySelector(
      `[data-quantity="${productId}"]`
    );

    if (removeBtn && handlers.onRemove) {
      removeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        handlers.onRemove(productId);
      });
    }

    if (decreaseBtn && handlers.onDecrease) {
      decreaseBtn.addEventListener("click", (e) => {
        e.preventDefault();
        handlers.onDecrease(productId);
      });
    }

    if (increaseBtn && handlers.onIncrease) {
      increaseBtn.addEventListener("click", (e) => {
        e.preventDefault();
        handlers.onIncrease(productId);
      });
    }

    if (quantityInput && handlers.onQuantityChange) {
      quantityInput.addEventListener("change", (e) => {
        const newQty = parseInt(e.target.value, 10);
        if (!isNaN(newQty) && newQty > 0) {
          handlers.onQuantityChange(productId, newQty);
        }
      });
    }

    return fragment;
  },
};

export { CartItemView };
