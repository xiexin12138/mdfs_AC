<template>
<el-row style="height:100%;width:100%">
  <el-col style="height:10%;width:100%">
    <el-form ref="form" :model="form" :inline="true" label-width="90px">
      <el-form-item label="报表类型">
        <el-radio-group v-model="form.charttype">
          <el-radio-button label="bar">柱状图</el-radio-button>
          <el-radio-button label="line">折线图</el-radio-button>
          <el-radio-button label="pie">饼图</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="报表周期">
        <el-radio-group v-model="form.chartspan">
          <el-radio-button label="date">日</el-radio-button>
          <!--<el-radio-button label="week">周</el-radio-button>-->
          <el-radio-button label="month">月</el-radio-button>
          <el-radio-button label="year">年</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="选择时间" prop="time" :rules="[{ type: 'date', required: true, message: '请选择时间' , trigger: 'change' }]">
        <el-date-picker v-model="form.time" :type="getchartspan" placeholder="选择时间段" validate-event>
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="onSubmit('form')">生成</el-button>
        <el-button type="success" @click="onSubmit('form')">导出</el-button>
      </el-form-item>
    </el-form>
  </el-col>
  <el-col id="resultchart" ref="resultchart" style="height:400px;width:100%">

  </el-col>
</el-row>
</template>

<script>
import Vue from 'vue'
import echarts from 'echarts'
import * as reportForm from '@/api/reportForm'
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

Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(DatePicker)
Vue.use(Row)
Vue.use(Col)

export default {
  name: 'fssafe',
  data() {
    return {
      form: {
        charttype: 'bar',
        chartspan: 'date',
        time: ''
      },
      myChart: [],
      thisopt:
      {
        xAxis: {
          type: 'category',
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '23', '24', '25', '26', '27', '28', '29', '30', '31']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 1290, 1330, 1320, 932, 901, 934, 1290, 1330, 1320, 932, 901, 934, 1290, 1330, 1320, 932, 901, 934, 1290, 1330, 1320, 932, 901, 934, 1290, 1330, 1320, 932, 901, 934, 1290,
              ],
          type: "line"
        }]
      }
    }
  },
  computed: {
    getchartspan() {
      return this.form.chartspan
    },
    getCharttype() {
      return this.form.charttype
    }
  },
  watch: {
    getCharttype: function() {
      console.log("getCharttype:"+ this.getCharttype);
      this.thisopt.series.type = this.getCharttype
      this.myChart.setOption(this.thisopt, true);
    }
  },
  methods: {
    async onSubmit(formName) {
      await this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
            charttype: this.form.charttype,
            chartspan: this.form.chartspan,
            time: this.form.time
          };
          this.$store.dispatch('getfssafereport', {
            data
          }).catch((e) => {
            console.log(444, e.message)
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
          console.log('error submit!!');
          return false;
        }
      });
    },
    async createGraph() {
      let thisVue = this; // 作用域问题，在getOverViewEveryTwoSec中直接使用的this指向global对象而非VueComponent
      let opt = this.thisopt;

      let firstRefreshPie = async function() {
        let dom = document.getElementById("resultchart");
        //获取父容器的宽度具体数值直接赋值给图表以达到宽度100%的效果
        /*document.getElementById("resultchart").css('width', document.getElementById("pane-0").width);*/
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
      firstRefreshPie();
    }
  },
  mounted: async function() {
    setTimeout(() => {
      this.createGraph()
    }, 0)
  },
}
</script>
<style media="screen">
.fullScreen {
  height: 100%
}

.el-tabs__content .el-tab-pane {
  height: 100%;
  width: 100%
}
</style>
