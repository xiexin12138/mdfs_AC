import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import userTable from './modules/userTable'
import acUserTable from './modules/acUserTable'
import mounter from './modules/mounter'
import dir from './modules/dir'
import summary from './modules/summary'
import consoleConfig from './modules/consoleConfig'

Vue.use(Vuex)

export default new Vuex.Store({
	modules:{
		user,
		userTable,
    acUserTable,
		mounter,
		dir,
    summary,
    consoleConfig,
	}

})
