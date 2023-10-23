<script setup lang="ts" name="UserDrawer">
import { User } from "@/api/interface";
import { barndOptions } from "@/utils/dict";
import { ElMessage, FormInstance } from "element-plus";
import { reactive, ref } from "vue";

const rules = reactive({
  installDate: [{ required: true }],
  endDate: [{ required: true }],
  brand: [{ required: true }],
  userMobile: [{ required: true }],
  userName: [{ required: true }]
});

interface DrawerProps {
  title: string;
  isView: boolean;
  rowData: Partial<
    User.ResUserList & {
      installDate: number | string;
      endDate: number | string;
      brand: number | string;
      userMobile: number | string;
      userName: number | string;
    }
  >;
  api?: (params: any) => Promise<any>;
  getTableList?: () => void;
}

const drawerVisible = ref(false);
const drawerProps = ref<DrawerProps>({
  isView: false,
  title: "",
  rowData: {}
});

// 接收父组件传过来的参数
const acceptParams = (params: DrawerProps) => {
  drawerProps.value = params;
  drawerVisible.value = true;
};

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>();
const handleSubmit = () => {
  ruleFormRef.value!.validate(async valid => {
    if (!valid) return;
    try {
      await drawerProps.value.api!(drawerProps.value.rowData);
      ElMessage.success({ message: `${drawerProps.value.title}成功！` });
      drawerProps.value.getTableList!();
      drawerVisible.value = false;
    } catch (error) {
      console.log(error);
    }
  });
};

onMounted(() => {});

defineExpose({
  acceptParams
});
</script>

<template>
  <el-drawer
    v-model="drawerVisible"
    :destroy-on-close="true"
    size="450px"
    :title="`${drawerProps.title}`"
  >
    <el-form
      ref="ruleFormRef"
      label-width="100px"
      label-suffix=" :"
      :rules="rules"
      :disabled="drawerProps.isView"
      :model="drawerProps.rowData"
      :hide-required-asterisk="drawerProps.isView"
    >
      <el-form-item label="名字" prop="userName">
        <el-input v-model="drawerProps.rowData!.userName" />
      </el-form-item>
      <el-form-item label="手机" prop="userMobile">
        <el-input v-model="drawerProps.rowData!.userMobile" />
      </el-form-item>
      <!-- <el-form-item label="选择单位" prop="deptId">
        <el-cascader
          :props="cascaderProp"
          filterable
          v-model="drawerProps.rowData!.deptId"
          clearable
        />
      </el-form-item> -->
      <el-form-item label="品牌" prop="brand">
        <el-select v-model="drawerProps.rowData!.brand" filterable>
          <el-option
            v-for="item in barndOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="安装日期" prop="installDate">
        <el-date-picker
          v-model="drawerProps.rowData!.installDate"
          type="date"
          placeholder="选择日期"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item label="到期日期" prop="endDate">
        <el-date-picker
          v-model="drawerProps.rowData!.endDate"
          type="date"
          placeholder="选择日期"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="drawerVisible = false">取消</el-button>
      <el-button
        type="primary"
        v-show="!drawerProps.isView"
        @click="handleSubmit"
        >确定</el-button
      >
    </template>
  </el-drawer>
</template>
