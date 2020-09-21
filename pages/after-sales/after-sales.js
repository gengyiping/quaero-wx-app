// pages/after-sales/after-sales.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.getStorage({
      key: 'data',
      success: function (res) {
        console.log('11111111111', res.data.id);
        that.setData({
          roleName:res.data.roleName,
        })
        if ((that.data.roleName.indexOf("after_sales_department") >= 0 )) {
          that.setData({
            showView: (!that.data.showView)
          })
        } else {
          that.setData({
            showView: ''
          })
        }
        getApp().post.request('https://test.quaerolife.com/api/app/user/edit', 'application/json', 'GET',
          {}).then(res => {
            console.log("新的数据显示", res.data)
            that.setData({
              dutyName: res.data.data.roleName,
              userTitle: res.data.data.groupName,
              officeName: res.data.data.companyName,
            })
          })
      }
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