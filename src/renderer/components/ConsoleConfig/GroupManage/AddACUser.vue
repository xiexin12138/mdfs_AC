<template>
<div>
  <el-row type="flex" justify="center">
    <el-col style="width:500px;">
      <div style="margin:20px 0;">
        <el-form status-icon label-width="150px" ref="newacuserform" :model="newacuserform" :rules="newuserrule">
          <el-form-item label="用户名" prop="username">
            <el-input size="small" v-model="newacuserform.username"></el-input>
          </el-form-item>
          <el-form-item label="请输入用户密码" prop="password">
            <el-input type="password" size="small" v-model="newacuserform.password"></el-input>
          </el-form-item>
          <el-form-item label="请确认用户密码" prop="repeatpassword">
            <el-input type="password" size="small" v-model="newacuserform.repeatpassword"></el-input>
          </el-form-item>
          <el-form-item label="选择用户组" prop="usertypes">
            <el-select v-model="newacuserform.usertypes" placeholder="请选择用户组">
              <el-option v-for="item in usergroup" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('newacuserform')">提交</el-button>
            <el-button @click="resetForm('newacuserform')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </el-row>
</div>
</template>
<script>
/**
 * 新增用户的界面
 */
import Bar from '@/components/common/Bar'
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
import * as acUserTable from '../../../api/acUserTable'
import global_ from '@/utils/Global'

Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(DatePicker)
Vue.use(Row)
Vue.use(Col)
export default {
  components: {
    Bar
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (value.length < 10 || value.length > 20) {
        callback(new Error('新密码长度必须介于10到20之间'));
      } else {
        if (this.newacuserform.repeatpassword !== '') {
          this.$refs.newacuserform.validateField('repeatpassword');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.newacuserform.password) {
        callback(new Error('两次输入密码不一致!'));
      } else if (value.length < 10 || value.length > 20) {
        callback(new Error('新密码长度必须介于10到20之间'));
      } else {
        callback();
      }
    };
    return {
      newacuserform: {
        username: '',
        password: '',
        repeatpassword: '',
        usertypes: ''
      },
      newuserrule: {
        username: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          },
          // { min:6, max:20, message:'长度在6到20个字符', trigger:'blur'}
        ],
        password: [{
          required: true,
          trigger: 'blur',
          validator: validatePass
        }],
        repeatpassword: [{
          required: true,
          trigger: 'blur',
          validator: validatePass2
        }],
        usertypes: [{
          required: true, message: '请选择用户组', trigger: 'blur'
        }]
      },
      usergroup: [{
        value: '1',
        label: '管理员组'
      }, {
        value: '2',
        label: '监控组'
      }],
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
            username: this.newacuserform.username,
            password: this.newacuserform.password,
            repeatpassword: this.newacuserform.repeatpassword,
            usertypes: this.newacuserform.usertypes
          }
          // TODO 逻辑处理，根据返回结果做出相应提示再跳转
          acUserTable.AddUser(data).then(() => {
            Message({
              showClose: true,
              message: '提交成功',
              type: 'success',
              duration: 2000
            })
            this.$router.push({
              path: global_.CONSOLE_CONFIG.consolepermission
            })
          }).catch((e) => {
            Message({
              showClose: true,
              message: e.message,
              type: 'error',
              duration: 2000
            })
            if (e.message == "Error: 您已在另一地点登录，请重新登录！") {
              this.$router.push({
                path: global_.LOGIN_PAGE
              })
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
