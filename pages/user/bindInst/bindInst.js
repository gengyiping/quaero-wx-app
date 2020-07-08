// pages/user/bindInst/bindInst.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  addData:function(e){
    var that = this;

    wx.getStorage({
      key: 'data',
      success: function (res) {
        console.log('11111111111', res.data.id);
        that.setData({
          dataid: res.data.id,
        })

        wx.request({
          url: 'https://test.quaerolife.com/api/app/group',
          data: {
            "userId": that.data.dataid,
            "name":e.detail.value.addNumber,
            
          },
          method: 'POST',
          header: {
            'Content-Type': 'application/json',
            'Authorization': getApp().globalData.toke,
          },
          success(res) {
            console.log(res.data)
          },


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