<template>
  <div>
    <!-- 展示菜单的表格 -->
    <el-table
      :data="PermisstionArr"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
    >
      <el-table-column label="名称" prop="name" />
      <el-table-column label="权限值" prop="code" />
      <el-table-column label="修改时间" prop="updateTime" />
      <el-table-column label="操作">
        <!-- row:即为已有的菜单对象|按钮的对象的数据 -->
        <template #="{ row }">
          <el-button
            @click="addPermisstion(row)"
            :type="row.level == 3 ? 'warning' : 'success'"
            size="small"
            :disabled="row.level == 4"
            v-has="`btn.Permission.add`"
          >
            {{ row.level == 3 ? '添加功能' : '添加菜单' }}
          </el-button>
          <el-button
            @click="updatePermisstion(row)"
            type="primary"
            size="small"
            :disabled="row.level == 1"
            v-has="`btn.Permission.update`"
          >
            编辑
          </el-button>
          <el-popconfirm
            title="确定要删除当前的菜单吗? "
            width="240px"
            icon="warning"
            @confirm="removeMenu(row.id)"
            v-has="`btn.Permission.remove`"
          >
            <template #reference>
              <el-button type="danger" size="small" :disabled="row.level == 1">
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 对话框组件:添加或者更新已有的菜单的数据结构 -->
    <el-dialog
      v-model="dialogVisible"
      :title="menuData.id ? '更新菜单' : '添加菜单'"
      width="30%"
      style="border-radius: 10px"
    >
      <!-- 表单组件:收集新增与已有的菜单的数据 -->
      <el-form :model="menuData" :rules="rules" ref="form">
        <el-form-item label="名称" prop="name">
          <el-input
            placeholder="请输入菜单名称"
            v-model="menuData.name"
            style="width: 75%"
          ></el-input>
        </el-form-item>
        <el-form-item label="权限" prop="code">
          <el-input
            placeholder="请输入权限数值"
            v-model="menuData.code"
            style="width: 75%"
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
  </div>
</template>

<script setup lang="ts">
// 引入ref
import { ref, onMounted, reactive, nextTick } from 'vue'
// 引入菜单相关的接口
import {
  reqAllPermisstion,
  reqAddOrUpdateMenu,
  reqRemoveMenu,
} from '@/api/acl/menu'
// 引入菜单相关的ts类型
import type {
  MenuParams,
  PermisstionResponseData,
  PermisstionList,
  Permisstion,
} from '@/api/acl/menu/type'
// 引入ElMessage
// @ts-ignore
import { ElMessage } from 'element-plus'

// 存储菜单的数据
let PermisstionArr = ref<PermisstionList>([])
// 控制对话框的显示与隐藏
let dialogVisible = ref<boolean>(false)
// 携带的参数
let menuData = reactive<MenuParams>({
  code: '',
  level: 0,
  name: '',
  pid: 0,
})
// 获取form组件实例
let form = ref<any>()

// 组件挂载时
onMounted(() => {
  // 获取所有的权限数据
  getHasPermisstion()
})
// 获取菜单数据的方法
const getHasPermisstion = async () => {
  let result: PermisstionResponseData = await reqAllPermisstion()
  if (result.code == 200) {
    PermisstionArr.value = result.data
  }
}
// 添加菜单按钮的回调
const addPermisstion = (row: Permisstion) => {
  // 清空数据
  Object.assign(menuData, {
    id: 0,
    code: '',
    level: 0,
    name: '',
    pid: 0,
  })
  // 对话框显示出来
  dialogVisible.value = true
  // 清空上一次表单校验错误结果
  nextTick(() => {
    form.value.clearValidate()
  })
  // 收集新增的菜单的level数值
  menuData.level = row.level + 1
  // 给谁新增子菜单
  menuData.pid = row.id as number
}
// 编辑已有的菜单
const updatePermisstion = (row: Permisstion) => {
  dialogVisible.value = true
  // 点击修改按钮:收集已有的菜单的数据进行更新
  Object.assign(menuData, row)
  // 清空上一次表单校验错误结果
  nextTick(() => {
    form.value.clearValidate()
  })
}

// 确定按钮的回调
const save = async () => {
  // 表单校验结果,结果通过在发请求、结果没有通过不应该在发生请求
  await form.value.validate()
  // 发请求:新增子菜单|更新某一个已有的菜单的数据
  let result: any = await reqAddOrUpdateMenu(menuData)
  if (result.code == 200) {
    // 提示信息
    ElMessage.success(menuData.id ? '更新成功' : '添加成功')
    // 对话框隐藏
    dialogVisible.value = false
    // 再次获取全部最新的菜单的数据
    getHasPermisstion()
  } else {
    ElMessage.error(menuData.id ? '更新失败' : '添加失败')
  }
}
// 删除按钮回调
const removeMenu = async (id: number) => {
  let result = await reqRemoveMenu(id)
  if (result.code == 200) {
    ElMessage.success('删除成功')
    getHasPermisstion()
  } else {
    ElMessage.error('删除失败')
  }
}
// 自定义校验规则的回调
const validatorName = (_: any, value: any, callBack: any) => {
  if (value.trim().length >= 2) {
    callBack()
  } else {
    callBack(new Error('菜单名称至少两位'))
  }
}
// 自定义校验规则的回调
const validatorCode = (_: any, value: any, callBack: any) => {
  if (value.trim().length >= 2) {
    callBack()
  } else {
    callBack(new Error('权限数值至少两位'))
  }
}
// 添加/更新菜单校验规则
const rules = {
  name: [{ required: true, trigger: 'blur', validator: validatorName }],
  code: [{ required: true, trigger: 'blur', validator: validatorCode }],
}
</script>

<style scoped lang="scss"></style>
