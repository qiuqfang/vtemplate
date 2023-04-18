<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  width: 100vw;
  height: 100vh;
  & > div {
    width: 100%;
    height: 100%;
  }
}
</style>
