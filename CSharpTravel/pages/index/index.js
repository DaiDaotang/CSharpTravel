//index.js
//获取应用实例
const app = getApp()
var util = require('../../utils/util.js')

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    money: 0,
    code:'',
    openid: '',
    nc: '',
    userid: ''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
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

    var that = this;
    
    wx.getUserInfo({
      success: function(res) {
        that.setData({
          nc: res.userInfo.nickName
        })
        wx.request({
          url: 'http://localhost:54706/api/User',
          method:'GET',
          data:{
            name: that.data.nc
          },
          head:{
            'content-type': 'application/json'
          },
          success: function(res){
            that.setData({
              userid: res.data.Id
            })
            app.globalData.userIdG = res.data.Id
            console.log(app.globalData.userIdG)
            wx.request({
              url: 'http://localhost:54706/api/Travel',
              method: 'GET',
              header: {
                'content-type': 'application/json'
              },
              success: res => {
                console.log(res)
                var ppp = app.globalData.userIdG;
                var done;
                for(var i = res.data.length - 1; i >= 0; i--){
                  if(res.data[i].userid === ppp)
                    {
                      done = res.data[i].id;
                      break;
                    }
                }
                app.globalData.travelIdG = done;
                console.log("---------" + app.globalData.travelIdG)
              }
            })
          }
        })
      }
    }),
    wx.login({
      success: function (res) {
        console.log(res)
        that.setData({
            code: res.code
        })
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=' + that.data.code + '&grant_type=authorization_code',
          data: {},
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log(res)
            that.setData({
              //openid: res.data.openid //返回openid
            })
          }
        })
      }
    }),
    console.log(util.formatTime(new Date()))
  },
  
  getUserInfo: function(e) {
    var that = this;
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    }),
    wx.request({
      url: 'http://localhost:54706/api/User',
      method: 'POST',
      header:{
      'content_type': 'application/json'
      },
      data: {
        name: e.detail.userInfo.nickName,
      },
      success: function() {
        console.log("success")
      }
    })
  },

  //收藏
  turn2Like: function () {
    console.log("收藏"),
      wx.navigateTo({
        url: '../collect/collect'
      })
  },

  //计划
  turn2Plan: function () {
    console.log("计划"),
      wx.navigateTo({
        url: '../see_plan/see_plan'
      })
  },

  //地图
  turn2Map: function () {
    console.log("地图"),
      wx.navigateTo({
        url: '../map/map'
      })
  },

  //账单
  turn2Payment: function (e) {
    console.log("账单"),
      console.log(e.target),
      e.target
    wx.navigateTo({
      url: '../test/test'
    })
  },

  //曾经
  turn2Ever: function () {
    console.log("曾经"),
      wx.navigateTo({
      url: '../passage_strategy/passage'
      })
  },

  //关于我们
  turn2AboutUs: function () {
    console.log("关于我们"),
      wx.navigateTo({
        url: '../aboutus/aboutus'
      })
  },

  //充值
  turn2What: function () {
    console.log("充值"),
      wx.navigateTo({
        url: '../test/test'
      })
  }
})
