//app.js
import Post from './class/api/Post.js'
import WxValidate from './utils/WxValidate.js'

const post = new Post();
App({

  post:post,
  globalData:{
    token: null,
    url:'https://test.quaerolife.com/api/app/login',
    code: null,
  },
  quaeroLogin: function(){
    let that = this
    wx.login({
      success: res => {
        // 获取到用户的 code 之后：res.code
      console.log("用户的code:" + res.code)
      that.globalData.code = res.code
      wx.request({
        url: that.globalData.url,
        data: {
          "code": res.code,
        },
        method: 'GET',
        header: {
          'Content-Type': 'application/json'
        },
        success(res) {
          console.log("登录", res)
          that.globalData.token = res.data.data.token
          console.log(res)
          wx.setStorage({
            key: 'data',
            data: res.data.data,
          })
          wx.setStorage({
            key: 'Authorization',
            data: res.data.data.token,
          })
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
        },
        fail(res){
          console.log("login fail=",res)
          wx.showToast({
            title: res.errMsg,
            duration: 5000,
            icon:'none'
          })
        }
      })   
      }
    })
    
     

     



    
  },

  onLaunch: function () {
   this.quaeroLogin()
  },
})
