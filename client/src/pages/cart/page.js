import { CartData } from "../../data/cart.js";
import { CartItemView } from "../../ui/cartItem/index.js";
import { htmlToFragment } from "../../lib/utils.js";
import template from "./template.html?raw";

let M = {
  items: [],
  total: 0,
};

let C = {};

C.init = function () {
  M.items = CartData.getItems();
  M.total = CartData.getTotal();
  return V.init();
};

C.handleRemove = function (productId) {
  CartData.remove(productId);
  C.refresh();
};

C.handleIncrease = function (productId) {
  CartData.increase(productId);
  C.refresh();
};

C.handleDecrease = function (productId) {
  CartData.decrease(productId);
  C.refresh();
};

C.handleQuantityChange = function (productId, newQty) {
  CartData.updateQuantity(productId, newQty);
  C.refresh();
};

C.handleClearCart = function () {
  if (confirm("Êtes-vous sûr de vouloir vider votre panier ?")) {
    CartData.clear();
    C.refresh();
  }
};

C.handleCheckout = function () {
  alert("Fonctionnalité de commande à venir !");
};

C.refresh = function () {
  M.items = CartData.getItems();
  M.total = CartData.getTotal();

  const root = document.querySelector("section");
  if (!root) return;

  V.updateCartItems(root);
  V.updateSummary(root);
  V.updateVisibility(root);
};

let V = {};

V.init = function () {
  const fragment = htmlToFragment(template);
  V.updateCartItems(fragment);
  V.updateSummary(fragment);
  V.updateVisibility(fragment);
  V.attachEvents(fragment);
  return fragment;
};

V.updateCartItems = function (root) {
  const cartItemsContainer = root.querySelector("[data-cart-items]");
  if (!cartItemsContainer) return;

  cartItemsContainer.innerHTML = "";

  M.items.forEach((item) => {
    const itemFragment = CartItemView.dom(item, {
      onRemove: C.handleRemove,
      onIncrease: C.handleIncrease,
      onDecrease: C.handleDecrease,
      onQuantityChange: C.handleQuantityChange,
    });
    cartItemsContainer.appendChild(itemFragment);
  });
};

V.updateSummary = function (root) {
  const subtotal = M.total.toFixed(2);
  const total = M.total.toFixed(2);

  const subtotalEls = root.querySelectorAll("[data-subtotal]");
  subtotalEls.forEach((el) => (el.textContent = `€${subtotal}`));

  const totalEls = root.querySelectorAll("[data-total]");
  totalEls.forEach((el) => (el.textContent = `€${total}`));

  const cartCountEl = root.querySelector("[data-cart-count]");
  if (cartCountEl) cartCountEl.textContent = String(M.items.length);
};

V.updateVisibility = function (root) {
  const isEmpty = M.items.length === 0;

  const emptyMessage = root.querySelector("[data-empty-message]");
  const cartItems = root.querySelector("[data-cart-items]");
  const summary = root.querySelector("[data-summary]");
  const mobileSummary = root.querySelector("[data-mobile-summary]");

  if (isEmpty) {
    if (emptyMessage) {
      emptyMessage.classList.remove("hidden");
      emptyMessage.classList.add("flex");
    }
    if (cartItems) cartItems.style.display = "none";
    if (summary) summary.style.display = "none";
    if (mobileSummary) mobileSummary.style.display = "none";
  } else {
    if (emptyMessage) {
      emptyMessage.classList.add("hidden");
      emptyMessage.classList.remove("flex");
    }
    if (cartItems) cartItems.style.display = "flex";
    if (summary) summary.style.display = "block";
    if (mobileSummary) mobileSummary.style.display = "block";
  }
};

V.attachEvents = function (fragment) {
  const clearCartBtn = fragment.querySelector("[data-clear-cart]");
  const clearCartMobileBtn = fragment.querySelector("[data-clear-cart-mobile]");

  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", C.handleClearCart);
  }
  if (clearCartMobileBtn) {
    clearCartMobileBtn.addEventListener("click", C.handleClearCart);
  }

  const checkoutBtn = fragment.querySelector("[data-checkout]");
  const checkoutMobileBtn = fragment.querySelector("[data-checkout-mobile]");

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", C.handleCheckout);
  }
  if (checkoutMobileBtn) {
    checkoutMobileBtn.addEventListener("click", C.handleCheckout);
  }

  return fragment;
};

export async function CartPage() {
  return C.init();
}
