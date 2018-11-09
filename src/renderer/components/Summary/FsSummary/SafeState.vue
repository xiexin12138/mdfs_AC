<template id="">
<div class="" style="height:100%;width:100%">
  <el-row style="height:20%">
    <el-col :span="24" style="height:100%">
      <div class="center safeStateTitle" v-show='fsErr'>
        文件系统　
        <div class="" style="color: red;">
          异常
        </div>
      </div>
      <div class="center safeStateTitle" v-show='!fsErr'>
        文件系统　
        <div class="" style="color:#009900;">
          正常
        </div>
      </div>
    </el-col>
  </el-row>
  <el-row style="height:80%;width:100%;">
    <el-col class="center" :span="8" style="height:100%">
      <!--<div class="repairTitle"><i class="el-icon-time"></i> 修复中</div>-->
      <div class="repairTitle"> 修复中</div>
      <div class="repair" v-show='fsrepairing == undefined'>0</div>
      <div class="repair" v-show='fsrepairing != undefined'>{{fsrepairing}}</div>
      <div class="repairList" v-show='!fsRepairingListNull'>
        // TODO:这里需要改为v-for展示信息
        <a href="#" class="syncListLink"><i class="el-icon-arrow-right"></i> FS1 </a>
      </div>
      <div class="repairList" style='text-align: center;' v-show='fsRepairingListNull'>
        无
      </div>
    </el-col>
    <el-col class="center" :span="8" style="height:100%">
      <!--<div class="syncTitle"><i class="el-icon-refresh"></i> 同步中</div>-->
      <div class="syncTitle"> 同步中</div>
      <div class="sync" v-show='fssyn == undefined'>0</div>
      <div class="sync" v-show='fssyn != undefined'>{{fssyn}}</div>
      <div class="syncList" v-show='!fsSynListNull'>
        <a href="#" class="syncListLink"><i class="el-icon-arrow-right"></i> FS3 </a>
      </div>
      <div class="syncList" style='text-align: center;' v-show='fsSynListNull'>
        无
      </div>
    </el-col>
    <el-col class="center" :span="8" style="height:100%">
      <!--<div class="fsOfflineTitle"><i class="el-icon-circle-close-outline"></i> 已离线</div>-->
      <div class="fsOfflineTitle"> 已离线</div>
      <div class="fsOffline" v-show='fsstop == undefined'>0</div>
      <div class="fsOffline" v-show='fsstop != undefined'>{{fsstop}}</div>
      <div class="syncList" v-show='!fsStopingListNull'>
        <a href="#" class="syncListLink"><i class="el-icon-arrow-right"></i> FS7 <br/></a>
      </div>
      <div class="syncList" style='text-align: center;' v-show='fsStopingListNull'>
        无
      </div>
    </el-col>
  </el-row>
</div>
</template>
<script type="text/javascript">
import { mapState } from 'vuex'
export default {
  name: 'safestate',
  computed: mapState({
    fserrstate: 'fserrstate',
    fsrepairing: 'fsrepairing',
    fsrepairinglist: 'fsrepairinglist',
    fssyn: 'fssyn',
    fssynlist: 'fssynlist',
    fsstop: 'fsstop',
    fsstoplist: 'fsstoplist',
    fsErr(state) {
      if(state.fserrstate == undefined || state.fserrstate == 0)
        return false
      return true
    },
    fsRepairingListNull(state) {
      if(state.fsrepairinglist == undefined || state.fsrepairinglist.length < 1)
        return true
      return false
    },
    fsSynListNull(state) {
      if(state.fssynlist == undefined || state.fssynlist.length < 1)
        return true
      return false
    },
    fsStopingListNull(state) {
      if(state.fsstoplist == undefined || state.fsstoplist.length < 1)
        return true
      return false
    }
  })
}
</script>
<style media="screen">
.center {
  text-align: center;
}

.safeStateTitle {
  border: 1px;
  font-size: 16px;
  border-color: #D3D3D3;
  background-color: #EEEEEE;
  height: 100%;
  border-style: solid solid none solid;
  display: flex;
  align-items: center;
  justify-content: center;
}

.repair {
  font-size: 17px;
  /*padding-bottom: 8px;*/
  height: 10%;
  border: 1px solid;
  border-color: #D3D3D3;
  border-style: none solid solid solid;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.repairTitle {
  font-size: 15px;
  /*padding-top: 5px;*/
  height: 10%;
  border: 1px solid;
  border-color: #D3D3D3;
  border-style: none solid none solid;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sync {
  font-size: 17px;
  /*padding-bottom: 8px;*/
  height: 10%;
  border: 1px solid;
  border-color: #D3D3D3;
  border-style: none solid solid none;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.syncTitle {
  font-size: 15px;
  /*padding-top: 5px;*/
  height: 10%;
  border: 1px solid;
  border-color: #D3D3D3;
  border-style: none solid none none;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fsOffline {
  font-size: 17px;
  /*padding-bottom: 8px;*/
  height: 10%;
  border: 1px solid;
  border-color: #D3D3D3;
  border-style: none solid solid none;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fsOfflineTitle {
  font-size: 15px;
  /*padding-top: 5px;*/
  height: 10%;
  border: 1px solid;
  border-color: #D3D3D3;
  border-style: none solid none none;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.syncListLink {
  color: black;
  text-decoration: none;
}

.syncListLink:hover {
  color: #0A96AD;

}

.repairList {
  font-size: 15px;
  /*padding-top: 5px;*/
  padding-left: 10px;
  padding-right: 10px;
  border: 1px solid;
  border-color: #D3D3D3;
  border-style: none solid solid solid;
  background-color: white;
  text-align: left;
  height: 80%
}

.syncList {
  font-size: 15px;
  /*padding-top: 5px;*/
  padding-left: 10px;
  padding-right: 10px;
  border: 1px solid;
  border-color: #D3D3D3;
  border-style: none solid solid none;
  background-color: white;
  text-align: left;
  height: 80%;
  word-break: break-all;
  overflow: auto;
}

.fsOfflineList {
  font-size: 15px;
  /*padding-top: 5px;*/
  padding-left: 10px;
  padding-right: 10px;
  border: 1px solid;
  border-color: #D3D3D3;
  border-style: none solid solid none;
  background-color: white;
  text-align: left;
  height: 74%
}
</style>
