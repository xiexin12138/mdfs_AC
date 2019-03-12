<template>
<el-container class='fullScreen'>
  <el-header style="background-color:#f9fafc;">
    <h1 id="head">
      <el-breadcrumb separator="/">概览</el-breadcrumb>
    </h1>
  </el-header>
  <el-main id="main">
    <el-row class="monitor_row">
      <el-card class="box-card mdfs_state_monitor">
        <div slot="header" class="clearfix">
          <span>MDFS状态监控</span>
        </div>
        <el-row class="mdfs_monitor_row">
          <el-col :span="18" class="mdfs_state_col">
            <div class="text item">
              <el-row>
                <el-col :span="8">
                  <el-card shadow="hover">
                    鼠标悬浮时显示
                  </el-card>
                </el-col>
                <el-col :span="8">
                  <el-card shadow="never">
                    鼠标悬浮时显示
                  </el-card>
                </el-col>
                <el-col :span="8">
                  <el-card :shadow="hover">
                    鼠标悬浮时显示
                  </el-card>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="6" class="mdfs_speed_col">
            <div class="text item">
              <el-row>
                <div class="up_rate">
                  上行速率
                  <div id="up_rate_chart"></div>
                </div>
              </el-row>
              <el-row>
                <div class="down_rate">
                  下行速率
                  <div id="down_rate_chart"></div>
                </div>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-row>
    <el-row class="monitor_row">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>底层文件系统状态监控</span>
        </div>
        <div class="text item">
          底层文件系统状态监控底层文件系统状态监控底层文件系统状态监控底层文件系统状态监控底层文件系统状态监控<br />
          底层文件系统状态监控底层文件系统状态监控底层文件系统状态监控底层文件系统状态监控底层文件系统状态监控<br />
          底层文件系统状态监控底层文件系统状态监控底层文件系统状态监控底层文件系统状态监控底层文件系统状态监控<br />
          底层文件系统状态监控底层文件系统状态监控底层文件系统状态监控底层文件系统状态监控底层文件系统状态监控<br />
          底层文件系统状态监控底层文件系统状态监控底层文件系统状态监控底层文件系统状态监控底层文件系统状态监控<br />
          底层文件系统状态监控底层文件系统状态监控底层文件系统状态监控底层文件系统状态监控底层文件系统状态监控<br />
          底层文件系统状态监控底层文件系统状态监控底层文件系统状态监控底层文件系统状态监控底层文件系统状态监控<br />
        </div>
      </el-card>
    </el-row>
  </el-main>
  <foot></foot>
</el-container>
</template>

<script>
import {
  Message,
  Loading,
  Card,
} from 'element-ui'
import {
  mapState
} from 'vuex'
import Foot from '@/components/common/Foot'

export default {
  components: {
    Foot
  },
  /*computed: {
    isInSummary() {
      return this.$store.getters.getInSummary
    }
  },*/
  data() {
    return {
      hover: 'hover'
    }
  },
  mounted: async function() {
      this.updateSummary()
    },
    methods: {
      async updateSummary() {
        await this.$store.dispatch('getsummary', {}).catch((e) => {
          if (this.$store.getters.getInSummary) {
            Message({
              showClose: true,
              /*message: "获取异常：" + e.toString(),*/
              message: "系统信息获取异常",
              type: 'error',
              duration: 2000
            });
          }
        });
        /*console.log("【this.$store.getters.getInSummary】" + this.$store.getters.getInSummary);*/
        /*console.log("【this.isInSummary】" + this.isInSummary);*/
        // 递归调度，自动从后台获取overview对象，用于更新数据
        if (this.$store.getters.getInSummary) {
          setTimeout(this.updateSummary, 2000);
        }
      }
    },
    watch: {
      isInSummary: function() {
        if (this.$store.getters.getInSummary == true) {
          this.updateSummary()
        }
      }
    }
}
</script>
<style>
#main {
  background-color: #f9fafc;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.monitor_row {
  height: 370px;
  margin: 0 10px 10px 10px;
}

.box-card {
  height: 100%;
  min-height: 350px
}

.mdfs_state_monitor {}

.mdfs_monitor_row {
  height: 270px
}

.mdfs_speed_col {
  height: 270px
}

.mdfs_state_col {
  height: 270px
}

.up_rate {
  border: 1px dashed #000;
  margin: 10px 10px 5px 10px;
  height: 120px;
  min-width: 160px;
}

.down_rate {
  border: 1px dashed #000;
  margin: 5px 10px 10px 10px;
  height: 120px;
  min-width: 160px;
}
</style>
