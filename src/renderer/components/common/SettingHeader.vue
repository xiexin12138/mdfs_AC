`<template>
<!--el-header修改高度用其自己的参数height-->
<el-header class="head-bar" height='40px'>
  <el-dropdown :hide-on-click="false" class='user-setting'>
    <span class="el-dropdown-link">
      {{ username }} [{{ usergroup }}]<i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <!--<el-dropdown-item @click.native="logout">注销登录</el-dropdown-item>-->
      <el-dropdown-item @click.native="dialogVisible = true">注销登录</el-dropdown-item>

    </el-dropdown-menu>
  </el-dropdown>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="30%">
  <span>确定注销当前账户？</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="danger" @click="logout">确 定</el-button>
  </span>
</el-dialog>
</el-header>
</template>
<script>
import Vue from 'vue'
import {
  Header,
  Message
} from 'element-ui'
import * as consoleConfig from '../../api/consoleConfig'

Vue.use(Header)

export default {
  name: 'settingheader',
  data() {
    return {
      dialogVisible: false
    };
  },
  computed: {
    username: function() {
      // `this` 指向 vm 实例
      return this.$store.getters.getUserName
    },
    usergroup: function(){
      if (this.$store.getters.getUserType == 1) {
        return "管理员组"
      } else{
        return "监控组"
      }
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    logout() {
      this.dialogVisible = false
      window.location.reload()
      this.$router.push({
        path: '/'
      })
      Message({
        showClose: true,
        message: '注销成功！',
        type: 'success',
        duration: 2000
      })
      let data = {
        name: this.$store.getters.getUserName
      }
      consoleConfig.Logout(data)
    },
  }
}
</script>
<style>
.head-bar {
  background-color: #252a2f;
}

.el-dropdown-link {
  cursor: pointer;
  color: white;
}

.user-setting {
  height: 100%;
  font-size: 16px;
  float: right;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
`
