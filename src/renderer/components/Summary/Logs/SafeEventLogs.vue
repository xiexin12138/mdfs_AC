<template>
  <div style="height:100%">
    <el-row style="height:20%">
      <el-col :span="12" style="height:100%"><div class="logTitle">近期安全日志</div></el-col>
        <el-col :span="12" style="height:100%">
          <div class="logTitleMore" >
            <a href="#">more></a>
          </div>
        </el-col>
    </el-row>
    <el-row style="height:80%">
      <el-col :span="24" style="height:100%">
        <div class="logDetail">
          [2018年9月26日23:34:24]xxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>
          [2018年9月26日23:34:24]xxxxx<br/>
          [2018年9月26日23:34:24]xxxxxxxxxxx<br/>
          [2018年9月26日23:34:24]xxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>
          [2018年9月26日23:34:24]xxxxxxxxx<br/>
        </div>
      </el-col>
    </el-row>
  </div>
  </div>
</template>
<script>
export default {
  name: 'fslogs'
}
</script>
<style media="screen">
.logDetail{
  height: 100%;
  background-color:white;
  border: 1px;
  border-color: #D3D3D3;
  border-style: solid;
  word-break:break-all;
}
.logTitle{
  height: 100%;
  border: 1px;
  border-color: #D3D3D3;
  border-style: solid none none solid;
  background-color: #EEEEEE;
  display: flex;
  align-items: center;
}
.logTitleMore{
  height: 100%;
  border: 1px;
  border-color: #D3D3D3;
  border-style: solid solid none none;
  background-color: #EEEEEE;
  display: flex;
  align-items: center;
}
</style>
