<script setup lang="tsx" name="useProTable">
import { EditPen, Refresh } from "@element-plus/icons-vue";

// import ImportExcel from "@/components/ImportExcel/index.vue";
import { User } from "@/api/interface";
import {
  findByPageConditionByDeviceId,
  geoToAddress,
  getDeptList,
  getLastPoint,
  getSumByYear,
  savePrecisionWork,
  syncDeviceInfo,
  updateAllowPay,
  updateEndDate
} from "@/api/ns";
import ProTable from "@/components/ProTable/index.vue";
import { ColumnProps } from "@/components/ProTable/interface";
import { barndOptions, commonBoolean } from "@/utils/dict";
import { ElMessage } from "element-plus";
import HdDrawer from "./components/hd-drawer.vue";
import HdUpdateNumberDrawer from "./components/hd-update-number.vue";

// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const proTable = ref();

const columns: ColumnProps<User.ResUserList>[] = [
  // { type: "selection", fixed: "left", width: 80 },
  // { type: "index", label: "#", width: 80 },
  { type: "expand", label: "Expand", width: 100 },
  // 多级 prop
  {
    prop: "deviceId",
    label: "deviceId",
    sortable: true,
    search: { el: "input" }
  },
  { prop: "userName", label: "userName" },
  { prop: "brand", label: "brand", enum: barndOptions },
  {
    prop: "allowPay",
    label: "allowPay",
    width: 130
  },
  { prop: "serviceCharge", label: "serviceCharge" },
  {
    prop: "audit",
    label: "是否补录",
    enum: commonBoolean,
    search: { el: "select", props: { filterable: true } }
  },
  { prop: "createTime", label: "createTime" },
  { prop: "updateTime", label: "updateTime" },
  { prop: "userMobile", label: "userMobile" },

  {
    prop: "operation",
    label: "操作",
    fixed: "right",
    width: 250
  }
];
// 如果表格需要初始化请求参数，直接定义传给 ProTable(之后每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据)
const initParam = { type: 1 };

const dataCallback = data => {
  return {
    list: data.records.map(item => ({
      ...item,
      allowPay: item.allowPay ? true : false
    })),
    total: data.total
  };
};

// 打开 drawer(新增、查看、编辑)
const HdDrawerRef = ref<InstanceType<typeof HdDrawer> | null>(null);
const HdUpdateNumberDrawerRef = ref<InstanceType<
  typeof HdUpdateNumberDrawer
> | null>(null);
// const drawerRef = ref(null);
const openDrawer = (title: string, rowData = {}) => {
  const params = {
    title,
    isView: title === "查看",
    rowData: { ...rowData },
    api: title === "新增" ? add : title === "编辑" ? edit : undefined,
    getTableList: proTable.value.getTableList
  };
  HdDrawerRef.value?.acceptParams(params);
};

const openUpdateNum = (title, rowData = {}) => {
  const params = {
    title,
    isView: false,
    rowData: { ...rowData },
    api: updateEndDate,
    getTableList: proTable.value.getTableList
  };
  console.log(params);
  HdUpdateNumberDrawerRef.value?.acceptParams(params);
};

const add = async () => {};

const edit = async row => {
  console.log("🚀 ~ file: index.vue:60 ~ edit ~ row:", row);
  row.ownerName = row.userName;
  row.ownerPhone = row.userMobile;
  await savePrecisionWork(row);
};

const expandChange = row => {
  console.log(
    "🚀 ~ file: index.vue:53 ~ expandChange ~ row, expandedRows, expanded:",
    row
  );
  row.bb = 22;
};

const checkPack = async row => {
  const { rows } = (await findByPageConditionByDeviceId(row.deviceId)) as any;
  // console.log(data);
  row.packList = rows;
};
const getHistoryArea = async row => {
  const data = await getSumByYear(row.deviceId);
  row.areaList = data || [];
};

