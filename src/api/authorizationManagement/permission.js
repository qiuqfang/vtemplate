import request from "../request";

// 添加许可
export const create = (data) => {
  return request.post("/permission/create", data);
};

// 删除许可
export const remove = (data) => {
  return request.post(`/permission/delete`, data);
};

// 更新许可
export const update = (data) => {
  return request.post(`/permission/update`, data);
};

// 分页获取许可
export const list = (data) => {
  return request.get("/permission/list", { data });
};

// 通过当前登录用户所拥有的许可
export const getPermissionByAdminId = (data) => {
  return request.get("/permission/list/by/adminId", { data });
};

export default { create, remove, update, list, getPermissionByAdminId };
