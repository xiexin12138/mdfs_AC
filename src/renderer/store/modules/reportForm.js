/**
 * @author Craig
 * @version 1.0.0
 * @date    2018-03-09
 * @description 用户管理
 *              这里的actions采用了async await，并且把错误抛出，交给调用者处理。
 */
import * as types from '../mutation-types'
import * as reportForm from '@/api/reportForm'
/**
 * user的初始状态
 * @type {Object}
 */
const state = {
  charttype: '',
  chartspan: '',
  time: '',
  info: []
}

const getters = {
  getCharttype: state => {
    return state.charttype
  },
  getChartspan: state => {
    return state.chartspan
  },
  getTime: state => {
    return state.time
  },
  getInfo: state => {
    return state.info
  }
}
const mutations = {
  [types.GET_FS_SAFE_REPORT_FORMAT](state, payload) {
    state.charttype = payload.charttype
    state.chartspan = payload.chartspan
    state.time = payload.time
  },
  [types.GET_FS_SAFR_REPORT_INFO](state, payload) {
    state.info = payload.info
  }
}

const actions = {
  async getfssafereport({
    commit
  }, payload) {
    let data = await reportForm.GetFSSafeReport()
    let datanew = data || {
      charttype: payload.charttype,
      chartspan: payload.chartspan,
      time: payload.time,
      info: []
    }
    commit(types.GET_FS_SAFE_REPORT_FORMAT, datanew)
    commit(types.GET_FS_SAFR_REPORT_INFO, datanew)
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
