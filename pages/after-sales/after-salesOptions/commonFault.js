// pages/after-sales/after-salesOptions/commonFault.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [],
    codeName: '',
    pageNum: 1,										//当前请求数据是第几页
	  pageSize: 8,									//每页数据条数
	  hasMoreData: true,								//上拉时是否继续请求数据，即是否还有更多数据
     contentlist: [],	
     Height:0
  },
  coderanch: function (e) {
    this.setData({
      codeName: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  Lookmore:function(e){
    wx.showLoading({
      title: "查看中...",
      mask: true,
    });
    console.log("此时的查看：",e)
    var that = this;
    getApp().post.request('https://test.quaerolife.com/api/app/data/errorCodeList', 'application/json', 'GET',
      {
        "code": that.data.codeName,
        "pageNum": 1,
        "pageSize": 8,
      }).then(res => {
        wx.hideLoading()
        console.log("11--->新的数据显示", res.data)
       
       var index=e.currentTarget.dataset.id
       console.log("11----->查看更多页面跳转",that.data.contentlist),
       console.log("111----->查看更多页面跳转",that.data.contentlist[index].code),
       
       that.setData({
         code:that.data.contentlist[index].code,
        
       })
      
       wx.navigateTo({
        url:"/pages/user/bind/look?lookuserid="+that.data.code,
     })
      })
  },





  changeData: function (e) {
    wx.showLoading({
      title: "查询中...",
      mask: true
    });
    var that = this;
    console.log('进入1');

    getApp().post.request('https://test.quaerolife.com/api/app/data/errorCodeList', 'application/json', 'GET',
      {
        "code": that.data.codeName,
        "pageNum": 1,
        "pageSize": 8,
      }).then(res => {
        console.log("新的数据显示", res.data)
        console.log(res.data)
        that.setData({
          contentlist: res.data.data.list,
        })
        if(res.data.data.total==0){
          wx.showToast({
            icon: 'none',
            title: "无此故障信息",
          })
        }
        
      }).catch(err=>{
        console.log("错误show：",err)
       
      })
      wx.hideLoading()
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
        
        getApp().post.request('https://test.quaerolife.com/api/app/data/errorCodeList', 'application/json', 'GET',
          {
            "code": that.data.show,
            "pageNum": 1,
            "pageSize": 8,
          }).then(res => {
            console.log("新的数据显示", res.data)
            wx.hideLoading()
            console.log(res.data)
            that.setData({
              contentlist: res.data.data.list,
            })
            if(res.data.data.total==0){
              wx.showToast({
                icon: 'none',
                title: "无此故障信息",
              })
            }
          })
      }
    })

  },

  getInfo: function (message) {
    wx.showLoading({
      title: message,
      duration: 5000
    });
    var that = this;
    getApp().post.request('https://test.quaerolife.com/api/app/data/errorCodeList', 'application/json', 'GET',
    {
      "code": that.data.codeName,
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.getInfo('正在加载数据...')
    wx.getSystemInfo({
      success: (res) => {
        
        that.setData({
          Height: res.windowHeight
        })
        console.log('此时的高度',that.data.Height)
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
    console.log("下拉开始刷新")
    wx.showNavigationBarLoading()
    this.changeData()
    setTimeout(() => {
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
      console.log("下拉停止刷新")
    }, 2000);
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