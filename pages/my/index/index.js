// pages/my/index/index.js
const util = require("../../../utils/util.js");
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    isProup: false,
    info: {avatar:null},
    money: {},
    code: '',
    head:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566146375809&di=aa7182817bd0e1d3d7fac1d30ee82a3c&imgtype=0&src=http%3A%2F%2Fe.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F4610b912c8fcc3cef70d70409845d688d53f20f7.jpg"
  },

  pageTo({
    currentTarget: {
      dataset
    }
  }) {
    // console.log(dataset);


    if (wx.getStorageSync("sessionId")) {
      wx.navigateTo({
        url: dataset.url
      });
    } else {
      wx.navigateTo({
        url: "../../login/login"
      });
    }
  },
  Invitation() {
    this.setData({
      isProup: !this.data.isProup
    });
  },
  aboutUs() {

    if (wx.getStorageSync('sessionId')) {
      wx.navigateTo({
        url: "../aboutOurs/aboutOurs"
      });

    } else {
      wx.navigateTo({
        url: "../../login/login"
      });

    }
  },
  feedback() {


    if (wx.getStorageSync('sessionId')) {
      wx.navigateTo({
        url: "../feedback/feedback"
      });

    } else {
      wx.navigateTo({
        url: "../../login/login"
      });

    }
  },
  helpCenter() {


    if (wx.getStorageSync('sessionId')) {
      wx.navigateTo({
        url: "../help/help"
      });

    } else {
      wx.navigateTo({
        url: "../../login/login"
      });

    }
  },
  Mycollected() {
    if (wx.getStorageSync("sessionId")) {
      wx.navigateTo({
        url: "../collection/collection"
      });
    } else {
      wx.navigateTo({
        url: "../../login/login"
      });
    }
  },
  myTeam() {
    if (wx.getStorageSync("sessionId")) {
      wx.navigateTo({
        url: "../team/team"
      });
    } else {
      wx.navigateTo({
        url: "../../login/login"
      });
    }
  },
  init() {
    util
      ._get("account/getInfo?sessionId=" + wx.getStorageSync("sessionId"))
      .then(res => {
        if (res.code == 1) {
          // wx.setStorageSync('info', res.data)
          console.log('用户信息', res.data);

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
  getCode() {
    util
      ._get("account/getqrCode?sessionId=" + wx.getStorageSync("sessionId"))
      .then(res => {
        if (res.code == 1) {
          // wx.setStorageSync('money', res.data)
          this.setData({
            code: res.data
          });
        }
      });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync('sessionId')) {
      this.setData({
        imgUrl: app.globalData.imgUrl
      })
      if (wx.getStorageSync("sessionId")) {

        this.init();
        this.raiseMoney()
        this.getCode()
      } else {
        this.setData({
          info: wx.getStorageSync('InfoObj')
        })
      }
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      setTimeout(() => {
        wx.navigateTo({
          url: '/pages/login/login'
        })
      }, 1600);
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {



  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '邀请二维码',
      imageUrl: this.data.imgUrl + this.data.code
    }
  }
});