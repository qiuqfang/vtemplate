import request from "../request";

// 获取验证码
export const captcha = () => {
  return request.get("/admin/captcha");
};

// 管理员登录
export const login = (data) => {
  return request.post("/admin/login", data);
};

// 获取管理员信息
export const info = () => {
  return request.get("/admin/info");
};

// 更新管理员密码
export const updatePassword = (data) => {
  return request.post("/admin/update/password", data);
};

// 退出登录
export const logout = () => {
  return request.post("/admin/logout");
};

export default { captcha, login, info, updatePassword, logout };
