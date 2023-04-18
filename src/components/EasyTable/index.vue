<template>
  <el-table
    v-loading="tableParams.loading"
    :data="tableParams.data"
    :height="tableParams.height"
    :max-height="tableParams.maxHeight"
    :stripe="tableParams.stripe"
    :border="setDefaultProp(tableParams.border, false)"
    :size="tableParams.size"
    :fit="tableParams.fit || true"
    :show-header="setDefaultProp(tableParams.showHeader, true)"
    :highlight-current-row="setDefaultProp(tableParams.highlightCurrentRow, true)"
    :empty-text="tableParams.emptyText"
    :default-expand-all="tableParams.defaultExpandAll"
    :expand-row-keys="tableParams.expandRowKeys"
    :default-sort="tableParams.defaultSort"
    :tooltip-effect="tableParams.tooltipEffect"
    :show-summary="tableParams.showSummary"
    :sum-text="tableParams.sumText"
    :summary-method="tableParams.summaryMethod"
    :span-method="tableParams.spanMethod"
    :select-on-indeterminate="tableParams.selectOnIndeterminate"
    :indent="tableParams.indent"
    :lazy="tableParams.lazy"
    :load="tableParams.load"
    :tree-props="tableParams.treeProps"
    :header-cell-style="{ background: '#F5F7FA', color: '#555' }"
    :row-key="tableParams.rowKey"
    :row-style="tableParams.rowStyle"
    @row-click="
      (row) => {
        $emit('row-click', row);
      }
    "
  >
    <template v-if="typeof tableParams.emptyText === 'boolean'" #empty>
      <slot name="empty"></slot>
    </template>
    <template v-for="item in tableParams.columnProps">
      <el-table-column
        :label="item.label"
        v-if="setDefaultProp(item.isMerge, false)"
        :key="item.label"
        align="center"
        :label-class-name="item.labelClassName"
      >
        <recursion-table :columnProps="item.columnProps"></recursion-table>
      </el-table-column>
      <el-table-column
        v-else
        :key="item.label"
        :type="item.type"
        :align="setDefaultProp(item.align, 'center')"
        :label="item.label"
        :prop="item.prop"
        :width="item.width"
        :fixed="item.fixed"
        :formatter="item.formatter"
        :label-class-name="item.labelClassName"
      >
        <template v-if="item.slots && item.slots.header" #header="{ column, $index }">
          <slot :name="item.slots.header" :column="column" :index="$index"></slot>
        </template>
        <template v-if="item.slots && item.slots.default" #default="{ row, column, $index }">
          <slot :name="item.slots.default" :row="row" :column="column" :index="$index"></slot>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script>
import RecursionTable from "./RecursionTable";
export default {
  name: "EasyTable",
  components: {
    RecursionTable,
  },
  provide() {
    return {
      setDefaultProp: this.setDefaultProp,
    };
  },
  props: {
    tableParams: {
      type: Object,
      required: true,
    },
  },
  methods: {
    setDefaultProp(value, defaultValue) {
      // void expression return undefined(expression表达式)
      return value === void 0 ? defaultValue : value;
    },
  },
};
</script>

<style>
.label_table_merge_class {
  font-size: 20px;
  font-weight: bold;
}
</style>
