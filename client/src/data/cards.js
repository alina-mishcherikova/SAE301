import { getRequest } from "../lib/api-request.js";

let CardsData = {};

let fakeProducts = [
  {
    id: 1,
    name: "Sabrina Carpenter - Man's Best Friend - Vinyle Luxe Packaging (Exclusivité)",
    price: "€59,99",
  },
  {
    id: 2,
    name: "Various Artist - Almost Famous - Double Vinyle Violet & Magenta Exclusif",
    price: "€34,99",
  },
  {
    id: 3,
    name: "KPop Demon Hunters (Soundtrack from the Netflix Film) - Vinyle Smokey Fushia Exclusif",
    price: "€29,99",
  },
];

CardsData.fetch = async function (id) {
  let data = await getRequest("products/" + id);
  return data == false ? fakeProducts.pop() : [data];
};

CardsData.fetchAll = async function () {
  let data = await getRequest("products");
  return data == false ? fakeProducts : data;
};

export { CardsData };
