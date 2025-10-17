import { genericRenderer, htmlToFragment } from "../../lib/utils.js";
import template from "./template.html?raw";

let ProductView = {
  html: function (data) {
    const list = Array.isArray(data)
      ? data
      : data && typeof data === "object"
        ? [data]
        : [];

    let htmlString =
      '<div class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">';
    for (let obj of list) {
      htmlString += genericRenderer(template, obj);
    }
    return htmlString + "</div>";
  },

  dom: function (data) {
    return htmlToFragment(ProductView.html(data));
  },
};

export { ProductView };
