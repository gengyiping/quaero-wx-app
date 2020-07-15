// pages/user/userInfo/usefInfo.js
import WxValidate from '../../../utils/WxValidate';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataid:'',
    form: {
      userName: '',
      userPhone:'',
      usercode:'',

    }
  },
 
 
  usefInfoSubmit: function (e) {
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
    getApp().post.request('https://test.quaerolife.com/api/app/user', 'application/json', 'POST',
      {
        "realName": e.detail.value.userName,
        "mobile": e.detail.value.userPhone,
        "invitationCode": e.detail.value.usercode,
        "nickName": "",
        "sex": 2,
        "avatar": "",
        "email": 2,
        "country": "2020-04-15 10:12:39",
        "province": "127.0.0.1",
        "city": "2020-04-15 10:12:39",
        "district": "127.0.0.1",
        "lastWeixinSignInTime": "2020-04-15 09:23:46",
        "address": 20.0,
        "note": ""}).then(res => {
          console.log("新的数据显示", res.data)
          if (e.detail.value.usercode.length != 6){
            wx.showToast({
              title: '请输入正确格式的邀请码（6位数）',
              icon: 'none',
            })
         }
        else if (res.data.success == true) {
            wx.showToast({
              title: '提交成功',
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
    //验证方法
    this.initValidate();
  },
  /***验证表单字段 */
  initValidate: function () {
    const rules = {
      userName: {
        required: true,
      },
      userPhone: {
        required: true,
        tel: true
      },
      usercode: {
        required: true,
        code: true
      },
    }
    const messages = {
      userName: {
        required: '请填写姓名',
        
      },
      userPhone: {
        required: '请填写联系电话',
        tel: '请填写正确的联系电话'
      },
      usercode: {
        required: '请填写邀请码',
        tel: '请填写正确的（上级）邀请码'
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