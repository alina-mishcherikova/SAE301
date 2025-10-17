import { htmlToFragment } from "../../lib/utils.js";
import template from "./template.html?raw";

let DetailView = {
  html: function (product) {
    if (!product) {
      return '<div class="text-fg font-rethink p-4">Produit non trouvé</div>';
    }
    let tracklistHTML = "";
    if (product.tracklist) {
      const tracks = product.tracklist
        .split(/[,\n]+/)
        .map((t) => t.trim())
        .filter((t) => t);
      tracklistHTML = tracks.map((track) => `<li>${track}</li>`).join("");
    }
    let html = template
      .replace(/{{id}}/g, product.product_id || product.id || "")
      .replace(/{{name}}/g, product.name || "Unknown")
      .replace(/{{artist}}/g, product.interprete || "Unknown Artist")
      .replace(/{{year}}/g, product.annee || "N/A")
      .replace(/{{label}}/g, product.label || "N/A")
      .replace(/{{format}}/g, product.genre || "Vinyl")
      .replace(/{{country}}/g, product.pays || "N/A")
      .replace(/{{limite}}/g, product.limite || "Non")
      .replace(/{{livraison}}/g, product.livraison || "N/A")
      .replace(
        /{{description}}/g,
        product.infosupp || product.description || "No description"
      )
      .replace(
        /{{tracklist}}/g,
        tracklistHTML || "<li>Aucune piste disponible</li>"
      )
      .replace(/{{price}}/g, product.price || "0.00")
      .replace(/{{image}}/g, product.image || "placeholder.jpg");

    return html;
  },

  dom: function (product) {
    return htmlToFragment(DetailView.html(product));
  },
};

export { DetailView };
