<template>
	<div>
		
		<el-row type="flex" align="middle" style="height:800px">
		<el-col style="height:600px;">
			<el-row type="flex" justify="center">
			<el-col style="width:600px;height:600px;">
				<div id="mainPie" style="width:100%;height:400px;"></div>
			</el-col>
		  <div class="grid-content" v-if="tableData">

    <el-table
      :data="tableData"
      stripe
      border
      style="width: 100%"
      height="300"

      >

      <el-table-column
        prop="date"
        label="日期"
        width="280"
        >
      </el-table-column>
      <el-table-column
        prop="fsystem"
        label="文件系统"
        width="280">
      </el-table-column>
      <el-table-column
        prop="errordata"
        label="错误数据"
        width="339">
      </el-table-column>

    </el-table>


    <el-row type="flex" class="row-bg" justify="end">
      <el-col style="width:480px;">
        <div class="divide">
          <el-pagination
            background
            layout="total, prev, pager, next"
            :page-size="pageSize"
            :total="total"
            :current-page="currentPage"
            @current-change="handleCurrentChange">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
    
    </div>
		</el-row>
		</el-col>
		</el-row>
		
	</div>
</template>

<script>
import echarts from 'echarts'
import Vue from 'vue'
import { Button, Input, Form, FormItem, Message, Row, Col } from 'element-ui'
import * as status from '../../../api/status'
Vue.use(Row)
Vue.use(Col)
Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)


export default {
	data(){
		return {
			chart:null,
			tableData: null,
          	total:null,
          	currentPage:null,
          	pageSize:null,
          	id:null
		}
	},
	methods:{
		async handleCurrentChange(val){
			let data = {
				id:this.id,
				pageSize:10,
				currentPage:+val-1
			}
			// 取数据
			let table = await status.MonitorPieTable(data)
			this.tableData = table.data
			this.total = table.total
			this.currentPage = table.currentPage
			this.pageSize = table.pageSize
		},
		async handlePieClick(params){
			this.id = params.data.id
			console.log(params.data.id)	// 这是对应点击部位的id，即文件系统的id
			let data = {
				id:params.data.id,
				pageSize:10,
				currentPage:0
			}
			// 取数据
			let table = await status.MonitorPieTable(data)
			this.tableData = table.data
			this.total = table.total
			this.currentPage = table.currentPage
			this.pageSize = table.pageSize
		},
		getPie(data){
			// 下面这个是示例，通过修改示例的data数据即可成功展示我们的内容
			let option = {
				title : {
			        text: '各文件系统元数据异常统计',
			        subtext: '总次数占比',
			        x:'center'
			    },
			    tooltip : {
			        trigger: 'item',
			        formatter: "{a} <br/>{b} : {c} ({d}%)"
			    },
			    legend: {
			        orient : 'vertical',
			        x : 'left',
			        data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
			    },
			    toolbox: {
			        show : true,
			        feature : {
			            mark : {show: true},
			            dataView : {show: true, readOnly: false},
			            magicType : {
			                show: true, 
			                type: ['pie', 'funnel'],
			                option: {
			                    funnel: {
			                        x: '25%',
			                        width: '50%',
			                        funnelAlign: 'left',
			                        max: 1548
			                    }
			                }
			            },
			            restore : {show: true},
			            saveAsImage : {show: true}
			        }
			    },
			    calculable : true,
			    series : [
			        {
			            name:'文件系统  ： 异常次数',
			            type:'pie',
			            radius : '55%',
			            center: ['50%', '60%'],
			            data:[
			                {value:335, name:'直接访问',id:1},
			                {value:310, name:'邮件营销',id:1},
			                {value:234, name:'联盟广告',id:1},
			                {value:135, name:'视频广告',id:1},
			                {value:1548, name:'搜索引擎',id:1}
			            ]
			        }
			    ]
			}
			let legend_data = []
			let series_data = []
			for(let value of data){
				let o = {
					value:value.sum,
					name:value.fs_name,
					id:value.id,
				}
				legend_data.push(value.fs_name)
				series_data.push(o)
			}
			option.legend.data = legend_data
			option.series[0].data = series_data
			// 设置初始化参数，渲染作用
			this.chart.setOption(option)
			// 绑定点击事件	
			this.chart.on('click',this.handlePieClick)		
		},

	},
	mounted:async function(){
		this.chart = echarts.init(document.getElementById('mainPie'))
		// let data = await status.MonitorMetadata()
		let data = [{
					id:1,
					sum:1,
					fs_name:'fs1'
				},{
					id:2,
					sum:4,
					fs_name:'fs2'
				},{
					id:3,
					sum:9,
					fs_name:'fs3'
				}]
		this.getPie(data)
	}
}
</script>
