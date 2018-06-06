<template>
<div id="stepsBar" >

	<el-steps :active="active" finish-status="success" align-center style="margin-bottom:20px;">
		<el-step title="验证邮箱"></el-step>
		<el-step title="设置密码"></el-step>
		<el-step title="完成"></el-step>
	</el-steps>
	<el-row type="flex" align="middle" style="height:500px">
<el-col style="height:200px;">
<el-row type="flex" justify="center">
<el-col style="width:400px;">
	<el-form v-show="showPass" status-icon label-width="100px" ref="resetPasswordForm" :model="resetPasswordForm" :rules="resetrule" >
		
		<el-form-item label="设置新密码" prop="pass">
		    <el-input style="width:250px;" type="password" placeholder="请输入6~20位新密码" v-model="resetPasswordForm.pass" auto-complete="off"></el-input>
		  </el-form-item>
		  <el-form-item label="重复新密码" prop="checkPass">
		    <el-input style="width:250px;" type="password" placeholder="请再次输入同样的密码" v-model="resetPasswordForm.checkPass" auto-complete="off"></el-input>
		  </el-form-item>
		<el-form-item style='margin-top:100px;'>
			<el-button @click="back()">上一步</el-button>
			<el-button type="primary" @click="submitForm()" @keyup.enter="submitForm()">提交</el-button>
		</el-form-item>
	</el-form>

	<el-form v-show="showNext" status-icon label-width="100px" ref="newForm" :model="newForm" :rules="newrule" >
		<el-form-item label="邮箱" prop="emailAdress" >
            <el-input type="text" placeholder="请输入绑定邮箱" style="width:300px;" v-model="newForm.emailAdress"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="captcha">
            <el-input type="text" placeholder="请输入邮箱验证码" style="width:184px;" v-model="newForm.captcha"></el-input>
            <el-button @click="getCaptcha"  >获取验证码</el-button>
        </el-form-item>

		<el-form-item style='margin-top:100px;'>
			<el-button @click="login">返回登录页</el-button>
			<el-button @click="next" @keyup.enter="next">下一步</el-button>
			
		</el-form-item>
	</el-form>
	
	<el-form v-show="showLast" status-icon label-width="40px" >
		<el-form-item >
			<span>设置新密码成功！请点击下一步返回登录界面继续登录</span>
		</el-form-item>

		<el-form-item style='margin-top:150px;margin-left: 100px;'>
			<el-button @click="login" @keyup.enter="login">完成</el-button>
			
		</el-form-item>
	</el-form>
</el-col>
</el-row>
</el-col>
</el-row>
</div>
</template>
<style type="text/css">

	#stepsBar{
		display: block;
		position: relative;
		margin-right: auto;
		margin-left: auto;
		width: 75%;	
		top:40px;	
	}
</style>
<script>
import Vue from 'vue'
import { Button, Input, Form, FormItem, Message, Row, Col, Steps, Step } from 'element-ui'
import * as user from '../../api/user'
Vue.use(Row)
Vue.use(Col)
Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Steps)
Vue.use(Step)
/**
 * 说明：用户重新设置密码的界面
 *
 */
export default {
	data() {
		var validatePass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入密码'))
			} else {
				if (this.resetPasswordForm.checkPass !== '') {
					this.$refs.resetPasswordForm.validateField('checkPass')
				}
				callback()
			}
		}
		var validatePass2 = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请再次输入密码'))
			} else if (value !== this.resetPasswordForm.pass) {
				callback(new Error('两次输入密码不一致!'))
			} else {
				callback()
			}
		}

		return {
			active: 0,
			showPass:false,
			showLast:false,
			showNext:true,
			newForm:{
				emailAdress:null,
				captcha: null,
			},
			resetPasswordForm: {
				pass: '',
				checkPass: ''
			},
			resetrule: {
				pass: [{ validator: validatePass, trigger: 'blur' },
				{ min:6, max:20, message:'长度在6到20个字符', trigger:'blur'},
				{ required: true, message: '请输入密码', trigger: 'blur' }],
				checkPass: [{ validator: validatePass2, trigger: 'blur' },
				{ min:6, max:20, message:'长度在6到20个字符', trigger:'blur'},
				{ required: true, message: '请再次输入密码', trigger: 'blur' }],
				
			},
			newrule:{
				captcha: [
					{ required: true, message: '请输入验证码', trigger: 'blur' },
					// { type: 'number', message: '请输入数字', trigger: 'blur,change' }
				],
				emailAdress: [
					{ required: true, message: '请输入用户名', trigger: 'blur' },
					{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
				]
			}
		}
	},
	methods: {
		getCaptcha(){
			// 表单某个元素的验证，使用callback反馈信息。
			this.$refs.newForm.validateField('emailAdress',(valid)=>{
				if (!valid) {
					let data = {
						email: this.newForm.emailAdress
					}
					user.GetCaptcha(data)
						.then(()=>{
							Message({
								showClose: true,
								message: '验证码发送成功！',
								type: 'success',
								duration: 2000
							})
						}).catch(e => {
							Message({
								showClose: true,
								message: e.message,
								type: 'error',
								duration: 2000
							})
						})
				}
			})
			
		},
		next(){
			this.$refs['newForm'].validate(valid => {
				if (valid) {
					this.active++ 
					this.showNext = false
					this.showPass = true
				}else {
					return false
				}
			})
			
		},
		back(){
			this.active = 0
			this.showNext = true
			this.showPass = false
		},
		submitForm() {
			this.$refs['resetPasswordForm'].validate(valid => {
				if (valid) {
					console.log(this.newForm.emailAdress)
					let data = {
						email: this.newForm.emailAdress,
						captcha: this.newForm.captcha,
						password: this.resetPasswordForm.pass
					}
					user
						.ChangePass(data)
						.then(() => {
							this.active++
							this.showPass = false
							this.showNext = false
							this.showLast = true
							Message({
								showClose: true,
								message: '提交成功，即将自动跳转或点击跳转按钮···',
								type: 'success',
								duration: 2000
							})
							setTimeout(()=>{
								this.$router.push({ path: '/' })
							},2000)
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
		login() {
			this.$router.push({ path: '/' })
		}
	}
}
</script>
