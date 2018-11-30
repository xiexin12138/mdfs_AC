<template>
	<div>
  		<el-row type="flex" justify="center">
  		<el-col style="width:500px;">
		<div style="margin:20px 0;">
			<el-form status-icon label-width="120px" ref="newuserform" :model="newuserform" :rules="newuserrule">
				<el-form-item label="用户名" prop="username" >
					<el-input size="small" v-model="newuserform.username"></el-input>
				</el-form-item>
				<el-form-item label="邮箱地址" prop="email" >
					<el-input size="small" auto-complete="off" v-model="newuserform.email"></el-input>
				</el-form-item>

				<el-form-item label="有效期" prop="expire" >
					<el-date-picker
						style="width:380px;"
						size="small"
						v-model="newuserform.expire"
						type="datetime"
						placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss">
				    </el-date-picker>
					<!-- <el-input size="small" v-model="newuserform.expire"></el-input> -->
				</el-form-item>
				<el-form-item label="终端IP" prop="ip" >
					<el-input size="small" v-model="newuserform.ip"></el-input>
				</el-form-item>
				<el-form-item label="终端操作系统" prop="os" >
					<el-input size="small" v-model="newuserform.os"></el-input>
				</el-form-item>
				<el-form-item label="终端MAC" prop="mac" >
					<el-input size="small" v-model="newuserform.mac"></el-input>
				</el-form-item>
				<el-form-item label="终端CPU信息" prop="cpu" >
					<el-input size="small" v-model="newuserform.cpu"></el-input>
				</el-form-item>
				<el-form-item label="终端主板信息" prop="mainboard" >
					<el-input size="small" v-model="newuserform.mainboard"></el-input>
				</el-form-item>
				<el-form-item >
					<el-button type="primary" @click="submitForm('newuserform')">提交</el-button>
					<el-button @click="resetForm('newuserform')">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		</el-col>
		</el-row>
	</div>
</template>
<style>
/* 下面的代码是为了搞定时间选择器的显示问题*/
	.el-time-spinner.has-seconds .el-time-spinner__wrapper:nth-child(2) {
     margin-left: 0;
}
</style>
<script>
/**
 * 新增用户的界面
 */
import Bar from '@/components/common/Bar'
import Vue from 'vue'
import { Button, Input, Form, FormItem, Message, DatePicker, Row, Col } from 'element-ui'
import * as userTable from '../../../api/userTable'

Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(DatePicker)
Vue.use(Row)
Vue.use(Col)
export default {
	components: {
		Bar
	},
	data(){
		let checkIP = (rule, value, callback)=>{
			let reg = /([0-9]{1,3}\.{1}){3}[0-9]{1,3}/
			let valid = reg.exec(value)
			if (valid == null) {
				callback(new Error('请输入正确的IP地址'))
			}else{
				callback()
			}
		}
		return {
			newuserform:{
				username:'',
				email:'',
				expire:'',
				ip:'',
				mac:'',
				cpu:'',
				os:'',
				mainboard:''
			},
			newuserrule:{
				username:[
					{ required:true, message:'请输入用户名', trigger:'blur'},
					// { min:6, max:20, message:'长度在6到20个字符', trigger:'blur'}
				],
				email:[
					{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
      				{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
				],
				expire:[
					{ required: true, message: '请选择日期', trigger: 'blur' }
				],
				ip:[
					{ required: true, message: '请输入IP地址', trigger: 'blur' },
					{ validator: checkIP, trigger: 'blur,change' }
				],
				os:[
					{ required: true, message: '请输入操作系统类型', trigger: 'blur' }
				],
				mac:[
					{ required: true, message: '请输入MAC地址', trigger: 'blur' }
				],
				cpu:[
					{ required: true, message: '请输入cpu信息', trigger: 'blur' }
				],
				mainboard:[
					{ required: true, message: '请输入主板信息', trigger: 'blur' }
				]
			}
		}
	},
	methods:{
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					let data = {
						username:this.newuserform.username,
						email:this.newuserform.email,
						ip:this.newuserform.ip,
						mac:this.newuserform.mac,
						expire:this.newuserform.expire,
						cpu:this.newuserform.cpu,
						mainboard:this.newuserform.mainboard,
						os:this.newuserform.os
					}
					// TODO 逻辑处理，根据返回结果做出相应提示再跳转
					userTable.AddUser(data).then(()=>{
							Message({
								showClose: true,
								message:'提交成功',
								type:'success',
								duration:2000
							})
							this.$router.push({ path: '/user' })
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
		}
	}
}
</script>
