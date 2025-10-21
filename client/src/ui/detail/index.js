import { genericRenderer, htmlToFragment } from "../../lib/utils.js";
import template from "./template.html?raw";

let DetailView = {
  html: function (data) {
    return genericRenderer(template, data);
  },

  dom: function (data) {
    const fragment = htmlToFragment(DetailView.html(data));

    // Show vinyl-specific info only if artist or label exists
    if (data.artist || data.label) {
      const infosupp = fragment.querySelector("#infosupp");
      if (infosupp) {
        infosupp.classList = "flex flex-col gap-2";
      }
    } else {
      // For other categories or if no vinyl data, remove the section
      const infosupp = fragment.querySelector("#infosupp");
      if (infosupp) {
        infosupp.remove();
      }
    }

    return fragment;
  },
};

export { DetailView };
