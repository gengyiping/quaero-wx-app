// pages/user/bindInstrumentNumber/bindInstrumentNumber.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:[],
    arrys:[],
    index:0,
    ind: 0,
    roleId:"0",
    code:'',
    arr:[],
  },
  bindPicker: function (e) {
    console.log('角色picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      ind: e.detail.value
    })
  },

  bindPickerChange: function (e) {
    console.log('组picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  changeData: function (e){
    var that = this;
    wx.getStorage({
      key: 'data',
      success: function (res) {
        console.log('11111111111', res.data.id);
        that.setData({
          userId: res.data.id,
        })
    wx.request({
      url: 'https://test.quaerolife.com/api/app/user/code',
      data: {
        "userId": that.data.userId,
        "roleId": that.data.arrys[e.currentTarget.dataset.pickervalue].id,
        "gid": that.data.array[e.target.dataset.pickervalue].id,
      },
      method: 'GET',
      header: {
        "Content-Type": "application/json"
      },
      success(res) {
        console.log('邀请码是：', res.data)
        if (res.data.success == false) {
          wx.showToast({
            title: res.data.msg,
          })
        }
       that.setData({
         code: res.data.data
       })
       
      },
    
    })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that = this;
    var userId;
    wx.getStorage({
      key: 'data',
      success: function (res) {
        console.log('11111111111', res.data.id);
        that.setData({
          userId: res.data.id,
        })
        console.log('111222211', res.data.id);
        wx.request({
    url:'https://test.quaerolife.com/api/app/user/userSubordinateRoleList',
          data: {
            "userId": that.data.userId,
          },
          method: 'GET',
          header: {
            "Content-Type": "application/json"
          },
          success(res){
            console.log('角色的信息：',res.data)
            that.setData({
              arrys:res.data.data
            })
          },
         
        })
        wx.request({
          url: 'https://test.quaerolife.com/api/app/group/userGroupList',
          data: {
            "userId":that.data.userId,
          },
          method: 'GET',
          header: {
            "Content-Type": "application/json"
          },
          success(res) {
            console.log('组的信息：', res.data)
            that.setData({
              array: res.data.data,
            })
            
          },

        })
        wx.request({
          url: 'https://test.quaerolife.com/api/app/project/list',
          data: {
            "userId": that.data.userId,
          },
          method: 'GET',
          header: {
            "Content-Type": "application/json"
          },
          success(res) {
            console.log('项目', res.data)
            that.setData({
              arr: res.data.data,
            })

          },

        })
      

      }
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