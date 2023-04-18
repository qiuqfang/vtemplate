<template>
  <div class="layout" :class="closedSideBar && 'close_sideBar'">
    <side-bar />
    <div class="main_container">
      <nav-bar :closed-side-bar="closedSideBar" @toggleSideNav="toggleSideNav" />
      <app-main />
    </div>
  </div>
</template>

<script>
import { AppMain, SideBar, NavBar } from "./components";
export default {
  name: "Layout",
  components: {
    AppMain,
    SideBar,
    NavBar,
  },
  data() {
    return {
      closedSideBar: false,
    };
  },
  methods: {
    toggleSideNav() {
      this.closedSideBar = !this.closedSideBar;
    },
  },
};
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  .main_container {
    width: calc(100% - 210px);
    height: 100vh;
    transition: width 0.28s;
  }
}
.close_sideBar {
  .side_bar {
    width: 64px !important;
  }
  .main_container {
    width: calc(100% - 64px) !important;
  }
}
</style>
