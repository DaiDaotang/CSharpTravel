// pages/passage/passage.js
var WxParse = require('../../wxParse/wxParse.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    passage_bid:"1",
    title: '迪拜，这座沙漠上的传奇或许有你未听过的故事',
    author_name: '沙特阿拉伯的小王子',
    author_img:"../../image/1.png",
    author_description: '矿里有家的沙特小王子',
    passage_pic:'',
    collectionStatus:false,//true时为收藏
  },

/*收藏功能
初始值为true，点击后判断，值为true时变false，为false时变true*/ 
collectPassageTap:function(){
  if(collectionStatus=ture){
    collectionStatus=false;
  }
  else{
    collectionStatus=true;
  }
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var article;
    //wx:wx.request({
     // url: 'http://localhost:54706/api/Strategy',
     // data: options.id,
     // header: {
    //    'content-type': 'application/json'
  //    },
  //    method: 'GET',
   //   success: function(res) {
   //     that.setData({
   //       title: res.data[0].strategydetails[0].Title,
   //       author_name: res.data[0].UserId,
   //       passagebody_text: res.data[0].strategydetails[0].Text,
        //  article:res.data[0].passagebody_text
    //    })
    //  },
     // fail: function(res) {},
     // complete: function(res) {},
  //  })
  //  var article=passagebody_text;
    article = '<text>赫·穆罕默德曾经说过“没有人会记得第二名是谁”。所以这个沙漠中的城市总是在挑战着自然与人类的神经，创造出一个个世界第一，不断刷新的世界第一高楼，第一座帆船酒店等等，抓足了世人的眼球，让 迪拜 一跃成为众人追捧和向往的国际大都市，引得众人都想要去淘金，在人们眼中， 迪拜 或多或少有些一夜暴富的感觉。</text><img src="https://p2-q.mafengwo.net/s11/M00/53/EF/wKgBEFrWJcCAEJewABDhxslbTkw83.jpeg?imageView2%2F2%2Fw%2F680%2Fq%2F90%7CimageMogr2%2Fstrip%2Fquality%2F90"></img> <text>一至今提起 迪拜 ，人们还是常常用用土豪、奢华这样的词汇来形容这里，可是蟹哥用了差不多一个礼拜时间真正到访过后的感受就是这里真的一点也不土，即使穿着长袍遮着脸的阿拉伯女人，也能透过眼神看到她是精心梳妆打扮了一番，也没有想象中的那么遍地豪车，所以大多数人对这里的态度或多或少都有些误会，如果你真的来到这里便会体会我为何这样说了。</text> <img src="https://b1-q.mafengwo.net/s11/M00/53/C9/wKgBEFrWJVmATg5OAAzqrHl2MH453.jpeg?imageView2%2F2%2Fw%2F700%2Fh%2F600%2Fq%2F90%7CimageMogr2%2Fstrip%2Fquality%2F90"></img> <text class="text-align:center">我也从来没有想过我会专门将这样一座 中东 城市作为一次旅行的目的地，因为在我的印象中，这里真的仅限于去 欧洲 中转停留玩儿个两天足以，但当我真正踏足这里，用了一周时间深度游览，才发现 迪拜 的魅力远不仅于此，这就很容易理解为什么会很多国家的人来这里工作生活，以至于喜欢上这里。</text><img src="https://p2-q.mafengwo.net/s11/M00/53/C9/wKgBEFrWJVqAOnXaAA2V0rip1ZA35.jpeg?imageView2%2F2%2Fw%2F680%2Fq%2F90%7CimageMogr2%2Fstrip%2Fquality%2F90"></img><text>没有历史人文打基础的城市，这样的一夜间繁华终会落幕，你或许会这样问，但是 迪拜 的 成功 一定有它的道理，每座摩登大楼的背后除了投掷数千亿万亿的金钱外，一定是它历史沉淀下来的文明在支撑着。看似年轻的城市背后，也有它不为人知的历史，只是你不知道而已，如果用个准确的词语来形容我对这里的印象，那就是视觉冲击力，运河两岸的新老城所展现的文化反差和视觉冲击是最为深刻的。</text><img src="https://n1-q.mafengwo.net/s11/M00/54/19/wKgBEFrWJjmAdaLbABAwgWUG5dY69.jpeg?imageView2%2F2%2Fw%2F680%2Fq%2F90%7CimageMogr2%2Fstrip%2Fquality%2F90"></img>'; 
    WxParse.wxParse('article', 'html', article, that, 5);
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