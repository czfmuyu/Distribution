var util = require('../../utils/util.js');
let wechat = require("../../utils/wechat");
let amap = require("../../utils/amap");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    judge: 0,
    // 当时时间
    time: "",
    // 包含年月日时间
    year:"",
    // 上班打卡时间规定
    timegotos:"8:00",
    // 上班时间
    timegoto: "",
    // 下班时间
    timegooff: "",
    // 下班打卡时间
    timegooff:"8:00",
    //地图参数
    cindex: "0",
    // time: 0,
    types: ["getDrivingRoute", "getWalkingRoute", "getTransitRoute", "getRidingRoute"],
    markers: [],
    polyline: [],
    distance: '',
    cost: '',
    transits: [],
    city: "",
    name: "",
    desc: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   
    // 本地储存时间

    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var times = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    let time = times.slice(10, 16)
    this.setData({
      time: time,
      year: times
    });

    amap.getRegeo() //获取当前定位
      .then(d => {
        console.log(d);
        let {
          name,
          desc,
          latitude,
          longitude
        } = d[0];
        let {
          city
        } = d[0].regeocodeData.addressComponent;
        this.coordinate(latitude, longitude)
      })
  },
  // 上班打卡
  goto: function() {
    let timegoto = this.data.time
    let time=timegoto.slice(2,1)
   
    this.setData({
      judge: 1,
      timegoto: timegoto
    })
    wx.setStorageSync("key", timegoto)
    this.gotkey()
  },
  // 下班打卡
  gooff: function() {
    let timegooff = this.data.time
    this.setData({
      judge: 2,
      timegooff: timegooff
    })
    wx.setStorageSync("keyoff", timegooff)
    this.gooffkey()
  },
  // 补卡
  card: function() {
    this.setData({
      judge: 3,
    })
  },
  // 获取本地下班储存时间
  gooffkey: function() {
    let _this=this
    wx.getStorage({
      key: 'keyoff',
      success: function(res) {
        let res2=res.data
        _this.setData({
          timegooff:res2
        })
      }
    })
  },
  // 获取本地储存上班时间
  gotkey: function () {
    let _this=this
    wx.getStorage({
      key: 'key',
      success: function (res) {
        let res1=res.data
        _this.setData({
          timegoto: res1
        })
      }
    })
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

    amap.getRegeo() //获取当前定位
      .then(d => {
        console.log(d);
        let {
          name,
          desc,
          latitude,
          longitude
        } = d[0];
        let {
          city
        } = d[0].regeocodeData.addressComponent;
        this.coordinate(latitude, longitude)
      })
    // this.time()
    this.getRoute();
  },
  time() {
    let this_ = this
    let Interval = setInterval(function() {
      amap.getRegeo() //获取当前定位
        .then(d => {
          console.log(d);
          let {
            name,
            desc,
            latitude,
            longitude
          } = d[0];
          let {
            city
          } = d[0].regeocodeData.addressComponent;
          this_.coordinate(latitude, longitude)
        })
      if (this_.data.time === 1) {
        clearInterval(Interval)
      }
    }, 50000)
  },
  coordinate(latitude, longitude) {
    let latitude2 = "30.642839";
    let longitude2 = "104.044046";
    let city = "成都市";
    let name = "卫味盐帮菜";
    let desc = "蜀汉街武侯祠大街258号";
    let markers = [{
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
    }];
    this.setData({
      latitude,
      longitude,
      latitude2,
      longitude2,
      markers,
      city,
      name,
      desc
    });
  },
  changeType(e) {
    let {
      id
    } = e.target.dataset;
    let {
      cindex
    } = this.data;
    if (id == cindex) return;
    this.setData({
      cindex: id
    });
    this.getRoute();
  },
  getRoute() {
    let {
      latitude,
      longitude,
      latitude2,
      longitude2,
      types,
      cindex,
      city
    } = this.data;
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
    } else {
      if (d && d.transits) {
        let transits = d.transits;
        transits.forEach(item1 => {
          let {
            segments
          } = item1;
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
        this.setData({
          transits
        });
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
    } else if (type == "getWalkingRoute" || type == "getRidingRoute") {
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
    } else if (type == "getRidingRoute") {

    }
  },

  goDetail() {
    let url = `/pages/info/info`;
    wx.navigateTo({
      url
    });
  },
  nav() {
    let {
      latitude2,
      longitude2,
      name,
      desc
    } = this.data;
    wx.openLocation({
      latitude: +latitude2,
      longitude: +longitude2,
      name,
      address: desc
    });
  },

})