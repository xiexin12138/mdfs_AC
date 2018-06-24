<template>
	<div>
  		<el-row type="flex" justify="center">
  		<el-col style="width:500px;">
		<div style="margin:20px 0;">
			<el-form status-icon label-width="150px" ref="mountfsform" :model="mountfsform" :rules="newrule">
				<el-form-item label="文件系统id" prop="fsId" >
					<el-input size="small" v-model="mountfsform.fsId"></el-input>
				</el-form-item>
				<el-form-item label="Mount节点id" prop="mounterId" >
					<el-input size="small" v-model="mountfsform.mounterId"
					placeholder="需与cmNode的id保持一致"></el-input>
				</el-form-item>
				<el-form-item label="Mount节点挂载路径" prop="mountAddr" >
					<el-input size="small" v-model="mountfsform.mountAddr"
					placeholder="例如：/mnt/fs1"></el-input>
				</el-form-item>	

				<el-form-item >
					<el-button type="primary" @click="submitForm('mountfsform')">提交</el-button>
					<el-button @click="resetForm('mountfsform')">重置</el-button>
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
import { Button, Input, Form, FormItem, Message, DatePicker, Row, Col, Upload } from 'element-ui'
import * as config from '../../api/config'

Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(DatePicker)
Vue.use(Row)
Vue.use(Col)
Vue.use(Upload)
export default {
	data(){
		
		return {
			mountfsform:{
                fsId:null,
                mounterId:null,
                mountAddr:null,
                type:"mountFs"
			},
			newrule:{
				fsId:[
					{ required:true, message:'请输入文件系统id', trigger:'blur'}
				],
				mounterId:[
					{ required:true, message:'请输入Mount挂载节点id', trigger:'blur'}
				],
				mountAddr:[
					{ required:true, message:'请输入Mount挂载节点路径', trigger:'blur'}
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
						fsId:this.mountfsform.fsId,
						mounterId: this.mountfsform.mounterId,
						mountAddr: this.mountfsform.mountAddr,
					}
					
					config.submitMountFS(data).then(function(result){
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