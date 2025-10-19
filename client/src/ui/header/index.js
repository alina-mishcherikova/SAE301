import { genericRenderer, htmlToFragment } from "../../lib/utils.js";
import template from "./template.html?raw";

const menuTemplate = `
    <a
      href="/products/category/{{name}}"
      data-link
    >
    <button class="flex gap-1 items-center justify-center p-3 rounded-lg hover:bg-accent-hover focus:bg-accent-hover transition-colors font-normal leading-5 text-fg text-sm uppercase whitespace-nowrap text-rethink">
      {{name}}
      </button>
    </a>`;

let HeaderView = {
  html: function (categories = [], selectedCategoryId = null) {
    let fragment = htmlToFragment(template);
    let navigation = fragment.querySelector("nav");

    // guard: nothing to render
    if (!navigation || !Array.isArray(categories) || categories.length === 0) {
      return fragment;
    }

    categories.forEach((category) => {
      let categoryLink = menuTemplate
        .replace("{{name}}", category.name)
        .replace("{{name}}", category.name);

      let categoryFragment = htmlToFragment(categoryLink);

      navigation.appendChild(categoryFragment);
    });

    return fragment;
  },

  dom: function (categories, selectedCategoryId = null) {
    return HeaderView.html(categories, selectedCategoryId);
  },
};

export { HeaderView };
