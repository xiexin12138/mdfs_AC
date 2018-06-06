<template>
	<div>
		<bar></bar>
		<router-view></router-view>
	</div>
</template>

<script>
import Bar from '@/components/common/Bar'

export default {
	components: {
		Bar
	}
}
</script>
