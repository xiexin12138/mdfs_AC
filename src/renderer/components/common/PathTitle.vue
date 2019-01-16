<template>
  <h1 id="head">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item) in $route.meta.title">
        {{item}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </h1>
</template>

<script>
import Vue from 'vue'
import { Header } from 'element-ui'

Vue.use(Header)

export default {
	name:'pathtitle'
}
</script>
