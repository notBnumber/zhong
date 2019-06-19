// pages/my/commission/index.js
const util = require("../../../utils/util.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailsList: [''],
    isProup: false,
    height: app.globalData.height,
    info:{},
    list:[]
  },

  scroll(e){
    // console.log(e);
  },

  lower(e){
    // console.log(e);
    wx.showToast({
      title: '到底咯~',
      icon: 'none',
      duration: 1500
    })
  },
  Invitation(){
    this.setData({
      isProup: !this.data.isProup
    })
  },
  goback(){
    wx.navigateBack()
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
    util._get('account/cash/commissionPage?sessionId='+wx.getStorageSync('sessionId')).then(res=>{
      if(res.code == 1) {
        this.setData({
          info:wx.getStorageSync('money'),
          list:res.data
        })
      }
    })



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
