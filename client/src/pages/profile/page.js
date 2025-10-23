import { htmlToFragment } from "../../lib/utils.js";
import { ProfileView } from "../../ui/profile/index.js";
import { UserData } from "../../data/user.js";
import template from "./template.html?raw";

let M = {};
let C = {};

C.handler_clickOnDisconnect = async function (ev) {
  const disconnectBtn = ev.target.closest("[data-disconnect]");
  if (!disconnectBtn) return;

  try {
    const response = await UserData.logout();
    if (response && response.success) {
      console.log("Déconnexion réussie");
    } else {
      console.warn("Erreur lors de la déconnexion", response);
    }
  } catch (error) {
    console.error("Erreur de déconnexion:", error);
  }

  if (C.router) {
    C.router.setAuth(false);
    C.router.navigate("/");
  } else {
    window.location.href = "/";
  }
};

C.init = async function (params, router) {
  // C.router = router;
  // try {
  //   // GET /auth/login -> { authenticated: boolean, user?: {...} }
  //   const status = await UserData.status();
  //   console.log("[profile] status =", status);
  //   if (status && status.authenticated === true && status.user) {
  //     if (C.router) C.router.setAuth(true);
  //     return V.init(status.user);
  //   } else {
  //     if (C.router) {
  //       C.router.setAuth(false);
  //       C.router.navigate("/login");
  //     }
  //     return V.init(null);
  //   }
  // } catch (e) {
  //   console.error("[profile] init failed", e);
  //   if (C.router) {
  //     C.router.setAuth(false);
  //     C.router.navigate("/login");
  //   }
  //   return V.init(null);
  // }
};

let V = {};

V.init = function (data) {
  console.log("[V.init] Called with data:", data);
  const fragment = V.createPageFragment(data);
  console.log("[V.init] createPageFragment returned:", fragment);
  V.attachEvents(fragment, !!data);
  console.log("[V.init] Returning fragment");
  return fragment;
};

V.createPageFragment = function (data) {
  console.log("[V.createPageFragment] Called with data:", data);
  const pageFragment = htmlToFragment(template);
  console.log("[V.createPageFragment] pageFragment:", pageFragment);

  if (!data) {
    console.warn(
      "[V.createPageFragment] No data provided, returning empty fragment"
    );
    return pageFragment;
  }

  const profileDOM = ProfileView.dom(data);
  console.log("[V.createPageFragment] ProfileView.dom returned:", profileDOM);

  const slot = pageFragment.querySelector('slot[name="profile"]');
  console.log("[V.createPageFragment] Found slot:", slot);

  if (slot) {
    slot.replaceWith(profileDOM);
    console.log("[V.createPageFragment] Slot replaced with profileDOM");
  } else {
    pageFragment.appendChild(profileDOM);
    console.log("[V.createPageFragment] No slot found, appended profileDOM");
  }
  return pageFragment;
};

V.attachEvents = function (pageFragment, hasData) {
  const root =
    pageFragment && pageFragment.firstElementChild
      ? pageFragment.firstElementChild
      : pageFragment;

  if (root && hasData) {
    root.addEventListener("click", C.handler_clickOnDisconnect);
  }
  return pageFragment;
};

export async function ProfilePage() {
  console.log("[ProfilePage] START");
  const result = await UserData.status();
  console.log("[ProfilePage] UserData.status result:", result);
  console.log("[ProfilePage] result type:", typeof result);
  console.log("[ProfilePage] result.authenticated:", result?.authenticated);
  console.log("[ProfilePage] result.user:", result?.user);

  // debugger;

  if (!result || !result.authenticated) {
    console.warn(
      "[ProfilePage] REDIRECT to /login because:",
      !result ? "no result" : "not authenticated"
    );
    // Temporairement remplacé par alert pour voir les logs
    alert(
      "Not authenticated! Check console (F12) - result: " +
        JSON.stringify(result)
    );
    // window.location.href = "/login";
    return document.createDocumentFragment();
  }

  console.log("[ProfilePage] Calling V.init with user:", result.user);
  const fragment = V.init(result.user);
  console.log("[ProfilePage] V.init returned:", fragment);
  return fragment;
}
