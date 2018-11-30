<template>
  	<el-container style="height:100%">
  			<el-header style="background-color:#f9fafc">
  				<h1 id="head">监控视图</h1>
  			</el-header>
  			<el-main id="main" style="height:100%">
  				<router-view></router-view>
  			</el-main>
  			<foot></foot>
  	 </el-container>
</template>

<script>
import Bar from '@/components/common/Bar'

export default {
	components: {
		Bar
	}
}
</script>
