import * as type from './type'
import Socket from './socket'
/**
 * @author saisai
 * @version 1.1.0
 * @date    2018-12-23
 * @param   {Object}   data 一个对象，包含下面的字段
 * @return  {Boolean}        true为正确提交，报错则不正确
 * @description 查询所有的未审核用户信息
 */
export async function GetUserAudit(pagesize,currentPage) {
	try {        
		let data1=[
			{
	            username:'hhh',
				email:'hhhh@163.com',
				ip:'10.0.10.66',
				mac:'1234',
				cpu:'1234',
				mainboard:'1234',
				os:'1234'
			},
			{
	            username:'xxx',
				email:'xxx@163.com',
				ip:'10.0.10.67',
				mac:'1234',
				cpu:'1234',
				mainboard:'1234',
				os:'1234'
			},
		]
		return data1
		let socket = new Socket()
		let data = {
			type: type.GET_USERAUDIT,
		}
		socket.write(JSON.stringify(data))

		let response = await socket.read()
		let obj = JSON.parse(response)
		// TODO 后台返回的结果缺少表示错误的字段，state and errormessage
		if (obj) {
				
			console.log(444,obj)
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
 * @date    2018-12-23
 * @param   {Object}   data 一个对象，包含下面的字段
 * @return  {Boolean}        true为正确提交，报错则不正确
 * @description 返回管理员审核用户结果
 */
export async function AuditResult(param) {
	try {
		// TODO 接口格式
		 return true
		let socket = new Socket()
		let data = {
			type: type.AUDITRESULT,
			email:param.email,
			expire:param.expire,
			state:param.state,
			reasonmessage:param.reasonmessage,
		}
		// console.log(data)
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

