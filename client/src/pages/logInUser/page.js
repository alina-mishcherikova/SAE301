import { FormLoginView } from "../../ui/login/index.js";
import { htmlToFragment } from "../../lib/utils.js";
import { UserData } from "../../data/user.js";
import template from "./template.html?raw";

let M = {};
let C = {};

C.handler_form = async function (ev) {
  ev.preventDefault();
  ev.stopPropagation();

  let form = ev.target;
  let formData = new FormData(form);

  //Validation de base côté client
  const email = formData.get("email").trim().toLowerCase();
  const password = formData.get("password").trim();

  if (!email || !email.includes("@") || password.length < 8) {
    alert(
      "Veuillez entrer un email valide et un mot de passe (8 caractères minimum)."
    );
    return;
  }

  //Construction du corps de la requête à envoyer à l’API
  const data = {
    email: email,
    password: password,
  };
  console.log("Données de connexion :", data);

  try {
    const response = await UserData.login(data);
    if (!response || response === false) {
      alert("Erreur lors de la connexion. Vérifiez vos identifiants.");
      return;
    }
    if (response.error) {
      alert("Erreur: " + response.error);
    } else {
      console.log("Connexion réussie", response);

      localStorage.setItem("connectedUser", JSON.stringify(response));

      // Mettre à jour l'état d'authentification du router
      if (C.router) {
        C.router.setAuth(true);
        C.router.navigate("/profile");
      } else {
        console.error("Router is not available!");
      }
    }
  } catch (error) {
    console.error("Erreur de connexion :", error);
    alert("Erreur technique: " + error.message);
  }
};

C.init = function (router) {
  C.router = router;
  return V.init();
};

let V = {};
V.init = function () {
  let fragment = V.createPageFragment();
  V.attachEvents(fragment);
  return fragment;
};

V.createPageFragment = function () {
  let pageFragment = htmlToFragment(template);
  let formDom = FormLoginView.dom();
  pageFragment.querySelector("slot[name=form]").replaceWith(formDom);
  return pageFragment;
};

V.attachEvents = function (pageFragment) {
  let root = pageFragment.querySelector("#connectionForm");
  root.addEventListener("submit", C.handler_form);
  return pageFragment;
};

export function LoginPage(params, router) {
  return C.init(router);
}
