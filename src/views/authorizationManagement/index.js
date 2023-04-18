/**
 *
 * @param {Array} data 拥有的菜单数据
 * @returns
 */
export const generateMenuCascaderOptions = (data) => {
  const option = [];
  data.forEach((item) => {
    const res = { label: item.title, value: item.id };
    if (item.children?.length) {
      res.children = generateMenuCascaderOptions(item.children);
    }
    // 当status = true，或者子节点部位零
    if (item.status || res.children?.length) {
      option.push(res);
    }
  });
  return option;
};

/**
 *
 * @param {Array} data 拥有的许可数据
 * @returns
 */
export const generatePermissionCascaderOptions = (data) => {
  const option = [];
  data.forEach((item) => {
    const res = { label: item.name, value: item.id };
    if (item.children?.length) {
      res.children = generatePermissionCascaderOptions(item.children);
    }
    // 当status = true，或者子节点部位零
    if (item.status || res.children?.length) {
      option.push(res);
    }
  });
  return option;
};
