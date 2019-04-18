<template>
	<div>
		<div class="status-force-graph"></div>
		<!-- <el-button type="text" @click="mountVisible = true">点击打开mount</el-button> -->
		<!-- <el-button type="text" @click="userVisible = true">点击打开user</el-button> -->
		<div id="node-other-status" class="node-other-status">
			<svg class="sleeping-status"></svg>
			<hr class="splice-line"/>
			<svg class="shutdown-status"></svg>
		</div>
		<el-dialog
		  title="当前挂载节点信息"
		  :visible.sync="mountVisible"
		  width="25%"
		  center>
		<el-row >
			<el-col :span="10":offset="2"><div style="text-align:right;">主机名:</div></el-col>
			<el-col :span="10" ><div>{{mount.name}}</div></el-col>
		</el-row>
		<el-row >
			<el-col :span="10":offset="2"><div style="text-align:right;">cpu架构信息:</div></el-col>
			<el-col :span="10" ><div>{{mount.cpu}}</div></el-col>
		</el-row>
		<el-row >
			<el-col :span="10":offset="2"><div style="text-align:right;">操作系统类型:</div></el-col>
			<el-col :span="10" ><div>{{mount.os}}</div></el-col>
		</el-row>
		<el-row >
			<el-col :span="10":offset="2"><div style="text-align:right;">节点状态:</div></el-col>
			<el-col :span="10" ><div>{{mount_status}}</div></el-col>
		</el-row>
		<!-- <el-row >
			<el-col :span="10":offset="2"><div style="text-align:right;">状态持续时间:</div></el-col>
			<el-col :span="10" ><div>{{mount.duration}}</div></el-col>
		</el-row> -->
		<el-row >
			<el-col :span="10":offset="2"><div style="text-align:right;">连接用户:</div></el-col>
			<el-col :span="10" ><div>{{mount.user}}</div></el-col>
		</el-row>
	  	<span slot="footer" class="dialog-footer">
	    	<el-button type="danger" @click="manageMount(2)">节点下线</el-button>
	    	<el-button type="danger" @click="manageMount(3)">节点关机</el-button>
	  	</span>
		</el-dialog>
		<el-dialog
		  title="当前用户信息"
		  :visible.sync="userVisible"
		  width="25%"
		  center>
		<el-row >
			<el-col :span="8":offset="2"><div style="text-align:right;">用户名:</div></el-col>
			<el-col :span="8" ><div>{{user.name}}</div></el-col>
		</el-row>
		<el-row >
			<el-col :span="8":offset="2"><div style="text-align:right;">节点ip:</div></el-col>
			<el-col :span="8" ><div>{{user.ip}}</div></el-col>
		</el-row>
		<el-row >
			<el-col :span="8":offset="2"><div style="text-align:right;">节点MAC:</div></el-col>
			<el-col :span="8" ><div>{{user.mac}}</div></el-col>
		</el-row>
		<el-row >
			<el-col :span="8":offset="2"><div style="text-align:right;">登录时长:</div></el-col>
			<el-col :span="8" ><div>{{user.duration}}分钟</div></el-col>
		</el-row>
	  	<span slot="footer" class="dialog-footer">
	    	<el-button type="danger" @click="manageUser(1)">用户禁用</el-button>
	    	<el-button type="danger" @click="manageUser(0)">用户启用</el-button>
	  	</span>
		</el-dialog>

		<el-dialog
		  title="sleeping节点信息"
		  :visible.sync="sleepingVisible"
		  width="25%"
		  center>
		<el-row >
			<el-col :span="8":offset="2"><div style="text-align:right;">主机名:</div></el-col>
			<el-col :span="8" ><div>{{mount.name}}</div></el-col>
		</el-row>
		<el-row >
			<el-col :span="8":offset="2"><div style="text-align:right;">节点状态:</div></el-col>
			<el-col :span="8" ><div>{{mount_status}}</div></el-col>
		</el-row>
		<!-- <el-row >
			<el-col :span="8":offset="2"><div style="text-align:right;">状态持续时间:</div></el-col>
			<el-col :span="8" ><div>{{mount.duration}}分钟</div></el-col>
		</el-row> -->
		<span slot="footer" class="dialog-footer">
	    	<el-button type="danger" @click="manageMount(1)">节点上线</el-button>
	  	</span>
		</el-dialog>

		<el-dialog
		  title="shutdown节点信息"
		  :visible.sync="shutdownVisible"
		  width="25%"
		  center>
		<el-row >
			<el-col :span="8":offset="2"><div style="text-align:right;">主机名:</div></el-col>
			<el-col :span="8" ><div>{{mount.name}}</div></el-col>
		</el-row>
		<el-row >
			<el-col :span="8":offset="2"><div style="text-align:right;">节点状态:</div></el-col>
			<el-col :span="8" ><div>{{mount_status}}</div></el-col>
		</el-row>
		<!-- <el-row >
			<el-col :span="8":offset="2"><div style="text-align:right;">状态持续时间:</div></el-col>
			<el-col :span="8" ><div>{{mount.duration}}分钟</div></el-col>
		</el-row> -->
		
		</el-dialog>
	</div>
