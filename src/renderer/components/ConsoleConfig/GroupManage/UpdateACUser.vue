<template>
<div>
  <el-row type="flex" class="row-bg" justify="center">
    <el-col style="width:1700px;">
      <div>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="font-size:18px;">AC用户信息</span>
          </div>
          <el-row :gutter="15">
            <el-col :span="6" :offset="2">
              <div style="text-align:right;">用户id&nbsp;:</div>
            </el-col>
            <el-col :span="8">
              <div>{{user.id}}</div>
            </el-col>
          </el-row>
          <el-row :gutter="15">
            <el-col :span="6" :offset="2">
              <div style="text-align:right;">用户名&nbsp;:</div>
            </el-col>
            <el-col :span="8">
              <div>{{user.name}}</div>
            </el-col>
          </el-row>
          <el-row :gutter="15">
            <el-col :span="6" :offset="2">
              <div style="text-align:right;">用户组&nbsp;:</div>
            </el-col>
            <el-col :span="8">
              <div>{{user.loginUserType}}</div>
            </el-col>
          </el-row>
          <el-row :gutter="15">
            <el-col :span="6" :offset="2">
              <div style="text-align:right;">密&ensp;&ensp;码&nbsp;:</div>
            </el-col>
            <el-col :span="8">
              <div>***********</div>
            </el-col>
          </el-row>
          <el-row :gutter="3">
            <el-col :span="3" :offset="9">
              <el-button size="small" type="primary" @click="pswFormVisible = true">修改密码&nbsp;</el-button>
            </el-col>
            <el-col :span="3" :pull="1">
              <el-button size="small" type="primary" @click="groupFormVisible = true">修改用户组</el-button>
            </el-col>
          </el-row>
        </el-card>

      </div>
    </el-col>
  </el-row>

  <el-dialog title="修改密码" :visible.sync="pswFormVisible">
    <el-form :model="pswFrom" ref="pswFrom" :rules="changepswformrule">
      <!--<el-form-item label="新密码" :label-width="formLabelWidth" prop="newEmail" :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
    ]">
        <el-input v-model="pswFrom.newEmail" auto-complete="off"></el-input>
      </el-form-item>-->
      <el-form-item label="新密码" prop="newpsw" :label-width="formLabelWidth">
        <el-input size="small" v-model="pswFrom.newpsw" type="password"></el-input>
      </el-form-item>
      <el-form-item label="重复新密码" prop="repeatnewpsw" :label-width="formLabelWidth">
        <el-input size="small" v-model="pswFrom.repeatnewpsw" type="password"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="pswFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitPSw">确 定</el-button>
    </div>
  </el-dialog>

  <el-dialog title="修改用户组" :visible.sync="groupFormVisible">
    <el-form :model="groupForm" ref="groupForm">
      <el-form-item label="用户组" :label-width="formLabelWidth" prop="usertypes" :rules="[{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'}]">
        <el-select v-model="groupForm.usertypes" placeholder="请选择用户组">
          <el-option v-for="item in usergroup" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        </el-date-picker>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="groupFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitGroup">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

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
import * as acUserTable from '@/api/acUserTable'
import global_ from '@/utils/Global'

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
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (value.length < 10 || value.length > 20) {
        callback(new Error('新密码长度必须介于10到20之间'));
      } else {
        if (this.pswFrom.repeatnewpsw !== '') {
          this.$refs.pswFrom.validateField('repeatnewpsw');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.pswFrom.newpsw) {
        callback(new Error('两次输入密码不一致!'));
      } else if (value.length < 10 || value.length > 20) {
        callback(new Error('新密码长度必须介于10到20之间'));
      } else {
        callback();
      }
    };
    let targetID = this.$route.params.id
    let userData = this.$store.getters.getAcDataTable.find(value => {
      return value.id == targetID
    })
    if (userData.loginUserType == 1) {
      userData.loginUserType = '管理员组'
    } else {
      userData.loginUserType = '监控用户组'
    }
    return {
      pswFormVisible: false,
      groupFormVisible: false,
      clientFormVisible: false,
      formLabelWidth: '120px',
      usergroup: [{
        value: '1',
        label: '管理员组'
      }, {
        value: '2',
        label: '监控组'
      }],
      user: {
        id: userData.id,
        name: userData.name,
        loginUserType: userData.loginUserType
      },
      groupForm: {
        usertypes: ''
      },
      pswFrom: {
        newpsw: '',
        repeatnewpsw: ''
      },
      changepswformrule: {
        newpsw: [{
          required: true,
          trigger: 'blur',
          validator: validatePass
        }],
        repeatnewpsw: [{
          required: true,
          trigger: 'blur',
          validator: validatePass2
        }],
      }
    }
  },
  methods: {
    submitPSw() {
      this.$refs["pswFrom"].validate((valid) => {
        let curpasswd = ''
        let curUserType = ''
        let targetID = this.$route.params.id
        let userData = this.$store.getters.getAcDataTable.find(value => {
          return value.id == targetID
        })
        if(this.pswFrom.newpsw != '' || this.pswFrom.newpsw != undefined){
          curpasswd = this.pswFrom.newpsw
        }
        if(userData.loginUserType == '管理员组'){
          curUserType = 1
        } else if (userData.loginUserType == '监控用户组'){
          curUserType = 2
        } else {
          curUserType = this.userData.loginUserType
        }
        if (valid) {
          let data = {
            userName : this.$store.getters.getUserName,
          	id:  this.user.id,
          	name:	userData.name,
          	passwd : curpasswd,
          	loginUserType :	curUserType
          }

          acUserTable.UpdateAcUser(data).then(() => {
            this.user.loginUserType = curUserType
            Message({
              showClose: true,
              message: '修改成功',
              type: 'success',
              duration: 2000
            })
            this.$router.push({
              path: global_.CONSOLE_CONFIG.groupmanage
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
        this.emailFormVisible = false
      })
    },
    submitGroup() {
      this.$refs["groupForm"].validate((valid) => {
        let curpasswd = ''
        let curUserType =''
        let targetID = this.$route.params.id
        let userData = this.$store.getters.getAcDataTable.find(value => {
          return value.id == targetID
        })
        if(this.pswFrom.newpsw != '' || this.pswFrom.newpsw != undefined){
          curpasswd = this.pswFrom.newpsw
        }
        if(userData.loginUserType == '管理员组'){
          curUserType = 1
        } else if (userData.loginUserType == '监控用户组'){
          curUserType = 2
        } else {
          curUserType = this.userData.loginUserType
        }
        if (valid) {
          let data = {
            userName : this.$store.getters.getUserName,
          	id:  this.user.id,
          	name:	userData.name,
          	passwd : this.groupForm.usertypes,
          	loginUserType :	curUserType
          }
          acUserTable.UpdateAcUser(data).then(() => {
            this.user.loginUserType = this.groupForm.usertypes
            Message({
              showClose: true,
              message: '修改成功',
              type: 'success',
              duration: 2000
            })
            this.$router.push({
              path: global_.CONSOLE_CONFIG.groupmanage
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
        this.groupFormVisible = false
      })
    }
  }
}
</script>
