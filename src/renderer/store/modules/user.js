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
	password: null
}

const getters = {
	getUserName: state => {
		return state.username
	},
	getPassWord: state => {
		return state.password
	}
}
const mutations = {
	[types.CHECK_USER](state, payload) {
		state.username = payload.username
		state.password = payload.password
	}
}

const actions = {
	async checkuser({ commit }, payload) {
		if (await user.CheckUser(payload.username, payload.password)) {
			commit(types.CHECK_USER, payload)
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
