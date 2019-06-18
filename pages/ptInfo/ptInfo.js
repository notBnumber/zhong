// pages/ptInfo/ptInfo.js
const util = require("../../utils/util.js");
const WxParse = require("../../wxParse/wxParse.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    info: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    util._post("notice/noticeDetail?id=" + options.id).then(res => {
      if (res.code == 1) {
        if (res.data.createTime != null) {
          res.data.createTime = res.data.createTime.split(" ")[0];
        }
        article_content:WxParse.wxParse('article_content', 'html', res.data.content, this, 5)
        this.setData({
          info: res.data
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

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
