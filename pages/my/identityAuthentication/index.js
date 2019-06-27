// pages/my/identityAuthentication/index.js
const util = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardNumber:'',
    msg:'获取验证码',
    time: null,
    num: 60
  },
  chooseCode(e){
    this.setData({
      cardNumber: e.detail.value
    })
  },
  getCode() {
    if (this.data.num == 60) {
      let params = {
        mobile: wx.getStorageSync('mobile'),
        type:3
      };
      let that = this;
      util
        ._get("account/code", params)
        .then(res => {
          console.log(res);
          if (res.code == 1) {
            let timer = setInterval(function name(params) {
              if (that.data.num < 1) {
                that.setData({
                  msg: "发送验证码",
                  num: 60
                });
              } else {
                that.data.num--;

                that.setData({
                  msg: "重新发送" + that.data.num + "s"
                });
              }
            }, 1000);
            that.setData({
              time: timer
            });
          }
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      wx.showToast({
        title: "请勿连续点击",
        icon: "none"
      });
    }
  },
  tapStep(e){
    let params = {
      mobile:wx.getStorageSync('mobile'),
      code:this.data.cardNumber
    }
    util._get('account/verify',params).then(res=>{
      if(res.code == 1) {
    wx.navigateTo({ url: '../realNameAuthentication/index' });

      } else {
        wx.showToast({
          title: res.desc
        })
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
    clearInterval(this.data.time)
    this.setData({
      time:null
    })
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