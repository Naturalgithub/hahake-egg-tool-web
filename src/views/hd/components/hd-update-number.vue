<script setup lang="ts" name="HdUpdateNumberDrawerRef">
import { User } from "@/api/interface";
import { getNavInfo } from "@/api/ns";
import { ElMessage, FormInstance } from "element-plus";
import { reactive, ref } from "vue";

const rules = reactive({
  increaseDay: [{ required: true }]
});

interface DrawerProps {
  title: string;
  isView: boolean;
  rowData: Partial<
    User.ResUserList & {
      increaseDay: number | string;
    }
  >;
  api?: (params: any) => Promise<any>;
  getTableList?: () => void;
}

const drawerVisible = ref(false);
const drawerProps = ref<DrawerProps>({
  isView: false,
  title: "更新日期",
  rowData: {}
});

const endDate = ref("");

// 接收父组件传过来的参数
const acceptParams = async (params: DrawerProps) => {
  try {
    const { data } = await getNavInfo(params.rowData);
    endDate.value = data.endDate;
  } catch (error) {
    ElMessage.error({ message: `${error}` });
  }

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
      <el-form-item label="EndDate" prop="endDate">
        {{ endDate }}
      </el-form-item>
      <el-form-item label="添加日期" prop="increaseDay">
        <el-input v-model="drawerProps.rowData!.increaseDay" />
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
