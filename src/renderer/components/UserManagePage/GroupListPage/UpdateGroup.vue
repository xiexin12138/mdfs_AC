<template>
	<div>
  		<el-row type="flex" justify="center">
  		<el-col style="width:500px;">
		<div style="margin:20px 0;">
			<el-form status-icon label-width="120px" ref="changegroupform" :model="changegroupform" :rules="newrule">
				<el-form-item label="组群id" prop="id" >
					<el-input size="small" v-model="changegroupform.id" disabled></el-input>
				</el-form-item>
				<el-form-item label="组群名称" prop="groupName" >
					<el-input size="small" v-model="changegroupform.groupName"></el-input>
				</el-form-item>

            <div class="btn_grap">
				<el-form-item >
					<el-button type="primary" @click="submitForm('changegroupform')">提交</el-button>
					<el-button @click="resetForm('changegroupform')">重置</el-button>
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
	Col
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
		let targetID = this.$route.params.id
		console.log(targetID)
	    // let group = this.$store.getters.getGroups.find(value=> value.id == targetID)
	    // console.log(group)
		return {
			changegroupform: {
				// id: group.id,
				// groupName: group.groupName,

				id:'4',
				groupName:'hh'
			},
			// group:group,
			newrule: {
				id:[
					{ required:true, message:'请输入组群id', trigger:'blur'}
				],
				// groupName:[
				// 	{ required:true, message:'请输入新的组群名称', trigger:'blur'}
				// ],

			}
		}
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					let data = {
						id: this.changegroupform.id,
						groupName: this.changegroupform.groupName,
					}
					authGroup
						.UpdateGroup(data)
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
			this.changegroupform.id = this.group.id
			this.changegroupform.groupName = this.group.groupName
		}
	}
}
</script>

<style>

	.btn_grap{
		display: block;
		margin-left: 20%;
	}
</style>

