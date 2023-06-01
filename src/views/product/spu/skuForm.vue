<template>
  <div>
    <el-form label-width="70px">
      <!-- SKU名称表单项 -->
      <el-form-item label="SKU名称">
        <el-input
          placeholder="请输入SKU名称"
          v-model="skuParams.skuName"
        ></el-input>
      </el-form-item>
      <!-- 价格表单项 -->
      <el-form-item label="价格 (元)">
        <el-input
          placeholder="请输入价格 (元)"
          type="number"
          v-model="skuParams.price"
        ></el-input>
      </el-form-item>
      <!-- 重量表单项 -->
      <el-form-item label="重量 (克)">
        <el-input
          placeholder="请输入重量 (克)"
          type="number"
          v-model="skuParams.weight"
        ></el-input>
      </el-form-item>
      <!-- SKU描述表单项 -->
      <el-form-item label="SKU描述">
        <el-input
          type="textarea"
          placeholder="请输入SKU的描述"
          v-model="skuParams.skuDesc"
        />
      </el-form-item>
      <!-- 平台属性表单项 -->
      <el-form-item label="平台属性">
        <el-form :inline="true">
          <!-- 平台属性for展示 -->
          <el-form-item
            v-for="item in attrArr"
            :key="item.id"
            :label="item.attrName"
          >
            <el-select placeholder="Select" v-model="item.attrIdAndValueId">
              <el-option
                v-for="attrValue in item.attrValueList"
                :key="attrValue.id"
                :label="attrValue.valueName"
                :value="`${item.id}:${attrValue.id}`"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <!-- 销售属性 -->
      <el-form-item label="销售属性">
        <!-- 遍历已有的销售属性 -->
        <el-form-item
          v-for="item in saleArr"
          :key="item.id"
          :label="item.saleAttrName"
          label-width="43px"
        >
          <el-select placeholder="Select" v-model="item.saleIdAndSaleValueId">
            <el-option
              v-for="saleAttrValue in item.spuSaleAttrValueList"
              :key="saleAttrValue.id"
              :label="saleAttrValue.saleAttrValueName"
              :value="`${item.id}:${saleAttrValue.id}`"
            />
          </el-select>
        </el-form-item>
      </el-form-item>
      <!-- 图片名称 -->
      <el-form-item label="图片名称">
        <el-table border :data="imgArr" ref="table" @select="select">
          <el-table-column type="selection" align="center" width="80px" />
          <el-table-column label="图片" align="center">
            <template #="{ row }">
              <img :src="row.imgUrl" style="width: 100px" />
            </template>
          </el-table-column>
          >
          <el-table-column label="名称" align="center" prop="imgName" />
          <el-table-column label="操作" align="center">
            <template #="{ row }">
              <el-button type="warning" @click="handler(row)">
                设置默认
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <!-- 保存/取消 -->
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
// 引入ref
import { ref, reactive } from 'vue'
// 引入发送请求所用到的接口
import { reqAttr } from '@/api/product/attr'
import {
  reqSpuImagesList,
  reqSpuHasSaleAttr,
  reqAddSku,
} from '@/api/product/spu'
// 引入skuData的ts类型
import { SkuData } from '@/api/product/spu/type'
// 引入 ElMessage
// @ts-ignore
import { ElMessage } from 'element-plus'

// 自定义事件
let $emit = defineEmits(['changeScene0'])
// 保存平台属性的列表
let attrArr = ref<any>([])
// 保存销售属性的列表
let saleArr = ref<any>([])
// 保存图片列表
let imgArr = ref<any>([])
// 收集SKU的参数
let skuParams = reactive<SkuData>({
  category3Id: '',
  spuId: '',
  tmId: '',
  skuName: '',
  price: '',
  weight: '',
  skuDesc: '',
  skuAttrValueList: [],
  skuSaleAttrValueList: [],
  skuDefaultImg: '',
})
// 获取table实例对象
let table = ref<any>()

// 取消按钮的回调
const cancel = () => {
  $emit('changeScene0', { flag: 0, params: '' })
}
// 保存按钮的回调
const save = async () => {
  // 整理收集到的平台属性的数据
  skuParams.skuAttrValueList = attrArr.value.reduce((prev: any, next: any) => {
    if (next.attrIdAndValueId) {
      let [attrId, valueId] = next.attrIdAndValueId.split(':')
      prev.push({
        attrId,
        valueId,
      })
    }
    return prev
  }, [])
  // 整理收集到的销售属性的数据
  skuParams.skuSaleAttrValueList = saleArr.value.reduce(
    (prev: any, next: any) => {
      if (next.saleIdAndSaleValueId) {
        let [saleAttrId, saleAttrValueId] = next.saleIdAndSaleValueId.split(':')
        prev.push({
          saleAttrId,
          saleAttrValueId,
        })
      }
      return prev
    },
    [],
  )
  // 发送请求保存数据
  let result = await reqAddSku(skuParams)
  if (result.code == 200) {
    ElMessage.success('添加成功')
    $emit('changeScene0', { flag: 0, params: '' })
  } else {
    ElMessage.error('添加失败')
  }
}
// 发送请求获取数据
const initSkuData = async (
  c1Id: number | string,
  c2Id: number | string,
  spu: any,
) => {
  // 清空历史数据
  Object.assign(skuParams, {
    skuName: '',
    price: '',
    weight: '',
    skuDesc: '',
    skuAttrValueList: [],
    skuSaleAttrValueList: [],
    skuDefaultImg: '',
  })
  // 收集表单数据
  skuParams.category3Id = spu.category3Id
  skuParams.spuId = spu.id
  skuParams.tmId = spu.tmId
  // 发送请求获取平台属性
  let result = await reqAttr(c1Id, c2Id, spu.category3Id)
  // 发送请求获取销售属性
  let result2 = await reqSpuHasSaleAttr(spu.id)
  // 发送请求获取图片列表
  let result3 = await reqSpuImagesList(spu.id)
  // 保存平台属性的列表
  attrArr.value = result.data
  // 保存销售属性的列表
  saleArr.value = result2.data
  // 保存图片列表
  imgArr.value = result3.data
}
// 设置默认图片按钮的回调
const handler = (row: any) => {
  // 重置所有的默认图片
  imgArr.value.forEach((item: any) => {
    table.value.toggleRowSelection(item, false)
  })
  // 选中当前行的图片
  table.value.toggleRowSelection(row, true)
  // 保存默认图片
  skuParams.skuDefaultImg = row.imgUrl
}
// table的select事件
const select = (selection: any) => {
  if (skuParams.skuDefaultImg) {
    // 重置所有的默认图片
    skuParams.skuDefaultImg = ''
  } else {
    // 保存默认图片
    skuParams.skuDefaultImg = selection[0].imgUrl
  }
}
// 暴露给父组件的方法
defineExpose({
  initSkuData,
})
</script>

<style scoped lang="scss">
.el-form-item .asterisk-left {
  margin: 8px;
  margin-top: 0px;
}
</style>
