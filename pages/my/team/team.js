// pages/my/team/team.js
const util = require("../../../utils/util.js");
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isProup: false,
    num:true,
    caption:{},
    teams:{},
    imgUrl:null
  },
  goInvite(){
    this.setData({
      isProup: !this.data.isProup
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
    Promise.all([
      util._get("account/getTeam?sessionId=" + wx.getStorageSync("sessionId")),
      util._get("account/getTeam2?sessionId=" + wx.getStorageSync("sessionId")),
    ])
      .then(result => {
        this.setData({
          imgUrl: app.globalData.imgUrl,
          caption:result[0].data,
          teams:result[1].data
        });
      })
      .catch(e => {
        console.log(e);
      });
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