<template>
	<div>
		<el-row type="flex" align="middle" style="height:800">
		<el-col style="height:800;">
		<el-row type="flex" justify="center" >
		<el-col style="width:1000px;height:800px;">
			<svg class="descrition" width="1000" height="100" ></svg>
			<el-row type="flex" justify="center" >
			<el-col style="width:800px;height:800px;">
				<div class="monitor-graph"></div>
			</el-col>
			</el-row>
			<el-dialog
			  title="文件系统信息"
			  :visible.sync="fsVisible"
			  width="25%"
			  center>
			<el-row >
				<el-col :span="10" :offset="2"><div style="text-align:right;">文件系统名称:</div></el-col>
				<el-col :span="10"><div>{{fs.name}}</div></el-col>
			</el-row>
			<el-row >
				<el-col :span="10" :offset="2"><div style="text-align:right;">文件系统类型:</div></el-col>
				<el-col :span="10" ><div>{{fs.type}}</div></el-col>
			</el-row>
		<!-- 	<el-row :gutter="20">
				<el-col :span="8":offset="4"><div style="text-align:right;">文件系统状态:</div></el-col>
				<el-col :span="8" ><div>{{fs.status}}</div></el-col>
			</el-row> -->
			
			</el-dialog>
			<el-dialog
			  title="error信息"
			  :visible.sync="errorVisible"
			  width="25%"
			  center>
			<el-row >
				<el-col :span="8":offset="2"><div style="text-align:right;">error文件名:</div></el-col>
				<el-col :span="14" ><div>{{errorObj.name}}</div></el-col>
			</el-row>

			<el-row >
				<el-col :span="8":offset="2"><div style="text-align:right;">产生时间:</div></el-col>
				<el-col :span="14" ><div>{{errorObj.time}}</div></el-col>
			</el-row>
			
			</el-dialog>
		</el-col>
		<log-list :ListData="ListData" class="log_list"></log-list>

		</el-row>
		</el-col>
		</el-row>


		<foot></foot>


	</div>
</template>
<style>

	.log_list{
        float:left;
        width: 400px;
		/*background-color: blue;*/
		margin-top: 30px;
		/*margin-left:5%;*/
		/*margin-right:-15%;*/
	}



</style>
<script>
/**
 * 
1、事先生成固定数量的随机大小的圆
2、获取数据，将数据和圆绑定，对需要显示的数据进行标记
3、显示未处理的错误和被处理的错误
4、将所有错误都以动态效果显示出来，对需要修复的圆进行标记
5、选出需要修复的进行修复动画展示

1、init()函数，其中有个initGraphData函数，事先生成固定数量的圆
2、bindData()函数，其中有个与后台交互的函数，用来获取数据MonitorFS。由于这个函数是异步函数，所以bandData必须设置为async函数，其内的异步函数用await。
3、4、updateGraph()函数，主要的动画效果都在这里实现
5、animationRecover()函数，展示正常文件移动的效果

 */
import Bar from '@/components/common/Bar'
import Vue from 'vue'
import { Message, Row, Col, Dialog } from 'element-ui'
import d3 from 'd3'
import * as status from '../../../api/status' 
import LogList from './LogList'
import Foot from '@/components/common/Foot'
Vue.use(Row)
Vue.use(Col)
Vue.use(Dialog)


// 背景宽度
let width = 800
// 背景长度
let height = 900
// 正常文件的颜色
let color_nomal_file = '#77c34f'
// shuffle 本来是得到一个随机副本，看到generator的实现后改了，后来发现还是下面这个省事
function shuffle(array){
	array.sort(()=>{
		return Math.random()-0.5
	})
	return array
}

// 原设计
// var circleColorList = ["#F0F8FF","#F5FFFA","#FFFFF0"]; 
// var borderColorList = ["#87CEFA","#B4EEB4","#FFEC8B"]; 
// 演示
var circleColorList = ["#F0F8FF","#F0FFFA","#FFFFF0","#FFFFF0"]; 
var borderColorList = ["#87CEFA","#00EEB4","#ed7d31","#FFD700"]; 
var abnormalCircleColor="#FFFAFA";
// var abnormalBorderColor="#F08080";
var abnormalBorderColor="#f20c00";

var circleColorIndex=0;
var borderColorIndex=0;

