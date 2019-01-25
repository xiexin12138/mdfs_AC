<template>
<el-row type="flex" justify="center">
  <el-col style="width:500px;margin-top:100px">
    <el-form status-icon label-width="140px">
      <el-form-item label="启用自动锁定">
        <el-switch v-model="autolock" active-color="#13ce66" inactive-color="#ff4949">
        </el-switch>
      </el-form-item>
      <el-form-item label="自动锁定时间">
        <el-input-number v-model="locktime" controls-position="right" :min="1" :max="99999" size="small" style="width:105px;"></el-input-number>
        分钟无操作自动锁定<br />(锁定后需要重新输入当前用户密码才能进入管理控制台)
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveLockSetting()">保存</el-button>
      </el-form-item>
    </el-form>
  </el-col>
</el-row>
</template>

<script>
import Vue from 'vue'
import Bar from '@/components/common/Bar'
import Foot from '@/components/common/Foot'

export default {
  components: {
    Bar,
    Foot
  },
  data() {
    return {
      autolock: false,
      locktime: 5,
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
  mounted: function() {
    this.locktime = this.getlocktime
    this.autolock = this.getLockstatus
  },
  watch: {
    autolock: function(autolock) {
      this.$store.commit('UPDATE_LOCK_STATE', this.autolock)
    }
  },
  methods: {
    saveLockSetting() {
      this.$store.commit('UPDATE_LOCK_STATE', this.autolock)
      this.$store.commit('UPDATE_LOCK_TIME', this.locktime)
    }
  }
}
</script>
