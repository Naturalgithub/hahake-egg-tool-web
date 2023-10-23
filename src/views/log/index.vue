<script setup lang="tsx" name="log">
import { LogItem, getRequestLog } from "@/api/ns";
import ProTable from "@/components/ProTable/index.vue";
import { ColumnProps } from "@/components/ProTable/interface";

// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const proTable = ref();

const columns: ColumnProps<LogItem>[] = [
  { type: "expand", label: "Expand", width: 100 },
  {
    prop: "deviceId",
    label: "deviceId",
    search: { el: "input" },
    // 这里我很满意
    render: scoped => {
      return <>{scoped.row.deviceId}</>;
    }
  },
  { prop: "createTime", label: "createTime" },
  { prop: "duration", label: "duration" },
  { prop: "requestIp", label: "requestIp" },
  { prop: "requestParam", label: "requestParam" },
  { prop: "requestUrl", label: "requestUrl" },
  { prop: "responseResult", label: "responseResult" }
];
// 如果表格需要初始化请求参数，直接定义传给 ProTable(之后`每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据)
const initParam = { type: 1 };

const dataCallback = data => {
  return {
    list: data.records,
    total: data.total
  };
};
</script>

<template>
  <div class="table-box main">
    <ProTable
      ref="proTable"
      title="用户列表"
      :columns="columns"
      highlight-current-row
      rowKey="id"
      :requestApi="getRequestLog"
      :initParam="initParam"
      :dataCallback="dataCallback"
    >
      <template #expand="scope">
        {{ scope.row }}
      </template>
    </ProTable>
  </div>
</template>
