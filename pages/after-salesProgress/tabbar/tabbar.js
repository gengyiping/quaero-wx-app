// pages/after-salesProgress/tabbar/tabbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },

  /**
   * 组件的初始数据
   */
  data: {
    tabBar: [

      { 
        "pagePath": "/pages/index/index",
        "iconPath": "../../img/home.png",
        "selectedIconPath": "../../img/slt-home.png",
        "text": "主页"
      },
      {
        "pagePath": "../../pages/scan/scan",
        "iconPath": "../../img/scan.png",
        "selectedIconPath": "../../img/slt-scan.png",
        "text": "转交"

      }, 
      {
        "current": 0,
        "pagePath": "../../pages/user/user",
        "iconPath": "../../img/mine.png",
        "selectedIconPath": "../../img/slt-mine.png",
        "text": "个人中心"
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    navigateDetail: function (e) {
      wx.reLaunch({ // 关闭所有打开过的页面，跳转到相对于的页面
        url: e.currentTarget.dataset.url  // 获取tabbar.wxml中data-url传递的参数
      })
    }
  }
})