function getCircleColor(colorList){ 	
	var color = colorList[circleColorIndex]; 
	
	circleColorIndex=circleColorIndex+1; 
	if(circleColorIndex==4){
		circleColorIndex=0;
	}
    return color; 
} 


function getBordereColor(colorList){ 	
	var color = colorList[borderColorIndex]; 
	
	borderColorIndex=borderColorIndex+1; 
	if(borderColorIndex==4){
		borderColorIndex=0;
	}
    return color; 
} 


// 圆的色彩显示函数，暂定根据层级显示颜色
function circleColor(d){
	if (d.depth == 0) {
		return '#fff'   //最底层
	}else if (d.depth == 1) {   //文件系统
		var color= getCircleColor(circleColorList);
		return color
	}else if (d.depth == 2) {  //异常
		// return '#8B0000'
		return abnormalCircleColor
	}
}

function strokeColor(d){
	if (d.depth == 0) {
		return 'none'  //最底层
	}else if (d.depth == 1) {   //文件系统
		var color= getBordereColor(borderColorList);
		return color
	}else if (d.depth == 2) {  //异常
		return abnormalBorderColor
		 // return '#8B0000'
	}
}

function strokeWidth(d){
	if (d.depth == 0) {
		return 'none'  //最底层
	}else if (d.depth == 1) {   //文件系统
		return '4'
	}else if (d.depth == 2) {  //异常
		return '3'
		 // return '#8B0000'
	}
}


// 弃用的opacity显示方法
function circleOpacity(d){
	if (d.depth == 0) {
		return 0
	} else if (d.depth == 1) {
		return 1
	} else if (d.depth == 2) {
		if (d.state > 0) {
			return 1
		} else {
			return 0
		}
	}
}
// 目前采用的display显示方法
function circleDisplay(d){	
	if (d.state > 0) {
		return 'display:block;'
	} else if (d.state == 0 ) {
		return 'display:none;'
	}
	
}
function circleRadius(d){
	if (d.depth == 1) {
		return 130
	}else {
		return d.r
	}
}

function handleList(init_data){
	function sortNumber(a,b) { 
		return -(a[1] - b[1]) 
	} 
	function handle_errorListData(init_data){
		let fs_error_set=[];   //各文件系统下记录各error详细信息条目的集合
		let errortime_set=[];  //errortime_set中每个元素包含两个元素:[对应fs_error_set中条目的序号, error发生的时间]
		let latest_time=[];
		let error_index=[];    
	    let latest_errorData=[];

		for (let fs_set of init_data){
		   
		    for(let fs_error_detail of fs_set.fs_error){
		       fs_error_set.push(fs_error_detail);
		    }
		       
		}

		for (let [index, elem] of fs_error_set.entries()) {
		  let seconds_total=Date.parse(elem.time); //转换时间格式,解析一个表示日期的字符串，并返回从 1970-1-1 00:00:00 所经过的毫秒数。

		  let errortime= [index, seconds_total];
		  errortime_set.push(errortime);  
		}


		//根据error发生时间( errortime_set[1] ),从大到小排序errortime_set数组
		errortime_set.sort(sortNumber);

		//取最近发生的十个错误时间,从errortime_set中
		latest_time=errortime_set.slice(0,10);

		//根据记录的对应条目编号(errortime[0]=latest_time[0])在fs_error_set取出 push存入latest_errorData;
		for( let errortime of latest_time){
		      let error_index= errortime[0];
		      latest_errorData.push(fs_error_set[error_index]);
		}
		return latest_errorData;
	}
    // console.log(handle_errorListData(init_data))
	return handle_errorListData(init_data);
}


