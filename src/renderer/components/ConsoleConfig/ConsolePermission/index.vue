<template>
<el-container style="height:100%">
  <el-container style="height:100%">
    <el-row class="widthFull">
      <el-col :span="24">
        <el-form ref="form" :model="form" label-width="80px">
          <el-card shadow="never">
            <el-form-item label="用户组">
              <el-select v-model="usergroup" placeholder="请选择用户组">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
              <!--<el-button>新增</el-button>-->
            </el-form-item>
            <el-form-item label="权限" v-if="showTree">
              <!--<el-transfer :titles="['未拥有权限', '已拥有权限']" v-model="permessionValue" :data="data"></el-transfer>-->
              <el-tree :data="permissionTree" show-checkbox node-key="data2.id" :props="defaultProps">
              </el-tree>
              <!--<el-transfer :titles="['未拥有权限', '已拥有权限']" v-model="form.value1" filterable :data="form.permission"></el-transfer>-->
            </el-form-item>
            <el-form-item style="float:right">
                <el-popover
                placement="top-start"
                title="提示"
                width="200"
                trigger="hover"
                content="当前版本修改权限功能未开放，仅供查看当前用户权限">
                  <el-button type="primary" @click="onSubmit" slot="reference" >保存</el-button>
                </el-popover>
            </el-form-item>
          </el-card>
        </el-form>
      </el-col>
    </el-row>
  </el-container>
</el-container>
</template>

<script>
import Vue from 'vue'
import Bar from '@/components/common/Bar'
import Foot from '@/components/common/Foot'
import permission_ from '@/utils/Permission'

export default {
  components: {
    Bar,
    Foot
  },
  data() {
    const generateData = _ => {
      const data = [];
      const permission = ['概览',
        'FS用户管理--用户管理', 'FS用户管理--组管理', 'FS用户管理--用户密码重置', 'FS用户管理--用户审核',
        '配置管理--文件系统配置', '配置管理--全局证书配置', '配置管理--全局参数配置', '配置管理--系统功能结构', '配置管理--目录管理',
        '监控视图--文件系统监控', '监控视图--节点状态监控', '监控视图--元数据监控',
        '挂载管理--文件系统关注关系配置', '挂载管理--文件系统挂在关系展示', '挂载管理--挂载节点管理',
        '异常管理--异常文件管理', '异常管理--异常稳健系统管理',
        '控制台设置--密码修改', '控制台设置--控制台用户管理', '控制台设置--控制台权限管理', '控制台设置--锁定设置'
      ];
      const permissionNo = [101,
        201, 202, 203, 204,
        301, 302, 303, 304, 305,
        401, 402, 403,
        501, 502, 503,
        601, 602,
        701, 702, 703, 704,
      ]
      for (let i = 0; i <= 21; i++) {
        data.push({
          key: permissionNo[i],
          label: permission[i]
        });
      }
      return data;
      /*const permissionList = [];*/
      /*const permission = ['概览',
        'FS用户管理', 'FS用户管理--用户管理', 'FS用户管理--组管理', 'FS用户管理--用户密码重置', 'FS用户管理--用户审核',
        '配置管理', '配置管理--文件系统配置', '配置管理--全局证书配置', '配置管理--全局参数配置', '配置管理--系统功能结构', '配置管理--目录管理',
        '监控视图', '监控视图--文件系统监控', '监控视图--节点状态监控', '监控视图--元数据监控',
        '挂载管理', '挂载管理--文件系统关注关系配置', '挂载管理--文件系统挂在关系展示', '挂载管理--挂载节点管理',
        '异常管理', '异常管理--异常文件管理', '异常管理--异常稳健系统管理' ,
        '控制台设置', '控制台设置--密码修改', '控制台设置--控制台用户管理', '控制台设置--控制台权限管理', '控制台设置--锁定设置'
      ];
      return permission;*/
    };
    return {
      options: [{
        value: '1',
        label: '管理员组'
      }, {
        value: '2',
        label: '监控组'
      }],
      usergroup: '',
      data: generateData(),
      permissionTree: permission_.permissionTree,
      permessionValue: [],
      showTree: false,
      defaultProps: {
        children: 'children',
        label: 'label'
      }
      /*permission: ['概览',
        'FS用户管理', 'FS用户管理--用户管理', 'FS用户管理--组管理', 'FS用户管理--用户密码重置', 'FS用户管理--用户审核',
        '配置管理', '配置管理--文件系统配置', '配置管理--全局证书配置', '配置管理--全局参数配置', '配置管理--系统功能结构', '配置管理--目录管理',
        '监控视图', '监控视图--文件系统监控', '监控视图--节点状态监控', '监控视图--元数据监控',
        '挂载管理', '挂载管理--文件系统关注关系配置', '挂载管理--文件系统挂在关系展示', '挂载管理--挂载节点管理',
        '异常管理', '异常管理--异常文件管理', '异常管理--异常稳健系统管理' ,
        '控制台设置', '控制台设置--密码修改', '控制台设置--控制台用户管理', '控制台设置--控制台权限管理', '控制台设置--锁定设置'
      ],*/
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    }
  },
  mounted: function() {
    console.log("usergroup:["+this.usergroup+"]");
    if (this.usergroup != '') {
      this.showTree = true
    } else {
      this.showTree = false
    }
  },
  watch: {
    usergroup: function(){
      if (this.usergroup != '') {
        this.showTree = true
      } else {
        this.showTree = false
      }
    }
  }
}
</script>
<style media="screen">
.el-transfer-panel {
  width: 300px;
}

.widthFull {
  width: 100%
}
</style>
