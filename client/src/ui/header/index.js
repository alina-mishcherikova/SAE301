import { genericRenderer, htmlToFragment } from "../../lib/utils.js";
import template from "./template.html?raw";

const menuTemplate = `
    <li class="focus:outline-violet-500 active:bg-violet-700 active:border border-b-1-black"><a
      href="/category/{{id}}/{{name}}"
      data-link
      class="flex gap-1 items-center justify-center p-3 rounded-lg hover:bg-accent-hover transition-colors font-normal leading-5 text-fg text-sm uppercase whitespace-nowrap text-rethink"
    >
      {{name}}
    </a></li>`;

let HeaderView = {
  html: function (categories) {
    let fragment = htmlToFragment(template);
    let navigation = fragment.querySelector("ul[data-category-menu]");
    let navMenu = fragment.querySelector("div[data-header-buttons]");
    categories.forEach((category) => {
      let categoryLink = menuTemplate
        .replace("{{id}}", category.id)
        .replaceAll("{{name}}", category.name);

      let categoryFragment = htmlToFragment(categoryLink);

      navigation.appendChild(categoryFragment);

      let handlerBurgerMenu = function () {
        let navigation = document.querySelector("ul[data-category-menu]");
        navigation.classList.toggle("hidden");
        navigation.classList.add(
          "flex",
          "flex-col",
          "gap-4",
          "items-start",
          "w-full"
        );
      };

      navMenu.addEventListener("click", handlerBurgerMenu);

      navigation.appendChild(categoryFragment);
    });

    return fragment;
  },

  dom: function (categories, selectedCategoryId = null) {
    return HeaderView.html(categories, selectedCategoryId);
  },
};

export { HeaderView };
