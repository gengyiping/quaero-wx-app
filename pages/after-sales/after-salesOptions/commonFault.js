// pages/after-sales/after-salesOptions/commonFault.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [],
    codeName: '',
  },
  coderanch: function (e) {
    this.setData({
      codeName: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  changeData: function (e) {
    wx.showLoading({
      title: "查询中...",
      mask: true
    });
    var that = this;
    console.log('进入1');
    wx.getStorage({
      key: 'data',
      success: function (res) {
        console.log('11111111111', res.data.id);
        that.setData({
          userId: res.data.id,
        })
    wx.request({
      url: 'https://test.quaerolife.com/api/app/data/errorCodeList',
      data: {
        "userId":that.data.userId,
        "code": that.data.codeName,
        "pageNum":1,
        "pageSize":10,

      },
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success(res) {
        wx.hideLoading()
        console.log(res.data)
        that.setData({
          items: res.data.data.list,

        })
      },
    })
      }
    })
  },
  scaning: function (e) {
    var that = this;
    var show;
    wx.scanCode({
      success: (res) => {
        this.show = res.result;
        that.setData({
          show: this.show
        })
        wx.showToast({
          title: '结果显示中',
          icon: 'success',
          duration: 2000
        })
        wx.getStorage({
          key: 'data',
          success: function (res) {
            console.log('11111111111', res.data.id);
            that.setData({
              userId: res.data.id,
            })
        wx.request({
          url: 'https://test.quaerolife.com/api/app/data/errorCodeList',
          data: {
            "userId":that.data.userId,
            "code": that.data.show,
            "pageNum": 1,
            "pageSize": 10,
          },
          method: 'GET',
          header: {
            'Content-Type': 'application/json'
          },
          success(res) {
            console.log(res.data)
            that.setData({
              items: res.data.data.list,
            })
          },
        })
          }
        })
      }
    })

  },

    
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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