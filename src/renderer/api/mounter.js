import * as type from './type'
import Socket from './socket'
/**
 * @author Craig
 * @version 1.0.0
 * @date    2018-06-23
 * @param   {Object}   null
 * @description 获取所有挂载节点的信息
 */
export async function GetMounters() {
	try {

		let socket = new Socket()
		let data = {
			type: type.GET_MOUNTERS,
		}
		socket.write(JSON.stringify(data))
		let response = await socket.read()
		let obj = JSON.parse(response)
		console.log(obj)
		// TODO 后台返回的结果缺少表示错误的字段，state and errormessage
		if (obj.detail) {
			return {
				mounters:obj.detail
			}
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
 * @date    2018-06-23
 * @param   {array}   idArray mounter的id组成的数组
 */
export async function DeleteMounters(idArray) {
	try {
		for (let i = 0; i < idArray.length; i++) {
			await deleteMountersHelper(idArray[i])
		}
		return true
	} catch (e) {
		throw new Error(e.toString())
	}
}

async function deleteMountersHelper(id){
	try {

		let socket = new Socket()
		let data = {
			type: type.MOUNTER_MANAGE,
			operation:'3',
			id:id,
			mounterType:'',
			address:''
		}
		socket.write(JSON.stringify(data))
		let response = await socket.read()
		console.log('delete mounter: ',response)
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
 * @author Craig
 * @version 1.0.0
 * @date    2018-06-23
 * @param   {Object}   para 包含挂载节点的id，ip，os
 * @description 新增挂载节点
 */
export async function AddMounter(para) {
	try {

		let socket = new Socket()
		let data = {
			type: type.MOUNTER_MANAGE,
			operation:'2',
			id:para.id,
			mounterType:para.mounterType,
			address:para.address
		}
		socket.write(JSON.stringify(data))
		let response = await socket.read()
		let obj = JSON.parse(response)
		console.log('新增挂载节点的返回结果：',obj)
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
 * @author Craig
 * @version 1.0.0
 * @date    2018-06-23
 * @param   {Object}   para 包含挂载节点的id，ip，os
 * @description 更新挂载节点
 */
export async function UpdateMounter(para) {
	try {

		let socket = new Socket()
		let data = {
			type: type.MOUNTER_MANAGE,
			operation:'4',
			id:para.id,
			mounterType:para.mounterType,
			address:para.address
		}
		socket.write(JSON.stringify(data))
		let response = await socket.read()
		let obj = JSON.parse(response)
		console.log('更新挂载节点的返回结果：',obj)
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
 * @author Craig
 * @version 1.0.0
 * @date    2018-06-24
 * @description 展示挂载信息
 */
export async function ShowFSMount(){
	try {

		let socket = new Socket()
		let data = {
			type: type.SHOW_FS_MOUNT,
		}
		socket.write(JSON.stringify(data))
		let response = await socket.read()
		let obj = JSON.parse(response)
		console.log('ShowFSMount: ',obj)
		if (obj.detail) {
			return obj.detail
		} else {
			throw new Error(obj.errormessage)
		}
	} catch (e) {
		throw new Error(e.toString())
	}	

}