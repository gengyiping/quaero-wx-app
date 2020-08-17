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
      listen: 2234,
    }],
    arrays:[],
    arrayy: [],
    arrayyitem: [],
    arrayess: [],
    aess:[],      
    arr:'订单优先级',
    select: false,
    aay: ['停机级故障', '非停机级故障', '优化故障'],
    index: 0,
    flag: [],
  },
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  //进行
  readDetail: function (e) {
    console.log("进行shuju",e)
    this.setData({
      index : e.currentTarget.dataset.id
    })
    console.log('进行点击模板的位置id是：', this.data.index);
  },
  //完成
  readDetailtwo: function (e) {
    console.log("完成shuju",e)
    var index = e.currentTarget.dataset.id; 
    this.setData({
      index : e.currentTarget.dataset.id
    })
    console.log('完成点击模板的位置id是：' + index);
  },
  //评价
  readDetailone: function (e) {
    console.log("评价shuju",e)
    this.setData({
      index : e.currentTarget.dataset.id
    })
    console.log('评价点击模板的位置id是：' + this.data.index);
  },
  //全部
  readDetailth: function (e) {
    console.log("全部shuju",e)
    this.setData({
      index : e.currentTarget.dataset.id
    })
    console.log('全部点击模板的位置id是：' + this.data.index);
  },
  //未处理
  readDetailthno: function (e) {
    console.log("未处理shuju",e)
    this.setData({
      index : e.currentTarget.dataset.id
    })
    console.log('未处理点击模板的位置id是：' + this.data.index);
  },
  // 滚动切换标签样式
  switchTab: function (e) {
    console.log("滚动切换标签：",e)
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },

  swich: function (e) {
    var cur = e.target.dataset.currentt;
    console.log("此时用户选择的列表ID：", cur);
    if (this.data.currenttTaB == cur) { return false; }
    else {
      this.setData({
        currenttTab: cur
      })
    }
  },
  //评价
  judgeData:function(e){
        var that = this;
        console.log("转发ssssssss",that.data.currentTab)
        getApp().post.request('https://test.quaerolife.com/api/app/repair/list', 'application/json', 'GET',
          {
            "repairStatus": that.data.currentTab,
            "pageNum": '1',
            "pageSize": '80',
          }).then(res => {
            console.log("新的数据显示", res.data)
            that.setData({
              aess: res.data.data.list
            })
           console.log("查看故障的故障id",that.data.aess[that.data.index].id)
            wx.navigateTo({
              url:"/pages/after-sales/after-salesOptions/maintainOptions/judge?lookid="+that.data.aess[that.data.index].id,
           })
  
          })   
  
      },
  //转发
  relayData:function(e){
        var that = this;
        console.log("转发ssssssss",that.data.currentTab)
        getApp().post.request('https://test.quaerolife.com/api/app/repair/list', 'application/json', 'GET',
          {
            "repairStatus": that.data.currentTab,
            "pageNum": '1',
            "pageSize": '80',
          }).then(res => {
            console.log("新的数据显示", res.data)
            that.setData({
              aess: res.data.data.list
            })
           console.log("查看故障的故障id",that.data.aess[that.data.index].id)
            wx.navigateTo({
              url:"/pages/after-sales/after-salesOptions/maintainOptions/relay?lookid="+that.data.aess[that.data.index].id,
           })
          })      
      },

  //订单提交
  submitData:function(e){
        var that = this;
    console.log("订单提交的id：",that.data.currentTab)
        getApp().post.request('https://test.quaerolife.com/api/app/repair/list', 'application/json', 'GET',
          {
            "repairStatus": that.data.currentTab,
            "pageNum": '1',
            "pageSize": '80',
          }).then(res => {
            console.log("新的数据显示", res.data)
            that.setData({
              aess: res.data.data.list
            })
           console.log("查看故障的故障id",that.data.aess[that.data.index].id)
           wx.showModal({
      content: '确定提交此订单吗 ',
      icon:'none',
      success:function(res){
        if (res.confirm) {
          wx.showLoading({
            title: "提交中...",
            mask: true,
          });
          getApp().post.request('https://test.quaerolife.com/api/app/repair/'+that.data.aess[that.data.index].id+'/complete', 'application/json', 'GET',
         {
         }).then(res => {
          wx.hideLoading()
           getApp().post.request('https://test.quaerolife.com/api/app/repair/list', 'application/json', 'GET',
    {
              "repairStatus": that.data.currentTab,
              "pageNum": '1',
              "pageSize": '80',
    }).then(res => {
      that.setData({
         aess: res.data.data.list
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
  lookData:function(e){
        var that = this;
        console.log("dssssssssssssssssssss",that.data.currentTab)
        getApp().post.request('https://test.quaerolife.com/api/app/repair/list', 'application/json', 'GET',
          {
            "repairStatus": that.data.currentTab,
            "pageNum": '1',
            "pageSize": '80',
          }).then(res => {
            console.log("新的数据显示", res.data)
            that.setData({
              aess: res.data.data.list
            })
           console.log("查看故障的故障id",that.data.aess[that.data.index].id)
            wx.navigateTo({
              url:"/pages/after-sales/after-salesOptions/maintainOptions/repairsee?lookid="+that.data.aess[that.data.index].id,
           })
          })      
      },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
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
      "repairStatus":that.data.currentTab,
        "pageNum": '1',
        "pageSize": '80',
    }).then(res => {
      console.log("新的数据显示", res.data)
      if (e.target.dataset.current == 0 ) {
        that.setData({
          aess: res.data.data.list
        })
      } else if (e.target.dataset.current == 1) {
        that.setData({
          arrays: res.data.data.list
        })
        console.log("进行中的订单总数：",res.data.data.total)
        for(var i=0;i<res.data.data.total;i++){
          console.log("赋值后的数据显示",that.data.arrays[i].my)
        var myData=that.data.arrays[i].my
        that.setData({
          ['flag['+i+']'] : myData
        })
        console.log("列表中的每一项：",that.data.flag[i])
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
    }).then(res => {
      console.log("新的数据显示", res.data)
      that.setData({
        aess: res.data.data.list
      })
    })
  },
  footerTap: app.footerTap
})
