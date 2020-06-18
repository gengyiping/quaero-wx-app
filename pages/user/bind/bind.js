// pages/user/bind/bind.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onLoad: function (options) {
    var that = this;

    wx.getStorage({
      key: 'data',
      success: function (res) {
        console.log('11111111111', res.data.id);
        that.setData({
          dataid: res.data.id,
        })
var use=that.data.dataid;
        console.log('66666611', use);
        wx.request({
          url: 'https://test.quaerolife.com/api/app/user/' + use + '/edit',
         
          method: 'GET',
          header: {
            'Content-Type': 'application/json'
          },
          success(res) {
            console.log(res.data)
            that.setData({
              realName: res.data.data.realName,
              mobile: res.data.data.mobile,
              roleName: res.data.data.roleName,
              gid: res.data.data.gid,
              groupName: res.data.data.groupName,
            })
          },


        })


      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
 

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