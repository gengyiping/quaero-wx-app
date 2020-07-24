// pages/after-sales/after-salesOptions/maintainOptions/upkeep.js
import WxValidate from '../../../../utils/WxValidate';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '2020-03-01',
    form:{
      equipmentSerialNum:'',
      installationDate:'',
      hospitalAddress:''
    }
  },
  upkeepSubmit: function (e) {
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
    var pickervalue = e.detail.value.installationDate
    console.log("传的是：", pickervalue);
    getApp().post.request('https://test.quaerolife.com/api/app/repair/maintenance', 'application/json', 'POST',
      {
        "equipmentSerialNum": e.detail.value.equipmentSerialNum,
        "installationDate": e.detail.value.installationDate + " 00:00:00",
        "hospitalAddress": e.detail.value.hospitalAddress
      }).then(res => {
        console.log("新的数据显示", res.data)
        if (res.data.success == true) {
          wx.showToast({
            title: "修改成功",
            duration: 5000
          })
          that.setData({
            userInfo: '',
      
          })
        }
      }).catch(err => {

      })
      wx.hideLoading()
    this.submitInfo(params);
  },
 
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
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
  onLoad: function (options) {
    console.log("进入判断：")
    //验证方法
    this.initValidate(); 
  },
  /***验证表单字段 */
  initValidate: function () {
    const rules = {
      equipmentSerialNum: {
        required: true,

      },
      installationDate: {
        required: true,
      },
      hospitalAddress: {
        required: true,
      },
    
    }
    const messages = {
      equipmentSerialNum: {
        required: '请填写仪器序列号',

      },
      installationDate: {
        required: '请填写装机日期',

      },
      hospitalAddress: {
        required: '请填写安装医院',

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