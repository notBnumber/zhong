// pages/my/myinfo/index.js
const util = require("../../../utils/util.js");
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    headImg: "../../../images/tx04.png",
    info:{}
  },
  logout() {
    //点击退出登录
    wx.showModal({
      content: "确定退出登录吗?",
      success(res) {
        if (res.confirm) {
          console.log("用户点击确定");
          util
            ._get("account/logout?sessionId=" + wx.getStorageSync("sessionId"))
            .then(res => {
              wx.navigateTo({
                url: "/pages/login/login"
              });
              // wx.setStorageSync('sessionId', '')
              wx.removeStorageSync('sessionId')
            });
        } else if (res.cancel) {
          console.log("用户点击取消");
        }
      }
    });
  },
  chooseHead() {
    //上传头像
    var that = this;
    wx.chooseImage({
      count: 1,
      success(res) {
        // console.log(res);
        const img = res.tempFilePaths[0]
        wx.uploadFile({
          url: app.globalData.baseUrl + "account/modifyAvatar", //仅为示例，非真实的接口地址
          filePath: img,
          name: 'image',
          formData: {
            sessionId	: wx.getStorageSync('sessionId')
          },
          success (result){   
            util
            ._get("account/getInfo?sessionId=" + wx.getStorageSync("sessionId"))
            .then(res => {
              if (res.code == 1) {
                wx.setStorageSync('info', res.data)
                that.setData({
                  info: res.data
                });
              }
            });
            //do something
          }
        })
      }
    });
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
  pageTo({ currentTarget: { dataset } }) {
    // console.log(dataset);
    wx.navigateTo({
      url: dataset.url
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
    this.init()
    this.setData({
      imgUrl: app.globalData.imgUrl,
    })
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
