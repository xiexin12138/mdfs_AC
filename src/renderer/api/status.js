import * as type from './type'
import Socket from './socket'
/**
 * @author Craig
 * @version 1.0.0
 * @date    2018-04-08
 * @param   {Object}   para 一个type，一个id
 * @description 获取mount节点状态
 */
export async function GetMountNode(para) {
	try {
		return {
	type:'getMountNode',
	state: 0,  // 错误类型码，0表示成功
	errormessage:'', // 错误信息
	id:1,
	name:'Mount2', // 主机名
	status:'action',  // 节点状态
	duration:'8分钟', // 状态持续时间
	user:'guest1、guest2' // 连接的用户
}
		let socket = new Socket()
		let data = {
			type: type.GET_MOUNT_NODE,
			id: para.id
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
 * @author Craig
 * @version 1.0.0
 * @date    2018-04-08
 * @param   {Object}   para 一个type，一个id
 * @description 获取用户节点状态
 */
export async function GetUserNode(para) {
	try {
		return {
	type:'getUserNode',
	state: 0,  // 错误类型码，0表示成功
	errormessage:'', // 错误信息
	id:11,
	name:'guest', // 用户节点名
	ip:'192.168.1.1', 
	mac:'00.as.12.df.3d.4f.23',
	duration:'35分钟' // 登录时长
}
		let socket = new Socket()
		let data = {
			type: type.GET_USER_NODE,
			id: para.id
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
 * @author Craig
 * @version 1.0.0
 * @date    2018-04-08
 * @description 请求节点状态图的数据 
 */
export async function GetNodeStatus() {
	try {
	let newData =  [
				{
					id: 1,
					type: '0',
					name: 'Mount1',
					status: '0',
					target: 'Mount1'
				},
				{
					id: 2,
					type: '-1',
					name: 'Guest1',
					status: '1',
					target: 'Mount1'
				},
				{
					id: 3,
					type: '-1',
					name: 'Guest2',
					status: '1',
					target: 'Mount1'
				},
				{
					id: 23,
					type: '-1',
					name: 'Guest23',
					status: '1',
					target: 'Mount1'
				},
				{
					id: 33,
					type: '-1',
					name: 'Guest33',
					status: '1',
					target: 'Mount1'
				},
				{
					id: 5,
					type: '0',
					name: 'Mount2',
					status: '1',
					target: 'Mount2'
				},
				{
					id: 6,
					type: '-1',
					name: 'Guest4',
					status: '1',
					target: 'Mount2'
				},
				{
					id: 7,
					type: '-1',
					name: 'Guest5',
					status: '1',
					target: 'Mount2'
				},
				{
					id: 17,
					type: '-1',
					name: 'Guest17',
					status: '1',
					target: 'Mount2'
				},
				{
					id: 9,
					type: '0',
					name: 'Mount3',
					status: '2',
					target: 'Mount3'
				},
				{
					id: 9,
					type: '0',
					name: 'Mount6',
					status: '2',
					target: 'Mount6'
				},{
					id: 9,
					type: '0',
					name: 'Mount8',
					status: '2',
					target: 'Mount8'
				},
				{
					id: 10,
					type: '0',
					name: 'Mount5',
					status: '3',
					target: 'Mount5'
				},
				{
					id: 10,
					type: '0',
					name: 'Mount7',
					status: '3',
					target: 'Mount7'
				},
				{
					id: 41,
					type: '-1',
					name: 'User41',
					status: '1',
					target: 'Mount4'
				},
				{
					id: 14,
					type: '-1',
					name: 'User14',
					status: '1',
					target: 'Mount4'
				},
				{
					id: 45,
					type: '-1',
					name: 'User45',
					status: '1',
					target: 'Mount4'
				},
				{
					id: 43,
					type: '-1',
					name: 'Guest43',
					status: '1',
					target: 'Mount4'
				},
				{
					id: 42,
					type: '-1',
					name: 'Guest42',
					status: '1',
					target: 'Mount4'
				},
				{
					id: 48,
					type: '-1',
					name: 'Guest48',
					status: '1',
					target: 'Mount4'
				},
				{
					id: 44,
					type: '0',
					name: 'Mount4',
					status: '0',
					target: 'Mount4'
				},
			]
		return GetNodeStatusHelper(newData)
		let socket = new Socket()
		let data = {
			type: type.GET_NODE_STATUS
		}
		socket.write(JSON.stringify(data))
		let response = await socket.read()
		let obj = JSON.parse(response)
		if (obj.state == 0) {
			// console.log(obj)
			// return []
			return GetNodeStatusHelper(obj.node)
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
 * @date    2018-04-08
 * @param   {Object}   data 需要处理成我们需要的数据形式
 * @description 辅助函数，将发送过来的数据改成我们的格式，其中
 *
 * 				type -1  -->  user  // 普通用户
 * 					 0   -->  mount // 挂载节点
 * 					 1   -->  ...   // 还有其他类型的暂时不管了
 * 					 
 * 				cm中的节点（不含用户）的status有好几种，简单列举了目前要用的几种在下面switch里
 */
function GetNodeStatusHelper(data){
	// let nda = data
	// console.log(nda,22)
	for (let i = 0; i < data.length; i++) {
		if (data[i].type == '-1') {
			data[i].type = 'user'
			data[i].status = 'action'
		}else if (data[i].type == '0') {
			data[i].type = 'mount'
			switch (data[i].status){
				case '0':
				case '1':
					data[i].status = 'action'
					break
				case '2':
					// data[i].status = 'action'
					data[i].status = 'sleeping'
					break
				case '3':
					data[i].status = 'shutdown'
					break
				default:break
			}
		}
	}
	return data
}
/**
 * @author Craig
 * @version 1.0.0
 * @date    2018-04-08
 * @param   {Object}   para 参数如下
 * @description Mount节点上线下线
 */
export async function ManageMount(para) {
	try {
		// return true
		let socket = new Socket()
		let data = {
			type: type.MOUNT_SCHEDULE,
			id: para.id,
			state: para.state
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
 * @date    2018-04-08
 * @param   {Object}   para 参数如下data
 * @description 管理用户启用禁用
 */
export async function ManageUser(para) {
	try {
		return true
		let socket = new Socket()
		let data = {
			type: type.MANAGE_USER,
			id: para.id,
			state: para.state
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
 * @date    2018-04-27
 * @description 文件系统 监控界面 获取识图数据
 */
export async function MonitorFS(){
	try {

		return n
		let socket = new Socket()
		let data = {
			type: type.MONITOR_FS
			// type: 26
		}
		socket.write(JSON.stringify(data))
		let response = await socket.read()
		console.log(response,7)
		let obj = JSON.parse(response)
		if (obj.state == 0) {
			return obj.fs
		}else {
			throw new Error(obj.errormessage)
		}
	} catch (e) {
		throw new Error(e.toString())
	}
}

/**
 * @author Craig
 * @version 1.0.0
 * @date    2019-04-27
 * @description 文件系统 监控界面 获取识图数据
 */
export async function MonitorMetadata(){
	try {

		return n
		let socket = new Socket()
		let data = {
			type:type.MON_PIE
		}
		
		socket.write(JSON.stringify(data))
		let response = await socket.read()
		console.log(response,28)
		let obj = JSON.parse(response)
		if (obj.state == 0) {
			return obj.data
		}else {
			throw new Error(obj.errormessage)
		}
	} catch (e) {
		throw new Error(e.toString())
	}
}

export async function MonitorPieTable(params){
	try {

		let socket = new Socket()

		let data = {
			type:type.MON_PIETOTABLE,
			id:params.id,
			pageSize:params.pageSize,
			currentPage:params.currentPage
		}
		console.log(data)
		return {
			data: [
            {
              date:"2016-05-02 12:02:08",
              fsystem:"fs1",
              errordata:"/mnt/temp/test.txt",
            },
            {
              date:"2016-05-04 12:02:08",
              fsystem:"fs1",
              errordata:"/mnt/temp/test.txt",
            },
            {
              date:"2016-05-01 12:02:08",
              fsystem:"fs1",
              errordata:"/mnt/temp/test.txt",
            },
            {
              date:"2016-05-03 12:02:08",
              fsystem:"fs1",
              errordata:"/mnt/temp/test.txt",
            },{
              date:"2016-05-03 12:02:08",
              fsystem:"fs1",
              errordata:"/mnt/temp/test.txt",
            },{
              date:"2016-05-03 12:02:08",
              fsystem:"fs1",
              errordata:"/mnt/temp/test.txt",
            },{
              date:"2016-05-03 12:02:08",
              fsystem:"fs1",
              errordata:"/mnt/temp/test.txt",
            },{
              date:"2016-05-03 12:02:08",
              fsystem:"fs1",
              errordata:"/mnt/temp/test.txt",
            },{
              date:"2016-05-03 12:02:08",
              fsystem:"fs1",
              errordata:"/mnt/temp/test.txt",
            },{
              date:"2016-05-03 12:02:08",
              fsystem:"fs1",
              errordata:"/mnt/temp/test.txt",
            },{
              date:"2016-05-03 12:02:08",
              fsystem:"fs1",
              errordata:"/mnt/temp/test.txt",
            },
          ],
          total:11,
          currentPage:0,
          pageSize:10
		}
		socket.write(JSON.stringify(data))
		let response = await socket.read()
		// console.log(response,28)
		let obj = JSON.parse(response)
		if (obj.state == 0) {
			return obj
		}else {
			throw new Error(obj.errormessage)
		}
	} catch (e) {
		throw new Error(e.toString())
	}
}