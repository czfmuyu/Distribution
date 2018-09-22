// pages/Delivery/Delivery.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    table: [{ name: "液化气大瓶",  price: "500", quantity: "3" },
    { name: "液化气大瓶", price: "500", quantity: "3" },
    { name: "液化气大瓶",  price: "500", quantity: "3" }],
    orderData: {
      money: '',//合计金额
      identifier: '',//钢瓶信息
      empty: '',//空瓶数
      deposit: "0",//押金
      depositnum: '0',//押瓶数
      underbottle: "0",//欠瓶数
    },
  },

  /**
     * 表单赋值
     */
  changeOrderData(e) {
    let order_data = this.data.orderData
    let data_type = e.target.dataset.type
    let value = e.detail.value
    order_data[data_type] = value
    this.setData({
      "orderData": order_data
    })
  },
  submitOrder:function(){
    console.log(this.data.orderData)
    wx.navigateTo({
      url: '/pages/Safety/Safety',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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