// pages/after-sales/after-salesOptions/maintainOptions/repairsee.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arrays: ['张三', '李四', '王五', '等等', '呆呆'],
    index: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    getApp().post.request('https://test.quaerolife.com/api/app/repair/'+'11', 'application/json', 'GET',
    {
    }).then(res => {
      console.log("bind新的数据显示", res.data)
          that.setData({
            equipmentName: res.data.data.equipmentName,
            equipmentSerialNum: res.data.data.equipmentSerialNum,
            equipmentProblem: res.data.data.equipmentProblem,
            realName: res.data.data.realName,
            mobile: res.data.data.mobile,
          })
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