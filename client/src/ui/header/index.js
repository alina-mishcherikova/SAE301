import { genericRenderer, htmlToFragment } from "../../lib/utils.js";
import template from "./template.html?raw";

let HeaderView = {
  html: function (data) {
    return genericRenderer(template, data || {});
  },

  dom: function (data) {
    const html = this.html(data);
    const fragment = htmlToFragment(html);

    const burgerBtn = fragment.querySelector("#\\#burgerMenu");
    const navigation = fragment.querySelector("ul[data-category-menu]");

    if (burgerBtn && navigation) {
      burgerBtn.addEventListener("click", () => {
        navigation.classList.toggle("hidden");
        navigation.classList.toggle("flex");
        navigation.classList.toggle("flex-col");
        navigation.classList.toggle("gap-4");
        navigation.classList.toggle("items-start");
        navigation.classList.toggle("w-full");
      });
    }

    return fragment;
  },
};

export { HeaderView };
