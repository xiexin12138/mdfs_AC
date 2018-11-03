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
					<el-col :span="5" ><div>{{fs_info.mountPoint}}</div></el-col>
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

			<el-dialog
			  title="文件系统池信息"
			  :visible.sync="FSpoolVisible"
			  width="30%"
			  center>
              	<el-row >
					<el-col :span="10"><div style="text-align:right;">文件系统总数量:</div></el-col>
					<el-col :span="10" ><div>{{FSpool_info.fsnumber}}</div></el-col>
				</el-row>
              	<el-row >
					<el-col :span="17"><div style="text-align:right;">可用存储空间（最小文件系统为准:</div></el-col>
					<el-col :span="5" ><div>{{FSpool_info.fs_avail_size}}</div></el-col>
				</el-row>

						  <el-table
						    :data="FSpool_info.fs_running"
						    border
						    style="width: 100%">
						    <el-table-column
						      fixed
						      prop="name"
						      label="fs_running"
						      width="150">
						    </el-table-column>
						    <el-table-column>
						      <template slot-scope="scope">
						        <el-button @click="fsIDtoInfo(scope.$index,FSpool_info.fs_running)" type="text" size="small">查看</el-button>
						        <el-button type="text" size="small">移除</el-button>
						      </template>
						    </el-table-column>

						  </el-table>
						  <el-table
						    :data="FSpool_info.fs_ready"
						    border
						    style="width: 100%">
						    <el-table-column
						      fixed
						      prop="name"
						      label="fs_ready"
						      width="150">
						    </el-table-column>
						    <el-table-column>
						      <template slot-scope="scope">
						        <el-button @click="fsIDtoInfo(scope.$index,FSpool_info.fs_ready)" type="text" size="small">查看</el-button>
						        <el-button type="text" size="small">移除</el-button>
						      </template>
						    </el-table-column>
						  </el-table>

						  <el-table
						    :data="FSpool_info.fs_repairing"
						    border
						    style="width: 100%">
						    <el-table-column
						      fixed
						      prop="name"
						      label="fs_repairing"
						      width="150">
						    </el-table-column>
						    <el-table-column>
						      <template slot-scope="scope">
						        <el-button @click="fsIDtoInfo(scope.$index,FSpool_info.fs_repairing)" type="text" size="small">查看</el-button>
						        <el-button type="text" size="small">移除</el-button>
						      </template>
						    </el-table-column>
						  </el-table>

						  <el-table
						    :data="FSpool_info.fs_stopping"
						    border
						    style="width: 100%">
						    <el-table-column
						      fixed
						      prop="name"
						      label="fs_stopping"
						      width="150">
						    </el-table-column>
						    <el-table-column>
						      <template slot-scope="scope">
						        <el-button @click="fsIDtoInfo(scope.$index,FSpool_info.fs_stopping)" type="text" size="small">查看</el-button>
						        <el-button type="text" size="small">修复</el-button>
						        <el-button type="text" size="small">移除</el-button>
						      </template>
						    </el-table-column>
						  </el-table>
                
                <el-row style="text-align:center;margin-top:10px;">
					<el-button @click="addFS()" type="primary" round size="small">新增文件系统</el-button>
				</el-row>
			</el-dialog>


	</div>
</template>

<script>

