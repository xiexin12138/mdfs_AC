<template>
  <el-row type="flex" justify="center">
    	<el-col style="width:500px;margin-top:100px">
  			<el-form status-icon label-width="140px">
  				<el-form-item label="原密码">
  					<el-input size="small" ></el-input>
  				</el-form-item>
  				<el-form-item label="新密码" >
  					<el-input size="small" type="password"></el-input>
  				</el-form-item>
  				<el-form-item label="重复新密码">
  					<el-input size="small" type="password"></el-input>
  				</el-form-item>
  				<el-form-item >
  					<el-button type="primary" >提交</el-button>
  					<el-button >重置</el-button>
  				</el-form-item>
  			</el-form>
  		</el-col>
  </el-row>
</template>

<script>
import Vue from 'vue'
import Bar from '@/components/common/Bar'
import Foot from '@/components/common/Foot'

export default {
	components: {
		Bar,
		Foot
	}
}
</script>
