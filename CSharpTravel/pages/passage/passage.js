// pages/passage/passage.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    passage_id:'',
    title: '一日游',
    author_name: '休息休息休息休息休息休息休息休息休息休息休息休息休息休息休息',
    author_img:"../../images/discovery.png",
    author_description: '嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻休息休息休息休息休息休息休息休息休息休息休息休息休息休息休息休息休息休息休息休息嘻',
    passagebody_text: '12345上山打老虎00000000000000000000000000000',
    passagebody_img: '',
    collectionStatus:false,
    imgEnjoy: 'image/star2.png'
  },

//收藏功能
collectPassageTap:function(){
  if(this.data.collectionStatus==true){
    wx.showToast({
      title: '不能取消收藏哦!',
      icon: 'none',
      duration: 1000,
      mask: true
    })
    //this.data.collectionStatus=false;
  }
  else{
    wx.request({
      url: 'http://localhost:54706/api/ShareDetail',
      method: 'POST',
      data: {
        ShareId: this.data.passage_id,
        UserId: app.globalData.userIdG
      },
      success: res=>{
        this.setData({
          imgEnjoy: 'image/star1.png',
          collectionStatus: true
        })
      }
    })
  }
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.data.passage_id = options.id;
    console.log(options)
    wx.request({
      url: 'http://localhost:54706/api/Share/' + options.id,
      method:'GET',
      header:{
        'content-type': 'application/json'
      },
      success: res=>{
        console.log(res)
        this.setData({
          author_name: res.data[0].userName,
          passagebody_text: res.data[0].text,
          author_description: res.data[0].time,
          passagebody_img: res.data[0].image0
        })
      }
    }),
    wx.request({
      url: 'http://localhost:54706/api/ShareDetail/' + options.id,
      method:'GET',
      header: {
        'content': 'application/json'
      },
      success: res => {
        console.log(res)
        var judge;
        var judgement = false;
        for(judge = 0; judge < res.data.length; judge++) {
          if(res.data[judge].UserId == app.globalData.userIdG) {
            this.setData({
              imgEnjoy: 'image/star1.png',
              collectionStatus: true
            })
            break;
          }
        }
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
    wx.showLoading({
      title: '加载中',
    })
    this.onShow()
    setTimeout(function () {
      wx.hideLoading()
    }, 1000)
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