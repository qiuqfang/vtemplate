import request from "../request";

// 添加角色
export const create = (data) => {
  return request.post("/role/create", data);
};

// 删除角色
export const remove = (data) => {
  return request.post("/role/delete", data);
};

// 更新角色
export const update = (data) => {
  return request.post("/role/update", data);
};

// 分页获取角色
export const list = (data) => {
  return request.get("/role/list", { data });
};

export default { create, remove, update, list };
