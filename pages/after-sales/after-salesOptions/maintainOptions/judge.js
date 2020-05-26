// pages/after-sales/after-salesOptions/maintainOptions/judge.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_arr: [],
    den: 0,
    arrys:[
      { name: "非常满意", value: "0", },
      { name: "满意", value: "1",  },
      { name: "一般", value: "2", },
    
    ]
  },
  radioChange: function (e) {
    this.setData({
      den: e.detail.value
    });
    console.log('选择的是：', e.detail.value)
  },

  problemsSubmit: function (e) {
    
    var that = this;
    console.log('进入1');
    console.log("传的是：", e);
    wx.request({
      url: 'https://test.quaerolife.com/api/app/repair/{repairId}',
      data: {
        "satisfaction": t.data.den,
        "commentContent": this.data.con,
      },
      method: 'PUT',
      header: {
        'Content-Type': 'application/json'
      },
      success(res) {
        console.log(res.data)
        if (res.statusCode === 200) {
          wx.showToast({
            title: '成功',
          })
          that.setData({
            userInfo: '',
            con: ''
          })

        } else {
          wx.showToast({
            title: '不成功',
          })
        }
      },



    })

  },
  bindTextAreaBlur: function (e) {
    console.log(e.detail.value)
    this.setData({
      con: e.detail.value,
    })
  },
  choosePic: function () {
    var that = this;
    if (this.data.img_arr.length < 3) {
      wx.chooseImage({
        sizeType: ['original', 'compressed'],
        success: function (res) {
          that.setData({
            img_arr: that.data.img_arr.concat(res.tempFilePaths)
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