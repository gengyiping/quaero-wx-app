// pages/user/bind/look.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lookuserid:'',
    
  },
  onLoad: function (option) {
    this.setData({  
      lookuserid: option.lookuserid,
     
    })
    console.log("111--->跳转传参",this.data.lookuserid)
    
    var that = this;
    
       getApp().post.request('https://test.quaerolife.com/api/app/data/errorCodeList', 'application/json', 'GET',
      {
        "code":that.data.lookuserid
      }).then(res => {
        console.log("bind新的数据显示", res.data)
            that.setData({
              code: res.data.data.list[0].code,
              type: res.data.data.list[0].type,
              level: res.data.data.list[0].level,
              introductions: res.data.data.list[0].introductions,
              remarks: res.data.data.list[0].remarks,
              approaches: res.data.data.list[0].approaches,
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