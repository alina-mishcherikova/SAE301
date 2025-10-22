import { genericRenderer, htmlToFragment } from "../../lib/utils.js";
import template from "./template.html?raw";

let ProfileView = {
  html: function (data) {
    //console.log("ProfileView.html data:", data);
    const result = genericRenderer(template, data);
    return result;
  },

  dom: function (data) {
    //console.log("ProfileView.dom called with:", data);
    return htmlToFragment(ProfileView.html(data));
  },
};

export { ProfileView };
