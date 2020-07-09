

Page({

  /**
   * 页面的初始数据
   */
  data: {
    officeName: '',
    dutyName: '',
    userTitle: '',
    showView: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    wx.getStorage({
      key: 'data',
      success: function (res) {
        console.log('11111111111', res.data.id);
        that.setData({
          roleName:res.data.roleName,
        })
        if ((that.data.roleName.indexOf("root") >= 0 || that.data.roleName.indexOf("admin") >= 0 || that.data.roleName.indexOf("manager") >= 0 || that.data.roleName.indexOf("department") >= 0)) {
          that.setData({
            showView: (that.data.showView)
          })
        } else {
          that.setData({
            showView: (!that.data.showView)
          })
        }

        getApp().post.request('https://test.quaerolife.com/api/app/user/edit', 'application/json', 'GET',
          {}).then(res => {
            console.log("新的数据显示", res.data)
            that.setData({
              dutyName: res.data.data.roleName,
              userTitle: res.data.data.groupName,
              officeName: res.data.data.companyName,
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
    var that = this
    wx.request({
      url: 'https://test.quaerolife.com/api/app/account',
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },

      success: function (res) {
        //将获取到的json数据，存在名字叫list的这个数组中
        that.setData({
          
          address: e.detail.value.userJob
          //res代表success函数的事件对，data是固定的，code是数组
        })
      }
    })
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