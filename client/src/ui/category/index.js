import { genericRenderer, htmlToFragment } from "../../lib/utils.js";
import template from "./template.html?raw";
const categoryItemTemplate = `
<label
  class="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors data-id[id]"
>
  <input
    type="checkbox"
    class="w-4 h-4 border-2 border-gray-300 rounded cursor-pointer"
  />
  <span class="text-black text-sm font-rethink">{{name}}</span>
</label>
`;
// CategoryView génère le filtre avec les catégories dynamiques
// ...existing code...
let CategoryView = {
  html: function (categories) {
    let fragment = htmlToFragment(template);
    let dropdownList = fragment.querySelector("[data-dropdown-list]");

    // гарантуємо, що маємо масив
    if (!Array.isArray(categories)) categories = [];

    categories.forEach((category) => {
      let categoryHTML = genericRenderer(categoryItemTemplate, {
        name: category.name,
      });
      let categoryFragment = htmlToFragment(categoryHTML);

      // проставити id в data-атрибуті інпута, щоб можна було реагувати на кліки
      let input = categoryFragment.querySelector("input");
      if (input) input.dataset.id = category.id;

      // додаємо елемент у контейнер
      if (dropdownList) dropdownList.appendChild(categoryFragment);
    });

    return fragment.firstElementChild.outerHTML;
  },

  dom: function (categories) {
    return htmlToFragment(CategoryView.html(categories));
  },
};

export { CategoryView };
