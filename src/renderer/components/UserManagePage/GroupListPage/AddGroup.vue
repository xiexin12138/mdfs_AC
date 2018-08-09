<template>
	<div>
  		<el-row type="flex" justify="center">
  		<el-col style="width:500px;">
		<div style="margin:20px 0;">
			<el-form status-icon label-width="120px" ref="groupform" :model="groupform" :rules="newrule">



				<el-form-item label="组群名称" prop="groupName" >
					<el-input size="small"  v-model="groupform.groupName"></el-input>
				</el-form-item>




				<div class="btn_grap">
				<el-form-item  >
					<el-button type="primary" @click="submitForm('groupform')">提交</el-button>
					<el-button @click="resetForm('groupform')">重置</el-button>
				</el-form-item>
			</div>
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
	Row,
	Col,


} from 'element-ui'
import * as authGroup from '../../../api/authGroup'

Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Row)
Vue.use(Col)



export default {
	data() {
		return {
		
			groupform: {
		        type: " group_add ",
				groupName:'',				
			},


			newrule: {

				groupName:[
					{ required:true, message:'请输入组群名称', trigger:'blur'}
				],

			}
		}
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					let data = {
						groupName: this.groupform.groupName,
					}
					// TODO 逻辑处理，根据返回结果做出相应提示再跳转
					authGroup
						.submitGroup(data)
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
			


		},

	}


}

</script>

<style>

	.btn_grap{
		display: block;
		margin-left: 20%;
	}
</style>
