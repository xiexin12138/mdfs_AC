<template>
  	<el-container style="height:100%">
      <path-title></path-title>
  			<el-main id="main" style="height:100%">
  				<router-view></router-view>
  			</el-main>
  			<foot></foot>
  	 </el-container>
</template>

<script>
import Bar from '@/components/common/Bar'
import Foot from '@/components/common/Foot'
import PathTitle from '@/components/common/PathTitle'

export default {
	components: {
		Bar,
		Foot,
    PathTitle,
	},
}
</script>