const getPointInfo = async row => {
  const data = (await getLastPoint(row.deviceId)) as any;
  console.log("🚀 ~ file: index.vue:102 ~ getPointInfo ~ data:", data);
  row.pointInfo = data[0];
  if (data[0]) {
    const [a, b] = data[0].coordinates.split(",");

    const temp = await geoToAddress(a, b);
    console.log(temp);
    row.pointInfoAddress = JSON.stringify(temp);
  }
};

const boolChange = async (v, row) => {
  if (row.allowPay === null) return;
  try {
    await updateAllowPay({ enable: v, id: row.id });
    ElMessage.success("操作成功");
    proTable.value.getTableList();
  } catch (error) {
    ElMessage.error(error);
  }
};

// 同步
// deviceIds
const synca = async row => {
  try {
    await syncDeviceInfo({ deviceIds: [row.deviceId] });
    ElMessage.success("同步成功!");
    proTable.value.getTableList();
  } catch (error) {
    ElMessage.error(error);
  }
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
      :requestApi="getDeptList"
      :initParam="initParam"
      :dataCallback="dataCallback"
      @expand-change="expandChange"
    >
      <!-- Expand -->
      <template #expand="scope">
        <div class="p-5">
          <el-divider>查看设备{{ scope.row.deviceId }}历史作业面积</el-divider>
          <el-button @click="getHistoryArea(scope.row)"
            >获取历史作业面积</el-button
          >
          <el-table
            style="margin-right: 20px; margin-top: 10px"
            :data="scope.row.areaList"
            border
          >
            <el-table-column prop="year" label="year " />
            <!-- <el-table-column prop="areaVaildCount" label="areaVaildCount " /> -->
            <el-table-column prop="total_area" label="total_area" />
          </el-table>

          <el-divider>查看设备{{ scope.row.deviceId }}打包信息</el-divider>
          <el-button @click="checkPack(scope.row)">获取打包信息</el-button>
          <el-table
            style="margin-right: 20px; margin-top: 10px"
            :data="scope.row.packList"
            border
          >
            <el-table-column prop="serialId" label="包号 " width="220" />
            <el-table-column prop="content" label="打包内容" />
            <el-table-column prop="opTime" label="打包时间" />
          </el-table>
          <el-divider
            >查看设备{{ scope.row.deviceId }}最后一次上点信息</el-divider
          >
          <el-button @click="getPointInfo(scope.row)">获取上点信息</el-button>
          <p>{{ scope.row.pointInfo }}</p>
          反查地址：
          <p>{{ scope.row.pointInfoAddress }}</p>
        </div>
      </template>
      <template #payed="{ row }">
        {{ row.payed ? "是" : "否" }}
      </template>
      <template #audit="{ row }">
        {{ row.audit ? "是" : "否" }}
      </template>
      <template #allowPay="scope">
        <el-switch
          @change="v => boolChange(v, scope.row)"
          v-model="scope.row.allowPay"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-text="是"
          inactive-text="否"
        />
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <!-- <el-button
          type="primary"
          link
          :icon="View"
          @click="openDrawer('查看', scope.row)"
          >查看</el-button
        > -->
        <el-button
          type="primary"
          link
          @click="openUpdateNum('更新日期', scope.row)"
          >更新日期</el-button
        >
        <el-button type="primary" link :icon="Refresh" @click="synca(scope.row)"
          >同步</el-button
        >
        <el-button
          v-if="!scope.row.audit"
          type="primary"
          link
          :icon="EditPen"
          @click="openDrawer('编辑', scope.row)"
          >补录</el-button
        >
        <el-button
          v-if="scope.row.audit"
          type="primary"
          link
          :icon="EditPen"
          @click="openDrawer('编辑', scope.row)"
          >更新补录</el-button
        >
      </template>
    </ProTable>
    <HdDrawer ref="HdDrawerRef" />
    <HdUpdateNumberDrawer ref="HdUpdateNumberDrawerRef" />
    <!-- <ImportExcel ref="dialogRef" /> -->
  </div>
</template>
