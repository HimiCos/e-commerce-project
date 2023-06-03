<template>
  <div>
    <!-- 搜索卡片 -->
    <el-card style="height: 74px; margin-bottom: 10px" shadow="hover">
      <el-form class="form" :inline="true">
        <el-form-item label="角色名称: ">
          <el-input
            placeholder="请输入搜索的角色名称"
            @keyup.enter="getAllRole()"
            v-model="roleName"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getAllRole()">搜索</el-button>
          <el-button type="warning" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 展示卡片 -->
    <el-card shadow="hover">
      <!-- 展示卡片：顶部的按钮 -->
      <el-button type="primary" icon="Plus" @click="addRole">
        添加角色
      </el-button>
      <!-- 展示卡片：表格 -->
      <el-table border style="margin: 10px 0" :data="roleList">
        <el-table-column label="#" width="60" type="index" align="center" />
        <el-table-column label="id" width="80" align="center" prop="id" />
        <el-table-column
          label="角色名称"
          width="150"
          align="center"
          prop="roleName"
          show-overflow-tooltip
        />
        <el-table-column
          label="创建时间"
          width="180"
          align="center"
          prop="createTime"
          show-overflow-tooltip
        />
        <el-table-column
          label="更新时间"
          width="180"
          align="center"
          prop="updateTime"
          show-overflow-tooltip
        />
        <el-table-column label="操作" align="center">
          <template #="{ row }">
            <el-button
              type="success"
              size="small"
              icon="User"
              @click="setPermisstion(row)"
            >
              分配权限
            </el-button>
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="editRole(row)"
            >
              编辑
            </el-button>
            <el-popconfirm
              @confirm="deleteRole(row)"
              title="确定要删除当前的角色吗? "
              width="230px"
              icon="Warning"
            >
              <template #reference>
                <el-button type="danger" size="small" icon="Delete">
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
        @current-change="getAllRole(pageNo)"
        @size-change="changeSize"
      />
    </el-card>
    <!-- 点击添加/编辑触发的对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="RoleParams.id ? '更新角色' : '添加角色'"
      width="30%"
      style="border-radius: 10px"
    >
      <el-form :model="RoleParams" :rules="rules" ref="form">
        <el-form-item label="角色名称" prop="roleName">
          <el-input
            placeholder="请输入角色名称"
            v-model="RoleParams.roleName"
            style="width: 65%"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="save">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 点击分配权限触发的抽屉 -->
    <el-drawer v-model="drawer" title="分配权限" size="30%">
      <!-- 树形控件 -->
      <el-tree
        ref="tree"
        :data="menuArr"
        show-checkbox
        node-key="id"
        :default-expanded-keys="[1]"
        :default-checked-keys="selectArr"
        :props="defaultProps"
      />
      <template #footer>
        <el-button @click="drawer = false">取消</el-button>
        <el-button type="primary" @click="handler">确定</el-button>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
// 引入ref
import { ref, onMounted, reactive, nextTick } from 'vue'
// 引入商品分类相关的小仓库
import useCategoryStore from '@/store/modules/category'
// 引入localStorage.ts
import { Set_localStorage } from '@/utils/localStorage'
// 引入角色相关的接口
import {
  reqAllRoleList,
  reqAddOrUpdateRole,
  reqAllMenuList,
  reqSetPermisstion,
  reqRemoveRole,
} from '@/api/acl/role'
// 引入角色相关的类型
import type {
  RoleResponseData,
  Records,
  RoleData,
  MenuResponseData,
  MenuList,
} from '@/api/acl/role/type'
// 引入ElMessage
// @ts-ignore
import { ElMessage } from 'element-plus'
// 引入用户相关的小仓库
import useUserStore from '@/store/modules/user'

// 控制分页器的页码
const pageNo = ref<number>(1)
// 控制分页器的总条数
const total = ref<number>(0)
// 获取商品分类相关的小仓库
const categoryStore = useCategoryStore()
// 用于搜索的角色名称
const roleName = ref<string>('')
// 存储所有的角色
const roleList = ref<Records>([])
// 控制对话框的显示和隐藏
const dialogVisible = ref<boolean>(false)
// 收集新增岗位数据
let RoleParams = reactive<RoleData>({
  roleName: '',
})
// 获取form组件实例
let form = ref<any>()
// 控制抽屉的显示和隐藏
const drawer = ref<boolean>(false)
// 准备一个数组:数组用于存储勾选的节点的ID(四级的)
let selectArr = ref<number[]>([])
// 定义数组存储用户权限的数据
let menuArr = ref<MenuList>([])
// 获取tree组件实例
let tree = ref<any>()
// 获取用户相关的小仓库
const userStore = useUserStore()

