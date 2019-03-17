<template>
	<div>
  <el-row type="flex" class="row-bg" justify="center">
  <el-col style="width:750px;">
  <div class="grid-content">
  <el-row type="flex" justify="end">
      <el-col style="width:75px;">
        <div style="margin-bottom:10px;">
        </div>
      </el-col>
    </el-row>

   <div style="margin-top: 15px; margin-bottom:10px;">
      <el-input placeholder="请输入日期查询当天系统日志，格式举例：2019-03-14" v-model="time_log">
         <el-button slot="append" icon="el-icon-search" @click="getlogInfo(tableData1)"></el-button>
      </el-input>
   </div>

  <el-table
    stripe
      stripe
  
    :data="tableData1"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">

          <el-form-item label="详细日志信息">
            <span>{{ props.row.logInfo }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>

    <el-table-column
      label="日志时间"
      prop="logDate">
    </el-table-column>

    <el-table-column
      label="logThreadId"
      prop="logThreadId">
    </el-table-column>

    <el-table-column
      label="日志等级"
      prop="logLevel"
      width="160">
    </el-table-column> 


    <el-table-column
      label="日志出现的位置"
      prop="logLocation">
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
import * as errormessage from '@/api/errormessage'

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

        time_log:'',
        
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
 		this.tableData1 = await errormessage.GetRecentLog()

    },

    async getlogInfo(){
      this.tableData1= await errormessage.GetLogByTime(this.time_log)
    }


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