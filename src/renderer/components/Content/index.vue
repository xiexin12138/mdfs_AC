<template>
	<div style="height:100%">
		<el-container style="height:100%">
			<bar/>
		  <router-view></router-view>
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
