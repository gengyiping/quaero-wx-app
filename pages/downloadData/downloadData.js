// pages/downloadData/downloadData.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    item:{},
  },





  

 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
      var that = this;
      var show;
      wx.scanCode({
        success: (res) => {
          this.show =  res.result;
          that.setData({
            show: this.show
          })
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })

          wx.getStorage({
            key: 'data',
            success: function (res) {
              console.log('11111111111', res.data.id);
              that.setData({
                dataid: res.data.id,
              })

              wx.request({
                url: 'https://test.quaerolife.com/api/app/data/list',
                data: {
                  "userId": that.data.dataid,
                  "name": "",
                  "serialNum": that.data.show,
                  "pageNum":1,
                  "pageSize":10,

                },
                method: 'GET',
                header: {
                  'Content-Type': 'application/json'
                },
                success(res) {
                  console.log(res.data);
                  that.setData({
                    item: res.data.data.list,
                 })
                },


              })


            }
          })





        },
        fail: (res) => {
          wx.showToast({
            title: '联系管理员',
            icon: 'success',
            duration: 2000
          })
        },
        complete: (res) => {
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