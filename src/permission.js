import router from "@/router";
import store from "@/store";

const whiteList = ["/login", "/"];

router.beforeEach(async (to, from, next) => {
  if (store.getters.token) {
    if (whiteList.includes(to.path)) {
      next(whiteList[1]);
    } else {
      if (store.getters.menus) {
        if (whiteList.includes(from.fullPath) && to.fullPath === "/404") {
          for (let item of store.getters.accessedRoutes) {
            if (item.children && item.children.length >= 1) {
              next(item.children[0].path);
            } else {
              next(item.path);
            }
            return;
          }
        }
        next();
      } else {
        try {
          await store.dispatch("user/info");
        } catch (err) {
          await store.dispatch("user/resetToken");
          next(whiteList[0]);
        }
        const accessedRoutes = await store.dispatch(
          "permission/generateRoutes",
          store.getters.menus
        );
        accessedRoutes.forEach((item) => {
          router.addRoute(item);
        });
        next({ path: to.redirectedFrom, replace: true });
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      // next(`/login?redirect=${to.redirectedFrom}`);
      next(whiteList[0]);
    }
  }
});

router.afterEach(() => {});
