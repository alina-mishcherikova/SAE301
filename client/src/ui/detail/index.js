import { htmlToFragment } from "../../lib/utils.js";
import template from "./template.html?raw";

let DetailView = {
  currentGalleryIndex: 0,
  galleryData: [],

  html: function (product) {
    if (!product) {
      return '<div class="text-fg font-rethink p-4">Produit non trouvé</div>';
    }

    this.galleryData = product.gallery || [];
    this.currentGalleryIndex = 0;

    let mainGalleryImage = "";
    let galleryImages = "";

    if (
      product.gallery &&
      Array.isArray(product.gallery) &&
      product.gallery.length > 0
    ) {
      console.log("Processing gallery, images count:", product.gallery.length);

      if (product.gallery[0]) {
        mainGalleryImage = `
          <img
            data-main-image
            src="../../../public/images/${product.gallery[0].image}"
            alt="${product.name}"
            class="w-full h-full object-cover"
          />
        `;
      }
      const maxThumbs = 3;
      for (let i = 0; i < product.gallery.length && i < maxThumbs; i++) {
        const img = product.gallery[i];
        const isActive = i === 0;
        const borderClass = isActive ? "border-accent-hover" : "border-gray-20";

        galleryImages += `
          <div 
            class="aspect-square rounded-lg overflow-hidden border ${borderClass} cursor-pointer hover:border-fg transition-colors" 
            data-gallery-thumb="${i}"
          >
            <img
              src="../../../public/images/${img.image}"
              alt="${product.name}"
              class="w-full h-full object-cover"
            />
          </div>
        `;
      }
    }

    let html = template
      .replace("{{categoryName}}", product.categoryName || "")
      .replace("{{id}}", product.product_id || product.id || "")
      .replaceAll("{{name}}", product.name || "Unknown")
      .replace("{{description}}", product.description || "No description")
      .replace("{{price}}", product.price || "0.00")
      .replace("{{mainGalleryImage}}", mainGalleryImage)
      .replace("{{galleryImages}}", galleryImages);
    return html;
  },

  dom: function (product) {
    const fragment = htmlToFragment(DetailView.html(product));
    DetailView.attachGalleryEvents(fragment);
    return fragment;
  },

  attachGalleryEvents: function (fragment) {
    const article = fragment.querySelector("article");
    if (!article) return;

    article.addEventListener("click", (ev) => {
      const prevBtn = ev.target.closest("[data-gallery-prev]");
      if (prevBtn) {
        DetailView.navigateGallery(-1, article);
        return;
      }
      const nextBtn = ev.target.closest("[data-gallery-next]");
      if (nextBtn) {
        DetailView.navigateGallery(1, article);
        return;
      }
      const thumb = ev.target.closest("[data-gallery-thumb]");
      if (thumb) {
        const index = parseInt(thumb.dataset.galleryThumb, 10);
        DetailView.setGalleryImage(index, article);
        return;
      }
    });
  },

  navigateGallery: function (direction, root) {
    if (!DetailView.galleryData || DetailView.galleryData.length === 0) return;

    DetailView.currentGalleryIndex += direction;

    if (DetailView.currentGalleryIndex < 0) {
      DetailView.currentGalleryIndex = DetailView.galleryData.length - 1;
    } else if (
      DetailView.currentGalleryIndex >= DetailView.galleryData.length
    ) {
      DetailView.currentGalleryIndex = 0;
    }

    DetailView.updateMainImage(root);
  },

  setGalleryImage: function (index, root) {
    if (
      !DetailView.galleryData ||
      index < 0 ||
      index >= DetailView.galleryData.length
    )
      return;
    DetailView.currentGalleryIndex = index;
    DetailView.updateMainImage(root);
  },

  updateMainImage: function (root) {
    const mainImg = root.querySelector("[data-main-image]");
    if (!mainImg || !DetailView.galleryData[DetailView.currentGalleryIndex])
      return;

    const newImage = DetailView.galleryData[DetailView.currentGalleryIndex];
    mainImg.src = `../../../public/images/${newImage.image}`;

    DetailView.updateActiveThumbnail(root);

    console.log(
      `Gallery switched to index ${DetailView.currentGalleryIndex}:`,
      newImage.image
    );
  },

  updateActiveThumbnail: function (root) {
    const allThumbs = root.querySelectorAll("[data-gallery-thumb]");
    allThumbs.forEach((thumb) => {
      thumb.classList.remove("border-accent-hover");
      thumb.classList.add("border-gray-20");
    });
    const currentThumb = root.querySelector(
      `[data-gallery-thumb="${DetailView.currentGalleryIndex}"]`
    );
    if (currentThumb) {
      currentThumb.classList.remove("border-gray-20");
      currentThumb.classList.add("border-accent-hover");
    }
  },
};

export { DetailView };
