// pages/user/bindPhoneNumber/bindPhoneNumber.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  phoneNumberSubmit: function (e) {
    var that = this;
    console.log('进入1');
    wx.getStorage({
      key: 'data',
      success: function (res) {
        console.log('11111111111', res.data.id);
        that.setData({
          userId: res.data.id,
        })
    wx.request({
      url: 'https://test.quaerolife.com/api/app/user',
      data: {
        "userId":that.data.userId,
        "mobile": e.detail.value.phoneNumber,
        
      },
      method: 'PUT',
      header: {
        'Content-Type': 'application/json'
      },
      success(res) {
        console.log(res.data)
        if (e.detail.value.phoneNumber=='') {
          wx.showToast({
            title: '手机号不能为空',
          })
        } else if (e.detail.value.phoneNumber.length!=11){
          wx.showToast({
            title: '手机号格式不对',
          })
        } else if (res.statusCode !== 200) {
          wx.showToast({
            title: '修改失败',
          })
        }
        else if (res.statusCode === 200){
          wx.showToast({
            title: '修改成功',
          })
          that.setData({
            userInfo:'',

          })
        }
      }
    })
      }
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