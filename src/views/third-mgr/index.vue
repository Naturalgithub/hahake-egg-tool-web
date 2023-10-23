<script setup lang="tsx" name="white">
import { LogItem, getWhiteList } from "@/api/ns";
import ProTable from "@/components/ProTable/index.vue";
import { ColumnProps } from "@/components/ProTable/interface";
import { commonBoolean } from "@/utils/dict";
import { CirclePlus, Delete, EditPen } from "@element-plus/icons-vue";
import HdDrawer from "./components/hd-drawer.vue";

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
    prop: "enable",
    label: "name",
    fixed: "right",
    enum: commonBoolean,
    search: { el: "select", props: { filterable: true } }
  },
  { prop: "operation", label: "操作", fixed: "right", width: 260 }
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
  const params: any = {
    title,
    isView: title === "查看",
    rowData: { ...rowData },
    api: title === "新增" ? 123 : title === "编辑" ? 123 : undefined,
    getTableList: proTable.value.getTableList
  };
  HdDrawerRef.value?.acceptParams(params);
};

// const edit = async row => {
//   row.ownerName = row.userName;
//   row.ownerPhone = row.userMobile;
//   await savePrecisionWork(row);
// };

// 删除
const tableDelete = async (params: any) => {
  // await useHandleData(deleteFactory, { id: params.id }, `删除成功`);
  proTable.value.getTableList();
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
      <template #operation="scope">
        <el-button
          type="primary"
          link
          :icon="EditPen"
          @click="openDrawer('编辑', scope.row)"
          >编辑</el-button
        >
        <el-button
          type="primary"
          link
          :icon="Delete"
          @click="tableDelete(scope.row)"
          >删除</el-button
        >
      </template>
    </ProTable>
    <HdDrawer ref="HdDrawerRef" />
  </div>
</template>
