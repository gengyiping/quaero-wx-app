// pages/after-sales/after-salesOptions/serviceStaff.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items:[],
    companyName:'',
  },
  userBranch: function (e) {
    this.setData({
      companyName: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  changeData: function (e) {
    var that = this;
    console.log('进入1');
    
        wx.showLoading({
          title: "提交中...",
          mask: true
        });
    getApp().post.request('https://test.quaerolife.com/api/app/user/servicePersonnelList', 'application/json', 'GET',
      {
        "serialNum": that.data.companyName
      }).then(res => {
        console.log("新的数据显示", res.data)
        wx.hideLoading()
        console.log(res.data)
        that.setData({
          items: res.data.data,
        })
      }).catch(err=>{
        console.log("错误show：",err)
      })
      },
   
 
  scaning:function(e){
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
        wx.request({
          url: 'https://test.quaerolife.com/api/app/user/servicePersonnelList',
          data: {
            "serialNum": that.data.show,
          },
          method: 'GET',
          header: {
            'Content-Type': 'application/json',
            'Authorization': getApp().globalData.toke,
          },
          success(res) {
            console.log(res.data)
            that.setData({
              items: res.data.data,
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