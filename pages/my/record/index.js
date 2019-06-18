// pages/my/record/index.js
const app = getApp();
const util = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordList: []
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
      util._get("account/cash/getCash?sessionId="+wx.getStorageSync('sessionId')),
    ])
      .then(result => {
        // result[0].data[1].isPass = 1
        // result[0].data[2].isPass = 2
        for( let item of result[0].data) {
          item.createTime = item.createTime.split(' ')[0]
          item.number = item.card.bankNumber[0]+item.card.bankNumber[1]+item.card.bankNumber[2]+item.card.bankNumber[3]+'********'+item.card.bankNumber[item.card.bankNumber.length-4]+item.card.bankNumber[item.card.bankNumber.length-2]+item.card.bankNumber[item.card.bankNumber.length-2]+item.card.bankNumber[item.card.bankNumber.length-1]
        }

        this.setData({
          recordList:result[0].data
        });
      })
      .catch(e => {
        console.log(e);
        this.setData({
          recordList:[]
        })
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
