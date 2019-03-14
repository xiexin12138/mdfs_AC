<template>
<el-container class='fullScreen'>
  <el-header style="background-color:#f9fafc;">
    <h1 id="head">
      <el-breadcrumb separator="/">概览</el-breadcrumb>
    </h1>
  </el-header>
  <el-main id="main">
    <el-row class="monitor_row">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span><strong>MDFS状态监控</strong></span>
        </div>
        <el-row class="mdfs_monitor_row">
          <el-col :span="6" class="mdfs_left_col">
            <el-row class="mycard text item card_beauty">
              <el-col :span="12">
                MDFS运行状态
              </el-col>
              <el-col :span="12">
                <div v-if='mdfsState' style="color:green;
              display: flex;
              align-items: center;
              justify-content: center;">
                  <i class="el-icon-check"></i>
                  <strong>正常</strong>
                </div>
                <div v-else style="color:red;
              display: flex;
              align-items: center;
              justify-content: center;">
                  <i class="el-icon-close"></i>
                  异常
                </div>
              </el-col>
            </el-row>
            <el-row class="mdfs_state_panl card_beauty">
              MDFS总容量
              <el-row style="height:25px;font-size:30px;font-family:'微软雅黑';margin-top:10px;
              display: flex;
              align-items: center;
              justify-content: center;">192000G</el-row>
            </el-row>
            <el-row class="card_beauty mdfs_state_panl">
              MDFS可用容量
              <el-row style="height:25px;font-size:30px;font-family:'微软雅黑';margin-top:10px;
              display: flex;
              align-items: center;
              justify-content: center;">192000G</el-row>
            </el-row>
          </el-col>
          <el-col :span="18" class="mdfs_rigth_col text">
            <el-row class="mycard card_beauty">当前MDFS挂载路径：<strong>/media/mdfs</strong></el-row>
            <el-row>
              <div class="text item">
                <el-row>
                  <el-col :span="12">
                    <div id="upRateChart" style="height:200px">
                      1
                    </div>
                  </el-col>
                  <el-col :span="12">123</el-col>
                </el-row>
              </div>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
    </el-row>
    <el-row class="monitor_row">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span><strong>底层文件系统状态监控</strong></span>
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
import echarts from 'echarts'
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
      hover: 'hover',
      mdfsState: true,
    }
  },
  mounted() {
    // this.updateSummary()
    this.drawLine()
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
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('upRateChart'))
      console.log("myChart:" + myChart);
      // 绘制图表
      myChart.setOption({
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
        }]
      });
      myChart.resize
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
  min-height: 360px;
  margin: 10px;
}

.box-card {
  height: 100%;
  min-height: 360px
}

.mdfs_state_monitor {}

.mdfs_monitor_row {
  height: 254px
}

.mdfs_left_col {
  height: 254px
}

.mdfs_rigth_col {
  height: 254px
}

.mycard {
  height: 60px;
  border-radius: 5px;
  margin: 5px;
  padding: 20px;
}

.mdfs_state_panl {
  margin: 5px;
  padding: 20px;
  height: 90;
}

.card_beauty {
  border: 1px solid #DDDDDD;
  border-radius: 5px;
  transition: background-color 0.4s, border 0.4s;
}

.card_beauty:hover {
  border: 1px solid #00C1DE;
  border-radius: 5px;
  background-color: #f9fafc;
}
</style>
