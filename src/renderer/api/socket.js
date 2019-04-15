/**
 * @description 本来想找个库实现同步的socket，类似promise-socket的东西，但是放弃了
 *              这个连接是短连接
 */
import * as type from './type'
const app = require('electron').remote.app
let configPath = app.getPath('userData') + '\\serverConfig.json'
const fs = require('fs')
let configObj
console.log("【本地测试】"+type.LOCAL_TEST);
if (type.LOCAL_TEST) {
  configObj = {
    host: '0.0.0.0',
    hostBackup: '0.0.0.0'
  }
} else {
  configObj = {
    hostBackup: '219.223.197.75', //'219.223.197.76'(haiyang),219.223.193.99(yuan),219.223.193.22(test),219.223.197.89
    host: '219.223.197.127'
    /*host:'0.0.0.0',
 			hostBackup:'0.0.0.0'*/
  }
}
console.log("【CM host IP】"+configObj.host );
console.log("【CM hostBackup IP】"+configObj.hostBackup );
if (fs.existsSync(configPath)) {
  try {
    configObj = JSON.parse(fs.readFileSync(configPath).toString())
  } catch (e) {
    console.log('JSON file is wrong ')
  }

}
// console.log(configObj)
const net = require('net')

class Socket {
  /**
   * @author Craig
   * @version 1.0.0
   * @date    2018-03-08
   * @return  {null}   这是构造函数
   */
  constructor() {
    this.host = configObj.host || '219.223.199.154'
    // this.host = '219.223.192.110'
    this.hostBackup = configObj.hostBackup || '192.168.1.11'
    this.port = 10086
    /**
     * 新建一个socket
     * @type {net}
     */
    this._socket = new net.Socket()
    // 设置编码格式
    this._socket.setEncoding('utf8')
    // 禁用长连接
    this._socket.setKeepAlive(false)
    // 禁止Nagle算法，每次write立即发送
    // this._socket.setNoDelay(true)
    // 设置超时时间
    this._socket.setTimeout(2000)

    this._socket.connect(this.port, this.host)
    let that = this
    this._socket.on('timeout', () => {
      that._socket.end()
      that._socket = new net.Socket()
      // 设置编码格式
      that._socket.setEncoding('utf8')
      // 禁用长连接
      that._socket.setKeepAlive(false)
      // 禁止Nagle算法，每次write立即发送
      // that._socket.setNoDelay(true)
      // 设置超时时间
      that._socket.setTimeout(2000)
      that._socket.connect(that.port, that.hostBackup)
      that._socket.on('timeout', () => {
        that._socket.end()
      })
    })
    this._socket.on('error', () => {
      that._socket.end()
      that._socket = new net.Socket()
      // 设置编码格式
      that._socket.setEncoding('utf8')
      // 禁用长连接
      that._socket.setKeepAlive(false)
      // 禁止Nagle算法，每次write立即发送
      // that._socket.setNoDelay(true)
      // 设置超时时间
      that._socket.setTimeout(2000)
      that._socket.connect(that.port, that.hostBackup)
      that._socket.on('timeout', () => {
        that._socket.end()
      })
    })
  }
  /**
   * @author Craig
   * @version 1.0.0
   * @date    2018-03-08
   * @param   {String}   data 需要发送的数据
   * @return  {null}        null
   */
  write(data) {
    const buf = Buffer.from(data)
    this._socket.write(buf)
  }
  /**
   * @author Craig
   * @version 1.0.0
   * @date    2018-03-08
   * @return  {Promise}   返回一个Promise，需要resolve读取的结果
   * @description 因为是短连接，所以读完数据就关闭连接
   */
  read() {
    let that = this
    let str = ''
    return new Promise((resolve, reject) => {
      that._socket.on('data', data => {
        str += data
      })
      that._socket.on('error', error => {
        that._socket.end()
        reject(error)
      })
      that._socket.on('end', () => {
        // console.log(str,1)
        resolve(str)
      })
      // that._socket.on('timeout', () => {
      // 	console.log('socket timeout')
      // 	that._socket.end()
      // 	reject('连接超时，请重试')
      // })
    })
  }
}

export default Socket
