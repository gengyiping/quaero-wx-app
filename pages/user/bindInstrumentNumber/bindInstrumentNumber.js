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
    companyName:''
   
  },
  bindPicker: function (e) {
    console.log('角色picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      ind: e.detail.value
    })
    console.log('角色的值为：', e.detail.value),
    console.log("角色:" + e.detail.value.length);
  },

  bindPickerChange: function (e) {
    console.log('组picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
    })
    console.log('组的值为：', e.detail.value),
    console.log("组长度1:" + e.detail.value.length);
  },
  checkboxChange: function (e) {
    this.setData({
      typeId: e.detail.value,
      length: e.detail.value.length
    })
  },
  userBranchInput:function(e){
    this.setData({
      companyName:e.detail.value
    })
  },
  changeData: function (e){
    console.log("长度234556:" , e);
    var that = this;
    console.log("长度2:" ,that.data.array[e.target.dataset.pickervalue].id);
          wx.request({
            url: 'https://test.quaerolife.com/api/app/user/code',
            data: {
              "roleId": that.data.arrys[that.data.ind].id,
              "gid": that.data.array[that.data.index].id,
              "projectIds": that.data.typeId,
              "companyName": that.data.companyName,
            },
            method: 'POST',
            header: {
              "Content-Type": "application/json",
              'Authorization': getApp().globalData.token,
            },
            success(res) {
              console.log('邀请码是：', res.data)
              if(res.statusCode !== 200) {
                wx.showToast({
                    title: '提交失败',
               })
               }else if (res.data.success == false) {
                wx.showToast({
                  icon: 'none',
                  title: res.data.msg,
                  duration: 2000
                })
              } 
              that.setData({
                code: res.data.data
              })
            },
            fail(res){
              console.log("code=",res)
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
          roleName:res.data.roleName,
        })
        if (that.data.roleName.indexOf("super_admin") >= 0) {
          that.setData({
            showView: (!that.data.showView)
          })
        } else {
          that.setData({
            showView: (that.data.showView)
          })
        }
        console.log('111222211', res.data.id);
        getApp().post.request('https://test.quaerolife.com/api/app/user/userSubordinateRoleList', 'application/json', 'GET',
          {}).then(res => {
            console.log('角色的信息：', res.data)
            that.setData({
              arrys: res.data.data
            })
          })
        getApp().post.request('https://test.quaerolife.com/api/app/group/userGroupList', 'application/json', 'GET',
          {}).then(res => {
            console.log('组的信息：', res.data)
            that.setData({
              array: res.data.data,
            })
          })
        getApp().post.request('https://test.quaerolife.com/api/app/project/list', 'application/json', 'GET',
          {}).then(res => {
            console.log('项目', res.data)
            that.setData({
              arr: res.data.data,
            })
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