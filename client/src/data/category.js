import { getRequest } from "../lib/api-request";

let CategoryData = {};

let fakecategories = [
  { id: 1, name: "Mobilier" },
  { id: 2, name: "Électronique" },
  { id: 3, name: "Bureautique" },
];

CategoryData.fetchAll = async function () {
  let data = await getRequest("categories");
  return data === false ? fakecategories : data;
};

CategoryData.findNameOfCategory = async function (categoryId) {
  let data = await getRequest(`categories/${categoryId}`);
  if (data === false || !data) {
    const category = fakecategories.find((c) => c.id == categoryId);
    return category ? category.name : null;
  }

  return data.name || null;
};
export { CategoryData };
