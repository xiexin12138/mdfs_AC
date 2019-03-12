import Socket from './socket'
import * as type from './type'

/**
 * @author Craig
 * @version 1.0.0
 * @date    2018-05-03
 * @param   {Object}   param 参数对象，包含一个email值
 * @description 获取发送到邮箱的验证码
 */
export async function GetFSSafeReport(payload) {
  try {
    let obj
    // let a = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    // 本地自测模块
  if (type.LOCAL_TEST) {
      obj = {
        type: 75,
        state: 0,
        errormassage: "",
        info: [{
            id: "10",
            time: "2018-08-16 11:20:07"
          },
          {
            id: "11",
            time: "2018-08-16 11:23:17"
          },
          {
            id: "12",
            time: "2018-08-16 11:23:29"
          },
          {
            id: "13",
            time: "2018-08-16 11:23:30"
          },
          {
            id: "14",
            time: "2018-08-16 11:23:30"
          },
          {
            id: "15",
            time: "2018-08-16 11:23:30"
          },
          {
            id: "16",
            time: "2018-08-16 11:23:31"
          },
          {
            id: "17",
            time: "2018-08-16 11:26:14"
          },
          {
            id: "18",
            time: "2018-09-16 11:20:07"
          },
          {
            id: "19",
            time: "2018-11-04 18:26:56"
          },
          {
            id: "20",
            time: "2018-11-04 18:30:48"
          },
          {
            id: "21",
            time: "2018-11-04 18:35:01"
          },
          {
            id: "22",
            time: "2018-11-04 18:39:42"
          },
          {
            id: "23",
            time: "2018-11-04 18:42:55"
          },
          {
            id: "24",
            time: "2018-11-04 19:00:12"
          },
          {
            id: "25",
            time: "2018-11-04 19:01:39"
          },
          {
            id: "26",
            time: "2018-11-04 19:03:26"
          },
          {
            id: "27",
            time: "2018-11-04 19:08:40"
          },
          {
            id: "28",
            time: "2018-11-05 14:48:49"
          },
          {
            id: "29",
            time: "2018-11-05 14:50:42"
          },
          {
            id: "30",
            time: "2018-11-05 14:54:35"
          },
          {
            id: "31",
            time: "2018-11-05 15:13:51"
          },
          {
            id: "32",
            time: "2018-11-05 15:14:41"
          },
          {
            id: "33",
            time: "2018-11-05 19:07:51"
          },
          {
            id: "34",
            time: "2018-11-15 16:53:29"
          },
          {
            id: "35",
            time: "2018-11-17 10:22:00"
          },
          {
            id: "36",
            time: "2018-11-26 21:33:54"
          },
          {
            id: "37",
            time: "2018-11-26 22:19:40"
          },
          {
            id: "38",
            time: "2018-11-26 22:36:35"
          },
          {
            id: "39",
            time: "2018-11-27 09:59:35"
          },
          {
            id: "40",
            time: "2018-11-27 14:38:57"
          },
          {
            id: "41",
            time: "2018-11-27 14:41:04"
          }
        ]
      }
      /*console.log("payload.data:"+JSON.stringify(payload.data));*/
      /*for (var i = 0; i < obj.info.length; i++) {
        console.log("i:"+i);
        obj.info[i].time = ChangeStrToDate(obj.info[i].time)
        console.log("年份:"+JSON.stringify(obj.info[i].time.getFullYear()));
        console.log("月份:"+JSON.stringify(obj.info[i].time.getMonth()+1));
        console.log("日期:"+JSON.stringify(obj.info[i].time.getDate()));
        console.log("小时:"+JSON.stringify(obj.info[i].time.getHours()));
        console.log("分钟:"+JSON.stringify(obj.info[i].time.getMinutes()));
        console.log("秒数:"+JSON.stringify(obj.info[i].time.getSeconds()));
      }*/
    } else {
      let socket = new Socket()
      let data = {
        type: type.GET_AC_REPORT
      }
      socket.write(JSON.stringify(data))
      let response = await socket.read()
      obj = JSON.parse(response)
    }
    if (obj.state == 0) {
      return obj
    } else {
      throw new Error(obj.errormessage)
    }
  } catch (e) {
    throw new Error(e.toString())
  }
}
