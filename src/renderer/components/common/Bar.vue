<template>
<el-aside id="aside" width="210px">
  <!--<el-aside style="height:100%;border-right:2px solid;border-right-color:#f0f0f0">-->
  <el-menu :default-active="$route.path" class="el-menu-demo" unique-opened mode="vertical" background-color="#252a2f" text-color="white" active-text-color="#00c1de" style="border:solid 1px #252a2f" @select="" v-bind:router="true">
    <el-menu-item :index="summary">
      <i class="el-icon-menu"></i>
      <span slot="title">概览</span>
    </el-menu-item>
    <el-submenu :index="fsUserManage">
      <template slot='title'>
        <i class="el-icon-document"></i>
        <span>FS用户管理</span>
      </template>
      <el-menu-item :index="userlist">用户管理</el-menu-item>
      <el-menu-item :index="groupmanage">组管理</el-menu-item>
      <el-menu-item :index="changepassword">用户密码重置</el-menu-item>
      <el-menu-item :index="useraudit">用户审核</el-menu-item>
    </el-submenu>

    <el-submenu :index="cmConfig">
      <template slot='title'>
        <i class="el-icon-setting"></i>
        <span>配置管理</span>
      </template>
      <el-menu-item :index="filesystem">文件系统配置</el-menu-item>
      <!-- <el-menu-item :index="mountnode">挂载节点配置</el-menu-item> -->
      <el-menu-item :index="cert">全局证书配置</el-menu-item>
      <el-menu-item :index="globalpara">全局参数配置</el-menu-item>
      <el-menu-item :index="systemstructure">系统功能结构</el-menu-item>
      <el-menu-item :index="creatdir">目录管理</el-menu-item>
    </el-submenu>

    <el-submenu :index="monitor">
      <template slot='title'>
        <i class="el-icon-view"></i>
        <span>监控视图</span>
      </template>
      <el-menu-item :index="fseorror">文件系统监控</el-menu-item>
      <el-menu-item :index="nodestatus">节点状态监控</el-menu-item>
      <el-menu-item :index="edataeorror">元数据监控</el-menu-item>
    </el-submenu>

    <el-submenu :index="mounter">
      <template slot='title'>
        <i class="el-icon-info"></i>
        <span>挂载管理</span>
      </template>
      <el-menu-item :index="mountFS">文件系统挂载关系配置</el-menu-item>
      <el-menu-item :index="showfsmount">文件系统挂载关系展示</el-menu-item>
      <el-menu-item :index="mountermanage">挂载节点管理</el-menu-item>
    </el-submenu>

    <el-submenu :index="auth">
      <template slot='title'>
        <i class="el-icon-bell"></i>
        <span>异常管理</span>
      </template>
      <el-menu-item :index="errorfilemanage">异常文件管理</el-menu-item>
      <el-menu-item :index="errorfs">异常文件系统管理</el-menu-item>
    </el-submenu>

    <!--<el-submenu>
      <template slot='title'>
        <i class="el-icon-download"></i>
        <span>系统报表</span>
      </template>
      <el-menu-item>系统安全报表</el-menu-item>
  </el-submenu>-->

  <el-submenu :index="consoleConfig">
    <template slot='title'>
      <i class="el-icon-more"></i>
      <span>控制台设置</span>
    </template>
    <el-menu-item :index="changecuruserpwd">密码修改</el-menu-item>
    <el-menu-item :index="acgroupmanage">控制台用户管理</el-menu-item>
    <el-menu-item :index="consolepermission">控制台权限管理</el-menu-item>
    <el-menu-item :index="consolelock">锁定设置</el-menu-item>
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
import global_ from '@/utils/Global'
import permission_ from '@/utils/Permission'
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
      summary: global_.SUMMARY,
      fsUserManage: global_.FS_USER_MANAGE.indexpage,
      userlist: global_.FS_USER_MANAGE.userlist,
      groupmanage: global_.FS_USER_MANAGE.groupmanage,
      changepassword: global_.FS_USER_MANAGE.changepassword,
      useraudit: global_.FS_USER_MANAGE.useraudit,
      cmConfig: global_.CM_CONFIG.indexpage,
      filesystem: global_.CM_CONFIG.filesystem,
      cert: global_.CM_CONFIG.cert,
      globalpara: global_.CM_CONFIG.globalpara,
      systemstructure: global_.CM_CONFIG.systemstructure,
      creatdir: global_.CM_CONFIG.creatdir,
      monitor: global_.MONITOR.indexpage,
      fseorror: global_.MONITOR.fseorror,
      nodestatus: global_.MONITOR.nodestatus,
      edataeorror: global_.MONITOR.edataeorror,
      mounter: global_.MOUNTER.indexpage,
      mountFS: global_.MOUNTER.mountFS,
      showfsmount: global_.MOUNTER.showfsmount,
      mountermanage: global_.MOUNTER.mountermanage,
      auth: global_.AUTH.indexpage,
      errorfilemanage: global_.AUTH.errorfilemanage,
      errorfs: global_.AUTH.errorfs,
      consoleConfig: global_.CONSOLE_CONFIG.indexpage,
      changecuruserpwd: global_.CONSOLE_CONFIG.changecuruserpwd,
      acgroupmanage: global_.CONSOLE_CONFIG.groupmanage,
      consolepermission: global_.CONSOLE_CONFIG.consolepermission,
      consolelock: global_.CONSOLE_CONFIG.consolelock
    }
  },
  mounted: function(){
    console.log("this.$store.getters.getUserType:"+this.$store.getters.getUserType);
  }
}
</script>
<style>
#aside {
  background-color: #252a2f;
  padding-top: 10px;
}
</style>
