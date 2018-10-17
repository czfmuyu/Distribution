var util = require('../../utils/util.js');
let app = getApp().globalData
let { baseUrl } = getApp().globalData
// 上传图片接口
const Urlsimg = `${baseUrl}/Api/Files/UploadImg`

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
    // 存放用户选择的图片路径数组
    pics:"",
    // 上传图片编号
    identifier: [],

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
  pictureuploading(){
    var _this=this
    pics=this.data.pics;
    
    wx.chooseImage({
      count: 9,//最多上传多少张图片
      sizeType: ['compressed'],//是否压缩
      sourceType:['album','camera'],//从相册还是拍照
      success: function(res) {
        var imgurl=res.tempFilePaths;
        pics = pics.concat(imgsrc);
        if (pics.length >= 9) {
          wx.showToast({
            title: "最多上传9张图片！",
            image: "../../imgs/xcit.png",
            duration: 2000
          });
          return false
        }
        that.setData({
          pics: pics
        });
      },
    })
  },
  uploadimg:function(){
    let _this=this
    let pics=_this.data.pics;
    let imglist = _this.data.identifier
    for (let i = 0; pics.length>i;i++){
      wx.uploadFile({
        url: Urlsimg,
        filePath:pics[i],
        name: 'image',
        success:(res)=>{
          var identifier
          let data=res.data
          let imglists=JSON.parse(data);
          let datalist = imglists.Data
          imglist = imglist.concat(datalist)
          identifier = imglist.join(',');
          that.setData({
            "frolist.PhotoIds": identifier,
          })

        }
      })
    }
  },

  /**
   * 移除图片
   */
  removeImg(e) {
    let img = e.target.dataset.img_url;
    let imgs = this.data.pics;
    imgs.splice(imgs.indexOf(img), 1);//找出第一个,反回下标然后删除
    this.setData({
      pics: imgs
    })
  },
  // 图片预览
  previewImg: function (e) {
    var data_evnt = e;   //将函数事件对象传入 ，以及图片获取到的数组 
    util.imgpreview(data_evnt, this.data.pics)
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