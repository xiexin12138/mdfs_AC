<template>

<el-header>
	<el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" @select="" v-bind:router="true">
       	
       	<el-submenu index="/user">
			<template slot='title'>
				<i class="el-icon-document"></i>
				<span>用户管理</span>
			</template>
			<el-menu-item index="/user/userlist">用户列表管理</el-menu-item>
			<el-menu-item index="/user/grouplist">用户组管理</el-menu-item>
			<el-menu-item index="/user/usergroupmanage">用户与组映射关系管理</el-menu-item>
		</el-submenu>


	<!-- 	<el-menu-item index="/home" >
			<i class="el-icon-document"></i>
			<span slot="title">用户管理</span>
		</el-menu-item> -->
		<!-- <el-menu-item index="/config" >
			<i class="el-icon-setting"></i>
			<span slot="title">配置管理</span>
		</el-menu-item> -->
		<el-submenu index="/config">
			<template slot='title'>
				<i class="el-icon-setting"></i>
				<span>配置管理</span>
			</template>
			<el-menu-item index="/config/filesystem">文件系统配置</el-menu-item>
			<!-- <el-menu-item index="/config/mountnode">挂载节点配置</el-menu-item> -->
			<el-menu-item index="/config/cert">全局证书配置</el-menu-item>
			<el-menu-item index="/config/globalpara">全局参数配置</el-menu-item>
		</el-submenu>

		<el-submenu index="/monitor">
			<template slot='title'>
				<i class="el-icon-view"></i>
				<span>监控视图</span>
			</template>
			<el-menu-item index="/monitor/fseorror">文件系统监控</el-menu-item>
			<el-menu-item index="/monitor/nodestatus">节点状态监控</el-menu-item>
			<el-menu-item index="/monitor/edataeorror">元数据监控</el-menu-item>
		</el-submenu>        
         
		<el-submenu index="/mounter">
			<template slot='title'>
				<i class="el-icon-info"></i>
				<span>挂载管理</span>
			</template>
			<el-menu-item index="/mounter/mountFS">文件系统挂载关系配置</el-menu-item>
			<el-menu-item index="/mounter/showfsmount">文件系统挂载关系展示</el-menu-item>
			<el-menu-item index="/mounter/mountermanage">挂载节点管理</el-menu-item>			
		</el-submenu>

		<el-submenu index="/auth">
			<template slot='title'>
				<i class="el-icon-edit-outline"></i>
				<span>其他管理</span>
			</template>
			<el-menu-item index="/auth/creatdir">目录管理</el-menu-item>
			<el-menu-item index="/auth/errorfilemanage">异常文件管理</el-menu-item>			
		</el-submenu>

	</el-menu>
	</el-header>
</template>

<script>
/**
 * @author Craig
 * @version 1.0.0
 * @date    2018-05-03
 * @description 导航栏的代码，所见即所得，没有逻辑代码
 */
import Vue from 'vue'
import { Menu, MenuItem, Header,Submenu } from 'element-ui'

Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Header)
Vue.use(Submenu)

export default {
	name:'Bar',
	data() {
		return {
			route1:{ path:'/user'},
			route2:{ path:'/config'},
			route3:{ path:'/monitor'},
			route4:{ path:'/auth'},
		}
	}
}
</script>
