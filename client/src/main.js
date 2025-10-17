import { Router } from "./lib/router.js";
import { AboutPage } from "./pages/about/page.js";
import { HomePage } from "./pages/home/page.js";
import { ProductsPage } from "./pages/products/page.js";
import { ProductDetailPage } from "./pages/productDetail/page.js";
import { CategoryData } from "./data/category.js";

import { RootLayout } from "./layouts/root/layout.js";
import { The404Page } from "./pages/404/page.js";

// Exemple d'utilisation avec authentification
window.__categories = await CategoryData.fetchAll();
const router = new Router("app");

await router.addLayout("/", RootLayout);

router.addRoute("/", HomePage);
router.addRoute("/about", AboutPage);

router.addRoute("/products", ProductsPage);
router.addRoute("/category/:id", ProductsPage);
router.addRoute("/products/:id/:slug", ProductDetailPage);

router.addRoute("*", The404Page);

// Démarrer le routeur
router.start();
