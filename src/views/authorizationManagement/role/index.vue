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
      :title="isUpdated ? '编辑' : '新增' + '角色'"
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
import role from "@/api/authorizationManagement/role";
import menu from "@/api/authorizationManagement/menu";
import permission from "@/api/authorizationManagement/permission";

import {
  generateMenuCascaderOptions,
  generatePermissionCascaderOptions,
} from "@/views/authorizationManagement/index.js";

export default {
  name: "AuthorizationRole",
  data() {
    return {
      isUpdated: false,
      isShowDialog: false,
      formParams: {
        data: {},
        formList: {
          keyword: { label: "角色名", type: "text", placeholder: "请输入角色名" },
        },
        labelWidth: "80px",
        inline: true,
      },
      tableParams: {
        loading: false,
        data: [],
        columnProps: [
          { label: "编号", prop: "id" },
          { label: "角色名", prop: "name" },
          { label: "数量", prop: "count" },
          { label: "操作", slots: { default: "operation" } },
        ],
      },
      dialogFormParams: {
        data: {},
        formList: {
          name: {
            label: "角色名",
            type: "text",
            placeholder: "请输入角色名",
          },
          menus: {
            label: "菜单",
            type: "cascader",
            placeholder: "请选择菜单",
            cascaderOptions: [],
            props: { multiple: true, emitPath: false },
          },
          permissions: {
            label: "资源",
            type: "cascader",
            placeholder: "请选择资源",
            cascaderOptions: [],
            props: { multiple: true, emitPath: false },
          },
        },
        labelWidth: "80px",
      },
    };
  },
  created() {
    this.getList();
    this.getMenuList();
    this.getPermissionList();
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
      const result = await role.list(data);
      this.tableParams.loading = false;
      console.log(result);
      this.tableParams.data = [];
      result.list.forEach((item) => {
        item.menus = item.menus.split(",");
        for (let i in item.menus) {
          item.menus[i] = +item.menus[i];
        }
        item.permissions = item.permissions.split(",");
        for (let i in item.permissions) {
          item.permissions[i] = +item.permissions[i];
        }
        this.tableParams.data.push(item);
      });
    },
    async getMenuList() {
      const result = await menu.getMenuByAdminId();
      // 形成上级菜单需要的格式数据
      this.dialogFormParams.formList.menus.cascaderOptions = generateMenuCascaderOptions(result);
    },
    async getPermissionList() {
      const result = await permission.getPermissionByAdminId();
      this.dialogFormParams.formList.permissions.cascaderOptions = generatePermissionCascaderOptions(
        result
      );
    },
    async submit() {
      const data = {
        ...this.dialogFormParams.data,
        menus: this.dialogFormParams.data.menus && this.dialogFormParams.data.menus.toString(),
        permissions:
          this.dialogFormParams.data.permissions &&
          this.dialogFormParams.data.permissions.toString(),
      };
      if (this.isUpdated) {
        await role.update(data);
      } else {
        await role.create(data);
      }
      this.isShowDialog = false;
      this.getList();
    },
    async remove(row) {
      const data = { ids: [row.id] };
      await role.remove(data);
      this.getList();
    },
    closeDialog() {
      this.dialogFormParams.data = {};
    },
  },
};
</script>

<style></style>
