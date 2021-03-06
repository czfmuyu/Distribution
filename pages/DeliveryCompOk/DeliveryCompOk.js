let util = require('../../utils/util.js');
let wechat = require("../../utils/wechat");
let amap = require("../../utils/amap");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //地图参数
    cindex: "0",
    time: 0,
    types: ["getDrivingRoute", "getWalkingRoute", "getTransitRoute", "getRidingRoute"],
    markers: [],
    polyline: [],
    distance: '',
    cost: '',
    transits: [],
    city: "",
    name: "",
    desc: "",
    hiddenmodalput: true,
    table: [{ name: "液化气大瓶", heavy: "40", price: "500", quantity: "3" },
    { name: "液化气大瓶", heavy: "40", price: "500", quantity: "3" },
    { name: "液化气大瓶", heavy: "40", price: "500", quantity: "3" }]
  },
  //点击按钮痰喘指定的hiddenmodalput弹出框  
  modalinput: function () {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  //取消按钮  
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  //确认  
  confirm: function () {
    this.setData({
      hiddenmodalput: true
    })
  },
  // 跳转到安检页面
  security: function () {
    wx.navigateTo({
      url: '/pages/SecurityCheckS/SecurityCheckS',
    })
  },
  // 配送完成填表页面
  DeliveryCompOkMap: function () {
    wx.navigateTo({
      url: '/pages/Delivery/Delivery',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //地图逻辑
    // console.log(e)
    // let { latitude, longitude, latitude2, longitude2, city, name, desc } = e;

    // let latitude = "30.641904";
    // let longitude = "104.043243";
    amap.getRegeo()//获取当前定位
      .then(d => {
        console.log(d);
        let { name, desc, latitude, longitude } = d[0];
        let { city } = d[0].regeocodeData.addressComponent;
        this.coordinate(latitude, longitude)
      })
    this.time()
    this.getRoute();

  },
  time() {
    let this_ = this
    let Interval = setInterval(function () {
      amap.getRegeo()//获取当前定位
        .then(d => {
          console.log(d);
          let { name, desc, latitude, longitude } = d[0];
          let { city } = d[0].regeocodeData.addressComponent;
          this_.coordinate(latitude, longitude)
        })
      if (this_.data.time === 1) {
        clearInterval(Interval)
      }
    }, 50000)
  },
  Stop() {
    this.setData({
      time: 1
    })
  },
  //获取坐标
  coordinate(latitude, longitude) {
    let latitude2 = "30.642839";
    let longitude2 = "104.044046";
    let city = "成都市";
    let name = "卫味盐帮菜";
    let desc = "蜀汉街武侯祠大街258号";
    let markers = [
      {
        iconPath: "/images/mapicon_navi_s.png",
        id: 0,
        latitude,
        longitude,
        width: 23,
        height: 33
      }, {
        iconPath: "/images/mapicon_navi_e.png",
        id: 1,
        latitude: latitude2,
        longitude: longitude2,
        width: 24,
        height: 34
      }
    ];
    this.setData({
      latitude, longitude, latitude2, longitude2, markers, city, name, desc
    });
  },
  changeType(e) {
    let { id } = e.target.dataset;
    let { cindex } = this.data;
    if (id == cindex) return;
    this.setData({ cindex: id });
    this.getRoute();
  },
  getRoute() {
    let { latitude, longitude, latitude2, longitude2, types, cindex, city } = this.data;
    let type = types[cindex];
    let origin = `${longitude},${latitude}`;
    let destination = `${longitude2},${latitude2}`;
    amap.getRoute(origin, destination, type, city)
      .then(d => {
        // console.log(d);
        this.setRouteData(d, type);
      })
      .catch(e => {
        console.log(e);
      })
  },
  setRouteData(d, type) {
    if (type != "getTransitRoute") {
      let points = [];
      if (d.paths && d.paths[0] && d.paths[0].steps) {
        let steps = d.paths[0].steps;
        wx.setStorageSync("steps", steps);
        steps.forEach(item1 => {
          let poLen = item1.polyline.split(';');
          poLen.forEach(item2 => {
            let obj = {
              longitude: parseFloat(item2.split(',')[0]),
              latitude: parseFloat(item2.split(',')[1])
            }
            points.push(obj);
          })
        })
      }
      this.setData({
        polyline: [{
          points: points,
          color: "#0091ff",
          width: 6
        }]
      });
    }
    else {
      if (d && d.transits) {
        let transits = d.transits;
        transits.forEach(item1 => {
          let { segments } = item1;
          item1.transport = [];
          segments.forEach((item2, j) => {
            if (item2.bus && item2.bus.buslines && item2.bus.buslines[0] && item2.bus.buslines[0].name) {
              let name = item2.bus.buslines[0].name;
              if (j !== 0) {
                name = '--' + name;
              }
              item1.transport.push(name);
            }
          })
        })
        this.setData({ transits });
      }
    }
    if (type == "getDrivingRoute") {
      if (d.paths[0] && d.paths[0].distance) {
        this.setData({
          distance: d.paths[0].distance + '米'
        });
      }
      if (d.taxi_cost) {
        this.setData({
          cost: '打车约' + parseInt(d.taxi_cost) + '元'
        });
      }
    }
    else if (type == "getWalkingRoute" || type == "getRidingRoute") {
      if (d.paths[0] && d.paths[0].distance) {
        this.setData({
          distance: d.paths[0].distance + '米'
        });
      }
      if (d.paths[0] && d.paths[0].duration) {
        this.setData({
          cost: parseInt(d.paths[0].duration / 60) + '分钟'
        });
      }
    }
    else if (type == "getRidingRoute") {

    }
  },
  
  goDetail() {
    let url = `/pages/info/info`;
    wx.navigateTo({ url });
  },
  nav() {
    let { latitude2, longitude2, name, desc } = this.data;
    wx.openLocation({
      latitude: +latitude2,
      longitude: +longitude2,
      name,
      address: desc
    });
  },


})