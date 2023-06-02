<template>
  <div>
    <el-form>
      <el-form-item label="SPU名称">
        <el-input
          placeholder="请输入SPU名称"
          v-model="SpuParams.spuName"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU品牌">
        <el-select v-model="SpuParams.tmId" placeholder="请选择品牌">
          <el-option
            v-for="item in AllTradeMark"
            :key="item.id"
            :label="item.tmName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          type="textarea"
          placeholder="请输入SPU的描述"
          v-model="SpuParams.description"
        />
      </el-form-item>
      <el-form-item label="SPU图片">
        <el-upload
          v-model:file-list="imgList"
          action="/api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :before-upload="beforeUpload"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>
        <el-dialog
          v-model="dialogVisible"
          style="width: 50%; border-radius: 10px"
        >
          <img
            w-full
            :src="dialogImageUrl"
            alt="Preview Image"
            style="width: 100%; height: 100%; border-radius: 10px"
          />
        </el-dialog>
      </el-form-item>
      <el-form-item label="SPU属性">
        <!-- 展示SPU销售属性的下拉菜单 -->
        <el-select
          v-model="saleAttrIdAndName"
          :placeholder="
            unSelectSaleAttr.length
              ? `暂未选择的有${unSelectSaleAttr.length}个`
              : '暂无可选项'
          "
        >
          <el-option
            v-for="item in unSelectSaleAttr"
            :key="item.id"
            :label="item.name"
            :value="`${item.id}:${item.name}`"
          />
        </el-select>
        <!-- 展示SPU销售属性的下拉菜单右侧的按钮 -->
        <el-button
          type="primary"
          icon="Plus"
          style="margin-left: 10px"
          :disabled="!saleAttrIdAndName"
          @click="addNewSaleAttr"
        >
          添加销售属性
        </el-button>
        <!-- 展示SPU销售属性的表格 -->
        <el-table style="margin: 10px 0" border :data="saleAttr">
          <el-table-column
            label="序号"
            type="index"
            width="100px"
            align="center"
          />
          <el-table-column
            label="属性名"
            width="150px"
            align="center"
            prop="saleAttrName"
          />
          <el-table-column label="属性值" align="center">
            <!-- 表格中的属性值 -->
            <template #="{ row, $index }">
              <el-tag
                v-for="(item, index) in row.spuSaleAttrValueList"
                :key="item.id"
                closable
                style="margin: 5px"
                @close="row.spuSaleAttrValueList.splice(index, 1)"
              >
                {{ item.saleAttrValueName }}
              </el-tag>
              <!-- 添加按钮 -->
              <el-button
                type="success"
                size="small"
                icon="Plus"
                v-show="!row.flag == true"
                @click="ChangeI(row, $index)"
              ></el-button>
              <el-input
                v-show="row.flag == true"
                @blur="ChangeBI(row)"
                size="small"
                style="width: 100px"
                placeholder="请输入属性值"
                :ref="(vc: HTMLElement) => tableInput[$index] = vc"
                v-model="row.saleAttrValue"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100px" align="center">
            <template #="{ $index }">
              <el-button
                type="danger"
                size="small"
                icon="Delete"
                @click="saleAttr.splice($index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="save"
          :disabled="saleAttr.length == 0"
        >
          保存
        </el-button>
        <el-button @click="changeScene">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
// 引入ref
import { ref, nextTick, computed } from 'vue'
// 引入API接口
import {
  reqAllTrademark,
  reqSpuImagesList,
  reqSpuHasSaleAttr,
  reqAllSaleAttr,
  reqAddOrUpdateSpu,
} from '@/api/product/spu'
// 引入spu的ts类型
import type {
  AllTrademark,
  SpuData,
  AllTrademarkResponseData,
  SpuHasImg,
  SaleAttrResponseData,
  HasSaleAttrResponseData,
  SpuImg,
  SaleAttr,
  HasSaleAttr,
  SaleAttrValue,
} from '@/api/product/spu/type'
// 引入Elmessage
// @ts-ignore
import { ElMessage } from 'element-plus'

// 接收父组件传递过来的自定义事件
let $emit = defineEmits(['changeScene0'])
// 存储已有的SPU数据
let AllTradeMark = ref<AllTrademark>([])
// 存储已有的SPU图片数据
let imgList = ref<SpuImg[]>([])
// 存储已有的SPU销售属性and信息
let saleAttr = ref<SaleAttr[]>([])
// 全部的SPU销售属性
let allSaleAttr = ref<HasSaleAttr[]>([])
// 接收spu数据
let SpuParams = ref<SpuData>({
  category3Id: '',
  spuName: '',
  description: '',
  tmId: '',
  spuImageList: [],
  spuSaleAttrList: [],
})
// 控制预览照片的对话框的属性
let dialogVisible = ref<boolean>(false)
// 预览照片的地址
let dialogImageUrl = ref<string>('')
// 获取tableInput的ref
let tableInput = ref<HTMLElement[]>([])
// 将来收集还未选择的销售属性的ID与属性值的名字
let saleAttrIdAndName = ref<string>('')

// 点击触发自定义事件<changeScene0> 给父组件传递要更改的场景数
const changeScene = () => {
  $emit('changeScene0', {
    flag: 0,
    params: SpuParams.value.id ? 'update' : 'add',
  })
}

