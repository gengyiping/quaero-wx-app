//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false,
    duration: 1000,
    interval: 3000,
    indicatorColor: '#fff',
    indicatorActiveColor: '#d1a87a',
    autoplay: true,
    circular: true,
    indicatorDots: true,
    background: ['/pages/img/quaero1.png', '/pages/img/quaero2.png', '/pages/img/quaero3.png'],
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })

  
  },
  logins: function (options) {
    wx.requestSubscribeMessage({
      tmplIds: ['sbB7c9RezqyN7kAdavARBYF7BzpXHaGXUgm5bmjZnr8'],
      success(res) {
        console.log('授权成功')
      },
      fail: function (res) {
        console.log('授权失败')
      }
    })
  },
  onLoad: function (options) {
    wx.requestSubscribeMessage({
      tmplIds: ['sbB7c9RezqyN7kAdavARBYF7BzpXHaGXUgm5bmjZnr8'],
      success(res) {
        console.log('授权成功' )
      },
      fail: function (res) {
        console.log('授权失败')
      }
    })
  },
})
