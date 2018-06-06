<template>
	<div>
		<bar></bar>
		<user-table></user-table>
		<foot></foot>
	</div>
</template>

<script>
import Bar from '@/components/common/Bar'
import Foot from '@/components/common/Foot'
import UserTable from './UserTable'
export default {
	components: {
		Bar,
		Foot,
		UserTable
	}
}
</script>
