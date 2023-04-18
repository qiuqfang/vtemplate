<template>
  <el-card>
    <el-button type="success" round @click="(isUpdated = false), (isShowDialog = true)">
      新增
    </el-button>
    <easy-table :table-params="tableParams">
      <template #hidden="{row}">
        <el-switch v-model="row.hidden" @change="updateHidden(row)"></el-switch>
      </template>
      <template #operation="{row}">
        <el-button
          type="text"
          @click="(isUpdated = isShowDialog = true), (dialogFormParams.data = { ...row })"
        >
          编辑
        </el-button>
        <el-button type="text" @click="remove(row)">
          删除
        </el-button>
      </template>
    </easy-table>
    <el-dialog
      :title="isUpdated ? '编辑' : '新增' + '资源'"
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
import permission from "@/api/authorizationManagement/permission";
import { generatePermissionCascaderOptions } from "@/views/authorizationManagement/index.js";

export default {
  name: "AuthorizationPermission",
  data() {
    return {
      isUpdated: false,
      isShowDialog: false,
      dialogFormParams: {
        data: {
          hidden: false,
        },
        formList: {
          pid: {
            label: "上级资源",
            type: "cascader",
            placeholder: "请选择上级资源",
            cascaderOptions: [],
            props: { checkStrictly: true, emitPath: false },
          },
          name: { label: "资源名称", type: "text", placeholder: "请输入资源名称" },
        },
        labelWidth: "80px",
      },
      tableParams: {
        loading: false,
        data: [],
        rowKey: "id",
        columnProps: [
          { label: "编号", prop: "id" },
          { label: "资源名称", prop: "name" },
          { label: "操作", slots: { default: "operation" } },
        ],
        align: "left",
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      this.tableParams.loading = true;
      const result = await permission.list();
      this.tableParams.loading = false;
      this.tableParams.data = result;
      // 形成上级菜单需要的格式数据
      this.dialogFormParams.formList.pid.cascaderOptions = generatePermissionCascaderOptions(
        result
      );
    },
    async submit() {
      const data = { ...this.dialogFormParams.data };
      if (this.isUpdated) {
        await permission.update(data);
      } else {
        await permission.create(data);
      }
      this.isShowDialog = false;
      this.getList();
    },
    async remove(row) {
      const data = { ids: [row.id] };
      await permission.remove(data);
      this.getList();
    },
    updateHidden(row) {
      permission.update({ ...row });
    },
    closeDialog() {
      this.dialogFormParams.data = { hidden: false };
    },
  },
};
</script>

<style></style>
