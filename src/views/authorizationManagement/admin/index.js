import { parseTime } from "@/utils";

export const defaultFormParams = {
  data: {},
  formList: {
    keyword: { label: "昵称/账号", type: "text", placeholder: "请输入昵称/账号" },
  },
  labelWidth: "80px",
  inline: true,
};

export const defaultTableParams = {
  loading: false,
  data: [],
  columnProps: [
    { label: "编号", prop: "id" },
    { label: "昵称", prop: "nickName" },
    { label: "账号", prop: "username" },
    {
      label: "登录时间",
      prop: "loginTime",
      formatter: (a, b, c) => {
        return parseTime(c);
      },
    },
    { label: "状态", prop: "status", slots: { default: "status" } },
    { label: "操作", slots: { default: "operation" } },
  ],
};

export const defaultDialogFormParams = {
  data: {},
  formList: {
    username: {
      label: "账号",
      type: "text",
      placeholder: "请输入账号",
    },
    password: {
      label: "密码",
      type: "text",
      placeholder: "请输入密码",
      isPassword: true,
    },
    nickName: { label: "昵称", type: "text", placeholder: "请输入昵称" },
    // avatar: {},
    roles: {
      label: "角色",
      type: "select",
      placeholder: "请选择角色",
      multiple: true,
      selectOptions: [],
    },
    status: {
      label: "状态",
      type: "radio",
      radioOptions: [
        { text: "启用", value: true },
        { text: "禁用", value: false },
      ],
      isShow: false,
    },
  },
  labelWidth: "80px",
};
