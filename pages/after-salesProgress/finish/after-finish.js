// pages/after-salesProgress/finish/after-finish.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {},
  deletefinishData: function (e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确认撤回吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          //  获取要删除数据的id 
          var dataid = e.currentTarget.dataset.id;
          console.log(dataid)
          //  删除数组对应的数据内容
          var release = that.data.release;
          that.data.release.splice(dataid, 1)
          //判断数据的长度
          var len = that.data.release.length;
          //通过判断数组的长度来决定是否显示隐藏的部分


          that.setData({
            release: that.data.release
          })


        } else if (res.cancel) {
          console.log('用户点击取消')

        }
      }
    })
  },
 
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
