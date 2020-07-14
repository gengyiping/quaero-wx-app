// pages/after-sales/after-salesOptions/returnMessage.js
import WxValidate from '../../../utils/WxValidate';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '2020-01-01',
    img_arr:[],
    arrys:[
      { name: "是", value: "0"},
      { name: "否", value:"1"}
      ],
    arryss: [
      { name1: "一般", value: "0" },
      { name1: "满意", value: "1" },
      { name1: "非常满意", value: "2" }
    ],
    index:0,
    arr: [],
  form:{
    pickerData:'',
    depict:'',
    depictType:'',
    instrument:'',
    satisfactionInput:'',
    numberInput:'',
  }
  },

  messageSubmit: function (e) {
    console.log('进入234561', e);
    const params = e.detail.value
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    var that = this;
    console.log('进入1', e);
    getApp().post.request('https://test.quaerolife.com/api/app/callback/{callbackId}', 'application/json', 'PUT',
      {
        "date": e.detail.value.pickerData + " 00:00:00",
        "problemIsSolved": '',
        "serviceSatisfaction": '',
        "equipmentStatus": '',
        "equipmentSatisfaction": '',
        "equipmentSerialNum": '',
        "picture": null,
        "video": null,
        "description": that.data.concent,
      }).then(res => {
     
      }).catch(err => {

      })

    this.submitInfo(params);
  },

  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  choosePicture: function () {
    var that = this;
    if (this.data.img_arr.length < 3) {
      wx.chooseImage({
        sizeType: ['original', 'compressed'],
        success: function (res) {
          var tempFilePath = res.tempFilePaths[res.tempFilePaths.length - 1]
          console.log("path=", tempFilePath)
          console.log("temp=", res.tempFilePaths)
          wx.compressImage({
            src: res.tempFilePaths[res.tempFilePaths.length - 1],
            quality: 80, // 压缩质量
            success: function (res) {
              that.setData({
                img_arr: that.data.img_arr.concat(res.tempFilePath)
              })
              console.log("img_arr=", that.data.img_arr)
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
                  console.log('此时的i=,file数据是：', that.data.index, object.data);
                  that.setData({
                    arr: that.data.arr.concat(object.data)
                  })
                  console.log("arr=", that.data.arr);
                },
                fail: function (res) {
                  console.log('此时信息', res);
                },
              })

            },
            fail: function (res) {
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
    let index
      = e.currentTarget.dataset.id;
    let imagelist = this.data.img_arr;
    imagelist.splice(index, 1);
    this.setData({
      img_arr: imagelist,
      isShow: true
    })
    console.log(JSON.stringify(e))

  },

  /**
   * 生命周期函数--监听页面加载
   */
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
  /***验证表单字段*/
  initValidate: function () {
    const rules = {
      pickerData: {
        required: true,

      },
      depict: {
        required: true,
      },
      depictType: {
        required: true,
      },
      instrument: {
        required: true,

      },
      satisfactionInput: {
        required: true,
      },
      numberInput: {
        required: true,
        
      },
    }
    const messages = {

      pickerData: {
        required: "请输入故障解决日期",

      },
      depict: {
        required: '请选择本次故障是否解决',
      },
      depictType: {
        required: '请选择本次指导是否满意',
      },
      instrument: {
        required: '请输入仪器目前运行的状态',

      },
      satisfactionInput: {
        required: '请输入仪器的满意度',
     
      },
      numberInput: {
        required: '请输入仪器序列号',
        
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