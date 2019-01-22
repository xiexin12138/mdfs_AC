<template>
	<div>
  <el-row type="flex" class="row-bg" justify="center">
  <el-col style="width:750px;">

  <div class="grid-content">
    <el-row type="flex" justify="begin">
      <div style="margin-bottom:20px;">
      <el-switch
        style="display: block"
        v-model="sendEmail"
        active-color="#13ce66"
        inactive-color="#ff4949"
        active-text="异常告警启用"
        inactive-text="异常告警关闭"
        @change="ChangeIfSendEmail()">
      </el-switch>  
    </div>
    </el-row>
    <el-row type="flex" justify="end">
        <el-button type="primary" size="medium" @click="addEmail(tableData1)" round class="btn-operation">新建</el-button>
    </el-row>

  <el-table
    stripe
      stripe
    :data="tableData1"
    style="width: 100%">


    <el-table-column
      label="#ID"
      prop="id"
      width="120">
    </el-table-column>

    <el-table-column
      label="异常告警接收邮箱"
      prop="email">
    </el-table-column>

    <el-table-column
      label="使用状态"
      prop="status">
    </el-table-column> 

    <el-table-column
      fixed="right"
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button
          v-if="scope.row.status=='禁用'"
          @click.native.prevent="changestatus(scope.$index,tableData1,1)"
          type="text"
          size="small">
          启用
        </el-button>
        <el-button
          v-if="scope.row.status=='启用'"
          @click.native.prevent="changestatus(scope.$index,tableData1,0)"
          type="text"
          size="small">
          禁用
        </el-button>
        <el-button
          @click.native.prevent="deleteEmail(scope.$index,tableData1,0)"
          type="text"
          size="small">
          删除
        </el-button>
      </template>
    </el-table-column>

  </el-table>

      </div>
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
import * as errorNotify from '../../api/errorNotify'

Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)

export default {

    data() {
      return {
        // timer:null,
      	      	//表内数据
        tableData1: [], //
        sendEmail: null,
      }
    },
  mounted: async function() {
    await this.updatePage()  
    console.log()

    // this.timer = setInterval(async () => {
    //   await this.updatePage()
    // }, 5000)

  },
  destroyed: function(){
    clearInterval(this.timer)
  },

methods: {
     // 将更新整个页面的功能抽离成一个公共函数
    async updatePage(){
    var DataAll= await errorNotify.Getemails()
 		var tableData = DataAll.email
        tableData.forEach((value,index,array)=>{
        		//status转换
		        if(value.status==0){
		        	value.status='禁用'
		         }
		         if(value.status==1){
		        	value.status='启用'
		         }
        })

        this.tableData1 = tableData
        this.sendEmail =  !!DataAll.sendEmail

    },

	 async changestatus(index, rows,operate) {
	        let email_id= rows[index].id
	        // console.log(email_id)   
	        await errorNotify.ChangeStatus(email_id,operate)
	        .then(() => {
	          Message({
	            showClose: true,
	            message: '操作成功',
	            type: 'success',
	            duration: 2000
	          })
          // rows[index].fsstate='repairing'
	        })
	        .catch(e => {
	          Message({
	            showClose: true,
	            message: e.message,
	            type: 'error',
	            duration: 2000
	          })
                    if(e.message=="Error: 您已在另一地点登录，请重新登录！"){
                     this.$router.push({ path: '/'})
                    }
	        })

	      },
   async deleteEmail(index, rows) {
          let email_id= rows[index].id
          // console.log(email_id)   
          await errorNotify.DeleteEmail(email_id)
          .then(() => {
            Message({
              showClose: true,
              message: '操作成功',
              type: 'success',
              duration: 2000
            })
          // 删除行
          rows.splice(index, 1)
          })
          .catch(e => {
            Message({
              showClose: true,
              message: e.message,
              type: 'error',
              duration: 2000
            })
                    if(e.message=="Error: 您已在另一地点登录，请重新登录！"){
                     this.$router.push({ path: '/'})
                    }
          })

        },

     //添加email
     addEmail(table){

        MessageBox.prompt('请输入Email地址', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',

          //设置输入格式
          // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          // inputErrorMessage: '邮箱格式不正确',
        }).then(({ value }) => {

              //反馈更名信息至后台
              console.log(value)
              errorNotify.AddEmail(value)
               .then(() => {
                    Message({
                      showClose: true,
                      message: '成功添加新email：'+ value,
                      type: 'success',
                      duration: 2000
                    })
                        //将新组在表格中显示出来
                      var list = {
                          id: "#",
                          email: value,
                          status:"禁用"
                      }
                        table.unshift(list)
                  })
                  .catch(e => {
                   // console.log(555,e.message)       
                    Message({
                      showClose: true,
                      message: e.message,
                      type: 'error',
                      duration: 2000
                    })
                    if(e.message=="Error: 您已在另一地点登录，请重新登录！"){
                     this.$router.push({ path: '/'})
                    }

                  })
        }).catch(() => {
          Message({
            type: 'info',
            message: '取消输入'
          });
        });
     },

  ChangeIfSendEmail(){
    let emailSendStatus =Number(this.sendEmail)
    errorNotify.ChangeEmailSendStatus(emailSendStatus)
                   .then(() => {
                    Message({
                      showClose: true,
                      message: '成功操作',
                      type: 'success',
                      duration: 2000
                    })
                  })
                  .catch(e => {
                   // console.log(555,e.message)       
                    Message({
                      showClose: true,
                      message: e.message,
                      type: 'error',
                      duration: 2000
                    })
                    if(e.message=="Error: 您已在另一地点登录，请重新登录！"){
                     this.$router.push({ path: '/'})
                    }
                  })
  }

	}
  

  }

</script>

<style>
 .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

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
.btn-operation{
  position: absolute;
  top: -45px;
  left: 666px;
/*  z-index: 500;
  background-color:transparent;
  color: #66b1ff;
  border: none;
  font-size: 23px;
  font-weight:bold;
  height: 40px;*/
  text-align: center;
}

</style>