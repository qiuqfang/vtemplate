<template>
  <div class="nav_bar fixed_navBar">
    <div class="folder">
      <i
        class=" el-icon-s-fold"
        :class="{ is_active: closedSideBar }"
        @click="$emit('toggleSideNav')"
      ></i>
    </div>
    <div class="right">
      <dropdown></dropdown>
    </div>
  </div>
</template>

<script>
import { Dropdown } from "./components";
export default {
  name: "NavBar",
  props: {
    closedSideBar: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  components: {
    Dropdown,
  },
  computed: {},
  created() {},
  methods: {},
};
</script>

<style></style>
<style lang="scss" scoped>
.nav_bar {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  background-color: #fff;
  .right {
    display: flex;
    align-items: center;
  }
}
.fixed_navBar {
  position: sticky;
  top: 0;
  left: 0;
  z-index: 999;
}
.folder {
  width: 20px;
  height: 20px;
  padding: 0 15px;
  i {
    vertical-align: middle;
    font-size: 20px;
    color: #001529;
    cursor: pointer;
  }
}
.is_active {
  transform: rotate(180deg);
}
</style>
