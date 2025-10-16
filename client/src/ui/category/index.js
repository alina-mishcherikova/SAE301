import { htmlToFragment } from "../../lib/utils.js";
import template from "./template.html?raw";

const itemTemplate = (id, name, isChecked = false) => `
  <div class="flex items-center gap-3">
    <input
      type="checkbox"
      name="category"
      id="cat-${id}"
      value="${id}"
      ${isChecked ? "checked" : ""}
      class="peer sr-only"
    />
    <label
      for="cat-${id}"
      data-id="${id}"
      class="flex items-center gap-3 cursor-pointer select-none hover:bg-gray-50 rounded p-2 transition-colors peer-checked:bg-gray-100"
    >
      <!-- “чекбокс” квадрат -->
      <span
        class="relative h-5 w-5 rounded border border-gray-300 grid place-items-center bg-white
               peer-checked:bg-black peer-checked:border-black transition-colors"
        aria-hidden="true"
      >
        <!-- Галочка; видно лише коли обрано -->
        <svg class="h-3.5 w-3.5 opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 20 20" fill="white">
          <path d="M7.629 13.233L3.9 9.504l1.4-1.4 2.329 2.33 6.07-6.07 1.4 1.4-7.47 7.47z"/>
        </svg>
      </span>
      <span class="text-black text-sm font-rethink">${name}</span>
    </label>
  </div>
`;

export const CategoryView = {
  /**
   * categories: [{id, name}], opts.selected: number[] | Set<number>
   */
  dom(categories, opts = {}) {
    const selectedSet = new Set(
      Array.isArray(opts.selected) ? opts.selected.map(String) : []
    );

    const frag = htmlToFragment(template);
    const host = frag.querySelector("[data-category-list]");

    const list = Array.isArray(categories) ? categories : [];
    const html = list
      .map((c) =>
        itemTemplate(
          c.id,
          c.name || c.label || `Cat ${c.id}`,
          selectedSet.has(String(c.id))
        )
      )
      .join("");

    if (host) host.replaceChildren(htmlToFragment(html));
    return frag;
  },
};
