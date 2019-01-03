// pages/upload/upload.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgs: [],
    imgPreview:'',
    animation:'',
    path:'',
    name:'',
    introduce:'',
    loading:false
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   // console.log(options.path )
    // this.setData({ path: options.path })
    // this.setData({ name: options.name })
    // this.setData({ introduce: options.introduce })
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
    this.animation = wx.createAnimation({
      // 动画持续时间，单位ms，默认值 400
      duration: 500,
      timingFunction: 'linear',
    })
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
  
  },

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
      return false;
    }
    wx.chooseImage({
      // count: 1, // 默认9
      sizeType: ['original','compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有, 'camera'
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var imgs = that.data.imgs;
        // console.log(tempFilePaths + '----');
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
        // console.log(imgs);
        that.setData({
          imgs: imgs
        });
      }
    });
  },


    //预览图片
  previewImg: function(e) {
    this.animation.opacity(1).step()
    this.setData({
      animation: this.animation.export()
    })
        //获取当前图片的下标
    var index = e.currentTarget.dataset.index;
        //所有图片
    var imgs =[]
    imgs = this.data.imgs;
    var a = this.data.imgs[index]
    this.setData({ imgPreview: this.data.imgs[index]})
  },
  closePreview:function(){
    this.setData({ imgPreview: ''})
  },
  submit: function (e) {
    var that = this
    var imgs = this.data.imgs
    var type1 = ''
    var assignid = 0
    if (e.detail.value.content == '' && imgs != '') {
      e.detail.value.content = ' '
      console.log("a")
    }
    if (e.detail.value.content == '' && imgs == '') {
      wx.showModal({
        title: '提示',
        content: '内容不能为空',
      })
      console.log("aaa")
      return 0
    }
    this.setData({loading:true})
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
      url: 'https://system.lib.whu.edu.cn/miniapp/whulib/php/add_article_content.php',
      data: 'endid=0x3f3f3f3f&size=128&userid=' + wx.getStorageSync('userid') + '&content=' +e.detail.value.content + '&type=' + type1 + '&assignid=' + assignid,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      responseType: 'text',
      success: function (res) {
        //console.log(res.data)
        if(imgs[0] == undefined){
          // wx.showToast({
          //   title: '完成',
          // })
          wx.navigateBack({})
        }
        else {
          console.log(res.data)
          that.uploadimg({
            url: 'https://system.lib.whu.edu.cn/miniapp/whulib/php/upload_pic.php?articleid=' + res.data + "&type=" + type1 + '&assignid=' + assignid,
            path: imgs
          });
        }
        that.setData({imgs: []})
      },
    })
  },
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
      header: { 'content-type': 'multipart/form-data'},
      filePath: data.path[i],
      name: 'fileData',
      formData: { 
        'userid':  wx.getStorageSync('userid'),
       },
      success: (resp) => {
        success++;
        if (data.path.length == success ){
          // wx.showToast({
          //   title: '完成',
          // })
          wx.navigateBack({})
        }
        //console.log(resp.data)
       // console.log(i);
        //这里可能有BUG，失败也会执行这里
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