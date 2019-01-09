<template>
  <el-container class='fullScreen'>
    <el-header style="background-color:#f9fafc;">
      <h1>控制台设置</h1>
    </el-header>
    <el-main id="main" class='fullScreen'>
      <router-view></router-view>
    </el-main>
    <foot></foot>
  </el-container>
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
