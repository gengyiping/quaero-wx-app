// pages/user/userInfo/usefInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  usefInfoSubmit: function (e) {
    var that = this;
    console.log('进入1');
    wx.request({
      url: 'https://test.quaerolife.com/api/app/account',
      data: {
        "username": e.detail.value.userName, 
        "password": "123456",
        "passwordSalt": "123456",
        "nickname": "", 
        "realName": "tony", 
        "telTrue": true, 
        "email": e.detail.value.userPhone, 
        "weixinOpenId": "123123",
        "picUrl": "", 
        "headImgUrl": "", 
        "sex": 2, 
        "country": e.detail.value.userOffices, 
        "province": "", 
        "city": e.detail.value.userWork,
        "district": "", 
        "address": e.detail.value.userJob, 
        "note": e.detail.value.userProfessional,
        "type": 2,
        "thisLoginTime": "2020-04-15 10:12:39",
        "thisLoginIp": "127.0.0.1", 
        "lastLoginTime": "2020-04-15 10:12:39",
        "lastLoginIp": "127.0.0.1",
        "lastWeixinSignInTime": "2020-04-15 09:23:46",
        "wallet": 20.0,
        "addTime": "2020-04-15 09:23:46"
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      success(res) {
        console.log(res.data)
      },
      fail(res) {
        console.log("fail=" + res.data)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {


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