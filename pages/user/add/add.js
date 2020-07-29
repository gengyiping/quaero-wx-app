// pages/user/add/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:[],
    index:0,
    adduserid:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({  
      adduserid: options.adduserid  
    })
    console.log("跳转传参",this.data.adduserid)


    var that=this
    getApp().post.request('https://test.quaerolife.com/api/app/group/userGroupList', 'application/json', 'GET',
    {}).then(res => {
      console.log('组的信息：', res.data)
      that.setData({
        array: res.data.data,
      })

    }) 
  },
usefInfoSubmit:function(e){
  var that=this
  console.log("打印的是：",e)
  console.log("打印的是666：",that.data.array[that.data.index].id)
    getApp().post.request('https://test.quaerolife.com/api/app/group/addUser', 'application/json', 'GET',
   {
      addedId:that.data.adduserid,
      groupId: that.data.array[that.data.index].id,
    }).then(res => {
    console.log("打印的是：",res.data)
    wx.navigateTo({
      url:"/pages/user/UserNumber/UserNumber"
      
   })
   
    })
},
bindPickerChange: function (e) {
  console.log('picker发送选择改变，携带值为', e.detail.value)
  this.setData({
    index: e.detail.value
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