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
  
    var that = this;
    console.log('进入1');
    var pickervalue = e.detail.value.installationDate
    console.log("传的是：", pickervalue);
    wx.request({
      url: 'https://test.quaerolife.com/api/app/repair/maintenance',
      data: {
        "userId": "0101",
        "equipmentSerialNum":e.detail.value.equipmentSerialNum,
        "installationDate": e.detail.value.installationDate+" 00:00:00",
        "hospitalAddress":e.detail.value.hospitalAddress
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