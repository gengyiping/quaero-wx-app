// pages/after-salesProgress/after-salesProgress.js
var app = getApp();


Page({
  data: {
    tabbar: {},
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    expertList: [{ //假数据
      img: "avatar.png",
      name: "111",
      tag: "111",
      answer: 134,
      listen: 2234
    }],
arrays:[{
    id:0,
    name:'CLIA',
    title:'完成',
    data:'2020-08-08-08-08'
},
  {
    id:1,
    name: 'QCIT',
    title:'进行中',
     data: '2019-06-06-07-12'
  },
      {
    id:2,
    name: 'BBD',
        title: '进行中',
        data: '2020-02-02-02-02'
      },
],



    arrayy: [{
      id: 0,
      name: 'BV',
      title: '完成',
      data: '2020-06-06-16-16'
    },
    {
      id: 1,
      name: 'QCIT',
      title: '完成',
      data: '2019-06-06-07-12'
    },
    {
      id: 2,
      name: 'BBD',
      title: '完成',
      data: '2020-02-02-02-02'
    },
    ],
    arrayyitem: [{
      id: 0,
      name: 'BBD',
      title: '进行中',
      data: '2020-05-06-14-16'
    },
    {
      id: 1,
      name: 'BV',
      title: '进行中',
      data: '2019-06-06-07-12'
    },
    {
      id: 2,
      name: 'BBD',
      title: '完成',
      data: '2020-02-02-02-02'
    },
    ],
    arrayess: [{
      id: 0,
      name: 'CLIA',
      title: '完成',
      data: '2020-05-06-14-16'
    },
    {
      id: 1,
      name: 'QCIT',
      title: '进行中',
      data: '2019-06-06-07-12'
    },
    {
      id: 2,
      name: 'BBD',
      title: '进行中',
      data: '2020-02-02-02-02'
    },
    ]
    
  },
  //进行
  readDetail: function (e) {
    var index = e.currentTarget.dataset.id; 
    console.log('进行点击模板的位置id是：'+ index);
  },
  //完成
  readDetailtwo: function (e) {
    var index = e.currentTarget.dataset.id;
    console.log('完成点击模板的位置id是：' + index);
  },
  //评价
  readDetailone: function (e) {
    var index = e.currentTarget.dataset.id;
    console.log('评价点击模板的位置id是：' + index);
  },
  //全部
  readDetailth: function (e) {
    var index = e.currentTarget.dataset.id;
    console.log('全部点击模板的位置id是：' + index);
  },
  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    console.log("此时用户选择的列表ID：", cur);
    var that = this;
    wx.request({
      url: 'https://test.quaerolife.com/api/app/repair/{userId}/list',
      data: {
        "repairStatus": e.target.dataset.current,
        "pageNum": '1',
        "pageSize": '10'
      },
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success(res) {
        console.log(res.data)
        if (res.statusCode === 200) {
          wx.showToast({
            title: '成功',
          })        
        } else {
          wx.showToast({
            title: '不成功',
          })
        }
      },
    })
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },







  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  onLoad: function () {
    var that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 180;
        console.log(calc)
        that.setData({
          winHeight: calc
        });
      }
    });
  },
  footerTap: app.footerTap







})
