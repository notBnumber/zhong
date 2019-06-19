// pages/my/index/index.js
const util = require("../../../utils/util.js");
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    isProup: false,
    info: {},
    money:{}
  },

  pageTo({ currentTarget: { dataset } }) {
    // console.log(dataset);
    wx.navigateTo({
      url: dataset.url
    });
  },
  Invitation() {
    this.setData({
      isProup: !this.data.isProup
    });
  },
  aboutUs() {
    wx.navigateTo({ url: "../aboutOurs/aboutOurs" });
  },
  feedback() {
    wx.navigateTo({ url: "../feedback/feedback" });
  },
  helpCenter() {
    wx.navigateTo({ url: "../help/help" });
  },
  Mycollected() {
    if (wx.getStorageSync("sessionId")) {
      wx.navigateTo({ url: "../collection/collection" });
    } else {
      wx.navigateTo({ url: "../../login/login" });
    }
  },
  myTeam() {
    if (wx.getStorageSync("sessionId")) {
      wx.navigateTo({ url: "../team/team" });
    } else {
      wx.navigateTo({ url: "../../login/login" });
    }
  },
  init() {
    util
      ._get("account/getInfo?sessionId=" + wx.getStorageSync("sessionId"))
      .then(res => {
        if (res.code == 1) {
          wx.setStorageSync('info', res.data)
          this.setData({
            info: res.data
          });
        }
      });
  },
  raiseMoney() {
    util
      ._get("account/cash/raiseMoney?sessionId=" + wx.getStorageSync("sessionId"))
      .then(res => {
        if (res.code == 1) {
          wx.setStorageSync('money', res.data)
          this.setData({
            money: res.data
          });
        }
      });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      imgUrl: app.globalData.imgUrl
    })
    if (wx.getStorageSync("sessionId")) {

      this.init();
      this.raiseMoney()
    } else {
      this.setData({
        info:wx.getStorageSync('InfoObj')
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
});
