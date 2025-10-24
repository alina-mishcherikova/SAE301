import { Router } from "./lib/router.js";
import { AboutPage } from "./pages/about/page.js";
import { HomePage } from "./pages/home/page.js";
import { ProductsPage } from "./pages/products/page.js";
import { ProductDetailPage } from "./pages/productDetail/page.js";
import { ConnectionPage } from "./pages/createAccount/page.js";
import { LoginPage } from "./pages/login/page.js";
import { ProfilePage } from "./pages/profile/page.js";
import { CartPage } from "./pages/cart/page.js";

import { RootLayout } from "./layouts/root/layout.js";
import { The404Page } from "./pages/404/page.js";
import { UserData } from "./data/user.js";
import { CartData } from "./data/cart.js";

const router = new Router("app", { loginPath: "/login" });

async function updateAuthStatus() {
  const result = await UserData.status();
  if (result && result.authenticated) {
    router.setAuth(true);
  } else {
    router.setAuth(false);
  }
}

router.addLayout("/", RootLayout);

router.addRoute("/", HomePage);
router.addRoute("/about", AboutPage);

router.addRoute("/login", LoginPage, { useLayout: false });
router.addRoute("/connection", ConnectionPage, { useLayout: false });
router.addRoute("/profile", ProfilePage, { requireAuth: true });

router.addRoute("/products", ProductsPage);
router.addRoute("/category/:id/:name", ProductsPage);
router.addRoute("/products/:id/:slug", ProductDetailPage);

router.addRoute("/pannier", CartPage);

router.addRoute("*", The404Page);

async function initApp() {
  // Initialize cart from localStorage
  CartData.load();

  await updateAuthStatus();
  router.start();
}

initApp();
