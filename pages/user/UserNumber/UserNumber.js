// pages/user/UserNumber/UserNumber.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [
      { "code": "区域负责人1", "text": "张三" },
      { "code": "区域负责人2", "text": "李四" },
      { "code": "区域负责人3", "text": "王五" },
      { "code": "区域负责人4", "text": "张三" },
      { "code": "区域负责人5", "text": "李四"},
      { "code": "区域负责人6", "text": "王五" },
    ],
  

    array: ['凯实管理员', '客户管理员', '部门负责人', '区域负责人', '工程师', '医院使用者'],
    index: 0
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this
        wx.request({
            url: 'http:',
            headers: {
                'Content-Type': 'application/json'
            },
            success: function (res) {
                //将获取到的json数据，存在名字叫list的这个数组中
                that.setData({
                    code: res.data,
                    //res代表success函数的事件对，data是固定的，code是数组
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