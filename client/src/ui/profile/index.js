import { genericRenderer, htmlToFragment } from "../../lib/utils.js";
import template from "./template.html?raw";

let ProfileView = {
  html: function (data) {
    if (!data) {
      console.warn("ProfileView: No data provided");
      return template.replace(/{{firstName}}/g, "Utilisateur");
    }

    console.log("ProfileView rendering with data:", data);

    const result = genericRenderer(template, data);
    return result;
  },

  dom: function (data) {
    return htmlToFragment(ProfileView.html(data));
  },
};

export { ProfileView };
