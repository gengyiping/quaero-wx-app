// pages/after-sales/after-salesOptions/complaintAndAdvice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_arr:[],
    arrys: [
      { name: "意见建议", value: "0", },
      { name: "使用帮助", value: "1", },
      { name: "其他问题", value: "2", },

    ],
    arr:[],
    index: 0,
  },

  problemsSubmit: function (e) {
    wx.showLoading({
      title: "提交中...",
      mask: true
    });
    console.log('打印信息：', e)
    var that = this;
    console.log('进入1');
    getApp().post.request('https://test.quaerolife.com/api/app/appeal', 'application/json', 'POST',
      {
        "type": e.detail.value.depicttype,
        "description": that.data.con,
        "picture": that.data.arr,
        "video": null,
      }).then(res => {
        wx.hideLoading()
        console.log("新的数据显示", res.data)
        if (res.data.success == true) {
          wx.showToast({
            title: "提交成功",
            duration: 5000
          })
          that.setData({
            userInfo: '',

          })
        }
      })
  },

  radioChange: function (e) {
    this.setData({
      den: e.detail.value
    });
    console.log('选择的是：', e.detail.value)
  },
  bindTextAreaBlur: function (e) {
    console.log(e.detail.value)
    this.setData({
      con: e.detail.value,
    })
  },
  choose: function () {
    var that = this;
    if (this.data.img_arr.length < 3) {
      wx.chooseImage({
        sizeType: ['original', 'compressed'],
        success: function (res) {
          var tempFilePath = res.tempFilePaths[res.tempFilePaths.length - 1]
          console.log("path=", tempFilePath)
          console.log("temp=", res.tempFilePaths)
          wx.compressImage({
            src: res.tempFilePaths[res.tempFilePaths.length - 1],
            quality: 80, // 压缩质量
            success: function (res) {
              that.setData({
                img_arr: that.data.img_arr.concat(res.tempFilePath)
              })
              console.log("img_arr=", that.data.img_arr)
              
              wx.uploadFile({
                url: 'https://test.quaerolife.com/api/app/file/upload',
                filePath: that.data.img_arr[that.data.index],
                name: 'file',
                formData: {
                  'type': 'Picture'
                },
                header: {
                  'Content-Type': 'application/json',
                  'Authorization': getApp().globalData.token,
                },
                success: function (res) {
                  console.log('此时的data数据是：', res.data);
                  var object = JSON.parse(res.data);
                  console.log('此时的i=,file数据是：', that.data.index, object.data);
                  that.setData({
                    arr: that.data.arr.concat(object.data)
                  })
                  console.log("arr=", that.data.arr);
                },
                fail: function (res) {
                  console.log('此时信息', res);
                },
              })
            },
            fail: function (res) {
              console.log(res)
            }
          })




        }
      })
    } else {
      wx.showToast({
        title: '最多上传三张图片',
        icon: 'loading',
        duration: 3000
      });
    }
  },
  closeOption(e) {
    let index
      = e.currentTarget.dataset.id;
    let imagelist = this.data.img_arr;
    imagelist.splice(index, 1);
    this.setData({
      img_arr: imagelist,
      isShow: true
    })
    console.log(JSON.stringify(e))

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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