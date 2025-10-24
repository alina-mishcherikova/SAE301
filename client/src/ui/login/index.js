import { htmlToFragment } from "../../lib/utils.js";
import template from "./template.html?raw";

let FormLoginView = {
  html: function () {
    return template;
  },

  dom: function () {
    return htmlToFragment(FormLoginView.html());
  },
};
export { FormLoginView };
