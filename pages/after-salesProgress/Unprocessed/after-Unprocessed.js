// pages/after-salesProgress/Unprocessed/after-Unprocessed.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  lookData:function(e){
    var that = this;
    getApp().post.request('https://test.quaerolife.com/api/app/repair/list', 'application/json', 'GET',
      {
        "repairStatus": e.target.dataset.current,
        "pageNum": '1',
        "pageSize": '10',
      }).then(res => {
        console.log("新的数据显示", res.data)
     
        that.setData({
          aess: res.data.data.list
        })
       var index=e.currentTarget.dataset.id
       console.log("查看故障的故障id",that.data.aess[index].id)
       that.setData({
        auserid:that.data.aess[index].id,
      })
      wx.navigateTo({
        url:"/pages/after-sales/after-salesOptions/maintainOptions/repairsee="+that.data.auserid
     })
      console.log("携带的用户id",that.data.auserid)
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