</template>
<style>
.node {
	fill: #000;
}

.cursor {
	fill: none;
	stroke: brown;
	pointer-events: none;
}

.link {
}
.node-other-status {
	float: left;
	background: #fff;
	width: 24%;
	height: 600px;
	border: 1px dashed #aaaaaa;
}

.status-force-graph {
	float: left;
	width: 75%;
}
.splice-line {
	height: 1px;
	border: none;
	border-top: 1px dashed #8a8a8a;
}
.sleeping-status {
	height: 50%;
}
.shutdown-status {
}
</style>
<script>
/**
 * 挂载节点和用户的连接情况展示图
 */
import Bar from '@/components/common/Bar'
import { Row, Col, Button, Dialog, Message } from 'element-ui'
import Vue from 'vue'
import d3 from 'd3'
import * as status from '../../../api/status'
let MOUNT = 'mount' // 0
let USER = 'user'

Vue.use(Button)
Vue.use(Dialog)
Vue.use(Row)
Vue.use(Col)



let mountColorA = d3.rgb('#a0c386')
let mountColorB = d3.rgb('#ffc386')
// 上述两个值分别为下述函数的值域0,1
let computeMountColor = d3.interpolate(mountColorA,mountColorB)
// 圆的色彩显示函数，根据type显示颜色
function borderColor(d){
	let Color
	if (d.type == MOUNT) {
		// Color = computeMountColor(Math.random())
		Color = '#00c386'
	} else if (d.type == USER) {
		// Color = '#f2c386'
		Color = '#2b579a'
	}
	return Color
}


