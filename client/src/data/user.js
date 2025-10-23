import {
  postRequest,
  getRequest,
  deleteRequest,
  //jsonPostRequest,
} from "../lib/api-request.js";

let UserData = {};

UserData.login = async function (data) {
  return await postRequest("auth", data);
};

UserData.logout = async function () {
  const data = await deleteRequest("auth");
  return data;
};

UserData.status = async function () {
  console.log("UserData.status called");
  return await getRequest("auth");
};

UserData.register = async function (data) {
  const response = await postRequest("users", data);
  console.log("UserData.register response:", response);
  return response;
};

export { UserData };
