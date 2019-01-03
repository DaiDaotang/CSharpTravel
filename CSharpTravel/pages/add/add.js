// pages/add/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    tip1: '制定计划',
    tip2: '即刻分享',
    tip3: '分享攻略',
  },
 
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
  * 
  */
  

  changeTo1: function (options) {
    wx.navigateTo({
      url: '../add_travel/add_travel'
    })
  },
  changeTo2: function (options) {
    wx.navigateTo({
      url: '../add_share/add_share?id=' + this.data.tip2
    })
  },
  changeTo3: function (options) {
    wx.navigateTo({
      url: '../add_strategy/new?id=' + this.data.tip3
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