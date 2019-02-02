import Socket from './socket'
import * as type from './type'

/**
 * @author Craig
 * @version 1.0.0
 * @date    2018-05-03
 * @param   {Object}   param 参数对象，包含一个email值
 * @description 获取发送到邮箱的验证码
 */
export async function GetFSSafeReport() {
  try {
    // return true
    let socket = new Socket()
    let data = {
      type: type.GET_AC_REPORT
    }
    socket.write(JSON.stringify(data))
    let response = await socket.read()
    console.log('response：'+response);
    let obj = JSON.parse(response)
    if (obj.state == 0) {
      return obj
    } else {
      throw new Error(obj.errormessage)
    }
  } catch (e) {
    throw new Error(e.toString())
  }
}
