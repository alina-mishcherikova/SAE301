import { htmlToFragment } from "../../lib/utils.js";
import { ProfileView } from "../../ui/profile/index.js";
import { ProfileInfoView } from "../../ui/profileInfo/index.js";
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

C.handler_clickOnProfileInfo = function (ev) {
  const profilInfoBtn = ev.target.closest("[data-profil-info]");
  if (!profilInfoBtn) return;

  console.log("Profile Info button clicked");

  // Find the profile-info slot in the page
  const mainContainer = ev.currentTarget;
  if (!mainContainer) {
    console.error("currentTarget is null");
    return;
  }

  const profileInfoSlot = mainContainer.querySelector(
    'slot[name="profile-info"]'
  );

  if (!profileInfoSlot) {
    console.error("profile-info slot not found");
    return;
  }

  // Check if form is already displayed
  const existingForm = mainContainer.querySelector("[data-profile-form]");
  if (existingForm) {
    existingForm.remove();
    return;
  }

  // Render ProfileInfo form
  const profileInfoDOM = ProfileInfoView.dom(M.userData);

  // Add a data attribute to track the form
  const formContainer =
    profileInfoDOM.querySelector("section") || profileInfoDOM;
  if (formContainer) {
    formContainer.setAttribute("data-profile-form", "");
  }

  // Attach submit handler to the form
  const form = profileInfoDOM.querySelector("#dataForm");
  if (form) {
    form.addEventListener("submit", C.handler_submitProfileForm);
  }

  // Replace slot with the form
  profileInfoSlot.replaceWith(profileInfoDOM);
};

C.handler_submitProfileForm = async function (ev) {
  ev.preventDefault();

  const form = ev.target;
  const formData = new FormData(form);

  const data = {
    firstName: formData.get("firstName"),
    secondName: formData.get("secondName"),
    email: formData.get("email"),
  };

  // Only include password if it's not empty
  const password = formData.get("password");
  if (password && password.trim() !== "") {
    data.password = password;
  }

  console.log("Updating user profile with data:", data);

  try {
    const userId = M.userData.id || M.userData.id_user;
    console.log("User ID:", userId);

    if (!userId) {
      console.error("No user ID found");
      alert("Erreur: ID utilisateur introuvable");
      return;
    }

    const result = await UserData.update(userId, data);

    if (result) {
      console.log("Profile updated successfully:", result);
      alert("Profil mis à jour avec succès!");

      M.userData = { ...M.userData, ...result };

      if (C.router) {
        C.router.navigate("/profile");
      }
    } else {
      console.error("Failed to update profile");
      alert("Erreur lors de la mise à jour du profil");
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    alert("Erreur lors de la mise à jour du profil");
  }
};

C.init = async function (params, router) {
  C.router = router;
  const data = await UserData.status();
  console.log("[C.init] UserData.status result:", data);
};

let V = {};

V.init = function (data) {
  console.log("[V.init] Called with data:", data);

  M.userData = data;

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

  const profileHeaderDOM = ProfileView.dom(data);
  const profileDOM = ProfileView.dom(data);

  const navigationSlot = pageFragment.querySelector(
    'slot[name="profile-navigation"]'
  );

  if (navigationSlot) {
    navigationSlot.replaceWith(profileDOM);
    console.log(
      "[V.createPageFragment] Navigation slot replaced with profileDOM"
    );
  }

  return pageFragment;
};

V.attachEvents = function (pageFragment, hasData) {
  const root =
    pageFragment && pageFragment.firstElementChild
      ? pageFragment.firstElementChild
      : pageFragment;

  if (root && hasData) {
    root.addEventListener("click", C.handler_clickOnProfileInfo);
    root.addEventListener("click", C.handler_clickOnDisconnect);
  }
  return pageFragment;
};

export async function ProfilePage() {
  console.log("[ProfilePage] START");
  const result = await UserData.status();

  // debugger;

  if (!result || !result.authenticated) {
    console.warn(
      "[ProfilePage] REDIRECT to /login because:",
      !result ? "no result" : "not authenticated"
    );
    // window.location.href = "/login";
    return document.createDocumentFragment();
  }

  console.log("[ProfilePage] Calling V.init with user:", result.user);
  const fragment = V.init(result.user);
  console.log("[ProfilePage] V.init returned:", fragment);
  return fragment;
}
