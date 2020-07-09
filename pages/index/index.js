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
  onLoad: function (options) {
    var that=this;
  
    getApp().post.request('https://test.quaerolife.com/api/app/user/getSubscriptionAuthorization', 'application/json', 'GET',
      {}).then(res => {
        {
          console.log("此时状态值", res.data.data)
          if (res.data.data == false) {
            wx.showModal({
              title: '接收通知消息',
              content: '请点击确定\->勾选维修任务通知->勾选总是保持以上选择，不再询问->点击允许',
              success(res) {
                wx.requestSubscribeMessage({
                  tmplIds: ['sbB7c9RezqyN7kAdavARBYF7BzpXHaGXUgm5bmjZnr8'],
                  success(res) {
                    console.log('授权成功')
                      ;

                    getApp().post.request('https://test.quaerolife.com/api/app/user/subscriptionAuthorization', 'application/json', 'GET',
                      {}).then(res => {
                        console.log("新的数据显示", res.data)
                        wx.hideLoading()
                        console.log(res.data)
                        that.setData({
                          items: res.data.data,
                        })
                      })
                  },
                  fail: function (res) {
                    console.log('授权失败', res)
                  }
                })
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }
        }
      })

       
    
      }
})
