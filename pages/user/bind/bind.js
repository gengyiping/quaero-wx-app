// pages/user/bind/bind.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid:null
  },
  onLoad: function (options) {
    this.setData({  
      userid: options.userid  
    })
    console.log("跳转传参",this.data.userid)

    var that = this;
    
       getApp().post.request('https://test.quaerolife.com/api/app/user/edit', 'application/json', 'GET',
      {
        "userId":that.data.userid
      }).then(res => {
        console.log("bind新的数据显示", res.data)
            that.setData({
              realName: res.data.data.realName,
              mobile: res.data.data.mobile,
              roleName: res.data.data.roleName,
              gid: res.data.data.gid,
              groupName: res.data.data.groupName,
            })
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