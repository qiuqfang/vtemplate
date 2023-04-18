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
      :title="isUpdated ? '编辑' : '新增' + '菜单'"
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
import menu from "@/api/authorizationManagement/menu";
import { generateMenuCascaderOptions } from "@/views/authorizationManagement/index.js";

export default {
  name: "AuthorizationMenu",
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
            label: "上级菜单",
            type: "cascader",
            placeholder: "请选择上级菜单",
            cascaderOptions: [],
            props: { checkStrictly: true, emitPath: false },
          },
          title: { label: "菜单名称", type: "text", placeholder: "请输入菜单名称" },
          path: { label: "菜单路径", type: "text", placeholder: "请输入菜单路径" },
          hidden: {
            label: "是否隐藏",
            type: "radio",
            radioOptions: [
              { text: "显示", value: false },
              { text: "隐藏", value: true },
            ],
          },
        },
        labelWidth: "80px",
      },
      tableParams: {
        loading: false,
        data: [],
        rowKey: "id",
        columnProps: [
          { label: "编号", prop: "id" },
          { label: "菜单名称", prop: "title" },
          { label: "菜单路径", prop: "path" },
          { label: "是否隐藏", prop: "hidden", slots: { default: "hidden" } },
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
      const result = await menu.list();
      this.tableParams.loading = false;
      this.tableParams.data = result;
      // 形成上级菜单需要的格式数据
      this.dialogFormParams.formList.pid.cascaderOptions = generateMenuCascaderOptions(result);
    },
    async submit() {
      const data = { ...this.dialogFormParams.data };
      if (this.isUpdated) {
        await menu.update(data);
      } else {
        await menu.create(data);
      }
      this.isShowDialog = false;
      this.getList();
    },
    async remove(row) {
      const data = { ids: [row.id] };
      await menu.remove(data);
      this.getList();
    },
    updateHidden(row) {
      menu.update({ ...row });
    },
    closeDialog() {
      this.dialogFormParams.data = { hidden: false };
    },
  },
};
</script>

<style></style>
