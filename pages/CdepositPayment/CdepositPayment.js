// pages/NewSingleDetails/NewSingleDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 支付弹框状态
    confirm: 0,
    table: [{ name: "液化气大瓶", heavy: "40", price: "500", quantity: "3" },
    { name: "液化气大瓶", heavy: "40", price: "500", quantity: "3" },
    { name: "液化气大瓶", heavy: "40", price: "500", quantity: "3" }],
    card: [{ img:"../../images/xb.png",name:"中国农业银行",},
      { img: "../../images/jsyh.png", name: "中国农业银行", },
      { img: "../../images/gsyh.png", name: "中国工商银行", },
      { img: "../../images/nyyh.png", name: "中国农业银行", }]
  },
  // 显示银行卡选择框
  confirm: function () {
    var that=this
    that.setData({
      confirm:1
   })
  },
  // 隐藏银行卡选择款
  confirm1:function(){
    var that = this
    that.setData({
      confirm: 0
    })
    wx.navigateTo({
      url: '/pages/CpaymentSuccess/CpaymentSuccess'
    });
  },
  // 线下支付弹框

  tips(e) {
    
    wx.showModal({
      title: '提示',
      content: '确认已缴费？',
      confirmText: '确认',
      cancelText: "取消",
      success: res => {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/CpaymentSuccess/CpaymentSuccess'
          });
        }
      }
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