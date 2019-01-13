import Socket from './socket'
import * as type from './type'
var md5 = require('md5.js')
/**
 * @author Sam
 * @version 1.0.0
 * @date    2019-01-13
 * @param   {string}   name 用户名
 * @param   {string}   oldpassword 旧密码
 * @param   {string}   newpassword 新密码
 * @return {boolean} 校验用户名和密码后的返回值
 */
export async function ChangeCurUserPwd(param) {
	try {
		let socket = new Socket()
    var md5oldpsw = new md5()
    var md5newpsw = new md5()
    md5oldpsw.end(param.oldpsw)
    md5newpsw.end(param.newpsw)
		let data = {
			type: type.CHANGE_CUR_PSW,
			name: param.username,
			oldpassword: md5oldpsw.read().toString('hex'),
			newpassword: md5newpsw.read().toString('hex'),
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
 * @author Sam
 * @version 1.0.0
 * @date    2019-01-13
 * @name   {string}  用户名
 * @return {boolean} 校验用户名和密码后的返回值
 */
export async function Logout(username) {
	try {
		let socket = new Socket()
		let data = {
			type: type.LOGOUT,
			name: username,
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
