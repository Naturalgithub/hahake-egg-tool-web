<script setup lang="tsx" name="white">
import { LogItem, getWhiteList, saveWhite } from "@/api/ns";
import ProTable from "@/components/ProTable/index.vue";
import { ColumnProps } from "@/components/ProTable/interface";
import { commonBoolean } from "@/utils/dict";
import { ElMessage } from "element-plus";
// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const proTable = ref();

// {
//   prop: "payed",
//   label: "是否支付",
//   enum: commonBoolean,
//   search: { el: "select", props: { filterable: true } }
// },

const columns: ColumnProps<LogItem>[] = [
  {
    prop: "deviceId",
    label: "deviceId",
    search: { el: "input" },
    // 这里我很满意
    render: scoped => {
      return <>{scoped.row.deviceId}</>;
    }
  },
  {
    prop: "enable",
    label: "enable",
    fixed: "right",
    enum: commonBoolean,
    search: { el: "select", props: { filterable: true } }
  }
];
// 如果表格需要初始化请求参数，直接定义传给 ProTable(之后每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据)
const initParam = { type: 1 };

const dataCallback = data => {
  return {
    list: data.records,
    total: data.total
  };
};

const boolChange = async row => {
  console.log(row);

  try {
    await saveWhite({ enable: row.enable, deviceId: row.deviceId });
    ElMessage.success("操作成功");
  } catch (error) {
    ElMessage.error(error);
  } finally {
    proTable.value.getTableList();
  }
};
</script>

<template>
  <div class="table-box main">
    <ProTable
      ref="proTable"
      title="白名单列表"
      :columns="columns"
      highlight-current-row
      rowKey="id"
      :requestApi="getWhiteList"
      :initParam="initParam"
      :dataCallback="dataCallback"
    >
      <template #expand="scope">
        {{ scope.row }}
      </template>
      <template #enable="scope">
        <el-switch
          @change="boolChange(scope.row)"
          v-model="scope.row.enable"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-text="是"
          inactive-text="否"
        />
      </template>
    </ProTable>
  </div>
</template>
