// pages/collect/collect.js
const app = getApp();
var ASDFG = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    feed:[
      {id: "this_is_the_first", passage_id: "123", passage_title: "123", passage_img: "../../images/a.jpeg" }
    ]

  },

//点击跳转到passage
  bindPassageTap: function (event) {
    console.log(event.currentTarget.dataset)
    wx.navigateTo({
      url: '../passage/passage?id=' + event.currentTarget.dataset.passage_id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    ASDFG = 0;
    var that = this;
    wx.request({
      url: 'http://localhost:54706/api/ShareDetail/' + app.globalData.userIdG,
      data:{
        text: 0
      },
      method:'GET',
      header: {
        'content-type': 'application/json'
      },
      success:res=>{
        ASDFG = 0;
        console.log(res)
        for(ASDFG = res.data.length - 1; ASDFG >= 0; ASDFG--)
        {
          if(res.data[ASDFG].UserId === app.globalData.userIdG) {
            var idd = res.data[ASDFG].ShareId;
            !function(j, k, l){
              wx.request({
                url: 'http://localhost:54706/api/Share/' + k,
                method: 'GET',
                header: {
                  'content-type': 'application/json'
                },
                success: function (res) {
                  that.setData({
                    [`feed[${l - j - 1}].passage_id`]: k,
                    [`feed[${l - j - 1}].passage_title`]: res.data[0].userName,
                    [`feed[${l - j - 1}].passage_img`]: res.data[0].image0
                  })
                }
              })
            }(ASDFG, idd, res.data.length)
          }
        }
      }
    }),
    console.log(this.data.feed)
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})