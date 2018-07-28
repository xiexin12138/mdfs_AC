<template>
	<div>
  		<el-row type="flex" justify="center">
  		<el-col style="width:500px;">
		<div style="margin:20px 0;">
			<el-form status-icon label-width="140px" ref="fsform" :model="fsform" :rules="newrule">
				<el-form-item label="文件系统id" prop="fsId" >
					<el-input size="small" v-model="fsform.fsId"></el-input>
				</el-form-item>
				<el-form-item label="文件系统名称" prop="fsName" >
					<el-input size="small" v-model="fsform.fsName"></el-input>
				</el-form-item>
				<el-form-item label="文件系统类型" prop="fsType" >
					<el-input size="small" v-model="fsform.fsType"></el-input>
				</el-form-item>	
				<el-form-item label="文件系统挂载路径" prop="mountPoint" >
					<el-input size="small" v-model="fsform.mountPoint"></el-input>                
				</el-form-item>
				<el-form-item label="元数据池名称" prop="matadatePool" >
					<el-input size="small" v-model="fsform.matadatePool"></el-input>
				</el-form-item>
				<el-form-item label="数据池名称" prop="dataPools" >
					<el-input size="small" v-model="fsform.dataPools"></el-input>
				</el-form-item>
				<el-form-item label="文件服务器地址" prop="fsIP" >
					<el-input size="small" v-model="fsform.fsIP"></el-input>
				</el-form-item>
				<el-form-item label="端口号" prop="fsPort" >
					<el-input size="small" v-model.number="fsform.fsPort"></el-input>
				</el-form-item>
				<el-form-item label="私钥文件" prop="privateKey" >
					<el-upload
					  action="alert"
					  :show-file-list="false"
					  :limit="1"
					  :auto-upload="false"
					  :on-change="handleChangeKey">
					  <el-button slot="trigger" size="small" type="primary">选取私钥文件</el-button>
					  <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
					</el-upload>
					<!-- <el-input size="small" v-model="fsform.privateKey"></el-input> -->
				</el-form-item>
				<el-form-item label="配置文件" prop="configFile" >
					<el-upload
					  action="alert"
					  :show-file-list="false"
					  :limit="1"
					  :auto-upload="false"
					  :on-change="handleChangeConfig">
					  <el-button slot="trigger" size="small" type="primary">选取配置文件</el-button>
					  <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
					</el-upload>
					<!-- <el-input size="small" v-model="fsform.configFile"></el-input> -->
				</el-form-item>
				<el-form-item label="存储空间" prop="storage" >
					<el-input size="small" v-model.number="fsform.storage" placeholder="单位为G"></el-input>
				</el-form-item>
				<el-form-item >
					<el-button type="primary" @click="submitForm('fsform')">提交</el-button>
					<el-button @click="resetForm('fsform')">重置</el-button>
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
			fsform:{
				fsId:null,
				fsName:null,
				fsType:null,
				mountPoint:null,
				matadatePool:null,
				dataPools:null,
				fsIP:null,
				fsPort:null,
				privateKey:null,
				privateKeyDone:false,
				configFile:null,
				configFileDone:false,
				storage:null
			},
			newrule:{
				fsId:[
					{ required:true, message:'请输入文件系统id', trigger:'blur'}
				],
				fsName:[
					{ required:true, message:'请输入文件系统名称', trigger:'blur'}
				],
				fsType:[
					{ required:true, message:'请输入文件系统类型及版本号', trigger:'blur'}
				],
				mountPoint:[
					{ required:true, message:'请输入文件系统挂载路径', trigger:'blur'}
				],
				matadatePool:[
					{ required:true, message:'请输入元数据池名称', trigger:'blur'}
				],
				dataPools:[
					{ required:true, message:'请输入数据池名称', trigger:'blur'}
				],
				fsIP:[
					{ required:true, message:'请输入文件服务器IP', trigger:'blur'}
				],
				fsPort:[
					{ required:true, message:'请输入端口号', trigger:'blur'},
					{ type: 'number', message: '请输入数字', trigger: 'blur,change' }
				],
				privateKey:[
					{ required:true, message:'请上传私钥文件', trigger:'blur'}
				],
				configFile:[
					{ required:true, message:'请上传配置文件', trigger:'blur'}
				],
				storage:[
					{ required:true, message:'请输入端口号', trigger:'blur'},
					{ type: 'number', message: '请输入数字', trigger: 'blur,change' }
				],
			}
		}
	},
	methods:{
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid && this.privateKeyDone && this.configFileDone) {
					// TODO 注释掉的文件上传需要重新开启，看后台实现没
					let data = {
						fsId:this.fsform.fsId,
						fsName:this.fsform.fsName,
						fsType:this.fsform.fsType,
						mountPoint:this.fsform.mountPoint,
						matadatePool:this.fsform.matadatePool,
						dataPools:this.fsform.dataPools,
						fsIP:this.fsform.fsIP,
						fsPort:this.fsform.fsPort,
						privateKey:this.fsform.privateKey,
						// privateKey:'this.fsform.privateKey',
						configFile:this.fsform.configFile,
						// configFile:'this.fsform.configFile',
						storage:this.fsform.storage,
					}
					
					config.submitFS(data).then(function(result){
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
		handleChangeKey(file,fileList){
			let readerKey = new FileReader()
			readerKey.readAsBinaryString(file.raw)
			readerKey.addEventListener('loadend',()=>{
				if (readerKey.readyState == 2) {
					// 读取完毕标志位
					this.privateKeyDone = true 
					this.fsform.privateKey = readerKey.result
				}
			})
			
		},
		handleChangeConfig(file,fileList){
			let readerConfig = new FileReader()
			readerConfig.readAsBinaryString(file.raw)
			readerConfig.addEventListener('loadend',()=>{
				if (readerConfig.readyState == 2) {
					// 读取完毕标志位
					this.configFileDone = true
					this.fsform.configFile = readerConfig.result
				}
			})
			
		}
	}
}
</script>