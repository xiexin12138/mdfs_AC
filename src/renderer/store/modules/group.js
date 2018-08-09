/**
 * @author Sai
 * @version 
 * @date    2018-08-07
 * @description  目录管理
 *              这里的actions采用了async await，并且把错误抛出，交给调用者处理。
 */
import * as types from '../mutation-types'
import * as authGroup from '../../api/authGroup'
/**
 * user的初始状态
 * @type {Object}
 */
const state = {
	groups: []
}

const getters = {
	getGroups: state => {
		return state.groups
	}
}
const mutations = {
	[types.DELETE_GROUPS](state, payload) {
		state.groups = [
			...state.groups.filter(value => {
				return !payload.id.includes(value.id)
			})
		]
	},
	[types.GET_GROUPS](state, payload) {
		state.groups = payload.groups
	}
}

const actions = {
	async deletegroups({ commit }, payload) {
		console.log(payload)
		let result = await authGroup.DeleteGroups(payload.id,payload.groupname)
		commit(types.DELETE_GROUPS, payload)
	},
	async getgroups({ commit }, payload) {
		let data = await authGroup.GetGroups(payload)
		// console.log(data);
		let datanew = data || {
			groups: []
		}
		commit(types.GET_GROUPS, datanew)
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
