// pages/user/userInfo/usefInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  userInfoSubmit: function (e) {
    console.log(e.detail.value);
    var that=this;x
    var formdata=e.detail.value;
    wx.request({
      url: app.d.ceshiUrl + '/Api/User/edituser',
      method: 'POST',
      data:{
        userName:formdata.userName,
        userWork:formdata.userWork,
        userOffices:formdata.userOffices,
        userJob: formdata.userJob,
        userProfessional: formdata.userProfessional,
        userPhone:app.globalDate.userInfoSubmit.id,
      },
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        var status=res.data.status;
        if(status==1){
          wx.showToast({
            title:'提交成功！！！',
          })
        }else{
          wx.showToast({
            title:res.data.message,
          })
        }
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