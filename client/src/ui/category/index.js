import { htmlToFragment } from "../../lib/utils.js";
import template from "./template.html?raw";

const itemTemplate = (id, name) => `
  <div class="flex items-center gap-3">
    <input
      type="radoio"
      name="category"
      id="cat-${id}"
      value="${id}"
      }
      class="peer sr-only"
    />
    <label
      for="cat-${id}"
      data-id="${id}"
      class="flex items-center gap-3 cursor-pointer select-none hover:bg-accent-hover rounded p-2 transition-colors peer-checked:bg-gray-100"
    >
      ${name}
    </label>
  </div>
`;

export const CategoryView = {
  dom(categories, opts = {}) {
    const frag = htmlToFragment(template);
    const host = frag.querySelector("[data-category-list]");

    const list = Array.isArray(categories) ? categories : [];

    let html = "";
    for (let i = 0; i < list.length; i++) {
      const c = list[i];
      html += itemTemplate(c.id, c.name || c.label || `Cat ${c.id}`);
    }

    if (host) host.replaceChildren(htmlToFragment(html));
    return frag;
  },
};
