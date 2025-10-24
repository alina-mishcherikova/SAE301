import {
  postRequest,
  getRequest,
  deleteRequest,
  patchRequest,
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

UserData.update = async function (userId, data) {
  console.log("UserData.update called with:", userId, data);
  return await patchRequest(`users/${userId}`, data);
};

UserData.findUserEmail = async function (id_user) {
  if (!id_user) return null;
  const data = await getRequest(`users/${id_user}`);
  if (data === false || !data) return null;
  return data.firstName ?? null;
};

export { UserData };
