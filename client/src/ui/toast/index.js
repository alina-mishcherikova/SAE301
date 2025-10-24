import { genericRenderer, htmlToFragment } from "../../lib/utils.js";
import template from "./template.html?raw";

let ToastView = {
  /**
   * Show a toast notification
   * @param {string} message - Main message
   * @param {string} subtitle - Optional subtitle (e.g., product name)
   * @param {number} duration - Duration in milliseconds (default: 3000)
   */
  show: function (
    message = "Produit ajouté au panier",
    subtitle = "",
    duration = 3000
  ) {
    // Remove any existing toast
    const existingToast = document.querySelector("[data-toast]");
    if (existingToast) {
      existingToast.remove();
    }

    // Create new toast
    const data = {
      name: subtitle,
    };

    const html = genericRenderer(template, data);
    const fragment = htmlToFragment(html);
    const toastEl = fragment.querySelector("[data-toast]");

    if (!toastEl) return;

    // Update message if custom message provided
    if (message !== "Produit ajouté au panier") {
      const messageEl = toastEl.querySelector("p.font-semibold");
      if (messageEl) messageEl.textContent = message;
    }

    // Append to body
    document.body.appendChild(toastEl);

    // Animate in
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        toastEl.style.transform = "translateY(0)";
        toastEl.style.opacity = "1";
      });
    });

    // Close button handler
    const closeBtn = toastEl.querySelector("[data-toast-close]");
    const closeToast = () => {
      toastEl.style.transform = "translateY(100px)";
      toastEl.style.opacity = "0";
      setTimeout(() => toastEl.remove(), 300);
    };

    if (closeBtn) {
      closeBtn.addEventListener("click", closeToast);
    }

    // Auto-hide after duration
    if (duration > 0) {
      setTimeout(closeToast, duration);
    }
  },

  /**
   * Show success toast for added to cart
   */
  showAddedToCart: function (productName, duration = 3000) {
    this.show("Produit ajouté au panier", productName, duration);
  },
};

export { ToastView };
