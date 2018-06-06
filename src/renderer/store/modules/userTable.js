/**
 * @author Craig
 * @version 1.0.0
 * @date    2018-03-09
 * @description 用户管理
 *              这里的actions采用了async await，并且把错误抛出，交给调用者处理。
 */
import * as types from '../mutation-types'
import * as userTable from '../../api/userTable'
/**
 * user的初始状态
 * @type {Object}
 */
const state = {
	dataTable: [],
	total: 0,
	pageSize: 10,
	currentPage: 0
}

const getters = {
	getDataTable: state => {
		return state.dataTable
	},
	getDataTotal: state => state.total,
	getDataPageSize: state => {
		return state.pageSize
	},
	getDataCurrentPage: state => {
		return state.currentPage + 1
	}
}
const mutations = {
	[types.DELETE_DATATABLE](state, payload) {
		state.dataTable = [
			...state.dataTable.filter(value => {
				return !payload.id.includes(value.id)
			})
		]
	},
	[types.GET_DATATABLE](state, payload) {
		state.dataTable = payload.dataTable
		state.total = +payload.total
		state.pageSize = +payload.pageSize
		state.currentPage = +payload.currentPage
	}
}

const actions = {
	async deletedatatable({ commit }, payload) {
		// TODO 处理返回结果，再进行commit
		let result = await userTable.DeleteDataTable(payload.id)
		commit(types.DELETE_DATATABLE, payload)
	},
	async getdatatable({ commit }, payload) {
		let data = await userTable.GetDataTable(
			payload.pageSize,
			payload.currentPage
		)
		let datanew = data || {
			dataTable: [],
			total: 0,
			pageSize: 10,
			currentPage: 0
		}
		commit(types.GET_DATATABLE, datanew)
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
