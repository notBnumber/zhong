// pages/my/changePhone/index.js
const util = require("../../../utils/util.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    phone: "",
    code: "",
    msg: "发送验证码",
    time: null,
    num: 60,
    phones: ""
  },
  choosePhone(e) {
    this.setData({
      phone: e.detail.value
    });
  },
  chooseCode(e) {
    this.setData({
      code: e.detail.value
    });
  },
  choosePhones(e) {
    this.setData({
      phones: e.detail.value
    });
  },
  submit() {
    let params = {
      sessionId: wx.getStorageSync("sessionId"),
      code: this.data.code,
      newMobile: this.data.phone
    };
    util._post("account/modifyMobile", params).then(res => {
      if (res.code == 1) {
        wx.showToast({
          title: "修改成功",
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
  send() {
    // 获取验证码

    if (this.data.num == 60) {
      let params = {
        mobile: this.data.phone,
        type: 2
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
                console.log(99999999999999999999999999);

                that.data.num--;

                that.setData({
                  msg: that.data.num + "s"
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
