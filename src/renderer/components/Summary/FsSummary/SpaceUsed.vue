<template>
<div class="spaceUseTitle" style="height:100%;">
  <div class="spaceTitle" style="height:10%">
    容量情况
  </div>
  <el-row class="" style="height:90%">
    <el-col :span=16 id="containerChart" style="height:100%" ref="mychart"></el-col>
    <el-col :span=8 id="containerDetail" class="containerDetail">
      <div style="height:20%"> </div>
      <div style="height:50%">
        <div class="">
          总空间：<br/>
          <span class="spaceSum">{{spaceSum}}</span>GB
        </div>
        <div class="">
          已用空间：<br/>
          <span class="spaceUsed">{{spaceUsed}}</span>GB
        </div>
        <div class="">
          <!--<div style="height:33.3%;width:100%">-->
          剩余空间：<br/>
          <span class="spaceRemain">{{spaceAvail}}</span>GB
        </div>
      </div>
      <div style="height:30%"></div>
    </el-col>
  </el-row>
</div>
</template>
<script>
import echarts from 'echarts'
import * as summary from '../../../api/summary'

export default {
  name: 'spaceuse',
  /*computed: mapState([
    'spaceSize',
    'spaceUsed',
    'spaceAvail'
  ]),*/
  data() {
    return {
      myChart: [],
    }
  },
  computed: {
    spaceSum() {
      return this.$store.getters.getSummarySpaceSize
    },
    spaceUsed() {
      return this.$store.getters.getSummarySpaceUsed
    },
    spaceAvail() {
      return this.$store.getters.getSummarySpaceAvail
    },
  },
  methods: {
    async getSpaceUsed() {
      let pieCapacity = await summary.GetPieCapacity()
      return pieCapacity.fsUsed;
    },
    async getSpaceAvail() {
      let pieCapacity = await summary.GetPieCapacity()
      return pieCapacity.fsAvail;
    },
  },
  mounted: async function() {
    let thisVue = this; // 作用域问题，在getOverViewEveryTwoSec中直接使用的this指向global对象而非VueComponent
    let timeInterval = 2000; // 时间间隔为2秒
    let opt = {
      baseOption: {
        animation: false,
        tooltip: {
          trigger: 'item',
          formatter: "{b} <strong>{c}</strong>GB({d}%)"
        },
        series: [{
          name: '拟态文件系统空间',
          type: 'pie',
          radius: [0, '80%'],
          label: {
            normal: {
              position: 'inner',
              formatter: "{b} {d}%"
            }
          },
          center: ['50%', '50%'],
          data: [{
              value: thisVue.spaceAvail,
              name: '剩余'
            },
            {
              value: thisVue.spaceUsed,
              name: '已用',
            }
          ],
          color: ['#26A0DA', '#ACACAC'],
        }]
      },
      media: [{
        query: {
          maxWidth: 150
        },
        option: {
          series: [{
            radius: [0, '50%'],
            center: ['50%', '50%']
          }]
        },
        query: {
          maxWidth: 200
        },
        option: {
          series: [{
            radius: [0, '60%'],
            center: ['50%', '50%']
          }]
        },
        query: {
          maxWidth: 250
        },
        option: {
          series: [{
            radius: [0, '70%'],
            center: ['50%', '50%']
          }]
        },
        query: {
          mixWidth: 300
        },
        option: {
          series: [{
            radius: [0, '80%'],
            center: ['50%', '50%']
          }]
        }
      }],
    };
    let firstRefreshPie = async function() {
      let dom = document.getElementById("containerChart");
      /*数据量少且简单，使用svg性能更优*/
      thisVue.myChart = echarts.init(dom, null, {
        renderer: 'canvas'
        /*renderer: 'svg'*/
      });
      thisVue.myChart.showLoading({
        text: '',
        zlevel: 0,
        maskColor: 'rgba(255, 255, 255, 0)',
      });
      var app = {};
      let option = opt;
      if (option && typeof option === "object") {
        thisVue.myChart.hideLoading()
        thisVue.myChart.setOption(option, true);
      }
      window.onresize = thisVue.myChart.resize;
    }

    let refreshPie = async function() {
      let option = opt;
      if (option && typeof option === "object") {
        option.baseOption.series[0].data[0].value = thisVue.spaceAvail;
        option.baseOption.series[0].data[1].value = thisVue.spaceUsed;
        thisVue.myChart.setOption(option, true);
      }
      window.onresize = thisVue.myChart.resize;
      setTimeout(refreshPie, timeInterval);
    }
    firstRefreshPie();
    refreshPie();
},
watch: {
  //添加监听，观察option的变化，发生变化则重新刷新
  option: {
    handler(newVal, oldVal) {
      if (this.myChart) {
        if (newVal) {
          this.chart.setOption(newVal);
        } else {
          this.chart.setOption(oldVal);
        }
      } else {
        this.init();
      }
    },
    deep: true //对象内部属性的监听，关键。
  }
}
}
</script>
<style media="screen">
.spaceTitle {
  font-size: 14px;
  display: flex;
  align-items: center;
  padding-left: 5%;
  width: 95%;
}

.spaceUseTitle {
  border: 1px;
  font-size: 14px;
  border-color: #D3D3D3;
  background-color: #EEEEEE;
  border-style: solid;
}

.containerDetail {
  height: 100%;
}

.containerNum {
  height: 33.3%;
}

.spaceSum {
  font-size: 23px;
  padding-bottom: 8px;
  padding-left: 3px;
}

.spaceUsed {
  font-size: 23px;
  padding-bottom: 8px;
  padding-left: 3px;
  color: #ACACAC;
}

.spaceRemain {
  font-size: 23px;
  padding-bottom: 8px;
  padding-left: 3px;
  color: #26A0DA;
}
</style>
