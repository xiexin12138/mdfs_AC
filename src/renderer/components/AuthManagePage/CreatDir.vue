<template>
	<div>
  		<el-row type="flex" justify="center">
  		<el-col style="width:500px;">
		<div style="margin:20px 0;">
			<el-form status-icon label-width="120px" ref="dirform" :model="dirform" :rules="newrule">



				<el-form-item label="目录名称" prop="dirName" >
					<el-input size="small"  v-model="dirform.dirName"></el-input>
				</el-form-item>

				<el-form-item label="用户名" prop="user" >
					<el-input size="small"  v-model="dirform.user"></el-input>
				</el-form-item>

				<el-form-item label="用户组名" prop="group" >
					<el-input size="small" v-model="dirform.group"></el-input>
				</el-form-item>

				<el-form-item label="目录对应权限" prop="auth" >
					<el-input size="small" v-model.number="dirform.auth" placeholder="如：755"></el-input>
				</el-form-item>
				
				<el-form-item >
					<el-button type="primary" @click="submitForm('dirform')">提交</el-button>
					<el-button @click="resetForm('dirform')">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		</el-col>
		</el-row>
	</div>
</template>

<script>
/**
 * 这个文件是全局参数配置的页面
 */
import Vue from 'vue'
import {
	Button,
	Input,
	Form,
	FormItem,
	Message,
	Row,
	Col
} from 'element-ui'
import * as authGroup from '../../api/authGroup'

Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Row)
Vue.use(Col)
export default {
	data() {
		return {
			dirform: {
		
				dirName:'',
				user:'',
				group: '',
				auth: '',
				type: "createDir "
			},
			newrule: {

				dirName:[
					{ required:true, message:'请输入目录名称', trigger:'blur'}
				],
				user:[
					{ required:true, message:'请输入拥有者的用户名', trigger:'blur'}
				],
				group:[
					{ required:true, message:'请输入用户组名称', trigger:'blur'}
				],
				auth:[
					{ required:true, message:'请输入该目录权限', trigger:'blur'},
					{ type: 'number', message: '请输入数字', trigger: 'blur,change' }
				],
			}
		}
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					let data = {
						dirName: this.dirform.dirName,
						user: this.dirform.user,
						group: this.dirform.group,
						auth: this.dirform.auth
					}
					// TODO 逻辑处理，根据返回结果做出相应提示再跳转
					authGroup
						.submitAuth(data)
						.then(function(result) {
							if (result == true) {
								Message({
									showClose: true,
									message: '提交成功',
									type: 'success',
									duration: 2000
								})
							}
						})
						.catch(e => {
							Message({
								showClose: true,
								message: e.message,
								type: 'error',
								duration: 2000
							})
						})
				} else {
					return false
				}
			})
		},
		resetForm(formName) {
			this.$refs[formName].resetFields()
		}
	}
}
</script>
