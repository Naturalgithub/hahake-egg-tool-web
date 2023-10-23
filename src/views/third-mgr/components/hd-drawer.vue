<script setup lang="ts" name="UserDrawer">
import { ElMessage, FormInstance } from "element-plus";
import { reactive, ref } from "vue";

const rules = reactive({
  id: [{ required: true }]
});
const options = ref();

interface DrawerProps {
  title: string;
  isView: boolean;
  rowData: Partial<any>;
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
      label-width="110px"
      label-suffix=" :"
      :rules="rules"
      :disabled="drawerProps.isView"
      :model="drawerProps.rowData"
      :hide-required-asterisk="drawerProps.isView"
    >
      <el-form-item label="name" prop="name">
        <el-input v-model="drawerProps.rowData!.name" />
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
