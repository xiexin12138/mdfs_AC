import * as type from './type'
import Socket from './socket'
/**
 * @author Sam
 * @version 1.0.0
 * @date    2018-10-21
 * @description 获取所有监控的信息
 */
export async function GetSummary() {
  try {
    let socket = new Socket()
    let data = {
      type: type.GET_SUMMARY
    }
    socket.write(JSON.stringify(data))
    let response = await socket.read()
    let obj = JSON.parse(response)
    /*let Mock = require('mockjs')
    let obj = Mock.mock({
    	"type": "54",
    	"state": "0",
    	"errormassage": "",
    	"fsState": {
    		"fsSum": "6",
    		"fsOnlineNum": "3",
    		"fsReadyNum": "3"
    	},
    	"mounterState": {
    		"mounterSum": "5",
    		"mounterOnlineNum": "2",
    		"mounterOfflineNum": "3"
    	},
    	"fsErrStatus": {
    		"fsErrState": "0",
    		"fsRepairingNum": "3",
    		"fsRepairingList": [{
    			"id": "1",
    			"fsName": "fs1"
    		}, {
    			"id": "2",
    			"fsName": "fs2"
    		}, {
    			"id": "3",
    			"fsName": "fs3"
    		}],
    		"fsSyncNum": "2",
    		"fsSynList": [{
    				"id": "1",
    				"fsName": "fs1"
    			},
    			{
    				"id": "2",
    				"fsName": "fs2"
    			}
    		],
    		"fsStopNum": "2",
    		"fsStopList": [{
    				"id": "1",
    				"fsName": "fs1"
    			},
    			{
    				"id": "2",
    				"fsName": "fs2"
    			}
    		]
    	},
    	"userInfo": {
    		"userSum": "66",
    		"userOnlineNum": "2",
    		"userFreezeNum": "3"
    	},
    	"fsCapacity": {
    		"fsSize|1-50000.1": 100.0,
    		"fsUsed|1-50000.1": 60.0,
    		"fsAvail|1-50000.1": 40.0
    	}
    })*/
    // 没有出错则为0
    if (obj.state == 0 || obj.type != 64) {
      return obj
    } else {
      throw new Error(obj.errormessage)
    }
  } catch (e) {
    throw new Error(e.toString())
  }
}

/**
 * @author Sam
 * @version 1.0.0
 * @date    2018-10-21
 * @description 获取所有监控的信息
 */
export async function getMdfsStateData() {
  let obj = {}
  try {
    if (type.LOCAL_TEST) {
      let Mock = require('mockjs')
      obj = Mock.mock({
        "state|0-1": 0,
        "errorMessage": "",
        "mdfsInfo": {
          "mdfsStatus": "0", //运行状态(是否正常运行) "0"表示正常运行，"1"表示运行异常
          "mdfsStorage": 192000, //存储容量
          "mdfsAvailable": 185451, //可用容量
          "mdfsMntPath": "/mnt/mdfs", //挂载路径
          "upLinkSpeed|0-19999.2": 1.00, //实时上行速率，单位为k/s
          "downLinkSpeed|0-19999.2": 1.00, //实时下行速率，单位为k/s
        }
      })
    } else {
      let socket = new Socket()
      let data = {
        type: type.GET_SUMMARY
      }
      socket.write(JSON.stringify(data))
      let response = await socket.read()
      obj = JSON.parse(response)
      // 没有出错则为0
    }
    if (obj.state == 0 || obj.type != 64) {
      return obj
    } else {
      throw new Error(obj.errormessage)
    }
  } catch (e) {
    throw new Error(e.toString())
  }
}

/**
 * @author Sam
 * @version 1.0.0
 * @date    2018-10-21
 * @description 获取所有监控的信息
 */
export async function getBottomFsStateData() {
  let obj = {}
  try {
    if (type.LOCAL_TEST) {
      let Mock = require('mockjs')
      obj = Mock.mock({
        "state|0-1": 0,
        "errorMessage": "",
        "fsInfo": [{
          'bottomFsId|+1': 6,
          "fsStatus|0-1": 0, //运行状态(是否正常运行) "0"表示正常运行，"1"表示运行异常
          "fsStorage": 192000, //存储容量
          "fsAvailable": 185451, //可用容量
          "fsType": 'ext4',
          "fsMntPath": "/mnt/mdfs", //挂载路径
        }, {
          "bottomFsId|+1": 406,
          "fsStatus|0-1": 0, //运行状态(是否正常运行) "0"表示正常运行，"1"表示运行异常
          "fsStorage": 192000, //存储容量
          "fsAvailable": 185451, //可用容量
          "fsType": 'ext4',
          "fsMntPath": "/mnt/mdfs", //挂载路径
        }, {
          "bottomFsId|+1": 1,
          "fsStatus|0-1": 0, //运行状态(是否正常运行) "0"表示正常运行，"1"表示运行异常
          "fsStorage": 192000, //存储容量
          "fsAvailable": 185451, //可用容量
          "fsType": 'ext4',
          "fsMntPath": "/mnt/mdfs", //挂载路径
        }]
      })
    } else {
      let socket = new Socket()
      let data = {
        type: type.GET_SUMMARY
      }
      socket.write(JSON.stringify(data))
      let response = await socket.read()
      obj = JSON.parse(response)
    }
    // 没有出错则为0
    let infoList = obj.fsInfo
    for (var i = 0; i < infoList.length; i++) {
      if (infoList[i].fsStatus == 0 || infoList[i].fsStatus == "0" ) {
        infoList[i].fsStatus = "正常"
      } else {
        infoList[i].fsStatus = "异常"
      }
    }
    obj.fsInfo = infoList
    if (obj.state == 0 || obj.type != 64) {
      return obj
    } else {
      throw new Error(obj.errormessage)
    }
  } catch (e) {
    throw new Error(e.toString())
  }
}

