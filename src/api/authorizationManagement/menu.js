import request from "../request";

// 添加菜单
export const create = (data) => {
  return request.post("/menu/create", data);
};

// 删除菜单
export const remove = (data) => {
  return request.post(`/menu/delete/`, data);
};

// 更新菜单
export const update = (data) => {
  return request.post(`/menu/update`, data);
};

// 分页获取菜单
export const list = (data) => {
  return request.get("/menu/list", { data });
};

// 通过当前登录用户所拥有的菜单
export const getMenuByAdminId = (data) => {
  return request.get("/menu/list/by/adminId", { data });
};

export default { create, remove, update, list, getMenuByAdminId };
