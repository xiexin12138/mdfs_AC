/**
 * @author Sai
 * @version 
 * @date    2018-08-14
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
	grouprelas: []
}

const getters = {
	getGrouprelas: state => {
		return state.grouprelas
	}
}
const mutations = {
	[types.DELETE_GROUPSRELA](state, payload) {
		state.grouprelas = [
			...state.grouprelas.filter(value => {
				return !payload.id.includes(value.id)
			})
		]
	},
	[types.GET_GROUPSRELA](state, payload) {
		state.grouprelas = payload.grouprelas
	}
}

const actions = {
	async deletegrouprelas({ commit }, payload) {
		let result = await authGroup.DeleteGroupsRela(payload.user,payload.group,payload.operation)
		// commit(types.DELETE_GROUPSRELA, payload)
	},
	async getgrouprelas({ commit }, payload) {
		let data = await authGroup.GetGroupRelas(payload)
		// console.log(payload);
		let datanew = data || {
			grouprelas: []
		}
		commit(types.GET_GROUPSRELA, datanew)
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
