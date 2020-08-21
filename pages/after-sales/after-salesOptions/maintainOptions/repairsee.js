// pages/after-sales/after-salesOptions/maintainOptions/repairsee.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lookid:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({  
      lookid: options.lookid  
    })
    console.log("查看故障跳转传参",this.data.lookid)

    var that=this
    getApp().post.request('https://test.quaerolife.com/api/app/repair/'+that.data.lookid, 'application/json', 'GET',
    {
    }).then(res => {
      console.log("bind新的数据显示", res.data)
          that.setData({
            equipmentName: res.data.data.equipmentName,
            equipmentSerialNum: res.data.data.equipmentSerialNum,
            equipmentAddress: res.data.data.equipmentAddress,
            contact: res.data.data.contact,
            equipmentProblem: res.data.data.equipmentProblem,
            description:res.data.data.description,
          })
    })
  },
  /**relayData:function(e){
    var that=this
    wx.navigateTo({
      url:"/pages/after-sales/after-salesOptions/maintainOptions/relay?lookid="+that.data.lookid
   })
   console.log('转发传递的故障id：',that.data.lookid)
  },**/
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