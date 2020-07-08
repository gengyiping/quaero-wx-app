// pages/user/UserNumber/UserNumber.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [{ id: 0, text: '小yyyyy杨', area:'上yyyyy海',download: '',preview: ''},
      { id: 1, text: '小样', area: '上海',download: '',preview: ''},
      { id: 2, text: '小吴', area: '嘉兴',download: '',preview: ''},
      { id: 3, text: '小张', area: '嘉兴',download: '',preview: ''},
      { id: 4, text: '小吴', area: '杭州',download: '',preview: ''}
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
  usefInfoSubmit:function(e){
    var that = this;

    wx.getStorage({
      key: 'data',
      success: function (res) {
        console.log('11111111111', res.data.id);
        that.setData({
          dataid: res.data.id,
        })
        var use = that.data.dataid;
        console.log('66666611', use);
        wx.request({
          url: 'https://test.quaerolife.com/api/app/user/list',
          data:{
              "userId":that.data.dataid,
              "name":'',
              "mobile":'',
              "gid":'',
              "pageNum":'1',
              "pageSize":10,
          },
          method: 'GET',
          header: {
            'Content-Type': 'application/json',
            'Authorization': getApp().globalData.toke,
          },
          success(res) {
            console.log(res.data)
            that.setData({
              realName: res.data.data.realName,
              mobile: res.data.data.mobile,
              roleName: res.data.data.roleName,
              gid: res.data.data.gid,
              groupName: res.data.data.groupName,
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