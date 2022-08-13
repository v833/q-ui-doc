<!--
 * @Description: 
 * @Author: v833
 * @Date: 2022-08-13 15:40:39
 * @LastEditors: v833
 * @LastEditTime: 2022-08-13 16:01:51
-->
## 基本用法

  <q-table :options="options" :data="data" elementLoadingText="加载中，等待一下吧……" elementLoadingBackground="black"
    @check="onCheck" isEditRow v-model:editRowIndex="editRowIndex" :total="total" pagination
    @currentChange="onCurrentChange" @size-change="onSizeChange">
    <template #date="{ scoped }">
      <el-icon-timer />
      <span style="margin-left: 10px">{{ scoped.row.date }}</span>
    </template>
    <template #name="{ scoped }">
      <el-popover effect="light" trigger="hover" placement="top" width="auto">
        <template #default>
          <div>name: {{ scoped.row.name }}</div>
          <div>address: {{ scoped.row.address }}</div>
        </template>
        <template #reference>
          <el-tag>{{ scoped.row.name }}</el-tag>
        </template>
      </el-popover>
    </template>
    <template #action="{ scoped }">
      <el-button size="small" type="primary" @click="edit(scoped)">编辑</el-button>
      <el-button size="small" type="danger">删除</el-button>
    </template>
    <template #editRow="{ scoped }">
      <el-button size="small" type="primary" @click="edit(scoped)">确定</el-button>
      <el-button size="small" type="danger">取消</el-button>
    </template>
  </q-table>

## 代码示例
<script setup>
import { ElMessage } from 'element-plus';
import { onMounted, ref, computed } from 'vue';
// import axios from 'axios';


const options = ref([
  {
    label: '日期',
    prop: 'date',
    align: 'center',
    slot: 'date',
    editable: true
  },
  {
    label: '姓名',
    prop: 'name',
    align: 'center',
    slot: 'name',
  },
  {
    label: '地址',
    prop: 'address',
    align: 'center',
    editable: true,
  },
  {
    label: '操作',
    prop: 'action',
    align: 'center',
    action: true
  }
])

const data = ref([])

const current = ref(1)
const pageSize = ref(10)
const total = ref(10)

const edit = (scoped) => {
  editRowIndex.value = 'edit'
}

const onCheck = (scoped) => {
  ElMessage.success('修改成功!')
}

const editRowIndex = ref('edit')

const getData = () => {
  // axios.post('/api/list', {
  //   current: current.value,
  //   pageSize: pageSize.value
  // }).then(res => {
  //   console.log('res: ', res);
  //   data.value = res.data.data.rows
  //   total.value = res.data.data.total
  // })
}

const onCurrentChange = (params) => {
  current.value = params
  console.log('params: ', params);
  getData()

}

const onSizeChange = (params) => {
  pageSize.value = params
  getData()
  console.log('params: ', params);

}


onMounted(() => {
  // getData()
  setTimeout(() => {
    data.value.push({
      date: '2016-05-05',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    }, {
      date: '2016-05-05',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    }, {
      date: '2016-05-05',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    }, {
      date: '2016-05-05',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    }, {
      date: '2016-05-05',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    })
  }, 1000)
})

</script>

```js
  <q-table :options="options" :data="data" elementLoadingText="加载中，等待一下吧……" elementLoadingBackground="black"
    @check="onCheck" isEditRow v-model:editRowIndex="editRowIndex" :total="total" pagination
    @currentChange="onCurrentChange" @size-change="onSizeChange">
    <template #date="{ scoped }">
      <el-icon-timer />
      <span style="margin-left: 10px">{{ scoped.row.date }}</span>
    </template>
    <template #name="{ scoped }">
      <el-popover effect="light" trigger="hover" placement="top" width="auto">
        <template #default>
          <div>name: {{ scoped.row.name }}</div>
          <div>address: {{ scoped.row.address }}</div>
        </template>
        <template #reference>
          <el-tag>{{ scoped.row.name }}</el-tag>
        </template>
      </el-popover>
    </template>
    <template #action="{ scoped }">
      <el-button size="small" type="primary" @click="edit(scoped)">编辑</el-button>
      <el-button size="small" type="danger">删除</el-button>
    </template>
    <template #editRow="{ scoped }">
      <el-button size="small" type="primary" @click="edit(scoped)">确定</el-button>
      <el-button size="small" type="danger">取消</el-button>
    </template>
  </q-table>


```