<template>
<div>
  <el-row type="flex" class="row-bg" justify="center">
  <el-col style="width:1700px;">
    <div>

					<el-card class="box-card">
						<div slot="header" class="clearfix">
							<span style="font-size:18px;">用户信息</span>
						</div>
						<el-row :gutter="15" >
						  <el-col :span="6":offset="2"><div style="text-align:right;">邮&ensp;&ensp;箱&nbsp;:</div></el-col>
						  <el-col :span="8" ><div>{{user.email}}</div></el-col>
						</el-row>
						<el-row :gutter="15">
						  <el-col :span="6":offset="2"><div style="text-align:right;">有效期&nbsp;:</div></el-col>
						  <el-col :span="8" ><div>{{user.expire}}</div></el-col>
						</el-row>
						<el-row :gutter="15">
						  <el-col :span="6":offset="2"><div style="text-align:right;">IP地址&nbsp;:</div></el-col>
						  <el-col :span="8" ><div>{{user.ip}}</div></el-col>
						</el-row>
						<el-row :gutter="15">
						  <el-col :span="6":offset="2"><div style="text-align:right;">M&nbsp;A&nbsp;C&nbsp;:</div></el-col>
						  <el-col :span="8" ><div>{{user.mac}}</div></el-col>
						</el-row>
						<el-row :gutter="15">
						  <el-col :span="6":offset="2"><div style="text-align:right;">C&ensp;P&nbsp;U&nbsp;:</div></el-col>
						  <el-col :span="8" ><div>{{user.cpu}}</div></el-col>
						</el-row>
						<el-row :gutter="15">
						  <el-col :span="6":offset="2"><div style="text-align:right;">操作系统&nbsp;:</div></el-col>
						  <el-col :span="8" ><div>{{user.os}}</div></el-col>
						</el-row>
						<el-row :gutter="15">
						  <el-col :span="6":offset="2"><div style="text-align:right;">主板信息&nbsp;:</div></el-col>
						  <el-col :span="8" ><div>{{user.mainboard}}</div></el-col>
						</el-row>
					</el-card>
		<el-row :gutter="3">
		  <el-col :span="3":offset="9" ><el-button  size="small" type="primary" @click="emailFormVisible = true">修改邮箱&nbsp;</el-button></el-col>
		  <el-col :span="3" :pull="1"><el-button  size="small" type="primary" @click="expireFormVisible = true">修改有效期</el-button></el-col>
		  <el-col :span="4" :pull="2"><el-button  size="small" type="primary" @click="clientFormVisible = true">修改绑定终端</el-button></el-col>
		</el-row>
    </div>
</el-col>
</el-row>

	<el-dialog title="修改邮箱" :visible.sync="emailFormVisible">
	  <el-form :model="emailFrom" ref="emailFrom">
	    <el-form-item label="新邮箱" :label-width="formLabelWidth" prop="newEmail" :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
    ]">
	      <el-input v-model="emailFrom.newEmail" auto-complete="off"></el-input>
	    </el-form-item>
	  </el-form>
	  <div slot="footer" class="dialog-footer">
	    <el-button @click="emailFormVisible = false">取 消</el-button>
	    <el-button type="primary" @click="submitEmail">确 定</el-button>
	  </div>
	</el-dialog>

	<el-dialog title="修改有效期" :visible.sync="expireFormVisible">
	  <el-form :model="expireForm" ref="expireForm">
	    <el-form-item label="有效期" :label-width="formLabelWidth" prop="expire" :rules="[
      { required: true, message: '请选择有效期', trigger: 'blur' }
    ]">
	    	<el-date-picker
				v-model="expireForm.expire"
				type="datetime"
				placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss">
		    </el-date-picker>
	    </el-form-item>
	  </el-form>
	  <div slot="footer" class="dialog-footer">
	    <el-button @click="expireFormVisible = false">取 消</el-button>
	    <el-button type="primary" @click="submitExpire">确 定</el-button>
	  </div>
	</el-dialog>

	<el-dialog title="绑定终端" :visible.sync="clientFormVisible">
	  <el-form :model="clientForm" ref="clientForm" :rules="clientRules">
	    <el-form-item label="终端IP" :label-width="formLabelWidth" prop="ip">
			<el-input v-model="clientForm.ip"></el-input>
		</el-form-item>
		<el-form-item label="终端MAC" :label-width="formLabelWidth">
			<el-input v-model="clientForm.mac"></el-input>
		</el-form-item>
		<el-form-item label="终端CPU信息" :label-width="formLabelWidth">
			<el-input v-model="clientForm.cpu"></el-input>
		</el-form-item>
		<el-form-item label="终端操作系统" :label-width="formLabelWidth">
			<el-input v-model="clientForm.os"></el-input>
		</el-form-item>
		<el-form-item label="终端主板信息" :label-width="formLabelWidth">
			<el-input v-model="clientForm.mainboard"></el-input>
		</el-form-item>
	  </el-form>
	  <div slot="footer" class="dialog-footer">
	    <el-button @click="clientFormVisible = false">取 消</el-button>
	    <el-button type="primary" @click="submitClient">确 定</el-button>
	  </div>
	</el-dialog>
	<foot></foot>
