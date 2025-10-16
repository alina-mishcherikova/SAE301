import { getRequest } from "../lib/api-request.js";

let ProductData = {};

let fakeProducts = [
  {
    id: 1,
    name: "Sabrina Carpenter - Man's Best Friend - Vinyle Luxe Packaging (Exclusivité)",
    price: "€59,99",
    category: 1,
  },
  {
    id: 2,
    name: "Various Artist - Almost Famous - Double Vinyle Violet & Magenta Exclusif",
    price: "€34,99",
    category: 1,
  },
  {
    id: 3,
    name: "KPop Demon Hunters (Soundtrack from the Netflix Film) - Vinyle Smokey Fushia Exclusif",
    price: "€29,99",
    category: 1,
  },
];

ProductData.fetch = async function (id) {
  let data = await getRequest("products/" + id);
  return data == false ? fakeProducts.pop() : [data];
};

ProductData.fetchAll = async function () {
  let data = await getRequest("products");
  return data == false ? fakeProducts : data;
};

ProductData.parCategory = async function (categoryId) {
  let data = await getRequest(`products?category=${categoryId}`);
  if (data === false) {
    return fakeProducts.filter((p) => p.category == categoryId);
  }
  return data;
};

export { ProductData };
