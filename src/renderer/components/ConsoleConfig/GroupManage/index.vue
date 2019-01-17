<template>
<div style="height:100%">
  <el-row type="flex" class="row-bg" justify="center">
    <el-col style="width:900px;">
      <div class="grid-content">
        <el-row type="flex" justify="end">
          <el-col style="width:250px;">
            <div style="margin-bottom:10px;">
              <el-button type="primary" size="medium" @click="goToNewACUser" round>新建</el-button>
              <el-button type="primary" size="medium" @click="deleteACUsers" round>删除</el-button>
              <el-button type="primary" size="medium" @click="goToUpdateACUser" round>修改</el-button>
            </div>
          </el-col>
        </el-row>
        <el-table :data="tableData" stripe border style="width: 100%" height="300" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="50">
          </el-table-column>
          <el-table-column prop="username" label="用户id" width="120">
          </el-table-column>
          <el-table-column prop="status" label="用户名">
          </el-table-column>
          <el-table-column prop="status" label="启用状态">
          </el-table-column>
          <el-table-column prop="expire" label="用户组">
          </el-table-column>
          </el-table-column>
        </el-table>
        <el-row type="flex" class="row-bg" justify="end">
          <el-col style="width:480px;">
            <div class="divide">
              <el-pagination background layout="total, prev, pager, next" :page-size="pageSize" :total="total" :current-page="currentPage" @current-change="handleCurrentChange">
              </el-pagination>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-col>
  </el-row>
</div>
</template>

<script>
import Vue from 'vue'
import Bar from '@/components/common/Bar'
import Foot from '@/components/common/Foot'

export default {
  components: {
    Bar,
    Foot
  }
}
</script>
