<template>
<div>
  <el-row type="flex" class="row-bg" justify="center">
  <el-col style="width:750px;">
  <div class="grid-content">
  <el-row type="flex" justify="end">
      <el-col style="width:250px;">
        <div style="margin-bottom:10px;">
        <el-button type="primary" size="medium" @click="goToNewMounter" round>新建</el-button>
        <el-button type="primary" size="medium" @click="deleteMounters" round>删除</el-button>
        <el-button type="primary" size="medium" @click="goToUpdateMounter" round>修改</el-button>
        </div>
      </el-col>
    </el-row>
    <el-table
      :data="mountersTable"
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
        prop="id"
        label="挂载节点id"
        width="120">
      </el-table-column>
      <el-table-column
        prop="type"
        label="操作系统类型"
        width="120">
      </el-table-column>
      <el-table-column
        prop="ip"
        label="挂载节点IP"
        width="150">
      </el-table-column>
      <el-table-column
        prop="state"
        label="状态"
        width="150">
      </el-table-column>
      <el-table-column
        prop="online"
        label="是否在线"
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
 * 这个文件是挂载节点信息中的所有内容
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
    await this.updatePage()
  },
  data() {
    return {
      multipleSelection: [],
      mountersTable:[{
        id:1,
        type:'linux',
        ip:'127.0.0.1',
        state:'init',
        online:'1'
      }],
      mounters:[],
      total:10,
      currentPage:1,
      pageSize:10
    }
  },

  methods: {
    // 将更新整个页面的功能抽离成一个公共函数
    async updatePage(){
      await this.$store.dispatch('getmounters', {
      }).catch((e)=>{
        Message({
            showClose: true,
            message: e.toString(),
            type: 'error',
            duration: 2000
          })
      })
      this.mounters = this.$store.getters.getMounters
      this.handleCurrentPage(this.currentPage,this.pageSize)
    },
    // 设置分页效果，mounters缓存所有结果，mountersTable显示本页内容，如果mounters数量不是很多的话，这是很有用的，太多了就需要重写了
    handleCurrentPage(currentPage,pageSize){
      this.currentPage = currentPage
      this.pageSize = pageSize
      this.total = this.mounters.length
      let start = (currentPage - 1)*(+pageSize)
      // end超出mounters最大长度的话，也可以正常得出结果
      let end = +currentPage*(+pageSize)
      this.mountersTable = this.translate(this.mounters.slice(start,end))
    },
    // 某些字段需要翻译一下
    translate(arr){
      return arr.map(value=>{
        if (value.online == 1) {
          value.online = '是'
        } else {
          value.online = '否'
        }
        // TODO state状态翻译还未完成
        return value
      })
    },
    goToNewMounter() {
      this.$router.push({ path: '/mounter/addmounter' })
    },
    goToUpdateMounter() {
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
      this.$router.push({ path: '/mounter/updatemounter/' + id })
    },
    deleteMounters() {
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
        .dispatch('deletemounters', {
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
      this.handleCurrentPage(val,this.pageSize)
    },
    handleSelectionChange(val) {
      // 选中的都是一整行数据
      this.multipleSelection = val
    }
  }

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
