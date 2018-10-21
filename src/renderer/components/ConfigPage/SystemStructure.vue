<template>
	<div class="wrap">
 		<svg class="structure"></svg>

			<el-dialog
			  title="CM信息"
			  :visible.sync="cmVisible"
			  width="30%"
			  center>
				<el-row >
					<el-col :span="10" ><div style="text-align:right;">ID:</div></el-col>
					<el-col :span="10"><div>{{cm_info.id}}</div></el-col>
				</el-row>
				<el-row >
					<el-col :span="10" ><div style="text-align:right;">IP:</div></el-col>
					<el-col :span="10" ><div>{{cm_info.ip}}</div></el-col>
				</el-row>
				<el-row >
					<el-col :span="10"><div style="text-align:right;">是否主CM:</div></el-col>
					<el-col :span="10" ><div>{{cm_info.service}}</div></el-col>
				</el-row>
			</el-dialog>

			<el-dialog
			  title="FS信息"
			  :visible.sync="fsVisible"
			  width="30%"
			  center>
				<el-row >
					<el-col :span="15" ><div style="text-align:right;">ID:</div></el-col>
					<el-col :span="5"><div>{{fs_info.id}}</div></el-col>
				</el-row>
				<el-row >
					<el-col :span="15" ><div style="text-align:right;">系统名称:</div></el-col>
					<el-col :span="5" ><div>{{fs_info.name}}</div></el-col>
				</el-row>
				<el-row >
					<el-col :span="15"><div style="text-align:right;">系统类型:</div></el-col>
					<el-col :span="5" ><div>{{fs_info.type}}</div></el-col>
				</el-row>
				<el-row >
					<el-col :span="15"><div style="text-align:right;">挂载路径:</div></el-col>
					<el-col :span="5" ><div>{{fs_info.mountPath}}</div></el-col>
				</el-row>
				<el-row >
					<el-col :span="15"><div style="text-align:right;">服务器地址:</div></el-col>
					<el-col :span="5" ><div>{{fs_info.mountAddr}}</div></el-col>
				</el-row>
				<el-row >
					<el-col :span="15"><div style="text-align:right;">端口号:</div></el-col>
					<el-col :span="5" ><div>{{fs_info.mountport}}</div></el-col>
				</el-row>
				<el-row >
					<el-col :span="15"><div style="text-align:right;">存储空间:</div></el-col>
					<el-col :span="5" ><div>{{fs_info.fssize}}</div></el-col>
				</el-row>
				<el-row >
					<el-col :span="15"><div style="text-align:right;">已用空间:</div></el-col>
					<el-col :span="5" ><div>{{fs_info.fsused}}</div></el-col>
				</el-row>
				<el-row >
					<el-col :span="15"><div style="text-align:right;">剩余空间:</div></el-col>
					<el-col :span="5" ><div>{{fs_info.fsavail}}</div></el-col>
				</el-row>
				<el-row >
					<el-col :span="15"><div style="text-align:right;">系统状态:</div></el-col>
					<el-col :span="5" ><div>{{fs_info.fsstate}}</div></el-col>
				</el-row>
				<el-row >
					<el-col :span="15"><div style="text-align:right;">判决服务:</div></el-col>
					<el-col :span="5" ><div>{{fs_info.judge}}</div></el-col>
				</el-row>
				<el-row >
					<el-col :span="15"><div style="text-align:right;">同步情况:</div></el-col>
					<el-col :span="5" ><div>{{fs_info.sync}}</div></el-col>
				</el-row>
			</el-dialog>

			<el-dialog
			  title="Mount信息"
			  :visible.sync="mountVisible"
			  width="30%"
			  center>
				<el-row >
					<el-col :span="10" ><div style="text-align:right;">ID:</div></el-col>
					<el-col :span="10"><div>{{mount_info.id}}</div></el-col>
				</el-row>
				<el-row >
					<el-col :span="10" ><div style="text-align:right;">类型:</div></el-col>
					<el-col :span="10" ><div>{{mount_info.os}}</div></el-col>
				</el-row>
				<el-row >
					<el-col :span="10"><div style="text-align:right;">IP:</div></el-col>
					<el-col :span="10" ><div>{{mount_info.ip}}</div></el-col>
				</el-row>
				<el-row >
					<el-col :span="10"><div style="text-align:right;">状态:</div></el-col>
					<el-col :span="10" ><div>{{mount_info.state}}</div></el-col>
				</el-row>
				<el-row >
					<el-col :span="10"><div style="text-align:right;">是否上线:</div></el-col>
					<el-col :span="10" ><div>{{mount_info.online}}</div></el-col>
				</el-row>
			</el-dialog>

	</div>
</template>

<script>

import {Button, Dialog, Message } from 'element-ui'
import Vue from 'vue'
import d3 from 'd3'
import * as fivePart from '../../api/fivePart'

Vue.use(Button)
Vue.use(Dialog)

