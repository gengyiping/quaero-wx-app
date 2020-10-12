// pages/scan/scan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   

  },
  onLoad: function () {
    var that = this;
    wx.scanCode({
      onlyFromCamera: true,
      success: function (res) {
        var num = res.result
        console.log(num)
        that.setData({
          result: res.result
        })
       console.log('结果显示：', that.data.result.substring(0, 1))
        if(that.data.result.substring(0, 1)==8){
          wx.navigateTo({
            url: "/pages/after-sales/after-salesOptions/maintainOptions/repairs?scan=" + that.data.result,
          })
          
          
        }else if(that.data.result.substring(0, 1)==0){
          wx.navigateTo({
            url: "/pages/after-sales/after-salesOptions/maintainOptions/upkeep"
          })
        }
      },
     // complete: function (res) {
        // wx.switchTab({
        //   url: '../index/index',
        // })
     //   wx.reLaunch({ // 关闭所有打开过的页面，跳转到相对于的页面
    //      url: 'pages/after-sales/after-salesOptions/maintainOptions/repairs.wxml'
    //    })
   //   }
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