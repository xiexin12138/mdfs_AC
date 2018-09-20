<template>
	<div>
 <svg class="wrap">

    <g class="UserAndClient-wrap">
	    <image width="50px" height="50px" x="0" y="100"
		        xlink:href="./img/user.jpg" @click="showDitail()">
		</image>
	    <image width="50px" height="50px" x="0" y="200"
		        xlink:href="./img/client.jpg" @click="showDitail()">
		</image>
    </g>

    <g class="LVS-wrap">
    	<rect width="70px" height="290px" x="102" y="40" class="rect-wrap" id="lvs-wrap"></rect>
	    <image width="50px" height="50px" x="110" y="50"
		        xlink:href="./img/lvs.jpg" @click="showDitail()">
		</image>
	    <image width="50px" height="50px" x="110" y="250"
		        xlink:href="./img/lvs.jpg" @click="showDitail()">
		</image>
    </g>

    <g class="CM-wrap">
    	<rect width="170px" height="150px" x="198" y="0" class="rect-wrap" id="cm-wrap"></rect>
    	<!-- zk -->
 	    <image width="50px" height="50px" x="200" y="5"
		        xlink:href="./img/zk.jpg" @click="showDitail()">
		</image>  
 	    <image width="50px" height="50px" x="260" y="5"
		        xlink:href="./img/zk.jpg" @click="showDitail()">
		</image>
 	    <image width="50px" height="50px" x="320" y="5"
		        xlink:href="./img/zk.jpg" @click="showDitail()">
		</image> 
		<!-- cm -->
 	    <image width="50px" height="50px" x="230" y="80"
		        xlink:href="./img/cm.jpg" @click="showDitail()">
		</image> 
 	    <image width="50px" height="50px" x="310" y="80"
		        xlink:href="./img/cm.jpg" @click="showDitail()">
		</image> 	
    </g>

    <g class="Mount-wrap">
        <rect width="170px" height="150px" x="198" y="270" class="rect-wrap" id="mount-wrap"></rect>
 	    <image width="50px" height="50px" x="210" y="280"
		        xlink:href="./img/cm.jpg" @click="showDitail()">
		</image> 	
 	    <image width="50px" height="50px" x="290" y="280"
		        xlink:href="./img/cm.jpg" @click="showDitail()">
		</image> 	
 	    <image width="50px" height="50px" x="210" y="350"
		        xlink:href="./img/cm.jpg" @click="showDitail()">
		</image> 	
 	    <image width="50px" height="50px" x="290" y="350"
		        xlink:href="./img/cm.jpg" @click="showDitail()">
		</image>
    </g>

    <g class="FS-wrap">
    	<rect width="70px" height="420px" x="450" y="0" class="rect-wrap" id="fs-wrap"></rect>
 	    <image width="50px" height="50px" x="460" y="5"
		        xlink:href="./img/fs.jpg" @click="showDitail()">
		</image>  
 	    <image width="50px" height="50px" x="460" y="130"
		        xlink:href="./img/fs.jpg" @click="showDitail()">
		</image>
 	    <image width="50px" height="50px" x="460" y="240"
		        xlink:href="./img/fs.jpg" @click="showDitail()">
		</image>
 	    <image width="50px" height="50px" x="460" y="350"
		        xlink:href="./img/fs.jpg" @click="showDitail()">
		</image>
    </g>
 </svg>
	</div>
</template>

<script>

import {Button, Dialog, Message } from 'element-ui'
import Vue from 'vue'
import d3 from 'd3'
import * as config from '../../api/config'

Vue.use(Button)
Vue.use(Dialog)

export default {
	data() {
		return {
			// 这里的数据并没有被初始化
			//整体画布
			_svg:null,
			//五大部分
			_client:null,
			_lvs:null,
			_cm:null,
			_mount:null,
			_fs:null,
		}
	},


	// 挂载完毕后，即页面基本形成后，会调用下面的内容
	mounted: async function() {
		this.createGraph()
		console.log("hh")

	},

	methods: {
	
		// 新建图像
		createGraph: function() {
  //       this._svg=d3.select('.wrap')     //选择文档中的xx元素中的首个
		//             .append("svg")  //添加一个svg元素
		//             .attr("width", 300)  //设定宽度
		//             .attr("height", 300) //设定高度
		//             // .attr('style','background-color:red')
		// this._client=this._svg.append('div')
		//                   .attr('id','client-wrap')
		//                   .attr('class','five-wrap')
		//                   .attr('style','background-color:red')
		// this._lvs=this._svg.append('div')
		//                   .attr('id','lvs-wrap')
		//                   .attr('class','five-wrap')
		// this._cm=this._svg.append('div')
		//                   .attr('id','cm-wrap')
		//                   .attr('class','five-wrap')		
		// this._mount=this._svg.append('div')
		//                   .attr('id','mount-wrap')
		//                   .attr('class','five-wrap')
		// this._fs=this._svg.append('div')
		//                   .attr('id','fs-wrap')
		//                   .attr('class','five-wrap')

		this._svg=d3.select('.wrap')

		this._lvs=this._svg.select('.LVS-wrap').selectAll('image')
		console.log(this._lvs)

		
		},
		showDitail(){
			var trytry=d3.selectAll('image')
			console.log(trytry[0][1].x.animVal.value)
		},
	}


}
</script>

<style>
.wrap{
	height:600px;
	width:600px;	
	margin-left: 150px;
	margin-top: 80px;
}
.five-wrap{
	height:100px;
	width:100px;
/*    fill:rgb(0,0,255);*/
    fill:none;
}
.rect-wrap{
	fill:none;
	stroke:#BEBEBE;
}
</style>