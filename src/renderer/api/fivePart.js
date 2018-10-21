import * as type from './type'
import Socket from './socket'

/**
 * @author saisai
 * @version 1.1.0
 * @date    2018-10-16
 * @param   {Object}   data 一个对象，包含下面的字段
 * @return  {Boolean}        true为正确提交，报错则不正确
 * @description 查询CM信息
 */
export async function GetcmInfo(param) {
	try {
		// TODO 接口格式
		var cm= [{					//主备CM的信息
						id:"1",			// CM的id，唯一标识
						ip:"192.168.1.136",//CM的ip	
						service:"1"//表示是否是主CM，1，表示是主CM，0，表示是备CM
				},
                 {					//主备CM的信息
						id:"2",			// CM的id，唯一标识
						ip:"192.168.1.136",//CM的ip	
						service:"1"//表示是否是主CM，1，表示是主CM，0，表示是备CM
				}]

		return cm
		let socket = new Socket()
		let data = {
			type: type.RUNING_CM_INFO,

		}
		socket.write(JSON.stringify(data))
		let response = await socket.read()
		let obj = JSON.parse(response)
		if (obj.state == 0) {
			return obj.cm
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
 * @date    2018-10-16
 * @param   {Object}   data 一个对象，包含下面的字段
 * @return  {Boolean}        true为正确提交，报错则不正确
 * @description 查询FS信息
 */
export async function GetfsInfo(param) {
	try {
		// TODO 接口格式
		var fs= [
					{
				        id:"1",        //文件系统id
						name:"1",		//文件系统名
						type:"ceph",	    //文件系统类型
						mountPath:"/mount1/fs1",	//文件系统挂载路径
						mountAddr:"10.0.10.66",	//文件服务器地址
						mountport:"8080",	//端口号
						fssize:"36G",	//存储空间
						fsused:"12G",	//已用空间
						fsavail:"24G",	//剩余空间
						fsstate:"running",	//文件系统状态
						judge:"1",		//是否提供判决服务1:提供判决服务 0：未提供判决服务
						sync:"1",		//是否已同步，1：已同步  0：未同步
					},
					{
				        id:"2",        //文件系统id
						name:"1",		//文件系统名
						type:"ceph",	    //文件系统类型
						mountPath:"/mount1/fs1",	//文件系统挂载路径
						mountAddr:"10.0.10.66",	//文件服务器地址
						mountport:"8080",	//端口号
						fssize:"36G",	//存储空间
						fsused:"12G",	//已用空间
						fsavail:"24G",	//剩余空间
						fsstate:"running",	//文件系统状态
						judge:"1",		//是否提供判决服务1:提供判决服务 0：未提供判决服务
						sync:"1",		//是否已同步，1：已同步  0：未同步
					},
					{
				        id:"3",        //文件系统id
						name:"1",		//文件系统名
						type:"ceph",	    //文件系统类型
						mountPath:"/mount1/fs1",	//文件系统挂载路径
						mountAddr:"10.0.10.66",	//文件服务器地址
						mountport:"8080",	//端口号
						fssize:"36G",	//存储空间
						fsused:"12G",	//已用空间
						fsavail:"24G",	//剩余空间
						fsstate:"stopping",	//文件系统状态
						judge:"1",		//是否提供判决服务1:提供判决服务 0：未提供判决服务
						sync:"1",		//是否已同步，1：已同步  0：未同步
					},
					{
				        id:"4",        //文件系统id
						name:"1",		//文件系统名
						type:"ceph",	    //文件系统类型
						mountPath:"/mount1/fs1",	//文件系统挂载路径
						mountAddr:"10.0.10.66",	//文件服务器地址
						mountport:"8080",	//端口号
						fssize:"36G",	//存储空间
						fsused:"12G",	//已用空间
						fsavail:"24G",	//剩余空间
						fsstate:"running",	//文件系统状态
						judge:"1",		//是否提供判决服务1:提供判决服务 0：未提供判决服务
						sync:"1",		//是否已同步，1：已同步  0：未同步
					},
					{
				        id:"5",        //文件系统id
						name:"1",		//文件系统名
						type:"ceph",	    //文件系统类型
						mountPath:"/mount1/fs1",	//文件系统挂载路径
						mountAddr:"10.0.10.66",	//文件服务器地址
						mountport:"8080",	//端口号
						fssize:"36G",	//存储空间
						fsused:"12G",	//已用空间
						fsavail:"24G",	//剩余空间
						fsstate:"running",	//文件系统状态
						judge:"1",		//是否提供判决服务1:提供判决服务 0：未提供判决服务
						sync:"1",		//是否已同步，1：已同步  0：未同步
					},
					{
				        id:"6",        //文件系统id
						name:"1",		//文件系统名
						type:"ceph",	    //文件系统类型
						mountPath:"/mount1/fs1",	//文件系统挂载路径
						mountAddr:"10.0.10.66",	//文件服务器地址
						mountport:"8080",	//端口号
						fssize:"36G",	//存储空间
						fsused:"12G",	//已用空间
						fsavail:"24G",	//剩余空间
						fsstate:"stopping",	//文件系统状态
						judge:"1",		//是否提供判决服务1:提供判决服务 0：未提供判决服务
						sync:"1",		//是否已同步，1：已同步  0：未同步
					},
				]

		return fs
		let socket = new Socket()
		let data = {
			type: type.GET_FS, //47

		}
		socket.write(JSON.stringify(data))
		let response = await socket.read()
		let obj = JSON.parse(response)
		if (obj.state == 0) {
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
 * @date    2018-10-16
 * @param   {Object}   data 一个对象，包含下面的字段
 * @return  {Boolean}        true为正确提交，报错则不正确
 * @description 查询MOUNT信息
 */
export async function GetmountInfo(param) {
	try {
		// TODO 接口格式
		var mount= [
					{           id:"1",         //mounter的id
					            os:"CentOS",         //操作系统类型
					            ip:"10.0.10.66",         //mounter的ip
					            state:"xxx",      //mounter的状态,与单个挂载节点的state不一致
					            online:"0",     //表示mounter是否上线，0：下线，1：上线
					},
					{           id:"2",         //mounter的id
					            os:"CentOS",         //操作系统类型
					            ip:"10.0.10.66",         //mounter的ip
					            state:"xxx",      //mounter的状态,与单个挂载节点的state不一致
					            online:"1",     //表示mounter是否上线，0：下线，1：上线
					},
					{           id:"3",         //mounter的id
					            os:"CentOS",         //操作系统类型
					            ip:"10.0.10.66",         //mounter的ip
					            state:"xxx",      //mounter的状态,与单个挂载节点的state不一致
					            online:"1",     //表示mounter是否上线，0：下线，1：上线
					},
					{           id:"4",         //mounter的id
					            os:"CentOS",         //操作系统类型
					            ip:"10.0.10.66",         //mounter的ip
					            state:"xxx",      //mounter的状态,与单个挂载节点的state不一致
					            online:"0",     //表示mounter是否上线，0：下线，1：上线
					},
				]

		return mount
		let socket = new Socket()
		let data = {
			type: type.GET_MOUNTERS, //34

		}
		socket.write(JSON.stringify(data))
		let response = await socket.read()
		let obj = JSON.parse(response)
		if (obj.state == 0) {
			return obj.detail
		} else {
			throw new Error(obj.errormessage)
		}
	} catch (e) {
		throw new Error(e.toString())
	}
}
