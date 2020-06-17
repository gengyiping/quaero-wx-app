// pages/user/userInfo/usefInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataid:'',
  },
 
 
  usefInfoSubmit: function (e) {
    var that = this;
   
    wx.getStorage({
      key: 'data',
      success: function (res) {
        console.log('11111111111', res.data.id);
        that.setData({
          dataid: res.data.id,
        })
     
    wx.request({
      url: 'https://test.quaerolife.com/api/app/user',
      data: {
        "realName": e.detail.value.userName, 
        "mobile": e.detail.value.userPhone, 
        "invitationCode": e.detail.value.usercode,
        "userId": that.data.dataid, 
        "nickName": "", 
        "sex": 2, 
        "avatar": "",
        "email": 2,
        "country": "2020-04-15 10:12:39",
        "province": "127.0.0.1", 
        "city": "2020-04-15 10:12:39",
        "district": "127.0.0.1",
        "lastWeixinSignInTime": "2020-04-15 09:23:46",
        "address": 20.0,
        "note": ""
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      success(res) {
        console.log(res.data)
        if (e.detail.value.userName == '' || e.detail.value.userPhone == '' || e.detail.value.usercode=='') {
          wx.showToast({
            title: '所写的不能为空',
          })
        } else if (e.detail.value.userPhone.length != 11) {
          wx.showToast({
            title: '手机号格式不对',
          })
        }
        else if (e.detail.value.usercode.length != 6) {
          wx.showToast({
            title: '邀请码格式不对',
          })
        }
        else if (res.data.success == false) {
          wx.showToast({
            title: res.data.msg,
          })
        }
         else if (res.statusCode !== 200) {
          wx.showToast({
            title: '提交失败',
          })
        }
        else if (res.statusCode === 200) {
          wx.showToast({
            title: '提交成功',
          })
          that.setData({
            userInfo: '',

          }) 
         
        } 
      },
     
    
    })


        wx.requestSubscribeMessage({
          tmplIds: ['sbB7c9RezqyN7kAdavARBYF7BzpXHaGXUgm5bmjZnr8'],
          success(res) {
            console.log('已授权接收订阅消息')
          }
        })

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