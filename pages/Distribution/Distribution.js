// pages/Distribution/Distribution.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winWidth: 0,
    winHeight: 0,
    // tab切换
    currentTab: 0,
    // 订单
    currentTab1:0,
    // 维修
    currentTab2:0,
    whole:[{order:"111111111111",name:"小孩",telephone:"15556565555",address:"就集聚度见到你",if:0},
      { order: "111111111111", name: "小孩", telephone: "15556565555", address: "就集聚度见到你",if:1 },
      { order: "111111111111", name: "小孩", telephone: "15556565555", address: "就集聚度见到你",if:2 },
      { order: "111111111111", name: "小孩", telephone: "15556565555", address: "就集聚度见到你",if:0 },
      { order: "111111111111", name: "小孩", telephone: "15556565555", address: "就集聚度见到你",if:1 }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    /**
     * 获取系统信息
     */
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
    // 控制容器高度，让内容完全显示
    //创建节点选择器
    var query = wx.createSelectorQuery();
    query.select('.whole').boundingClientRect(function (rect) {
      var leng=that.data.whole.length
      that.setData({
        winHeight: rect.height * leng+100
      })
    }).exec();
  },
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  // 订单订单
  bindChange1:function(e){
    var that = this;
    that.setData({
      currentTab1: e.detail.current
    })
  },
  /**
   * 点击tab切换
   */
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  // 订单点击切换
  swichNav1:function(e){
    var that = this;
    if (that.data.currentTab1===e.target.dataset.current){
      return false;
    }else{
      that.setData({
        currentTab1: e.target.dataset.current
      })
    }
  },

  // 维修订单js
  // 滑动事件
  bindChange2:function(e){
    var that=this;
    that.setData({
      currentTab2: e.detail.current
    })
  },
// 点击切换事件
  swichNav2:function(e){
    var that=this;
    if (that.data.currentTab2 === e.target.dataset.current){
      return false;
    }else{
      that.setData({
        currentTab2: e.target.dataset.current
      })
    }
  },
  // 订单取消事件
  cancel:function(){
    wx.navigateTo({
      url: '/pages/CancellationOf/CancellationOf',
    })
  },
// 页面跳转==============================
// 跳转未处理详情
  DistributionMainte:function(){
    wx.navigateTo({
      url: '/pages/DistributionMainte/DistributionMainte',
    })
  },
  // 跳转处理好了的详情
  MaintenanceTreatm:function(){
    wx.navigateTo({
      url: '/pages/MaintenanceTreatm/MaintenanceTreatm',
    })
  },

  // 配送完成页面
  DeliveryCompOk:function(){
    wx.navigateTo({
      url: '/pages/DeliveryCompOk/DeliveryCompOk',
    })
  },
// 完成配送按钮
  DeliveryCompOkMap:function(){
    wx.navigateTo({
      url: '/pages/DeliveryCompOkMap/DeliveryCompOkMap',
    })
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