<template>
	<div style="height:100%">
    <el-container style="height:100%">
    <el-header style="height:35px;background-color:#252a2f;">Header</el-header>
		<el-container style="height:100%">
			<bar/>
		  <router-view></router-view>
	  </el-container>
  </el-container>
</el-container>
	</div>
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
