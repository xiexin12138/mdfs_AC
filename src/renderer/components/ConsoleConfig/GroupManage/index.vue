<template>
<div style="height:100%">
  <el-row type="flex" class="row-bg" justify="center">
    <el-col style="width:900px;">
      <div class="grid-content">
        <el-row type="flex" justify="end">
          <el-col style="width:250px;">
            <div style="margin-bottom:10px;">
              <el-button type="primary" size="medium" @click="goToNewACUser" round>新建</el-button>
              <el-button type="primary" size="medium" @click="deleteACUsers" round>删除</el-button>
              <el-button type="primary" size="medium" @click="goToUpdateACUser" round>修改</el-button>
            </div>
          </el-col>
        </el-row>
        <el-table :data="tableData" stripe border style="width: 100%" height="300" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="50">
          </el-table-column>
          <el-table-column prop="id" label="用户id" width="120">
          </el-table-column>
          <el-table-column prop="name" label="用户名">
          </el-table-column>
          <!--<el-table-column prop="status" label="启用状态">
          </el-table-column>-->
          <el-table-column prop="loginUserType" label="用户组">
          </el-table-column>
          </el-table-column>
        </el-table>
        <el-row type="flex" class="row-bg" justify="end">
          <el-col style="width:480px;">
            <div class="divide">
            </div>
          </el-col>
        </el-row>
      </div>
    </el-col>
  </el-row>
</div>
</template>

<script>
import Vue from 'vue'
import {
  Table,
  TableColumn,
  Pagination,
  Button,
  Row,
  Col,
  Message
} from 'element-ui'
import Bar from '@/components/common/Bar'
import Foot from '@/components/common/Foot'
import global_ from '@/utils/Global'

Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)

export default {
  components: {
    Bar,
    Foot
  },
  data() {
    return {
      multipleSelection: []
    }
  },
  mounted: async function() {
    await this.$store.dispatch('getacdatatable', {
      acPageSize: 5,
      acCurrentPage: 0
    }).catch((e) => {
      Message({
        showClose: true,
        message: e.toString(),
        type: 'error',
        duration: 2000
      })
    })
  },
  computed: {
    tableData() {
      let data = this.$store.getters.getAcDataTable
      if (data.length > 0) {
        let dataNew = data.map(value => {
          let newValue = Object.assign({}, value)
          if (newValue.loginUserType == 1) {
            newValue.loginUserType = '管理员组'
          } else {
            newValue.loginUserType = '监控用户组'
          }
          return newValue
        })
        return dataNew
      }
      return []
    },
    total() {
      return this.$store.getters.getAcDataTable
    },
    pageSize() {
      return this.$store.getters.getDataPageSize
    },
    currentPage() {
      return this.$store.getters.getDataCurrentPage
    }
  },
  methods: {
    goToNewACUser() {
      this.$router.push({
        path: global_.CONSOLE_CONFIG.addacuser
      })
    },
    goToUpdateACUser() {
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
      this.$router.push({
        path: global_.CONSOLE_CONFIG.updateacuser + id
      })
    },
    deleteACUsers() {
      if (this.multipleSelection.length === 0) {
        Message({
          showClose: true,
          message: '请选择需要删除的用户',
          type: 'error',
          duration: 2000
        })
        return false
      }
      let curid = this.multipleSelection.map(({
        id
      }) => id)
      // TODO 返回结果的处理
      let curUserName = this.$store.getters.getUserName
      this.$store
        .dispatch('deleteacdatatable', {
          curid,
          curUserName
        })
        .then(() => {
          Message({
            showClose: true,
            message: '操作成功',
            type: 'success',
            duration: 2000
          })
        }).catch(e => {
          Message({
            showClose: true,
            message: e.message,
            type: 'error',
            duration: 2000
          })
          if (e.message == "Error: Error: 您已在另一地点登录，请重新登录！") {
            this.$router.push({
              path: global_.LOGIN_PAGE
            })
          }
        })
    },
    handleCurrentChange(val) {
      /*this.$store.dispatch('getdatatable', {
        pageSize: this.pageSize,
        currentPage: val-1
      })*/
    },
    handleSelectionChange(val) {
      // 选中的都是一整行数据
      this.multipleSelection = val
    }
  }
}
</script>
