// pages/user/user.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    officeName: '111',
    dutyName: '222',
    userTitle: '333',
 
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
    var that = this
    wx.request({
      url: 'https://test.quaerolife.com/api/app/account',
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },

      success: function (res) {
        //将获取到的json数据，存在名字叫list的这个数组中
        that.setData({
          
          address: e.detail.value.userJob
          //res代表success函数的事件对，data是固定的，code是数组
        })
      }
    })
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