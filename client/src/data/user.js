import { postRequest } from "../lib/api-request.js";

let UserData = {};
// UserData.create = async function (userInfo) {
//   // const response = await jsonPostRequest("/users", JSON.stringify(userInfo));
//   const response = await jsonPostRequest("users", userInfo);
//   return response;
// };

UserData.login = async function (credentials) {
  console.log("UserData.login called with:", credentials);
  const response = await postRequest("users?login", credentials);
  return response;
};

UserData.connection = async function (data) {
  console.log("UserData.connection called with:", data);
  const response = await postRequest("users", data);
  console.log("UserData.connection response:", response);
  return response;
};

export { UserData };
