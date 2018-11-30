<template>
	<el-container style="height:100%">
			<el-header style="background-color:#f9fafc">
				<h1 id="head">配置管理</h1>
			</el-header>
			<el-main id="main" style="height:100%">
				<router-view></router-view>
			</el-main>
			<foot></foot>
	 </el-container>
</template>

<script>
import Bar from '@/components/common/Bar'
import Foot from '@/components/common/Foot'

export default {
	components: {
		Bar,
    Foot
	}
}
</script>
