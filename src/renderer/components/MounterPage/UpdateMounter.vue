<template>
	<div>
  		<el-row type="flex" justify="center">
  		<el-col style="width:500px;">
		<div style="margin:20px 0;">
			<el-form status-icon label-width="120px" ref="globalform" :model="globalform" :rules="newrule">
				<el-form-item label="挂载节点id" prop="id" >
					<el-input size="small" v-model="globalform.id" disabled></el-input>
				</el-form-item>
				<el-form-item label="操作系统类型" prop="mounterType" >
					<el-input size="small" auto-complete="off" v-model="globalform.mounterType"></el-input>
				</el-form-item>
				<el-form-item label="挂载节点IP" prop="address" >
					<el-input size="small" v-model="globalform.address" ></el-input>
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
import * as mounter from '../../api/mounter'

Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(DatePicker)
Vue.use(Row)
Vue.use(Col)
export default {
	data() {
		let targetID = this.$route.params.id
		let mounter = this.$store.getters.getMounters.find(value=> value.id == targetID)
		return {
			globalform: {
				id: mounter.id,
				mounterType: mounter.type,
				address: mounter.ip
			},
			mounter:mounter,
			newrule: {
				id:[
					{ required:true, message:'请输入挂载节点id', trigger:'blur'}
				],
				mounterType:[
					{ required:true, message:'请输入操作系统类型', trigger:'blur'}
				],
				address:[
					{ required:true, message:'请输入挂载节点IP', trigger:'blur'}
				],
			}
		}
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					let data = {
						id: this.globalform.id,
						mounterType: this.globalform.mounterType,
						address: this.globalform.address
					}
					mounter
						.UpdateMounter(data)
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
			this.globalform.id = this.mounter.id
			this.globalform.mounterType = this.mounter.type
			this.globalform.address = this.mounter.ip
		}
	}
}
</script>
