<template>
	<div>
  <el-row type="flex" class="row-bg" justify="center">
  <el-col style="width:750px;">
  <div class="grid-content">
  <el-row type="flex" justify="end">
      <el-col style="width:75px;">
        <div style="margin-bottom:10px;">
     <!--    <el-button type="primary" size="medium" @click="goToDownloadErrorFile" round>下载</el-button> -->
        </div>
      </el-col>
    </el-row>

  <el-table
    stripe
      stripe
  
    :data="tableData1"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">

          <el-form-item label="系统类型">
            <span>{{ props.row.type }}</span>
          </el-form-item>
          <el-form-item label="挂载路径">
            <span>{{ props.row.mountPoint }}</span>
          </el-form-item>
          <el-form-item label="服务器地址">
            <span>{{ props.row.mountAddr }}</span>
          </el-form-item>
          <el-form-item label="端口号">
            <span>{{ props.row.mountport }}</span>
          </el-form-item>
          <el-form-item label="存储空间">
            <span>{{ props.row.fssize }}</span>
          </el-form-item>
          <el-form-item label="已用空间">
            <span>{{ props.row.fsused }}</span>
          </el-form-item>
          <el-form-item label="剩余空间">
            <span>{{ props.row.fsavail }}</span>
          </el-form-item>
          <el-form-item label="同步情况">
            <span>{{ props.row.sync }}</span>
          </el-form-item>
          <el-form-item label="判决服务">
            <span>{{ props.row.judge }}</span>
          </el-form-item>

        </el-form>
      </template>
    </el-table-column>

    <el-table-column
      label="#FSID"
      prop="id">
    </el-table-column>

    <el-table-column
      label="文件系统名称"
      prop="name">
    </el-table-column>

    <el-table-column
      label="文件系统状态"
      prop="fsstate">
    </el-table-column> 

    <el-table-column
      fixed="right"
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button
          v-if="scope.row.fsstate=='stopping'||scope.row.fsstate=='breakdown'||scope.row.fsstate=='stop running'"
          @click.native.prevent="fix(scope.$index,tableData1)"
          type="text"
          size="small">
          修复
        </el-button>
      </template>
    </el-table-column>

  </el-table>

      </div>
  </el-col>
  </el-row>
</div>
</template>

<script>
import {
  Table,
  TableColumn,
  Pagination,
  Button,
  Row,
  Col,
  Message,
  MessageBox,

} from 'element-ui'
import Vue from 'vue'
import * as errorFS from '../../api/errorFS'

Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)

export default {

    data() {
      return {
        timer:null,
      	      	//表内数据
        tableData1: [], //
      }
    },
  mounted: async function() {
    await this.updatePage()  
    console.log()

    this.timer = setInterval(async () => {
      await this.updatePage()
    }, 5000)

  },
  destroyed: function(){
    clearInterval(this.timer)
  },

methods: {
     // 将更新整个页面的功能抽离成一个公共函数
    async updatePage(){
 		var tableData = await errorFS.GetFSs()
 		console.log(111,tableData)

        tableData.forEach((value,index,array)=>{
        		//fsstate转换
		        if(value.fsstate==0){
		        	value.fsstate='running'
		         }
		         if(value.fsstate==1){
		        	value.fsstate='ready'
		         }
		         if(value.fsstate==2){
		        	value.fsstate='repairing'
		         }
		         if(value.fsstate==3){
		        	value.fsstate='stopping'
		         }
		         if(value.fsstate==4){
		        	value.fsstate='breakdown'
		         }
		         if(value.fsstate==5){
		        	value.fsstate='stop running'
		         }
		         if(value.fsstate==6){
		        	value.fsstate='repairing'
		         }

		         //sync
		         if(value.sync==0){
		        	value.sync='未同步'
		         }
		         if(value.sync==1){
		        	value.sync='已同步'
		         }

		         //judge
		         if(value.judge==0){
		        	value.judge='未提供判决服务'
		         }
		         if(value.judge==1){
		        	value.judge='提供判决服务'
		         }
        })

        this.tableData1 = tableData

    },

	 async fix(index, rows) {
	        let fs_id= rows[index].id
	         console.log(fs_id)   
	        await errorFS.CleanFS(fs_id)
	        .then(() => {
	          rows[index].fsstate='repairing'
	          Message({
	            showClose: true,
	            message: '修复请求已成功提交',
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


	}

  }

</script>

<style>
 .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

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