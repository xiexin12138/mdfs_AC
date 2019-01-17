<template>
<div id="app" class='fullScreen'>
  <router-view></router-view>
</div>
</template>

<script>
import Vue from 'vue'

// 定义全局点击和输入的监听函数
Vue.prototype.globalOperation = function(callback) {
  document.getElementById('app').onclick = function() {
    callback();
  };
  document.getElementById('app').oninput = function() {
    callback();
  };
};

export default {
  name: 'mimic',
  watch: {
    '$route': function(route) {
      // console.log(this.$store.getters.getUserName);
      console.log(this.$route.path);
      if (route.fullPath != '/content/summary') {
        this.$store.commit('UPDATE_USER_IN_SUMMARY', false)
      } else {
        this.$store.commit('UPDATE_USER_IN_SUMMARY', true)
      }
    }
  },
  mounted: function() {
    // 挂载时使用全局点击、输入的监听函数，用于实现客户端的自动锁定
    this.globalOperation(this.operaConsole);
    /*this.globalInput(this.inputConsole);*/
  },
  methods: {
    // 当出现点击和输入操作时的处理函数
    operaConsole() {
      console.log("operaConsole");
    }
  }
}
</script>

<style>
/* CSS */
html,
body {
  height: 100%;
  padding: 0px;
  margin: 0px;
}

* {
  font-family: "Microsoft YaHei";
}

.fullScreen {
  height: 100%
}
</style>
