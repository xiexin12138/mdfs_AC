<template>
	<div>
		<bar></bar>
		<router-view></router-view>
		<foot></foot>
	</div>
</template>

<script>
import Bar from '@/components/common/Bar'
import Foot from '@/components/common/Foot'

export default {
	components: {
		Bar,
		Foot,
	}
}
</script>
