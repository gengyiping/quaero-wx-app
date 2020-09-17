// pages/after-salesProgress/after-returnVisit.js
var app = getApp()

Page({
  data: {
    undistribute: [],
    distribute: [],
    reall: [],
    refinish: [],
    listArray: [],
    winHeight: "",
    currentTab: 0,
    aaa:'',
    bbb:'',
    ccc:'',
    pageNum: 1,									
    pageSize: 8,							
    hasMoreData: true,
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
  //完善
  perfect: function (e) {
    var that = this;
    console.log("dssssssssssssssssssss", e)
    getApp().post.request('https://test.quaerolife.com/api/app/callback/list', 'application/json', 'GET',
      {
        "callbackState": that.data.currentTab,
        "callbackType": '',
        "isMy": '',
        "isAsc": '',
        "pageNum": 1,
        "pageSize": 10
      }).then(res => {
        that.setData({
          listArray: []
        })
        console.log("新的数据显示222", res.data)
        that.setData({
          undistribute: res.data.data.list
        })
        console.log("查看id", that.data.undistribute[that.data.index].id)
        wx.navigateTo({
          url: "/pages/after-sales/after-salesOptions/returnMessage?lookid=" + that.data.undistribute[that.data.index].id,
        })
      })
  },
  //抢单
  getOrder: function (e) {
    var that = this;
    console.log("订单提交的id：", that.data.currentTab)
    getApp().post.request('https://test.quaerolife.com/api/app/callback/list', 'application/json', 'GET',
      {
        "callbackState": that.data.currentTab,
        "callbackType": '',
        "isMy": '',
        "isAsc": '',
        "pageNum": 1,
        "pageSize": 10
      }).then(res => {
        console.log("新的数据显示", res.data)
        that.setData({
          undistribute: res.data.data.list
        })
        console.log("查看故障的故障id", that.data.undistribute[that.data.index].id)
        wx.showModal({
          content: '确定抢单吗 ',
          icon: 'none',
          success: function (res) {
            if (res.confirm) {
              wx.showLoading({
                title: "抢单中...",
                mask: true,
              });
              getApp().post.request('https://test.quaerolife.com/api/app/callback/' + that.data.undistribute[that.data.index].id + '/grabOrder', 'application/json', 'GET',
                {
                }).then(res => {
                  wx.hideLoading()
                  getApp().post.request('https://test.quaerolife.com/api/app/callback/list', 'application/json', 'GET',
                    {
                      "callbackState": that.data.currentTab,
                      "callbackType": '',
                      "isMy": '',
                      "isAsc": '',
                      "pageNum": 1,
                      "pageSize": 10
                    }).then(res => {
                      that.setData({
                        undistribute: res.data.data.list
                      })
                    })
                })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }

          }
        })
      })
  },

  //查看回访
  look: function (e) {
    var that = this;
    console.log("dssssssssssssssssssss", e)
    getApp().post.request('https://test.quaerolife.com/api/app/callback/list', 'application/json', 'GET',
      {
        "callbackState": that.data.currentTab,
        "callbackType": '',
        "isMy": '',
        "isAsc": '',
        "pageNum": 1,
        "pageSize": 10
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
   
    var that = this
    console.log('用户点击id：' + app.getid)
    console.log('用户点击id：' + that.data.currentTab)
    console.log('用户点击筛选的id值：' + e.detail.selectedId + "，，，，，，id名： " + e.detail.selectedTitle);


    console.log("切换id：", e.detail.selectedId)

    console.log("用户点击点点点")
   
    if (app.getid == 1) {
        var aa=e.detail.selectedId
        that.setData({
          aaa: aa
        })
        console.log("显示1的id：",that.data.aa)
     }
     if (app.getid == 2) {
      var bb=e.detail.selectedId
      that.setData({
        bbb: bb
      })
      console.log("时间1的id：",that.data.bb)
    }
    if (app.getid == 3) {
       var cc=e.detail.selectedId
       that.setData({
        ccc: cc
      })
       console.log("类型1的id：",that.data.cc)
    }
    getApp().post.request('https://test.quaerolife.com/api/app/callback/list', 'application/json', 'GET',
    {
      "callbackState": that.data.currentTab,
      "callbackType": that.data.ccc,
      "isMy": that.data.aaa,
      "isAsc": that.data.bbb,
      "pageNum": 1,
      "pageSize": 10
    }).then(res => {
      console.log("新的数据显示", res.data)
      if (that.data.currentTab == 0) {
        that.setData({
          undistribute: res.data.data.list,
        })
        console.log("数据结果为：", that.data.undistribute)
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
        "isMy": '',
        "isAsc": '',
        "pageNum": 1,
        "pageSize": 10
      }).then(res => {

        console.log("新的数据显示", res.data)
        if (e.target.dataset.current == 0) {
          that.setData({
            undistribute: res.data.data.list
          })
        } else if (that.data.currentTab == 1) {
          that.setData({
            distribute: res.data.data.list
          })
          console.log("xianshi数据结果为：", that.data.distribute)
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

/**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("进来1111111111")
    if (this.data.hasMoreData) {
      this.getInfo('加载更多数据')
      console.log("来1111111111")
    } else {
      wx.showToast({
        title: '没有更多数据',
      })
    }
    console.log("出去1111111111")
  },
  getInfo: function (message) {
    wx.showLoading({
      title: message,
      duration: 5000
    });
    var that = this;

    getApp().post.request('https://test.quaerolife.com/api/app/callback/list', 'application/json', 'GET',
      {
        "callbackState": that.data.currentTab,
        "callbackType": '',
        "isMy": '',
        "isAsc": '',
        "pageNum": 1,
        "pageSize": 10
      }).then(res => {
        if (that.data.currentTab == 0) {
          console.log("成功1", res.data.data.list.length)
          console.log("成功2", res.data.data.total)
          var contentlistTem = that.data.undistribute;
          if (res.data.data.list.length > 0) {
            if (that.data.pageNum == 1) {
              contentlistTem = []
            }
            var undistribute = res.data.data.list;
            if (undistribute.length < that.data.pageSize) {
              console.log("进来222222221")
              that.setData({
                undistribute: contentlistTem.concat(undistribute),

                hasMoreData: false

              })
              console.log("进来233333333321")
            } else {
              that.setData({
                undistribute: contentlistTem.concat(undistribute),
                hasMoreData: true,
                pageNum: that.data.pageNum + 1,


              })
              console.log("pageNum加1：", that.data.pageNum)

            }
          }

          console.log("此时的数据：", that.data.undistribute)
        } else if (that.data.currentTab == 1) {
          console.log("成功1", res.data.data.list.length)
          console.log("成功2", res.data.data.total)
          var contentlistTem = that.data.distribute;
          if (res.data.data.list.length > 0) {
            if (that.data.pageNum == 1) {
              contentlistTem = []
            }
            var distribute = res.data.data.list;
            if (distribute.length < that.data.pageSize) {
              console.log("进来222222221")
              that.setData({
                distribute: contentlistTem.concat(distribute),

                hasMoreData: false

              })
              console.log("进来233333333321")
            } else {
              that.setData({
                distribute: contentlistTem.concat(distribute),
                hasMoreData: true,
                pageNum: that.data.pageNum + 1,


              })
              console.log("pageNum加1：", that.data.pageNum)

            }
          }

          console.log("此时的数据：", that.data.distribute)
        } else if (that.data.currentTab == 2) {
          console.log("成功1", res.data.data.list.length)
          console.log("成功2", res.data.data.total)
          var contentlistTem = that.data.refinish;
          if (res.data.data.list.length > 0) {
            if (that.data.pageNum == 1) {
              contentlistTem = []
            }
            var refinish = res.data.data.list;
            if (refinish.length < that.data.pageSize) {
              console.log("进来222222221")
              that.setData({
                refinish: contentlistTem.concat(refinish),

                hasMoreData: false

              })
              console.log("进来233333333321")
            } else {
              that.setData({
                refinish: contentlistTem.concat(refinish),
                hasMoreData: true,
                pageNum: that.data.pageNum + 1,


              })
              console.log("pageNum加1：", that.data.pageNum)

            }
          }

          console.log("此时的数据：", that.data.refinish)
        } else if (that.data.currentTab == 3) {
          console.log("成功1", res.data.data.list.length)
          console.log("成功2", res.data.data.total)
          var contentlistTem = that.data.reall;
          if (res.data.data.list.length > 0) {
            if (that.data.pageNum == 1) {
              contentlistTem = []
            }
            var reall = res.data.data.list;
            if (reall.length < that.data.pageSize) {
              console.log("进来222222221")
              that.setData({
                reall: contentlistTem.concat(reall),

                hasMoreData: false

              })
              console.log("进来233333333321")
            } else {
              that.setData({
                reall: contentlistTem.concat(reall),
                hasMoreData: true,
                pageNum: that.data.pageNum + 1,


              })
              console.log("pageNum加1：", that.data.pageNum)

            }
          }

          console.log("此时的数据：", that.data.reall)
        }
     
        

      })

    wx.hideLoading()
    complete: (res) => {
    }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this
    console.log("下拉开始刷新")
    wx.showNavigationBarLoading()
    getApp().post.request('https://test.quaerolife.com/api/app/callback/list', 'application/json', 'GET',
      {
        "callbackState": that.data.currentTab,
        "callbackType": '',
        "isMy": '',
        "isAsc": '',
        "pageNum": 1,
        "pageSize": 10
      }).then(res => {

        console.log("新的数据显示", res.data)
        if (e.target.dataset.current == 0) {
          that.setData({
            undistribute: res.data.data.list
          })
        } else if (that.data.currentTab == 1) {
          that.setData({
            distribute: res.data.data.list
          })
          console.log("xianshi数据结果为：", that.data.distribute)
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
    setTimeout(() => {
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
      console.log("下拉停止刷新")
    }, 2000);
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
        "callbackState": 0,
        "callbackType": '',
        "isMy": '',
        "isAsc": '',
        "pageNum": 1,
        "pageSize": 10
      }).then(res => {
        console.log("新的数据显示", res.data)
        that.setData({
          undistribute: res.data.data.list,
        })
      })
  },
  footerTap: app.footerTap
})