</div>
</template>
<style>
/* 下面的代码是为了搞定时间选择器的显示问题*/
	.el-time-spinner.has-seconds .el-time-spinner__wrapper:nth-child(2) {
     margin-left: 0;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.box-card{
  position: relative;
  width: 400px;
  height: 300px;
  margin-left: auto;
  margin-right: auto;
}
</style>
<script>
/**
 * 更新用户的页面
 */
import Bar from '@/components/common/Bar'
import Vue from 'vue'
import {
	Row,
	Col,
	Button,
	Card,
	Input,
	Form,
	FormItem,
	Dialog,
	DatePicker,
	Message
} from 'element-ui'
import * as userTable from '../../api/userTable'

Vue.use(Row)
Vue.use(Col)
Vue.use(Button)
Vue.use(Card)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Dialog)
Vue.use(DatePicker)

export default {
	components: {
		Bar
	},
	data() {
		let checkIP = (rule, value, callback) => {
			let reg = /([0-9]{1,3}\.{1}){3}[0-9]{1,3}/
			let valid = reg.exec(value)
			if (valid == null) {
				callback(new Error('请输入正确的IP地址'))
			} else {
				callback()
			}
		}
		let targetID = this.$route.params.id
		let userData = this.$store.getters.getDataTable.find(value => {
			return value.id == targetID
		})
		return {
			emailFormVisible: false,
			expireFormVisible: false,
			clientFormVisible: false,
			formLabelWidth: '120px',
			user: {
				id:userData.id,
				username:userData.username,
				email: userData.email,
				expire: userData.expire,
				ip: userData.ip,
				mac: userData.mac,
				cpu: userData.cpu,
				os: userData.os,
				mainboard: userData.mainboard
			},
			clientForm: {
				ip: userData.ip,
				mac: userData.mac,
				cpu: userData.cpu,
				os: userData.os,
				mainboard: userData.mainboard
			},
			expireForm: {
				expire: ''
			},
			emailFrom: {
				newEmail: ''
			},
			clientRules: {
				ip: [{ validator: checkIP, trigger: 'blur,change' }]
			}
		}
	},
	methods:{
		submitEmail(){
			this.$refs["emailFrom"].validate((valid)=>{
				if (valid) {
					let data = {
						id:this.user.id,
						email:this.emailFrom.newEmail
					}

					userTable.UpdateEmail(data).then(()=>{
							this.user.email = data.email
							Message({
								showClose: true,
								message:'提交成功',
								type:'success',
								duration:2000
							})
						}).catch((e)=>{
							Message({
								showClose: true,
								message:e.message,
								type:'error',
								duration:2000
							})

	          if(e.message=="Error: 您已在另一地点登录，请重新登录！"){
	           this.$router.push({ path: '/'})
	          }
						})


				}else{
					return false
				}
				this.emailFormVisible = false
			})
		},
		submitExpire(){
			this.$refs["expireForm"].validate((valid)=>{
				if (valid) {
					let data = {
						id:this.user.id,
						expire:this.expireForm.expire
					}
					// TODO 逻辑处理，更新成功，提醒，处理跳转，
					userTable.UpdateExpire(data).then(()=>{
						this.user.expire = data.expire
							Message({
								showClose: true,
								message:'提交成功',
								type:'success',
								duration:2000
							})
						}).catch((e)=>{
							Message({
								showClose: true,
								message:e.message,
								type:'error',
								duration:2000
							})

	          if(e.message=="Error: 您已在另一地点登录，请重新登录！"){
	           this.$router.push({ path: '/'})
	          }
						})


				}else{
					return false
				}
				this.expireFormVisible = false
			})
		},
		submitClient(){
			this.$refs["clientForm"].validate((valid)=>{
				if (valid) {
					let data = {
						id:this.user.id,
						ip: this.clientForm.ip,
						mac: this.clientForm.mac,
						cpu: this.clientForm.cpu,
						os: this.clientForm.os,
						mainboard: this.clientForm.mainboard
					}
					// TODO 逻辑处理，更新成功，提醒，处理跳转，
					userTable.UpdateClient(data).then(()=>{
							this.user.ip = data.ip
							this.user.mac = data.mac
							this.user.cpu = data.cpu
							this.user.os = data.os
							this.user.mainboard = data.mainboard
							Message({
								showClose: true,
								message:'提交成功',
								type:'success',
								duration:2000
							})
						}).catch((e)=>{
							Message({
								showClose: true,
								message:e.message,
								type:'error',
								duration:2000
							})

	          if(e.message=="Error: 您已在另一地点登录，请重新登录！"){
	           this.$router.push({ path: '/'})
	          }
						})


				}else{
					return false
				}
				this.clientFormVisible = false
			})
		}
	}
}
</script>
