<template>
  <el-row type="flex" justify="center">
    <el-col style="width:500px;">
      <div style="margin:20px 0;">
        <el-form status-icon label-width="120px" ref="certform" :model="certform" :rules="newrule">

          <el-form-item label="证书有效期" prop="expire">
            <div class="block">
              <el-date-picker size="small" v-model="certform.expire" type="datetime" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker>
            </div>
            <!-- <el-input size="small" v-model="certform.expire"></el-input> -->
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('certform')">提交</el-button>
            <el-button @click="resetForm('certform')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </el-row>
</template>
<style>
/* 下面的代码是为了搞定时间选择器的显示问题*/
.el-time-spinner.has-seconds .el-time-spinner__wrapper:nth-child(2) {
  margin-left: 0;
}
</style>
<script>
/**
 * 这个文件是全局证书配置页面
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
      certform: {
        expire: ''
      },
      newrule: {
        expire: [{
          required: true,
          message: '请选择日期',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
            expire: this.certform.expire
          }
          // TODO 逻辑处理，根据返回结果做出相应提示再跳转
          config.submitCertExpire(data).then(function(result) {
            if (result == true) {
              Message({
                showClose: true,
                message: '提交成功',
                type: 'success',
                duration: 2000
              })
            }
          }).catch((e) => {
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
      this.$refs[formName].resetFields()
    }
  }
}
</script>