// 当每页显示条数改变时触发
const changeSize = () => {
  Set_localStorage('Limit', categoryStore.limit)
  // 重新获取xxx列表
  getAllRole()
}
// 挂载时调用
onMounted(() => {
  // 获取所有角色的函数
  getAllRole()
})
// 获取所有角色的函数
const getAllRole = async (page = 1) => {
  // 存储当前的页码
  pageNo.value = page
  // 发送请求获取所有角色
  let result: RoleResponseData = await reqAllRoleList(
    pageNo.value,
    categoryStore.limit,
    roleName.value,
  )
  // 将获取到的角色存储到roleList中
  roleList.value = result.data.records
  total.value = result.data.total
}
// 搜索卡片：重置按钮的回调
const reset = () => {
  roleName.value = ''
  getAllRole()
}
// 添加角色按钮的回调
const addRole = () => {
  dialogVisible.value = true
  // 清空数据
  Object.assign(RoleParams, {
    roleName: '',
    id: 0,
  })
  // 清空上一次表单校验错误结果
  nextTick(() => {
    form.value.clearValidate()
  })
}
// 编辑角色按钮的回调
const editRole = (row: RoleData) => {
  dialogVisible.value = true
  // 存储已有的职位----带有ID的
  Object.assign(RoleParams, row)
  // 清空上一次表单校验错误结果
  nextTick(() => {
    form.value.clearValidate()
  })
}
// 自定义校验规则的回调
const validatorRoleName = (_: any, value: any, callBack: any) => {
  if (value.trim().length >= 2) {
    callBack()
  } else {
    callBack(new Error('角色名称至少两位'))
  }
}
// 角色名称校验规则
const rules = {
  roleName: [{ required: true, trigger: 'blur', validator: validatorRoleName }],
}
// 确定按钮的回调
const save = async () => {
  // 表单校验结果,结果通过在发请求、结果没有通过不应该在发生请求
  await form.value.validate()
  // 添加|更新角色名称的请求
  let result: any = await reqAddOrUpdateRole(RoleParams)
  if (result.code == 200) {
    // 提示文字
    ElMessage.success(RoleParams.id ? '更新成功' : '添加成功')
    // 对话框隐藏
    dialogVisible.value = false
    // 再次获取全部的已有的职位
    getAllRole(pageNo.value)
  } else {
    ElMessage.error(RoleParams.id ? '更新失败' : '添加失败')
  }
}
// 分配权限按钮的回调
const setPermisstion = async (row: RoleData) => {
  // 抽屉显示出来
  drawer.value = true
  // 收集当前要分类权限的职位的数据
  Object.assign(RoleParams, row)
  // 根据职位获取权限的数据
  let result: MenuResponseData = await reqAllMenuList(RoleParams.id as number)
  if (result.code == 200) {
    menuArr.value = result.data
    selectArr.value = filterSelectArr(menuArr.value, [])
  }
}
// 过滤出对象全部4层的select为true的id
const filterSelectArr = (allData: any, initArr: any) => {
  allData.forEach((item: any) => {
    if (item.select && item.level == 4) {
      initArr.push(item.id)
    }
    if (item.children && item.children.length > 0) {
      filterSelectArr(item.children, initArr)
    }
  })
  return initArr
}
// 树形控件的数据
const defaultProps = {
  children: 'children',
  label: 'name',
}
// 分配权限 抽屉内确认按钮的回调
const handler = async () => {
  // 职位的ID
  const roleId = RoleParams.id as number
  // 选中节点的ID
  let arr = tree.value.getCheckedKeys()
  // 半选的ID
  let arr1 = tree.value.getHalfCheckedKeys()
  let permissionId = arr.concat(arr1)
  // 下发权限
  let result: any = await reqSetPermisstion(roleId, permissionId)
  if (result.code == 200) {
    // 提示信息
    ElMessage.success('权限分配成功')
    // 抽屉关闭
    drawer.value = false
    // 遍历小仓库中的角色列表
    userStore.roles.forEach((item: string) => {
      // 判断当前修改的角色权限是否和登陆的账号有关
      if (item == RoleParams.roleName) {
        // 页面刷新
        window.location.reload()
      }
    })
  }
}
// 删除角色按钮的回调
const deleteRole = async (row: RoleData) => {
  // 发送请求删除角色
  let result: any = await reqRemoveRole(row.id as number)
  if (result.code == 200) {
    // 提示信息
    ElMessage.success('删除成功')
    // 重新获取角色列表
    getAllRole(pageNo.value)
  } else {
    ElMessage.error('删除失败')
  }
}
</script>

<style scoped lang="scss">
.form {
  display: flex;
  justify-content: space-between;
}
</style>
