/**
 * 所有的路由都在这个文件里配置
 */
import Vue from 'vue'
import Router from 'vue-router'

import ResetPasswordPage from '@/components/ResetPasswordPage'
import LoginPage from '@/components/LoginPage'
import HomePage from '@/components/HomePage'
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
			path:'/home',
			component: HomePage
		},
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
	]

})

export default router