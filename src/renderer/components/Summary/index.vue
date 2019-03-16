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
                MDFS状态
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
            <el-row class="text item">
              <el-col :span="12">
                <div id="upRateChart" class="rate_panl card_beauty">
                  upRateChart
                </div>
              </el-col>
              <el-col :span="12">
                <div id="downRateChart" class="rate_panl card_beauty">
                  downRateChart
                </div>
              </el-col>
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
        <el-row id="fstable_row">
          <el-table :data="bottomfsDataTable" height="250" border style="width: 100%">
            <el-table-column prop="bottomfsid" label="文件系统id" width="100">
            </el-table-column>
            <el-table-column prop="bottomfsStorage" label="存储容量">
            </el-table-column>
            <el-table-column prop="bottomfsAvailable" label="可用容量">
            </el-table-column>
            <el-table-column prop="bottomfsType" label="文件系统类型">
            </el-table-column>
            <el-table-column prop="bottomfsMntPath" label="挂载路径">
            </el-table-column>
            <el-table-column prop="bottomfsStatus" label="运行状态">
            </el-table-column>
          </el-table>
        </el-row>
        <el-row style="text-align:center">
          <div style="margin:5px">
            <el-button plain v-if="!openTable" size="mini" @click="changeTabelHeigth()"><i class="el-icon-caret-bottom"></i>展开表格</el-button>
            <el-button plain v-else size="mini" @click="changeTabelHeigth()"><i class="el-icon-caret-top"></i>收回表格</el-button>
          </div>
          <el-pagination background layout="prev, pager, next" :total="1000">
          </el-pagination>
        </el-row>
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
  computed: {
    isInSummary() {
      return this.$store.getters.getInSummary
    },
    getMDFSData() {
      return this.$store.getters.getMDFSData
    }
  },
  data() {
    return {
      hover: 'hover',
      mdfsState: true,
      bottomfsDataTable: [{
          bottomfsid: 1,
          bottomfsStorage: 28.419002532958984,
          bottomfsAvailable: 12.22768783569336,
          bottomfsType: "ext4",
          bottomfsMntPath: "/mnt/fs1",
          bottomfsStatus: "true"
        },
        {
          bottomfsid: 2,
          bottomfsStorage: 28.419002532958984,
          bottomfsAvailable: 12.22768783569336,
          bottomfsType: "ext4",
          bottomfsMntPath: "/mnt/fs2",
          bottomfsStatus: "false"
        },
        {
          bottomfsid: 3,
          bottomfsStorage: 28.419002532958984,
          bottomfsAvailable: 12.22768783569336,
          bottomfsType: "ext3",
          bottomfsMntPath: "/mnt/fs3",
          bottomfsStatus: "true"
        },
        {
          bottomfsid: 4,
          bottomfsStorage: 28.419002532958984,
          bottomfsAvailable: 12.22768783569336,
          bottomfsType: "ext3",
          bottomfsMntPath: "/mnt/fs4",
          bottomfsStatus: "false"
        },
        {
          bottomfsid: 5,
          bottomfsStorage: 28.419002532958984,
          bottomfsAvailable: 12.22768783569336,
          bottomfsType: "ext4",
          bottomfsMntPath: "/mnt/fs5",
          bottomfsStatus: "true"
        },
        {
          bottomfsid: 6,
          bottomfsStorage: 28.419002532958984,
          bottomfsAvailable: 12.22768783569336,
          bottomfsType: "ext4",
          bottomfsMntPath: "/mnt/fs6",
          bottomfsStatus: "false"
        },
        {
          bottomfsid: 7,
          bottomfsStorage: 28.419002532958984,
          bottomfsAvailable: 12.22768783569336,
          bottomfsType: "ext3",
          bottomfsMntPath: "/mnt/fs7",
          bottomfsStatus: "true"
        },
        {
          bottomfsid: 8,
          bottomfsStorage: 28.419002532958984,
          bottomfsAvailable: 12.22768783569336,
          bottomfsType: "ext3",
          bottomfsMntPath: "/mnt/fs8",
          bottomfsStatus: "false"
        },
        {
          bottomfsid: 9,
          bottomfsStorage: 28.419002532958984,
          bottomfsAvailable: 12.22768783569336,
          bottomfsType: "ext3",
          bottomfsMntPath: "/mnt/fs9",
          bottomfsStatus: "true"
        },
        {
          bottomfsid: 10,
          bottomfsStorage: 28.419002532958984,
          bottomfsAvailable: 12.22768783569336,
          bottomfsType: "ext3",
          bottomfsMntPath: "/mnt/fs10",
          bottomfsStatus: "false"
        }
      ],
      openTable: false,
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
      let upRateChart = echarts.init(document.getElementById('upRateChart'))
      let downRateChart = echarts.init(document.getElementById('downRateChart'))
      // 绘制图表
      upRateChart.setOption({
        title: {
          text: '当前上行速率：1.75M/s',
          textStyle: {
            fontSize: 17,
            fontWeight: "normal",
            fontFamily: "Microsoft YaHei"
          },
          left: 'left'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          },
          formatter: function(params, ticket, callback) {
            let a = params[0].value
            if (a > 1024) {
              a = (a / 1024).toFixed(2)
              a = a + ' M/s'
            } else {
              a = a + ' k/s'
            }
            return a;
          }
        },
        grid: {
          x: "5%",
          y: "20%",
          x2: "5%",
          y2: "10%",
          borderWidth: 1
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisTick: {
            show: false
          },
          data: ['', '', '', '', '', '', '', '', '', '']
        },
        yAxis: {
          type: 'value',
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        series: [{
          type: 'line',
          data: [820, 934, 2750, 1330, 932, 901, 934, 1290, 1330, 1320],
          areaStyle: {}
        }]
      });
      downRateChart.setOption({
        title: {
          text: '当前下行速率：10.2M/s',
          textStyle: {
            fontSize: 17,
            fontWeight: "normal",
            fontFamily: "Microsoft YaHei"
          },
          left: 'left'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          },
          formatter: function(params, ticket, callback) {
            let a = params[0].value
            if (a > 1024) {
              a = (a / 1024).toFixed(2)
              a = a + ' M/s'
            } else {
              a = a + ' k/s'
            }
            return a;
          }
        },
        grid: {
          x: "5%",
          y: "20%",
          x2: "5%",
          y2: "10%",
          borderWidth: 1
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisTick: {
            show: false
          },
          data: ['', '', '', '', '', '', '', '', '', '']
        },
        yAxis: {
          type: 'value',
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        series: [{
          type: 'line',
          data: [934, 1290, 1330, 1320, 820, 932, 901, 934, 1290, 1330],
          areaStyle: {
            color: '#AED4C2'
          },
          lineStyle: {
            color: '#91C7AE'
          },
          itemStyle: {
            color: '#91C7AE'
          }
        }]
      });
      upRateChart.resize
      downRateChart.resize
    },
    changeTabelHeigth() {
      this.openTable = !this.openTable
      let panl = document.getElementById("fstable_row")
      let table = (document.getElementsByClassName('el-table'))[0]
      if (this.openTable) {
        panl.style.height = "515px"
        table.style.height = "515px"
      } else {
        panl.style.height = "250px"
        table.style.height = "250px"
      }
    },
  },
  watch: {
    isInSummary: function() {
      if (this.$store.getters.getInSummary == true) {
        this.updateSummary()
      }
    },
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


.rate_panl {
  margin: 0 5px 0 5px;
  height: 200px
}
</style>
