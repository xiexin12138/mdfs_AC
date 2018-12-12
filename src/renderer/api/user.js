import Socket from './socket'
import * as type from './type'
var md5 = require('md5.js')
/**
 * @author Craig
 * @version 1.0.0
 * @date    2018-03-07
 * @param   {string}   username 用户名
 * @param   {string}   password 密码
 * @return {boolean} 校验用户名和密码后的返回值
 */
export async function CheckUser(username, password) {
	try {
		// return true
		let socket = new Socket()
    var md5stream = new md5()
    md5stream.end(password)
		let data = {
			type: type.LOGIN,
			username: username,
			password: md5stream.read().toString('hex'),// 使用MD5加密密码
		}
    console.log(data.password);
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
 * @author Craig
 * @version 1.0.0
 * @date    2018-05-03
 * @param   {Object}   param 参数如下param
 * @description 修改密码
 */
export async function ChangePass(param){
		try {
		// return true
		let socket = new Socket()
    var md5stream = new md5()
		let data = {
			type: type.CHANGE_PASS,
			email: param.email,
			captcha: param.captcha,
			password: md5stream.read().toString('hex'),
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
 * @author Craig
 * @version 1.0.0
 * @date    2018-05-03
 * @param   {Object}   param 参数对象，包含一个email值
 * @description 获取发送到邮箱的验证码
 */
export async function GetCaptcha(param){
		try {
		// return true
		let socket = new Socket()
		let data = {
			type: type.GET_CAPTCHA,
			email: param.email
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
