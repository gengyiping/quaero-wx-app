// pages/user/UserNumber/UserNumber.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: {},
    array: ['凯实管理员', '客户管理员', '部门负责人', '区域负责人', '工程师', '医院使用者'],
    index: 0,
    userid:'',
    
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  usefInfoSubmit:function(e){
    getApp().post.request('https://test.quaerolife.com/api/app/user/list', 'application/json', 'GET',
    {
      "name":'',
      "mobile":'',
      "gid":'',
      "pageNum":'1',
      "pageSize":10,
    }).then(res => {
      console.log("新的数据显示", res.data)
    })

  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that = this;
    getApp().post.request('https://test.quaerolife.com/api/app/user/list', 'application/json', 'GET',
      {
              "name":'',
              "mobile":'',
              "gid":'',
              "pageNum":'1',
              "pageSize":10,
      }).then(res => {
        console.log("新的数据显示", res.data)
        that.setData({
         items:res.data.data.list
       })
      })

  },

  downloadFile:function(e){
    console.log("此时的查看：",e)
    var that = this;
    getApp().post.request('https://test.quaerolife.com/api/app/user/list', 'application/json', 'GET',
      {
              "name":'',
              "mobile":'',
              "gid":'',
              "pageNum":'1',
              "pageSize":10,
      }).then(res => {
        console.log("新的数据显示", res.data)
        that.setData({
         items:res.data.data.list
       })
       var index=e.currentTarget.dataset.id
       console.log("跳转的界面显示",that.data.items[index])
       getApp().post.request('https://test.quaerolife.com/api/app/user/edit', 'application/json', 'GET',
      {
        userId:that.data.items[index].id
      }).then(res => {
        console.log("cishi新的数据显示", res.data.data.id)
       that.setData({
        userid:res.data.data.id,
       })
       console.log("cishi显示", that.data.userid)
         //   that.setData({
          //    realName: res.data.data.realName,
           //   mobile: res.data.data.mobile,
          //    roleName: res.data.data.roleName,
            //  gid: res.data.data.gid,
            //  groupName: res.data.data.groupName,
           // })
      })
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