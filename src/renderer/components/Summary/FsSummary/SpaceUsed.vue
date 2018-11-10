<template>
<div class="spaceUseTitle" style="height:100%;">
  <div class="spaceTitle" style="height:10%">
    容量情况
  </div>
  <el-row class="" style="height:90%">
    <el-col :span=16 id="containerChart" style="height:100%"></el-col>
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

export default {
  name: 'spaceuse',
  /*computed: mapState([
    'spaceSize',
    'spaceUsed',
    'spaceAvail'
  ]),*/
  computed: {
    spaceSum () {
      return this.$store.getters.getSummarySpaceSize
    },
    spaceUsed () {
      return this.$store.getters.getSummarySpaceUsed
    },
    spaceAvail () {
      return this.$store.getters.getSummarySpaceAvail
    }
  },
  mounted: async function() {
    var dom = document.getElementById("containerChart");
    /*数据量少且简单，使用svg性能更优*/
    var myChart = echarts.init(dom, null, {
      renderer: 'canvas'
      /*renderer: 'svg'*/
    });
    var app = {};
    let option = null;
    option = {
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
              value: this.$store.getters.getSummarySpaceUsed,
              name: '剩余'
            },
            {
              value: this.$store.getters.getSummarySpaceAvail,
              name: '已用',
            }
          ],
          color: ['#ACACAC', '#26A0DA'],
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
    if (option && typeof option === "object") {
      myChart.setOption(option, true);
    }
    /*console.log("typeof window.onresize");
    console.log(typeof window.onresize);*/
    window.onresize = myChart.resize;
    //根据窗口的大小变动图表 --- 重点
    /*window.onresize = function() {
      myChart.resize();
      //myChart1.resize();若有多个图表变动，可多写
    }*/
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