// 获取完整的SPU信息
const initHasSpuData = async (spu: SpuData) => {
  // 存储已有的SPU数据
  SpuParams.value = spu
  // 获取全部品牌数据
  let result: AllTrademarkResponseData = await reqAllTrademark()
  // 获取SPU的图片信息
  let result2: SpuHasImg = await reqSpuImagesList(spu.id as number)
  // 获取SPU的销售属性信息
  let result3: SaleAttrResponseData = await reqSpuHasSaleAttr(spu.id as number)
  // 获取整个项目全部的销售属性
  let result4: HasSaleAttrResponseData = await reqAllSaleAttr()
  // 存储全部品牌的数据
  AllTradeMark.value = result.data
  // 存储SPU的图片信息
  imgList.value = result2.data.map((item) => {
    return {
      name: item.imgName,
      url: item.imgUrl,
    }
  })
  // 存储SPU的销售属性信息
  saleAttr.value = result3.data
  // 存储整个项目全部的销售属性
  allSaleAttr.value = result4.data
}
// 获取较为完整的SPU信息（添加按钮时发的请求）
const initSpuData = async (c3Id: number) => {
  // 清空数据
  Object.assign(SpuParams.value, {
    category3Id: '',
    spuName: '',
    description: '',
    id: '',
    tmId: '',
    spuImageList: [],
    spuSaleAttrList: [],
  })
  // 清空照片墙和销售属性
  imgList.value = []
  saleAttr.value = []
  saleAttrIdAndName.value = ''
  // 存储传递过来的id
  SpuParams.value.category3Id = c3Id
  // 获取全部品牌数据
  let result: AllTrademarkResponseData = await reqAllTrademark()
  // 获取整个项目全部的销售属性
  let result2: HasSaleAttrResponseData = await reqAllSaleAttr()
  // 存储全部品牌的数据
  AllTradeMark.value = result.data
  // 存储整个项目全部的销售属性
  allSaleAttr.value = result2.data
}
// 照片墙点击预览按钮时触发的钩子函数
const handlePictureCardPreview = (uploadFile: any) => {
  dialogImageUrl.value = uploadFile.url
  dialogVisible.value = true
}
// // 照片墙点击删除按钮时触发的钩子函数
// const handleRemove = (file:any, fileList:any) => {
//   console.log(file, fileList);
// };
// 照片墙点击上传按钮前触发的钩子函数（限制类型及大小）
const beforeUpload = (file: any) => {
  const isJPG = file.type === 'image/jpeg'
  const isPNG = file.type === 'image/png'
  const isGIF = file.type === 'image/gif'
  const isLt2M = file.size / 1024 / 1024 < 2
  // 判断是否是图片类型
  if (!isJPG && !isPNG && !isGIF) {
    ElMessage.error('上传图片只能是 JPG/PNG/GIF 格式!')
  }
  // 判断图片大小是否超过2MB
  if (!isLt2M) {
    ElMessage.error('上传图片大小不能超过 2MB!')
  }
  return (isJPG || isPNG || isGIF) && isLt2M
}

// 添加按钮的回调
const ChangeI = (row: SaleAttr, $index: number) => {
  row.flag = true
  row.saleAttrValue = ''
  // 点击添加按钮时，让输入框获取焦点
  nextTick(() => {
    tableInput.value[$index].focus()
  })
}
// input框失去焦点时触发的钩子函数
const ChangeBI = (row: SaleAttr) => {
  row.flag = false
  // 整理收集到的属性的ID与属性值的名字
  const { baseSaleAttrId, saleAttrValue } = row
  // 整理成服务器需要的属性值形式
  let newSaleAttrValue: SaleAttrValue = {
    baseSaleAttrId,
    saleAttrValueName: saleAttrValue as string,
  }
  // 当saleAttrValueName不为空时且不是空格时
  if ((saleAttrValue as string).trim() == '') {
    ElMessage.error('属性值名称不能为空')
    return
  }
  // 判断属性值名称是否重复
  let isRepeat = row.spuSaleAttrValueList.some((item) => {
    return item.saleAttrValueName === saleAttrValue
  })
  if (isRepeat) {
    ElMessage.error('属性值名称重复')
    return
  }
  // 追加新的销售属性值对象
  row.spuSaleAttrValueList.push(newSaleAttrValue)
}
// 计算出还未选择的销售属性
const unSelectSaleAttr = computed(() => {
  let unSelectAttr = allSaleAttr.value.filter((item) => {
    return saleAttr.value.every((item1) => {
      return item.name !== item1.saleAttrName
    })
  })
  return unSelectAttr
})
// addNewSaleAttr 添加新的销售属性（选择框）
const addNewSaleAttr = () => {
  const [baseSaleAttrId, saleAttrName] = saleAttrIdAndName.value.split(':')
  let newSaleAttr: SaleAttr = {
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList: [],
  }
  saleAttr.value.push(newSaleAttr)
  saleAttrIdAndName.value = ''
}
// 保存按钮的回调
const save = async () => {
  // 整理照片墙的数据
  SpuParams.value.spuImageList = imgList.value.map((item: any) => {
    return {
      imgName: item.name,
      imgUrl: (item.response && item.response.data) || item.url,
    }
  })
  // 整理属性值名称的数据
  SpuParams.value.spuSaleAttrList = saleAttr.value

  // 发送请求
  let result = await reqAddOrUpdateSpu(SpuParams.value)
  if (result.code === 200) {
    ElMessage.success(SpuParams.value.id ? '修改成功' : '添加成功')
    changeScene()
  } else {
    ElMessage.error(SpuParams.value.id ? '修改失败' : '添加失败')
  }
}

// 对外暴露
defineExpose({
  initHasSpuData,
  initSpuData,
})
</script>

<style scoped lang="scss"></style>
