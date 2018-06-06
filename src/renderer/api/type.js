// 管理员登录，测试通过
export const LOGIN = 17

// 获取mount节点状态，测试通过
export const GET_MOUNT_NODE = 16

// 请求节点状态图的数据，接口测试通过，本地显示出错
export const GET_NODE_STATUS = 15

// Mount节点上线下线，接口测试通过，本地显示出错
export const MOUNT_SCHEDULE = 14

// 挂载服务器的全局参数，测试通过
export const MOUNT_CONFIG = 13

// 全局证书有效期设置，之前的用户有效期不是证书的，测试通过
export const CERT_EXPIRE = 12

// update操作接口，测试通过
export const USER_UPDATE = 11

// 获取一定量的用户列表，测试通过
export const USER_GET = 10

// 删除用户，可多选，测试通过
export const USER_DELETE = 9

// 新建用户，测试通过
export const USER_CREATE = 8

// FS_ADD 新增文件系统，测试通过
export const FS_ADD = 20

// GET_USER_NODE 获取user信息，测试通过
export const GET_USER_NODE = 19

// MANAGE_USER 管理用户启用禁用，测试通过
export const MANAGE_USER = 18

// 文件系统监控界面 获取视图数据，测试通过
export const MONITOR_FS = 22

// 修改密码第一步获取验证码，测试通过
export const GET_CAPTCHA = 23

// ROOTCHANGEPASS 修改密码第二步发送验证码和新密码，测试通过
export const CHANGE_PASS = 24

//元数据错误监控页面饼图数据
export const MON_PIE = 28

//元数据错误监控页面点击饼图表格展示详细数据
export const MON_PIETOTABLE = 29


/*****************************未实现的接口***********************************************/



/*****************************取消实现的接口***********************************************/

// MOUNT_ADD 新增挂载节点，这个已经取消
export const MOUNT_ADD = 111