import { getRequest } from "../lib/api-request";

let CategoryData = {};

let fakecategories = [
  { id: 1, name: "Mobilier" },
  { id: 2, name: "Électronique" },
  { id: 3, name: "Bureautique" },
  { id: 4, name: "Cuisine" },
  { id: 5, name: "Extérieur" },
];

CategoryData.fetchAll = async function () {
  let data = await getRequest("categories");
  return data == false ? fakecategories : data;
};

export { CategoryData };