export default {
	data() {
		return {
			mountVisible: false,
			userVisible: false,
			sleepingVisible: false,
			shutdownVisible: false,
			mount: {
				id: 0,
				name: 'Mount node2',
				status: 'action',
				duration: '8分钟',
				user: 'guest1、guest2'
			},
			user: {
				id: 0,
				name: 'guest',
				ip: '192.168.1.1',
				mac: '00.as.12.df.3d.4f.23',
				duration: '35分钟'
			},
			timer:null,
			// 这里的数据并没有被初始化
			_svg: null,
			_force: null,
			_nodesAction: null,
			_nodesSleeping: null,
			_nodesReady: null,
			_nodesShutdown: null,
			// _node: null,
			_links: null,
			// _link: null,
			_nodesActionMap: new Map(),
			_nodesAllValidMap: new Map(),
			_nodesAllRemoveMap: new Map(),
			_myPath: [],
			_myNodes: [],
			_myLinks: []
		}
	},
	components: {
		Bar
	},
	computed: {
		mount_status() {
			if (this.mount.status == 1 || this.mount.status == 0) {
				return 'action'
			} else if (this.mount.status == 2) {
				return 'sleeping'
			} else if (this.mount.status == 3) {
				return 'shutdown'
			}
		}
	},
	// 挂载完毕后，即页面基本形成后，会调用下面的内容
	mounted: async function() {
		this.createGraph()
		await this.updateData()
		this.splitNode()
		this.updateGraph()
		// console.log(this._myNodes)
		this.timer = setInterval(async () => {
			await this.updateData()
			this.splitNode()
			this.updateGraph()
		}, 12000)
	},
	destroyed: function(){
		clearInterval(this.timer)
	},
	methods: {
		// 下面两个data函数是改变数据的函数，测试用
		getData: function() {
			this._myNodes = []
		},
		updateData: async function() {
			this._myNodes = await status.GetNodeStatus()
			// console.log(this._myNodes)
		},
		// 每次更新数据之后一定要进行这步操作，分割处理数据
		splitNode: function() {
			// 一下3个可以重新赋值，action不行
			this._nodesReady = []
			this._nodesSleeping = []
			this._nodesShutdown = []
			// 每次更新需要删除的节点
			this._nodesAllRemoveMap = new Map()
			// 数据来源
			let data = this._myNodes
			// 辅助，用来记录本次有效的action节点
			let hash = {}
			// 考虑连接的所有的情况，保证不会出现重复的点，首先将未出现的点加入，再将不需要的点剔除，下面的代码是为了保障剔除效果是消失而不是重绘
			// 将action状态的节点按照type、name和target进行唯一标识
			for (let node of data) {

				switch (node.status) {
					case 'ready':
						this._nodesReady.push(node)
						console.log("this._nodesReady",this._nodesReady)
						break
					case 'sleeping':
						
						if(node.type=="mount"){ //如果休眠的是mount,为防止程序bug,把挂载在其上的用户节点的“显示状态”强行设为休眠（不影响现实用户实际情况）
							for(let inode of data){
								let i = data.indexOf(inode)
								if(inode.target!=inode.name&&inode.target==node.name){
									inode.status="sleeping"
								}
							}
							this._nodesSleeping.push(node)
						    console.log("this._nodesSleeping",this._nodesSleeping)							
						}

						// if(node.type=="mount"){
						// 	this._nodesSleeping.push(node)
						//     console.log("this._nodesSleeping",this._nodesSleeping)
						// }
						break
					case 'shutdown':
						this._nodesShutdown.push(node)
						console.log("this._nodesShutdown",this._nodesShutdown)
						break
					case 'action':
						hash[node.type + node.name + node.target] = 1
						if (
							this._nodesAllValidMap.get(node.type + node.name + node.target) === undefined
						) {
							this._nodesAllValidMap.set(node.type + node.name + node.target,node)
							this._nodesAction.push(node)
							console.log("this._nodesAction",this._nodesAction)
						}
						break
					default:
						break
				}
			}

			// 删除map中需要删除的节点
			for (let node of this._nodesAllValidMap.values()) {
				if (hash[node.type + node.name + node.target] === undefined) {
					this._nodesAllRemoveMap.set(
						node.type + node.name + node.target,
						node
					)
					this._nodesAllValidMap.delete(
						node.type + node.name + node.target
					)
				}
			}
			// 删除nodesAction中需要删除的节点
			for (let node of this._nodesAllRemoveMap.values()) {
				let i = this._nodesAction.indexOf(node)
				//console.log("hhhhh")
				if (i !== -1) {
					this._nodesAction.splice(i, 1)
				}
			}
			// 画线
			this._links = []
			for (let node of this._nodesAllValidMap.values()) {
				if (node.name != node.target) {
					this._links.push({
						source: node,
						target: this._nodesAllValidMap.get(
							MOUNT + node.target + node.target
						)
					})
				}
			}
		},
		// 新建图像
		createGraph: function() {
			let self = this
			this._myLinks = []
			this._myPath = []
			this._nodesAllValidMap = new Map()
			this._force = d3.layout
				.force()
				.size([1000, 800])
				.linkDistance(150)
				.charge(-1000)
				.nodes([])
				.links([])
				.start()
				.on('tick', function() {
					self.tickGraph()
				})
			this._svg = d3
				.select('.status-force-graph')
				.append('svg')
				.attr('width', 1200)
				.attr('height', 800)

			this._nodesAction = this._force.nodes()
			this._links = this._force.links()
			//sleeping nodes 状态标题
			d3
				.select('.sleeping-status')
				.selectAll('text')
				.data('[]')
				.enter()
				.append('text')
				.text('sleeping nodes')                 ///////////////////////////////////////////////////////
				.attr('transform', 'translate(90,32)')
				.attr('font-family', 'Arial')
				.attr('fill', 'black')
				.attr('font-size', '20px')
		    //shutdwon nodes 状态标题
			d3
				.select('.shutdown-status')
				.selectAll('text')
				.data('[]')
				.enter()
				.append('text')
				.text('shutdown nodes')
				.attr('transform', 'translate(90,27)')
				.attr('font-family', 'Arial')
				.attr('fill', 'black')
				.attr('font-size', '20px')
		},
		// 重绘
		updateGraph: function() {
			// console.log(this._myNodes)
			let self = this
			this._svg.selectAll('text').remove()
			d3
				.select('.sleeping-status')
				.selectAll('.shutdown-nodes')
				.remove()
			d3
				.select('.sleeping-status')
				.selectAll('.sleeping-nodes')
				.remove()
			// 根据class删除真实的dom元素，而下面都只是d3的操作，主要是将数据映射到dom上。
			for (let key of this._nodesAllRemoveMap.keys()) {
				this._svg.selectAll('.' + key).remove()
			}
			this._force.nodes(this._nodesAction).links(this._links)
			// 更新需要删除的节点
			this._svg
				.selectAll('.node')
				.data(this._nodesAction)
				.exit()
				.remove()
			// 更新需要增加的节点，设置class（除了node）增加了一个根据node的type+name+target的class
			this._svg
				.selectAll('.node')
				.data(this._nodesAction, function(d) {
					return d.name
				})
				.enter()
				.append('circle')
				.attr('class', function(d) {
					return 'node ' + d.type + d.name + d.target
				})
				.attr('r', function(d) {
					let CircleSize
					if (d.type == MOUNT) {
						//CircleColor="#A254A2";
						CircleSize = 45
					} else if (d.type == USER) {
						CircleSize = 30
					}
					return CircleSize
				})
				.style('stroke', borderColor)
				.style('stroke-width','2')
				.style('fill','#FFF')
				.call(this._force.drag)
				.on('click', function(d) {
					// 未加载时信息为 '加载中...'
					if (d.type === MOUNT) {
						self.mountVisible = true
						self.mount.name = '加载中···'
						self.mount.status = '加载中···'
						self.mount.duration = '加载中···'
						self.mount.user = '加载中···'
						let data = {
							id: d.id
						}
						status
							.GetMountNode(data)
							.then(function(value) {
								self.mount.id = value.id
								self.mount.name = value.name
								self.mount.cpu = value.cpu
								self.mount.os = value.os
								self.mount.status = value.status
								self.mount.duration = value.duration
								self.mount.user = value.user
							})
							.catch(e => {
								Message({
									showClose: true,
									message: e.message,
									type: 'error',
									duration: 2000
								})
							})
					} else {
						self.userVisible = true
						self.user.name = '加载中···'
						self.user.ip = '加载中···'
						self.user.mac = '加载中···'
						self.user.duration = '加载中···'
						let data = {
							id: d.id
						}
						status
							.GetUserNode(data)
							.then(function(value) {
								self.user.id = value.id
								self.user.name = value.name
								self.user.ip = value.ip
								self.user.mac = value.mac
								self.user.duration = value.duration
							})
							.catch(e => {
								Message({
									showClose: true,
									message: e.message,
									type: 'error',
									duration: 2000
								})
							})
					}
				})

			// this._svg
			//     .selectAll('.marker')
			//     .data(this._links)

			this._svg
				.selectAll('marker')
				.data(this._links)
				.enter()
				.append('marker')
				.attr('id', function(d) {
					return d.target.target
				}) //设置箭头id
				//.attr("id", "resolved")
				//.attr("markerUnits","strokeWidth")//设置为strokeWidth箭头会随着线的粗细发生变化
				.attr('markerUnits', 'userSpaceOnUse')
				.attr('viewBox', '0 -5 10 10') //坐标系的区域
				.attr('refX', 40) //箭头坐标
				.attr('refY', 0)
				.attr('markerWidth', 15) //标识的大小
				.attr('markerHeight', 15)
				.attr('orient', 'auto') //绘制方向，可设定为：auto（自动确认方向）和 角度值
				.attr('stroke-width', 5) //箭头宽度
				.append('path')
				.attr('d', 'M0,-5L10,0L0,5') //箭头的路径
				//根据不同组设定箭头颜色
				.attr('fill', function(d) {
					let Color
					if (d.target.target == 'Mount1') {
						Color = '#8FBC8F'
					} else if (d.target.target == 'Mount2') {
						Color = '#DEB887'
					}
					return '#2b579a'
				})

			// 更新需要增加的线段，设置class（除了link）增加了一个根据source的type+name+target的class
			this._svg
				.selectAll('.link')
				.data(this._links)
				.enter()
				.insert('line', '.node')
				.attr('class', function(d) {
					return (
						'link ' +
						d.source.type +
						d.source.name +
						d.source.target
					)
				})
				.style('stroke', function(d) {
					let Color
					if (d.target.target == 'Mount1') {
						Color = '#8FBC8F'
					} else if (d.target.target == 'Mount2') {
						Color = '#DEB887'
					}
					return '#2b579a'
				})
				.style('stroke-width', 1) //线条粗细

				.attr('marker-end', function(d) {
					return 'url(#' + d.target.target + ')'
				}) //根据箭头标记的id号标记箭头

				.on('click', function(d) {
					// console.log(d.target.target)
				})
			// 更新需要删除的线段
			this._svg
				.selectAll('.link')
				.data(this._links)
				.exit()
				.remove()
			//更新需要增加的文字，设置class,与控制node增删的type+name+target的class相同
			this._svg
				.selectAll('.text')
				.data(this._nodesAction)
				.enter()
				.append('text')
				.attr('dy', '.35em')
				.attr('text-anchor', 'middle') //在圆圈中加上数据
				.attr('x', function(d) {
					// console.log(d.name+"---"+ d.name.length);
					var re_en = /[a-zA-Z]+/g
					//如果是全英文，不换行
					if (d.name.match(re_en)) {
						d3
							.select(this)
							.append('tspan')
							.style('font-family',"Microsoft YaHei,SimHei")
							.attr('x', 0)
							.attr('y', 2)
							.text(function() {
								return '用户:'+d.name
							})
					} else if (d.name.length <= 4) {
						//如果小于四个字符，不换行
						d3
							.select(this)
							.append('tspan')
							.attr('x', 0)
							.attr('y', 2)
							.text(function() {
								return d.name
							})
					} else {
						// 挥哥说名字不要断断续续的
						d3
							.select(this)
							.append('tspan')
							.style('font-family',"Microsoft YaHei,SimHei")
							.attr('x', 0)
							.attr('y', 10)
							.text(function() {
								return '挂载节点:'+d.name
							})
					}
				})
				.attr('class', function(d) {
					return 'text ' + d.type + d.name + d.target
				})
			this._force.start()

			//--------------- node other status show ----------------

			//node-info with sleeping status

			//添加 sleeping 状态circle
			d3
				.select('.sleeping-status')
				.selectAll('circle')
				.data(this._nodesSleeping)
				.enter()
				.append('circle')
				.attr('r', 30)
				.attr('class', 'sleeping-nodes')
				.attr('fill', '#dddddd')
				.attr('transform', 'translate(40,50)')
				//控制显示shutdown circle（mount）位置
				.attr('cx', function(d, i) {
					return i * 70
				})
				.attr('cy', function(d) {
					return 50
				})
				.on('click', function(d) {
					//显示mount信息面板，包含id及name
					self.sleepingVisible = true
					self.mount.name = '加载中···'
					self.mount.status = '加载中···'
					self.mount.duration = '加载中···'
					self.mount.user = '加载中···'
					let data = {
						id: d.id
					}
					status
						.GetMountNode(data)
						.then(function(value) {
							self.mount.id = value.id
							self.mount.name = value.name
							self.mount.status = value.status
							self.mount.duration = value.duration
							self.mount.user = value.user
						})
						.catch(e => {
							Message({
								showClose: true,
								message: e.message,
								type: 'error',
								duration: 2000
							})
						})
					//暂用和shutdown一样内容面板，后可根据需求修改
				})
			// d3
			// 	.select('.sleeping-status')
			// 	.selectAll('circle')
			// 	.data(this._nodesSleeping)
			// 	.exit()
			// 	.remove()
			//添加各sleeping nodes的名字
			d3
				.select('.sleeping-status')
				.selectAll('text')
				.data(this._nodesSleeping, function(d) {
					// console.log(d.name)
					return d.name
				})
				.enter()
				.append('text')
				// .attr('class', function(d) {
				// console.log( "sleepingtext"+ d.type + d.name );
				// 	return  "sleepingtext"+ d.type + d.name
				// })
				.text(function(d) {
					return d.name
				})
				.attr('dy', '.35em')
				.attr('text-anchor', 'middle')
				//文字坐标
				.attr('transform', 'translate(40,50)')
				.attr('x', function(d, i) {
					return i * 70
				})
				.attr('y', function(d) {
					return 50
				})
				.attr('class', 'sleeping-nodes')

			//node-info with shutdwon status


			//添加 shutdown 状态circle
			d3
				.select('.shutdown-status')
				.selectAll('circle')
				.data(this._nodesShutdown)
				.enter()
				.append('circle')
				.attr('r', 30)
				.attr('class', 'shutdown-nodes')
				.attr('fill', '#adacac')
				.attr('transform', 'translate(40,50)')
				//控制显示shutdown circle（mount）位置
				.attr('cx', function(d, i) {
					return i * 70
				})
				.attr('cy', function(d) {
					return 50
				})
				.on('click', function(d) {
					//显示mount信息面板，包含id及name

					self.shutdownVisible = true
					self.mount.name = '加载中···'
					self.mount.status = '加载中···'
					self.mount.duration = '加载中···'
					self.mount.user = '加载中···'
					let data = {
						id: d.id
					}
					status
						.GetMountNode(data)
						.then(function(value) {
							self.mount.id = value.id
							self.mount.name = value.name
							self.mount.status = value.status
							self.mount.duration = value.duration
							self.mount.user = value.user
						})
						.catch(e => {
							Message({
								showClose: true,
								message: e.message,
								type: 'error',
								duration: 2000
							})
						})
				})

			//添加各shutdown nodes的名字
			d3
				.select('.shutdown-status')
				.selectAll('text')
				.data(this._nodesShutdown, function(d) {
					// console.log(d.name)
					return d.name
				})
				.enter()
				.append('text')
				// .attr('class', function(d) {
				//             	console.log( "shutdowntext"+ d.type + d.name );
				// 	return  "shutdowntext"+ d.type + d.name
				// })
				.text(function(d) {
					return d.name
				})
				.attr('dy', '.35em')
				.attr('text-anchor', 'middle')
				//文字坐标
				//.attr("transform", "translate(90,60)")
				.attr('transform', 'translate(40,50)')
				.attr('x', function(d, i) {
					return i * 70
				})
				.attr('y', function(d) {
					return 50
				})
				.attr('class', 'shutdown-nodes')

			//----------------------  node other status show end -----------------------
		},
		// tick函数
		tickGraph: function() {
			this._svg
				.selectAll('.link')
				.attr('x1', function(d) {
					return d.source.x
				})
				.attr('y1', function(d) {
					return d.source.y
				})
				.attr('x2', function(d) {
					return d.target.x
				})
				.attr('y2', function(d) {
					return d.target.y
				})

			this._svg
				.selectAll('.node')
				.attr('cx', function(d) {
					return d.x
				})
				.attr('cy', function(d) {
					return d.y
				})
			this._svg.selectAll('text').attr('transform', function(d) {
				return 'translate(' + d.x + ',' + d.y + ')'
			}) //顶点文字坐标
		},
		manageMount(value) {
			let data = {
				id: this.mount.id,
				state: value
			}
			console.log(data,8)
			let self = this
			status
				.ManageMount(data)
				.then(value => {
					self.mountVisible = false
					self.sleepingVisible = false
					Message({
						showClose: true,
						message: '操作成功',
						type: 'success',
						duration: 12000
					})
				})
				.then(() => {
					let name = self.mount.name
					// 找到这个节点
					let node = self._myNodes.find(value => {
						return value.type == MOUNT && value.name == name
					})
					// 删除和这个节点所有相关的点
					self._myNodes = self._myNodes.filter(
						value => value.target != name
					)
					if (value == 2) {
						// sleeping
						node.status = 'sleeping'
					} else if (value == 3) {
						// shutdown
						node.status = 'shutdown'
					} else if (value == 1) {
						node.status = 'action'
					}
					// console.log(node)
					self._myNodes.push(node)
					self.splitNode()
					self.updateGraph()
				})
				.catch(e => {
					Message({
						showClose: true,
						message: e.message,
						type: 'error',
						duration: 2000
					})
				})
		},
		manageUser(value) {
			let data = {
				id: this.user.id,
				state: value
			}
			status
				.ManageUser(data)
				.then(() => {
					Message({
						showClose: true,
						message: '操作成功',
						type: 'success',
						duration: 12000
					})
				})
				.catch(e => {
					Message({
						showClose: true,
						message: e.message,
						type: 'error',
						duration: 2000
					})
				})
		}
	}
}
</script>
