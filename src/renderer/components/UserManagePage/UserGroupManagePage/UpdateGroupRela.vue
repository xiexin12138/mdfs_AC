<template>
	<div>
  		<el-row type="flex" justify="center">
  		<el-col style="width:500px;">
		<div style="margin:20px 0;">
			<el-form status-icon label-width="150px" ref="groupmanageform" :model="groupmanageform" :rules="newrule">
				<el-form-item label="用户名" prop="user" >
					<el-input size="small" v-model="groupmanageform.user" disabled></el-input>
				</el-form-item>
				<el-form-item label="用户组名" prop="group" >
					<el-input size="small" v-model="groupmanageform.group"
					></el-input>
				</el-form-item>


				<el-form-item >
					<el-button type="primary" @click="submitForm('groupmanageform')">提交</el-button>
					<el-button @click="resetForm('groupmanageform')">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		</el-col>
		</el-row>
	</div>
</template>

<script>
/**
 * 这个文件是文件系统配置页面
 */
import Vue from 'vue'
import { Button, Input, Form, FormItem, Message, Row, Col, Upload } from 'element-ui'
import * as authGroup from '../../../api/authGroup'

Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Upload)
export default {
	data(){
		let targetUser = this.$route.params.targetuser
		console.log(targetUser)
		return {
			groupmanageform:{
                user:targetUser,
                group:null,
                type:"ManageUserAndGroup"
			},
			newrule:{
				user:[
					{ required:true, message:'请输入用户名', trigger:'blur'}
				],
				group:[
					{ required:true, message:'请输入用户组名', trigger:'blur'}
				],
				
			}
		}
	},
	methods:{
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					// TODO 注释掉的文件上传需要重新开启，看后台实现没
					let data = {
                        
						user: this.groupmanageform.user,
						group:this.groupmanageform.group,
						operation:'add',
					}
					
					authGroup.submitGroupManage(data).then(function(result){
						if (result == true) {
							Message({
								showClose: true,
								message:'提交成功',
								type:'success',
								duration:2000
							})
						}
					}).catch((e)=>{
							Message({
								showClose: true,
								message:e.message,
								type:'error',
								duration:2000
							})
						})

				} else {
					return false
				}
			})
		},
		resetForm(formName) {
			this.$refs[formName].resetFields()
		},
		

	}
}
</script>