### 前端API接口文档说明

type字段修改为数字，需要配合对应文档查看具体的请求码

```
// login管理员或普通用户登录
req：
{
	type:'*login',  // 对应的请求码是17
	username:'', // 字符串
	password:''  // 字符串
}
res:
{
	type:'login',
	state: 0,  // 错误类型码，0表示成功
	errormessage:'' // 错误信息
}

// addUser新建用户
req：
{
	type:'*addUser', // 对应的请求码是8
	username:'',
	email:'',
	ip:'',
	mac:'',
	expire:'',
	cpu:'',
	mainboard:'',
	os:''
}
res:
{
	type:'addUser',
	state: 0,  // 错误类型码，0表示成功
	errormessage:'' // 错误信息
}

// deleteUser删除用户，可多选
req：
{
	type:'*deleteUser', // 对应的请求码是9
	id:[] // 包含id的数组
}
res:
{
	type:'deleteUser',
	state: 0,  // 错误类型码，0表示成功
	errormessage:'' // 错误信息
}

// getDataTable获取一定量的用户列表
req：
{
	type:'*getDataTable', // 对应的请求码是10
	pageSize: 10, // 每一页包含10行数据
	currentPage: 1 // 当前页为第一页
}
res:
{
	type:'getDataTable',
	state: 0, // 错误类型码，0 表示成功
	errormessage:'' // 错误信息
	dataTable: [  // 返回的数据数组
		{
		id: '12',
		status:0,
		last:'2017-04-03 22:32:22',
		username: 'craig',
		email: '1@1.com',
		expire: '2019-04-03 22:32:22',
		ip: '219.223.1.1',
		mac: 'xxxxxxx',
		os: 'windows',
		cpu: 'xxx',
		mainboard: 'xx'
		}
	],
	total: 100, // 一共有多少项
	pageSize: 10,  // 一页可以有多少项
	currentPage: 2  // 当前页码
}

// 用户update操作接口
req:
{
	type:'*updateUser', // 对应的请求码是11
	id: '12', // 这个是必须的，根据id进行更新操作，下面的字段有更新则写入res传送，没有更新则不。
	status:0,
	email: '1@1.com',
	expire: '2019-04-03 22:32:22',
	ip: '219.223.1.1',
	mac: 'xxxxxxx',
	os: 'windows',
	cpu: 'xxx',
	mainboard: 'xx'
}
res:
{
	type:'updateUser',
	state: 0, // 错误类型码，0 表示成功
	errormessage:'' // 错误信息
}

// 获取mount节点状态，节点运行状态页面
req:
{
	type:'getMountNode', // 对应的请求码是16
	id:0
}
res:
{
	type:'getMountNode',
	state: 0,  // 错误类型码，0表示成功
	errormessage:'', // 错误信息
	id:0,
	name:'Mount node2', // 主机名
	cpu:'x86', // cpu的架构信息
	os:'Linux', // 操作系统类型
	status:'action',  // 节点状态
	duration:'8分钟', // 状态持续时间
	user:'guest1、guest2' // 连接的用户
}

// 获取user节点状态，节点运行状态页面
req:
{
	type:'getUserNode', // 对应的请求码是19
	id:0
}
res:
{
	type:'getUserNode',
	state: 0,  // 错误类型码，0表示成功
	errormessage:'', // 错误信息
	id:0,
	name:'guest', // 用户节点名
	ip:'192.168.1.1', 
	mac:'00.as.12.df.3d.4f.23',
	duration:'35分钟' // 登录时长
}

// 节点下线，上线 ，
req:
{
	type:'manageMount', // 对应的请求码是14
	id:0,
	state:1 // 1表示action，3表示shutdown
}
res:
{
	type:'manageMount',
	state: 0,  // 错误类型码，0表示成功
	errormessage:'' // 错误信息
}

// 用户禁用启用，
req:
{
	type:'manageUser', // 对应的请求码是18
	id:0,
	state:1 // 待定
}
res:
{
	type:'manageUser',
	state: 0,  // 错误类型码，0表示成功
	errormessage:'' // 错误信息
}

// 请求节点状态图的数据，挂载节点运行界面中，获取连接情况的数据
req:
{
	type:'getNodeStatus'  // 对应的请求码是15
}
res:
{
	type:'getNodeStatus',
	state: 0,  // 错误类型码，0表示成功
	errormessage:'' // 错误信息
	node:[
		{
			id:0,	//	节点id
			type: 'mount', // mount 或 user 分别表示挂载节点和用户节点，mount_server 0,store_server 1,manage_server 2,
			name: 'Mount1', // 节点
			status: 'action', // 2种状态，action、shutdown有用，sleeping、ready暂时不用了
			target: 'Mount1'	// user连接的mount节点，若为mount节点则为自身
		}
	]
}

// 新增文件系统
req:
{
	type:'addFS',   // 对应的请求码是20
	fsId:1,			// 文件系统对应的id
	fsName:'ceph1',   // 文件系统名称
	fsType:'ceph',   // 文件系统类型
	matadatePool:'ceph mata', // 元数据池名称
	dataPools:'ceph data',  // 数据池名称
	fsIP:'127.0.0.1',  // 文件服务器地址
	fsPort:10086,     // 端口号
	privateKey:'88',  // 私钥文件
	configFile:'88', // 配置文件
	storage:23 // 存储空间，单位为G
}
res:
{
	type:'addFS',
	state: 0,  // 错误类型码，0表示成功
	errormessage:'' // 错误信息
}

// 新增挂载节点 这个功能已经取消
req:
{
	type:'addMountNode',
	mountName:'ceph1',   // 节点名称
	mountIP:'ceph mata', // 节点IP
	mountMAC:'ceph data',  // 节点MAC
}
res:
{
	type:'addMountNode',
	state: 0,  // 错误类型码，0表示成功
	errormessage:'' // 错误信息
}

// 全局证书有效期设置，之前的用户有效期不是证书的
req:
{ 
	type:'certExpire',          // 对应的请求码是12
	certExpire:'2018-04-01',   // 证书有效期
}
res:
{
	type:'certExpire',
	state: 0,  // 错误类型码，0表示成功
	errormessage:'' // 错误信息
}

// 挂载服务器的全局参数
req:
{
	type:'mountConfig', // 对应的请求码是13
	sleepTime:60,   // 休眠时长，单位为秒
	waitingTime:60, // 等待时长，单位为秒
	schedulingInterval:5,  // 调度间隔时长，单位为分钟
}
res:
{
	type:'mountConfig',   
	state: 0,  // 错误类型码，0表示成功
	errormessage:'' // 错误信息
}

// 文件系统监听界面，获取所有数据的接口
req：
{
	type:'monitorFS',  // 对应的请求码是22
}
res:
{
	type:'monitorFS',
	state: 0,       // 错误类型码，0表示成功
	errormessage:'' // 错误信息
	fs:[            // 暂定：最多3个文件系统
		{
		id:99,           // 这个文件系统的id
		fs_name:'fs1',   // 这个文件系统的name
		fs_type:'ceph',  // 这个文件系统的类型
		fs_error:[{      // 这个文件系统内的出错或告警信息，暂定：最多15条全量新错误
			file_name:'/temp',     // 当前错误对应的文件目录
			errorType:'判决错误',  // 当前错误类型
			errorCode:99,  		   // 当前错误码
			time: '20180630',	   // 产生时间
			detail: '详细信息',	   // 详细信息
			repair: 1,             // 是否修复，修复则需要下面的内容
			repair_fs:'fs2',       // 修复来自哪个文件系统
			repair_file:'/temp',   // 修复来自文件系统下的哪个目录
		}],  
	}
	]
}

// 重置密码第一步发送邮箱名称，获取验证码
req:
{
	type:'*getCaptcha',   // 23
	email: '1@1.com'
}
res:
{
	type:'getCaptcha',
	state: 0,       // 错误类型码，0表示成功
	errormessage:'' // 错误信息
}

// 重置密码第二步发送验证码和新密码
req:
{
	type:'*changePass',  // 24
	email: '1@1.com',
	captcha:'hello',
	password: 'password'
}
res:
{
	type:'getCaptcha',
	state: 0,       // 错误类型码，0表示成功
	errormessage:'' // 错误信息
}

// 元数据监控页面，获取饼图数据接口
req：
{
	type:'*getPie',  // 对应的请求码是
}
res:
{
	type: '*getPie',
	state: 0,  // 错误类型码，0表示成功
	errormessage:'', // 错误信息
	data:[{
		id:1,  			// 文件系统id
		sum:33, 		// 这个文件系统出错的数量
		fs_name:'fs1',  // 文件系统name
	},{
		id:2,  			// 文件系统id
		sum:33, 		// 这个文件系统出错的数量
		fs_name:'fs2',  // 文件系统name
	}]
}


// 元数据监控页面，根据id获取这个文件系统的错误信息
req：
{
	type:'*getPieFS',  	// 对应的请求码是
	id:1				// 文件系统的id
}
res:
{
	type: '*getPieFS',
	state: 0,  // 错误类型码，0表示成功
	errormessage:'', // 错误信息
	data:[{
		id:1,  								// 这条错误的id
		time:'2018-05-24 12:20:30', 		// 这条错误的产生时间
		fs_name:'fs1',  					// 所属文件系统的name
		user:'test1',  						// 导致这个错误的user
		node:'node1',  						// 导致这个错误的所在的nfs节点
	},{
		id:1,  								// 这条错误的id
		time:'2018-05-24 12:20:30', 		// 这条错误的产生时间
		fs_name:'fs1',  					// 所属文件系统的name
		user:'test1',  						// 导致这个错误的user
		node:'node1',  						// 导致这个错误的所在的nfs节点
	}]
}

// 挂载节点管理界面，mount节点的增删改查
Req：
{
	“type”:”mounterManage”,//对应的请求码是31
	“operation”;”add”,//表示操作类型，查(query=1)、增（add=2）、删(del=3)、改(update=4)
	“id”:”21”,//表示mounter的id
	“mounterType”:”CentOS”,//mounter所在操作系统的类型，查询操作时这个字段也要填，为空字符
	“address”:”192.168.1.100”,//mounter所在机器的ip，查询操作时这个字段也要填，为空字符
	}
Resp：// 查询返回的结果
{
	“type”: ”mounterManage”,//对应的请求码是31
	“id”:”21”,//表示mounter的id
	“mounterType”:”CentOS”,//mounter所在操作系统的类型
	“address”:”192.168.1.100”,//mounter所在机器的ip
	“status”:”init”	//	mounter的状态
	“online”:”1”//是否在线，0：不在线  1：在线
}
Resp: // 其他操作返回的结果
{
	“type”:”mountFs”,//请求码是31
	“state”:” 0”,  // 错误类型码，0表示成功
	“errormessage”:”” // 错误信息
}

// 挂载节点管理界面，返回所有的mount节点信息：

Req:
{
         “type”:”getMounters”    //请求码是34
}
Resp:
{
         “type”:”getMounters”,   //请求码是34
         “detail”:” [{
                   “id”:”21”,//mounter的id
                   “os”:”CentOS”,//操作系统类型
                   “ip”,”192.168.1.130”,//mounter的ip
                   “state”:”initing”,//mounter的状态,与单个挂载节点的state不一致
                   “online”:”1”     //表示mounter是否上线，0：下线，1：上线
}]”
}

// 文件系统挂载关系配置页面，文件系统挂载
Req:
{
	“type”:”mountFs”,//请求码是32
	“mounterId”:”101”,//挂载节点的id，与cmNode的id保持一致
	“fsId”:”21”,//文件系统id
	“mountAddr”:”/mnt/fs1”,//文件系统的挂载路径
}

Resp:
{
	“type”:”mountFs”,//请求码是32
	“state”:” 0”,  // 错误类型码，0表示成功
	“errormessage”:”” // 错误信息
}

// 文件挂载关系展示页面，显示文件系统挂载信息
Req
{
	“type”:”showFsMount”,//请求码是33
}

Resp
{
	“type”:” showFsMount”,
	“detail”:”[
	{
		“mounterId”:”21”,
		“fsId”:”101”,
		“mountAddr”:”/mnt/fs1”,
		“judge”:”1”,  //是否具有判决能力，1：具有判决能力  0：否
		“sync”:”1”  //是否同步，1：已同步   0：未同步
}
]”
}

```