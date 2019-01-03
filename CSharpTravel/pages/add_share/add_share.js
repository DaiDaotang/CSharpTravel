// pages/add_strategy/add_strategy.js
const app = getApp()
var util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    author:'',
    imgs: [],
    imgPreview: '',
    animation: '',
    path: '',
    name: '',
    introduce: '',
    loading: false,


    images: [ 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a' ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getUserInfo({
      success(res) {
        that.setData({
          'author': res.userInfo.nickName
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.animation = wx.createAnimation({
      // 动画持续时间，单位ms，默认值 400
      duration: 500,
      timingFunction: 'linear',
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () { },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () { },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () { },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () { },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () { },

  //添加图片
  chooseImg: function (e) {
    var that = this;
    var imgs = this.data.imgs;

    if (imgs.length >= 9) {
      this.setData({
        lenMore: 1
      });
      setTimeout(function () {
        that.setData({
          lenMore: 0
        });
      }, 2500);
      wx.showToast({
        title: '最多九张图片!',
        icon: 'none',
        duration: 1000,
        mask: true
      });
      return false;
    }
    wx.chooseImage({
      // count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有, 'camera'
      success: function (res) {
        var imagePath = res.tempFilePaths[0];
        var judge;
        for(judge = 0; judge < that.data.images.length; judge++)
        {
          if(that.data.images[judge] === 'a')
            break;
        }
        that.setData({
          [`images[${judge}]`]: imagePath
        })
    

        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var imgs = that.data.imgs;
        for (var i = 0; i < tempFilePaths.length; i++) {
          if (imgs.length >= 9) {
            that.setData({
              imgs: imgs
            });
            return false;
          } else {
            imgs.push(tempFilePaths[i]);
          }
        }
        that.setData({
          imgs: imgs
        });
      }
    });
  },

  //预览图片
  previewImg: function (e) {
    this.animation.opacity(1).step()
    this.setData({
      animation: this.animation.export()
    })
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;
    //所有图片
    var imgs = []
    imgs = this.data.imgs;
    var a = this.data.imgs[index]
    this.setData({ imgPreview: this.data.imgs[index] })
  },

  //关闭预览
  closePreview: function () {
    this.setData({ imgPreview: '' })
  },

  //递交
  submit: function (e) {
    var that = this
    var imgs = this.data.imgs
    var type1 = ''
    var assignid = 0
    if (e.detail.value.content == '' && imgs != '') {
      e.detail.value.content = '分享图片'
    }
    if (e.detail.value.content == '' && imgs == '') {
      wx.showModal({
        title: '提示',
        content: '内容不能为空',
      })
      return 0
    }
    this.setData({ loading: true })
    try {
      var value = wx.getStorageSync('type')
      if (value) {
        type1 = value.type1
        assignid = value.assignid
      }
    } catch (e) {
      // Do something when catch error
    }
    wx.request({
      url: 'http://localhost:54706/api/Share',
      data: {
        UserId: app.globalData.userIdG,
        Text: e.detail.value.content,
        Image0: that.data.images[0],
        Image1: that.data.images[1],
        Image2: that.data.images[2],
        Image3: that.data.images[3],
        Image4: that.data.images[4],
        Image5: that.data.images[5],
        Image6: that.data.images[6],
        Image7: that.data.images[7],
        Image8: that.data.images[8],
        Time: util.formatTime(new Date())
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: function (res) {
        wx.showToast({
          title: '分享成功',
          icon: 'success',
          duration: 1000,
          mask: true
        }),
        setTimeout(function () {
          wx.navigateBack({ })
        }, 1000)
      }
    })
  },

  //上传
  uploadimg: function (data) {
    var that = this
    var type1 = ''
    var assignid = 0
    try {
      var value = wx.getStorageSync('type')
      if (value) {
        type1 = value.type1
        assignid = value.assignid
      }
    } catch (e) {
      // Do something when catch error
    }
    var i = data.i ? data.i : 0,
      success = data.success ? data.success : 0,
      fail = data.fail ? data.fail : 0;
    wx.uploadFile({
      url: data.url,
      header: { 'content-type': 'multipart/form-data' },
      filePath: data.path[i],
      name: 'fileData',
      formData: {
        'userid': wx.getStorageSync('userid'),
      },
      success: (resp) => {
        success++;
        if (data.path.length == success) {
          wx.navigateBack({})
        }
      },
      fail: (res) => {
        fail++;
        //console.log('fail:' + i + "fail:" + fail);
      },
      complete: () => {
        //console.log(i);
        i++;
        if (i == data.path.length) { //当图片传完时，停止调用   
          //console.log('执行完毕');
          // console.log('成功：' + success + " 失败：" + fail);
        } else {//若图片还没有传完，则继续调用函数
          //console.log(i);
          data.i = i;
          data.success = success;
          data.fail = fail;
          that.uploadimg(data);
        }
      }
    });
  }
})