import { Router } from "./lib/router.js";
import { AboutPage } from "./pages/about/page.js";
import { HomePage } from "./pages/home/page.js";
import { ProductsPage } from "./pages/products/page.js";
import { ProductDetailPage } from "./pages/productDetail/page.js";
import { ConnectionPage } from "./pages/createAccount/page.js";
import { LoginPage } from "./pages/logInUser/page.js";
import { ProfilePage } from "./pages/profile/page.js";

import { RootLayout } from "./layouts/root/layout.js";
import { The404Page } from "./pages/404/page.js";

const router = new Router("app", { loginPath: "/login" });

router.setAuth(true); // Utilisateur connecté
router.setAuth(false); // Utilisateur non connecté

router.addLayout("/", RootLayout);

router.addRoute("/", HomePage);
router.addRoute("/about", AboutPage);

router.addRoute("/login", LoginPage, { useLayout: false });
router.addRoute("/connection", ConnectionPage, { useLayout: false });
router.addRoute("/profile", ProfilePage, { requireAuth: true });

router.addRoute("/products", ProductsPage);
router.addRoute("/category/:id/:name", ProductsPage);
router.addRoute("/products/:id/:slug", ProductDetailPage);

router.addRoute("*", The404Page);

// Démarrer le routeur
router.start();