export default {
	data() {
		return {


			// 这里的数据并没有被初始化
			//整体画布
			_svg:null,
			_rect:null,

	        _rect_client:null,
	        _rect_lvs:null,
	        _rect_cmAndzk:null,
	        _rect_mount:null,
	        _rect_fs:null,

			//五大部分
			_client:null,
			_lvs:null,
			_cmAndzk:null,
			_mount:null,
			_fs:null,

			//setting
			_fs_set:null,

       //---------------------CM----------------------------------------
        cm:[],                              //正在运行的CM信息集合                      
		cm_amount:null,                     //正在运行的CM个数
		cm_position:[{ x:"230", y:"80"},    //CM坐标管理集合
					 {x:"310", y:"80"}
					 ],

        cmVisible:false,                    //单击cm信息展示内容
        cm_info:{
				id:null,
				ip:null,
				service:null,
			},

       //---------------------fs----------------------------------------
        fs:[],                            //FS信息集合
        running_fs:[],                    //正在运行的FS信息集合
        fs_amount:null,                   //正在运行的FS个数
        fs_position:[                     //FS坐标管理集合
			{x:"460", y:"5"},
			{x:"460", y:"130"},
			{x:"460", y:"240"},
			{x:"460", y:"350"},
        ],
        fsVisible:false,                  //单击显示FS信息展示内容
        fs_info:{
	        id:null,        //文件系统id
			name:null,		//文件系统名
			type:null,	    //文件系统类型
			mountPath:null,	//文件系统挂载路径
			mountAddr:null,	//文件服务器地址
			mountport:null,	//端口号
			fssize:null,	//存储空间
			fsused:null,	//已用空间
			fsavail:null,	//剩余空间
			fsstate:null,	//文件系统状态
			judge:null,		//是否提供判决服务1:提供判决服务 0：未提供判决服务
			sync:null,		//是否已同步，1：已同步  0：未同步
        },
       
       //---------------------mount----------------------------------------
       mount:[],                           //mount信息集合
       mount_amount:null,                  //所有的mount的数量总和
       mount_position:[                     //mount坐标管理集合
			{x:"210", y:"280"},
			{x:"290", y:"280"},
			{x:"210", y:"350"},
			{x:"290", y:"350"},
       ],
       mountVisible:false,                  //单击显示mount信息展示内容
       mount_info:{
            id:null,         //mounter的id
            os:null,         //操作系统类型
            ip:null,         //mounter的ip
            state:null,      //mounter的状态,与单个挂载节点的state不一致
            online:null,     //表示mounter是否上线，0：下线，1：上线
       },



      



		img_info_client:[
			{width:"50px", height:"50px", x:"5", y:"100", xlink:"../../src/renderer/components/ConfigPage/img/user.jpg"},
			{width:"50px", height:"50px", x:"5", y:"200", xlink:"../../src/renderer/components/ConfigPage/img/client.jpg"},
		],
		img_info_lvs:[
			{width:"50px", height:"50px", x:"110", y:"50", xlink:"../../src/renderer/components/ConfigPage/img/lvs.jpg"},
			{width:"50px", height:"50px", x:"110", y:"250", xlink:"../../src/renderer/components/ConfigPage/img/lvs.jpg"},
		],
		img_info_cmAndzk:[ //最终需要展示的cmAndzk绑定数据集合
			{width:"50px", height:"50px", x:"200", y:"5", xlink:"../../src/renderer/components/ConfigPage/img/zk.jpg"},
			{width:"50px", height:"50px", x:"260", y:"5", xlink:"../../src/renderer/components/ConfigPage/img/zk.jpg"},
			{width:"50px", height:"50px", x:"320", y:"5", xlink:"../../src/renderer/components/ConfigPage/img/zk.jpg"},
		],
		img_info_mount:[],
		img_info_fs:[],

		}
	},


	// 挂载完毕后，即页面基本形成后，会调用下面的内容
	mounted: async function() {
		this.createGraph()

	},

	methods: {

	
		// 创建图像
	 async createGraph() {
		let self = this
        
        //---------------------CM----------------------------------------
        //获取正在运行的CM信息
        this.cm= await fivePart.GetcmInfo() //获取正在运行的CM信息
		this.cm_amount= this.cm.length //获取正在运行的CM个数      
        for (let i=0;i<this.cm_amount;i++) //根据获取的正在运行的CM个数在坐标管理集合中得到最终需要展示的绑定数据集合
		{
			let i_x=this.cm_position[i].x
			let i_y=this.cm_position[i].y

			let img_info={width:"50px", height:"50px", x:i_x, y:i_y, xlink:"../../src/renderer/components/ConfigPage/img/cm.jpg"}
			this.img_info_cmAndzk.push(img_info) //最终需要展示的绑定数据集合
		}
       
        //---------------------FS----------------------------------------
        //获取正在运行的FS信息
        this.fs= await fivePart.GetfsInfo() //获取所有的fs信息                   
        for (let i=0;i<this.fs.length;i++)  //获取正在运行的fs
        {
            if(this.fs[i].fsstate=="running"){
            	this.running_fs.push(this.fs[i])
            }
        }
        this.fs_amount=this.running_fs.length     //获取正在运行的fs的个数
        for(let i=0;i<this.fs_amount;i++)    //根据获取的正在运行的FSs个数在坐标管理集合中得到最终需要展示的绑定数据集合
        {
			let i_x=this.fs_position[i].x
 			let i_y=this.fs_position[i].y

			let img_info={width:"50px", height:"50px", x:i_x, y:i_y, xlink:"../../src/renderer/components/ConfigPage/img/fs.jpg"}
			this.img_info_fs.push(img_info) //最终需要展示的绑定数据集合       	
        }

        //---------------------Mount----------------------------------------    
        //获取所有的Mount信息
        this.mount=  await fivePart.GetmountInfo() //获取所有的Mount信息
        this.mount_amount= this.mount.length //获取正在运行的mount个数
        for (let i=0;i<this.mount_amount;i++) //根据获取的正在运行的mount个数在坐标管理集合中得到最终需要展示的绑定数据集合
		{
			let i_x=this.mount_position[i].x
			let i_y=this.mount_position[i].y

			let img_info={width:"50px", height:"50px", x:i_x, y:i_y, xlink:"../../src/renderer/components/ConfigPage/img/cm.jpg"}
			this.img_info_mount.push(img_info) //最终需要展示的绑定数据集合
		} 


        //绘图
		this._svg=d3.select('.structure')

//---------------------rect-----------------------------------
		this._rect_client= this._svg
		                       .append("rect")
		                       .attr("width",70)
		                       .attr("height",170)
		                       .attr("x",0)
		                       .attr("y",90)
		                       .attr("id","client-wrap")	
		                       .attr("class","rect-wrap")	

		this._rect_lvs= this._svg
		                       .append("rect")
		                       .attr("width",70)
		                       .attr("height",290)
		                       .attr("x",102)
		                       .attr("y",40)
		                       .attr("id","lvs-wrap")	
		                       .attr("class","rect-wrap")

		this._rect_cmAndzk= this._svg
		                       .append("rect")
		                       .attr("width",170)
		                       .attr("height",150)
		                       .attr("x",198)
		                       .attr("y",0)
		                       .attr("id","cm-wrap")	
		                       .attr("class","rect-wrap")

		this._rect_mount= this._svg
		                       .append("rect")
		                       .attr("width",170)
		                       .attr("height",150)
		                       .attr("x",198)
		                       .attr("y",270)
		                       .attr("id","mount-wrap")	
		                       .attr("class","rect-wrap")

		this._rect_fs= this._svg
		                       .append("rect")
		                       .attr("width",70)
		                       .attr("height",455)
		                       .attr("x",450)
		                       .attr("y",0)
		                       .attr("id","fs-wrap")	
		                       .attr("class","rect-wrap")

//-----------------------setting-------------------------------------------------	
		this._fs_set= this._svg.append("image")
					            .attr("width",30)
					            .attr("height",30)
					            .attr("x",487)
					            .attr("y",420)
					            .attr("xlink:href","../../src/renderer/components/ConfigPage/img/set.jpg")
		                        .on('click',function(){
		                       	   self.$router.push({ path: '/auth/errorfs' })
		                        })

//---------------------------image-------------------------------------------------

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
							   .on('click',function(d,i){
														self.cm_info= self.cm[i-3] //i-3扣除绑定数据集中zk的部分读取某个cm的信息
														self.cmVisible = true
						
												})	                       

		this._mount= this._svg.selectAll(".mount")
		                       .data(this.img_info_mount)
		                       .enter().append("image")
		                       .attr("width",function(d){return d.width})
		                       .attr("height",function(d){return d.height})
		                       .attr("x",function(d){return d.x})
		                       .attr("y",function(d){return d.y})
		                       .attr("xlink:href",function(d){return d.xlink})
							   .on('click',function(d,i){	
														self.mount_info= self.mount[i] //读取某个fs的信息
														self.mountVisible = true
						
												})

		this._fs= this._svg.selectAll(".fs")
		                       .data(this.img_info_fs)
		                       .enter().append("image")
		                       .attr("width",function(d){return d.width})
		                       .attr("height",function(d){return d.height})
		                       .attr("x",function(d){return d.x})
		                       .attr("y",function(d){return d.y})
		                       .attr("xlink:href",function(d){return d.xlink})
							   .on('click',function(d,i){	
														self.fs_info= self.running_fs[i] //读取某个fs的信息
														self.fsVisible = true
						
												})
		
		},

		showDitail(){
			// var trytry=d3.selectAll('image')
			console.log("hhh")
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