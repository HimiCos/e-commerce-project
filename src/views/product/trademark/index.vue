<template>
  <div>
    <el-card class="box-card" shadow="hover">
      <!-- 卡片顶部的添加按钮 -->
      <el-button type="primary" icon="Plus" @click="addTrademark">添加品牌</el-button>
      <!-- 表格组件 -->
      <el-table style="margin: 20px 0;" border :data="trademarkArr">
        <el-table-column label="序号" width="80px" align="center">
          <template #="{row}">
            <div>{{ row.id }}</div>
          </template>
        </el-table-column>
        <el-table-column label="品牌名称" align="center">
          <template #="{row}">
            <div style="height: 100px; display: flex; align-items: center; justify-content: center;">{{ row.tmName }}</div>
          </template>
        </el-table-column>
        <el-table-column label="品牌LOGO" align="center">
          <template #="{row}">
            <img :src="row.logoUrl" style="width: 100px;" onerror="this.src='http://39.98.123.211/group1/M00/03/D9/rBHu8mHmKC6AQ-j2AAAb72A3EO0942.jpg'" />
          </template>
        </el-table-column>
        <el-table-column label="品牌操作" align="center">
          <template #='{row}'>
            <el-button type="warning" icon="edit" @click="updateTrademark(row)"></el-button>
            <el-popconfirm :title="`是否要删除${row.tmName}品牌呢？`" width="230px" icon="Warning" @confirm="deleteTrademark(row)">
              <template #reference>
                <el-button type="danger" icon="delete"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 底部分页器 -->
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="limit"
        :page-sizes="[3, 5, 7, 9]"
        :background="true"
        layout="prev, pager, next, jumper, ->, sizes, total"
        :total="total"
        @current-change="getHasTrademark"
        @size-change="changeSize"
      />
    </el-card>
    <!-- 对话框组件 -->
    <el-dialog v-model="dialogFormVisible" :title="dialogTitle" style="width: 450px; border-radius: 10px;">
      <el-form style="margin-left: 50px;" :model="trademarkParams" :rules="rules" ref="formRef">
        <el-form-item label="品牌名称" style="width: 216px;" prop="tmName">
          <el-input placeholder="请输入品牌的名称" v-model="trademarkParams.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌标识" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="changeDialogFormVisible">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
// 引入 ref
import { ref, onMounted, reactive, computed, watch } from 'vue';
// 引入接口
import { reqHasTrademark, reqAddOrUpdateTrademark, reqDeleteTrademark } from '@/api/product/trademark';
// 引入接口返回的数据类型
import type { Records, TradeMarkResponseData, TradeMark } from '@/api/product/trademark/type'
// 引入 element-plus 的 message 组件
// @ts-ignore
import type { UploadProps } from 'element-plus'
// @ts-ignore
import { ElMessage } from 'element-plus'
// 引入localStorage.ts
import { Set_localStorage, Get_localStorage } from '@/utils/localStorage'

// 从 localStorage 中获取当前页码
let pageNo = ref(parseInt(Get_localStorage('trademarkPageNo') as string))
// 每页显示条数
let limit = ref<number>(3);
// 存储已有品牌的数据
let trademarkArr = ref<Records>([]);
// 存储已有品牌的总条数
let total = ref<number>(0);
// 对话框是否显示
let dialogFormVisible = ref<boolean>(false);
// 定义收集新增品牌的数据
let trademarkParams = reactive<TradeMark>({
  tmName: '',
  logoUrl: ''
});
// 获取form表单的实例对象
let formRef = ref();

