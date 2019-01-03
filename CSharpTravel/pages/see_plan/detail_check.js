// pages/see_plan/detail_check.jsvar app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    time: "00:00",
    more: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.new == 0) {
      console.log("查看");
      this.setData({
        time_last: options.time_last,
        name: options.name,
        more: options.more,
      })
      if (options.time != '') {
        console.log(options.time);
        let list = options.time; //获取到的数据 
        let list1;
        let list2;
        if (list.length == 1) {   //如  6
          list1 = '0' + list.substring(0, 1);   //取一位
          list2 = '00';
        }
        else if (list.length == 2)   //如 10
        {
          list1 = list.substring(0, 2);   //取两位
          list2 = '00';

        }
        else if (list.length == 3) {  // 如  6.5
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
          console.log(list2 + '原始');
          console.log(list2.length);
          if (list2 == 0) {
            list2 = '00'; console.log(list2 + '第一种情况');
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