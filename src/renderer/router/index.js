/**
 * 所有的路由都在这个文件里配置
 */
import Vue from 'vue'
import Router from 'vue-router'

import ResetPasswordPage from '@/components/ResetPasswordPage'
import LoginPage from '@/components/LoginPage'
// import HomePage from '@/components/HomePage'
// import NewUserPage from '@/components/NewUserPage'
import UpdateUserPage from '@/components/UpdateUserPage'

import ConfigPage from '@/components/ConfigPage'
//
import FileSystem from '@/components/ConfigPage/FileSystem'
import Cert from '@/components/ConfigPage/Cert'
import GlobalPara from '@/components/ConfigPage/GlobalPara'
import MountNode from '@/components/ConfigPage/MountNode'
//
import SystemStructure from '@/components/ConfigPage/SystemStructure'


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

import ErrorFS from '@/components/AuthManagePage/ErrorFS'

import UserManagePage from '@/components/UserManagePage'
import UserListPage from '@/components/UserManagePage/UserListPage'
import GroupManagePage from '@/components/UserManagePage/GroupManagePage'
import ChangePassword from '@/components/UserManagePage/ChangePassword'
import NewUserPage from '@/components/UserManagePage/NewUserPage'

import Summary from '@/components/Summary'

import Content from '@/components/Content'

Vue.use(Router)

let router = new Router({

	routes:[
    {
      path:'/content',
      component: Content,
      children:[
      		{
      			path:'summary',
      			component: Summary
      		},
      		{
      			path:'user',
      			component: UserManagePage,
      			// vue-router的嵌套路由
      			children:[
      				{
      					path:'userlist',
      					component:UserListPage
      				},
      				{
      					path:'groupmanage',
      					component:GroupManagePage
      				},
      				{
      					path:'changepassword',
      					component:ChangePassword
      				},
          		{
          			path:'newuser',
          			component: NewUserPage
          		},
      			]
      		},
      		{
      			path:'config',
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
      				//
      				{
      					path:'systemstructure',
      					component:SystemStructure
      				},
      				//img

      			]
      		},
      		{
      			path:'monitor',
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
      			path:'mounter',
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
      			path:'updateuser/:id',
      			component: UpdateUserPage
      		},
      		{
      			path:'auth',
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
      				},
      				{
      					path:'errorfs',
      					component:ErrorFS
      				},
      			]
      		},
      ]
    },
		{
			path:'/',
			component: LoginPage
		},
    {
      path:'/resetpassword',
      component: ResetPasswordPage
    },
	]

})

export default router
