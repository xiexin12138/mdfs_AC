import * as type from './type'
import Socket from './socket'

/**
 * @author saisai
 * @version 1.1.0
 * @date    2019-01-19
 * @param   {Object}   data 一个对象，包含下面的字段
 * @return  {Boolean}        true为正确提交，报错则不正确
 * @description 查询所有的告警邮箱信息
 */
export async function Getemails(param) {
	try {        
		let tableData5={
      sendEmail:1,
      email:[
       {
          id: '1',
          email: '111111@gamil.com',
          status: '0',
        }, 
        {
          id: '2',
          email: '222222@gamil.com',
          status: '1',
        }, 
        {
          id: '3',
          email: '333333333@gamil.com',
          status: '1',
        },         
      ]
    }
        console.log(44,tableData5)
	    // return tableData5
		let socket = new Socket()
		let data = {
			type: type.GET_EMAIL,
		}
		socket.write(JSON.stringify(data))

		let response = await socket.read()
		//console.log(520,response)
		let obj = JSON.parse(response)
		// TODO 后台返回的结果缺少表示错误的字段，state and errormessage
		if (obj.state == 0 && obj.type !=64) {

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
 * @date    2019-01-19
 * @param   {Object}   data 一个对象，包含下面的字段
 * @return  {Boolean}        true为正确提交，报错则不正确
 * @description 邮箱禁用或启用
 */
export async function ChangeStatus(id,operate) {
  try {
    // TODO 接口格式
     // return true
    let socket = new Socket()
    let data = {
      type: type.CHANGE_EMAIL_STATUS,
      id:id,
      operate:operate
    }
    console.log(data)
    socket.write(JSON.stringify(data))
    let response = await socket.read()
    let obj = JSON.parse(response)
    if (obj.state == 0 && obj.type !=64) {
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
 * @date    2019-01-19
 * @param   {Object}   data 一个对象，包含下面的字段
 * @return  {Boolean}        true为正确提交，报错则不正确
 * @description 删除邮箱
 */
export async function DeleteEmail(id) {
  try {
    // TODO 接口格式
     // return true
    let socket = new Socket()
    let data = {
      type: type.DELETE_EMAIL,
      id:id,
    }
    console.log(data)
    socket.write(JSON.stringify(data))
    let response = await socket.read()
    let obj = JSON.parse(response)
    if (obj.state == 0 && obj.type !=64) {
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
 * @date    2019-01-19
 * @param   {Object}   data 一个对象，包含下面的字段
 * @return  {Boolean}        true为正确提交，报错则不正确
 * @description 添加邮箱
 */
export async function AddEmail(email) {
  try {
    // TODO 接口格式
     // return true
    let socket = new Socket()
    let data = {
      type: type.ADD_EMAIL,
      email:email,
    }
    // console.log(data)
    socket.write(JSON.stringify(data))
    let response = await socket.read()
    console.log(888,response)
    let obj = JSON.parse(response)
    if (obj.state == 0 && obj.type !=64) {
      console.log(444,obj.email)
      return obj.email.id
    } else {
      console.log(777,obj.errormessage)
      throw new Error(obj.errormessage)
    }
  } catch (e) {
    throw new Error(e.toString())
  }
}

/**
 * @author saisai
 * @version 1.1.0
 * @date    2019-01-21
 * @param   {Object}   data 一个对象，包含下面的字段
 * @return  {Boolean}        true为正确提交，报错则不正确
 * @description 变更产生异常时邮件发送状态
 */
export async function ChangeEmailSendStatus(param) {
  try {
    // TODO 接口格式
     // return true
    let socket = new Socket()
    let data = {
      type: type.CHANGE_EMAILSENDSTATUS,
      emailSendStatus:param,
    }
    console.log(data)
    socket.write(JSON.stringify(data))
    let response = await socket.read()
    let obj = JSON.parse(response)
    if (obj.state == 0 && obj.type !=64) {
      return true
    } else {
      throw new Error(obj.errormessage)
    }
  } catch (e) {
    throw new Error(e.toString())
  }
}