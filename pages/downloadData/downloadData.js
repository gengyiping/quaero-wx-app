// pages/downloadData/downloadData.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    array: ['CLIA', 'BBD', 'AST', 'QCIT', 'QCI'],
    index: 0,
    items: [{
      text: 'CLIA查询结果1',
        download: '',
        preview: ''
      },
        {
          text: 'CLIA查询结果2',
          download: '',
          preview: ''
        },
        {
          text: 'CLIA查询结果3',
          download: '',
          preview: ''
        },
        {
          text: 'CLIA查询结果4',
          download: '',
          preview: ''
        },
         {
        text: 'CLIA查询结果5',
        download: '',
        preview: ''
      }
      ]   
    
     
  },
  changeData (e) {
    
    var CLIA = [{
      
      text: 'CLIA查询结果1',
      download: '',
      preview: ''
    },  {
        text: 'CLIA查询结果2',
        download: '',
        preview: ''
      }, {
        text: 'CLIA查询结果3',
        download: '',
        preview: ''
      }, {
        text: 'CLIA查询结果4',
        download: '',
        preview: ''
      },
      {
        text: 'CLIA查询结果5',
        download: '',
        preview: ''
      },]
    var QCIT = [{
      text: 'QCIT查询结果1',
      download: '',
      preview: ''
    }, {
        text: 'QCIT查询结果2',
        download: '',
        preview: ''
      }, {
        text: 'QCIT查询结果3',
        download: '',
        preview: ''
      }, {
        text: 'QCIT查询结果4',
        download: '',
        preview: ''
      }, {
        text: 'QCIT查询结果5',
        download: '',
        preview: ''
      },]
    var BBD = [{
      text: 'BBD查询结果1',
      download: '',
      preview: ''
    }, {
        text: 'BBD查询结果2',
        download: '',
        preview: ''
      }, {
        text: 'BBD查询结果3',
        download: '',
        preview: ''
      }, {
        text: 'BBD查询结果4',
        download: '',
        preview: ''
      }, {
        text: 'BBD查询结果5',
        download: '',
        preview: ''
      },]
    var AST = [{
      text: 'AST查询结果1',
      download: '',
      preview: ''
    }, {
        text: 'AST查询结果2',
        download: '',
        preview: ''
      }, {
        text: 'AST查询结果3',
        download: '',
        preview: ''
      }, {
        text: 'AST查询结果4',
        download: '',
        preview: ''
      }, {
        text: 'AST查询结果5',
        download: '',
        preview: ''
      },]
    var QCI = [{
      text: 'QCI查询结果1',
      download: '',
      preview: ''
    }, {
        text: 'QCI查询结果2',
        download: '',
        preview: ''
      }, {
        text: 'QCI查询结果3',
        download: '',
        preview: ''
      }, {
        text: 'QCI查询结果4',
        download: '',
        preview: ''
      }, {
        text: 'QCI查询结果5',
        download: '',
        preview: ''
      },]
    var pickervalue = e.currentTarget.dataset.pickervalue 
    console.log("传的是：", e.currentTarget.dataset.pickervalue );
    if (pickervalue ==0) {
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
      }else if (pickervalue == 3) {
        this.setData({
          items: QCIT
        })
    } else if (pickervalue == 4) {
      this.setData({
        items: QCI
      })
    }
  
  },


  bindPickerChange (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

previewview:function(e){

  },

  downloadFile:function(e){
    console.log(e);
    let type = e.currentTarget.dataset.type;
    let url = e.currentTarget.dataset.url;
    let index = e.currentTarget.dataset.id;
    switch (type) {
      case "pdf":
        url += 'pdf';
        break;
      case "word":
        url += 'docx';
        break;
      case "excel":
        url += 'xlsx';
        break;
      default:
        url += 'pptx';
        break;
    }
    wx.downloadFile({
      url:' url',
      header: {},
      success: function (res) {
        var filePath = res.tempFilePath;
        console.log(filePath);
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log('打开文档成功')
          },
          fail: function (res) {
            console.log(res);
          },
          complete: function (res) {
            console.log(res);
          }
        })
      },
      fail: function (res) {
        console.log('文件下载失败');
      },
      complete: function (res) { },
    })
  },

  openDocument:function(e){

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