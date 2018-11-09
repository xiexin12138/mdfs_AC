<template>
<div style="height:100%">
  <el-row type="flex" class="row-bg" justify="center">
  <el-col style="width:900px;">
  <div class="grid-content">
  <el-row type="flex" justify="end">
      <el-col style="width:250px;">
        <div style="margin-bottom:10px;">
        <el-button type="primary" size="medium" @click="goToNewUser" round>新建</el-button>
        <el-button type="primary" size="medium" @click="deleteUsers" round>删除</el-button>
        <el-button type="primary" size="medium" @click="goToUpdateUser" round>修改</el-button>
        </div>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      stripe
      border
      style="width: 100%"
      height="300"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="50">
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="status"
        label="用户状态"
        width="120">
      </el-table-column>
      <el-table-column
        prop="expire"
        label="有效期"
        width="150">
      </el-table-column>
      <el-table-column
        prop="last"
        label="上次登录时间"
        width="150">
      </el-table-column>
      <el-table-column
        prop="ip"
        label="登录终端IP"
        width="150">
      </el-table-column>
      <el-table-column
        prop="mac"
        label="登录终端MAC"
        width="159">
      </el-table-column>
    </el-table>
    <el-row type="flex" class="row-bg" justify="end">
      <el-col style="width:480px;">
        <div class="divide">
          <el-pagination
            background
            layout="total, prev, pager, next"
            :page-size="pageSize"
            :total="total"
            :current-page="currentPage"
            @current-change="handleCurrentChange">
          </el-pagination>
        </div>
      </el-col>
    </el-row>

    </div>
  </el-col>
  </el-row>
</div>
</template>

<script>
/**
 * 这个文件是用户管理页面中的所有内容
 */
import {
  Table,
  TableColumn,
  Pagination,
  Button,
  Row,
  Col,
  Message
} from 'element-ui'
import Vue from 'vue'

Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)

export default {
  mounted: async function() {
    await this.$store.dispatch('getdatatable', {
      pageSize: 10,
      currentPage: 0
    }).catch((e)=>{
      Message({
          showClose: true,
          message: e.toString(),
          type: 'error',
          duration: 2000
        })
    })
  },
  data() {
    return {
      multipleSelection: []
    }
  },
  computed: {
    tableData() {
      let data = this.$store.getters.getDataTable
      if (data.length > 0) {
        let dataNew = data.map(value => {
          let newValue = Object.assign({}, value)
          console.log(newValue.status)
          // TODO 状态码需要仔细考虑
          if (newValue.status == 0) {
            newValue.status = '正常'
          } else {
            newValue.status = '禁用'
          }
          return newValue
        })
        return dataNew
      }
      return []
    },
    total() {
      return this.$store.getters.getDataTotal
    },
    pageSize() {
      return this.$store.getters.getDataPageSize
    },
    currentPage() {
      return this.$store.getters.getDataCurrentPage
    }
  },
  methods: {
    goToNewUser() {
      this.$router.push({ path: '/content/newuser' })
    },
    goToUpdateUser() {
      if (this.multipleSelection.length !== 1) {
        Message({
          showClose: true,
          message: '请选择一项用户进行修改',
          type: 'error',
          duration: 2000
        })
        return false
      }
      let id = this.multipleSelection[0].id
      this.$router.push({ path: '/content/updateuser/' + id })
    },
    deleteUsers() {
      if (this.multipleSelection.length === 0) {
        Message({
          showClose: true,
          message: '请选择需要删除的用户',
          type: 'error',
          duration: 2000
        })
        return false
      }
      let id = this.multipleSelection.map(({ id }) => id)
      // TODO 返回结果的处理
      this.$store
        .dispatch('deletedatatable', {
          id
        })
        .then(() => {
          Message({
            showClose: true,
            message: '操作成功',
            type: 'success',
            duration: 2000
          })
        })
        .catch(e => {
          Message({
            showClose: true,
            message: e.message,
            type: 'error',
            duration: 2000
          })
        })
    },
    handleCurrentChange(val) {
      this.$store.dispatch('getdatatable', {
        pageSize: this.pageSize,
        currentPage: val-1
      })
    },
    handleSelectionChange(val) {
      // 选中的都是一整行数据
      this.multipleSelection = val
    }
  }
  // mounted: function() {
  //   this.$store.dispatch('updateTable')
  // },
  // props: ['tableData']
}
</script>

<style>
.divide {
  margin: 20px 0;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
