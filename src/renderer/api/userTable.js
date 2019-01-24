import Socket from './socket'
import * as type from './type'
/**
 * @author Craig
 * @version 1.0.0
 * @date    2018-03-14
 * @param   {String}   pageSize    一页有几行数据
 * @param   {String}   currentPage 请求的页码
 * @return {Object} 返回数据结果，出错返回null
 * @description 获取一定量的用户列表
 */
export async function GetDataTable(pageSize, currentPage) {
	try {
		// TODO 接口格式，一定要返回这个格式的数据，后台接口变化在这里进行调整，不改前端数据显示

		// return {
	// 		dataTable: [
	// 			{
	// 				id: '12',
	// 				status:0,
	// 				last:'2017-04-03 22:32:22',
	// 				username: 'craig',
	// 				email: '1@1.com',
	// 				expire: '2019-04-03 22:32:22',
	// 				ip: '219.223.1.1',
	// 				mac: 'xxxxxxx',
	// 				os: 'windows',
	// 				cpu: 'xxx',
	// 				mainboard: 'xx'
	// 			},{
	// 	id:'122',
	// 	username:'craig',
	// 	email:'1@1.com',
	// 	expire:'2019-04-03 22:32:22',
	// 	last:'2019-04-03 22:32:22',
	// 	ip:'219.223.1.1',
	// 	mac:'xxxxxxx',
	// 	os:'windows',
	// 	cpu:'xxx',
	// 	mainboard:'xx'
	// },
	// {
	// 	id:'112',
	// 	username:'craig',
	// 	email:'1@1.com',
	// 	expire:'2019-04-03 22:32:22',
	// 	last:'2019-04-03 22:32:22',
	// 	ip:'219.223.1.1',
	// 	mac:'xxxxxxx',
	// 	os:'windows',
	// 	cpu:'xxx',
	// 	mainboard:'xx'
	// },{
	// 	id:'124',
	// 	username:'craig',
	// 	email:'1@1.com',
	// 	expire:'2019-04-03 22:32:22',
	// 	last:'2019-04-03 22:32:22',
	// 	ip:'219.223.1.1',
	// 	mac:'xxxxxxx',
	// 	os:'windows',
	// 	cpu:'xxx',
	// 	mainboard:'xx'
	// }
	// 		],
	// 		total: 100,
	// 		pageSize: 10,
	// 		currentPage: 2
	// 	}


		let socket = new Socket()
		let data = {
			type: type.USER_GET,
			pageSize: pageSize,
			currentPage: currentPage
		}
		socket.write(JSON.stringify(data))
		let response = await socket.read()
		console.log(response)
		let obj = JSON.parse(response)
		// 没有出错是0
		if (obj.state == 0|| obj.type !=64) {
			return obj
		} else {
			return null
		}
	} catch (e) {
		throw new Error(e.toString())
	}
}

/**
 * @author Craig
 * @version 1.0.0
 * @date    2018-03-15
 * @param   {Array}   idArray 包含id的数组
 * @return {Boolean} true表示正确删除，false表示出错
 * @description 删除用户，可多选
 */
export async function DeleteDataTable(idArray){
	// TODO 交互
	// throw new Error('test delete')
	try {
		for (let i = 0; i < idArray.length; i++) {
			await deleteOne(idArray[i])
		}
		return true

	} catch (e) {
		throw new Error(e.toString())
	}
}
/**
 * @author Craig
 * @version 1.0.0
 * @date    2018-04-08
 * @param   {strign}   idArray id
 * @return  {Boolean}           true表示成功
 * @description 删除用户操作的辅助函数
 */
async function deleteOne(id){
	// TODO 交互
	// throw new Error('test delete')
	try {

		let socket = new Socket()
		let data = {
			type: type.USER_DELETE,
			id: id
		}
		socket.write(JSON.stringify(data))
		let response = await socket.read()
		console.log(response)
		let obj = JSON.parse(response)
		if (obj.state == 0||obj.type !=64) {
			return obj
		} else {
			throw new Error(obj.errormessage)
		}
	} catch (e) {
		throw new Error(e.toString())
	}
}

/**
 * @author Craig
 * @version 1.0.0
 * @date    2018-03-15
 * @param   {Object}   param 包含采集数据的对象
 * @return {Boolean} true表示正确更新，false表示出错
 * @description 更新用户
 */
export async function UpdateEmail(param){
	try {
		let socket = new Socket()
		let data = {
			type: type.USER_UPDATE,
			id:param.id,
			email:param.email
		}
		socket.write(JSON.stringify(data))
		let response = await socket.read()
		let obj = JSON.parse(response)
		if (obj.state == 0|| obj.type !=64) {
			return obj
		} else {
			throw new Error(obj.errormessage)
		}
	} catch (e) {
		throw new Error(e.toString())
	}
}

/**
 * @author Craig
 * @version 1.0.0
 * @date    2018-03-15
 * @param   {Object}   param 包含采集数据的对象
 * @return {Boolean} true表示正确更新，false表示出错
 * @description 更新用户
 */
export async function UpdateExpire(param){
	try {
		let socket = new Socket()
		let data = {
			type: type.USER_UPDATE,
			id:param.id,
			expire:param.expire
		}
		socket.write(JSON.stringify(data))
		let response = await socket.read()
		let obj = JSON.parse(response)
		if (obj.state == 0|| obj.type !=64) {
			return obj
		} else {
			throw new Error(obj.errormessage)
		}
	} catch (e) {
		throw new Error(e.toString())
	}
}

/**
 * @author Craig
 * @version 1.0.0
 * @date    2018-03-15
 * @param   {Object}   param 包含采集数据的对象
 * @return {Boolean} true表示正确更新，false表示出错
 * @description 更新用户
 */
export async function UpdateClient(param){
	try {
		let socket = new Socket()
		let data = {
			type: type.USER_UPDATE,
			id:param.id,
			ip:param.ip,
			mac:param.mac,
			cpu:param.cpu,
			os:param.os,
			mainboard:param.mainboard
		}
		socket.write(JSON.stringify(data))
		let response = await socket.read()
		let obj = JSON.parse(response)
		if (obj.state == 0|| obj.type !=64) {
			return obj
		} else {
			throw new Error(obj.errormessage)
		}
	} catch (e) {
		throw new Error(e.toString())
	}
}

/**
 * @author Craig
 * @version 1.0.0
 * @date    2018-03-15
 * @param   {Object}   data 包含新建用户必要的信息
 * @return {Boolean} true表示新增成功，false则失败
 */
export async function AddUser(param){
	try {

		let socket = new Socket()
		let data = {
			type: type.USER_CREATE,
			username:param.username,
			email:param.email,
			ip:param.ip,
			mac:param.mac,
			expire:param.expire,
			cpu:param.cpu,
			mainboard:param.mainboard,
			os:param.os
		}
		socket.write(JSON.stringify(data))
		let response = await socket.read()
		let obj = JSON.parse(response)
		if (obj.state == 0 || obj.type !=64) {
			return obj
		} else {
			throw new Error(obj.errormessage)
		}
	} catch (e) {
		throw new Error(e.toString())
	}
}
