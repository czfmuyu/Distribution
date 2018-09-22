const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,

  
  imgpreview(data_evnt, imgarrs) {  //图片预览
    //获取当前图片的下标
    var index = data_evnt.currentTarget.dataset.index;
    //所有图片
    var imgs = imgarrs;
    wx.previewImage({
      //当前显示图片
      current: imgs[index],
      //所有图片
      urls: imgs
    })
  },


  /**
	 * 错误消息提示
	 */
  showError(err_msg, url) {
    wx.showModal({
      title: "提示",
      content: err_msg,
      showCancel: false,
      confirmColor: "#72bf5e",
      success: res => {
        if (url) {
          if (url.indexOf('user/index') > -1) {
            wx.switchTab({
              url: url,
            })
          } else {
            wx.navigateTo({
              url: url,
            })
          }
        }
      }
    })
  }
}
