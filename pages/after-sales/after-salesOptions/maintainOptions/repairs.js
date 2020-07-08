// pages/after-sales/after-salesOptions/maintainOptions/repairs.js
var adds = {}; 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_arr: [],
    formdata: '', 
    arr:[],
    index: 0,
  },
  repairsSubmit: function (e) {
    wx.showLoading({
      title: "提交中...",
      mask: true
    });
    var that = this;    
    console.log('进入1');
   
    getApp().post.request('https://test.quaerolife.com/api/app/repair/malfunction', 'application/json', 'POST',
      {
        "equipmentSerialNum": e.detail.value.equipmentSerialNum,
        "equipmentAddress": e.detail.value.equipmentAddress,
        "equipmentName": e.detail.value.equipmentName,
        "contact": e.detail.value.contact,
        "equipmentProblem": e.detail.value.equipmentProblem,
        "description": that.data.concent1,
        "picture": that.data.arr,
        "video": null,
        "data": null,
        "code": "",
      }).then(res => {
        console.log("新的数据显示", res.data)
        wx.hideLoading()
        console.log(res.data)
        if (res.statusCode !== 200) {
          wx.showToast({
            title: '提交失败',
          })
        } else if (res.data.success == false) {
          wx.showToast({
            icon: 'none',
            title: res.data.msg,
            duration: 5000
          })
        } else if (res.data.success === true) {
          wx.showToast({
            title: '成功',
          })
          that.setData({
            userInfo: '',
            concent1: ''
          })
        } 
      })
 },
  bindTextAreaBlur: function (e) {
    console.log(e.detail.value)
    this.setData({
      concent1: e.detail.value,
    })
  },

   upimg: function () {
     
    var that = this;
    
    if (this.data.img_arr.length < 3) {
      wx.chooseImage({
        sizeType: ['original', 'compressed'],
        success: function (res) {
          var tempFilePath = res.tempFilePaths[res.tempFilePaths.length-1]
          console.log("path=",tempFilePath)
          console.log("temp=",res.tempFilePaths)
          wx.compressImage({
            src: res.tempFilePaths[res.tempFilePaths.length-1],
            quality: 80, // 压缩质量
            success: function (res) {
              that.setData({
                img_arr: that.data.img_arr.concat(res.tempFilePath)
              })
              console.log("img_arr=",that.data.img_arr)
             
              wx.uploadFile({
                url: 'https://test.quaerolife.com/api/app/file/upload',
                filePath: that.data.img_arr[that.data.index],
                name: 'file',
                formData: {
                  'type': 'Picture' 
                },
                header: {
                  'Content-Type': 'application/json',
                  'Authorization': getApp().globalData.token,
                },
                success: function (res) {
                  console.log('此时的data数据是：', res.data);
                  var object = JSON.parse(res.data)
                  console.log('此时的i=,file数据是：', that.data.index,object.data);
                  that.setData({
                    arr: that.data.arr.concat(object.data)
                  })
                  console.log("arr=",that.data.arr);
                },
                fail: function (res) {
                  console.log('此时信息',res);
                },
              })
               

            },
            fail: function(res){
              console.log(res)
            }
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
    this.data.arr.splice(index,1)
    this.setData({
      img_arr: imagelist,
      isShow: true
    })
    console.log(JSON.stringify(e))

  },

  uploadLog: function(e) {
    wx.chooseMessageFile({
      count:1,
      type:'file',
      success(res){
        const temFilePaths=res.temFilePaths
        console.log('选择',res)
      }
    })
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