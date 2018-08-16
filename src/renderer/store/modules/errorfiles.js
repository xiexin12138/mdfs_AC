/**
 * @author Sai
 * @version 
 * @date    2018-08-15
 * @description  异常文件
 *              这里的actions采用了async await，并且把错误抛出，交给调用者处理。
 */
import * as types from '../mutation-types'
import * as errorFile from '../../api/errorFile'
/**
 * user的初始状态
 * @type {Object}
 */
const state = {
	errorfiles: []
}

const getters = {
	getEfiles: state => {
		return state.errorfiles
	}
}
const mutations = {
	// [types.DELETE_DIRS](state, payload) {
	// 	state.dirs = [
	// 		...state.dirs.filter(value => {
	// 			return !payload.id.includes(value.id)
	// 		})
	// 	]
	// },
	[types.GET_ERRORFILES](state, payload) {
		state.errorfiles = payload.errorfiles
	}
}

const actions = {
	// async deletedirs({ commit }, payload) {
	// 	let result = await errorFile.DeleteDirs(payload.id,payload.username)
	// 	commit(types.DELETE_DIRS, payload)
	// },
	async getefiles({ commit }, payload) {
		let data = await errorFile.GetErrorFiles(payload)
		// console.log(payload);
		let datanew = data || {
			errorfiles: []
		}
		commit(types.GET_ERRORFILES, datanew)
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
