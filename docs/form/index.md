<!--
 * @Description: 
 * @Author: v833
 * @Date: 2022-08-13 15:36:37
 * @LastEditors: v833
 * @LastEditTime: 2022-08-13 15:56:22
-->
## 表单

1. 可配置 通过json对象的方式自动生成表单
2. 具备更完善的功能, 表单验证, 动态删减表单, 集成第三方的插件(富文本)
3. 用法简单, 扩展性强, 可维护性强
4. 能够用在更多的场景中, 比如弹窗嵌套表单

### 准备工作

1. 分析 `element-plus` 表单能够在哪些方面做优化
2. 完善我们封装表单的类型, 支持ts
3. 封装的表单要具备 `element-plus` 原表单的所有功能
4. 集成第三方插件, markdown, 富文本

```ts
<template>
  <el-form ref="form" v-if="model" :validate-on-rule-change="false" :model="model" :rules="rules" v-bind="$attrs">
    <template v-for="(item, index) in options" :key="index">
      <el-form-item v-if="!item!.children || !item.children!.length" :prop="item.prop" :label="item.label">
        <component v-if="!['editor', 'upload'].includes(item.type)" :is="`el-${item.type}`" v-bind="item.attrs"
          v-model="model[item.prop!]" :placeholder="item.placeholder"></component>
        <el-upload v-else-if="item.type === 'upload'" v-bind="item.uploadAttrs" :on-change="handleChange"
          :on-before-upload="handleBeforeUpload" :on-preview="handlePreview" :on-remove="handleRemove"
          :on-before-remove="handleBeforeRemove" :on-success="handleSuccess" :on-exceed="handleExceed"
          :on-error="handleError" :on-progress="handleProgrerss">
          <slot name="uploadArea"></slot>
          <slot name="uploadTip"></slot>
        </el-upload>
        <div id="editor" v-else-if="item.type === 'editor'"></div>
      </el-form-item>
      <el-form-item v-if="item.children && item.children.length" :prop="item.prop" :label="item.label">
        <component :is="`el-${item.type}`" v-bind="item.attrs" v-model="model[item.prop!]"
          :placeholder="item.placeholder">
          <component v-for="(child, i) in item.children" :is="`el-${child.type}`" :key="i" :label="child.label"
           :value="child.value"></component>
        </component>
      </el-form-item>
    </template>
    <el-form-item>
      <slot name="action" :form="form" :model="model" />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">

import { FormOptions } from './types';
import { PropType, ref, onMounted, watch, nextTick } from 'vue';
import cloneDeep from 'lodash/cloneDeep';
import E from 'wangeditor'

const props = defineProps({
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true
  },
  httpRequest: {
    type: Function
  },
})

const emits = defineEmits(['on-preview', 'on-change', 'on-success', 'on-error', 'on-remove', 'before-upload', 'before-remove', 'on-exceed', 'on-progress'])

// const expose = defineExpose(['resetForm', 'onSubmit'])

const model = ref<any>(null)

const rules = ref<any>(null)

const form = ref(null)

const edit = ref()

const initForm = () => {
  if (!props?.options?.length) return
  const _model: any = {}
  const _rules: any = {}

  props.options.forEach((item: FormOptions) => {
    _model[item.prop!] = item.value
    _rules[item.prop!] = item.rules
    if (item.type === 'editor') {
      // 初始化富文本
      nextTick(() => {
        if (document.getElementById('editor')) {
          const _editor = new E('#editor')
          _editor.config.placeholder = item.placeholder
          _editor.create()
          _editor.txt.html(item.value)
          _editor.config.onchange = (newHtml: string) => {
            // console.log('newHtml: ', newHtml);
            model.value[item.prop!] = newHtml
          }

          edit.value = _editor
        }
      })
    }
  })

  model.value = cloneDeep(_model)
  rules.value = cloneDeep(_rules)
}

onMounted(() => {
  initForm()
})

watch(
  () => props.options,
  () => {
    initForm()
  },
  {
    deep: true
  }
)

const resetFields = () => {
  form.value.resetFields()
  if (props.options?.length) {
    let editorItem = props.options.find((item: FormOptions) => item.type === 'editor')!
    edit.value.txt.html(editorItem.value || '')
  }
}

const validate = () => {
  return form.value.validate
}

const getFormData = () => {
  return model.value
}

// vue2 $children
defineExpose({
  resetFields,
  validate,
  getFormData
})


const handleChange = (file: any, fileList: any) => {
  emits('on-change', file, fileList)
}
const handleBeforeUpload = (file: any, fileList: any) => {
  emits('before-upload', { file, fileList })
}
const handlePreview = (file: any) => {
  emits('on-preview', file)
}
const handleRemove = (file: any, fileList: any) => {
  emits('on-remove', { file, fileList })
}
const handleBeforeRemove = (file: any, fileList: any) => {
  emits('before-remove', { file, fileList })
}
const handleSuccess = (response: any, file: any, fileList: any) => {
  emits('on-success', { response, file, fileList })
}
const handleExceed = (file: any, fileList: any) => {
  emits('on-exceed', { file, fileList })
}
const handleError = (err: any, file: any, fileList: any) => {
  emits('on-error', { err, file, fileList })
}
const handleProgrerss = (event: any, file: any, fileList: any) => {
  emits('on-progress', { event, file, fileList })
}

</script>

<style lang="scss" scoped>
</style>

```