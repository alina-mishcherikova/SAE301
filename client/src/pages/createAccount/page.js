import { FormSignUpView } from "../../ui/createAccount/index.js";
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
  const name = formData.get("name").trim();
  const surname = formData.get("surname").trim();
  const password = formData.get("password").trim();

  if (!email || !email.includes("@") || password.length < 8) {
    alert(
      "Veuillez entrer un email valide et un mot de passe (8 caractères minimum)."
    );
    return;
  }

  const data = {
    email: email,
    password: password,
    firstName: name,
    secondName: surname,
  };
  console.log("Données de connexion :", data);

  try {
    const response = await UserData.register(data);

    if (!response || response === false) {
      alert("Erreur lors de la création du compte. Vérifiez la console.");
      return;
    }

    if (response.error) {
      alert("Erreur: " + response.error);
    } else {
      console.log("Compte créé avec succès !", response);

      const loginResponse = await UserData.login({ email, password });

      if (loginResponse && loginResponse.success) {
        console.log("Connexion automatique réussie");

        if (C.router) {
          C.router.setAuth(true);
          C.router.navigate("/profile");
        } else {
          window.location.href = "/profile";
        }
      } else {
        alert("Compte créé ! Veuillez vous connecter.");
        if (C.router) {
          C.router.navigate("/profile");
        } else {
          window.location.href = "/profile";
        }
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
  let formDom = FormSignUpView.dom();
  pageFragment.querySelector("slot[name=form]").replaceWith(formDom);
  return pageFragment;
};

V.attachEvents = function (pageFragment) {
  let root = pageFragment.querySelector("#connectionForm");
  root.addEventListener("submit", C.handler_form);
  return pageFragment;
};

export function ConnectionPage(params, router) {
  return C.init(router);
}
