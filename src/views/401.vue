<template>
  <div class="errPage_container">
    <el-row>
      <el-col :span="12">
        <h1 class="text_jumbo text_ginormous">Oops!</h1>
        <h2>您没有权限去该页面</h2>
        <h6>请联系管理员，获取权限</h6>
        <el-button round class="pan_backBtn" @click="$router.go(-1)">
          返回
        </el-button>
      </el-col>
      <el-col :span="12">
        <img :src="errGif" width="313" height="428" alt="Girl has dropped her ice cream." />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import errGif from "@/assets/401_images/401.gif";

export default {
  name: "Page401",
  data() {
    return {
      errGif: errGif + "?" + +new Date(),
      ewizardClap: "https://wpimg.wallstcn.com/007ef517-bafd-4066-aae4-6883632d9646",
      dialogVisible: false,
    };
  },
  created() {
    console.log(this.$route);
  },
};
</script>

<style lang="scss" scoped>
.errPage_container {
  display: flex;
  justify-content: center;
  margin-top: 100px;

  .pan_backBtn {
    background: #008489;
    color: #fff;
    border: none !important;
  }

  .pan-gif {
    margin: 0 auto;
    display: block;
  }

  .pan-img {
    display: block;
    margin: 0 auto;
    width: 100%;
  }

  .text_jumbo {
    font-size: 60px;
    font-weight: 700;
    color: #484848;
  }

  .list-unstyled {
    font-size: 14px;

    li {
      padding-bottom: 5px;
    }

    a {
      color: #008489;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
