import { htmlToFragment } from "../../lib/utils.js";
import template from "./template.html?raw";

let FormSignUpView = {
  html: function () {
    return template;
  },

  dom: function () {
    return htmlToFragment(FormSignUpView.html());
  },
};
export { FormSignUpView };