export default {
	components: {
		Bar,
		LogList,
		Foot
	},
	data() {
		return {
			_svg: null,
			_pack: null,
			_root: null,
			_recover: null,
			fsVisible:false,
			errorVisible:false,
			fs:{
				name:null,
				type:null,
				// status:null
			},
			errorObj:{
				name:null,
				time:null,
			},
			ListData:[],
			timer:null,
		}
	},
	mounted: function() {
		
		this.init()
		this.updateGraph()
		this.bindData()  // 这个操作已经包含updateGraph，不过上面是为了初次渲染所以必须有一个
		
		// setTimeout(()=>{
		// 	console.log('begin')
		// 	this.bindData()
		// },5000)
		// 设置一个变量timer用来记录这个定时器
		this.timer = setInterval(()=>{
			// console.log('begin')
			this.bindData()
		},5000)
	},
	// 当离开这个页面时，清除这个定时器
	destroyed: function(){
		clearInterval(this.timer)
	},
	methods: {
		init: function() {
			this._root = {
				name: 'root',
				children: []
			}
			this.initGraphData()
			this._svg = d3
				.select('.monitor-graph')
				.append('svg')
				.attr('id','svg_graph')
				.attr('width', width)
				.attr('height', height)
			this._pack = d3.layout
				.pack()
				.size([width, height])
				.padding(25)

			this._svg
				.selectAll('circle')
				.data(this._pack.nodes(this._root))
				.enter()
				.append('circle')
				// .attr('opacity', circleOpacity)
				.attr('class', function(d) {
					// console.log(d)
					if (d.state == 1) {
						return d.parent.name + ' errors'
					} else if (d.state == 2) {
						return d.parent.name + ' recover'
					} else if (d.state == 0) {
						return d.parent.name + ' out'
					} else {
						return 'circle'
					}
				})
				// .attr('fill', circleColor)
				.attr('transform', function(d,i) {
				   return 'translate(' + d.x + ',' + d.y + ')'
				})
				.attr('r',circleRadius)
				.attr('style',circleDisplay)



			let dataset = [0,1,2,3],recWidth = 15
			d3.select('.descrition')
				// .attr('transform', 'translate(-45,0)')
				.append('g')
				.selectAll("rect")  
	          	.data(dataset)  
	          	.enter()  
	          	.append("rect")  
	        	.attr("y",50)//每个矩形的起始x坐标  
	        	.attr("x",function(d,i){//每个矩形的起始y坐标  
	                return i * recWidth;  
	          	})  
	        	.attr("width",function(d){//每个矩形的宽度   
	                return 10;  
	         	})  
	        	.attr("height",recWidth-2)//每个矩形的高度  
	        	.attr("fill",function(d,i){//每个矩形的颜色 
                    return borderColorList[i]
	          	});//填充颜色 

			d3.select('.descrition')
				.append('g')
				.selectAll('text')
				.data('[]')
				.enter()
				.append('text')
				.text('文件系统')
				.attr('transform', 'translate(60,63)')
				.attr('font-family', 'Arial')
				.attr('fill', 'black')
				.attr('font-size', '20px')
			d3.select('.descrition')
				.append('g')
				.selectAll("rect")  
	          	.data([1])  
	          	.enter()  
	          	.append("rect")  
	        	.attr("y",80)//每个矩形的起始x坐标  
	        	.attr("x",function(d,i){//每个矩形的起始y坐标  
	                return i * recWidth;  
	          	})  
	        	.attr("width",function(d){//每个矩形的宽度   
	                return 10;  
	         	})  
	        	.attr("height",recWidth-2)//每个矩形的高度  
	        	.attr("fill",function(d,i){//每个矩形的颜色 
	                return abnormalBorderColor
	          	});//填充颜色  
			d3.select('.descrition')
				.append('g')
				.selectAll('text')
				.data('[]')
				.enter()
				.append('text')
				.text('异常')
				.attr('transform', 'translate(45,93)')
				.attr('font-family', 'Arial')
				.attr('fill', 'black')
				.attr('font-size', '20px')
		},

		updateData() {
			// 
		},
		async bindData() {
			// let data = this.updateData()
			let data = await status.MonitorFS()

			this.ListData = handleList(data)
			
			for (let i = 0; i < data.length; i++) {
				this._root.children[i].name = data[i].fs_name 
				for (let j = 0; j < data[i].fs_error.length; j++) {
					this._root.children[i].children[j].name =
						data[i].fs_error[j].file_name
					// 下面两行的处理不够严谨，而且需要注意等式两边的字段没有统一
					this._root.children[i].children[j].state =
						+data[i].fs_error[j].repair + 1
					this._root.children[i].children[j].repair =
						data[i].fs_error[j].repair_fs

					this._root.children[i].children[j].time =
						data[i].fs_error[j].time
				}
			}
			await this.updateGraph()
		},
		
		//初始四个大圆代表四个不同的文件系统
		initGraphData() {
			let cc1 = {
				name: 'sf1',
				fs_type:'ceph1',
				children: []
			}
			let cc2 = {
				name: 'sf2',
				fs_type:'ceph13',
				children: []
			}
			let cc3 = {
				name: 'sf3',
				fs_type:'ceph14',
				children: []
			}
			let cc4 = {
				name: 'sf4',
				fs_type:'ceph15',
				children: []
			}
			// 初步生成内部圆的时候，一定要多留一个空白圆，这样就能保证修复圆不从错误圆里跑出来
			for (let i = 0; i < 16; i++) {
				let c = 0
				let repair = null

				let cc = {
					name: 'hehe',
					value: Math.ceil(10 * Math.random()),
					state: c,
					repair: repair
				}
				cc1.children.push(cc)
				cc2.children.push({
					name: 'hehe',
					value: Math.ceil(10 * Math.random()),
					state: c,
					repair: repair
				})
				cc3.children.push({
					name: 'hehe',
					value: Math.ceil(10 * Math.random()),
					state: c,
					repair: repair
				})
				cc4.children.push({
					name: 'hehe',
					value: Math.ceil(10 * Math.random()),
					state: c,
					repair: repair
				})
			}
			this._root.children.push(cc1)
			this._root.children.push(cc2)
			this._root.children.push(cc3)
			this._root.children.push(cc4)
		},


		updateGraph() {
			let self = this
			this._svg
				.selectAll('circle')
				.data(this._pack.nodes(this._root))
				// .attr('opacity', circleOpacity)
				.attr('class', function(d) {
					if (d.state == 1) {
						return d.parent.name + ' errors'
					} else if (d.state == 2) {
						return d.parent.name + ' recover'
					} else if (d.state == 0) {
						return d.parent.name + ' out'
					} else {
						return 'circle'
					}
				})
				.attr('fill', circleColor)
				.attr('stroke',strokeColor)
				.attr('stroke-width',strokeWidth)
				// .attr('strokeo-opacity',strokeoPacity)
				.attr('transform', function(d) {
					return 'translate(' + d.x + ',' + d.y + ')'
				})
				.attr('r',circleRadius)
				.attr('id', function(d) {
					return d.name
				})
				.on('click',function(d){
					console.log("hhh")
					if (d.depth == 1) {
						let fs = {}
						fs.name = d.name
						fs.type = d.fs_type
						fs.status = 'action'
						self.fs = fs
						self.fsVisible = true
					}else if (d.depth == 2) {
						let errorObj = {}
						errorObj.name = d.name
						// errorObj.type = d.errorType
						errorObj.time = d.time
						self.errorObj = errorObj
						self.errorVisible = true
					}
				})
				.attr('style',circleDisplay)
				
			// this.animationRecover()        //执行修复动画
		},


		//修复动画
		animationRecover() {
			this._recover = []
			let self = this
			this._svg
				.selectAll('.recover')
				.attr('r', 0)
				.transition()
				.duration(1500) // 从点变成圆花费1.5秒
				.attr('r',circleRadius)
				.transition()
				.delay(2000)   // 代码执行后2秒，即变成圆后0.5秒开始消失动画，耗时0.5秒
				.duration(500)
				.attr('style', function(d) {
					let cc = {}
					cc.x = d.x
					cc.y = d.y
					cc.r = d.r
					cc.repair = d.repair
					self._recover.push(cc)
					return 'display:none;'
				})
				.attr('class',function(d){
					return d.parent.name + ' out'
				})
			// 对每一个需要恢复的点做恢复动画
			for (let i = 0; i < this._recover.length; i++) {
				// 首先取一个恢复文件所在的文件系统内的位置
				let px, py, pr
				this._svg
					.select('.' + this._recover[i].repair + '.out')
					.attr('id', function(d) {
						px = d.x
						py = d.y
						pr = d.r
						return d.name
					})
				this.animationCircle(
					px,
					py,
					pr,
					this._recover[i].x,
					this._recover[i].y,
					this._recover[i].r
				)
			}
		},
		animationCircle(px, py, pr, x, y, r) {
			this._svg
				.selectAll('.circle.backup')
				.data([{ name: '/temp' }])
				.enter()
				.append('circle')
				.attr('fill', color_nomal_file)
				.attr('cx', px)
				.attr('cy', py)
				.attr('r', pr)
				.transition()
				.duration(2000)  // 耗时2秒移动位置 正常文件
				.attr('cx', x)
				.attr('cy', y)
				.attr('r', r)
				.transition()
				.duration(500)  // 耗时0.5秒消失，正常文件
				.remove()
		}
	}
}
</script>
<style>
	#svg_graph{
      position: absolute;
      top:-180px;
      z-index: -10;
	}

</style>
