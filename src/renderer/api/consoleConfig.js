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
 * @description 修改当前用户密码
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
      newpassword: md5newpsw.read().toString('hex'),
      oldpassword: md5oldpsw.read().toString('hex'),
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
 * @name   {string}  name 用户名
 * @return {boolean} 校验用户名和密码后的返回值
 */
export async function Logout(username) {
  try {
    let socket = new Socket()
    let data = {
      type: type.LOGOUT,
      name: username.name,
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
 * @date    2019-1-13
 * @param  {string}   name 用户名
 * @param  {string}   password 密码
 * @return {boolean} 解锁前端锁定状态
 */
export async function UnlockConsole(param) {
  /*return true*/
  // 本地自测模块
  if (type.LOCAL_TEST) {
    return true
  }
  var md5psw = new md5()
  md5psw.end(param.password)
  try {
    let socket = new Socket()
    let data = {
      type: type.UNLOCK_CONSOLE,
      name: param.username,
      password: md5psw.read().toString('hex'),
    }
    socket.write(JSON.stringify(data))
    let response = await socket.read()
    console.log("【response】" + response);
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
 * @date    2019-1-13
 * @param  {string}   name 用户名
 * @param  {string}   password 密码
 * @return {boolean} 解锁前端锁定状态
 */
export async function GetACGroup(param) {
  var md5psw = new md5()
  md5psw.end(param.password)
  try {
    let socket = new Socket()
    let data = {
      type: type.UNLOCK_CONSOLE,
      name: param.username,
      password: md5psw.read().toString('hex'),
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
 * @date    2019-1-13
 * @param  {string}   name 用户名
 * @param  {string}   password 密码
 * @return {boolean} 解锁前端锁定状态
 */
export async function ChangerGroupPermission(param) {
  var md5psw = new md5()
  md5psw.end(param.password)
  try {
    let socket = new Socket()
    let data = {
      type: type.UNLOCK_CONSOLE,
      name: param.username,
      password: md5psw.read().toString('hex'),
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
 * @date    2019-1-13
 * @param  {string}   name 用户名
 * @param  {string}   password 密码
 * @return {boolean} 获取锁定状态的设置是否启用
 */
export async function GetLockState(param) {
  try {
    let socket = new Socket()
    let data = {
      type: type.GET_LOCK_STATE,
      name: param.username,
    }
    socket.write(JSON.stringify(data))
    let response = await socket.read()
    /*let obj = JSON.parse(response)*/
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
 * @date    2019-1-13
 * @param  {string}   username 用户名
 * @param  {string}   lockstatus 锁定状态
 * @param  {string}   locktime 锁定时间
 * @return {boolean} 更新锁定的状态和时间
 */
export async function UpdateLockState(param) {
  try {
    let socket = new Socket()
    if (param.lockstatus == true) {
      param.lockstatus = '1'
    } else {
      param.lockstatus = '0'
    }
    let data = {
      type: type.UPDATE_LOCK_STATE,
      username: param.username,
      lockstatus: param.lockstatus,
      locktime: param.locktime.toString()
    }
    // 本地自测模块
  if (type.LOCAL_TEST) {
      return data
    }
    socket.write(JSON.stringify(data))
    let response = await socket.read()
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


/**
 * @author Sam
 * @version 1.0.0
 * @date    2019-1-13
 * @param  {string}   name 用户名
 * @return {boolean} 取锁定状态的时长
 */
export async function GetLockTime(param) {
  try {
    let socket = new Socket()
    let data = {
      type: type.GET_LOCK_TIME,
      name: param.username,
    }
    socket.write(JSON.stringify(data))
    let response = await socket.read()
    console.log("response:"+response);
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
