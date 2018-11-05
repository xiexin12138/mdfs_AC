<template>
<div style="height:100%">
  <el-row style="height:10%">
    <el-col :span="12" style="height:100%">
      <div class="logTitle">近期系统日志</div>
      <!--<div class="logTitle">近期文件系统日志</div>-->
    </el-col>
    <el-col :span="12" style="height:100%">
      <div class="logTitleMore">
        <a href="#">more></a>
      </div>
    </el-col>
  </el-row>
  <el-row style="height:90%">
    <el-col :span="24" style="height:100%">
      <div class="logDetail" v-show='!isNull'>
        {{ logs }}
      </div>
      <div class="logDetail" v-show='isNull'>
        [2018年9月26日23:34:24]xxxxxxxxxxx<br/>
        [2018年9月26日23:34:24]xxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>
        [2018年9月26日23:34:24]xxxxxxxxxxx<br/>
        [2018年9月26日23:34:24]xxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>
        [2018年9月26日23:34:24]xxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>
        [2018年9月26日23:34:24]xxxxx<br/>
        [2018年9月26日23:34:24]xxxxxxxxxxx<br/>
        [2018年9月26日23:34:24]xxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>
        [2018年9月26日23:34:24]xxxxxxxxx<br/>
        [2018年9月26日23:34:24]xxxxxxxxxxx<br/>
        [2018年9月26日23:34:24]xxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>
        [2018年9月26日23:34:24]xxxxxxxxxxx<br/>
        [2018年9月26日23:34:24]xxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>
        [2018年9月26日23:34:24]xxxxxxxxxxx<br/>
        [2018年9月26日23:34:24]xxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>
        [2018年9月26日23:34:24]xxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>
        [2018年9月26日23:34:24]xxxxx<br/>
        [2018年9月26日23:34:24]xxxxxxxxxxx<br/>
        [2018年9月26日23:34:24]xxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>
        [2018年9月26日23:34:24]xxxxxxxxx<br/>
        [2018年9月26日23:34:24]xxxxxxxxxxx<br/>
        [2018年9月26日23:34:24]xxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>
        [2018年9月26日23:34:24]xxxxxxxxxxx<br/>
        [2018年9月26日23:34:24]xxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>
        [2018年9月26日23:34:24]xxxxxxxxxxx<br/>
        [2018年9月26日23:34:24]xxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>
        [2018年9月26日23:34:24]xxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>
        [2018年9月26日23:34:24]xxxxx<br/>
        [2018年9月26日23:34:24]xxxxxxxxxxx<br/>
        [2018年9月26日23:34:24]xxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>
        [2018年9月26日23:34:24]xxxxxxxxx<br/>
        [2018年9月26日23:34:24]xxxxxxxxxxx<br/>
        [2018年9月26日23:34:24]xxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>
        </div>
    </el-col>
  </el-row>
</div>
</div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'fslogs',
  computed: mapState({
    logs: 'logs',
    isNull(state) {
      if(state.logs == undefined || state.logs.length < 1)
        return true
      return false
    }
  })

}
</script>
<style media="screen">
.logDetail {
  height: 100%;
  background-color: white;
  border: 1px;
  border-color: #D3D3D3;
  border-style: solid;
  word-break: break-all;
  overflow: auto;
  padding-left: 10px;
  padding-right: 10px;
}

.logTitle {
  height: 100%;
  border: 1px;
  border-color: #D3D3D3;
  border-style: solid none none solid;
  background-color: #EEEEEE;
  display: flex;
  align-items: center;
  padding-left: 20px
}

.logTitleMore {
  height: 100%;
  border: 1px;
  border-color: #D3D3D3;
  border-style: solid solid none none;
  background-color: #EEEEEE;
  display: flex;
  align-items: center;
}
</style>
