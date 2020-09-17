// pages/after-salesProgress/after-salesProgress.js
var app = getApp();


Page({

  data: {
    pageNum: 1,										//当前请求数据是第几页
    pageSize: 8,									//每页数据条数
    hasMoreData: true,
    tabbar: {},
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    expertList: [{ //假数据
      img: "avatar.png",
      name: "111",
      tag: "111",
      answer: 134,
      listen: 2234,
    }],
    arrays: [],
    arrayy: [],
    arrayyitem: [],
    arrayess: [],
    aess: [],
    arr: '订单优先级',
    select: false,
    aay: [{ name: '停机级故障', id: 0 }, { name: '非停机级故障', id: 1 }, { name: '优化故障', id: 2 }],
    index: 0,
    flag: [],
    ind: 0,
    listArray: [],
    aesslist: [],
    show: true,
    inde: 0xfff,
    aaa:'',
    bbb:'',
    ccc:'',
    dropDownMenuTitle: ['显示全部', '时间倒序', '故障类型'],
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
      title: '停机级故障'
    },
    {
      id: 1,
      title: '非停机级故障'
    },
    {
      id: 2,
      title: '优化故障'
    },
    ],
  },
  switchChange: function () {

  },

  


  bindPickerChange(e) {
    var that = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    that.setData({
      inde: e.detail.value
    })
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
  // 滚动切换标签样式
  switchTab: function (e) {
    console.log("滚动切换标签：", e)
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  //筛选列表
  selectedItem: function (e) {
    var that = this
    console.log('用户点击id：' + app.getid)
    console.log('用户点击id：' + that.data.currentTab)
    console.log('用户点击筛选的id值：' + e.detail.selectedId + "，，，，，，id名： " + e.detail.selectedTitle);
    if (app.getid == 1) {
      var aa=e.detail.selectedId
      that.setData({
        aaa: aa
      })
      console.log("显示1的id：",that.data.aaa)
   }
   if (app.getid == 2) {
    var bb=e.detail.selectedId
    that.setData({
      bbb: bb
    })
    console.log("时间1的id：",that.data.bbb)
  }
  if (app.getid == 3) {
     var cc=e.detail.selectedId
     that.setData({
      ccc: cc
    })
     console.log("类型1的id：",that.data.ccc)
  }
    
      console.log("id值为：", e.detail.selectedId)
      getApp().post.request('https://test.quaerolife.com/api/app/repair/list?repairStatus=' + that.data.currentTab + '&pageNum=' + 1 + '&pageSize=' + 80 + '&isMy=' + that.data.aaa + '&isAsc=' + that.data.bbb+'&repairLevel='+that.data.ccc, 'application/json', 'GET',
        {}).then(res => {
          console.log("新的数据显示", res.data)
          if (that.data.currentTab == 0) {
            that.setData({
              aess: res.data.data.list
            })
          } else if (that.data.currentTab == 1) {
            that.setData({
              arrays: res.data.data.list
            })
            for (var i = 0; i < res.data.data.total; i++) {
              // console.log("22222赋值后的数据显示",that.data.arrays[i].my)
              // console.log("22222列表中的第一个用户：：",0,that.data.arrays[0])
              var myData = that.data.arrays[i].my
              that.setData({
                ['flag[' + i + ']']: myData
              })
              //console.log("222列表中的每一项：",i,that.data.flag[i])

            }
          } else if (that.data.currentTab == 2) {
            that.setData({
              arrayy: res.data.data.list
            })

          } else if (that.data.currentTab == 3) {
            that.setData({
              arrayess: res.data.data.list
            })
          } else if (that.data.currentTab == 4) {
            that.setData({
              arraydata: res.data.data.list
            })
          }
          else if (that.data.currentTab == 5) {
            that.setData({
              arrayyitem: res.data.data.list
            })
          }
        })
    
    
  },
  //评价
  judgeData: function (e) {
    var that = this;
    console.log("转发ssssssss", that.data.currentTab)
    getApp().post.request('https://test.quaerolife.com/api/app/repair/list', 'application/json', 'GET',
      {
        "repairStatus": that.data.currentTab,
        "pageNum": '1',
        "pageSize": '80',
      }).then(res => {
        console.log("新的数据显示", res.data)
        that.setData({
          aess: res.data.data.list
        })
        console.log("查看故障的故障id", that.data.aess[that.data.index].id)
        wx.navigateTo({
          url: "/pages/after-sales/after-salesOptions/maintainOptions/judge?lookid=" + that.data.aess[that.data.index].id,
        })
      })
  },
  //查看评价
  lookjudgeData: function (e) {
    var that = this;
    console.log("转发ssssssss", that.data.currentTab)
    getApp().post.request('https://test.quaerolife.com/api/app/repair/list', 'application/json', 'GET',
      {
        "repairStatus": that.data.currentTab,
        "pageNum": '1',
        "pageSize": '80',
        "isMy": that.data.show,
      }).then(res => {
        console.log("新的数据显示", res.data)
        that.setData({
          arrayess: res.data.data.list
        })
        console.log("查看故障的故障id", that.data.arrayess[that.data.index].id)
        wx.navigateTo({
          url: "/pages/after-sales/after-salesOptions/maintainOptions/lookjudge?lookid=" + that.data.arrayess[that.data.index].id,
        })
      })
  },
  //转发
  relayData: function (e) {
    var that = this;
    console.log("转发ssssssss", that.data.currentTab)
    getApp().post.request('https://test.quaerolife.com/api/app/repair/list', 'application/json', 'GET',
      {
        "repairStatus": that.data.currentTab,
        "pageNum": '1',
        "pageSize": '80',
      }).then(res => {
        console.log("新的数据显示", res.data)
        that.setData({
          aess: res.data.data.list
        })
        console.log("查看故障的故障id", that.data.aess[that.data.index].id)
        wx.navigateTo({
          url: "/pages/after-sales/after-salesOptions/maintainOptions/relay?lookid=" + that.data.aess[that.data.index].id,
        })
      })
  },
  //删除故障订单
  deletefinishData: function (e) {
    var that = this;
    console.log("订单提交的id：", that.data.currentTab)
    getApp().post.request('https://test.quaerolife.com/api/app/repair/list', 'application/json', 'GET',
      {
        "repairStatus": that.data.currentTab,
        "pageNum": '1',
        "pageSize": '80',
      }).then(res => {
        console.log("新的数据显示", res.data)
        that.setData({
          arrayy: res.data.data.list
        })
        console.log("查看故障的故障id", that.data.arrayy[that.data.index].id)
        wx.showModal({
          content: '确定删除此订单吗 ',
          icon: 'none',
          success: function (res) {
            if (res.confirm) {
              wx.showLoading({
                title: "删除中...",
                mask: true,
              });
              getApp().post.request('https://test.quaerolife.com/api/app/repair/' + that.data.arrayy[that.data.index].id + '/delete', 'application/json', 'GET',
                {
                }).then(res => {
                  wx.hideLoading()
                  getApp().post.request('https://test.quaerolife.com/api/app/repair/list', 'application/json', 'GET',
                    {
                      "repairStatus": that.data.currentTab,
                      "pageNum": '1',
                      "pageSize": '80',
                    }).then(res => {
                      that.setData({
                        arrayy: res.data.data.list
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

  //订单提交
  submitData: function (e) {
    var that = this;
    console.log("订单提交的id：", that.data.currentTab)
    getApp().post.request('https://test.quaerolife.com/api/app/repair/list', 'application/json', 'GET',
      {
        "repairStatus": that.data.currentTab,
        "pageNum": '1',
        "pageSize": '80',
      }).then(res => {
        console.log("新的数据显示", res.data)
        that.setData({
          aess: res.data.data.list
        })
        console.log("查看故障的故障id", that.data.aess[that.data.index].id)
        wx.showModal({
          content: '确定提交此订单吗 ',
          icon: 'none',
          success: function (res) {
            if (res.confirm) {
              wx.showLoading({
                title: "提交中...",
                mask: true,
              });
              getApp().post.request('https://test.quaerolife.com/api/app/repair/' + that.data.aess[that.data.index].id + '/complete', 'application/json', 'GET',
                {
                }).then(res => {
                  wx.hideLoading()
                  getApp().post.request('https://test.quaerolife.com/api/app/repair/list', 'application/json', 'GET',
                    {
                      "repairStatus": that.data.currentTab,
                      "pageNum": '1',
                      "pageSize": '80',
                    }).then(res => {
                      that.setData({
                        aess: res.data.data.list
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

  //查看故障
  lookData: function (e) {
    var that = this;
    console.log("dssssssssssssssssssss", e)
    getApp().post.request('https://test.quaerolife.com/api/app/repair/list', 'application/json', 'GET',
      {
        "repairStatus": that.data.currentTab,
        "pageNum": '1',
        "pageSize": '80',
        "isMy": that.data.show,
      }).then(res => {
        // that.setData({
        //   listArray: []
        //  })
        console.log("新的数据显示", res.data)
        that.setData({
          aess: res.data.data.list
        })
        console.log("查看故障的故障id", that.data.aess[that.data.index].id)
        wx.navigateTo({
          url: "/pages/after-sales/after-salesOptions/maintainOptions/repairsee?lookid=" + that.data.aess[that.data.index].id,
        })
      })
  },
  // 点击标题切换当前页时改变样式
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
        //  that.setData({
        //  listArray: []
        // })
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

    getApp().post.request('https://test.quaerolife.com/api/app/repair/list', 'application/json', 'GET',
      {
        "repairStatus": that.data.currentTab,
        "pageNum": that.data.pageNum,
        "pageSize": that.data.pageSize,
        "isMy": '',
        "isAsc": '',

      }).then(res => {
        if (that.data.currentTab == 0) {
          console.log("成功1", res.data.data.list.length)
          console.log("成功2", res.data.data.total)
          var contentlistTem = that.data.aess;
          if (res.data.data.list.length > 0) {
            if (that.data.pageNum == 1) {
              contentlistTem = []
            }
            var aess = res.data.data.list;
            if (aess.length < that.data.pageSize) {
              console.log("进来222222221")
              that.setData({
                aess: contentlistTem.concat(aess),

                hasMoreData: false

              })
              console.log("进来233333333321")
            } else {
              that.setData({
                aess: contentlistTem.concat(aess),
                hasMoreData: true,
                pageNum: that.data.pageNum + 1,


              })
              console.log("pageNum加1：", that.data.pageNum)

            }
          }

          console.log("此时的数据：", that.data.aess)
        } else if (that.data.currentTab == 1) {
          console.log("成功1", res.data.data.list.length)
          console.log("成功2", res.data.data.total)
          var contentlistTem = that.data.arrays;
          if (res.data.data.list.length > 0) {
            if (that.data.pageNum == 1) {
              contentlistTem = []
            }
            var arrays = res.data.data.list;
            if (arrays.length < that.data.pageSize) {
              console.log("进来222222221")
              that.setData({
                arrays: contentlistTem.concat(arrays),

                hasMoreData: false

              })
              console.log("进来233333333321")
            } else {
              that.setData({
                arrays: contentlistTem.concat(arrays),
                hasMoreData: true,
                pageNum: that.data.pageNum + 1,


              })
              console.log("pageNum加1：", that.data.pageNum)

            }
          }

          console.log("此时的数据：", that.data.arrays)
        } else if (that.data.currentTab == 2) {
          console.log("成功1", res.data.data.list.length)
          console.log("成功2", res.data.data.total)
          var contentlistTem = that.data.arrayy;
          if (res.data.data.list.length > 0) {
            if (that.data.pageNum == 1) {
              contentlistTem = []
            }
            var arrayy = res.data.data.list;
            if (arrayy.length < that.data.pageSize) {
              console.log("进来222222221")
              that.setData({
                arrayy: contentlistTem.concat(arrayy),

                hasMoreData: false

              })
              console.log("进来233333333321")
            } else {
              that.setData({
                arrayy: contentlistTem.concat(arrayy),
                hasMoreData: true,
                pageNum: that.data.pageNum + 1,


              })
              console.log("pageNum加1：", that.data.pageNum)

            }
          }

          console.log("此时的数据：", that.data.arrayy)
        } else if (that.data.currentTab == 3) {
          console.log("成功1", res.data.data.list.length)
          console.log("成功2", res.data.data.total)
          var contentlistTem = that.data.arrayess;
          if (res.data.data.list.length > 0) {
            if (that.data.pageNum == 1) {
              contentlistTem = []
            }
            var arrayess = res.data.data.list;
            if (arrayess.length < that.data.pageSize) {
              console.log("进来222222221")
              that.setData({
                arrayess: contentlistTem.concat(arrayess),

                hasMoreData: false

              })
              console.log("进来233333333321")
            } else {
              that.setData({
                arrayess: contentlistTem.concat(arrayess),
                hasMoreData: true,
                pageNum: that.data.pageNum + 1,


              })
              console.log("pageNum加1：", that.data.pageNum)

            }
          }

          console.log("此时的数据：", that.data.arrayess)
        }
        else if (that.data.currentTab == 4) {
          console.log("成功1", res.data.data.list.length)
          console.log("成功2", res.data.data.total)
          var contentlistTem = that.data.arraydata;
          if (res.data.data.list.length > 0) {
            if (that.data.pageNum == 1) {
              contentlistTem = []
            }
            var arraydata = res.data.data.list;
            if (arraydata.length < that.data.pageSize) {
              console.log("进来222222221")
              that.setData({
                arrayess: contentlistTem.concat(arraydata),

                hasMoreData: false

              })
              console.log("进来233333333321")
            } else {
              that.setData({
                arraydata: contentlistTem.concat(arraydata),
                hasMoreData: true,
                pageNum: that.data.pageNum + 1,


              })
              console.log("pageNum加1：", that.data.pageNum)

            }
          }

          console.log("此时的数据：", that.data.arraydata)
        }
        else if (that.data.currentTab == 5) {
          console.log("成功1", res.data.data.list.length)
          console.log("成功2", res.data.data.total)
          var contentlistTem = that.data.arrayyitem;
          if (res.data.data.list.length > 0) {
            if (that.data.pageNum == 1) {
              contentlistTem = []
            }
            var arrayyitem = res.data.data.list;
            if (arrayyitem.length < that.data.pageSize) {
              console.log("进来222222221")
              that.setData({
                arrayess: contentlistTem.concat(arrayyitem),

                hasMoreData: false

              })
              console.log("进来233333333321")
            } else {
              that.setData({
                arrayyitem: contentlistTem.concat(arrayyitem),
                hasMoreData: true,
                pageNum: that.data.pageNum + 1,


              })
              console.log("pageNum加1：", that.data.pageNum)

            }
          }

          console.log("此时的数据：", that.data.arrayyitem)
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
    getApp().post.request('https://test.quaerolife.com/api/app/repair/list', 'application/json', 'GET',
      {
        "repairStatus": that.data.currentTab,
        "pageNum": '1',
        "pageSize": '80',
        "isMy": that.data.show,
        "isAsc": false,
      }).then(res => {
        console.log("新的数据显示", res.data)
        if (that.data.currentTab == 0) {
          that.setData({
            aess: res.data.data.list
          })
        } else if (that.data.currentTab == 1) {
          that.setData({
            arrays: res.data.data.list
          })
          console.log("进行中的订单总数：", res.data.data.total)

          console.log("进行的总数是：", res.data.data.total)


        } else if (that.data.currentTab == 2) {
          that.setData({
            arrayy: res.data.data.list
          })

        } else if (that.data.currentTab == 3) {
          that.setData({
            arrayess: res.data.data.list
          })


        } else if (that.data.currentTab == 4) {
          that.setData({
            arraydata: res.data.data.list
          })

        }
        else if (that.data.currentTab == 5) {
          that.setData({
            arrayyitem: res.data.data.list
          })


        }
      })
    setTimeout(() => {
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
      console.log("下拉停止刷新")
    }, 2000);
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
    getApp().post.request('https://test.quaerolife.com/api/app/repair/list', 'application/json', 'GET',
      {
        "repairStatus": '0',
        "pageNum": '1',
        "pageSize": '80',
        "isMy": true,
        "isAsc": false,
      }).then(res => {
        console.log("新的数据显示", res.data)
        that.setData({
          aess: res.data.data.list,
          show: true
        })


      })
  },
  footerTap: app.footerTap
})
