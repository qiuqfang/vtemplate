/**
 * 获取token
 */
export const getToken = () => {
  return localStorage.getItem("token");
};

/**
 * 保存token
 * @param {string} token
 */
export const setToken = (token) => {
  localStorage.setItem("token", token);
};

/**
 * 删除token
 */
export const removeToken = () => {
  localStorage.removeItem("token");
};