/**
 * @author Sam
 * @version 1.0.0
 * @date    2018-10-21
 * @description 获取所有监控的信息
 */
export async function GetPieCapacity() {
  try {
    let socket = new Socket()
    let data = {
      type: type.GET_SUMMARY
    }
    socket.write(JSON.stringify(data))
    let response = await socket.read()
    let obj = JSON.parse(response)
    /*let Mock = require('mockjs')
    let obj = Mock.mock({
    	"type": "54",
    	"state": "0",
    	"errormassage": "",
    	"fsState": {
    		"fsSum": "6",
    		"fsOnlineNum": "3",
    		"fsReadyNum": "3"
    	},
    	"mounterState": {
    		"mounterSum": "5",
    		"mounterOnlineNum": "2",
    		"mounterOfflineNum": "3"
    	},
    	"fsErrStatus": {
    		"fsErrState": "0",
    		"fsRepairingNum": "3",
    		"fsRepairingList": [{
    			"id": "1",
    			"fsName": "fs1"
    		}, {
    			"id": "2",
    			"fsName": "fs2"
    		}, {
    			"id": "3",
    			"fsName": "fs3"
    		}],
    		"fsSyncNum": "2",
    		"fsSynList": [{
    				"id": "1",
    				"fsName": "fs1"
    			},
    			{
    				"id": "2",
    				"fsName": "fs2"
    			}
    		],
    		"fsStopNum": "2",
    		"fsStopList": [{
    				"id": "1",
    				"fsName": "fs1"
    			},
    			{
    				"id": "2",
    				"fsName": "fs2"
    			}
    		]
    	},
    	"userInfo": {
    		"userSum": "66",
    		"userOnlineNum": "2",
    		"userFreezeNum": "3"
    	},
    	"fsCapacity": {
    		"fsSize|1-99999.1": 10.0,
    		"fsUsed|1-50000.1": 6.0,
    		"fsAvail|1-50000.1": 4.0
    	}
    })*/
    // 没有出错则为0
    if (obj.state == 0 || obj.type != 64) {
      return obj.fsCapacity
    } else {
      throw new Error(obj.errormessage)
    }
  } catch (e) {
    throw new Error(e.toString())
  }
}

/**
 * @author Sam
 * @version 1.0.0
 * @date    2019-3-15
 * @description 获取mdfs状态监控的信息
 */
export async function GetMDFsStateSummary() {
  try {
    let socket = new Socket()
    let data = {
      type: type.GET_MDFS_STATE
    }
    socket.write(JSON.stringify(data))
    let response = await socket.read()
    let obj = JSON.parse(response)
    if (type.LOCAL_TEST) {
      let Mock = require('mockjs')
      let obj = Mock.mock({
        "type": "76",
        "state": "0",
        "errormassage": "",
        "mdfsInfo": {
          "mdfsStatus": "正常",
          "mdfsStorage": "28.419002532958984",
          "mdfsAvailable": "12.22768783569336",
          "mdfsMntPath": "/mnt/fs1",
          "upLinkSpeed|0.00-99999.99": 0,
          "downLinkSpeed|0.00-99999.99": 0
        }
      })
    }
    // 没有出错则为0
    if (obj.state == 0 || obj.type != 64) {
      return obj
    } else {
      throw new Error(obj.errormessage)
    }
  } catch (e) {
    throw new Error(e.toString())
  }
}

/**
 * @author Sam
 * @version 1.0.0
 * @date    2019-3-15
 * @description 获取底层fs状态监控的信息
 */
export async function GetBottomFsStateSummary() {
  try {
    let socket = new Socket()
    let data = {
      type: type.GET_BOTTOM_FS_STATE
    }
    socket.write(JSON.stringify(data))
    let response = await socket.read()
    let obj = JSON.parse(response)
    if (type.LOCAL_TEST) {

    }
    // 没有出错则为0
    if (obj.state == 0 || obj.type != 64) {
      return obj
    } else {
      throw new Error(obj.errormessage)
    }
  } catch (e) {
    throw new Error(e.toString())
  }
}
