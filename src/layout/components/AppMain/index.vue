<template>
  <section class="app_main">
    <router-view />
  </section>
</template>

<script>
export default {
  name: "AppMain",
};
</script>

<style lang="scss" scoped>
.app_main {
  /* 主要展示区的padding */
  padding: 10px 20px;
  height: calc(100% - 50px);
  & > div {
    height: 100%;
    overflow: auto;
  }
}
</style>
