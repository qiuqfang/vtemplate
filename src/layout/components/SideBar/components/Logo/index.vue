<template>
  <router-link to="/" class="logo">
    <img src="./logo.svg" class="logo_image" />
    <h5 v-if="!closedSideBar" class="logo_title">{{ title }}</h5>
  </router-link>
</template>

<script>
import mixins from "../mixins";
export default {
  name: "Logo",
  mixins: [mixins],
};
</script>

<style lang="scss" scoped>
.logo {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  .logo_image {
    height: 70%;
  }
  .logo_title {
    margin-left: 10px;
  }
}
</style>