import {Button, Dialog, Message, Card } from 'element-ui'
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

			_fs_running:null,
			_fs_ready:null,
			_fs_repairing:null,
			_fs_stop_breakdown:null,
			_fs_stop_running:null,
			_fs_stop_repairing:null,


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
	    fs_running: [],		    //正在判决 类型的文件系统
		fs_ready: [],			//准备 类型的文件系统id列表
		fs_repairing: [],			//修复 类型的文件系统id列表
	    fs_stop_breakdown: [],	//宕机等异常造成的离线 类型的文件系统id列表 
	    fs_stop_running: [],     //无法修复导致的离线 类型的文件系统id列表
	    fs_stop_repairing: [],	   //异常过多导致的离线修复类型的文件系统id列表

        fsVisible:false,                  //单击显示FS信息展示内容
        fs_info:{
	        id:null,        //文件系统id
			name:null,		//文件系统名
			type:null,	    //文件系统类型
			mountPoint:null,	//文件系统挂载路径
			mountAddr:null,	//文件服务器地址
			mountport:null,	//端口号
			fssize:null,	//存储空间
			fsused:null,	//已用空间
			fsavail:null,	//剩余空间
			fsstate:null,	//文件系统状态
			judge:null,		//是否提供判决服务1:提供判决服务 0：未提供判决服务
			sync:null,		//是否已同步，1：已同步  0：未同步
        },

       //---------------------FSpool----------------------------------------
       fsPool:[],
       FSpoolVisible:false,               //单击显示文件系统池整体信息
       FSpool_info:{
       	    // fsnumber:null,
            // fs_running:[],
            // fs_ready:[],
            // fs_repairing:[],
            // fs_stopping:[],
            // fs_avail_size:null,      //文件系统池可用的存储空间（最小文件系统为准）
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

				     		if( this.cm[i].service=="0"){
									 this.cm[i].service="否"
								}else{
									 this.cm[i].service="是"
							}
				     	
			let i_x=this.cm_position[i].x
			let i_y=this.cm_position[i].y

			let img_info={width:"50px", height:"50px", x:i_x, y:i_y, xlink:"../../src/renderer/components/ConfigPage/img/cm.jpg"}
			this.img_info_cmAndzk.push(img_info) //最终需要展示的绑定数据集合
		}
       
        //---------------------FS----------------------------------------
        //获取正在运行的FS信息
        this.fs= await fivePart.GetfsInfo() //获取所有的fs信息
        this.fs_running= this.translateFS(this.fs.fs_running)
        this.fs_ready=  this.translateFS(this.fs.fs_ready)
        this.fs_repairing=  this.translateFS(this.fs.fs_repairing)
        this.fs_stop_breakdown= this.translateFS(this.fs.fs_stop_breakdown)
        this.fs_stop_running=  this.translateFS(this.fs.fs_stop_running)
        this.fs_stop_repairing= this.translateFS(this.fs.fs_stop_repairing)


        //---------------------Mount----------------------------------------    
        //获取所有的Mount信息
        this.mount=  await fivePart.GetmountInfo() //获取所有的Mount信息     
        this.mount_amount= this.mount.length //获取正在运行的mount个数
        // this.mount= this.translateMount(this.mount)
        for (let i=0;i<this.mount_amount;i++) //根据获取的正在运行的mount个数在坐标管理集合中得到最终需要展示的绑定数据集合
		{   
			       
				     		if( this.mount[i].online=="0"){
									 this.mount[i].online="下线"
								}else{
									 this.mount[i].online="上线"
							}
				     	
			let i_x=this.mount_position[i].x
			let i_y=this.mount_position[i].y

			let img_info={width:"50px", height:"50px", x:i_x, y:i_y, xlink:"../../src/renderer/components/ConfigPage/img/cm.jpg"}
			this.img_info_mount.push(img_info) //最终需要展示的绑定数据集合
		} 


        //绘图
		this._svg=d3.select('.structure')

//---------------------rect-----------------------------------
		// this._rect_client= this._svg
		//                        .append("rect")
		//                        .attr("width",70)
		//                        .attr("height",170)
		//                        .attr("x",0)
		//                        .attr("y",90)
		//                        .attr("id","client-wrap")	
		//                        .attr("class","rect-wrap")	

		// this._rect_lvs= this._svg
		//                        .append("rect")
		//                        .attr("width",70)
		//                        .attr("height",290)
		//                        .attr("x",102)
		//                        .attr("y",40)
		//                        .attr("id","lvs-wrap")	
		//                        .attr("class","rect-wrap")

		// this._rect_cmAndzk= this._svg
		//                        .append("rect")
		//                        .attr("width",170)
		//                        .attr("height",150)
		//                        .attr("x",198)
		//                        .attr("y",0)
		//                        .attr("id","cm-wrap")	
		//                        .attr("class","rect-wrap")

		// this._rect_mount= this._svg
		//                        .append("rect")
		//                        .attr("width",170)
		//                        .attr("height",150)
		//                        .attr("x",198)
		//                        .attr("y",270)
		//                        .attr("id","mount-wrap")	
		//                        .attr("class","rect-wrap")

		// this._rect_fs= this._svg
		//                        .append("rect")
		//                        .attr("width",70)
		//                        .attr("height",455)
		//                        .attr("x",450)
		//                        .attr("y",0)
		//                        .attr("id","fs-wrap")	
		//                        .attr("class","rect-wrap")

