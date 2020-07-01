// pages/after-sales/after-salesOptions/maintainOptions/upkeep.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '2020-03-01',
  },
  upkeepSubmit: function (e) {
    wx.showLoading({
      title: "提交中...",
      mask: true
    });
    var that = this;
    console.log('进入1');
    var pickervalue = e.detail.value.installationDate
    console.log("传的是：", pickervalue);
    wx.getStorage({
      key: 'data',
      success: function (res) {
        console.log('11111111111', res.data.id);
        that.setData({
          userId: res.data.id,
        })
    wx.request({
      url: 'https://test.quaerolife.com/api/app/repair/maintenance',
      data: {
        "userId": that.data.userId,
        "equipmentSerialNum":e.detail.value.equipmentSerialNum,
        "installationDate": e.detail.value.installationDate+" 00:00:00",
        "hospitalAddress":e.detail.value.hospitalAddress
        },
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      success(res) {
        wx.hideLoading()
        console.log(res.data)
        if (e.detail.value.equipmentSerialNum == '' || e.detail.value.hospitalAddress == ''||e.detail.value.installationDate + " 00:00:00"==''){
          wx.showToast({
            title: '所写的不能为空',
          })
        }
        else if (res.statusCode !== 200) {
          wx.showToast({
            title: '提交失败',
          })
        } else if (res.data.success == false) {
          wx.showToast({
            icon: 'none',
            title: res.data.msg,
            duration: 5000

          })
        } else if (res.data.success ==true) {
          wx.showToast({
            title: '成功',
          })
          that.setData({
            userInfo: '',
            
          })

        } 
      },



    })
      }
    })
   
  },
 
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
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