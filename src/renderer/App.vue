<template>
  <div id="app" class='fullScreen'>
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'mimic',
  watch: {
    '$route': function(route) {
      // console.log(this.$store.getters.getUserName);
      console.log(this.$route.path);
      if(route.fullPath != '/content/summary'){
        this.$store.commit('UPDATE_USER_IN_SUMMARY', false)
      } else {
        this.$store.commit('UPDATE_USER_IN_SUMMARY', true)
      }
    }
  }
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
