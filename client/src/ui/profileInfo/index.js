import { genericRenderer, htmlToFragment } from "../../lib/utils.js";
import template from "./template.html?raw";

let ProfileInfoView = {
  html: function (data) {
    if (!data) {
      return template;
    }

    const result = genericRenderer(template, data);
    return result;
  },

  dom: function (data) {
    const fragment = htmlToFragment(ProfileInfoView.html(data));

    if (data) {
      const form = fragment.querySelector("#dataForm");
      if (form) {
        const firstNameInput = form.querySelector("#firstName");
        const secondNameInput = form.querySelector("#secondName");
        const emailInput = form.querySelector("#email");

        if (firstNameInput && data.firstName)
          firstNameInput.value = data.firstName;
        if (secondNameInput && data.secondName)
          secondNameInput.value = data.secondName;
        if (emailInput && data.email) emailInput.value = data.email;
      }
    }

    return fragment;
  },
};

export { ProfileInfoView };
