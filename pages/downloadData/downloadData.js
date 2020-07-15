// pages/downloadData/downloadData.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    item:{},
    fileName:'',
  },
  fileName: function (e) {
    this.setData({
      fileName: e.detail.value
    })
  },
  filechangeData:function(e){
    var that=this;
  getApp().post.request('https://test.quaerolife.com/api/app/data/list', 'application/json', 'GET',
          {
            "name": that.data.fileName,
            "pageNum": 1,
            "pageSize": 10,
          }).then(res => {
            that.setData({
              item: res.data.data.list,
            })
           // console.log("下载的路径：", that.data.item[index].data)
      
    })
  },

  download:function(e){
    let index
      = e.currentTarget.dataset.id;
    var that = this;
    console.log('下载相关信息：',e);
    
    wx.downloadFile({
      
      url: that.data.item[0].data,
      header: {},
      success: function (res) {
        var rr = res.tempFilePath;
        console.log(rr);
        wx.saveImageToPhotosAlbum({

          filePath: rr,
          success(res) {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            })
          }
        })
      },
      fail: function (res) {
        console.log('文件下载失败');
      },
      complete: function (res) { },
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
              "pageSize": 10,
            }).then(res => {
              that.setData({
                item: res.data.data.list,
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