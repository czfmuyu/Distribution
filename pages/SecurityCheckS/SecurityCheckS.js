var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderInfo: {
      name: "233253",
      name1: "44643",
      name2: "小啊",
      images: [],
      sex: "0",
      securit:"",
    },
    sex: [{
        name: '1',
        value: '是',
        checked: ""
      },
      {
        name: "0",
        value: "否",
        checked: 'true'
      }
    ],

  },
  // 获取安检是否合格

  sex: function(e) {
    let sex = e.detail.value
    this.setData({
      "orderInfo.sex": sex
    })
  },
  // 关闭关闭当前页
  commoditys: function() {
    let sex1 = this.data.orderInfo.sex
    if (sex1 == 1) {
      console.log(this.data.orderInfo)
      let imgs = this.data.orderInfo.images
      if(imgs.length>=1){
        wx.redirectTo({
          url: "/pages/DeliveryCompOk/DeliveryCompOk"
        })
      }else{
        util.showError('请上传照片');
      }
      
    }else{
      util.showError('安检不合格不准许提交');
    }
  },
// 安检建议
  securit:function(e){
    let securit1 = e.detail.value
    this.setData({
      "orderInfo.securit": securit1
    })
  },
  

  /**
   * 上传图片
   */
  uploadImg: function() {
    let _this = this;
    let imgs = _this.data.orderInfo.images;
    if (imgs.length >= 9) {
      util.showError('最多上传9张图片');
      return false;
    }
    _this.chooseimage()
  },
  //选择相机还是本地图片
  chooseimage: function() {
    var that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#2168d3",
      success: function(res) {
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

  chooseWxImage: function(type) {
    var _this = this;
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ["compressed"], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: [type], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var imgs = _this.data.orderInfo.images;
        for (var i = 0; i < tempFilePaths.length; i++) {
          if (imgs.length >= 9) {
            _this.setData({
              "orderInfo.images": imgs
            });
            return false;
          } else {
            imgs.push(tempFilePaths[i]);
          }
        }
        //  console.log(imgs);
        _this.setData({
          "orderInfo.images": imgs
        });
      }
    });
  },


  /**
   * 移除图片
   */
  removeImg(e) {
    let img = e.target.dataset.img_url;
    let imgs = this.data.orderInfo.images;
    imgs.splice(imgs.indexOf(img), 1);
    this.setData({
      'orderInfo.images': imgs
    })
  },
  // 图片预览
  previewImg: function(e) {
    var data_evnt = e; //将函数事件对象传入 ，以及图片获取到的数组 
    util.imgpreview(data_evnt, this.data.orderInfo.images)
  },
  /**e
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})