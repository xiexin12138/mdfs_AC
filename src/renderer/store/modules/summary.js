/**
 * @author Sam
 * @version 1.0.0
 * @date    2018-10-21
 * @description 系统状态概览
 *              这里的actions采用了async await，并且把错误抛出，交给调用者处理。
 */
import * as types from '../mutation-types'
import * as summary from '../../api/summary'
/**
 * summary的初始状态
 * @type {Object}
 */
const state = {
  inSummary: true, // 用于判断当前用户是否在概览界面
	fssum: 0,// fs的总数量
  fsonline: 0,// 在线的fs数量
  fsready: 0, // 后备中的fs数量
  mountersum: 0,// mounter的总数量
  mounteronline: 0,// 在线的mounter数量
  mounteroffline: 0,// 离线的mounter数量
  spaceSize: 0,// fs所能用的剩余空间
  spaceUsed: 0,// fs已用的空间
  spaceAvail: 100,// fs剩余可用的空间
  fserrstate: 1,// fs错误状态，1表示真，此时文件系统状态正常
  fsrepairing: 0,// 正在修复的fs数量
  fsrepairinglist: [],// 正在修复的fs列表list
  fssyn: 0,// 正在同步的fs
  fssynlist: [],// 正在同步的fs
  fsstop: 0,// 已经停止运行的fs
  fsstoplist: [],// 已经停止运行的fs列表list
  userssum: 0,// 用户总数量
  usersonline: 0,// 在线的用户数量
  usersfreeze: 0,// 冻结的用户数量
  logs: []// 系统日志list
}

const getters = {
  // 用户操作状态细信息
  getInSummary: state => state.inSummary, // 用户当前是否在summary界面
  // 文件系统状态信息
	getSummaryFsSum: state => state.fssum,  // fs的总数量
  getSummaryFsOnline: state => state.fsonline,  // 在线的fs数量
  getSummaryFsReady: state => state.fsready,  // 后备中的fs数量
  // 挂载节点状态
  getSummaryMounterSum: state => state.mountersum,  // mounter的总数量
  getSummaryMounterOnline: state => state.mounteronline,  // 在线的mounter数量
  getSummaryMounterOffline: state => state.mounteroffline,  // 离线的mounter数量
  // 系统安全状态
  getSummaryFsErrState: state => state.fserrstate,  // fs错误状态
  getSummaryFsRepairing: state => state.fsrepairing,  // 正在修复的fs
  getSummaryFsRepairingList: state => state.fsrepairinglist,  // 正在修复的fs列表list
  getSummaryFsSyn: state => state.fssyn,  // 正在同步的fs
  getSummaryFsSynList: state => state.fssynlist,  // 已经停止运行的fs
  getSummaryFsStop: state => state.fsstop,  // 已经停止运行的fs
  getSummaryFsStopList: state => state.fsstoplist,  // 已经停止运行的fs列表list
  // 用户情况
  getSummaryUsersSum: state => state.userssum, // 用户总数量
  getSummaryUsersOnline: state => state.usersonline, // 在线的用户数量
  getSummaryUsersFreeze: state => state.usersfreeze, // 冻结的用户数量
  // 系统日志
  // TODO:后续logs需要区分文件系统日志、安全日志和用户日志
  // getSummaryLog: state => state.logs,  // 获取日志
  // getSummaryFsLog: state => state.fslog, // 文件系统日志
  // getSummarySafeLog: state => state.safelog, // 安全日志
  // getSummaryUsersLog: state => state.userslog, // 用户日志
  // TODO:后续需要更新SpaceUsed的方法，数据库中暂时没有对应的参数提供
  // 文件系统空间使用情况(表中字段未使用，接口未开发，暂不展示)
  getSummarySpaceSize: state => state.spaceSize,
  getSummarySpaceUsed: state => state.spaceUsed,
  getSummarySpaceAvail: state => state.spaceAvail,

}
const mutations = {
	[types.GET_SUMMARY](state, payload) {
    state.fssum = payload.fsState.fsSum
    state.fsonline = payload.fsState.fsOnlineNum
    state.fsready  = payload.fsState.fsReadyNum
    state.mountersum = payload.mounterState.mounterSum
    state.mounteronline = payload.mounterState.mounterOnlineNum
    state.mounteroffline = payload.mounterState.mounterOfflineNum
    state.spaceSize = payload.fsCapacity.fsSize
    state.spaceUsed = payload.fsCapacity.fsUsed
    state.spaceAvail = payload.fsCapacity.fsAvail
    state.fserrstate = payload.fsErrStatus.fsErrState
    state.fsrepairing = payload.fsErrStatus.fsRepairingNum
    state.fsrepairinglist = payload.fsErrStatus.fsRepairingList
    state.fssyn = payload.fsErrStatus.fsSyncNum
    state.fssynlist = payload.fsErrStatus.fsSynList
    state.fsstop = payload.fsErrStatus.fsStopNum
    state.fsstoplist = payload.fsErrStatus.fsStopList
    state.userssum = payload.userInfo.userSum
    state.usersonline = payload.userInfo.userOnlineNum
    state.usersfreeze = payload.userInfo.userFreezeNum
    state.logs = payload.logs
	},
  [types.UPDATE_USER_IN_SUMMARY](state, payload) {
    state.inSummary = payload
  }
}

const actions = {
	async getsummary({ commit }) {
		let data = await summary.GetSummary();
		let datanew = data || {
      fssum: 0,// fs的总数量
      fsonline: 0,// 在线的fs数量
      fsready: 0, // 后备中的fs数量
      mountersum: 0,// mounter的总数量
      mounteronline: 0,// 在线的mounter数量
      mounteroffline: 0,// 离线的mounter数量
      spaceSize: 10,// fs所能用的剩余空间
      spaceUsed: 0,// fs已用的空间
      spaceAvail: 10,// fs剩余可用的空间
      fserrstate: 1,// fs错误状态，1表示真，此时文件系统状态正常
      fsrepairing: 0,// 正在修复的fs数量
      fsrepairinglist: [],// 正在修复的fs列表list
      fssyn: 0,// 正在同步的fs
      fssynlist: [],// 正在同步的fs
      fsstop: 0,// 已经停止运行的fs
      fsstoplist: [],// 已经停止运行的fs列表list
      userssum: 0,// 用户总数量
      usersonline: 0,// 在线的用户数量
      usersfreeze: 0,// 冻结的用户数量
      logs: []// 系统日志list
		}
		commit(types.GET_SUMMARY, datanew);
		if (!data) {
			throw new Error('服务器出错！')
		}
	}
}
export default {
	state,
	getters,
	actions,
	mutations
}
