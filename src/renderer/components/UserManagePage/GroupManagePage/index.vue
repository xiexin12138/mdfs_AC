<template>
<div>
  <el-row type="flex" class="row-bg" justify="center">

  <!-- 组列表 -->	
  <el-col style="width:350px;">
 	<!-- <el-row type="flex" justify="center">组列表</el-row> -->
    <el-table
      ref="singleTable"
      highlight-current-row
      :data="tableData1"
      stripe
      border
      style="width: 100%"
      height="300">

      <el-table-column
        prop="date"
        label="组群id"
        width="85">
      </el-table-column>
      <el-table-column
        prop="name"
        label="组群名称"
        width="120">
      </el-table-column>  
    <el-table-column
      fixed="right"
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData1)"
          type="text"
          size="small">
          删除
        </el-button>
        <el-button
          @click.native.prevent="RenameGroup(scope.$index, tableData1)"
          type="text"
          size="small">
          重命名
        </el-button>
      </template>
    </el-table-column>  
    </el-table>

    <!-- 组管理操作按钮 -->
    <el-row type="flex" justify="end">
      <el-col style="width:250px;">
        <div style="margin-bottom:10px;">
        <el-button type="primary" size="medium" @click="CreatGroup(tableData1)" round>新建</el-button>
        </div>
      </el-col>
    </el-row>

  </el-col>

 <el-col style="width:100px;">
 </el-col>

<!-- 组内成员 -->
  <el-col style="width:250px;">
<!--  	<el-row type="flex" justify="center">组内成员</el-row> -->
    <el-table
      ref="GroupUsersTable"
      :data="tableData2"
      stripe
      border
      style="width: 100%"
      height="300"
      @selection-change="handleSelectionChange_group">

      <el-table-column
        type="selection"
        width="50">       
      </el-table-column>

      <el-table-column
        prop="name"
        label="组内成员"
        width="150">
      </el-table-column> 

    </el-table>

  </el-col>

<!-- 组内用户管理操作按钮 -->
 <el-col style="width:100px;">
 	<el-row type="flex" justify="center">
         <el-button type="primary" size="medium" @click="AddChoose()" round>添加</el-button>		
 	</el-row>
 	<el-row type="flex" justify="center">
        <el-button type="primary" size="medium"  @click="DeleteChoose()" round>删除</el-button> 		
 	</el-row>
 </el-col>


<!-- 用户列表 -->
  <el-col style="width:250px;">
<!--  	<el-row type="flex" justify="center">可选用户</el-row> -->
    <el-table
      ref="UsersTable"
      :data="tableData3"
      stripe
      border
      style="width: 100%"
      height="300"
      @selection-change="handleSelectionChange_user">
      <el-table-column
        type="selection"
        width="50">
      </el-table-column>
      <el-table-column
        prop="name"
        label="可选用户"
        width="150">
      </el-table-column> 
    
    </el-table>

  </el-col>
  </el-row>
</div>	

</template>

<script>
import {
  Table,
  TableColumn,
  Pagination,
  Button,
  Row,
  Col,
  Message,
  MessageBox,

} from 'element-ui'
import Vue from 'vue'

Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
// Vue.use(Message)
// Vue.use(MessageBox)

export default {

 data() {
      return {
      	
        multipleSelection_groupmember: [],
        multipleSelection_user: [],

      	//表内数据
        tableData1: [{
          date: '2016-05-03',
          name: '王虎',
        }, {
          date: '2016-05-02',
          name: '王小虎',
        }, {
          date: '2016-05-04',
          name: '王小虎',
        }, {
          date: '2016-05-01',
          name: '王小虎',
        }, {
          date: '2016-05-08',
          name: '王小虎',
        }, {
          date: '2016-05-06',
          name: '王小虎',
        }, {
          date: '2016-05-07',
          name: '王小虎',
        }],

        tableData2: [{
          name: 'A',
        }, {
          name: 'B',
        }, {
          name: 'C',
        }],

        tableData3: [{
          name: 'D',
        }, {
          name: 'E',
        }, {
          name: 'F',
        }, {
          name: 'G',
        }],
      }
    },




    methods: {

     //删除组
      deleteRow(index, rows) {
        rows.splice(index, 1);

      },
     //新建组
     CreatGroup(table){
        var list = {
          date: "1",
          name: "二哈"
      }
        table.unshift(list)   	
     },

     //重命名组
     RenameGroup(index, rows){
        MessageBox.prompt('请输入新组名', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',

          //设置输入格式
          // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          // inputErrorMessage: '邮箱格式不正确',

           beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';

              //反馈更名信息至后台
              console.log("new name now")

              setTimeout(() => {
                done();
                //将按钮恢复成原样
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 300);
              }, 3000);
            } else {
              done();
            }
          }

        }).then(({ value }) => {
          //反馈成功信息
          Message({
            type: 'success',
            message: rows[index].name+' 组的名字已更新为：'+ value
          });
          //将表格中替换为新组名
          rows[index].name=value
        }).catch(() => {
          Message({
            type: 'info',
            message: '取消输入'
          });       
        });
      },


      //删除某组内全部用户

      DeleteChoose(){
        //获取勾选行index
        let row_index='';
        let choosen=[];

        this.multipleSelection_groupmember.forEach((value,index,array)=>{
        	   //将选择对象从组内成员表中移除
        		this.tableData2.forEach((v,i,a)=>{
        			if(value.name==v.name){
        				row_index=i
        				this.deleteRow(row_index,this.tableData2) //执行对应行相关操作
        			}
        		})
        		//将选择对象添加至用户列表中
		        if(choosen.indexOf(value)==-1){
		         	choosen.push(value)
			        let list = {
			          name: value.name
			         };
			         this.tableData3.unshift(list)
		         }

        })

      },

      //添加用户列表中全部用户至某组中
      AddChoose(){
        let row_index='';
        let choosen=[];

        this.multipleSelection_user.forEach((value,index,array)=>{
        	//将选择对象添加至组内成员表中
	        if(choosen.indexOf(value)==-1){
	         	choosen.push(value)
		        let list = {
		          name: value.name
		         };
		         this.tableData2.unshift(list)
	         }
            //将选择对象从用户列表中移除
        	this.tableData3.forEach((v,i,a)=>{
        			if(value.name==v.name){
        				row_index=i
        				this.deleteRow(row_index,this.tableData3) //执行对应行相关操作
        			}
        		})
        })

      },

      //处理组内成员列表多选
	     handleSelectionChange_group(val) {
	      // 选中的都是一整行数据
	      this.multipleSelection_groupmember = val

	    },

      //处理用户列表多选
	     handleSelectionChange_user(val) {
	      // 选中的都是一整行数据
	      this.multipleSelection_user = val

	    },

    },

   


    
  }
</script>

<style>
.divide {
  margin: 20px 0;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}	
</style>