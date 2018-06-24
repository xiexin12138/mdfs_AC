/**
 * @author Craig
 * @version 1.0.0
 * @date    2018-03-09
 * @description 用户管理
 *              这里的actions采用了async await，并且把错误抛出，交给调用者处理。
 */
import * as types from '../mutation-types'
import * as mounter from '../../api/mounter'
/**
 * user的初始状态
 * @type {Object}
 */
const state = {
	mounters: []
}

const getters = {
	getMounters: state => {
		return state.mounters
	}
}
const mutations = {
	[types.DELETE_MOUNTERS](state, payload) {
		state.mounters = [
			...state.mounters.filter(value => {
				return !payload.id.includes(value.id)
			})
		]
	},
	[types.GET_MOUNTERS](state, payload) {
		state.mounters = payload.mounters
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
