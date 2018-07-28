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
			type: type.createDir,
			dirName : param.dirName ,
			user : param.user ,
			group : param.group,
			auth  : param.auth ,

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