//-----------------------setting-------------------------------------------------	
		this._fs_set= this._svg.append("image")
					            .attr("width",30)
					            .attr("height",30)
					            .attr("x",470)
					            .attr("y",572)
					            .attr("xlink:href","../../src/renderer/components/ConfigPage/img/set.jpg")
		                        .on('click',async function(){
		                       	   // self.$router.push({ path: '/auth/errorfs' })
		                       	   self.FSpool_info= await fivePart.GetfsPool() //获取fspool信息		                       
		                       	   self.FSpoolVisible=true
		                        })

		     //                           FSpool_info:{
       // 	    fsnumber:null,
       //      fs_running:[],
       //      fs_ready:[],
       //      fs_repairing:[],
       //      fs_stopping:[],
       //      fs_avail_size:null,      //文件系统池可用的存储空间（最小文件系统为准）
       // },

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

     
		this._fs_running= this._svg.selectAll(".fs_running")
		                       .data(this.fs_running)
		                       .enter().append("image")
		                       .attr("width",50)
		                       .attr("height",50)
		                       .attr("x",function(d,i){return 460+i*55})
		                       .attr("y",function(d,i){return 5})
		                       .attr("xlink:href","../../src/renderer/components/ConfigPage/img/fs.jpg")
							   .on('click',function(d,i){	
														self.fs_info= self.fs_running[i] //读取某个fs的信息
														self.fsVisible = true					
												})
		this._fs_ready= this._svg.selectAll(".fs_ready")
		                       .data(this.fs_ready)
		                       .enter().append("image")
		                       .attr("width",50)
		                       .attr("height",50)
		                       .attr("x",function(d,i){return 460+i*55})
		                       .attr("y",function(d,i){return 100})
		                       .attr("xlink:href","../../src/renderer/components/ConfigPage/img/fs.jpg")
							   .on('click',function(d,i){	
														self.fs_info= self.fs_ready[i] //读取某个fs的信息
														self.fsVisible = true		

												})	

		this._fs_repairing= this._svg.selectAll(".fs_repairing")
		                       .data(this.fs_repairing)
		                       .enter().append("image")
		                       .attr("width",50)
		                       .attr("height",50)
		                       .attr("x",function(d,i){return 460+i*55})
		                       .attr("y",function(d,i){return 200})
		                       .attr("xlink:href","../../src/renderer/components/ConfigPage/img/fs.jpg")
							   .on('click',function(d,i){	
														self.fs_info= self.fs_repairing[i] //读取某个fs的信息
														self.fsVisible = true					
												})	

		this._fs_stop_breakdown= this._svg.selectAll(".fs_stop_breakdown")
		                       .data(this.fs_stop_breakdown)
		                       .enter().append("image")
		                       .attr("width",50)
		                       .attr("height",50)
		                       .attr("x",function(d,i){return 460+i*55})
		                       .attr("y",function(d,i){return 300})
		                       .attr("xlink:href","../../src/renderer/components/ConfigPage/img/fs.jpg")
							   .on('click',function(d,i){	
														self.fs_info= self.fs_stop_breakdown[i] //读取某个fs的信息
														self.fsVisible = true	
																	
												})	

		this._fs_stop_running= this._svg.selectAll(".fs_stop_running")
		                       .data(this.fs_stop_running)
		                       .enter().append("image")
		                       .attr("width",50)
		                       .attr("height",50)
		                       .attr("x",function(d,i){return 460+i*55})
		                       .attr("y",function(d,i){return 400})
		                       .attr("xlink:href","../../src/renderer/components/ConfigPage/img/fs.jpg")
							   .on('click',function(d,i){	
														self.fs_info= self.fs_stop_running[i] //读取某个fs的信息
														self.fsVisible = true					
												})	

		this._fs_stop_repairing= this._svg.selectAll(".fs_stop_repairing")
		                       .data(this.fs_stop_repairing)
		                       .enter().append("image")
		                       .attr("width",50)
		                       .attr("height",50)
		                       .attr("x",function(d,i){return 460+i*55})
		                       .attr("y",function(d,i){return 500})
		                       .attr("xlink:href","../../src/renderer/components/ConfigPage/img/fs.jpg")
							   .on('click',function(d,i){	
														self.fs_info= self.fs_stop_repairing[i] //读取某个fs的信息
														self.fsVisible = true					
												})	



		},

	 async fsIDtoInfo(index, rows) {
	        let fs_id= rows[index].id
	         // console.log(fs_id)  
	         // console.log(rows[index].id) 
	        let fsByID =await fivePart.GetfsById(fs_id)	
	        console.log(fsByID)       
	        this.fs_info=fsByID
	        this.fsVisible=true
	     },

	 addFS(){
          console.log("新增一个文件系统")
	   },

     translateFS(param){
     	for(let i=0;i<param.length;i++){
     		if(param[i].judge=="1"){
					param[i].judge="提供判决服务"
				}else{
					param[i].judge="未提供判决服务"
				}
			if(param[i].sync=="1"){
					param[i].sync="已同步"
				}else{
					param[i].sync="未同步"
				}
			if(param[i].fsstate=="0"){
				param[i].fsstate="正在判决"
			}
			if(param[i].fsstate=="1"){
				param[i].fsstate="准备"
			}
			if(param[i].fsstate=="2"){
				param[i].fsstate="修复中"
			}
			if(param[i].fsstate=="3"){
				param[i].fsstate="宕机等异常造成的离线"
			}
			if(param[i].fsstate=="4"){
				param[i].fsstate="无法修复导致的离线"
			}
			if(param[i].fsstate=="5"){
				param[i].fsstate="异常过多导致的离线"
			}
     	}
     	return param			  	
	  },
     
     translateCM(param){


     },

    //  translateMount(param){
    //     for(let i=0;i<this.mount_amount;i++){
    //  		if(param[i].online=="0"){
				// 	param[i].online="下线"
				// }else{
				// 	param[i].online="上线"
				// }
    //  	}
    //  },

	}


}
</script>

<style>
.structure{
	height:600px;
	width:6000px;	
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