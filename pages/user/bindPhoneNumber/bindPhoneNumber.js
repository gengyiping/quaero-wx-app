// pages/user/bindPhoneNumber/bindPhoneNumber.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
  },

  phoneNumberSubmit: function (e) {
   
    wx.showLoading({
      title: "提交中...",
      mask: true
    });
    var that = this;
    console.log('进入1');
    getApp().post.request('https://test.quaerolife.com/api/app/user',     'application/json', 'PUT', 
    {
      'mobile': e.detail.value.phoneNumber
      }).then(res => {
      console.log("新的数据显示", res.data)
        wx.hideLoading()
        if (e.detail.value.phoneNumber == '') {
          wx.showToast({
            title: '所写的不能为空',
          })
        } else if (e.detail.value.phoneNumber.length != 11) {
          wx.showToast({
            title: '手机号格式不对',
          })
        }
        else if (res.statusCode !== 200) {
          wx.showToast({
            title: '提交失败',
          })
        } 
        else if (res.data.success == true) {
          wx.showToast({
            title: '修改成功',
          })
          that.setData({
            userInfo: '',
          })
        }
      }).catch(err => {
        console.log("错误show：", err)
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