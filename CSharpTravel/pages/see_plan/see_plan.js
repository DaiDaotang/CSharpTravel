// pages/plan/plan.js
var util = require("../../utils/util.js")
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    travelId: '',
    week_day: [],
    times: [
      {
        name: '01:00',
        class2: ''
      }, {
        name: '03:00',
        class2: ''
      }, {
        name: '05:00',
        class2: ''
      }, {
        name: '07:00',
        class2: ''
      }, {
        name: '09:00',
        class2: ''
      }, {
        name: '11:00',
        class2: ''
      }, {
        name: '13:00',
        class2: ''
      }, {
        name: '15:00',
        class2: ''
      }, {
        name: '17:00',
        class2: ''
      }, {
        name: '19:00',
        class2: ''
      }, {
        name: '21:00',
        class2: ''
      }, {
        name: '23:00',
        class2: ''
      }]
    ,
    xw_kc: [
    ],
    choose: '',
    text: '',
    startTime: "2018-12-28 00:00:00",
    endTime: "2019-01-02 00:00:00",
    month: '',



  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(app.globalData.travelIdG)
    wx.request({
      url: 'http://localhost:54706/api/TravelDetail/' + app.globalData.travelIdG,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        console.log(res)
        for(var i = 0; i < res.data.length; i++)
        {
          this.setData({
            [`xw_kc[${i}].xq`]: res.data[i].XQ,
            [`xw_kc[${i}].time_begin`]: (res.data[i].StartTime.split(':'))[0],
            [`xw_kc[${i}].time_last`]:res.data[i].KeepTime,
            [`xw_kc[${i}].kcmc`]:res.data[i].EventName,
            [`xw_kc[${i}].more`]: res.data[i].EventDetail,
            [`xw_kc[${i}].bg`]:"meishu"   
          })
        }
        console.log(this.data.xw_kc)
      }
    })

    wx.request({
      url: 'http://localhost:54706/api/Travel/' + app.globalData.travelIdG,
      method: 'GET',
      header: {
        'content_type': 'application/json'
      },
      success: res=>{
        console.log(res)
        var time = res.data[0].starttime;
        var endtime = res.data[0].endtime;
        console.log(time+endtime)
        var time2 = res.data[0].starttime.split('T');
        var endtime2 = res.data[0].endtime.split('T');

        //设置月份
        var s = time2[0].split('-');
        that.data.month = s[1];
        //开始时间和结束时间之间相差几天
        var start_date = new Date(time2[0].replace(/-/g, "/"));
        console.log(start_date);
        var end_date = new Date(endtime2[0].replace(/-/g, "/"));
        var days = end_date.getTime() - start_date.getTime();
        var day = parseInt(days / (1000 * 60 * 60 * 24));
        console.log(day);
        //获得当前日期往后n天的日期和星期
        let date = util.getDates(day + 1, time2[0]);
        console.log(date);
        //循环给数组赋值
        for (var i = 0; i < date.length && i < 7; i++) {
          var str = date[i].time.split('-');
          console.log("日" + str[2]);
          var obj = {
            week: date[i].week,
            day: str[2]
          }
          console.log(obj);
          that.data.week_day.push(obj);
        }
        that.setData({
          week_day: that.data.week_day,
          month: that.data.month,
          'week_day[0].k': 'top-text2'
        })
      }
    })
      
    

  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //验证
    //console.log(app.globalData.name_tag);
    //console.log(app.globalData.more_tag);
    //console.log(app.globalData.time_tag);
    //console.log(app.globalData.time_last_tag);
    if (app.globalData.del == 1) {
      var that = this;
      that.data.xw_kc.splice(app.globalData.id, 1)
      that.setData({
        xw_kc: that.data.xw_kc

      })
      console.log(app.globalData.id);
    }
    if (app.globalData.change == 1) {  //如果是从detail保存后返回的

      let list = app.globalData.time_tag; //获取时间 要转成小数
      let list1 = list.substring(0, 2);   //要截取字段的字符串（小时）
      let list2 = (list.substring(3, 5) * 0.1667).toFixed(0); //截取分钟 转小时
      console.log(list1);
      console.log(list2);
      list = list1 + '.' + list2
      console.log(list);
      if (app.globalData.id != '') {
        let n = app.globalData.id;
        // console.log(n);
        this.setData({
          [`xw_kc[${n}].kcmc`]: app.globalData.name_tag,
          [`xw_kc[${n}].more`]: app.globalData.more_tag,
          [`xw_kc[${n}].time_last`]: app.globalData.time_last_tag,
          [`xw_kc[${n}].time_begin`]: list
        })
      }
      else {
        var obj = {
          kcmc: app.globalData.name_tag,
          more: app.globalData.more_tag,
          time_last: app.globalData.time_last_tag,
          time_begin: list,
          xq: app.globalData.choose,
          bg: 'meishu'
        }
        console.log("新建数据");
        var that = this;
        that.data.xw_kc.push(obj);
        that.setData({
          xw_kc: that.data.xw_kc
        })
      }
    }
    app.globalData.del = 0;
    app.globalData.newData = 0;
    app.globalData.id = '';
    app.globalData.change = 0;
  },
  choose: function (e) {
    var that = this;
    for (var i = 0; i < that.data.week_day.length; i++) {
      that.setData({
        [`week_day[${i}].k`]: ''
      })
    }
    var index = e.currentTarget.dataset.id;
    app.globalData.choose = e.currentTarget.dataset.id;
    that.setData({
      [`week_day[${index}].k`]: 'top-text2',
      //choose: e.currentTarget.dataset.id,
    });
    console.log(index);

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})