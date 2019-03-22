<template>
	<div>
  <el-row type="flex" class="row-bg" justify="center">
  <el-col style="width:1100px;">
  <div class="grid-content">



   <div style="margin-top: 15px; margin-bottom:10px;">
      <el-input placeholder="请输入日期查询该日异常情况，格式举例：2019-03-14" v-model="time_error">
         <el-button slot="append" icon="el-icon-search" @click="geterrorInfo(tableData1)"></el-button>
      </el-input>
   </div>
  <el-row type="flex" style="margin-top:20px;margin-bottom:12px;margin-left:5px;"  inline class="stat">
    <el-col :span="24" inline>文件系统异常次数统计（单位：次）</el-col>
    <el-col :span="5" inline>一小时内:{{ exStaticsHour }} </el-col> <el-col :span="5" inline>一天内 :{{ exStaticsDay }} </el-col>
  </el-row>

  <el-table
    stripe
      stripe
  
    :data="tableData1"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">

          <el-form-item label="详细信息">
            <span >{{ props.row.exDetail }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>

    <el-table-column
      label="发生时间"
      align="center"
      prop="exDate">
    </el-table-column>

    <el-table-column
      label="文件系统id"
      prop="exFsId"
      align="center"
      width="100">
    </el-table-column>

    <el-table-column
      label="文件系统出错的路径"
      prop="exFsPath"
      align="center"
      width="160">
    </el-table-column> 

    <el-table-column
      label="异常文件路径"
      align="center"
      prop="exFilePath">
    </el-table-column> 

    <el-table-column
      label="转储路径"
      prop="transferPath"
      align="center"
      width="220">
    </el-table-column> 

    <el-table-column
      label="修复类型"
      prop="repairType"
      align="center"
      width="210">
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
import * as errormessage from '../../api/errormessage'

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

        time_error:'',
        exStaticsHour:'',
        exStaticsDay:'',
      }
    },
  mounted: async function() {
    await this.updatePage()  
    console.log()

    this.timer = setInterval(async () => {
      if(this.tableData1==""){
         await this.updatePage()
      }
     
    }, 4000)

  },
  destroyed: function(){
    clearInterval(this.timer)
  },

methods: {
     // 将更新整个页面的功能抽离成一个公共函数
    async updatePage(){
 		let tableData = await errormessage.GetRecentError()
    //console.log('hhhhhh',tableData)
        this.tableData1 = tableData.exInfo
        this.exStatics= tableData.exStatics

    },

    async geterrorInfo(){
      let tableData= await errormessage.GetErrorByTime(this.time_error)
      this.tableData1 = tableData.exInfo
      this.exStaticsHour = tableData.exStaticsHour
      this.exStaticsDay= tableData.exStaticsDay


    }


	}

  }

</script>

<style>
 .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
   /* width: 200px;*/
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 70%;
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
.stat{
  color:  #696969;
}
.stat-answer{
  color:  #696969;
/*  position: absolute;
  top: -45px;
  left: 666px;*/
}
</style>