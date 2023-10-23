<script setup lang="tsx" name="white">
import {
  LogItem,
  getRelationDevicePlatform,
  saveRelationDevicePlatform,
  updateRelationDevicePlatform
} from "@/api/ns";
import ProTable from "@/components/ProTable/index.vue";
import { ColumnProps } from "@/components/ProTable/interface";
import { platforms } from "@/utils/dict";
import { CirclePlus, EditPen } from "@element-plus/icons-vue";
import HdDrawer from "./components/hd-drawer.vue";

// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const proTable = ref();

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
    prop: "platforms",
    label: "platforms",
    enum: platforms
    // search: { el: "select", props: { filterable: true } }
  },
  {
    prop: "updateTime",
    label: "updateTime"
  },
  { prop: "operation", label: "操作", fixed: "right", width: 100 }
];
// 如果表格需要初始化请求参数，直接定义传给 ProTable(之后每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据)
const initParam = { type: 1 };

const dataCallback = data => {
  return {
    list: data.records,
    total: data.total
  };
};

const HdDrawerRef = ref<InstanceType<typeof HdDrawer> | null>(null);
const openDrawer = (title: string, rowData = {}) => {
  const params = {
    title,
    isView: title === "查看",
    rowData: { ...rowData },
    api:
      title === "新增"
        ? saveRelationDevicePlatform
        : title === "编辑"
        ? updateRelationDevicePlatform
        : undefined,
    getTableList: proTable.value.getTableList
  };
  HdDrawerRef.value?.acceptParams(params);
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
      :requestApi="getRelationDevicePlatform"
      :initParam="initParam"
      :dataCallback="dataCallback"
    >
      <template #tableHeader>
        <el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')"
          >新增</el-button
        >
      </template>
      <template #expand="scope">
        {{ scope.row }}
      </template>
      <template #enable="scope">
        {{ scope.row }}
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button
          type="primary"
          link
          :icon="EditPen"
          @click="openDrawer('编辑', scope.row)"
          >编辑</el-button
        >
      </template>
    </ProTable>

    <HdDrawer ref="HdDrawerRef" />
  </div>
</template>
