// pages/Punch/Punch.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    judge:0,
    time:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var times = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    let time = times.slice(10,16)
    console.log(time)
    this.setData({
      time: time
    });

  },

  goto:function(){
    this.setData({
      judge:1,
    })
  },
  gooff:function(){
    this.setData({
      judge:2,
    })
  },
  // 补卡
  card:function(){
    this.setData({
      judge: 3,
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