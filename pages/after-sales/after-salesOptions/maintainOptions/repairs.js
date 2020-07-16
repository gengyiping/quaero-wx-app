// pages/after-sales/after-salesOptions/maintainOptions/repairs.js
import WxValidate from '../../../../utils/WxValidate';
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
    form:{
    equipmentName:'',
    equipmentSerialNum:'',
    equipmentAddress:'',
    contact:'',
    equipmentProblem:'',
    },
    filename:[],
    filepath:[],
    fileDataPath:[],
    
  },
  repairsSubmit: function (e) {
    const params = e.detail.value
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    wx.showLoading({
      title: "提交中...",
      mask: true
    });
    var that = this;    
    console.log('进入1');
   
    getApp().post.request('https://test.quaerolife.com/api/app/repair/malfunction', 'application/json', 'POST',
      {
        "equipmentName": e.detail.value.equipmentName,
        "equipmentSerialNum": e.detail.value.equipmentSerialNum,
        "equipmentAddress": e.detail.value.equipmentAddress,
        "contact": e.detail.value.contact,
        "equipmentProblem": e.detail.value.equipmentProblem,
        "description": that.data.concent1,
        "picture": that.data.arr,
        "video": null,
        "data": that.data.fileDataPath,
        "code": "",
      }).then(res => {
        console.log("新的数据显示", res.data)
        wx.hideLoading()
        console.log(res.data)
        if (res.data.success == true) {
          wx.showToast({
            title: "修改成功",
            duration: 5000
          })
          that.setData({
            userInfo: '',
            concent1: ''
          })
        }
      }).catch(err => {

      })

    this.submitInfo(params);
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
    var that = this;
    wx.chooseMessageFile({
      count: 1,
      type: 'all',
      success(res) {
        var tempFilePaths=res.tempFiles[0].name
        console.log("选择的是：",res)
        that.setData({filename:tempFilePaths});
        var filePaths=res.tempFiles[0].path
        console.log("选择的是：",res)
        that.setData({filepath:filePaths});
        console.log("显示名字：",that.data.filename)
        console.log("显示路径：",that.data.filepath)
           wx.uploadFile({
                url: 'https://test.quaerolife.com/api/app/file/upload',
                filePath: that.data.filepath,
                name: 'file',
                formData: {
                  'type': 'Data' 
                },
                header: {
                  'Content-Type': 'multipart/form-data',
                  'Authorization': getApp().globalData.token,
                },
                success(res) {
                    console.log("上传成功",res.data)
                    var object = JSON.parse(res.data)
                  console.log('此时的i=,file数据是：',object.data);
                  that.setData({
                    fileDataPath: that.data.fileDataPath.concat(object.data)
                  })
                  console.log("fileDataPath=",that.data.fileDataPath);
                    
                }
           })
      }
})

  },


  showModal(error) {
    wx.showModal({
      content: error.msg
    })
  },
  submitInfo(params) {
    // form提交
    let form = params;
    console.log('将要提交的表单信息：', form);


  },
  onLoad: function (options) {
    //验证方法
    this.initValidate();
  },
  /***验证表单字段 */
  initValidate: function () {
    const rules = {
      equipmentName: {
        required: true,
     
      },
      equipmentSerialNum: {
        required: true,
      },
      equipmentAddress: {
        required: true,
      },
      contact: {
        required: true,
      },
      equipmentProblem: {
        required: true,
      },
    }
    const messages = {
      equipmentName: {
        required: '请填写仪器名称',
        
      },
      equipmentSerialNum: {
        required: '请填写仪器序列号',
       
      },
      equipmentAddress: {
        required: '请填写仪器所处详细地址',
       
      },
      contact: {
        required: '请填写报修联系人',
        
      },
      equipmentProblem: {
        required: '请填写仪器故障问题点',
    
      },
    }
    this.WxValidate = new WxValidate(rules, messages)
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