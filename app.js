//app.js
import Post from './class/api/Post.js'

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
        },
        fail(res){
          console.log("login fail=",res)
        }
      })   
      }
    })
  },

  onLaunch: function () {
   this.quaeroLogin()
  }
})
