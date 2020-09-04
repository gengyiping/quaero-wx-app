// pages/after-salesProgress/after-returnVisit.js
let app = getApp()
Page({
  data: {
    dropDownMenuTitle: ['显示全部', '时间倒序', '回访类型'],
    data2: [{
      id: 1,
      title: '显示我的'
    },
    {
      id: 2,
      title: '显示全部'
    }
    ],
    data3: [{
      id: 1,
      title: '时间倒序'
    },
    {
      id: 2,
      title: '时间正序'
    }
    ],
    data4: [{
      id: 1,
      title: '故障回访'
    },
    {
      id: 2,
      title: '装机回访'
    },
    
    ],

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },



  selectedItem: function (e) {
 
    console.log('用户点击id：' +app.gettwoid) 
   
    console.log('用户点击筛选的id值：' + e.detail.selectedId + "，，，，，，id名： " + e.detail.selectedTitle);
    if(app.gettwoid==2&&e.detail.selectedId){
      console.log("用户点击点点点")
    }
  },



  showDialog: function (e) {

  },


 //进行
 readDetail: function (e) {
  console.log("进行shuju", e)
  this.setData({
    index: e.currentTarget.dataset.id
  })
  console.log('进行点击模板的位置id是：', this.data.index);

},
//完成
readDetailtwo: function (e) {
  console.log("完成shuju", e)
  var index = e.currentTarget.dataset.id;
  this.setData({
    index: e.currentTarget.dataset.id
  })
  console.log('完成点击模板的位置id是：' + index);
},
//评价
readDetailone: function (e) {
  console.log("评价shuju", e)
  this.setData({
    index: e.currentTarget.dataset.id
  })
  console.log('评价点击模板的位置id是：' + this.data.index);
},
//全部
readDetailth: function (e) {
  console.log("全部shuju", e)
  this.setData({
    index: e.currentTarget.dataset.id
  })
  console.log('全部点击模板的位置id是：' + this.data.index);
},
//未处理
readDetailthno: function (e) {
  console.log("未处理shuju", e)
  this.setData({
    index: e.currentTarget.dataset.id
  })
  console.log('未处理点击模板的位置id是：' + this.data.index);
},





    switchTab: function (e) {
      console.log("滚动切换标签：", e)
      this.setData({
        currentTab: e.detail.current
      });
      this.checkCor();
    },
    checkCor: function () {
      if (this.data.currentTab > 5) {
        this.setData({
          scrollLeft: 300
        })
      } else {
        this.setData({
          scrollLeft: 0
        })
      }
    },


    swichNav: function (e) {
      console.log("此时打印出来的的数据是：", e)
      var cur = e.target.dataset.current;
      console.log("此时用户选择的列表ID：", cur);
      if (this.data.currentTab == cur) { return false; }
      else {
        this.setData({
          currentTab: cur
        })
      }
      var that = this;
      getApp().post.request('https://test.quaerolife.com/api/app/repair/list', 'application/json', 'GET',
        {
          "repairStatus": that.data.currentTab,
          "pageNum": '1',
          "pageSize": '80',
          "isMy": true,
          "isAsc": false,
  
        }).then(res => {
          that.setData({
            listArray: []
          })
          console.log("新的数据显示", res.data)
          if (e.target.dataset.current == 0) {
            that.setData({
              aess: res.data.data.list
            })
          } else if (e.target.dataset.current == 1) {
            that.setData({
              arrays: res.data.data.list
            })
            console.log("进行中的订单总数：", res.data.data.total)
  
            //  console.log("进行的总数是：", res.data.data.total)
            //console.log("进行中的订单总数：",res.data.data.total)
            for (var i = 0; i < res.data.data.total; i++) {
              // console.log("赋值后的数据显示",that.data.arrays[i].my)
              //  console.log("列表中的第一个用户：：",0,that.data.arrays[0])
              var myData = that.data.arrays[i].my
              that.setData({
                ['flag[' + i + ']']: myData
              })
              //  console.log("列表中的每一项：",i,that.data.flag[i])
  
            }
          } else if (e.target.dataset.current == 2) {
            that.setData({
              arrayy: res.data.data.list
            })
  
          } else if (e.target.dataset.current == 3) {
            that.setData({
              arrayess: res.data.data.list
            })
  
  
          } else if (e.target.dataset.current == 4) {
            that.setData({
              arraydata: res.data.data.list
            })
  
          }
          else if (e.target.dataset.current == 5) {
            that.setData({
              arrayyitem: res.data.data.list
            })
  
  
          }
        })
  
  
    },


//onload
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
  getApp().post.request('https://test.quaerolife.com/api/app/callback/list', 'application/json', 'GET',
    {
      "callbackState": '0',
      "callbackType": 0,
      "isMy":false,
      "isAsc":true,
      "pageNum":1,
      "pageSize":10
    }).then(res => {
      console.log("新的数据显示", res.data)
      that.setData({
        aess: res.data.data.list,
        show:true
      })
   

    })
},
footerTap: app.footerTap




})