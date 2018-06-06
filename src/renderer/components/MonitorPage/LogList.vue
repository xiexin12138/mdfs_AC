<template>
	<div>
		<el-table :data="LogData" class="log-list-table">
		    <el-table-column type="expand">

		      <template slot-scope="props">
		        <el-form label-position="left" inline class="demo-table-expand">
		          <el-form-item label="错误码">
		            <span>{{ props.row.errorCode }}</span>
		          </el-form-item>
		          <el-form-item label="错误类型">
		            <span>{{ props.row.errorType }}</span>
		          </el-form-item>
		          <el-form-item label="产生时间">
		            <span>{{ props.row.time }}</span>
		          </el-form-item>
		          <el-form-item label="错误位置">
		            <span>{{ props.row.file_name }}</span>
		          </el-form-item>
		          <el-form-item label="详细信息">
		            <span>{{ props.row.detail }}</span>
		          </el-form-item>
		          <el-form-item label="是否修复">
		            <span>{{ props.row.repair }}</span>
		          </el-form-item>
		          <el-form-item label="修复来源">
		            <span>{{ props.row.repair_fs_file }}</span>
		          </el-form-item>
		        </el-form>
		      </template>

		    </el-table-column>
		    <el-table-column
		      label="错误码"
		      prop="errorCode">
		    </el-table-column>
		    <el-table-column
		      label="产生时间"
		      prop="time">
		    </el-table-column>
		    <el-table-column
		      label="是否修复"
		      prop="repair">
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

export default {
	data() {
      return {
        LogData: [
	        {
	          errorCode: '99',
	          errorType: '判决错误',
	          time: '20180630',
	          file_name: '/temp',
	          detail: '详细信息',
	          repair: '1',
	          repair_fs_file: 'fs2/temp'
	        },
	        {
	          errorCode: '99',
	          errorType: '判决错误',
	          time: '20180630',
	          file_name: '/temp',
	          detail: '详细信息',
	          repair: '1',
	          repair_fs_file: 'fs2/temp'
	        },
	        {
	          errorCode: '99',
	          errorType: '判决错误',
	          time: '20180630',
	          file_name: '/temp',
	          detail: '详细信息',
	          repair: '1',
	          repair_fs_file: 'fs2/temp'
	        },

        ]
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