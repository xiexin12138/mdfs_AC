<template>
	<div>
  		<el-row type="flex" justify="center">
  		<el-col style="width:500px;">
		<div style="margin:20px 0;">
			<el-form status-icon label-width="140px" ref="downloadInfoForm" :model="downloadInfoForm" :rules="newrule">
				<el-form-item label="异常文件原名称" prop="fsName" >
					<el-input size="small" v-model="downloadInfoForm.fsName" disabled></el-input>
				</el-form-item>

				<el-form-item label="本地IP地址" prop="host" >
					<el-input size="small" v-model="downloadInfoForm.host"></el-input>
				</el-form-item>
                
                <el-form-item label="下载至本地时：" ></el-form-item>
     
					<el-form-item label="将异常文件命名为" prop="newName" >
						<el-input size="small" v-model="downloadInfoForm.newName"></el-input>
					</el-form-item>
					<el-form-item label="异常文件保存路径" prop="desPath" >
						<el-input size="small" v-model="downloadInfoForm.desPath" placeholder="请输入在SFTP服务器的根目录下的路径"></el-input>
					</el-form-item>



            <div class="btn_grap">
				<el-form-item >
					<el-button type="primary" @click="submitForm('downloadInfoForm')">提交</el-button>
					<el-button @click="resetForm('downloadInfoForm')">重置</el-button>
					<el-button @click="back">返回</el-button>
				</el-form-item>
			</div>
			</el-form>
		</div>
		</el-col>
		</el-row>
	</div>
</template>

<script>

import Vue from 'vue'
import {
	Button,
	Input,
	Form,
	FormItem,
	Message,
	Row,
	Col,
} from 'element-ui'
import * as errorFile from '../../api/errorFile'


Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Row)
Vue.use(Col)
export default {
	data() {
		let targetFile= this.$route.params.download_info
		// var arr = target.split(',')
		// let targetFile = arr[0]
		// let targetHost = arr[1]
		console.log(targetFile)

		return {
			targetFile:targetFile,

			downloadInfoForm: {

				host:'',
				fsName:targetFile,
				newName:targetFile,
				desPath:'',
			},

			newrule: {
				desPath:[
					{ required:true, message:'请输入相对于SFTP服务器根目录的相对路径', trigger:'blur'}
				],
				newName:[
					{ required:true, message:'请输入异常文件在本地的保存名称', trigger:'blur'}
				],
				host:[
					{ required:true, message:'请输入本机IP地址', trigger:'blur'}
				],
			}
		}
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					let data = {
						host:this.downloadInfoForm.host,
						fsName:this.downloadInfoForm.fsName,
						newName:this.downloadInfoForm.newName,
						desPath:this.downloadInfoForm.desPath,
					}
					// console.log(data)
					errorFile
						.DownloadErrorFile(data)
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

			this.downloadInfoForm.host = '',
			this.downloadInfoForm.fsName = this.targetFile,
			this.downloadInfoForm.newName = this.targetFile,
			this.downloadInfoForm.desPath = ''
		},

	    back() {
         this.$router.push({ path: '/auth/errorfilemanage'})

		}
	}
}
</script>

<style>

	.btn_grap{
		display: block;
		margin-left: 7%;
	}
</style>

