<template>
<el-row type="flex" justify="center">
  <el-col style="width:500px;margin-top:100px">
    <el-form status-icon label-width="140px">
      <el-form-item label="启用自动锁定" v-model="form">
        <el-switch v-model="form.autolock" active-color="#13ce66" inactive-color="#ff4949">
        </el-switch>
      </el-form-item>
      <el-form-item label="自动锁定时间">
        <el-input-number v-model="form.locktime" controls-position="right" :min="1" :max="99999" size="small" style="width:105px;"></el-input-number>
        分钟无操作自动锁定<br />(锁定后需要重新输入当前用户密码才能进入管理控制台)
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveLockSetting(form)">保存</el-button>
      </el-form-item>
    </el-form>
  </el-col>
</el-row>
</template>

<script>
import Vue from 'vue'
import Bar from '@/components/common/Bar'
import Foot from '@/components/common/Foot'
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
    Bar,
    Foot
  },
  data() {
    return {
      form: {
        autolock: false,
        locktime: 5,
      }
    }
  },
  computed: {
    getlocktime() {
      return this.$store.getters.getLocktime
    },
    getLockstatus() {
      return this.$store.getters.getLockstatus
    }
  },
  mounted: async function() {
    this.form.locktime = this.getlocktime
    this.form.autolock = this.getLockstatus
    /*await this.$store.dispatch('getlockstate', {
      username: this.$store.getters.getUserName
    }).catch((e)=>{
      Message({
          showClose: true,
          message: e.toString(),
          type: 'error',
          duration: 2000
        })
    })
    await this.$store.dispatch('getlocktime', {
      username: this.$store.getters.getUserName
    }).catch((e)=>{
      Message({
          showClose: true,
          message: e.toString(),
          type: 'error',
          duration: 2000
        })
    })*/
  },
  watch: {
    autolock: function(autolock) {
      this.$store.commit('UPDATE_LOCK_STATE', this.autolock)
    }
  },
  methods: {
    async saveLockSetting(form) {
      await this.$store.dispatch('updateLockStateAndTime', {
        username: this.$store.getters.getUserName,
        lockstatus: form.autolock,
        locktime: form.locktime
      }).then(() => {
        Message({
          showClose: true,
          message: '修改成功',
          type: 'success',
          duration: 2000
        })
      }).catch((e)=>{
        Message({
            showClose: true,
            message: e.toString(),
            type: 'error',
            duration: 2000
          })
      })
    }
  }
}
</script>
