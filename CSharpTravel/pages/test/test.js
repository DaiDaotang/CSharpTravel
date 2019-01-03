//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    newLists: [],

    time: '',
    place: ''
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      wx.request({
        url: 'http://localhost:54706/api/Travel',
        method: "GET",
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res)
        }
      }),
        this.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true
        })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  //Travel
  //addTravel
  addTravelBox: function(e) {
    const that = this;
    wx.request({
      url: 'http://localhost:54706/api/Travel',
      method: "POST",
      data: {
        UserId: "asd",
        Time: e.detail.value.traveltime,
        Place: e.detail.value.travelplace
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("success")
      }
    })
  },
  //getTravel
  gettravel:function() {
    wx.request({
      url: 'http://localhost:54706/api/Travel',
      method: "GET",
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
      }
    })
  },
  //show travel
  showTravelBox:function(e) {
    var that = this;
    wx.request({
      url: 'http://localhost:54706/api/Travel/',
      method: "GET",
      data: {
        id: e.detail.value.travelid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res),
        that.setData({
          place: res.traveldetails.Place
        })
      }
    })
  },
  //delete travel
  deleteTravelBox: function(e) {
    wx.request({
      url: 'http://localhost:54706/api/Travel/' + e.detail.value.travelid,
      method: "DELETE",
      data: {
        
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("success")
      }
    })
  }

  //Strategy
  //add strategy
  //show strategy
  //search strategy
  //update strategy
  //delete strategy
})
