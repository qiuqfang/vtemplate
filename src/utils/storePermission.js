/**
 * 方案一
 * @param {Array} asyncRoutes 本地异步路由
 * @param {Array} menus 后端返回的可访问路由
 */
export function filterAsyncRoutes(asyncRoutes, menus) {
  const res = [];
  asyncRoutes.forEach((asyncRoute) => {
    if (hasPermission(asyncRoute, menus)) {
      if (asyncRoute.children && asyncRoute.children.length) {
        asyncRoute.children = filterAsyncRoutes(asyncRoute.children, menus);
      }
      res.push(asyncRoute);
    }
  });
  return res;
}

function hasPermission(asyncRoute, menus) {
  if (asyncRoute.id) {
    if (menus.includes(asyncRoute.id.toString())) {
      return true;
    }
    return false;
  } else {
    return true;
  }
}

// /**
//  * 方案二
//  * @param {array} asyncRoutes 本地异步路由
//  * @param {array} menus 后端返回的可访问路由
//  */
// export function filterAsyncRoutes(asyncRoutes, menus) {
//     const res = [];
//     asyncRoutes.forEach((asyncRoute) => {
//         if (hasPermission(asyncRoute, menus)) {
//             if (asyncRoute.children && asyncRoute.children.length) {
//                 asyncRoute.children = filterAsyncRoutes(asyncRoute.children, menus);
//             }
//             res.push(asyncRoute);
//         }
//     });
//     return res;
// }

// /**
//  * 根据本地异步路由名称获取可访问路由
//  *
//  * @param {string} name 单个本地异步路由名称
//  * @param {array} menus 后端返回的可访问路由
//  */
// function getMenu(name, menus) {
//     let currMenu = null;
//     menus.forEach((menu) => {
//         if (name === menu.title) {
//             currMenu = menu;
//         }
//         if (!currMenu) {
//             if (menu.children && menu.children.length) {
//                 currMenu = getMenu(name, menu.children);
//             }
//         }
//     });
//     return currMenu;
// }

// /**
//  *
//  * @param {object} asyncRoute 单个本地异步路由
//  * @param {array} menus 后端返回的可访问路由
//  */
// function hasPermission(asyncRoute, menus) {
//     if (asyncRoute.name) {
//         let currMenu = getMenu(asyncRoute.name, menus);
//         if (currMenu !== null) {
//             //设置菜单的标题、图标和可见性
//             asyncRoute.title = currMenu.title;
//             asyncRoute.icon = currMenu.icon;
//             asyncRoute.hidden = currMenu.status == 1 ? false : true;
//             return true;
//         }
//         return false;
//     } else {
//         return false;
//     }
// }
