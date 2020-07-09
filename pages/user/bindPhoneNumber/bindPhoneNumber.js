// pages/user/bindPhoneNumber/bindPhoneNumber.js
import WxValidate from '../../../utils/WxValidate';


Page({

  /**
   * 页面的初始数据
   */
  
  data: {
   form:{
     phoneNumber:''
   }
  },

  phoneNumberSubmit: function (e) {
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
    getApp().post.request('https://test.quaerolife.com/api/app/user',     'application/json', 'PUT', 
    {
      'mobile': e.detail.value.phoneNumber
      }).then(res => {
      console.log("新的数据显示", res.data)
        wx.hideLoading()
      
    
          if (res.data.success == true){
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
      phoneNumber: {
        required: true,
        tel: true
      },
    }
    const messages = {
      phoneNumber: {
        required: '请填写联系电话',
        tel: '请填写正确的联系电话'
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