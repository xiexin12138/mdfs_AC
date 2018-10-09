<template>
	<div class="wrap">
 		<svg class="structure"></svg>
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
			_rect:null,
			//五大部分
			_client:null,
			_lvs:null,
			_cmAndzk:null,
			_mount:null,
			_fs:null,



		rect_info:[
			{width:"70px", height:"170px", x:"0", y:"90", id:"client-wrap"}, //client
			{width:"70px", height:"290px", x:"102", y:"40", id:"lvs-wrap"}, //lvs
			{width:"170px", height:"150px", x:"198", y:"0", id:"cm-wrap"}, //cm
			{width:"170px", height:"150px", x:"198", y:"270", id:"mount-wrap"}, //mount
			{width:"70px", height:"420px", x:"450", y:"0", id:"fs-wrap"}, //fs
		],
		img_info_client:[
			{width:"50px", height:"50px", x:"5", y:"100", xlink:"../../src/renderer/components/ConfigPage/img/user.jpg"},
			{width:"50px", height:"50px", x:"5", y:"200", xlink:"../../src/renderer/components/ConfigPage/img/client.jpg"},
		],
		img_info_lvs:[
			{width:"50px", height:"50px", x:"110", y:"50", xlink:"../../src/renderer/components/ConfigPage/img/lvs.jpg"},
			{width:"50px", height:"50px", x:"110", y:"250", xlink:"../../src/renderer/components/ConfigPage/img/lvs.jpg"},
		],
		img_info_cmAndzk:[
			{width:"50px", height:"50px", x:"200", y:"5", xlink:"../../src/renderer/components/ConfigPage/img/zk.jpg"},
			{width:"50px", height:"50px", x:"260", y:"5", xlink:"../../src/renderer/components/ConfigPage/img/zk.jpg"},
			{width:"50px", height:"50px", x:"320", y:"5", xlink:"../../src/renderer/components/ConfigPage/img/zk.jpg"},
			{width:"50px", height:"50px", x:"230", y:"80", xlink:"../../src/renderer/components/ConfigPage/img/cm.jpg"},
			{width:"50px", height:"50px", x:"310", y:"80", xlink:"../../src/renderer/components/ConfigPage/img/cm.jpg"},
		],
		img_info_mount:[
			{width:"50px", height:"50px", x:"210", y:"280", xlink:"../../src/renderer/components/ConfigPage/img/cm.jpg"},
			{width:"50px", height:"50px", x:"290", y:"280", xlink:"../../src/renderer/components/ConfigPage/img/cm.jpg"},
			{width:"50px", height:"50px", x:"210", y:"350", xlink:"../../src/renderer/components/ConfigPage/img/cm.jpg"},
			{width:"50px", height:"50px", x:"290", y:"350", xlink:"../../src/renderer/components/ConfigPage/img/cm.jpg"},
		],
		img_info_fs:[
			{width:"50px", height:"50px", x:"460", y:"5", xlink:"../../src/renderer/components/ConfigPage/img/fs.jpg"},
			{width:"50px", height:"50px", x:"460", y:"130", xlink:"../../src/renderer/components/ConfigPage/img/fs.jpg"},
			{width:"50px", height:"50px", x:"460", y:"240", xlink:"../../src/renderer/components/ConfigPage/img/fs.jpg"},
			{width:"50px", height:"50px", x:"460", y:"350", xlink:"../../src/renderer/components/ConfigPage/img/fs.jpg"},
		],

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

		this._svg=d3.select('.structure')

		this._rect= this._svg.selectAll(".rectBorder")
		                       .data(this.rect_info)
		                       .enter().append("rect")
		                       .attr("width",function(d){return d.width})
		                       .attr("height",function(d){return d.height})
		                       .attr("x",function(d){return d.x})
		                       .attr("y",function(d){return d.y})
		                       .attr("id",function(d){return d.id})	
		                       .attr("class","rect-wrap")	

		this._client= this._svg.selectAll(".client")
		                       .data(this.img_info_client)
		                       .enter().append("image")
		                       .attr("width",function(d){return d.width})
		                       .attr("height",function(d){return d.height})
		                       .attr("x",function(d){return d.x})
		                       .attr("y",function(d){return d.y})
		                       .attr("xlink:href",function(d){return d.xlink})

		this._lvs= this._svg.selectAll(".lvs")
		                       .data(this.img_info_lvs)
		                       .enter().append("image")
		                       .attr("width",function(d){return d.width})
		                       .attr("height",function(d){return d.height})
		                       .attr("x",function(d){return d.x})
		                       .attr("y",function(d){return d.y})
		                       .attr("xlink:href",function(d){return d.xlink})

		this._cmAndzk= this._svg.selectAll(".cmAndzk")
		                       .data(this.img_info_cmAndzk)
		                       .enter().append("image")
		                       .attr("width",function(d){return d.width})
		                       .attr("height",function(d){return d.height})
		                       .attr("x",function(d){return d.x})
		                       .attr("y",function(d){return d.y})
		                       .attr("xlink:href",function(d){return d.xlink})

		this._mount= this._svg.selectAll(".mount")
		                       .data(this.img_info_mount)
		                       .enter().append("image")
		                       .attr("width",function(d){return d.width})
		                       .attr("height",function(d){return d.height})
		                       .attr("x",function(d){return d.x})
		                       .attr("y",function(d){return d.y})
		                       .attr("xlink:href",function(d){return d.xlink})
		this._fs= this._svg.selectAll(".fs")
		                       .data(this.img_info_fs)
		                       .enter().append("image")
		                       .attr("width",function(d){return d.width})
		                       .attr("height",function(d){return d.height})
		                       .attr("x",function(d){return d.x})
		                       .attr("y",function(d){return d.y})
		                       .attr("xlink:href",function(d){return d.xlink})
		
		},

		showDitail(){
			// var trytry=d3.selectAll('image')
			// console.log(trytry[0][1].x.animVal.value)
		},
	}


}
</script>

<style>
.structure{
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