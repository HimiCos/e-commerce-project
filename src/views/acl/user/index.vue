<template>
  <div>
    <!-- 搜索卡片 -->
    <el-card style="height: 74px; margin-bottom: 10px" shadow="hover">
      <el-form class="form" :inline="true">
        <el-form-item label="用户名: ">
          <el-input
            placeholder="请输入搜索的用户名"
            v-model="keyword"
            @keyup.enter="getUserList()"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getUserList()">搜索</el-button>
          <el-button type="warning" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 展示卡片 -->
    <el-card shadow="hover">
      <!-- 展示卡片：顶部两个按钮 -->
      <el-button type="primary" @click="addUser">添加</el-button>
      <el-popconfirm
        width="220px"
        icon="Warning"
        title="确定要删除选中的用户吗"
        @confirm="removeSelectUser"
      >
        <template #reference>
          <el-button type="danger" :disabled="!selectIdArr.length">
            批量删除
          </el-button>
        </template>
      </el-popconfirm>
      <!-- 展示卡片：中间表格 -->
      <el-table
        @selection-change="selectChange"
        border
        style="margin: 10px 0"
        :data="userArr"
      >
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
            <el-button
              type="success"
              icon="User"
              size="small"
              @click="setRole(row)"
            >
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
            <el-popconfirm
              width="240px"
              icon="Warning"
              title="确定要删除当前的用户吗? "
              @confirm="removeUser(row)"
            >
              <template #reference>
                <el-button type="danger" icon="Delete" size="small">
                  删除
                </el-button>
              </template>
            </el-popconfirm>
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
        @size-change="changeSize"
      />
    </el-card>
    <!-- 添加/编辑按钮对应的抽屉 -->
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
    <!-- 分配角色按钮对应的抽屉 -->
    <el-drawer v-model="UserDrawer" title="分配角色用户">
      <el-form>
        <el-form-item label="用户名称">
          <el-input disabled :placeholder="userParams.username" />
        </el-form-item>
        <el-form-item label="角色列表">
          <el-checkbox
            @change="handleCheckAllChange"
            v-model="checkAll"
            :indeterminate="isIndeterminate"
          >
            全选
          </el-checkbox>
          <!-- 显示职位的的复选框 -->
          <el-checkbox-group
            v-model="userRole"
            @change="handleCheckedCitiesChange"
          >
            <el-checkbox
              v-for="(role, index) in allRole"
              :key="index"
              :label="role"
            >
              {{ role.roleName }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="UserDrawer = false">取消</el-button>
        <el-button type="primary" @click="confirmClick">确定</el-button>
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
import {
  reqUserInfo,
  reqAddOrUpdateUser,
  reqAllRole,
  reqSetUserRole,
  reqRemoveUser,
  reqSelectUser,
} from '@/api/acl/user'
// 引入用户相关的ts类型
import type {
  UserResponseData,
  Records,
  User,
  AllRoleResponseData,
  AllRole,
  SetRoleData,
} from '@/api/acl/user/type'
// @ts-ignore
import { ElMessage } from 'element-plus'
// 引入用户相关的小仓库
import useUserStore from '@/store/modules/user'
// 引入localStorage.ts
import { Set_localStorage } from '@/utils/localStorage'

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
// 收集用户信息的响应式数据
let userParams = reactive<User>({
  username: '',
  name: '',
  password: '',
})
// 用户名称
let userName = ref<string>('')
//获取form组件实例
let formRef = ref<any>()
// 获取用户相关的小仓库
const userStore = useUserStore()
// 控制UserDrawer的显示隐藏
const UserDrawer = ref<boolean>(false)
// 存储全部职位的数据
let allRole = ref<AllRole>([])
// 当前用户已有的职位
let userRole = ref<AllRole>([])
// 收集顶部复选框全选数据
const checkAll = ref<boolean>(false)
// 控制顶部全选复选框不确定的样式
const isIndeterminate = ref<boolean>(false)
// 收集选中的用户数据
let selectIdArr = ref<User[]>([])

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
  // 添加的抽屉显示出来
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
  // 编辑的抽屉显示出来
  drawer.value = true
  // 存储收集已有的账号信息
  Object.assign(userParams, row)
  // 单独存储id
  userName.value = row.username as string
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
    // 关闭添加/修改的抽屉
    drawer.value = false
    // 重新获取用户列表
    getUserList(userParams.id ? pageNo.value : 1)
    // 如果修改的是当前登陆的账号,则需要重新登陆
    if (userName.value == userStore.username) {
      // 浏览器重新刷新
      window.location.reload()
    }
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
//校验用户密码回调函数
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
// 分配角色按钮的回调
const setRole = async (row: User) => {
  // 存储收集已有的账号信息
  Object.assign(userParams, row)
  // 获取全部的职位的数据与当前用户已有的职位的数据
  let result: AllRoleResponseData = await reqAllRole(userParams.id as number)
  if (result.code == 200) {
    //存储全部的职位
    allRole.value = result.data.allRolesList
    //存储当前用户已有的职位
    userRole.value = result.data.assignRoles
    // 分配角色的抽屉显示出来
    UserDrawer.value = true
  }
  // 如果大于0且小于全部角色数组的长度 则不确定样式为true
  if (
    userRole.value.length > 0 &&
    userRole.value.length < allRole.value.length
  ) {
    isIndeterminate.value = true
  }
}
// 顶部的全部复选框的change事件
const handleCheckAllChange = (val: boolean) => {
  if (val) {
    // 全选
    userRole.value = allRole.value
    // 不确定的样式(确定样式)
    isIndeterminate.value = false
  } else {
    // 取消全选
    userRole.value = []
  }
}
// 顶部全部的复选框的change事件
const handleCheckedCitiesChange = (value: string[]) => {
  const checkedCount = value.length
  // 代表:勾选上的项目个数与全部的职位个数相等，顶部的全选框勾选上
  checkAll.value = checkedCount === allRole.value.length
  // 不确定的样式 当勾选上的项目个数大于0并且小于全部的职位个数 不确定样式为true 其余为false
  isIndeterminate.value =
    checkedCount > 0 && checkedCount < allRole.value.length
}
// 分配角色抽屉内的确定按钮的回调
const confirmClick = async () => {
  //收集参数
  let data: SetRoleData = {
    userId: userParams.id as number,
    roleIdList: userRole.value.map((item) => item.id as number),
  }
  let result: any = await reqSetUserRole(data)
  if (result.code == 200) {
    ElMessage.success('分配角色成功')
    // 关闭分配角色的抽屉
    UserDrawer.value = false
    // 重新获取用户列表
    getUserList(pageNo.value)
  } else {
    ElMessage.error('分配角色失败')
  }
}
// 删除用户按钮的回调
const removeUser = async (row: User) => {
  // 发送请求删除当前用户
  let result = await reqRemoveUser(row.id as number)
  if (result.code == 200) {
    ElMessage.success('删除用户成功')
    // 重新获取用户列表
    getUserList(pageNo.value)
  } else {
    ElMessage.error('删除用户失败')
  }
}
// table第一列选择时触发的回调
const selectChange = (val: any) => {
  // 存储当前选中的用户
  selectIdArr.value = val
}
// 批量删除用户的按钮回调
const removeSelectUser = async () => {
  //整理批量删除的参数
  let idsList: number[] = selectIdArr.value.map((item) => {
    return item.id as number
  })
  // 发送请求批量删除当前用户
  let result: any = await reqSelectUser(idsList)
  if (result.code == 200) {
    ElMessage.success('批量删除用户成功')
    // 重新获取用户列表
    getUserList(pageNo.value)
  } else {
    ElMessage.error('批量删除用户失败')
  }
}
// 当每页显示条数改变时触发
const changeSize = () => {
  Set_localStorage('Limit', categoryStore.limit)
  getUserList()
}
</script>

<style scoped lang="scss">
.form {
  display: flex;
  justify-content: space-between;
}
</style>
