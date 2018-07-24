<template>
<div>
  <el-row type="flex" class="row-bg" justify="center" >
  <el-col style="width:700px;">
  <!-- <div class="grid-content"> -->

    <el-table
      :data="FSMountTable"
      stripe
      border
      style="width:100%"
      height="300"
      >
      
      <el-table-column
        prop="mounterId"
        label="挂载节点id"
        width="120">
      </el-table-column>
      <el-table-column
        prop="fsId"
        label="文件系统id"
        width="120">
      </el-table-column>
      <el-table-column
        prop="mountAddr"
        label="挂载路径"
        width="150">
      </el-table-column>
      <el-table-column
        prop="judge"
        label="具有判决能力"
        width="150">
      </el-table-column>
      <el-table-column
        prop="sync"
        label="是否同步"
        width="150">
      </el-table-column>
      
    </el-table>
    
    <el-row type="flex" class="row-bg" justify="end">
      <el-col style="width:480px;">
        <div class="divide">
          <el-pagination
            background
            layout="total, prev, pager, next"
            :page-size="pageSize"
            :total="total"
            :current-page="currentPage"
            @current-change="handleCurrentChange">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
    
    <!-- </div> -->
  </el-col>
  </el-row>
</div>
</template>
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
<script>
import {
  Table,
  TableColumn,
  Pagination,
  Button,
  Row,
  Col,
  Message
} from 'element-ui'
import Vue from 'vue'
import * as mounter from '../../api/mounter'
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)

export default {
  data(){
    return {
      FSMountTable:null,
      FSMount:null,
      total:20,
      currentPage:1,
      pageSize:10
    }
  },
  mounted:async function() {
    this.FSMount = await mounter.ShowFSMount()
    this.handleCurrentPage(this.currentPage,this.pageSize)
  },
  methods:{
    handleCurrentChange(val) {
      this.handleCurrentPage(val,this.pageSize)
    },
    // 设置分页效果，
    handleCurrentPage(currentPage,pageSize){
      this.currentPage = currentPage
      this.pageSize = pageSize
      this.total = this.FSMount.length
      let start = (currentPage - 1)*(+pageSize)
      // end超出mounters最大长度的话，也可以正常得出结果
      let end = +currentPage*(+pageSize)
      this.FSMountTable = this.translate(this.FSMount.slice(start,end))
    },
    // 某些字段需要翻译一下
    translate(arr){
      return arr.map(value=>{
        if (value.judge == 1) {
          value.judge = '是'
        } else {
          value.judge = '否'
        }
        if (value.sync == 1) {
          value.sync = '已同步'
        } else {
          value.sync = '未同步'
        }
        return value
      })
    },
  }
}
</script>