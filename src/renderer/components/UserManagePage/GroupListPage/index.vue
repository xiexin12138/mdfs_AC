<template>
<div>
  <el-row type="flex" class="row-bg" justify="center">
  <el-col style="width:750px;">
  <div class="grid-content">
  <el-row type="flex" justify="end">
      <el-col style="width:250px;">
        <div style="margin-bottom:10px;">
        <el-button type="primary" size="medium" @click="goToNewGroup" round>新建</el-button>
        <el-button type="primary" size="medium" @click="deleteGroups" round>删除</el-button>
        <el-button type="primary" size="medium" @click="goToUpdateGroups" round>修改</el-button>
        </div>
      </el-col>
    </el-row>
    <el-table
      :data="groups"
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
        label="组群id"
        width="150">
      </el-table-column>
      <el-table-column
        prop="groupName"
        label="组群名称"
        width="540">
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
      total:10,
      currentPage:1,
      pageSize:10,
      groups: []
    }
  },

  methods: {
    // 将更新整个页面的功能抽离成一个公共函数
    async updatePage(){
      await this.$store.dispatch('getgroups', { 

        pageSize: 10,
        currentPage: 1,
         

      }).catch((e)=>{
        Message({
            showClose: true,
            message: e.toString(),
            type: 'error',
            duration: 2000
          })
      })
      let g = this.$store.getters.getGroups
      // console.log(g)
      this.groups = g.groups
      this.total = +g.total
      this.pageSize= +g.pageSize
      this.currentPage= +g.currentPage
    },


		async handleCurrentChange(val){

      await this.$store.dispatch('getgroups', { 

        pageSize: 10,
        currentPage: val,
      
      }).catch((e)=>{
        Message({
            showClose: true,
            message: e.toString(),
            type: 'error',
            duration: 2000
          })
      })
      let g = this.$store.getters.getGroups
      this.groups = g.groups
      this.total = +g.total
      this.pageSize= +g.pageSize
      this.currentPage= +g.currentPage
		
		},

 //新建目录，跳转至新建目录页面
    goToNewGroup() {
      this.$router.push({ path: '/user/addgroup' })
    },

    goToUpdateGroups() {
      if (this.multipleSelection.length !== 1) {
        Message({
          showClose: true,
          message: '请选择一个组进行修改',
          type: 'error',
          duration: 2000
        })
        return false
      }
      let id = this.multipleSelection[0].id
      // console.log(id)
      // this.$router.push({ path: '/user/updategroup/' })
      this.$router.push({ path: '/user/updategroup/' + id })
    },

   async deleteGroups() {
    console.log(this.multipleSelection.length)
      if (this.multipleSelection.length === 0) {
        Message({
          showClose: true,
          message: '请选择需要删除的目录',
          type: 'error',
          duration: 2000
        })
        return false
      }
       // let id = this.multipleSelection.map(({ id }) => id)
      var id=new Array();
      var groupname= new Array();

      for (let i = 0; i < this.multipleSelection.length; i++) {
        groupname.push(this.multipleSelection[i].groupName)
        id.push(this.multipleSelection[i].id)
      }
       // console.log(groupname)
       // console.log(id)

      // TODO 返回结果的处理
      this.$store
        .dispatch('deletegroups', {
          id,
          groupname,
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

        await this.updatePage()

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
