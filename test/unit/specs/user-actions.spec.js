import { expect } from 'chai'
import user from '@/store/modules/user.js'
import * as types from '@/store/mutation-types.js'
const actionsInjector = require('inject-loader!@/store/modules/user.js')

const actions = actionsInjector({
	'../../api/user': {
		CheckUser(v1,v2){
			setTimeout(()=>{
				if (v1 == 'admin' && v2 == 'admin123') {
					return true
				}else{
					return false
				}
			},1000)
		}
	}
})
// 用指定的 mutaions 测试 action 的辅助函数
const testAction = (action, args, state, expectedMutations, done) => {
  let count = 0

  // 模拟提交
  const commit = (type, payload) => {
    const mutation = expectedMutations[count]

    try {
      expect(mutation.type).to.equal(type)
      if (payload) {
        expect(mutation.payload).to.deep.equal(payload)
      }
    } catch (error) {
      done(error)
    }

    count++
    if (count >= expectedMutations.length) {
      done()
    }
  }
// 用模拟的 store 和参数调用 action
 action({ commit, state }, args).catch((error)=>{
 	expect(error.toString()).to.equal('用户或密码不对')
 })

 if (expectedMutations.length === 0) {
    expect(count).to.equal(0)
    done()
  }
}
// 测试user-action
describe('actions', () => {
	it('CheckUser success', done => {
		testAction(
			user.actions.checkuser,
			{ username: 'admin', password: 'admin123' },
			{},
			[
				{
					type: types.CHECK_USER,
					payload: { username: 'admin', password: 'admin123' }
				}
			],
			done
		)
	})
	it('CheckUser fail', done => {
		testAction(
			user.actions.checkuser,
			{ username: 'admin', password: 'admin' },
			{},
			[
				{
					type: types.CHECK_USER,
					payload: { username: 'admin', password: 'admin123' }
				}
			],
			done
		)
	})
})

