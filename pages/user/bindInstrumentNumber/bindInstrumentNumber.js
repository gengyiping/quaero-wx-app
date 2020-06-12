// pages/user/bindInstrumentNumber/bindInstrumentNumber.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code:''
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that = this;
    var dataid;

    wx.getStorage({
      key: 'data',
      success: function (res) {
        console.log('11111111111', res.data.id);
        that.setData({
          dataid: res.data.id,
        })
        console.log('111222211', res.data.id);
      }
    })
    setTimeout(function () {
      console.log('3333333', that.data.dataid
       )}, 100)
   
    wx.request({
    url:'https://test.quaerolife.com/api/app/user/userSubordinateRoleList',
      data: {
        "userId": that.dataid,
      },
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success(res) {
        console.log('此时：',res.data)
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