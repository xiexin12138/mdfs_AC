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

		//return cm
		let socket = new Socket()
		let data = {
			type: type.RUNING_CM_INFO,

		}
		socket.write(JSON.stringify(data))
		let response = await socket.read()
		let obj = JSON.parse(response)
		if (obj.state == 0&& obj.type !=64) {
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

		//return mount
		let socket = new Socket()
		let data = {
			type: type.GET_MOUNTERS, //34

		}
		socket.write(JSON.stringify(data))
		let response = await socket.read()
		let obj = JSON.parse(response)
		if (obj.state == 0&& obj.type !=64) {
			return obj.detail
		} else {
			throw new Error(obj.errormessage)
		}
	} catch (e) {
		throw new Error(e.toString())
	}
}

//-----------------------------------------------

/**
 * @author saisai
 * @version 1.1.0
 * @date    2018-10-27
 * @param   {Object}   data 一个对象，包含下面的字段
 * @return  {Boolean}        true为正确提交，报错则不正确
 * @description 查询当前文件系统信息
 */
export async function GetfsInfo(param) {
	try {
		// TODO 接口格式
		
		var obj={
		"fs_running" : [{
				        id:"1",        //文件系统id
						name:"1",		//文件系统名
						type:"ceph",	    //文件系统类型
						mountPoint:"/mount1/fs1",	//文件系统挂载路径
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
				        id:"2",        //文件系统id
						name:"1",		//文件系统名
						type:"ceph",	    //文件系统类型
						mountPoint:"/mount1/fs1",	//文件系统挂载路径
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
				        id:"3",        //文件系统id
						name:"1",		//文件系统名
						type:"ceph",	    //文件系统类型
						mountPoint:"/mount1/fs1",	//文件系统挂载路径
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
						mountPoint:"/mount1/fs1",	//文件系统挂载路径
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
				        id:"5",        //文件系统id
						name:"1",		//文件系统名
						type:"ceph",	    //文件系统类型
						mountPoint:"/mount1/fs1",	//文件系统挂载路径
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
				        id:"6",        //文件系统id
						name:"1",		//文件系统名
						type:"ceph",	    //文件系统类型
						mountPoint:"/mount1/fs1",	//文件系统挂载路径
						mountAddr:"10.0.10.66",	//文件服务器地址
						mountport:"8080",	//端口号
						fssize:"36G",	//存储空间
						fsused:"12G",	//已用空间
						fsavail:"24G",	//剩余空间
						fsstate:"stopping",	//文件系统状态
						judge:"1",		//是否提供判决服务1:提供判决服务 0：未提供判决服务
						sync:"1",		//是否已同步，1：已同步  0：未同步
					}],		    //正在判决 类型的文件系统
		"fs_ready" : [{
				        id:"7",        //文件系统id
						name:"1",		//文件系统名
						type:"ceph",	    //文件系统类型
						mountPoint:"/mount1/fs1",	//文件系统挂载路径
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
				        id:"8",        //文件系统id
						name:"1",		//文件系统名
						type:"ceph",	    //文件系统类型
						mountPoint:"/mount1/fs1",	//文件系统挂载路径
						mountAddr:"10.0.10.66",	//文件服务器地址
						mountport:"8080",	//端口号
						fssize:"36G",	//存储空间
						fsused:"12G",	//已用空间
						fsavail:"24G",	//剩余空间
						fsstate:"stopping",	//文件系统状态
						judge:"1",		//是否提供判决服务1:提供判决服务 0：未提供判决服务
						sync:"1",		//是否已同步，1：已同步  0：未同步
					},],			//准备 类型的文件系统id列表
		"fs_repairing" : [{
				        id:"9",        //文件系统id
						name:"1",		//文件系统名
						type:"ceph",	    //文件系统类型
						mountPoint:"/mount1/fs1",	//文件系统挂载路径
						mountAddr:"10.0.10.66",	//文件服务器地址
						mountport:"8080",	//端口号
						fssize:"36G",	//存储空间
						fsused:"12G",	//已用空间
						fsavail:"24G",	//剩余空间
						fsstate:"stopping",	//文件系统状态
						judge:"1",		//是否提供判决服务1:提供判决服务 0：未提供判决服务
						sync:"1",		//是否已同步，1：已同步  0：未同步
					}],			//修复 类型的文件系统id列表
	    "fs_stop_breakdown" : [{
				        id:"10",        //文件系统id
						name:"1",		//文件系统名
						type:"ceph",	    //文件系统类型
						mountPoint:"/mount1/fs1",	//文件系统挂载路径
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
				        id:"11",        //文件系统id
						name:"1",		//文件系统名
						type:"ceph",	    //文件系统类型
						mountPoint:"/mount1/fs1",	//文件系统挂载路径
						mountAddr:"10.0.10.66",	//文件服务器地址
						mountport:"8080",	//端口号
						fssize:"36G",	//存储空间
						fsused:"12G",	//已用空间
						fsavail:"24G",	//剩余空间
						fsstate:"stopping",	//文件系统状态
						judge:"1",		//是否提供判决服务1:提供判决服务 0：未提供判决服务
						sync:"1",		//是否已同步，1：已同步  0：未同步
					}],	//宕机等异常造成的离线 类型的文件系统id列表 
	    "fs_stop_running" : [{
				        id:"12",        //文件系统id
						name:"1",		//文件系统名
						type:"ceph",	    //文件系统类型
						mountPoint:"/mount1/fs1",	//文件系统挂载路径
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
				        id:"13",        //文件系统id
						name:"1",		//文件系统名
						type:"ceph",	    //文件系统类型
						mountPoint:"/mount1/fs1",	//文件系统挂载路径
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
				        id:"14",        //文件系统id
						name:"1",		//文件系统名
						type:"ceph",	    //文件系统类型
						mountPoint:"/mount1/fs1",	//文件系统挂载路径
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
				        id:"15",        //文件系统id
						name:"1",		//文件系统名
						type:"ceph",	    //文件系统类型
						mountPoint:"/mount1/fs1",	//文件系统挂载路径
						mountAddr:"10.0.10.66",	//文件服务器地址
						mountport:"8080",	//端口号
						fssize:"36G",	//存储空间
						fsused:"12G",	//已用空间
						fsavail:"24G",	//剩余空间
						fsstate:"stopping",	//文件系统状态
						judge:"1",		//是否提供判决服务1:提供判决服务 0：未提供判决服务
						sync:"1",		//是否已同步，1：已同步  0：未同步
					}],     //无法修复导致的离线 类型的文件系统id列表
	    "fs_stop_repairing" : [{
				        id:"16",        //文件系统id
						name:"1",		//文件系统名
						type:"ceph",	    //文件系统类型
						mountPoint:"/mount1/fs1",	//文件系统挂载路径
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
				        id:"17",        //文件系统id
						name:"1",		//文件系统名
						type:"ceph",	    //文件系统类型
						mountPoint:"/mount1/fs1",	//文件系统挂载路径
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
				        id:"18",        //文件系统id
						name:"1",		//文件系统名
						type:"ceph",	    //文件系统类型
						mountPoint:"/mount1/fs1",	//文件系统挂载路径
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
				        id:"19",        //文件系统id
						name:"1",		//文件系统名
						type:"ceph",	    //文件系统类型
						mountPoint:"/mount1/fs1",	//文件系统挂载路径
						mountAddr:"10.0.10.66",	//文件服务器地址
						mountport:"8080",	//端口号
						fssize:"36G",	//存储空间
						fsused:"12G",	//已用空间
						fsavail:"24G",	//剩余空间
						fsstate:"stopping",	//文件系统状态
						judge:"1",		//是否提供判决服务1:提供判决服务 0：未提供判决服务
						sync:"1",		//是否已同步，1：已同步  0：未同步
					}],	   //异常过多导致的离线修复类型的文件系统id列表

		}
		//return obj
		let socket = new Socket()
		let data = {
			type:type.SIX_FS_INFO,//51
			// type: 51,//51

		}
		socket.write(JSON.stringify(data))
		let response = await socket.read()
		let obj = JSON.parse(response)
		if (obj.state == 0&& obj.type !=64) {
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
 * @date    2018-10-27
 * @param   {Object}   data 一个对象，包含下面的字段
 * @return  {Boolean}        true为正确提交，报错则不正确
 * @description 	文件系统池的基本信息
 */
export async function GetfsPool(param) {
	try {
		// TODO 接口格式
		var poolInfo={
             
            "fsnumber":"8",
			 "fs_running" : [{			//在用的文件系统的id和name列表
					  "id" : "1",		//文件系统id
					  "name" : "fs1",	//文件系统名
					    },
					  {"id" : "2",		//文件系统id
					  "name" : "fs2",	//文件系统名
					    }],  

		    "fs_ready" : [{			//准备的文件系统的id和name列表
					  "id" : "3",		//文件系统id
					  "name" : "fs3",	//文件系统名
					   },
					    {"id" : "4",		//文件系统id
					  "name" : "fs4",	//文件系统名
					    },],  

		     "fs_repairing" : [{			//正在修复的文件系统的id和name列表
					     "id" : "5",		//文件系统id
					     "name" : "fs5",	//文件系统名
					      },
					       {"id" : "6",		//文件系统id
					     "name" : "fs6",	//文件系统名
					    },],  


		     "fs_stopping" : [{			//离线的文件系统的id和name列表
					     "id" : "7",		//文件系统id
					     "name" : "fs7",	//文件系统名
					      },
					       {"id" : "8",		//文件系统id
					     "name" : "fs8",	//文件系统名
					    },],   

			 "fs_avail_size":"6G",		 //文件系统池可用的存储空间（最小文件系统为准）
	
		}

		//return poolInfo
		let socket = new Socket()
		let data = {
			type: type.FSPOOL_INFO, //52

		}
		socket.write(JSON.stringify(data))
		let response = await socket.read()
		let obj = JSON.parse(response)
		if (obj.state == 0&& obj.type !=64) {
			console.log(52,obj)
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
 * @date    2018-10-27
 * @param   {Object}   data 一个对象，包含下面的字段
 * @return  {Boolean}        true为正确提交，报错则不正确
 * @description 	根据ID文件系统的基本信息
 */
export async function GetfsById(param) {
 try {    
  var fs=[{
				        id:"9999",        //文件系统id
						name:"1",		//文件系统名
						type:"ceph",	    //文件系统类型
						mountPoint:"/mount1/fs1",	//文件系统挂载路径
						mountAddr:"10.0.10.66",	//文件服务器地址
						mountport:"8080",	//端口号
						fssize:"36G",	//存储空间
						fsused:"12G",	//已用空间
						fsavail:"24G",	//剩余空间
						fsstate:"stopping",	//文件系统状态
						judge:"1",		//是否提供判决服务1:提供判决服务 0：未提供判决服务
						sync:"1",		//是否已同步，1：已同步  0：未同步
					}] 
		//return fs
		let socket = new Socket()
		let data = {
			type: type.FSBYID, //53
			id:param,

		}
		socket.write(JSON.stringify(data))
		let response = await socket.read()
		let obj = JSON.parse(response)
		if (obj.state == 0&& obj.type !=64) {
			// console.log(53,obj.fs)
			// await translate(obj.fs)
			
		if(obj.fs.judge=="1"){
			obj.fs.judge="提供判决服务"
		}else{
			obj.fs.judge="未提供判决服务"
		}
		if(obj.fs.sync=="1"){
			obj.fs.sync="已同步"
		}else{
			obj.fs.sync="未同步"
		}

			return obj.fs
		} else {
			throw new Error(obj.errormessage)
		}
	} catch (e) {
		throw new Error(e.toString())
	}
}


