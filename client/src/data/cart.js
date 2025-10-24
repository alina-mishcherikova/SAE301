/**
 * CartData
 *
 * Gère le panier d'achat côté client
 * Sauvegarde dans localStorage pour persistance entre les sessions
 */

const STORAGE_KEY = "SAE301_cart";

const CartData = {
  items: [], // { productId, name, price, qty, image, ...meta }

  /**
   * Charge le panier depuis localStorage
   */
  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      this.items = raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error("Cart load failed:", e);
      this.items = [];
    }
    this.notifyChange();
    return this.items;
  },

  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
    } catch (e) {
      console.error("Cart save failed:", e);
    }
    this.notifyChange();
  },

  notifyChange() {
    // Build a small, explicit detail object first so the code is easier to read
    // and send a copy of items to avoid accidental external mutation.
    const detail = {
      count: this.getCount(),
      total: this.getTotal(),
      items: this.getItems(), // shallow copy
    };

    const event = new CustomEvent("cart:changed", { detail });

    window.dispatchEvent(event);
  },

  /**
   * Vide complètement le panier
   */
  clear() {
    this.items = [];
    this.save();
  },

  /**
   * Retourne une copie des items du panier
   */
  getItems() {
    return this.items.slice();
  },

  /**
   * Retourne le nombre total d'articles dans le panier
   */
  getCount() {
    return this.items.reduce((sum, item) => sum + (item.qty || 0), 0);
  },

  /**
   * Retourne le prix total du panier
   */
  getTotal() {
    return this.items.reduce(
      (sum, item) => sum + Number(item.price || 0) * (item.qty || 0),
      0
    );
  },

  /**
   * Trouve un item dans le panier par son productId
   */
  find(productId) {
    return this.items.find(
      (item) => String(item.productId) === String(productId)
    );
  },

  /**
   * Ajoute un produit au panier
   * Si le produit existe déjà, augmente la quantité
   */
  add(product, qty = 1) {
    if (!product || (!product.id && !product.productId)) {
      console.error("Invalid product", product);
      return;
    }

    const productId = product.id || product.productId;
    const existing = this.find(productId);

    if (existing) {
      existing.qty = (existing.qty || 0) + qty;
    } else {
      this.items.push({
        productId: productId,
        name: product.name || product.title || product.label || "",
        price: Number(product.price || product.unitPrice || 0),
        qty: qty,
        image: product.image || "",
        meta: { ...product }, // Store original product data
      });
    }

    this.save();
  },

  /**
   * Met à jour la quantité d'un produit
   * Si qty <= 0, supprime le produit
   */
  updateQuantity(productId, qty) {
    const item = this.find(productId);
    if (!item) return;

    const newQty = Number(qty);
    if (newQty <= 0) {
      this.remove(productId);
    } else {
      item.qty = newQty;
      this.save();
    }
  },

  /**
   * Augmente la quantité d'un produit de 1
   */
  increase(productId) {
    const item = this.find(productId);
    if (item) {
      item.qty = (item.qty || 0) + 1;
      this.save();
    }
  },

  /**
   * Diminue la quantité d'un produit de 1
   * Si la quantité devient 0, supprime le produit
   */
  decrease(productId) {
    const item = this.find(productId);
    if (item) {
      item.qty = Math.max(0, (item.qty || 0) - 1);
      if (item.qty === 0) {
        this.remove(productId);
      } else {
        this.save();
      }
    }
  },

  /**
   * Supprime un produit du panier
   */
  remove(productId) {
    this.items = this.items.filter(
      (item) => String(item.productId) !== String(productId)
    );
    this.save();
  },
};

export { CartData };
