<template>
	<div class="wrap">
 		<svg class="structure"></svg>

			<el-dialog
			  title="CM信息"
			  :visible.sync="cmVisible"
			  width="30%"
			  center>
				<el-row >
					<el-col :span="12" ><div style="text-align:right;">ID:</div></el-col>
					<el-col :span="10"><div>{{cm_info.id}}</div></el-col>
				</el-row>
				<el-row >
					<el-col :span="12" ><div style="text-align:right;">IP:</div></el-col>
					<el-col :span="10" ><div>{{cm_info.ip}}</div></el-col>
				</el-row>
				<el-row >
					<el-col :span="12"><div style="text-align:right;">是否主CM:</div></el-col>
					<el-col :span="10" ><div>{{cm_info.service}}</div></el-col>
				</el-row>
			</el-dialog>

			<el-dialog
			  title="FS信息"
			  :visible.sync="fsVisible"
			  width="30%"
			  center>
				<el-row >
					<el-col :span="12" ><div style="text-align:right;">ID :</div></el-col>
					<el-col :span="5"><div>{{fs_info.id}}</div></el-col>
				</el-row>
				<el-row >
					<el-col :span="12" ><div style="text-align:right;">系统名称 :</div></el-col>
					<el-col :span="5" ><div>{{fs_info.name}}</div></el-col>
				</el-row>
				<el-row >
					<el-col :span="12"><div style="text-align:right;">系统类型 :</div></el-col>
					<el-col :span="5" ><div>{{fs_info.type}}</div></el-col>
				</el-row>
				<el-row >
					<el-col :span="12"><div style="text-align:right;">挂载路径 :</div></el-col>
					<el-col :span="5" ><div>{{fs_info.mountPoint}}</div></el-col>
				</el-row>
				<el-row >
					<el-col :span="12"><div style="text-align:right;">服务器地址 :</div></el-col>
					<el-col :span="5" ><div>{{fs_info.mountAddr}}</div></el-col>
				</el-row>
				<el-row >
					<el-col :span="12"><div style="text-align:right;">端口号 :</div></el-col>
					<el-col :span="5" ><div>{{fs_info.mountport}}</div></el-col>
				</el-row>
				<el-row >
					<el-col :span="12"><div style="text-align:right;">存储空间 :</div></el-col>
					<el-col :span="5" ><div>{{fs_info.fssize}}</div></el-col>
				</el-row>
				<el-row >
					<el-col :span="12"><div style="text-align:right;">已用空间 :</div></el-col>
					<el-col :span="5" ><div>{{fs_info.fsused}}</div></el-col>
				</el-row>
				<el-row >
					<el-col :span="12"><div style="text-align:right;">剩余空间 :</div></el-col>
					<el-col :span="5" ><div>{{fs_info.fsavail}}</div></el-col>
				</el-row>
				<el-row >
					<el-col :span="12"><div style="text-align:right;">系统状态 :</div></el-col>
					<el-col :span="5" ><div>{{fs_info.fsstate}}</div></el-col>
				</el-row>
				<el-row >
					<el-col :span="12"><div style="text-align:right;">判决服务 :</div></el-col>
					<el-col :span="5" ><div>{{fs_info.judge}}</div></el-col>
				</el-row>
				<el-row >
					<el-col :span="12"><div style="text-align:right;">同步情况 :</div></el-col>
					<el-col :span="5" ><div>{{fs_info.sync}}</div></el-col>
				</el-row>
			</el-dialog>

			<el-dialog
			  title="Mount信息"
			  :visible.sync="mountVisible"
			  width="30%"
			  center>
				<el-row >
					<el-col :span="12" ><div style="text-align:right;">ID :</div></el-col>
					<el-col :span="10"><div>{{mount_info.id}}</div></el-col>
				</el-row>
				<el-row >
					<el-col :span="12" ><div style="text-align:right;">类型 :</div></el-col>
					<el-col :span="10" ><div>{{mount_info.type}}</div></el-col>
				</el-row>
				<el-row >
					<el-col :span="12"><div style="text-align:right;">IP :</div></el-col>
					<el-col :span="10" ><div>{{mount_info.ip}}</div></el-col>
				</el-row>
				<el-row >
					<el-col :span="12"><div style="text-align:right;">状态 :</div></el-col>
					<el-col :span="10" ><div>{{mount_info.state}}</div></el-col>
				</el-row>
				<el-row >
					<el-col :span="12"><div style="text-align:right;">是否上线 :</div></el-col>
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

	        _line_computer_to_lvs:null,
	        _line_user_to_lvs:null,
	        _line_lvs_to_cm:null,
	        _line_lvs_to_mount:null,
	        _line_cm_to_mount:null,
	        _line_mount_to_fs:null,

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
		cm_position:[{ x:"245", y:"160"},    //CM坐标管理集合
					 {x:"325", y:"160"}
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

	    fsFinalGroup:[], //按ID顺序排序的FS集合
	    fs_img:[], //按ID顺序排序的FS配图数组

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
			{x:"245", y:"360"},
			{x:"325", y:"360"},
			{x:"245", y:"420"},
			{x:"325", y:"420"},
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
			{width:"50px", height:"50px", x:"5", y:"200", xlink:__static+'/img/user.jpg'},
			{width:"50px", height:"50px", x:"5", y:"320", xlink:__static+"/img/client.jpg"},
		],
		img_info_lvs:[
			{width:"50px", height:"50px", x:"110", y:"140", xlink:__static+"/img/lvs.jpg"},
			{width:"50px", height:"50px", x:"110", y:"400", xlink:__static+"/img/lvs.jpg"},
		],
		img_info_cmAndzk:[ //最终需要展示的cmAndzk绑定数据集合
			{width:"50px", height:"50px", x:"225", y:"95", xlink:__static+"/img/zk.jpg"},
			{width:"50px", height:"50px", x:"285", y:"95", xlink:__static+"/img/zk.jpg"},
			{width:"50px", height:"50px", x:"345", y:"95", xlink:__static+"/img/zk.jpg"},
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
		 console.log("cm",this.cm)
        for (let i=0;i<this.cm_amount;i++) //根据获取的正在运行的CM个数在坐标管理集合中得到最终需要展示的绑定数据集合
		{

				     		if( this.cm[i].service=="0"){
									 this.cm[i].service="否"
								}else{
									 this.cm[i].service="是"
							}

			let i_x=this.cm_position[i].x
			let i_y=this.cm_position[i].y

			let img_info={width:"50px", height:"50px", x:i_x, y:i_y, xlink:__static+"/img/cm.jpg"}
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

        //按ID整理FS顺序
        var fsStateGroup=[]
        fsStateGroup.push(this.fs_running)
        fsStateGroup.push(this.fs.fs_ready)
        fsStateGroup.push(this.fs.fs_repairing)
        fsStateGroup.push(this.fs.fs_stop_breakdown)
        fsStateGroup.push(this.fs.fs_stop_running)
        fsStateGroup.push(this.fs.fs_stop_repairing)
        //console.log("fsStateGroup555",fsStateGroup)

        // var fsFinalGroup=[]
        for(let fsgroup in fsStateGroup){
        	if(fsStateGroup[fsgroup].length!=0){
        		console.log(77,fsStateGroup[fsgroup])
        		for(let fs in fsStateGroup[fsgroup]){
		        	if(fsStateGroup[fsgroup][fs].id==1){
		        		this.fsFinalGroup[0]=fsStateGroup[fsgroup][fs]
		        	}
		        	if(fsStateGroup[fsgroup][fs].id==2){
		        		this.fsFinalGroup[1]=fsStateGroup[fsgroup][fs]
		        	}
		        	if(fsStateGroup[fsgroup][fs].id==3){
		        		this.fsFinalGroup[2]=fsStateGroup[fsgroup][fs]
		        	}
		        	if(fsStateGroup[fsgroup][fs].id==4){
		        		this.fsFinalGroup[3]=fsStateGroup[fsgroup][fs]
		        	}
		        	if(fsStateGroup[fsgroup][fs].id==5){
		        		this.fsFinalGroup[4]=fsStateGroup[fsgroup][fs]
		        	}
		        	if(fsStateGroup[fsgroup][fs].id==6){
		        		this.fsFinalGroup[5]=fsStateGroup[fsgroup][fs]
		        	}
		        	//console.log(fsStateGroup[fsgroup][fs].id)
        		}
        	}
        	
        }
       //console.log("fsFinalGroup666",this.fsFinalGroup)

       //按ID整理FS配图
       for(var i in this.fsFinalGroup){
       	     //console.log(888,this.fsFinalGroup[i].fsstate)
       	     if(this.fsFinalGroup[i].fsstate=='正在判决'){
       	     	this.fs_img[i]=__static+"/img/fs.jpg"
       	     }
       	     if(this.fsFinalGroup[i].fsstate=='准备'){
       	     	this.fs_img[i]=__static+"/img/fs_sync.png"
       	     }
       	     if(this.fsFinalGroup[i].fsstate=='修复中'){
       	     	this.fs_img[i]=__static+"/img/fs_repair.png"
       	     }
       	     if(this.fsFinalGroup[i].fsstate=='宕机等异常造成的离线'){
       	     	this.fs_img[i]=__static+"/img/fs_stop.png"
       	     }
       	     if(this.fsFinalGroup[i].fsstate=='无法修复导致的离线'){
       	     	this.fs_img[i]=__static+"/img/fs_stop.png"
       	     }
       	     if(this.fsFinalGroup[i].fsstate=='异常过多导致的离线'){
       	     	this.fs_img[i]=__static+"/img/fs_stop.png"
       	     }
       	     //console.log(222,this.fs_img[i])
       }
      // console.log("this.fs_img999",this.fs_img)

        //---------------------Mount----------------------------------------
        //获取所有的Mount信息
        this.mount=  await fivePart.GetmountInfo() //获取所有的Mount信息
        console.log(6565,this.mount)
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

			let img_info={width:"50px", height:"50px", x:i_x, y:i_y, xlink:__static+"/img/cm.jpg"}
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

		this._rect_lvs= this._svg
		                       .append("rect")
		                       .attr("width",87)
		                       .attr("height",415)
		                       .attr("x",93)
		                       .attr("y",85)
		                       .attr("id","lvs-wrap")
		                       .attr("class","rect-wrap")
		                       .attr("rx",10)
		                       .attr("ry",10)	              

		this._rect_cmAndzk= this._svg
		                       .append("rect")
		                       .attr("width",170)
		                       .attr("height",150)
		                       .attr("x",225)
		                       .attr("y",85)
		                       .attr("id","cm-wrap")
		                       .attr("class","rect-wrap")
		                       .attr("rx",10)
		                       .attr("ry",10)

		this._rect_mount= this._svg
		                       .append("rect")
		                       .attr("width",170)
		                       .attr("height",150)
		                       .attr("x",225)
		                       .attr("y",350)
		                       .attr("id","mount-wrap")
		                       .attr("class","rect-wrap")
		                       .attr("rx",10)
		                       .attr("ry",10)

		this._rect_fs= this._svg
		                       .append("rect")
		                       .attr("width",182)		                       	
		                       .attr("height",150)
		                       .attr("x",450)
		                       .attr("y",350)
		                       .attr("id","fs-wrap")
		                       .attr("class","rect-wrap")
		                       .attr("rx",10)
		                       .attr("ry",10)

//------------------------------line---------------------------------------------
		this._line_user_to_lvs= this._svg
									.append("line")
									.attr("x1",55)
									.attr("y1",225)
									.attr("x2",93)
									.attr("y2",292.5)
									.attr("stroke","#BEBEBE")

        this._line_computer_to_lvs=this._svg
									.append("line")
									.attr("x1",55)
									.attr("y1",345)
									.attr("x2",93)
									.attr("y2",292.5)
									.attr("stroke","#BEBEBE")
		this._line_lvs_to_cm= this._svg
									.append("line")
									.attr("x1",180)
									.attr("y1",165)
									.attr("x2",225)
									.attr("y2",165)
									.attr("stroke","#BEBEBE")	
		this._line_lvs_to_mount= this._svg
									.append("line")
									.attr("x1",180)
									.attr("y1",425)
									.attr("x2",225)
									.attr("y2",425)
									.attr("stroke","#BEBEBE")	
		this._line_cm_to_mount= this._svg
									.append("line")
									.attr("x1",310)
									.attr("y1",235)
									.attr("x2",310)
									.attr("y2",350)
									.attr("stroke","#BEBEBE")
        this._line_mount_to_fs= this._svg
									.append("line")
									.attr("x1",395)
									.attr("y1",425)
									.attr("x2",450)
									.attr("y2",425)
									.attr("stroke","#BEBEBE")     
//------------------------------text---------------------------------------------
        var _text_lvs_ca= this._svg
                           .append("text")
                           .attr("x",110)
                           .attr("y",210)
                           .attr("font-size",15)
                           .text("LVS-CA")

        var _text_lvs_data= this._svg
                           .append("text")
                           .attr("x",100)
                           .attr("y",470)
                           .attr("font-size",15)
                           .text("LVS-DATA")

        var _text_cm= this._svg
                           .append("text")
                           .attr("x",260)
                           .attr("y",225)
                           .attr("font-size",15)
                           .text("CM集群(包含zk)")

        var _text_mount= this._svg
                           .append("text")
                           .attr("x",265)
                           .attr("y",490)
                           .attr("font-size",15)
                           .text("Mount节点群")

        var _text_fs= this._svg
                           .append("text")
                           .attr("x",510)
                           .attr("y",490)
                           .attr("font-size",15)
                           .text("FS POOL")
//-----------------------setting-------------------------------------------------
		// this._fs_set= this._svg.append("image")
		// 			            .attr("width",30)
		// 			            .attr("height",30)
		// 			            .attr("x",470)
		// 			            .attr("y",572)
		// 			            .attr("xlink:href",__static+"/img/set.jpg")
		//                         .on('click',async function(){
		//                        	   // self.$router.push({ path: '/auth/errorfs' })
		//                        	   self.FSpool_info= await fivePart.GetfsPool() //获取fspool信息
		//                        	   self.FSpoolVisible=true
		//                         })


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


		// this._fs_running= this._svg.selectAll(".fs_running")
		//                        .data(this.fs_running)
		//                        .enter().append("image")
		//                        .attr("width",50)
		//                        .attr("height",50)
		//                        .attr("x",function(d,i){return 460+i*55})
		//                        .attr("y",function(d,i){return 10})
		//                        .attr("xlink:href",__static+"/img/fs.jpg")
		// 					   .on('click',function(d,i){
		// 												self.fs_info= self.fs_running[i] //读取某个fs的信息
		// 												self.fsVisible = true
		// 										})
		// this._fs_ready= this._svg.selectAll(".fs_ready")
		//                        .data(this.fs_ready)
		//                        .enter().append("image")
		//                        .attr("width",50)
		//                        .attr("height",50)
		//                        .attr("x",function(d,i){return 460+i*55})
		//                        .attr("y",function(d,i){return 106})
		//                        .attr("xlink:href",__static+"/img/fs_sync.png")
		// 					   .on('click',function(d,i){
		// 												self.fs_info= self.fs_ready[i] //读取某个fs的信息
		// 												self.fsVisible = true

		// 										})

		// this._fs_repairing= this._svg.selectAll(".fs_repairing")
		//                        .data(this.fs_repairing)
		//                        .enter().append("image")
		//                        .attr("width",50)
		//                        .attr("height",50)
		//                        .attr("x",function(d,i){return 460+i*55})
		//                        .attr("y",function(d,i){return 207})
		//                        .attr("xlink:href",__static+"/img/fs_repair.png")
		// 					   .on('click',function(d,i){
		// 												self.fs_info= self.fs_repairing[i] //读取某个fs的信息
		// 												self.fsVisible = true
		// 										})

		// this._fs_stop_breakdown= this._svg.selectAll(".fs_stop_breakdown")
		//                        .data(this.fs_stop_breakdown)
		//                        .enter().append("image")
		//                        .attr("width",50)
		//                        .attr("height",50)
		//                        .attr("x",function(d,i){return 460+i*55})
		//                        .attr("y",function(d,i){return 308})
		//                        .attr("xlink:href",__static+"/img/fs_stop.png")
		// 					   .on('click',function(d,i){
		// 												self.fs_info= self.fs_stop_breakdown[i] //读取某个fs的信息
		// 												self.fsVisible = true

		// 										})

		// this._fs_stop_running= this._svg.selectAll(".fs_stop_running")
		//                        .data(this.fs_stop_running)
		//                        .enter().append("image")
		//                        .attr("width",50)
		//                        .attr("height",50)
		//                        .attr("x",function(d,i){return 460+i*55})
		//                        .attr("y",function(d,i){return 409})
		//                        .attr("xlink:href",__static+"/img/fs_stop.png")
		// 					   .on('click',function(d,i){
		// 												self.fs_info= self.fs_stop_running[i] //读取某个fs的信息
		// 												self.fsVisible = true
		// 										})

		// this._fs_stop_repairing= this._svg.selectAll(".fs_stop_repairing")
		//                        .data(this.fs_stop_repairing)
		//                        .enter().append("image")
		//                        .attr("width",50)
		//                        .attr("height",50)
		//                        .attr("x",function(d,i){return 460+i*55})
		//                        .attr("y",function(d,i){return 505})
		//                        .attr("xlink:href",__static+"/img/fs_stop.png")
		// 					   .on('click',function(d,i){
		// 												self.fs_info= self.fs_stop_repairing[i] //读取某个fs的信息
		// 												self.fsVisible = true
												// })

		var finalFS= this._svg.selectAll(".fs_final")
		                       .data(this.fsFinalGroup)
		                       .enter().append("image")
		                       .attr("width",50)
		                       .attr("height",50)
		                       .attr("x",function(d,i){
		                       	if(i<=2){		              
		                       	 	return 460+i*55	 
		                       	}else{
		                       		return 460+(i-3)*55	
		                       	}
		                       })
		                       .attr("y",function(d,i){
		                       	 if(i<=2){
		                       	 	return 360
		                       	 }else{
		                       	 	return 420
		                       	 }
		                       	 
		                       })
		                       .attr("xlink:href",function(d,i){
		                       	         return self.fs_img[i]
		                       })
							   .on('click',function(d,i){
														self.fs_info= self.fsFinalGroup[i] //读取某个fs的信息
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
	width:700px;
	margin-left: 18%;
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
