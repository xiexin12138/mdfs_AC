import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import userTable from './modules/userTable'
import mounter from './modules/mounter'

Vue.use(Vuex)

export default new Vuex.Store({
	modules:{
		user,
		userTable,
		mounter
	}
	
})