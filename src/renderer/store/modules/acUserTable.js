/**
 * @author Craig
 * @version 1.0.0
 * @date    2018-03-09
 * @description 用户管理
 *              这里的actions采用了async await，并且把错误抛出，交给调用者处理。
 */
import * as types from '../mutation-types'
import * as acUserTable from '../../api/acUserTable'
/**
 * user的初始状态
 * @type {Object}
 */
const state = {
	acDataTable: [],
	acTotal: 0,
	acPageSize: 5,
	acCurrentPage: 0
}

const getters = {
	getAcDataTable: state => {
		return state.acDataTable
	},
	getAcDataTotal: state => state.total,
	getAcDataPageSize: state => {
		return state.acPageSize
	},
	getAcDataCurrentPage: state => {
		return state.acCurrentPage +1
	}
}
const mutations = {
	[types.DELETE_AC_USER](state, payload) {
		state.acDataTable = [
			...state.acDataTable.filter(value => {
				return !payload.id.includes(value.id)
			})
		]
	},
	[types.GET_AC_USER](state, payload) {
		state.acDataTable = payload.loginUsers
		state.total = +payload.total
		state.acPageSize = +payload.acPageSize
		state.acCurrentPage = +payload.acCurrentPage
	}
}

const actions = {
	async deleteacdatatable({ commit }, payload) {
		// TODO 处理返回结果，再进行commit
		let result = await acUserTable.DeleteDataTable(payload)
    /*console.log("result:"+result);
    commit(types.DELETE_AC_USER, payload)*/
	},
	async getacdatatable({ commit }, payload) {
		let data = await acUserTable.GetDataTable()
		let datanew = data || {
			loginUsers: [],
			acTotal: 0,
			acPageSize: 5,
			acCurrentPage: 0
		}
		commit(types.GET_AC_USER, datanew)
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
