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
  },
  messageSubmit: function (e) {
    var that = this;
    console.log('进入1', e);
    wx.request({
      url: 'https://test.quaerolife.com/api/app/equipment',
      data: {
      "installedTime": e.detail.value.installedTime+" 00:00:00",
      "projectId": e.detail.value.pickerhx,
      "serialNum": e.detail.value.serialNum,
      "department": e.detail.value.department,
      "engineer": e.detail.value.engineer,
      "phone": e.detail.value.phone,
      "operator": e.detail.value.operator,
      "createdBy":'37',
      "picture":null,
      "video":null,
      "description": this.data.concent,
      },
      method: 'POST',
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
            
          })
        } else {
          wx.showToast({
            title: '不成功',
          })
        }
      },
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
      index: e.detail.value
    })
  },
  

  chooseIm: function () {
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
      var that = this;
      wx.request({
        url: 'https://test.quaerolife.com/api/app/project/list',
        data: {
          "userId": '37'
        },
        method: 'GET',
        header: {
          'Content-Type': 'application/json'
        },
        success(res) {
          console.log("此时打印的信息是：", res.data)
          that.setData({
            array: res.data.data,
          })
          console.log("此时打印的信息是：", that.array)
        },
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