import Vue from "vue";
import mixins from "../mixins";

let onlyOneChild = null;
const hasOneShowingChild = (children = [], parent) => {
  const showingChildren = children.filter((item) => {
    if (item.hidden) {
      return false;
    } else {
      // 临时集（如果只有一个显示子级，将使用该集）
      onlyOneChild = item;
      return true;
    }
  });

  // 当只有一个子路由器时，默认情况下会显示该子路由器
  if (showingChildren.length === 1) {
    return true;
  }

  // 如果没有子路由器要显示，显示父
  if (showingChildren.length === 0) {
    onlyOneChild = { ...parent };
    return true;
  }

  return false;
};

const createSideBarMenuItem = (createElement, routeList) => {
  return routeList.map((routeItem) => {
    if (!routeItem.hidden) {
      if (hasOneShowingChild(routeItem.children, routeItem)) {
        return createElement(
          "el-menu-item",
          {
            props: {
              index: onlyOneChild.path,
            },
          },
          [
            createElement("i", {
              class: onlyOneChild.meta && onlyOneChild.meta.icon,
            }),
            createElement("span", {
              slot: "title",
              domProps: {
                innerHTML: onlyOneChild.meta && onlyOneChild.meta.title,
              },
            }),
          ]
        );
      } else {
        return createElement(
          "el-submenu",
          {
            props: {
              index: routeItem.path,
            },
          },
          [
            createElement(
              "template",
              {
                slot: "title",
              },
              [
                createElement("i", {
                  class: routeItem.meta && routeItem.meta.icon,
                }),
                createElement("span", {
                  domProps: {
                    innerHTML: routeItem.meta && routeItem.meta.title,
                  },
                }),
              ]
            ),
            createSideBarMenuItem(createElement, routeItem.children),
          ]
        );
      }
    }
  });
};

const SideBarMenu = Vue.component("SideBarMenu", {
  render(createElement) {
    return createElement(
      "el-menu",
      {
        style: {
          border: "none",
        },
        mixins: [mixins],
        props: {
          router: true,
          collapse: this.closedSideBar,
          "default-active": this.activeMenu,
          "background-color": this.backgroundColor,
          "text-color": this.color,
          "active-text-color": this.activeColor,
        },
      },
      createSideBarMenuItem(createElement, this.routeList)
    );
  },
  props: {
    closedSideBar: {
      type: Boolean,
      default: true,
    },
    backgroundColor: {
      type: String,
      default: "#001529",
    },
    color: {
      type: String,
      default: "rgba(255, 255, 255, 0.6)",
    },
    activeColor: {
      type: String,
      default: "#fff",
    },
  },
  computed: {
    routeList() {
      return this.$store.getters.routes;
    },
    activeMenu() {
      const route = this.$route;
      const { path } = route;
      return path;
    },
  },
});

export default SideBarMenu;
