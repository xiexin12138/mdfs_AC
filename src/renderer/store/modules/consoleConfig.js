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
  remainTime: 120
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
    console.log("getRemainTime:"+state.remainTime);
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
    let result = await consoleConfig.GetLockState(payload.id, payload.username)
    // console.log(payload);
    let datanew = data || {
      isLock: true
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
