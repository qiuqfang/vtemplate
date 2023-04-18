import request from "../request";

// 添加管理员
export const create = (data) => {
  return request.post("/admin/create", data);
};

// 删除管理员
export const remove = (data) => {
  return request.post("/admin/delete", data);
};

// 更新管理员
export const update = (data) => {
  return request.post("/admin/update", data);
};

// 分页获取管理员
export const list = (data) => {
  return request.get("/admin/list", { data });
};

export default { create, remove, update, list };
