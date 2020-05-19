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
        "realName": "TONY", 
        "telTrue": true, 
        "email": e.detail.value.userPhone, 
        "weixinOpenId": "534656778",
        "picUrl": "", 
        "headImgUrl": "", 
        "sex": 2, 
        "country": e.detail.value.userProfessional, 
        "province": e.detail.value.userOffices, 
        "city": e.detail.value.userWork,
        "district": "", 
        "address": e.detail.value.userJob, 
        "note": "",
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
        if (res.statusCode === 200) {
          wx.showToast({
            title: '提交成功',
          })
          that.setData({
            userInfo: ''
          })
          var pages = getCurrentPages(); // 获取页面栈
          var currPage = pages[pages.length - 1]; // 当前页面
          var prevPage = pages[pages.length - 2]; // 父级页面（返回上个页面）
          // 以此类推 pages.length - n
         
          var hh = e.detail.value.userProfessional
          console.log("信息是，，，，",hh);
          prevPage.setData({
            officeName: e.detail.value.userOffices,
            dutyName: e.detail.value.userJob,
            userTitle: e.detail.value.userProfessional
          })

          wx.navigateBack({
            delta: 1 // 返回的页面数量
          })

        } else {
          wx.showToast({
            title: '不成功',
          })
        }
      },
     
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