import { genericRenderer, htmlToFragment } from "../../lib/utils.js";
import template from "./template.html?raw";

const menuTemplate = `
    <a
      href="/category/{{id}}"
      data-link
      class="flex gap-1 items-center justify-center p-3 rounded-lg hover:bg-accent-hover transition-colors font-normal leading-5 text-fg text-sm uppercase whitespace-nowrap text-rethink"
    >
      {{name}}
    </a>`;

let HeaderView = {
  html: function (categories) {
    let fragment = htmlToFragment(template);
    let navigation = fragment.querySelector("nav");

    if (!navigation || !Array.isArray(categories)) {
      return fragment;
    }

    categories.forEach((category) => {
      let categoryLink = menuTemplate
        .replace("{{id}}", category.id)
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
