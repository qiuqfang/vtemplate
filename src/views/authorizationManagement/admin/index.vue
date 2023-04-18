<template>
  <el-card>
    <easy-form :form-params="formParams">
      <template #buttonGroup>
        <el-button type="primary" round @click="search">搜索</el-button>
        <el-button round @click="reset">重置</el-button>
        <el-button type="success" round @click="(isUpdated = false), (isShowDialog = true)">
          新增
        </el-button>
      </template>
    </easy-form>
    <easy-table :table-params="tableParams">
      <template #status="{row}">
        <el-tag v-if="row.status" type="success">启用</el-tag>
        <el-tag v-else type="danger">禁用</el-tag>
      </template>
      <template #operation="{row}">
        <div v-if="row.id !== 1">
          <el-button
            type="text"
            @click="(isUpdated = isShowDialog = true), (dialogFormParams.data = { ...row })"
          >
            编辑
          </el-button>
          <el-button type="text" @click="remove(row)">
            删除
          </el-button>
        </div>
      </template>
    </easy-table>
    <el-dialog
      :title="isUpdated ? '编辑' : '新增' + '管理员'"
      :visible.sync="isShowDialog"
      @close="closeDialog"
      width="500px"
      center
      destroy-on-close
      :close-on-click-modal="false"
    >
      <easy-form :form-params="dialogFormParams"></easy-form>
      <template #footer>
        <el-button round @click="isShowDialog = false">取消</el-button>
        <el-button type="primary" round @click="submit">确定</el-button>
      </template>
    </el-dialog>
  </el-card>
</template>

<script>
import admin from "@/api/authorizationManagement/admin";
import role from "@/api/authorizationManagement/role";
// 引入一些默认参数
import { defaultDialogFormParams, defaultFormParams, defaultTableParams } from "./index.js";

export default {
  name: "AuthorizationAdmin",
  data() {
    return {
      isUpdated: false,
      isShowDialog: false,
      formParams: defaultFormParams,
      tableParams: defaultTableParams,
      dialogFormParams: defaultDialogFormParams,
    };
  },
  watch: {
    isUpdated: {
      handler() {
        this.dialogFormParams.formList.username.isShow = !this.isUpdated;
        this.dialogFormParams.formList.password.isShow = !this.isUpdated;
        this.dialogFormParams.formList.status.isShow = this.isUpdated;
      },
      immediate: true,
    },
  },
  created() {
    this.getList();
    this.getRoleList();
  },
  methods: {
    search() {
      this.getList();
    },
    reset() {
      this.formParams.data = {};
      this.getList();
    },
    async getList() {
      const data = { ...this.formParams.data };
      this.tableParams.loading = true;
      const result = await admin.list(data);
      this.tableParams.loading = false;
      this.tableParams.data = [];
      result.list.forEach((item) => {
        item.roles = item.roles.split(",");
        for (let i in item.roles) {
          item.roles[i] = +item.roles[i];
        }
        this.tableParams.data.push(item);
      });
    },
    async getRoleList() {
      const result = await role.list();
      this.dialogFormParams.formList.roles.selectOptions = [];
      result.list.forEach((item) => {
        this.dialogFormParams.formList.roles.selectOptions.push({
          label: item.name,
          value: item.id,
        });
      });
    },
    async submit() {
      const data = {
        ...this.dialogFormParams.data,
        roles: this.dialogFormParams.data.roles.toString(),
      };
      if (this.isUpdated) {
        await admin.update(data);
      } else {
        await admin.create(data);
      }
      this.isShowDialog = false;
      this.getList();
    },
    async remove(row) {
      const data = { ids: [row.id] };
      await admin.remove(data);
      this.getList();
    },
    closeDialog() {
      this.dialogFormParams.data = {};
    },
  },
};
</script>

<style></style>
