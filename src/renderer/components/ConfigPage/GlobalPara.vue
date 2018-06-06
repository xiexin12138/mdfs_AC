<template>
	<div>
  		<el-row type="flex" justify="center">
  		<el-col style="width:500px;">
		<div style="margin:20px 0;">
			<el-form status-icon label-width="120px" ref="globalform" :model="globalform" :rules="newrule">
				<el-form-item label="休眠时长" prop="sleepTime" >
					<el-input size="small" v-model="globalform.sleepTime"></el-input>
				</el-form-item>
				<el-form-item label="等待时长" prop="waitingTime" >
					<el-input size="small" auto-complete="off" v-model="globalform.waitingTime"></el-input>
				</el-form-item>

				<!-- <el-form-item label="调度间隔时长" prop="expire" >
					<el-date-picker
						style="width:380px;"
						size="small"
						v-model="globalform.expire"
						type="datetime"
						placeholder="选择日期">
				    </el-date-picker>-->
					<!-- <el-input size="small" v-model="globalform.expire"></el-input> -->
				<!-- </el-form-item>  -->
				<el-form-item label="调度间隔时长" prop="schedulingInterval" >
					<el-input size="small" v-model.number="globalform.schedulingInterval" placeholder="单位为分钟"></el-input>
				</el-form-item>
				
				<el-form-item >
					<el-button type="primary" @click="submitForm('globalform')">提交</el-button>
					<el-button @click="resetForm('globalform')">重置</el-button>
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
	DatePicker,
	Row,
	Col
} from 'element-ui'
import * as config from '../../api/config'

Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(DatePicker)
Vue.use(Row)
Vue.use(Col)
export default {
	data() {
		return {
			globalform: {
				sleepTime: '',
				waitingTime: '',
				schedulingInterval: ''
			},
			newrule: {
				sleepTime:[
					{ required:true, message:'请输入休眠时长', trigger:'blur'}
				],
				waitingTime:[
					{ required:true, message:'请输入等待时长', trigger:'blur'}
				],
				schedulingInterval:[
					{ required:true, message:'请输入调度间隔时长', trigger:'blur'},
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
						sleepTime: this.globalform.sleepTime,
						waitingTime: this.globalform.waitingTime,
						schedulingInterval: this.globalform.schedulingInterval
					}
					// TODO 逻辑处理，根据返回结果做出相应提示再跳转
					config
						.submitGlobal(data)
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
