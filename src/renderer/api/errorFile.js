import * as type from './type'
import Socket from './socket'

/**
 * @author saisai
 * @version 1.1.0
 * @date    2018-08-15
 * @param   {Object}   data 一个对象，包含下面的字段
 * @return  {Boolean}        true为正确提交，报错则不正确
 * @description 查询所有的异常文件
 */
export async function GetErrorFiles(pagesize,currentPage) {
	try {

		let socket = new Socket()
		let data = {
			type: type.GET_ERRORfILES,
			pagesize :pagesize,
			currentPage :currentPage ,
		}
		socket.write(JSON.stringify(data))
		let response = await socket.read()
		let obj = JSON.parse(response)
		// TODO 后台返回的结果缺少表示错误的字段，state and errormessage
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
 * @author saisai
 * @version 1.1.0
 * @date    2018-08-15
 * @param   {Object}   data 一个对象，包含下面的字段
 * @return  {Boolean}        true为正确提交，报错则不正确
 * @description 异常文件下载
 */
export async function DownloadErrorFile(param) {
	try {
		// TODO 接口格式
		// return true
		let socket = new Socket()
		let data = {
			type: type.DOWNLOAD_ERRORfILES,
			host:param.host,
			fsName: param.fsName ,
			newName: param.newName,
			desPath: param.desPath,


		}
		console.log(data)
		socket.write(JSON.stringify(data))
		let response = await socket.read()
		let obj = JSON.parse(response)
		if (obj.state == 0|| obj.type !=64) {
			return true
		} else {
			throw new Error(obj.errormessage)
		}
	} catch (e) {
		throw new Error(e.toString())
	}
}
