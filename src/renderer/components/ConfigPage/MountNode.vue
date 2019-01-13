<template>
	<div>
  		<el-row type="flex" justify="center">
  		<el-col style="width:500px;">
		<div style="margin:20px 0;">
			<el-form status-icon label-width="120px" ref="mountform" :model="mountform" :rules="newrule">
				<el-form-item label="节点名称" prop="mountName" >
					<el-input size="small" v-model="mountform.mountName"></el-input>
				</el-form-item>
				<el-form-item label="节点IP" prop="mountIP" >
					<el-input size="small" v-model="mountform.mountIP"></el-input>
				</el-form-item>
				<el-form-item label="节点MAC" prop="mountMAC" >
					<el-input size="small" v-model="mountform.mountMAC"></el-input>
				</el-form-item>
				<el-form-item label="休眠时长" prop="sleepTime" >
					<el-input size="small" v-model="mountform.sleepTime"></el-input>
				</el-form-item>
				<el-form-item label="开机等待时长" prop="waitingTime" >
					<el-input size="small" v-model="mountform.waitingTime"></el-input>
				</el-form-item>
				<el-form-item >
					<el-button type="primary" @click="submitForm('mountform')">提交</el-button>
					<el-button @click="resetForm('mountform')">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		</el-col>
		</el-row>
	</div>
</template>

<script>
/**
 * 这个页面已经取消
 */
import Vue from 'vue'
import { Button, Input, Form, FormItem, Message, DatePicker, Row, Col } from 'element-ui'
import * as config from '../../api/config'

Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(DatePicker)
Vue.use(Row)
Vue.use(Col)
export default {
	data(){
		
		return {
			mountform:{
				mountName:null,
				mountIP:null,
				mountMAC:null,
				sleepTime:null,
				waitingTime:null,
			},
			newrule:{
				
			}
		}
	},
	methods:{
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					let data = {
						mountName:this.mountform.mountName,
						mountIP:this.mountform.mountIP,
						mountMAC:this.mountform.mountMAC,
						sleepTime:this.mountform.sleepTime,
						waitingTime:this.mountform.waitingTime,
					}
					// TODO 逻辑处理，根据返回结果做出相应提示再跳转
					config.submitMount(data).then(function(result){
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
                            if(e.message=="Error: 您已在另一地点登录，请重新登录！"){
                             this.$router.push({ path: '/'})
                            }
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