// pages/downloadData/downloadData.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    item:{},
    fileName:'',
    hidden: true,									//隐藏表单控件
  	pageNum: 1,										//当前请求数据是第几页
	  pageSize: 15,									//每页数据条数
	  hasMoreData: true,								//上拉时是否继续请求数据，即是否还有更多数据
     contentlist: [],	
  },
  fileName: function (e) {
    this.setData({
      fileName: e.detail.value
    })
  },
  filechangeData:function(e){
    wx.showLoading({
      title: '查询中...',
      duration: 5000
    });
    var that=this;
  getApp().post.request('https://test.quaerolife.com/api/app/data/list', 'application/json', 'GET',
          {
            "name": that.data.fileName,
            "pageNum": 1,
            "pageSize":15,
          }).then(res => {
            that.setData({
              contentlist: res.data.data.list,
            })
           // console.log("下载的路径：", that.data.item[0].data)
           
    })
    wx.hideLoading()
  },
  download:function(e){
    var that = this;
    console.log('下载相关信息：',e);
    var index=e.currentTarget.dataset.id
    var type=that.data.contentlist[index].data
    var file=type.substring(type.lastIndexOf("."))
    console.log("123456后缀显示：",type)
    wx.downloadFile({
      url: that.data.contentlist[index].data,
      if(file=".zip"){
        header: {
          ".zip","application/zip" 
        } 
      },elseif(file=".pdf"){
        header: {
          ".pdf","application/pdf"
          
        }
      },
      success: function (res) {
        wx.setClipboardData({
          data: type,
          success: function (res) {
          wx.showModal({
          title: '提示',
          content: '复制成功,打开浏览器下载',
          showCancel: false
          });
          }
          })
      },
      fail: function(res) {
        wx.showModal({
          title: '下载失败',
          content: '请联系管理员',
          icon:'none'
        })
      },
      complete: function (res) { },
    })

  },
  previewview:function(e){
    var that = this;
    console.log("12345预览打印",e)
    var type=that.data.contentlist[e.currentTarget.dataset.id].data
    var file=type.substring(type.lastIndexOf("."))
    wx.downloadFile({
      url: that.data.contentlist[e.currentTarget.dataset.id].data,
      if(file=".zip"){
        header: {
          ".zip","application/zip" 
        } 
      },elseif(file=".pdf"){
        header: {
          ".pdf","application/pdf"
        }
      },
      success: function (res) {
        const filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log('打开文档成功')
          }
        })
      }
    })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    var show;
    var that = this;
    wx.getStorage({
      key: 'data',
      success: function (res) {
        // that.setData({
        //   roleName: res.data.roleName,
        // })
        console.log("res=",res.data.roleName)

        if (res.data.roleName.indexOf("tourist") >= 0) {
      wx.scanCode({
        success: (res) => {
          that.show =  res.result;
          that.setData({
            show: that.show
          })
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
          getApp().post.request('https://test.quaerolife.com/api/app/data/list', 'application/json', 'GET',
            {
              "name": "",
              "serialNum": that.data.show,
              "pageNum": 1,
              "pageSize": 15,
            }).then(res => {
              that.setData({
                contentlist: res.data.data.list,
              })
            })
            }
          })
        that.setData({
          showView: (!that.data.showView),//隐藏搜索框，显示扫一扫
          showVieww: ''
        })
      }else{
        console.log('22333332进入')
        that.setData({
          showView: '',//隐藏扫码序列号，显示搜索框
          showVieww: (!that.data.showVieww)
        })
      }
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
  // 页面初始化 options为页面跳转所带来的参数
  var that = this
  that.getInfo('正在加载数据...')
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
    this.filechangeData()
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
    getApp().post.request('https://test.quaerolife.com/api/app/data/list', 'application/json', 'GET',
    {
      "name": that.data.fileName,
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