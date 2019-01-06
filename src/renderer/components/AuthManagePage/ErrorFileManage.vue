<template>
<div>
  <el-row type="flex" class="row-bg" justify="center">
  <el-col style="width:750px;">
  <div class="grid-content">
  <el-row type="flex" justify="end">
      <el-col style="width:75px;">
        <div style="margin-bottom:10px;">
        <el-button type="primary" size="medium" @click="goToDownloadErrorFile" round>下载</el-button>
        </div>
      </el-col>
    </el-row>
    <el-table
      :data="errorfiles"
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
        prop="exFsName"
        label="异常文件名称"
        width="150">
      </el-table-column>

      <el-table-column
        prop="fsid"
        label="所属文件系统ID"
        width="150">
      </el-table-column>

      <el-table-column
        prop="time"
        label="异常文件生成时间"
        width="200">
      </el-table-column>

      <el-table-column
        prop="srcPath"
        label="异常文件全路径"
        width="199">
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
import * as errorFile from '../../api/errorFile'

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
      errorfiles: []
    }
  },

  methods: {
    // 将更新整个页面的功能抽离成一个公共函数
    async updatePage(){

      let data = await errorFile.GetErrorFiles(this.pageSize,this.currentPage)
      console.log(data.total)
      this.errorfiles = data.fsList 
      this.total = +data.total
      this.pageSize= +data.pageSize
      this.currentPage=+data.currentPage
    },


		async handleCurrentChange(val){

     this.currentPage= val
      let data = await errorFile.GetErrorFiles(this.pageSize,this.currentPage)
      console.log(data.total)
      this.errorfiles = data.fsList 
      this.total = +data.total
      this.pageSize= +data.pageSize
      this.currentPage=+data.currentPage
		
		},

 //新建目录，跳转至新建目录页面
    goToDownloadErrorFile() {

      if (this.multipleSelection.length !== 1) {
        Message({
          showClose: true,
          message: '请选择一个异常文件进行下载',
          type: 'error',
          duration: 2000
        })
        return false
      }

      let download_info=this.multipleSelection[0].exFsName
      console.log(download_info)
 

      this.$router.push({ path: '/content/auth/downloadfile/' + download_info})
      // this.$router.push({ path: '/auth/downloadfile'})
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
