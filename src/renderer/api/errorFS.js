import * as type from './type'
import Socket from './socket'

/**
 * @author saisai
 * @version 1.1.0
 * @date    2018-09-28
 * @param   {Object}   data 一个对象，包含下面的字段
 * @return  {Boolean}        true为正确提交，报错则不正确
 * @description 查询所有的文件系统信息
 */
export async function GetFSs(param) {
	try {        
		let tableData5=[
        {
          id: '1',
          name: 'fs1',
          type: 'ceph',
          mountPath: '/mnt/fs1',
          mountAddr: '192.168.1.136',
          mountport: '1080',
          fssize: '1080',
          fsused:'',
          fsavail:'',
          fsstate:'0',//文件系统状态
          judge:'1',
          sync:'1',
        }, 
        {
          id: '2',
          name: 'fs1',
          type: 'ceph',
          mountPath: '/mnt/fs1',
          mountAddr: '192.168.1.136',
          mountport: '1080',
          fssize: '1080',
          fsused:'',
          fsavail:'',
          fsstate:'3',//文件系统状态
          judge:'1',
          sync:'1',
        }, 
        {
          id: '3',
          name: 'fs1',
          type: 'ceph',
          mountPath: '/mnt/fs1',
          mountAddr: '192.168.1.136',
          mountport: '1080',
          fssize: '1080',
          fsused:'',
          fsavail:'',
          fsstate:'0',//文件系统状态
          judge:'1',
          sync:'1',
        }, 
        ]
        // console.log(44,tableData5)
	    // return tableData5
		let socket = new Socket()
		let data = {
			type: type.GET_FS,
		}
		socket.write(JSON.stringify(data))

		let response = await socket.read()
		//console.log(520,response)
		let obj = JSON.parse(response)
		// TODO 后台返回的结果缺少表示错误的字段，state and errormessage
		if (obj) {
				
			console.log(250,obj.fs)
			return obj.fs
			
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
 * @date    2018-09-28
 * @param   {Object}   data 一个对象，包含下面的字段
 * @return  {Boolean}        true为正确提交，报错则不正确
 * @description 对可清洗的文件系统进行清洗
 */
export async function CleanFS(param) {
	try {
		// TODO 接口格式
		 return true
		let socket = new Socket()
		let data = {
			type: type.CLEAN_FS,
			fsid:param,
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
