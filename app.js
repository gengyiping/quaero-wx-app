//app.js
App({
  onLaunch: function () {
    wx.login({
    success: res => {
        // 获取到用户的 code 之后：res.code
    console.log("用户的code:" + res.code);
      wx.request({
        url: 'https://test.quaerolife.com/api/app/login',
        data: {
          "code": res.code,
        },
        method: 'GET',
        header: {
          'Content-Type': 'application/json'
        },
        success(res) {
          console.log(res.data)
   
          wx.setStorage({
            key: 'data',
            data:res.data.data,
          })
        },
      })
     
   
      }
    })

   


  }
})
