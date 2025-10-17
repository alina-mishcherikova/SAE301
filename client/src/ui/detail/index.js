import { htmlToFragment } from "../../lib/utils.js";
import template from "./template.html?raw";

let DetailView = {
  html: function (product) {
    if (!product) {
      return '<div class="text-fg font-rethink p-4">Produit non trouvé</div>';
    }

    console.log("DetailView - product:", product);
    console.log("DetailView - gallery:", product.gallery);

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
            src="../../../public/images/${product.gallery[0].image}"
            alt="${product.name}"
            class="w-full h-full object-cover"
          />
        `;
      }

      const maxSmallImages = 3;
      for (let i = 1; i < product.gallery.length && i <= maxSmallImages; i++) {
        const img = product.gallery[i];
        galleryImages += `
          <div class="aspect-square rounded-lg overflow-hidden border border-gray-20">
            <img
              src="../../../public/images/${img.image}"
              alt="${product.name}"
              class="w-full h-full object-cover"
            />
          </div>
        `;
      }

      console.log(
        `Gallery: 1 main image + ${Math.min(product.gallery.length - 1, maxSmallImages)} small images`
      );
    } else {
      console.log("No gallery images found");
    }

    let html = template
      .replace(/{{id}}/g, product.product_id || product.id || "")
      .replace(/{{name}}/g, product.name || "Unknown")
      .replace(/{{description}}/g, product.description || "No description")
      .replace(/{{price}}/g, product.price || "0.00")
      .replace(/{{mainGalleryImage}}/g, mainGalleryImage)
      .replace(/{{galleryImages}}/g, galleryImages);

    return html;
  },

  dom: function (product) {
    return htmlToFragment(DetailView.html(product));
  },
};

export { DetailView };
