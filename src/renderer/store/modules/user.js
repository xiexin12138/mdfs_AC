/**
 * @author Craig
 * @version 1.0.0
 * @date    2018-03-07
 * @description 登录的用户信息管理
 *              这里的actions采用了async await，并且把错误抛出，交给调用者处理。
 */
import * as types from '../mutation-types'
import * as user from '../../api/user'
/**
 * user的初始状态
 * @type {Object}
 */
const state = {
	username: null,
	password: null,
  userType: 2,
  lockstatus: false,
  locktime: 5
}

const getters = {
	getUserName: state => {
		return state.username
	},
	getPassWord: state => {
		return state.password
	},
	getUserType: state => {
		return state.userType
	},
	getLockstatus: state => {
		return state.lockstatus
	},
	getLocktime: state => {
		return state.locktime
	}
}
const mutations = {
	[types.CHECK_USER](state, payload) {
		state.username = payload.username
		state.password = payload.password
		state.userType = payload.userType
    state.locktime = payload.locktime
    if(payload.lockstatus == 0){
      state.lockstatus = false
    } else {
      state.lockstatus = true
    }
	},
  [types.UPDATE_LOCK_STATE](state, payload) {
    state.lockstatus = payload
  },
  [types.UPDATE_LOCK_TIME](state, payload) {
    state.locktime = payload
  }
}

const actions = {
	async checkuser({ commit }, payload) {
    let result = await user.CheckUser(payload.username, payload.password)
    result.username = payload.username
    if (result.state == 0) {
			commit(types.CHECK_USER, result)
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
