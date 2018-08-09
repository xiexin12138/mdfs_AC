import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import userTable from './modules/userTable'
import mounter from './modules/mounter'
import dir from './modules/dir'
import group from './modules/group'

Vue.use(Vuex)

export default new Vuex.Store({
	modules:{
		user,
		userTable,
		mounter,
		dir,
		group,
	}
	
})