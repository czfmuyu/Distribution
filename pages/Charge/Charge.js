// pages/Charge/Charge.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showgoods: false,//控制商品弹框隐藏显示
    charge:{name:"ssssssss",},
    // 单选
    sex: [
      {
        name: '1',
        value: '瓶数',
        checked: ""
      },
      {
        name: "0",
        value: "公斤",
        checked: 'true'
      }],
    goodslist: [
      {
        Name: "商品1",
        Price: 120,
        Quantity: 0,//计数
        PrceType: "公斤",
      },
      {
        Name: "商品2",
        Price: 120,
        Quantity: 0,//计数
        PrceType: "公斤",
      },
      {
        Name: "商品3",
        Price: 120,
        Quantity: 0,//计数
        PrceType: "瓶",
      },
      {
        Name: "商品4",
        Price: 120,
        Quantity: 0,//计数
        PrceType: "公斤",
      },
      {
        Name: "商品5",
        Price: 120,
        Quantity: 0,//计数
        PrceType: "瓶",
      }
    ],
    commodity: false,//商品选择列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 显示隐藏商品列表
  commodity:function(){
    this.setData({
      showgoods: true,
    })
  },
  // 点击确认隐藏商品框
  goodsConfirm:function(){
    this.setData({
      showgoods: false,
    })
  },
  // 点击取消隐藏提示框
  goodsCancel:function(){
    this.setData({
      showgoods: false,
    })
  },
  // 点击模板影藏
  goodsHideModal:function(){
    this.goodsCancel()
  },
  // 提交表单获取值
  Submit:function(e){
    
  },
  // 判断选择瓶还是公斤
  sex:function(e){
    console.log(e.detail.value)
  },
  // 获取订单值
  order:function(e){
    console.log(e)
  },
  // 获取押金值
  deposit: function (e) {
    console.log(e)
  },
  /**
  * 用户点击商品减1
  */
  subtracttap: function (e) {
    const index = e.target.dataset.index;
    const goodslist = this.data.goodslist;
    const Quantity = goodslist[index].Quantity;
    if (Quantity <= 0) {
      return;
    } else {
      goodslist[index].Quantity--;
      this.setData({
        goodslist: goodslist
      });
    }
    
  },
  /**
    * 用户点击商品加1
    */
  addtap: function (e) {
    const index = e.target.dataset.index;
    const goodslist = this.data.goodslist;
    const Quantity = goodslist[index].Quantity;
    goodslist[index].Quantity++;
    this.setData({
      goodslist: goodslist
    });
    
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