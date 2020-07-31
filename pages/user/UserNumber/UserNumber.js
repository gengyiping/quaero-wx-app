// pages/user/UserNumber/UserNumber.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: {},
    index: 0,
    userid:'',
    
    array:[],
    auserid:'',
    flag:0,
    addone :{id:0,name:"所有组"},
    //lista:[{id: 0, name: "所有组"}, {id: 3, name: "真组"},{id: 4, name: "看的组"}],
    lista:[],
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  usefInfoSubmit:function(e){
    wx.showLoading({
      title: "提交中...",
      mask: true
    });
    var that=this
    
    getApp().post.request('https://test.quaerolife.com/api/app/user/list', 'application/json', 'GET',
    {
      "name":e.detail.value.userName,
      "mobile":e.detail.value.userPhone,
      "gid":that.data.array[that.data.index].id,
      "pageNum":'1',
      "pageSize":17,
    }).then(res => {

      console.log("新的数据显示", res.data)
      that.setData({
        items:res.data.data.list
      })
     if(res.data.data.total==0){
      wx.showToast({
        title: "筛选条件不正确",
        duration: 5000
      })
     }
    })
    wx.hideLoading()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that = this;
   
    wx.getStorage({
      key: 'data',
      success: function (res) {
        that.setData({
          roleName:res.data.roleName,
        })
        if (that.data.roleName.indexOf("admin") >= 0) {
          that.setData({
            showView: (!that.data.showView)
          })
        } else {
          that.setData({
            showView: (that.data.showView)
          })
        }
        getApp().post.request('https://test.quaerolife.com/api/app/group/userGroupList', 'application/json', 'GET',
        {}).then(res => {
         
          console.log('组的信息：', res.data)
          that.setData({
            array: res.data.data,
            
           
          })
          lista:that.data.lista.push(that.data.addone)
          for (var i = 0; i < res.data.data.length; i++) {
            lista:that.data.lista.push(that.data.array[i]);
          }
          console.log("新的数据为：",that.data.array)
          console.log("新的数据为222：",that.data.lista)
        })
      getApp().post.request('https://test.quaerolife.com/api/app/user/list', 'application/json', 'GET',
      {
              "name":'',
              "mobile":'',
              "gid":'',
              "pageNum":'1',
              "pageSize":17,
      }).then(res => {
        console.log("刚进入的数据显示", res.data)
        that.setData({
         items:res.data.data.list
       })
       console.log("总数为：",res.data.data.total)
       console.log("赋值后的数据显示",that.data.items[0].roleName)
       console.log("本人的角色",that.data.roleName)
       for(var i=0;i<res.data.data.total;i++){
        console.log("赋值后的数据显示",that.data.items[i].roleName)
       
      }
      })
    }
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
              "pageSize":17,
      }).then(res => {
        console.log("新的数据显示", res.data)
        that.setData({
         items:res.data.data.list
       })
       var index=e.currentTarget.dataset.id
       console.log("跳转的界面显示",that.data.items[index].id),
       that.setData({
         userid:that.data.items[index].id
       })
       wx.navigateTo({
        url:"/pages/user/bind/bind?lookuserid="+that.data.userid
     })
      })
  },
  addData:function(e){
    console.log("添加用户：",e)
    var that = this;
    getApp().post.request('https://test.quaerolife.com/api/app/user/list', 'application/json', 'GET',
      {
              "name":'',
              "mobile":'',
              "gid":'',
              "pageNum":'1',
              "pageSize":17,
      }).then(res => {
        console.log("用户列表显示数据", res.data.data.list)
        that.setData({
         items:res.data.data.list,
       })
       var index=e.currentTarget.dataset.id
       console.log("添加跳转需要携带的参数",that.data.items[index].id)
       that.setData({
        auserid:that.data.items[index].id,
      })
      wx.navigateTo({
        url:"/pages/user/add/add?adduserid="+that.data.auserid
     })
      console.log("添加跳转需要携带的参数2",that.data.auserid)
      })
  },
  moveoutData:function(e){
    var that = this;
    getApp().post.request('https://test.quaerolife.com/api/app/user/list', 'application/json', 'GET',
      {
              "name":'',
              "mobile":'',
              "gid":'',
              "pageNum":'1',
              "pageSize":17,
      }).then(res => {
        that.setData({
         items:res.data.data.list
       })
       var index=e.currentTarget.dataset.id
       console.log("移出跳转的界面显示id",that.data.items[index].id),
       wx.showModal({
        content: '确定移除',
        icon:'none',
        success:function(res){
          if (res.confirm) {
            getApp().post.request('https://test.quaerolife.com/api/app/group/removeUser', 'application/json', 'GET',
           {
             removeId:that.data.items[index].id,
           }).then(res => {
             console.log("移出用户id显示", res.data)
             getApp().post.request('https://test.quaerolife.com/api/app/user/list', 'application/json', 'GET',
      {
              "name":'',
              "mobile":'',
              "gid":'',
              "pageNum":'1',
              "pageSize":17,
      }).then(res => {
        that.setData({
         items:res.data.data.list
       })
      })
           })
         } else if (res.cancel) {
           console.log('用户点击取消')
         }
         
        }
      })
      })
  },
  deleteData:function(e){
    console.log("删除的e:",e)
    var that = this;
    getApp().post.request('https://test.quaerolife.com/api/app/user/list', 'application/json', 'GET',
      {
              "name":'',
              "mobile":'',
              "gid":'',
              "pageNum":'1',
              "pageSize":17,
      }).then(res => {
        that.setData({
         items:res.data.data.list
       })
       var index=e.currentTarget.dataset.id
       console.log("移出跳转的界面显示id",that.data.items[index].id),
       wx.showModal({
        content: '确定删除吗？',
        icon:'none',
        success:function(res){
          if (res.confirm) {
            getApp().post.request('https://test.quaerolife.com/api/app/user/'+that.data.items[index].id, 'application/json', 'DELETE',
           {
           }).then(res => {
             getApp().post.request('https://test.quaerolife.com/api/app/user/list', 'application/json', 'GET',
      {
              "name":'',
              "mobile":'',
              "gid":'',
              "pageNum":'1',
              "pageSize":17,
      }).then(res => {
        that.setData({
         items:res.data.data.list
       })
      })
           })
         } else if (res.cancel) {
           console.log('用户点击取消')
         }
         
        }
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