import { genericRenderer, htmlToFragment } from "../../lib/utils.js";
import template from "./template.html?raw";

let CardView = {
  html: function (data) {
    let htmlString =
      '<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">';
    for (let obj of data) {
      htmlString += genericRenderer(template, obj);
    }
    return htmlString + "</div>";
  },

  dom: function (data) {
    return htmlToFragment(CardView.html(data));
  },
};

export { CardView };
