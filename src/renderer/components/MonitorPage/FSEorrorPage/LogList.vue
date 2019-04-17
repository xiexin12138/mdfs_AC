<template>
	<div>
		<el-table :data="LogData" class="log-list-table">
		    <el-table-column type="expand">

		      <template slot-scope="props">
		        <el-form   class="demo-table-expand">
		          
		          <!-- <el-form-item label="错误类型">
		            <span>{{ props.row.errorType }}</span>
		          </el-form-item> -->
		          <!-- <el-form-item label="产生时间">
		            <span>{{ props.row.time }}</span>
		          </el-form-item> -->
		          <el-form-item label="错误位置：">
		            <span>{{ props.row.file_name }}</span>
		          </el-form-item>
		          
		          <!-- <el-form-item label="是否修复">
		            <span>{{ props.row.repair }}</span>
		          </el-form-item> -->
		          <el-form-item v-if="props.row.repair == '是'" label="修复来源：">
		            <span>{{ props.row.repair_fs_file }}</span>
		          </el-form-item>
		          <!-- <el-form-item label="详细信息">
		            <span>{{ props.row.detail }}</span>
		          </el-form-item> -->
		        </el-form>
		      </template>

		    </el-table-column>
<!-- 		    <el-table-column
		      label="错误类型"
		      prop="errorType"
		      width="90"
		      >
		    </el-table-column> -->
		    <el-table-column
		      label="产生时间"
		      prop="time"
		      width="170"
		      align="center">
		    </el-table-column>
		    <el-table-column
		      label="是否修复"
		      prop="repair"
		      width="90"
		      align="center">
		    </el-table-column>
		  </el-table>
	</div>
	
</template>

<script>
	import Vue from 'vue'
    import { Form, FormItem, Message, Row, Col, Upload } from 'element-ui'

	Vue.use(Form)
	Vue.use(FormItem)
	Vue.use(Row)
	Vue.use(Col)
	Vue.use(Upload)
function handle(data){
	for(let value of data){
		value.repair_fs_file = value.repair_fs
		// console.log( value.repair)
		if (value.repair == '1') {
			value.repair = '是'
		}else if(value.repair == '0'){
			value.repair = '否'
		}
	}
	return data
}
export default {
	props: ['ListData'],
	computed:{
		LogData(){
			return handle(this.ListData)
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

</style>