import * as type from './type'
import Socket from './socket'
/**
 * @author Sam
 * @version 1.0.0
 * @date    2018-10-21
 * @description 获取所有监控的信息
 */
export async function GetSummary() {
  try {
    let socket = new Socket()
    let data = {
      type: type.GET_SUMMARY
    }
    socket.write(JSON.stringify(data))
		let response = await socket.read()
		let obj = JSON.parse(response)
    // 没有出错则为0
		if (obj.state == 0) {
			return obj
		} else {
			throw new Error(obj.errormessage)
		}
	} catch (e) {
		throw new Error(e.toString())
	}
}
