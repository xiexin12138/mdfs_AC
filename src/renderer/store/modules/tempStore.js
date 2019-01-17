/**
 * @author Sam
 * @version 1.0.0
 * @date    2019-1-16
 * @description 临时的参数，在当前版本临时实现的替代方案，需要在后续版本中使用新的方法代替
 */

 import * as types from '../mutation-types'
 import * as mounter from '../../api/mounter'
 /**
 * user的初始状态
 * @type {Object}
 */
 const state = {
   isLock: true,
   lockTime: 5,
 }

 const getters = {
  getLockTime: state => {
    return state.lockTime
  },
  getIsLock: state => {
    return state.isLock
  }
 }
 const mutations = {
  [types.CHANGE_LOCK_STATE](state, payload) {
    state.isLock = payload.isLock
  },
  [types.CHANGE_LOCK_TIME](state, payload) {
    state.lockTime = payload.lockTime
  }
 }

 const actions = {
  async deletemounters({ commit }, payload) {
    let result = await mounter.DeleteMounters(payload.id)
    commit(types.DELETE_MOUNTERS, payload)
  },
  async getmounters({ commit }, payload) {
    let data = await mounter.GetMounters()
    let datanew = data || {
      mounters: []
    }
    commit(types.GET_MOUNTERS, datanew)
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
