<template>
  <div class="dropdown">
    <el-dropdown trigger="click">
      <div class="avatar_wrapper">
        <img
          class="user_avatar"
          src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
        />
        <i class="el-icon-caret-bottom" />
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <router-link to="/">
            <el-dropdown-item>首页</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "Dropdown",
  methods: {
    async logout() {
      await this.$store.dispatch("user/logout");
      location.reload();
    },
  },
};
</script>

<style lang="scss" scoped>
.dropdown {
  padding: 0 15px;
  .avatar_wrapper {
    cursor: pointer;
    display: flex;
    align-items: center;
    .user_avatar {
      width: 30px;
      height: 30px;
      margin-right: 10px;
      border-radius: 50%;
    }
    .text {
      margin-right: 5px;
    }
  }
}
</style>
