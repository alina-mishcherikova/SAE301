import { htmlToFragment } from "../../lib/utils.js";
import { ProfileView } from "../../ui/profile/index.js";
import template from "./template.html?raw";

let M = {};

let C = {};

C.handler_clickOnDisconnect = function (ev) {
  let disconnectBtn = ev.target.closest("[data-disconnect]");
  console.log("Disconnect button clicked:", disconnectBtn);
  localStorage.removeItem("connectedUser");
  if (C.router) {
    C.router.setAuth(false);
    C.router.navigate("/");
  }
};
C.init = async function (params, router) {
  // Récupérer les données utilisateur du localStorage
  C.router = router;
  const userData = localStorage.getItem("connectedUser");
  const data = userData ? JSON.parse(userData) : null;

  if (!data) {
    console.error("Aucun utilisateur connecté trouvé");
    return V.init(null);
  }

  return V.init(data);
};

let V = {};

V.init = function (data) {
  let fragment = V.createPageFragment(data);
  V.attachEvents(fragment);
  return fragment;
};

V.createPageFragment = function (data) {
  let pageFragment = htmlToFragment(template);
  let profileDOM = ProfileView.dom(data);

  // Remplacer le slot
  pageFragment.querySelector('slot[name="profile"]').replaceWith(profileDOM);
  return pageFragment;
};

V.attachEvents = function (pageFragment) {
  const root = pageFragment.firstElementChild;
  root.addEventListener("click", C.handler_clickOnDisconnect);
  return pageFragment;
};

export function ProfilePage(params, router) {
  return C.init(params, router);
}