// 获取已有品牌的接口封装成一个函数
const getHasTrademark = async (pager=1) => {
  // 当前页面的页码
  pageNo.value = pager;
  // 调用接口
  let result:TradeMarkResponseData = await reqHasTrademark(pageNo.value, limit.value);
  if(result.code == 200){
    // 将数据存储到 hasTrademarkList 中
    trademarkArr.value = result.data.records;
    // 将总条数存储到 total 中
    total.value = result.data.total;
  }
};
// 当每页显示条数改变时触发
const changeSize = () => {
  getHasTrademark()
}
// 对话框标题(计算属性)
const dialogTitle = computed(() => trademarkParams.id ? '修改品牌' : '添加品牌')
// 添加品牌按钮的回调
const addTrademark = () => {
  // 开启对话框
  dialogFormVisible.value = true;
  // 清空残留的信息
  trademarkParams.tmName = ''
  trademarkParams.logoUrl = ''
  delete trademarkParams.id
  // 用ts中的?来判断form组件是否存在
  formRef.value?.clearValidate()
  // 用nextTick来解决表单未加载完就清空表单验证的问题
  // nextTick(() => {
  //   formRef.value.clearValidate()
  // })
}
// 修改品牌按钮的回调
const updateTrademark = (row:TradeMark) => {
  // 清空表单验证残留的信息
  formRef.value?.clearValidate()
  // 开启对话框
  dialogFormVisible.value = true;
  // 将当前行的数据赋值给trademarkParams
  Object.assign(trademarkParams, row)
}
// 关闭对话框的回调
const changeDialogFormVisible = () => {
  dialogFormVisible.value = false;
}
// 上传图片之前触发的回调
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile:any) => {
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png' && rawFile.type !== 'image/jif') {
    ElMessage.error('品牌标识必须是JPG/PNG/GIF格式')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('品牌标识大小不能超过2MB')
    return false
  }
  return true
}
// 图片上传成功的回调
const handleAvatarSuccess: UploadProps['onSuccess'] = (response:any) => {  
  trademarkParams.logoUrl = response.data
  // 上传成功后，清除表单校验的错误信息
  formRef.value.clearValidate("logoUrl")
}
// 确定按钮的回调
const handleConfirm = async () => {
  try{
    // 表单校验
    await formRef.value.validate()
    // 调用接口发送请求
    let result = await reqAddOrUpdateTrademark(trademarkParams)
    // 判断是否成功
    if(result.code == 200){
      // 关闭对话框
      changeDialogFormVisible()
      // 提示成功
      ElMessage.success(dialogTitle.value+'成功')
      // 重新获取数据（有id就跳转当前页 没id就跳转最后一页）
      getHasTrademark(trademarkParams.id ? pageNo.value : Math.floor(total.value/limit.value)+1)
    }else{
      // 关闭对话框
      changeDialogFormVisible()
      // 提示失败
      ElMessage.error(dialogTitle.value+'失败')
    }
  }catch(error){}
}
// 监视当前页码的变化
watch(pageNo, (newPageNo) => {
  // 将当前页码存储到 localStorage 中
  Set_localStorage('trademarkPageNo', newPageNo)
})
// 挂载完成时调用
onMounted(() => {
  // 获取已有品牌的数据（并跳转到localStorage中的页面值处）
  getHasTrademark(pageNo.value);
});
// 表单校验的规则对象
const rules = {
  tmName: [
    { min: 2, max: 15, message: '品牌名称至少两个字符', trigger: 'blur'},
    { required: true, message: '请输入品牌名称', trigger: 'blur' },
  ],
  logoUrl: [
    { required: true, message: '请上传品牌标识', trigger: 'blur' },
  ]
}
// 气泡确认框确认按钮的回调
const deleteTrademark = async (row:TradeMark) => {
  // 调用接口删除请求
  let result = await reqDeleteTrademark(row.id as number)
  // 判断是否成功
  if(result.code == 200){
    // 提示成功
    ElMessage.success('删除成功')
    // 重新获取数据（有id就跳转当前页 没id就跳转最后一页）
    getHasTrademark(pageNo.value)
  }else{
    // 提示失败
    ElMessage.error('删除失败')
  }
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 135px;
  height: 135px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 135px;
  height: 135px;
  text-align: center;
}
</style>
