// pages/my/addBankCard/index.js
const util = require("../../../utils/util.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bankName: "",
    bankNumber: "",
    realName: "",
    state: null
  },
  submit() {
    if(this.data.bankNumber == '') {
      wx.showToast({
        title: '请输入银行卡号',
        icon: 'none'
      })
      return false
    }
    if(this.data.bankName == '') {
      wx.showToast({
        title: '请输入开户银行',
        icon: 'none'
      })
      return false
    }
    let params = {
      sessionId:wx.getStorageSync('sessionId'),
      cardName:this.data.realName,
      bankNumber:this.data.bankNumber,
      openBank:this.data.bankName
    }
    util._get("bank/card/addBankCard",params).then(res => {
      if (res.code == 1) {
        wx.showToast({
          title: "添加成功",
          icon: "success",
          duration: 1500
        });
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          });
        }, 1500);
      }
    });
  },
  chooseNumber(e) {
    this.setData({
      bankNumber: e.detail.value
    });
  },
  chooseName(e) {
    this.setData({
      bankName: e.detail.value
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
    // 获取姓名
    util
      ._get("bank/card/getRealName?sessionId=" + wx.getStorageSync("sessionId"))
      .then(res => {
        if (res.code == 1) {
          this.setData({
            realName: res.data
          });
        }
      });
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
