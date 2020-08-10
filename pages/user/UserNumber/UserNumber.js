// pages/user/UserNumber/UserNumber.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contentlist: [],	
    items: {},
    index: 0,
    userid:'',
    array:[],
    auserid:'',
    flag: [],
    role: '',
    // addone :{id:0,name:"所有组"},
    // listas:[{id: 0, name: "所有组"}, {id: 3, name: "真组"},{id: 4, name: "看的组"}],
    listArray:[{id:'',name:"所有组"},],
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
    console.log("点击的次数:",that.data.index)
    console.log("点击的总数:",that.data.listArray.length)
  if(that.data.index==0){
    getApp().post.request('https://test.quaerolife.com/api/app/user/list', 'application/json', 'GET',
    {
      "name":e.detail.value.userName,
      "mobile":e.detail.value.userPhone,
      "gid":'',
      "pageNum":'1',
      "pageSize":17,
    }).then(res => {
      console.log("新的数据显示", res.data)
      that.setData({
        contentlist:res.data.data.list
      })
     if(res.data.data.total==0){
      wx.showToast({
        title: "筛选条件不正确",
        duration: 5000
      })
     }
    })
  }else{
    {
      getApp().post.request('https://test.quaerolife.com/api/app/user/list', 'application/json', 'GET',
      {
        "name":e.detail.value.userName,
        "mobile":e.detail.value.userPhone,
        "gid":that.data.array[(that.data.index)-1].id,
        "pageNum":'1',
        "pageSize":17,
      }).then(res => {
  
        console.log("新的数据显示", res.data)
        that.setData({
          contentlist:res.data.data.list
        })
       if(res.data.data.total==0){
        wx.showToast({
          title: "筛选条件不正确",
          duration: 5000
        })
       }
      })
    }
  }
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
            listArray: that.data.listArray.concat(res.data.data),
          })
          console.log("新的数据为：",that.data.array)
          console.log("新的数据为222：",that.data.listArray)
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
          contentlist:res.data.data.list,
         role:getApp().post.register(that.data.roleName)
       })
       console.log("此人是相同角色：",that.data.role)
       console.log("总数为：",res.data.data.total)
       console.log("赋值后的数据显示",that.data.contentlist[0].roleName)
       console.log("本人的角色",getApp().post.register(that.data.roleName))
      //  var role=getApp().post.register(that.data.roleName)
       for(var i=0;i<res.data.data.total;i++){
        console.log("赋值后的数据显示",that.data.contentlist[i].roleName)
        var rolee=getApp().post.register(that.data.contentlist[i].roleName)
        console.log("列表里的角色：",rolee)
        that.setData({
          ['flag['+i+']'] : rolee
        })
        console.log("此人是相同角色123：",that.data.flag[i])
       
        // if (rolee==role) {
        //  console.log("此人是相同角色：",role)
    // }
      }
     
      })
    }
  })
  },
  downloadFile:function(e){
    wx.showLoading({
      title: "查看中...",
      mask: true,
    });
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
        wx.hideLoading()
        console.log("新的数据显示", res.data)
        that.setData({
          contentlist:res.data.data.list
       })
       var index=e.currentTarget.dataset.id
       console.log("跳转的界面显示",that.data.contentlist[index].id),
       that.setData({
         userid:that.data.contentlist[index].id
       })
       wx.navigateTo({
        url:"/pages/user/bind/bind?lookuserid="+that.data.userid
     })
      })
     
  },
  addData:function(e){
    wx.showLoading({
      title: "添加中...",
      mask: true,
    });
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
        wx.hideLoading()
        console.log("用户列表显示数据", res.data.data.list)
        that.setData({
          contentlist:res.data.data.list,
       })
       var index=e.currentTarget.dataset.id
       console.log("添加跳转需要携带的参数",that.data.contentlist[index].id)
       that.setData({
        auserid:that.data.contentlist[index].id,
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
          contentlist:res.data.data.list
       })
       var index=e.currentTarget.dataset.id
       console.log("移出跳转的界面显示id",that.data.contentlist[index].id),
       wx.showModal({
        content: '确定移除'+that.data.contentlist[index].realName,
        icon:'none',
        success:function(res){
          if (res.confirm) {
            wx.showLoading({
              title: "移除中...",
              mask: true,
            });
            getApp().post.request('https://test.quaerolife.com/api/app/group/removeUser', 'application/json', 'GET',
           {
             removeId:that.data.contentlist[index].id,
           }).then(res => {
            wx.hideLoading()
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
          contentlist:res.data.data.list
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
          contentlist:res.data.data.list
       })
       var index=e.currentTarget.dataset.id
       console.log("移出跳转的界面显示id",that.data.contentlist[index].id),
       wx.showModal({
        content: '确定删除 '+that.data.contentlist[index].realName+' 吗？',
        icon:'none',
        success:function(res){
          if (res.confirm) {
            wx.showLoading({
              title: "删除中...",
              mask: true,
            });
            getApp().post.request('https://test.quaerolife.com/api/app/user/'+that.data.contentlist[index].id, 'application/json', 'DELETE',
           {
           }).then(res => {
            wx.hideLoading()
             getApp().post.request('https://test.quaerolife.com/api/app/user/list', 'application/json', 'GET',
      {
              "name":'',
              "mobile":'',
              "gid":'',
              "pageNum":'1',
              "pageSize":17,
      }).then(res => {
        that.setData({
          contentlist:res.data.data.list
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
    var that=this
    console.log("下拉开始刷新")
    wx.showNavigationBarLoading()
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
        contentlist:res.data.data.list
     })
    })
    setTimeout(() => {
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
      console.log("下拉停止刷新")
    }, 2000);
  },
  getInfo: function (message) {
    wx.showLoading({
      title: message,
      duration: 5000
    });
    var that = this;
    getApp().post.request('https://test.quaerolife.com/api/app/user/list', 'application/json', 'GET',
    {
      "name":e.detail.value.userName,
      "mobile":e.detail.value.userPhone,
      "gid":that.data.array[(that.data.index)-1].id,
      "pageNum": that.data.pageNum,
      "pageSize": that.data.pageSize,
    }).then(res => {
      console.log("成功1",res.data.data.list.length)
      console.log("成功2",res.data.data.total)
        var contentlistTem = that.data.contentlist;
        if (res.data.data.list.length > 0) {
          if (that.data.pageNum == 1) {
            contentlistTem = []
          }
          var contentlist = res.data.data.list;
          if (contentlist.length < that.data.pageSize) {
            console.log("进来222222221")
            that.setData({
              contentlist: contentlistTem.concat(contentlist),
             
              hasMoreData: false
              
            })
            console.log("进来233333333321")
          } else {
            that.setData({
              contentlist: contentlistTem.concat(contentlist),
              hasMoreData: true,
              pageNum: that.data.pageNum + 1,
            
              
            })
            console.log("pageNum加1：",that.data.pageNum)
           
          }
        } 
       
        console.log("此时的数据：",that.data.contentlist)
    })
    wx.hideLoading()
    complete: (res) => {
    }
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("进来1111111111")
    if (this.data.hasMoreData) {
      this.getInfo('加载更多数据')
      console.log("来1111111111")
    } else {
      wx.showToast({
        title: '没有更多数据',
      })
    }
    console.log("出去1111111111")
  },   
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})