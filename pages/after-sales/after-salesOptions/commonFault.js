// pages/after-sales/after-salesOptions/commonFault.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['CLIA', 'BBD', 'AST', 'QCIT', 'QCI'],
    index: 0,
    items: [{
      text: 'CLIA结果1',
      download: '',
      preview: ''
    },
    {
      text: 'CLIA结果2',
      download: '',
      preview: ''
    },
    {
      text: 'CLIA结果3',
      download: '',
      preview: ''
    },
    {
      text: 'CLIA结果4',
      download: '',
      preview: ''
    },
    {
      text: 'CLIA结果5',
      download: '',
      preview: ''
    }
    ]


  },
  changeData(e) {

    var CLIA = [{

      text: 'CLIA结果1',
      download: '',
      preview: ''
    }, {
      text: 'CLIA结果2',
      download: '',
      preview: ''
    }, {
      text: 'CLIA结果3',
      download: '',
      preview: ''
    }, {
      text: 'CLIA结果4',
      download: '',
      preview: ''
    },
    {
      text: 'CLIA结果5',
      download: '',
      preview: ''
    },]
    var QCIT = [{
      text: 'QCIT结果1',
      download: '',
      preview: ''
    }, {
      text: 'QCIT结果2',
      download: '',
      preview: ''
    }, {
      text: 'QCIT结果3',
      download: '',
      preview: ''
    }, {
      text: 'QCIT结果4',
      download: '',
      preview: ''
    }, {
      text: 'QCIT查询结果5',
      download: '',
      preview: ''
    },]
    var BBD = [{
      text: 'BBD结果1',
      download: '',
      preview: ''
    }, {
      text: 'BBD结果2',
      download: '',
      preview: ''
    }, {
      text: 'BBD查询结果3',
      download: '',
      preview: ''
    }, {
      text: 'BBD结果4',
      download: '',
      preview: ''
    }, {
      text: 'BBD查询结果5',
      download: '',
      preview: ''
    },]
    var AST = [{
      text: 'AST结果1',
      download: '',
      preview: ''
    }, {
      text: 'AST查询结果2',
      download: '',
      preview: ''
    }, {
      text: 'AST结果3',
      download: '',
      preview: ''
    }, {
      text: 'AST查询结果4',
      download: '',
      preview: ''
    }, {
      text: 'AST结果5',
      download: '',
      preview: ''
    },]
    var QCI = [{
      text: 'QCI结果1',
      download: '',
      preview: ''
    }, {
      text: 'QCI结果2',
      download: '',
      preview: ''
    }, {
      text: 'QCI结果3',
      download: '',
      preview: ''
    }, {
      text: 'QCI结果4',
      download: '',
      preview: ''
    }, {
      text: 'QCI结果5',
      download: '',
      preview: ''
    },]
    var pickervalue = e.target.dataset.pickervalue
    console.log("这里传的是：", e.target.dataset.pickervalue);
    if (pickervalue == 0) {
      this.setData({
        items: CLIA
      })
    } else if (pickervalue == 1) {
      this.setData({
        items: BBD
      })
    } else if (pickervalue == 2) {
      this.setData({
        items: AST
      })
    } else if (pickervalue == 3) {
      this.setData({
        items: QCIT
      })
    } else if (pickervalue == 4) {
      this.setData({
        items: QCI
      })
    }

  },


  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  
  
    
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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