// component/dropdownmenu/dropdownmenu.js
var app = getApp();

Component({
  properties: {
    dropDownMenuTitle: {
      type: Array,
      value: [],
    },


    dropDownMenuSourceData: {
      type: Array,
      value: []
    },
    dropDownMenuStyleData: {
      type: Array,
      value: []
    },
    dropDownMenuFilterData: {
      type: Array,
      value: []
    },
  },
  data: {
    // private properity

    source_open: false, // 显示
    style_open: false, // 时间
    filteropen: false, // 故障
    shownavindex: '',
    dropDownMenuDistrictDataRight: {},
    district_left_select: '',
    district_right_select: '',
    district_right_select_name: '',
    selected_style_id: 0,
    selected_style_name: '',
    selected_source_id: 0,
    selected_source_name: '',
    selected_filter_id: 0,
    selected_filter_name: '',
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
    inde: 0xfff
  },
  methods: {

    tapSourceNav: function (e) {
      console.log("用户点击的id：",e.currentTarget.dataset.nav,e)
      
      if (this.data.source_open) {
        this.setData({
          source_open: false,
          style_open: false,
          filter_open: false,
          shownavindex: 0
        })
      } else {
        this.setData({
          source_open: true,
          style_open: false,
          filter_open: false,
          shownavindex: e.currentTarget.dataset.nav
        })
      }
      app.getid=this.data.shownavindex
    },
    tapStyleNav: function (e) {
      console.log("用户点击的id：",e.currentTarget.dataset.nav,e)
      if (this.data.style_open) {
        this.setData({
          source_open: false,
          style_open: false,
          filter_open: false,
          shownavindex: 0
        })
      } else {
        this.setData({
          source_open: false,
          style_open: true,
          filter_open: false,

          shownavindex: e.currentTarget.dataset.nav
        })
      }
      app.getid=this.data.shownavindex
      console.log(e.target)
    },
    tapFilterNav: function (e) {
      console.log("用户点击的id：",e.currentTarget.dataset.nav,e)
      if (this.data.filter_open) {
        this.setData({
          source_open: false,
          style_open: false,
          filter_open: false,
          shownavindex: 0
        })
      } else {
        this.setData({
          source_open: false,
          style_open: false,
          filter_open: true,
          shownavindex: e.currentTarget.dataset.nav
        })
      }
      app.getid=this.data.shownavindex
    },

    selectSourceItem: function (e) {
      var selectedId = e.target.dataset.model.id
      var selectedTitle = e.target.dataset.model.title;
      this.closeHyFilter();
      this.setData({
        selected_source_id: selectedId,
        selected_source_name: selectedTitle
      })
      this.triggerEvent("selectedItem", {
        index: this.data.shownavindex,
        selectedId: selectedId,
        selectedTitle: selectedTitle
      })
    },

    selectFilterItem: function (e) {
      var selectedId = e.target.dataset.model.id
      var selectedTitle = e.target.dataset.model.title;
      this.closeHyFilter();
      this.setData({
        selected_filter_id: selectedId,
        selected_filter_name: selectedTitle
      })
      this.triggerEvent("selectedItem", {
        index: this.data.shownavindex,
        selectedId: selectedId,
        selectedTitle: selectedTitle
      })
    },

    selectStyleItem: function (e) {
      var selectedId = e.target.dataset.model.id
      var selectedTitle = e.target.dataset.model.title;
      this.closeHyFilter();
      this.setData({
        selected_style_id: selectedId,
        selected_style_name: selectedTitle
      })
      this.triggerEvent("selectedItem", {
        index: this.data.shownavindex,
        selectedId: selectedId,
        selectedTitle: selectedTitle
      })
    },

  
    closeHyFilter: function () {
      if (this.data.source_open) {
        this.setData({
          source_open: false,
          style_open: false,
          filter_open: false,
        })
      } else if (this.data.style_open) {
        this.setData({
          source_open: false,
          style_open: false,
          filter_open: false,
        })
      } else if (this.data.filter_open) {
        this.setData({
          source_open: false,
          style_open: false,
          filter_open: false,
        })
      }
    },
  },

  attached: function () {


  },








})