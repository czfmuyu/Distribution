var util = require('../../utils/util.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 表单
    orderData: {
      name: '',//用气编号
      quantity: '',//回收数量
      custody: '',//押瓶数
      money: "",//押瓶金额
      sex: "0",
      sex1: "0",
      sex2: "0",
      owe: '',//欠瓶数
      images:[]
    },
  },


  /**
       * 表单赋值
       */
  changeOrderData(e) {
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
    console.log(this.data.orderData)
  },

  /**
 * 上传图片
 */
  uploadImg: function () {
    let _this = this;
    let imgs = _this.data.orderData.images;
    if (imgs.length >= 9) {
      util.showError('最多上传9张图片');
      return false;
    }
    _this.chooseimage()
  },
  //选择相机还是本地图片
  chooseimage: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#2168d3",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImage('camera')
          }
        }
      }
    })
  },

  chooseWxImage: function (type) {
    var _this = this;
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: [type], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var imgs = _this.data.orderData.images;
        for (var i = 0; i < tempFilePaths.length; i++) {
          if (imgs.length >= 9) {
            _this.setData({
              "orderData.images": imgs
            });
            return false;
          } else {
            imgs.push(tempFilePaths[i]);
          }
        }
        //  console.log(imgs);
        _this.setData({
          "orderData.images": imgs
        });
      }
    });
  },


  /**
   * 移除图片
   */
  removeImg(e) {
    let img = e.target.dataset.img_url;
    let imgs = this.data.orderData.images;
    imgs.splice(imgs.indexOf(img), 1);
    this.setData({
      'orderData.images': imgs
    })
  },
  // 图片预览
  previewImg: function (e) {
    var data_evnt = e;   //将函数事件对象传入 ，以及图片获取到的数组 
    util.imgpreview(data_evnt, this.data.orderData.images)
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