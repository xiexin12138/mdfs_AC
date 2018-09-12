/**
 * 所有的路由都在这个文件里配置
 */
import Vue from 'vue'
import Router from 'vue-router'

import ResetPasswordPage from '@/components/ResetPasswordPage'
import LoginPage from '@/components/LoginPage'
// import HomePage from '@/components/HomePage'
import NewUserPage from '@/components/NewUserPage'
import UpdateUserPage from '@/components/UpdateUserPage'

import ConfigPage from '@/components/ConfigPage'
import FileSystem from '@/components/ConfigPage/FileSystem'
import Cert from '@/components/ConfigPage/Cert'
import GlobalPara from '@/components/ConfigPage/GlobalPara'
import MountNode from '@/components/ConfigPage/MountNode'

import MonitorPage from '@/components/MonitorPage'
import FSEorrorPage from '@/components/MonitorPage/FSEorrorPage'
import NodeStatusPage from '@/components/MonitorPage/NodeStatusPage'
import EDataEorrorPage from '@/components/MonitorPage/EDataEorrorPage'

import MounterPage from '@/components/MounterPage'
import MounterManage from '@/components/MounterPage/MounterManage'
import MountFS from '@/components/MounterPage/MountFS'
import ShowFSMount from '@/components/MounterPage/ShowFSMount'
import AddMounter from '@/components/MounterPage/AddMounter'
import UpdateMounter from '@/components/MounterPage/UpdateMounter'

import AuthManagePage from '@/components/AuthManagePage'
import CreatDir from '@/components/AuthManagePage/CreatDir'
import AddDir from '@/components/AuthManagePage/AddDir'
import UpdateDir from '@/components/AuthManagePage/UpdateDir'

import ErrorFileManage from '@/components/AuthManagePage/ErrorFileManage'
import DownloadErrorFile from '@/components/AuthManagePage/DownloadErrorFile'


import UserManagePage from '@/components/UserManagePage'
import UserListPage from '@/components/UserManagePage/UserListPage'
import GroupListPage from '@/components/UserManagePage/GroupListPage'
import AddGroup from '@/components/UserManagePage/GroupListPage/AddGroup'
import UpdateGroup from '@/components/UserManagePage/GroupListPage/UpdateGroup'
import UserGroupManagePage from '@/components/UserManagePage/UserGroupManagePage'
import AddGroupRela from '@/components/UserManagePage/UserGroupManagePage/AddGroupRela'
import UpdateGroupRela from '@/components/UserManagePage/UserGroupManagePage/UpdateGroupRela'
//
import GroupManagePage from '@/components/UserManagePage/GroupManagePage'

Vue.use(Router)

let router = new Router({
	
	routes:[
		{
			path:'/resetpassword',
			component: ResetPasswordPage
		},
		{
			path:'/',
			component: LoginPage
		},

		
		{
			path:'/user',
			component: UserManagePage,
			// vue-router的嵌套路由
			children:[
				{
					path:'userlist',
					component:UserListPage
				},
				{
					path:'grouplist',
					component:GroupListPage
				},
				{
					path:'addgroup',
					component:AddGroup
				},
				{
					path:'updategroup/:id',
					component:UpdateGroup
				},
				{
					path:'usergroupmanage',
					component:UserGroupManagePage
				},
				{
					path:'addgrouprela',
					component:AddGroupRela
				},
				{
					path:'updategrouprela/:targetuser',
					component:UpdateGroupRela
				},
				//
				{
					path:'groupmanage',
					component:GroupManagePage
				},

			]
		},
		// {
		// 	path:'/home',
		// 	component: HomePage
		// },
		{
			path:'/config',
			component: ConfigPage,
			// vue-router的嵌套路由
			children:[
				{
					path:'filesystem',
					component:FileSystem
				},
				{
					path:'cert',
					component:Cert
				},
				{
					path:'globalpara',
					component:GlobalPara
				},
				// {
				// 	path:'mountnode',
				// 	component:MountNode
				// },
			]
		},
		{
			path:'/monitor',
			component: MonitorPage,
			// vue-router的嵌套路由
			children:[
				{
					path:'fseorror',
					component:FSEorrorPage
				},
				{
					path:'nodestatus',
					component:NodeStatusPage
				},
				{
					path:'edataeorror',
					component:EDataEorrorPage
				},

			]
		},
		{
			path:'/mounter',
			component: MounterPage,
			// vue-router的嵌套路由
			children:[
				{
					path:'mountermanage',
					component:MounterManage
				},
				{
					path:'mountFS',
					component:MountFS
				},
				{
					path:'showfsmount',
					component:ShowFSMount
				},
				{
					path:'addmounter',
					component:AddMounter
				},
				{
					path:'updatemounter/:id',
					component:UpdateMounter
				}
			]
		},
		{
			path:'/newuser',
			component: NewUserPage
		},
		{
			path:'/updateuser/:id',
			component: UpdateUserPage
		},
		
		{
			path:'/auth',
			component: AuthManagePage,
			// vue-router的嵌套路由
			children:[
				{
					path:'creatdir',
					component:CreatDir
				},
				{
					path:'adddir',
					component:AddDir
				},
				{
					path:'upadatedir/:id',
					component:UpdateDir
				},
				
				{
					path:'errorfilemanage',
					component:ErrorFileManage
				},
				{
					path:'downloadfile/:download_info',
					component:DownloadErrorFile
				}
			]
		},


	]

})

export default router
