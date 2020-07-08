// pages/after-sales/after-salesOptions/ladingMessage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '2020-01-01',
    img_arr:[],
    array: [],
    index: 0,
    ind: 0,
    arr:[],

  },
  messageSubmit: function (e) {
    wx.showLoading({
      title: "提交中...",
      mask: true
    });
    var that = this;
    console.log('进入1', e);

    getApp().post.request('https://test.quaerolife.com/api/app/equipment', 'application/json', 'POST',
      {
        "installedTime": e.detail.value.installedTime + " 00:00:00",
        "projectId": that.data.array[e.detail.value.pickerhx].id,
        "serialNum": e.detail.value.serialNum,
        "department": e.detail.value.department,
        "engineer": e.detail.value.engineer,
        "phone": e.detail.value.phone,
        "operator": e.detail.value.operator,
        "createdBy": that.data.userId,
        "picture": that.data.arr,
        "video": null,
        "description": that.data.concent,
      }).then(res => {
        console.log("新的数据显示", res.data)
        wx.hideLoading()
        console.log(res.data)
        if (res.statusCode !== 200) {
          wx.showToast({
            title: '提交失败',
          })
        } else if (res.data.success == false) {
          wx.showToast({
            icon: 'none',
            title: res.data.msg,
            duration: 5000
          })
        } else if (res.data.success == true) {
          wx.showToast({
            title: '成功',
          })
          that.setData({
            userInfo: '',

          })
        } 
      })
  },
 
  bindText: function (e) {
    console.log(e.detail.value)
    this.setData({
      concent: e.detail.value,
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
 
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      ind: e.detail.value
    })
  },
  

  chooseIm: function () {
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
                  var object = JSON.parse(res.data)
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
    
      var that = this;
    getApp().post.request('https://test.quaerolife.com/api/app/project/list', 'application/json', 'GET',
      {}).then(res => {
        console.log("新的数据显示", res.data)
        wx.hideLoading()
        console.log(res.data)
        that.setData({
          array: res.data.data,
        })
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