// pages/after-salesProgress/after-returnVisit.js
var app = getApp()

Page({
  data: {
    undistribute:[],
    distribute:[],
    reall:[],
    refinish:[],
    listArray: [],

    dropDownMenuTitle: ['显示全部', '时间倒序', '回访类型'],
    data2: [{
      id: true,
      title: '显示我的'
    },
    {
      id: false,
      title: '显示全部'
    }
    ],
    data3: [{
      id: false,
      title: '时间倒序'
    },
    {
      id: true,
      title: '时间正序'
    }
    ],
    data4: [{
      id: 0,
      title: '故障回访'
    },
    {
      id: 1,
      title: '装机回访'
    },
    
    ],

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onShow: function () {

  },
//查看回访
look: function (e) {
  var that = this;
  console.log("dssssssssssssssssssss", e)
  getApp().post.request('https://test.quaerolife.com/api/app/callback/list', 'application/json', 'GET',
    {  "callbackState": that.data.currentTab,
    "callbackType": '',
    "isMy":'',
    "isAsc":'',
    "pageNum":1,
    "pageSize":10
    }).then(res => {
      that.setData({
        listArray: []
      })
      console.log("新的数据显示222", res.data)
      that.setData({
        undistribute: res.data.data.list
      })
      console.log("查看故障的故障id", that.data.undistribute[that.data.index].id)
      wx.navigateTo({
        url: "/pages/after-sales/after-salesOptions/lookreturnMessage?lookid=" + that.data.undistribute[that.data.index].id,
      })
    })
},


  selectedItem: function (e) {
    var that=this
    console.log('用户点击id：' +app.getid) 
    console.log('用户点击id：' +that.data.currentTab) 
    console.log('用户点击筛选的id值：' + e.detail.selectedId + "，，，，，，id名： " + e.detail.selectedTitle);

   
      console.log("切换id：", e.detail.selectedId)
      console.log("切换id2：", e.detail.selectedTime)
      console.log("切换id3：", e.detail.selectedSe)
      console.log("用户点击点点点")
      if(app.getid==1){
      getApp().post.request('https://test.quaerolife.com/api/app/callback/list', 'application/json', 'GET',
      {
        "callbackState": that.data.currentTab,
        "callbackType":'',
        "isMy": e.detail.selectedId,
        "isAsc":'',
        "pageNum":1,
        "pageSize":10
      }).then(res => {
        console.log("新的数据显示", res.data)
        if (that.data.currentTab == 0) {
          that.setData({
            undistribute: res.data.data.list,
          })
          console.log("数据结果为：",that.data.undistribute)
        } else if (that.data.currentTab == 1) {
          that.setData({
            distribute: res.data.data.list
          })
        } else if (that.data.currentTab == 2) {
          that.setData({
            refinish: res.data.data.list
          })
        } else if (that.data.currentTab == 3) {
          that.setData({
            reall: res.data.data.list
          })
        }
      })
    }else if(app.getid==2){
      getApp().post.request('https://test.quaerolife.com/api/app/callback/list', 'application/json', 'GET',
      {
        "callbackState": that.data.currentTab,
        "callbackType":'',
        "isMy": '',
        "isAsc": e.detail.selectedId,
        "pageNum":1,
        "pageSize":10
      }).then(res => {
        console.log("新的数据显示", res.data)
        if (that.data.currentTab == 0) {
          that.setData({
            undistribute: res.data.data.list,
          })
          console.log("数据结果为：",that.data.undistribute)
        } else if (that.data.currentTab == 1) {
          that.setData({
            distribute: res.data.data.list
          })
        } else if (that.data.currentTab == 2) {
          that.setData({
            refinish: res.data.data.list
          })
        } else if (that.data.currentTab == 3) {
          that.setData({
            reall: res.data.data.list
          })
        }
      })
    }else if(app.getid==3){
      getApp().post.request('https://test.quaerolife.com/api/app/callback/list', 'application/json', 'GET',
      {
        "callbackState": that.data.currentTab,
        "callbackType": e.detail.selectedId,
        "isMy": '',
        "isAsc":'',
        "pageNum":1,
        "pageSize":10
      }).then(res => {
        console.log("新的数据显示", res.data)
        if (that.data.currentTab == 0) {
          that.setData({
            undistribute: res.data.data.list,
          })
          console.log("数据结果为：",that.data.undistribute)
        } else if (that.data.currentTab == 1) {
          that.setData({
            distribute: res.data.data.list
          })
        } else if (that.data.currentTab == 2) {
          that.setData({
            refinish: res.data.data.list
          })
        } else if (that.data.currentTab == 3) {
          that.setData({
            reall: res.data.data.list
          })
        }
      })
    }
  },
  showDialog: function (e) {

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
//全部
readDetailone: function (e) {
  console.log("全部shuju", e)
  this.setData({
    index: e.currentTarget.dataset.id
  })
  console.log('全部点击模板的位置id是：' + this.data.index);
},
//分配
readDetailth: function (e) {
  console.log("分配数据", e)
  this.setData({
    index: e.currentTarget.dataset.id
  })
  console.log('分配点击模板的位置id是：' + this.data.index);
},
//未分配
readDetailthno: function (e) {
  console.log("未处理shuju", e)
  this.setData({
    index: e.currentTarget.dataset.id
  })
  console.log('未分配点击模板的位置id是：' + this.data.index);
},

    switchTab: function (e) {
      console.log("滚动切换标签：", e)
      this.setData({
        currentTab: e.detail.current
      });
      this.checkCor();
    },
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
      getApp().post.request('https://test.quaerolife.com/api/app/callback/list', 'application/json', 'GET',
        {
      "callbackState": that.data.currentTab,
      "callbackType": '',
      "isMy":'',
      "isAsc":'',
      "pageNum":1,
      "pageSize":10
        }).then(res => {
         
          console.log("新的数据显示", res.data)
          if (that.data.currentTab == 0) {
            that.setData({
              undistribute: res.data.data.list
            })
          } else if (that.data.currentTab == 1) {
            that.setData({
              distribute: res.data.data.list
            })
            console.log("xianshi数据结果为：",that.data.distribute)
           // console.log("进行中的订单总数：", res.data.data.total)            
           // for (var i = 0; i < res.data.data.total; i++) {            
           //   var myData = that.data.arrays[i].my
            //  that.setData({
            //    ['flag[' + i + ']']: myData
            //  })       
           // }
          } else if (that.data.currentTab == 2) {
            that.setData({
              refinish: res.data.data.list
            })
          } else if (that.data.currentTab == 3) {
            that.setData({
              reall: res.data.data.list
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
      "callbackType": '',
      "isMy":'',
      "isAsc":'',
      "pageNum":1,
      "pageSize":10
    }).then(res => {
      console.log("新的数据显示", res.data)
      that.setData({
        undistribute: res.data.data.list,
      })
    })
},
footerTap: app.footerTap




})