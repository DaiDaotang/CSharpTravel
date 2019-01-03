// pages/plan/detail.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'请输入',
    time: "00:00",
    more:'请在此处输入',
    time_last:1,
    cannotdel: true,
    type: 'greys',

    travelId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this;
    console.log(options)
    var ppppp = options.xq;
    console.log("ppppp" + ppppp)
    that.setData({
      travelId: options.idd
    })
    if (options.new==0){
      console.log("修改");
      app.globalData.id = options.index;
      this.setData({
      time_last: options.time_last,
      name: options.name,
      more: options.more,
        cannotdel: false,
        type: 'reds'

      })
      if (options.time!=''){
      console.log(options.time);
      let list = options.time; //获取到的数据 
      let list1 ;
      let list2;
      if(list.length==1){   //如  6
        list1 = '0' + list.substring(0, 1);   //取一位
        list2 = '00';
      }
      else if (list.length == 2)   //如 10
      {
        list1 = list.substring(0, 2);   //取两位
        list2 = '00';

      }
      else if (list.length == 3){  // 如  6.5
        list1 = '0' + list.substring(0, 1);   //小时
        console.log(list1);
        list2 = list.substring(2, 3) * 6;     //分钟 
                                        //比如  06：06
        if (list2 == 0) {
          list2 = '00'; console.log(list2 + '第一种');
        }
      }
      else if (list.length == 4)   // 如 17.5
      {
        list1 = list.substring(0, 2); 
        list2 = list.substring(3, 4) * 6; 
        console.log(list2+'原始');
        console.log(list2.length);
        if (list2==0){
          list2 = '00'; console.log(list2+'第一种情况');
        }
      }
      console.log(list1);
      console.log(list2);
      list = list1 + '：' + list2
      console.log(list);
      this.setData({
        time: list
      })
      }
    }
    if (options.new == 1) {
      console.log("新建");
      app.globalData.newData = options.new;
    }
 
  },
  nameChange:function(e) 
  {
    this.data.name = e.detail.value;
  },
  timeChange: function (e) {
    this.data.time = e.detail.value;
  },
  time_lastChange: function (e) {
    this.data.time_last = e.detail.value;
  },
  moreChange: function (e) {
    this.data.more = e.detail.value;
  },
  saveData:function()
  {
    console.log(this.data.name)
    console.log(this.data.more)
    console.log(this.data.time)
    console.log(this.data.time_last)
    app.globalData.name_tag=this.data.name 
    app.globalData.more_tag = this.data.more 
    app.globalData.time_tag = this.data.time
    app.globalData.time_last_tag = this.data.time_last
    app.globalData.change=1
  },
  deleteData:function(){
    app.globalData.del=1
  },

  submitplan:function(e){
    var that = this;
    wx.request({
      url: 'http://localhost:54706/api/TravelDetail',
      method:'POST',
      header:{
        'content-type': 'application/json'
      },
      data:{
        TravelId: that.data.travelId,
        EventName: e.detail.value.first,
        EventDetail: e.detail.value.forth,
        StartTime: that.data.time,
        KeepTime: e.detail.value.third,
        XQ: app.globalData.choose
      },
      success:res=>{
        console.log("success---------------------")
        wx.showToast({
          title: '成功添加',
          icon: 'success',
          duration: 1000,
          mask: true
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
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