<template>
  <div>
  <el-row type="flex" class="row-bg" justify="center">
  <el-col style="width:750px;">
  <div class="grid-content">
<!--   <el-row type="flex" justify="end">
      <el-col style="width:75px;">
        <div style="margin-bottom:10px;">
        <el-button type="primary" size="medium" @click="goToDownloadErrorFile" round>下载</el-button>
        </div>
      </el-col>
    </el-row> -->

  <el-table
    stripe
      stripe
    :data="tableData1"
    style="width: 100%">

    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">

          <el-form-item label="mac">
            <span>{{ props.row.mac }}</span>
          </el-form-item>
          <el-form-item label="cpu">
            <span>{{ props.row.cpu }}</span>
          </el-form-item>
          <el-form-item label="mainboard">
            <span>{{ props.row.mainboard }}</span>
          </el-form-item>
          <el-form-item label="os">
            <span>{{ props.row.os }}</span>
          </el-form-item>

        </el-form>
      </template>
    </el-table-column>

    <el-table-column
      label="用户名称"
      prop="username">
    </el-table-column>

    <el-table-column
      label="注册邮箱"
      prop="email">
    </el-table-column>

    <el-table-column
      label="注册IP"
      prop="ip">
    </el-table-column> 

    <el-table-column
      fixed="right"
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="pass(scope.$index,tableData1)"
          type="text"
          size="small">
          √
        </el-button>
        <el-button
          @click.native.prevent="fail(scope.$index,tableData1)"
          type="text"
          size="small">
          ×
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
import * as audit from '../../../api/audit'

Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)

export default {

    data() {
      return {
        timer:null,
                //表内数据
        tableData1: [], //
      }
    },
  mounted: async function() {
    await this.updatePage()  
    console.log()

    this.timer = setInterval(async () => {
      await this.updatePage()
    }, 80000)

  },
  destroyed: function(){
    clearInterval(this.timer)
  },

methods: {
     // 将更新整个页面的功能抽离成一个公共函数
    async updatePage(){
        var tableData = await audit.GetUserAudit()
        // console.log(111,tableData)
        this.tableData1 = tableData

    },

   pass(index, rows) {
            MessageBox.prompt('请设定用户有效期', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',

              //设置输入格式   2018-12-24 16:00:44
              // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
              // inputErrorMessage: '邮箱格式不正确',

            }).then(({ value }) => {

               //反馈信息至后台
              let email= rows[index].email
              let state = '0'
              let reasonmessage =null
              let expire= value
              let result={email,state,reasonmessage,expire}
              
              console.log(result)   
              audit.AuditResult(result)
                    .then(() => {
                       //删除行
                      this.tableData1.splice(index, 1);
                        Message({
                          showClose: true,
                          message: '审核结果已成功提交',
                          type: 'success',
                          duration: 2000
                        })
                      })
                      .catch(e => {s
                        Message({
                          showClose: true,
                          message: e.message,
                          type: 'error',
                          duration: 2000
                        })
                      })

            }).catch(() => {
              Message({
                type: 'info',
                message: '取消输入',
              });
            });

        },

   fail(index, rows) {
            MessageBox.prompt('审核不通过理由', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',

            }).then(({ value }) => {

               //反馈信息至后台
              let email= rows[index].email
              let state = '1'
              let reasonmessage = value
              let expire= null
              let result={email,state,reasonmessage,expire}
              
              console.log(result)   
              audit.AuditResult(result)
                    .then(() => {
                       //删除行
                      this.tableData1.splice(index, 1);
                        Message({
                          showClose: true,
                          message: '审核结果已成功提交',
                          type: 'success',
                          duration: 2000
                        })
                      })
                      .catch(e => {s
                        Message({
                          showClose: true,
                          message: e.message,
                          type: 'error',
                          duration: 2000
                        })
                      })

            }).catch(() => {
              Message({
                type: 'info',
                message: '取消输入',
              });
            });

        },


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
</style>