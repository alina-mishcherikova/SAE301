import { htmlToFragment, genericRenderer } from "../../lib/utils.js";
import template from "./template.html?raw";

let ImageGalleryView = {
  html: function (data) {
    if (!data || data.length === 0) {
      return "<div class='flex-1 min-w-0'><p class='text-center text-gray-500'>Aucune image disponible</p></div>";
    }

    const mainImage = data[0];

    const makeThumb = (name, idx) => `
      <button
        type="button"
        class="group relative rounded-md overflow-hidden border border-gray-300 hover:border-accent-hover transition-colors cursor-pointer"
        data-thumb-index="${idx}"
      >
        <img 
          src="/images/${name}" 
          alt="Miniature ${idx + 1}" 
          class="w-full h-full object-cover aspect-square" 
          loading="lazy" 
        />
      </button>
    `;

    const t1 = data[1] ? makeThumb(data[1], 1) : "";
    const t2 = data[2] ? makeThumb(data[2], 2) : "";

    return genericRenderer(template, {
      mainImage,
      thumbs: t1 + t2,
    });
  },

  dom: function (data) {
    const fragment = htmlToFragment(this.html(data));

    if (!data || data.length === 0) {
      return fragment;
    }

    const mainImage = fragment.querySelector("[data-main-image]");
    const prevBtn = fragment.querySelector("[data-gallery-prev]");
    const nextBtn = fragment.querySelector("[data-gallery-next]");
    const thumbsBox = fragment.querySelector("[data-thumbs]");

    let currentIndex = 0;

    const buildTwoThumbs = () => {
      const idx1 = (currentIndex + 1) % data.length;
      const idx2 = (currentIndex + 2) % data.length;

      let thumbHtml = "";

      if (data[idx1]) {
        thumbHtml += `
          <button type="button" 
                  class="group relative rounded-md overflow-hidden border border-gray-300 hover:border-accent-hover transition-colors cursor-pointer"
                  data-thumb-index="${idx1}">
            <img src="/images/${data[idx1]}" 
                 alt="Miniature ${idx1 + 1}"
                 class="w-full h-full object-cover aspect-square" 
                 loading="lazy" />
          </button>
        `;
      }

      if (data.length > 2 && data[idx2]) {
        thumbHtml += `
          <button type="button" 
                  class="group relative rounded-md overflow-hidden border border-gray-300 hover:border-accent-hover transition-colors cursor-pointer"
                  data-thumb-index="${idx2}">
            <img src="/images/${data[idx2]}" 
                 alt="Miniature ${idx2 + 1}"
                 class="w-full h-full object-cover aspect-square" 
                 loading="lazy" />
          </button>
        `;
      }

      thumbsBox.innerHTML = thumbHtml;
    };

    const render = () => {
      mainImage.src = `/images/${data[currentIndex]}`;
      mainImage.alt = `Product image ${currentIndex + 1}`;
      buildTwoThumbs();
    };

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + data.length) % data.length;
        render();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % data.length;
        render();
      });
    }

    if (thumbsBox) {
      thumbsBox.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-thumb-index]");
        if (!btn) return;

        const idx = Number(btn.getAttribute("data-thumb-index"));
        if (!Number.isFinite(idx)) return;

        currentIndex = idx;
        render();
      });
    }

    render();

    return fragment;
  },
};

export { ImageGalleryView };
