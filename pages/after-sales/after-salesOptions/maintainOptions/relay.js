// pages/after-sales/after-salesOptions/maintainOptions/relay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr:[{name:"人员",value:0,checked:"true"},{name:"人员手机号",value:1},{name:"不选",value:2}],
    index:0,
    contentlist:[],
    ind:0,
  },
  radioChange: function (e) {
    this.setData({
      index: e.detail.value
    });
    console.log('选择的是：', e.detail.value)
    if(this.data.index==0){
      this.setData({
        showView: (!this.data.showView),
        showVieww:''
      
      })
    }else if(this.data.index==1){
      console.log("cishi的ind值为：",this.data.index)
      this.setData({
        showView:'',
        showVieww: (!this.data.showVieww)
      })
    }else if(this.data.index==2){
      this.setData({
        showView:'',
        showVieww:''
      })
    }
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      ind: e.detail.value
    })
  },
  userBranch: function (e) {
    this.setData({
      companyName: e.detail.value
    })
    console.log("company=",this.data.companyName)
   
  },
  relayData:function(e){
    var that=this
 if(that.data.index==0){
  getApp().post.request('https://test.quaerolife.com/api/app/repair/'+'11'+'/forward', 'application/json', 'GET',
  {
          "receiverId":that.data.contentlist[that.data.ind].id,
          "receiverMobile":'',
  }).then(res =>{
    console.log("0转发数据：", res.data)
   
  })
 }else if(that.data.index==1){
  getApp().post.request('https://test.quaerolife.com/api/app/repair/'+'11'+'/forward', 'application/json', 'GET',
  {
          "receiverId":'',
          "receiverMobile":that.data.companyName,
  }).then(res =>{
    console.log("1转发数据：", res.data)
   
  })
 }else if(that.data.index==2){
  getApp().post.request('https://test.quaerolife.com/api/app/repair/'+'11'+'/forward', 'application/json', 'GET',
  {
          "receiverId":'',
          "receiverMobile":'',
  }).then(res =>{
    console.log("2转发数据：", res.data)
   
  })
 }
  
 
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    getApp().post.request('https://test.quaerolife.com/api/app/user/list', 'application/json', 'GET',
    {
            "name":'',
            "mobile":'',
            "gid":'',
            "pageNum":'1',
            "pageSize":500,
    }).then(res => {
      console.log("售后进度新的数据显示", res.data)
      that.setData({
        contentlist:res.data.data.list
     })
     if(that.data.index==0){
       console.log('此时的ind是：',that.data.index)
      that.setData({
        showView: (!that.data.showView)
      
      })
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