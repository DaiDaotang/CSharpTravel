// pages/add_travel/add_travel.js
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    nc: '',
    dates: '',
    datee: '2019-11-09',
    index: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      dates: this.getNowTime()
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () { 
    var that = this;
    that.setData({
      datas: that.getNowTime()
    })
   },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {  },

  //设置初始时间
  bindDateChanges: function (e) {
    this.setData({
      dates: e.detail.value
    })
  },

  //设置结束时间
  bindDateChangee: function (e) {
    this.setData({
      datee: e.detail.value
    })
  },

  //点击按钮，添加
  addTravel: function(e) {
    const that = this;
    var TravelId;
    var StartTime;
    var EndTime;
    //判断地点是否为空
    if(e.detail.value.placename == '') {
      wx.showModal({
        title: '提示',
        content: '目的地不能为空',
      });
      return 0
    }
    //判断时间是否错误
    if(that.judgeData() == 0){
      wx.showModal({
        title: '提示',
        content: '时间设置错误',
      });
      return 0
    }
    //添加Travel
    wx.request({
      url: 'http://localhost:54706/api/Travel',
      method: "POST",
      data: {
        Place: e.detail.value.placename,
        StartTime: that.data.dates,
        EndTime: that.data.datee,
        UserId: app.globalData.userIdG
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.request({
          url: 'http://localhost:54706/api/Travel',
          method:'GET',
          data:{
            place: e.detail.value.placename
          },
          header:{
            'content-type': 'application/json'
          },
          success:res=>{
            console.log(res)
            TravelId = res.data[0].id
            app.globalData.travelIdG = TravelId
            console.log("TravelId" + TravelId)
          }
        })
        wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 1000,
            mask: true
          }) ,
        setTimeout(function () {wx.redirectTo({ 
          url:'../add_travelplan/plan?travelId=' + TravelId + '&startTime=' + that.data.dates + '&endTime=' + that.data.datee,
        })}, 1000)
      }
    })
  },

  //判断时间是否错误
  judgeData: function(){
    var s = this.data.dates;
    var e = this.data.datee;
    var arrs = s.split('-');
    var arre = e.split('-');

    if (arrs[0] * 1 > arre[0] * 1) {
      console.log("年");
      return 0;
    }
    else if (arrs[0] * 1 === arre[0] * 1 && arrs[1] * 1 > arre[1] * 1) {
      console.log("月");
      return 0;
    }      
    else if (arrs[0] * 1 === arre[0] * 1 && arrs[1] * 1 === arrs[1] * 1 && arrs[2] * 1 > arre[2] * 1) {
      console.log("日");
      return 0;
    }
    return 1;
  },

  //获取当前时间
  getNowTime: function() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();

    if (month < 10) {
      month = '0' + month;
    };
    if (day < 10) {
      day = '0' + day;
    };

    var formatDate = year + '-' + month + '-' + day;
    return formatDate;
  },

  setNowTime: function() {
    var that = this;
    that.setData({
      dates: getNowTime()
    })
    console.log(that.data.dates)
    return true;
  }
})