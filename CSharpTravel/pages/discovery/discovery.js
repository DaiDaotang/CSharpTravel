// pages/discovery/discovery.js

var util = require('../../utils/util.js')
const app = getApp()
Page({

  data: {
    feed: [
      { id: "this_is_the_first", passage_id: "夕汐", passage_title: "111", passage_img: "../../images/a.jpeg" }
    ]

    //feed_length:0,
  },

  //点击转到passage
  bindPassageTap: function (event) {
    console.log(event.currentTarget.dataset)
    wx.navigateTo({
      url: '../passage/passage?id='+ event.currentTarget.dataset.passage_id
      })
  },

  turn2SearchS:function(){
    wx.navigateTo({
      url: '../search_strategy/search_strategy',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'http://localhost:54706/api/Share',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: res=>{
        console.log(res)
        for(var i = res.data.length - 1; i >= 0; i--)
        {
          this.setData({
            [`feed[${res.data.length - i - 1}].passage_id`]: res.data[i].id,
            [`feed[${res.data.length - i - 1}].passage_title`]: res.data[i].userName,
            [`feed[${res.data.length - i - 1}].passage_img`]: res.data[i].image0
          })
        }
      }
    }),
    console.log(this.data.feed)
  },

  getData: function () {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () { },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    var that = this;
    wx.request({
      url: 'http://localhost:54706/api/Share',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        console.log(res)
        for (var i = res.data.length - 1; i >= 0; i--) {
          this.setData({
            [`feed[${res.data.length - i - 1}].passage_id`]: res.data[i].id,
            [`feed[${res.data.length - i - 1}].passage_title`]: res.data[i].userName,
            [`feed[${res.data.length - i - 1}].passage_img`]: res.data[i].image0
          })
        }
      }
    })
    setTimeout(function () {
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  //网络请求数据, 实现首页刷新
  refresh0: function () {  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {  }
})