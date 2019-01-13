<template>
<el-row type="flex" justify="center">
  <el-col style="width:500px;margin-top:100px">
    <el-form :model="changepswform" ref="changepswform" status-icon label-width="140px" :rules="formrule">
      <el-form-item label="旧密码" prop="oldpsw">
        <el-input size="small" v-model="changepswform.oldpsw" type="password"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newpsw">
        <el-input size="small" v-model="changepswform.newpsw" type="password"></el-input>
      </el-form-item>
      <el-form-item label="重复新密码" prop="repeatnewpsw">
        <el-input size="small" v-model="changepswform.repeatnewpsw" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('changepswform')">提交</el-button>
        <el-button @click="resetForm('changepswform')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-col>
</el-row>
</template>

<script>
import Vue from 'vue'
import Bar from '@/components/common/Bar'
import Foot from '@/components/common/Foot'
import * as consoleConfig from '../../api/consoleConfig'
import {Message} from 'element-ui'
export default {
  components: {
    Bar,
    Foot
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (value.length < 10 || value.length > 20) {
        callback(new Error('新密码长度必须介于10到20之间'));
      } else if (this.changepswform.newpsw === this.changepswform.oldpsw) {
        callback(new Error('新密码必须与原密码不同'));
      } else {
        if (this.changepswform.repeatnewpsw !== '') {
          this.$refs.changepswform.validateField('repeatnewpsw');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.changepswform.newpsw) {
        callback(new Error('两次输入密码不一致!'));
      } else if (value.length < 10 || value.length > 20) {
        callback(new Error('新密码长度必须介于10到20之间'));
      } else if (this.changepswform.repeatnewpsw === this.changepswform.oldpsw) {
        callback(new Error('新密码必须与原密码不同'));
      } else {
        callback();
      }
    };
    return {
      changepswform: {
        oldpsw: null,
        newpsw: null,
        repeatnewpsw: null
      },
      formrule: {
        oldpsw: [{
          required: true,
          message: '请输入旧密码',
          trigger: 'blur'
        }],
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
            oldpsw: this.changepswform.oldpsw,
            newpsw: this.changepswform.newpsw,
            username: this.$store.getters.getUserName,
          }
          consoleConfig.ChangeCurUserPwd(data).then(() => {
            Message({
              showClose: true,
              message: '修改成功，新密码将在下次登录生效',
              type: 'success',
              duration: 5000
            })
          }).catch(e => {
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
