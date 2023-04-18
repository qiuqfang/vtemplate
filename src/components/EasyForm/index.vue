<template>
  <el-form
    v-loading="formParams.loading"
    ref="easy-form"
    :model="formParams.data"
    :rules="formParams.rules"
    :inline="formParams.inline"
    :label-position="formParams.labelPosition"
    :label-width="formParams.labelWidth"
    :label-suffix="formParams.labelSuffix"
    :hide-required-asterisk="formParams.hideRequiredAsterisk"
    :show-message="formParams.showMessage"
    :inline-message="formParams.inlineMessage"
    :status-icon="formParams.statusIcon"
    :validate-on-rule-change="formParams.validateOnRuleChange"
    :size="formParams.size"
    :disabled="formParams.disabled"
  >
    <template v-for="(itemForm, key) in formParams.formList">
      <el-form-item
        :key="key"
        :prop="key"
        :label="itemForm.label"
        :label-width="itemForm.labelWidth"
        v-if="setDefaultProp(itemForm.isShow, true)"
        :style="itemForm.style"
      >
        <el-radio-group v-if="itemForm.type === 'radio'" v-model="formParams.data[key]">
          <el-radio
            v-for="(radioOption, index) in itemForm.radioOptions"
            :key="index"
            :label="radioOption.value"
          >
            {{ radioOption.text }}
          </el-radio>
        </el-radio-group>
        <el-checkbox-group v-if="itemForm.type === 'checkbox'" v-model="formParams.data[key]">
          <el-checkbox
            v-for="(checkboxOption, index) in itemForm.checkboxOptions"
            :key="index"
            :label="checkboxOption"
          ></el-checkbox>
        </el-checkbox-group>
        <el-input
          v-if="['text', 'textarea'].includes(itemForm.type)"
          :type="itemForm.type"
          v-model="formParams.data[key]"
          :placeholder="itemForm.placeholder"
          :disabled="itemForm.disabled"
          :rows="itemForm.rows"
          clearable
          :show-password="itemForm.isPassword"
        >
          <template v-if="itemForm.append" #append>
            {{ itemForm.append }}
          </template>
        </el-input>
        <el-input-number
          v-if="itemForm.type === 'input-number'"
          v-model="formParams.data[key]"
        ></el-input-number>
        <el-select
          v-if="itemForm.type === 'select'"
          v-model="formParams.data[key]"
          :multiple="itemForm.multiple"
          :disabled="itemForm.disabled"
          :clearable="setDefaultProp(itemForm.clearable, true)"
          :placeholder="itemForm.placeholder"
          filterable
          :collapse-tags="itemForm.collapseTags"
          :allow-create="itemForm.allowCreate"
          :style="itemForm.selectStyle"
          @change="
            (e) => {
              $emit('select-change', e, itemForm.change);
            }
          "
        >
          <template v-if="itemForm.selectOptions[0] && itemForm.selectOptions[0].options">
            <el-option-group
              v-for="selectOption in itemForm.selectOptions"
              :key="selectOption.label"
              :label="selectOption.label"
            >
              <el-option
                v-for="item in selectOption.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-option-group>
          </template>
          <template v-else>
            <el-option
              v-for="(selectOption, index) in itemForm.selectOptions"
              :key="index"
              :label="selectOption.label"
              :value="selectOption.value"
            ></el-option>
          </template>
        </el-select>
        <el-cascader
          v-if="itemForm.type === 'cascader'"
          v-model="formParams.data[key]"
          :options="itemForm.cascaderOptions"
          :placeholder="itemForm.placeholder"
          clearable
          filterable
        ></el-cascader>
        <el-switch
          v-if="itemForm.type === 'switch'"
          v-model="formParams.data[key]"
          :active-text="itemForm.activeText"
          :inactive-text="itemForm.inactiveText"
        ></el-switch>
        <el-slider v-if="itemForm.type === 'slider'" v-model="formParams.data[key]"></el-slider>
        <el-time-select
          v-if="itemForm.type === 'time-select'"
          v-model="formParams.data[key]"
          :placeholder="itemForm.placeholder"
        ></el-time-select>
        <el-time-picker
          v-if="itemForm.type === 'time-picker'"
          v-model="formParams.data[key]"
          :placeholder="itemForm.placeholder"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          :is-range="itemForm.isRange"
          :value-format="formParams.valueFormat"
        ></el-time-picker>
        <el-date-picker
          v-if="itemForm.type === 'date-picker'"
          v-model="formParams.data[key]"
          :placeholder="itemForm.placeholder"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :type="itemForm.mold"
          :value-format="itemForm.valueFormat"
          :default-time="itemForm.defaultTime"
        ></el-date-picker>
        <el-upload
          v-if="itemForm.type === 'upload'"
          :action="itemForm.action"
          :list-type="itemForm.listType"
          :file-list="itemForm.fileList"
          :http-request="itemForm.httpRequest"
          :limit="itemForm.limit"
        >
          <i v-if="itemForm.listType === 'picture-card'" class="el-icon-plus"></i>
        </el-upload>
        <el-rate v-if="itemForm.type === 'rate'" v-model="formParams.data[key]"></el-rate>
        <el-color-picker
          v-if="itemForm.type === 'color-picker'"
          v-model="formParams.data[key]"
        ></el-color-picker>
        <el-transfer
          v-if="itemForm.type === 'transfer'"
          v-model="formParams.data[key]"
          :data="itemForm.transferData"
        ></el-transfer>
      </el-form-item>
    </template>
    <slot name="buttonGroup"></slot>
  </el-form>
</template>

<script>
export default {
  name: "EasyForm",
  props: {
    formParams: {
      type: Object,
      required: true,
    },
  },
  methods: {
    validate(callback) {
      this.$refs["easy-form"].validate(callback);
    },
    resetFields() {
      this.$refs["easy-form"].resetFields();
    },
    setDefaultProp(value, defaultValue) {
      return value === void 0 ? defaultValue : value;
    },
  },
};
</script>

<style scoped>
.el-select,
.el-cascader,
.el-time-select,
.el-time-picker,
.el-date-picker {
  width: 100%;
}
</style>
