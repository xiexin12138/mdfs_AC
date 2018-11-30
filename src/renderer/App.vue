<template>
  <div id="app" class='fullScreen'>
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from 'vue'

  export default {
    name: 'mimic'
  }
</script>

<style>
  /* CSS */
html, body{
  height:100%;
	padding: 0px;
	margin: 0px;
}
*{
	font-family:"Microsoft YaHei";
}
.fullScreen{
  height:100%
}
</style>
