export const permissionList = [
  '概览',
  'FS用户管理--用户管理', 'FS用户管理--组管理', 'FS用户管理--用户密码重置', 'FS用户管理--用户审核',
  '配置管理--文件系统配置', '配置管理--全局证书配置', '配置管理--全局参数配置', '配置管理--系统功能结构', '配置管理--目录管理',
  '监控视图--文件系统监控', '监控视图--节点状态监控', '监控视图--元数据监控',
  '挂载管理--文件系统挂载关系配置', '挂载管理--文件系统挂载关系展示', '挂载管理--挂载节点管理',
  '异常管理--异常文件管理', '异常管理--异常文件系统管理',
  '控制台设置--密码修改', '控制台设置--控制台用户管理', '控制台设置--控制台权限管理', '控制台设置--锁定设置'
]

export const permissionTree = [
  {
    id: 101,
    label: '概览'
  },
  {
    id: 201,
    label: 'FS用户管理',
    children: [{
      id: 202,
      label: '用户管理'
    }, {
      id: 203,
      label: '组管理'
    }, {
      id: 204,
      label: '用户密码重置'
    }, {
      id: 205,
      label: '用户审核'
    }]
  }, {
    id: 301,
    label: '配置管理',
    children: [{
      id: 302,
      label: '文件系统配置'
    }, {
      id: 303,
      label: '全局证书配置'
    }, {
      id: 304,
      label: '全局参数配置'
    }, {
      id: 305,
      label: '系统功能结构'
    }, {
      id: 306,
      label: '目录管理'
    }]
  }, {
    id: 401,
    label: '监控视图',
    children: [{
      id: 402,
      label: '文件系统监控'
    }, {
      id: 403,
      label: '节点状态监控'
    }, {
      id: 404,
      label: '元数据监控'
    }]
  }, {
    id: 501,
    label: '挂载管理',
    children: [{
      id: 502,
      label: '文件系统挂载关系配置'
    }, {
      id: 503,
      label: '文件系统挂载关系展示'
    }, {
      id: 504,
      label: '挂载节点管理'
    }]
  }, {
    id: 601,
    label: '异常管理',
    children: [{
      id: 602,
      label: '异常文件管理'
    }, {
      id: 603,
      label: '异常文件系统管理'
    }]
  }, {
    id: 701,
    label: '控制台设置',
    children: [{
      id: 702,
      label: '密码修改'
    }, {
      id: 703,
      label: '控制台用户管理'
    }, {
      id: 704,
      label: '控制台权限管理',
      disabled: true
    }, {
      id: 705,
      label: '锁定设置'
    }]
  }
]

export const adminPermission = {
  SUMMARY: true,
  FS_USER_MANAGE: {
    indexpage: true,
    // FS用户管理--用户管理
    userlist: true,
    // FS用户管理--组管理
    groupmanage: true,
    // FS用户管理--用户密码重置
    changepassword: true,
    // FS用户管理--用户审核
    useraudit: true,
    // FS用户管理--新建用户
    newuser: true,
    // FS用户管理--新建用户
    updateuser: true,
  },
  CM_CONFIG: {
    indexpage: true,
    // 配置管理--文件系统配置
    filesystem: true,
    // 配置管理--全局证书配置
    cert: true,
    // 配置管理--全局参数配置
    globalpara: true,
    // 配置管理--系统功能结构
    systemstructure: true,
    // 配置管理--目录管理
    creatdir: true,
  },
  MONITOR: {
    indexpage: true,
    // 监控视图--文件系统监控
    fseorror: true,
    // 监控视图--节点状态监控
    nodestatus: true,
    // 监控视图--元数据监控
    edataeorror: true,
  },
  MOUNTER: {
    indexpage: true,
    // 挂载管理--文件系统挂载关系配置
    mountFS: true,
    // 挂载管理--文件系统挂载关系展示
    showfsmount: true,
    // 挂载管理--挂载节点管理
    mountermanage: true,
  },
  AUTH: {
    indexpage: true,
    // 异常管理--异常文件管理
    errorfilemanage: true,
    // 异常管理--异常文件系统管理
    errorfs: true,
  },
  CONSOLE_CONFIG: {
    indexpage: true,
    // 控制台设置--密码修改
    changecuruserpwd: true,
    // 控制台设置--控制台用户管理
    consolepermission: true,
    // 控制台设置--控制台权限管理
    groupmanage: true,
    // 控制台设置--锁定设置
    consolelock: true,
  },
  REPORT: {
    // 系统报表-系统安全报表
    fssafe: true,
  }
}


export const moniterPermission = {
  SUMMARY: true,
  FS_USER_MANAGE: {
    indexpage: true,
    // FS用户管理--用户管理
    userlist: true,
    // FS用户管理--组管理
    groupmanage: true,
    // FS用户管理--用户密码重置
    changepassword: true,
    // FS用户管理--用户审核
    useraudit: true,
    // FS用户管理--新建用户
    newuser: true,
    // FS用户管理--新建用户
    updateuser: true,
  },
  CM_CONFIG: {
    indexpage: true,
    // 配置管理--文件系统配置
    filesystem: true,
    // 配置管理--全局证书配置
    cert: true,
    // 配置管理--全局参数配置
    globalpara: true,
    // 配置管理--系统功能结构
    systemstructure: true,
    // 配置管理--目录管理
    creatdir: true,
  },
  MONITOR: {
    indexpage: true,
    // 监控视图--文件系统监控
    fseorror: true,
    // 监控视图--节点状态监控
    nodestatus: true,
    // 监控视图--元数据监控
    edataeorror: true,
  },
  MOUNTER: {
    indexpage: true,
    // 挂载管理--文件系统挂载关系配置
    mountFS: true,
    // 挂载管理--文件系统挂载关系展示
    showfsmount: true,
    // 挂载管理--挂载节点管理
    mountermanage: true,
  },
  AUTH: {
    indexpage: true,
    // 异常管理--异常文件管理
    errorfilemanage: true,
    // 异常管理--异常文件系统管理
    errorfs: true,
  },
  CONSOLE_CONFIG: {
    indexpage: true,
    // 控制台设置--密码修改
    changecuruserpwd: false,
    // 控制台设置--控制台用户管理
    consolepermission: false,
    // 控制台设置--控制台权限管理
    groupmanage: true,
    // 控制台设置--锁定设置
    consolelock: true,
  },
  REPORT: {
    // 系统报表-系统安全报表
    fssafe: true,
  }
}

export default {
permissionList,
permissionTree,
adminPermission,
moniterPermission,
}
