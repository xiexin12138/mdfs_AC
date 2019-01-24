<template>
<el-aside id="aside" width="210px">
  <!--<el-aside style="height:100%;border-right:2px solid;border-right-color:#f0f0f0">-->
  <el-menu :default-active="$route.path"
  class="el-menu-demo"
  unique-opened
  mode="vertical"
  background-color="#252a2f"
  text-color="white" 
  active-text-color="#00c1de"
  style="border:solid 1px #252a2f"
  @select=""
  v-bind:router="true">
    <el-menu-item index="/content/summary">
      <i class="el-icon-menu"></i>
      <span slot="title">概览</span>
    </el-menu-item>
    <el-submenu index="/content/user">
      <template slot='title'>
        <i class="el-icon-document"></i>
        <span>FS用户管理</span>
      </template>
      <el-menu-item index="/content/user/userlist">用户管理</el-menu-item>
      <el-menu-item index="/content/user/groupmanage">组管理</el-menu-item>
      <el-menu-item index="/content/user/changepassword">用户密码重置</el-menu-item>
      <el-menu-item index="/content/user/useraudit">用户审核</el-menu-item>
    </el-submenu>

    <el-submenu index="/content/config">
      <template slot='title'>
        <i class="el-icon-setting"></i>
        <span>配置管理</span>
      </template>
      <el-menu-item index="/content/config/filesystem">文件系统配置</el-menu-item>
      <!-- <el-menu-item index="/content/config/mountnode">挂载节点配置</el-menu-item> -->
      <el-menu-item index="/content/config/cert">全局证书配置</el-menu-item>
      <el-menu-item index="/content/config/globalpara">全局参数配置</el-menu-item>
      <el-menu-item index="/content/config/systemstructure">系统功能结构</el-menu-item>
      <el-menu-item index="/content/config/creatdir">目录管理</el-menu-item>
    </el-submenu>

    <el-submenu index="/content/monitor">
      <template slot='title'>
        <i class="el-icon-view"></i>
        <span>监控视图</span>
      </template>
      <el-menu-item index="/content/monitor/fseorror">文件系统监控</el-menu-item>
      <el-menu-item index="/content/monitor/nodestatus">节点状态监控</el-menu-item>
      <el-menu-item index="/content/monitor/edataeorror">元数据监控</el-menu-item>
    </el-submenu>

    <el-submenu index="/content/mounter">
      <template slot='title'>
        <i class="el-icon-info"></i>
        <span>挂载管理</span>
      </template>
      <el-menu-item index="/content/mounter/mountFS">文件系统挂载关系配置</el-menu-item>
      <el-menu-item index="/content/mounter/showfsmount">文件系统挂载关系展示</el-menu-item>
      <el-menu-item index="/content/mounter/mountermanage">挂载节点管理</el-menu-item>
    </el-submenu>

    <el-submenu index="/content/auth">
      <template slot='title'>
        <i class="el-icon-bell"></i>
        <span>异常管理</span>
      </template>
      <el-menu-item index="/content/auth/errorfilemanage">异常文件管理</el-menu-item>
      <el-menu-item index="/content/auth/errorfs">异常文件系统管理</el-menu-item>
      <el-menu-item index="/content/auth/errornotify">异常告警管理</el-menu-item>
    </el-submenu>

    <el-submenu index="/content/consoleconfig">
      <template slot='title'>
        <i class="el-icon-more"></i>
        <span>控制台设置</span>
      </template>
      <el-menu-item index="/content/consoleconfig/changecuruserpwd">密码修改</el-menu-item>
      <el-menu-item index="/content/consoleconfig/groupmanage">控制台用户管理</el-menu-item>
      <el-menu-item index="/content/consoleconfig/consolepermission">控制台权限管理</el-menu-item>
      <el-menu-item index="/content/consoleconfig/consolelock">锁定设置</el-menu-item>
    </el-submenu>
  </el-menu>
</el-aside>
</template>

<script>
/**
 * @author Craig
 * @version 1.0.0
 * @date    2018-05-03
 * @description 导航栏的代码，所见即所得，没有逻辑代码
 */
import Vue from 'vue'
import {
  Aside,
  Menu,
  MenuItem,
  Submenu
} from 'element-ui'

Vue.use(Aside)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
export default {
  name: 'Bar',
  data() {
    return {
      route1: {
        path: '/user'
      },
      route2: {
        path: '/config'
      },
      route3: {
        path: '/monitor'
      },
      route4: {
        path: '/auth'
      },
      route5: {
        path: '/content'
      },
      route6: {
        path: '/consoleconfig'
      },

    }
  }
}
</script>
<style>
#aside {
  background-color: #252a2f;
  padding-top: 10px;
}
</style>
