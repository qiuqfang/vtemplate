<template>
  <div class="recursion_table">
    <template v-for="item in columnProps">
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
  </div>
</template>

<script>
import RecursionTable from "./RecursionTable";
export default {
  name: "RecursionTable",
  components: {
    RecursionTable,
  },
  inject: ["setDefaultProp"],
  props: {
    columnProps: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style></style>
