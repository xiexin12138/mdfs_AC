/**
 * @author Sam
 * @version
 * @date    2019-1-17
 * @description  目录管理
 *              这里的actions采用了async await，并且把错误抛出，交给调用者处理。
 */
import * as types from '../mutation-types'
import * as consoleConfig from '../../api/consoleConfig'
/**
 * ac的初始状态
 * @type {Object}
 */
const state = {
  /*isLock: true,*/
  /*locktime: 2,*/
  remainTime: 900
}

const getters = {
  getIsLock: state => {
    return state.isLock
  },
  /*getLocktime: state => {
    console.log("getLocktime:"+state.locktime);
    return state.locktime
  },*/
  getRemainTime: state => {
    return state.remainTime
  },
}
const mutations = {
  [types.GET_LOCK_STATE](state, payload) {
    state.isLock = payload
  },
  /*[types.GET_LOCK_TIME](state, payload) {
    state.locktime = payload
  },*/
  [types.UPDATE_REMAIN_TIME](state, newReamianTime) {
    state.remainTime = newReamianTime
  }
}

const actions = {
  async getlockstate({
    commit
  }, payload) {
    let result = await consoleConfig.GetLockState(payload)
    // console.log(payload);
    let datanew = data || {
      isLock: false
    }
    commit(types.GET_LOCK_STATE, payload)
  },
  async getlocktime({
    commit
  }, payload) {
    let data = await consoleConfig.GetLockTime(payload)
    // console.log(payload);
    /*let datanew = data || {
      locktime: 15
    }*/
    commit(types.GET_LOCK_TIME, data)
    if (!data) {
      throw new Error('服务器出错！')
    }
  },
  updateRemainTime({
    commit
  }, newRemianTime) {
    let newtime = newRemianTime || {
      newRemianTime: 900
    }
    commit("UPDATE_REMAIN_TIME", newRemianTime)
  },
  async updateLockStateAndTime({
    commit
  }, payload) {
    let result = await consoleConfig.UpdateLockState(payload)
    if (!result) {
      throw new Error('服务器出错！')
    }
    let newresult = result || {
      lockstatus: false,
      locktime: 15
    }
    if (payload.lockstatus == 1) {
      payload.lockstatus = true
    } else {
      payload.lockstatus = false
    }
    commit("UPDATE_REMAIN_TIME", payload.locktime * 60)
    commit("UPDATE_LOCK_STATE", payload.lockstatus)
    commit("UPDATE_LOCK_TIME", payload.locktime)
  },
  async unlockConsole({
    commit
  }, payload) {
    if (await consoleConfig.UnlockConsole(payload)) {
      /*commit(types.CHECK_USER, payload)*/
    } else {
      throw new Error('用户或密码不对')
    }
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
