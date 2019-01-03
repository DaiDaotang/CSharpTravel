// pages/add_1/plan_check.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    week_day: [{
      week: '日',
      day: 23,
    }, {
      week: '一',
      day: 24
    }, {
      week: '二',
      day: 25,
      k: ''
      //k: 'top-text2'
    }, {
      week: '三',
      day: 26
    }, {
      week: '四',
      day: 27
    }, {
      week: '五',
      day: 28
    }, {
      week: '六',
      day: 29
    }],
    times: [
      {
        name: '01:00',
        class2: ''
      }, {
        name: '03:00',
        class2: ''
      },
      {
        name: '05:00',
        class2: ''
      },
      {
        name: '07:00',
        class2: ''
      },
      {
        name: '09:00',
        class2: ''
      },
      {
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
    xw_kc: [{
      "xq": 0,
      "time_begin": 16,
      "time_last": 3,
      "kcmc": "暮苍梧",
      "more": "和hyy一起去！",
      "bg": 'meishu'
    },
    {
      "xq": 0,
      "time_begin": 5,
      "time_last": 3,
      "kcmc": "朝碧海",
      "more": "叫hyy起床！123456789101112",
      "bg": 'meishu'
    },
    {
      "xq": 2,
      "time_begin": 12,
      "time_last": 1,
      "kcmc": "休息",
      "more": "无人",
      "bg": 'meishu'
    },
    {
      "xq": 5,
      "time_begin": 13.5,
      "time_last": 1,
      "kcmc": "休息",
      "more": "代码打累了",
      "bg": 'meishu'
    },
    {
      "xq": 5,
      "time_begin": 15,
      "time_last": 2,
      "kcmc": "打代码",
      "more": "做查看计划的页面",
      "bg": 'meishu'
    },
    {
      "xq": 5,
      "time_begin": 18,
      "time_last": 4,
      "kcmc": "未定",
      "more": "由你们安排做什么吧",
      "bg": 'meishu'
    },
    ],
    choose: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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