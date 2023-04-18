<template>
  <div class="side_bar">
    <logo :closed-side-bar="$parent.$data.closedSideBar"></logo>
    <side-bar-menu :closed-side-bar="$parent.$data.closedSideBar"></side-bar-menu>
  </div>
</template>

<script>
import { Logo, SideBarMenu } from "./components";
export default {
  name: "SideBar",
  components: {
    Logo,
    SideBarMenu,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.side_bar {
  transition: width 0.28s;
  width: 210px !important;
  height: 100%;
  overflow: auto;
  // 加入阴影
  box-shadow: 1px 0 10px rgba(69, 65, 78, 0.6);
  background-color: #001529;
  color: #fff;
}

::v-deep .el-menu {
  .el-submenu {
    &__title {
      &:hover {
        color: #fff !important;
        i {
          color: #fff;
        }
      }
    }
    .el-menu--inline {
      .el-menu-item {
        background-color: #000c17 !important;
        &.is-active {
          background-color: #409eff !important;
        }
      }
    }
  }
  .el-menu-item {
    &:hover {
      color: #fff !important;
      i {
        color: #fff;
      }
    }
    &.is-active {
      background-color: #409eff !important;
      i {
        color: #fff;
      }
    }
  }
}
</style>
