<template>
  <div>
    <!-- 搜索卡片 -->
    <el-card style="height: 74px; margin-bottom: 10px" shadow="hover">
      <el-form class="form" :inline="true">
        <el-form-item label="用户名: ">
          <el-input
            placeholder="请你输入搜索的用户名"
            v-model="keyword"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getUserList()">搜索</el-button>
          <el-button type="danger" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 展示卡片 -->
    <el-card shadow="hover">
      <!-- 展示卡片：顶部两个按钮 -->
      <el-button type="primary" @click="addUser">添加</el-button>
      <el-button type="danger">批量删除</el-button>
      <!-- 展示卡片：中间表格 -->
      <el-table border style="margin: 10px 0" :data="userArr">
        <el-table-column type="selection" align="center" />
        <el-table-column label="#" type="index" align="center" />
        <el-table-column label="id" width="62px" align="center" prop="id" />
        <el-table-column
          label="用户名称"
          width="130px"
          align="center"
          prop="username"
          show-overflow-tooltip
        />
        <el-table-column
          label="用户昵称"
          width="84px"
          align="center"
          prop="name"
          show-overflow-tooltip
        />
        <el-table-column
          label="用户角色"
          width="84px"
          align="center"
          prop="roleName"
          show-overflow-tooltip
        />
        <el-table-column
          label="创建时间"
          width="125px"
          align="center"
          prop="createTime"
          show-overflow-tooltip
        />
        <el-table-column
          label="更新时间"
          width="130px"
          align="center"
          prop="updateTime"
          show-overflow-tooltip
        />
        <el-table-column
          label="操作"
          width="300px"
          align="center"
          fixed="right"
        >
          <template #="{ row }">
            <el-button type="warning" icon="User" size="small">
              分配角色
            </el-button>
            <el-button
              type="primary"
              icon="Edit"
              size="small"
              @click="updateUser(row)"
            >
              编辑
            </el-button>
            <el-button type="danger" icon="Delete" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 展示卡片：底部分页器 -->
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="categoryStore.limit"
        :page-sizes="[3, 5, 7, 9]"
        :background="true"
        layout="prev, pager, next, jumper, ->, sizes, total"
        :total="total"
        @current-change="getUserList(pageNo)"
        @size-change="getUserList()"
      />
    </el-card>
    <!-- 添加按钮对应的抽屉 -->
    <el-drawer
      v-model="drawer"
      :title="userParams.id ? '编辑用户' : '添加用户'"
    >
      <el-form :model="userParams" :rules="rules" ref="formRef">
        <!-- 用户名 收集 -->
        <el-form-item label="用户名称" prop="username">
          <el-input
            placeholder="请填写用户名称"
            v-model="userParams.username"
          ></el-input>
        </el-form-item>
        <!-- 用户昵称 收集 -->
        <el-form-item label="用户昵称" prop="name">
          <el-input
            placeholder="请填写用户昵称"
            v-model="userParams.name"
          ></el-input>
        </el-form-item>
        <!-- 用户密码 收集 -->
        <el-form-item label="用户密码" prop="password" v-if="!userParams.id">
          <el-input
            placeholder="请填写用户密码"
            v-model="userParams.password"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="save">确认</el-button>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
// 引入ref
import { ref, onMounted, reactive, nextTick } from 'vue'
// 引入商品分类相关的小仓库
import useCategoryStore from '@/store/modules/category'
// 引入用户相关的接口
import { reqUserInfo, reqAddOrUpdateUser } from '@/api/acl/user'
// 引入用户相关的ts类型
import type { UserResponseData, Records, User } from '@/api/acl/user/type'
// @ts-ignore
import { ElMessage } from 'element-plus'

// 控制分页器的页码
const pageNo = ref<number>(1)
// 控制分页器的总条数
const total = ref<number>(0)
// 获取商品分类相关的小仓库
const categoryStore = useCategoryStore()
// 控制用户列表的数组
const userArr = ref<Records>([])
// 定义响应式数据:收集用户输入进来的关键字
let keyword = ref<string>('')
// 控制抽屉的显示隐藏
const drawer = ref<boolean>(false)
//收集用户信息的响应式数据
let userParams = reactive<User>({
  username: '',
  name: '',
  password: '',
})
//获取form组件实例
let formRef = ref<any>()

// 组件挂载时
onMounted(() => {
  // 获取用户列表
  getUserList()
})
// 获取用户列表的方法
const getUserList = async (pager = 1) => {
  // 收集页码
  pageNo.value = pager
  // 获取用户列表
  let result: UserResponseData = await reqUserInfo(
    pageNo.value,
    categoryStore.limit,
    keyword.value,
  )
  if (result.code == 200) {
    total.value = result.data.total
    userArr.value = result.data.records
  }
}
// 重置按钮的回调
const reset = () => {
  keyword.value = ''
  getUserList()
}
// 添加按钮的回调
const addUser = () => {
  // 抽屉显示出来
  drawer.value = true
  // 清空数据
  Object.assign(userParams, {
    id: 0,
    username: '',
    name: '',
    password: '',
  })
  //清除上一次的错误的提示信息
  nextTick(() => {
    formRef.value.clearValidate()
  })
}
// 编辑按钮的回调
const updateUser = (row: User) => {
  // 抽屉显示出来
  drawer.value = true
  // 存储收集已有的账号信息
  Object.assign(userParams, row)
  //清除上一次的错误的提示信息
  nextTick(() => {
    formRef.value.clearValidate()
  })
}
// 保存按钮的回调
const save = async () => {
  //点击保存按钮的时候,务必需要保证表单全部符合条件在去发请求
  try {
    await formRef.value.validate()
  } catch {
    return
  }
  let result = await reqAddOrUpdateUser(userParams)
  if (result.code == 200) {
    ElMessage.success(userParams.id ? '更新成功' : '添加成功')
    // 关闭抽屉
    drawer.value = false
    // 重新获取用户列表
    getUserList()
  } else {
    ElMessage.error(userParams.id ? '更新失败' : '添加失败')
  }
}
// 取消按钮的回调
const cancel = () => {
  // 关闭抽屉
  drawer.value = false
}
//校验用户名字回调函数
const validatorUsername = (_: any, value: any, callBack: any) => {
  //用户名字|昵称,长度至少五位
  if (value.trim().length >= 5) {
    callBack()
  } else {
    callBack(new Error('用户名称长度至少五位'))
  }
}
//校验用户名字回调函数
const validatorName = (_: any, value: any, callBack: any) => {
  //用户名字|昵称,长度至少五位
  if (value.trim().length >= 5) {
    callBack()
  } else {
    callBack(new Error('用户昵称长度至少五位'))
  }
}
const validatorPassword = (_: any, value: any, callBack: any) => {
  //用户名字|昵称,长度至少五位
  if (value.trim().length >= 6) {
    callBack()
  } else {
    callBack(new Error('用户密码长度至少六位'))
  }
}
//表单校验的规则对象
const rules = {
  //用户名字
  username: [{ required: true, trigger: 'blur', validator: validatorUsername }],
  //用户昵称
  name: [{ required: true, trigger: 'blur', validator: validatorName }],
  //用户的密码
  password: [{ required: true, trigger: 'blur', validator: validatorPassword }],
}
</script>

<style scoped lang="scss">
.form {
  display: flex;
  justify-content: space-between;
}
</style>
