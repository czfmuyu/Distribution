// pages/customer/customer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 是否显示激活列表
    Customer:false,
    Customer1:true,
    winWidth: 0,
    winHeight: 0,
    // tab切换
    currentTab: 0,
    // 表单
    orderData: {
      name: '',//用气编号
      quantity: '',//回收数量
      custody: '',//押瓶数
      money: "",//押瓶金额
      sex: "0",
      owe: '',//欠瓶数
      shouj:"",
    },
    whole:[{
      identifier:"23545454",
      name:"淡淡的",
      address:"就妇女节达芙妮减肥呢"
    }]
  },


  /**
       * 表单赋值
       */
  changeOrderData(e) {
    console.log(e)
    let order_data = this.data.orderData;
    let data_type = e.target.dataset.type;
    let value = e.detail.value;
    order_data[data_type] = value;
    this.setData({
      'orderData': order_data
    })
  },
  // 查看表单值
  submitOrder: function () {
    let order = this.data.orderData
    console.log(this.data.orderData)
    if (!order.name || !order.quantity || !order.custody ||!order.money){
      wx.showToast({
        title: '信息不能为空',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    this.setData({
      Customer: false,
      Customer1: true,
    })
  },
  // 滑动切换
  bindChange: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
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
  // 添加用户显示表格
  addend:function(){
    this.setData({
      Customer: true,
      Customer1: false,
    })
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
      var leng = that.data.whole.length
      that.setData({
        winHeight: rect.height * leng + 100
      })
    }).exec();
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