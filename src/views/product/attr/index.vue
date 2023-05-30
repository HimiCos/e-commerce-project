<template>
  <div>
    <!-- 选择框的卡片 -->
    <Category :scene="scene"/>
    <!-- 展示内容的卡片 -->
    <el-card>
      <div v-show="scene == 0">
        <el-button
          type="primary"
          icon="Plus"
          :disabled="categoryStore.c3Id ? false : true"
          @click="showScene1"
        >
          添加属性
        </el-button>
        <el-table border style="margin: 10px 0" :data="categoryStore.attrArr">
          <el-table-column
            label="序号"
            align="center"
            type="index"
            width="80px"
          ></el-table-column>
          <el-table-column
            label="属性名称"
            align="center"
            width="180px"
            prop="attrName"
          ></el-table-column>
          <el-table-column label="属性值名称" align="center">
            <template #="{ row }">
              <el-tag
                v-for="attrValue in row.attrValueList"
                :key="attrValue.id"
                style="margin: 5px;"
              >
                {{ attrValue.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="200px">
            <template #="{row}">
              <el-button type="warning" size="small" icon="Edit" @click="editAttr(row)"></el-button>
              <el-popconfirm
                :title="`是否要删除${row.tmName}属性呢？`"
                width="260px"
                icon="Warning"
                @confirm="deleteAttr(row)"
              >
                <template #reference>
                  <el-button type="danger" size="small" icon="Delete"></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="scene == 1">
        <el-form>
          <el-form-item label="属性名称" style="width: 300px;">
            <el-input v-model="attrParams.attrName" placeholder="请输入属性名称"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="Plus" :disabled="!attrParams.attrName" @click="addAttrValue">添加属性值</el-button>
        <el-button @click="showScene0">取消</el-button>
        <el-table border style="margin: 10px 0" :data="attrParams.attrValueList">
          <el-table-column
            label="序号"
            align="center"
            type="index"
            width="80px"
          ></el-table-column>
          <el-table-column
            label="属性值"
            align="center"
          >
            <!-- row 即为当前属性值对象 -->
            <template #="{row, $index}">
              <el-input placeholder="请你输入属性值名称" v-model="row.valueName" @blur="toShow(row, $index)" ref="attrValueInput"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template #="{$index}">
              <el-button type="danger" size="small" icon="Delete" @click="deleteAttrValue($index)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="saveAttrId" :disabled="attrParams.attrValueList.length>0 ? false : true">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
// 引入ref
import { ref, reactive, nextTick } from 'vue'
// 引入分类相关的小仓库
import useCategoryStore from '@/store/modules/category'
// 引入layout配置小仓库
import useLayOutSettingStore from '@/store/modules/setting'
// 引入类型
import { Attr, AttrValue } from '@/api/product/attr/type'
// 引入接口
import { reqAddOrUpdateAttr, reqDeleteAttr } from '@/api/product/attr'
// 引入ElMessage
// @ts-ignore
import { ElMessage } from 'element-plus'

// 获取分类相关的小仓库
const categoryStore = useCategoryStore()
// 获取layout小仓库
let LayOutSettingStore = useLayOutSettingStore()

let scene = ref<number>(0)
// 收集新增的属性值的数据
let attrParams = reactive<Attr>({
  attrName: '', // 新增属性名称
  attrValueList: [], // 新增属性值的数组
  categoryId: '', // 三级分类的id
  categoryLevel: 3 // 代表三级分类
})
// 获取attrValueInput的dom对象
const attrValueInput = ref<HTMLElement>()


// 显示scene为0的方法
const showScene0 = () => {
  scene.value = 0
}
// 显示scene为1的方法
const showScene1 = () => {
  scene.value = 1
  // 收集数据
  attrParams.categoryId = categoryStore.c3Id
  // 清空数据
  attrParams.attrName = ''
  attrParams.attrValueList = []
}
// 编辑按钮的回调
const editAttr = (row:Attr) => {
  // 显示scene为1的方法
  showScene1()
  // 收集数据
  Object.assign(attrParams,JSON.parse(JSON.stringify(row)))
}
// 添加属性值的方法
const addAttrValue = () => {
  attrParams.attrValueList.push({
    valueName: ''
  })
  // 添加属性值按钮后获取input焦点
  nextTick(() => {
    attrValueInput.value?.focus()
  })
  
}
// 保存属性的回调
const saveAttrId = async() => {
  try {
    // 发送请求
    await reqAddOrUpdateAttr(attrParams)
    ElMessage.success(attrParams.id ? '修改成功' : '添加成功')
    // 延迟显示scene为0的方法
    showScene0()
    LayOutSettingStore.updateRefresh()
  } catch {
    ElMessage.error(attrParams.id ? '修改失败' : '添加失败')
  }
}
// 取消按钮的回调
const cancel = () => {
  showScene0()
}
// el-input失去焦点的回调
const toShow = (row:AttrValue, $index:number) => {
  // 判断是否为空
  if (!row.valueName) {
    ElMessage.error('属性值不能为空')
    // 删除当前的属性值
    attrParams.attrValueList.splice($index, 1)
    return
  }
  let repeat = attrParams.attrValueList.find((item) => {
    if (item != row){
      return item.valueName == row.valueName
    }
  })
  if (repeat) {
    ElMessage.error('属性值重复')
    // 删除当前的属性值
    attrParams.attrValueList.splice($index, 1)
  }
}
// 删除属性值的回调
const deleteAttrValue = ($index:number) => {
  attrParams.attrValueList.splice($index, 1)
}
// 删除属性的回调
const deleteAttr = async(row:Attr) => {
  // 发送请求
  await reqDeleteAttr(row.id as number)
  categoryStore.getAttrArr()
  try {
    ElMessage.success('删除成功')
    categoryStore.getAttrArr()
  } catch {}
}

</script>

<style scoped lang="scss"></style>
