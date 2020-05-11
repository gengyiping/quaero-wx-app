// pages/after-sales/after-salesOptions/maintainOptions/repairs.js
var adds = {}; 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_arr: [],
    formdata: '', 
  },
  repairsSubmit: function (e) {
    this.upload()
    var that = this;  
    console.log('进入1');
    wx.request({
      url: 'https://test.quaerolife.com/api/app/repair',
      data:{
        "name": "故障报修",
        "type": 1, 
        "state": e.detail.value.state,
        "instrumentName": e.detail.value.instrumentName,
        "instrumentAddress": e.detail.value.instrumentAddress,
        "contact": e.detail.value.contact,
        "instrumentProblem": e.detail.value.instrumentProblem,
        "weixinOpenId":123123123,
        "description": this.data.concent1,
        "picture": "",
         "video": "", 
         "data": "", 
         "weixinOpenId": "123123123"
      },
      method:'POST',
      header: {
        'Content-Type': 'application/json'
      },
      success (res) {
        console.log(res.data)
      },
      fail(res)  {
        console.log("fail=" + res.data)
      }
     
    
    })
 },
  bindTextAreaBlur: function (e) {
    console.log(e.detail.value)
    this.setData({
      concent1: e.detail.value,
    })
  },

  upload: function () {
    var that = this
    for (var i = 0; i < this.data.img_arr.length; i++) {
      console.log('进入2');
      wx.uploadFile({
        url: 'https://test.quaerolife.com/api/app/repair/upload',
        filePath: that.data.img_arr[i],
        name: 'content',
        formData: adds,
        success: function (res) {
          console.log(res)
         
        },
         fail(res) {
          console.log("fail=" + res.data)
        }
      })
    }
   
  },

  upimg: function () {
    var that = this;
    if (this.data.img_arr.length < 3) {
      wx.chooseImage({
        sizeType: ['original', 'compressed'],
        success: function (res) {
          that.setData({
            img_arr: that.data.img_arr.concat(res.tempFilePaths)
          })
        }
      })
    } else {
      wx.showToast({
        title: '最多上传三张图片',
        icon: 'loading',
        duration: 3000
      });
    }
  },
  closeOption(e) {  
    let  index
     = e.currentTarget.dataset.id;
    let imagelist = this.data.img_arr;
    imagelist.splice(index, 1);
    this.setData({
      img_arr: imagelist,
      isShow: true
    })
    console.log(JSON.stringify(e))

  },

  uploadLog: function(e) {
    wx.chooseMessageFile()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
   
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