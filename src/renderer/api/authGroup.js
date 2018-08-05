import * as type from './type'
import Socket from './socket'

/**
 * @author saisai
 * @version 1.1.0
 * @date    2018-07-28
 * @param   {Object}   data 一个对象，包含下面的字段
 * @return  {Boolean}        true为正确提交，报错则不正确
 * @description 新建权限目录
 */
export async function submitAuth(param) {
	try {
		// TODO 接口格式
		// return true
		let socket = new Socket()
		let data = {
			type: type.MANAGE_DIRS,
			operation:"2",
			dirName : param.dirName ,
			user : param.user ,
			group : param.group,
			auth  : param.auth ,
			pagesize :10,
			currentPage :1,
			id:1,

		}
		socket.write(JSON.stringify(data))
		let response = await socket.read()
		let obj = JSON.parse(response)
		if (obj.state == 0) {
			return true
		} else {
			throw new Error(obj.errormessage)
		}
	} catch (e) {
		throw new Error(e.toString())
	}
}

/**
 * @author saisai
 * @version 1.1.0
 * @date    2018-08-01
 * @param   {Object}   data 一个对象，包含下面的字段
 * @return  {Boolean}        true为正确提交，报错则不正确
 * @description 删除目录
 */

export async function DeleteDirs(idArray,usernameArray) {
	try {
		console.log(idArray)
		console.log(usernameArray)
		for (let i = 0; i < idArray.length; i++) {
			await deletedirsHelper(idArray[i],usernameArray[i])
		}
		return true
	} catch (e) {
		throw new Error(e.toString())
	}
}

async function deletedirsHelper(id,username){
	try {

		let socket = new Socket()
		let data = {
			type: type.MANAGE_DIRS,
			operation:"3",
			dirName : '',
			user : username,
			group : '',
			auth  : '',
			pagesize :10,
			currentPage :1,
			id:id,
		}
		socket.write(JSON.stringify(data))
		let response = await socket.read()
		let obj = JSON.parse(response)
		if (obj.state == 0) {
			return true
		} else {
			throw new Error(obj.errormessage)
		}
	} catch (e) {
		throw new Error(e.toString())
	}
}






/**
 * @author saisai
 * @version 
 * @date    2018-07-28
 * @param   {Object}   data 一个对象，包含下面的字段
 * @return  {Boolean}        true为正确提交，报错则不正确
 * @description 修改用户组
 */
export async function submitGroupManage(param) {
	try {
		// return true
		let socket = new Socket()
		let data = {
			type: type.ManageUserAndGroup ,
			user : param.user , //挂载节点的id，与cmNode的id保持一致
			group :param.group ,  //文件系统id			
			operation :param.operation ,  //文件系统的挂载路径          
		}

		let d = JSON.stringify(data)
		let f = JSON.parse(d)

		socket.write(JSON.stringify(data))
		
		let response = await socket.read()
		let obj = JSON.parse(response)
		if (obj.state == 0) {
			return true
		} else {
			throw new Error(obj.errormessage)
		}
	} catch (e) {
		throw new Error(e.toString())
	}
}


/**
 * @author Saisai
 * @version 1.0.0
 * @date    2018-07-29
 * @param   {Object}   null
 * @description 获取所有用户组权限的信息
 */
export async function GetDirs(param) {
	try {

        
		let socket = new Socket()
		let data = {
			type: type.MANAGE_DIRS,
			operation:"1",
			dirName : param.dirName ,
			user : param.user ,
			group : param.group,
			auth  : param.auth ,
			pagesize :param.pageSize,
			currentPage : param.currentPage ,
			id:1,

		}
		socket.write(JSON.stringify(data))

		let response = await socket.read()
		let obj = JSON.parse(response)
		// TODO 后台返回的结果缺少表示错误的字段，state and errormessage
		if (obj) {
				
			// console.log(obj)
			return {
				dirs:obj
			}
		} else {
			throw new Error(obj.errormessage)
		}
	} catch (e) {
		throw new Error(e.toString())
	}
}
