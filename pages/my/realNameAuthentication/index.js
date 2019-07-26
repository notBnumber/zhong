// pages/my/realNameAuthentication/index.js
import Dialog from "../../../vant/dialog/dialog";
const util = require("../../../utils/util.js");
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    realName: "",
    cardText: "",
    tempFileOne: "../../../images/sm501.png",
    tempFileSecond: "../../../images/sm502.png",
    one: false,
    two: false,
    oneImg: "",
    twoImg: ""
  },
  changeName(e) {
    this.setData({
      realName: e.detail.value
    });
  },
  changeCard(e) {
    this.setData({
      cardText: e.detail.value
    });
  },
  upImg(path, name, state) {
    let that = this;
    wx.showLoading({
      title: "上传图片中",
      mask: true
    });
    wx.uploadFile({
      url: app.globalData.baseUrl + "configure/saveImg", //仅为示例，非真实的接口地址
      filePath: path,
      name: "file",
      formData: {
        folderName: name
      },
      success(res) {
        const data = res.data;
        //do something
        console.log(JSON.parse(data));

        wx.hideLoading();
        if (state == 1) {
          that.setData({
            oneImg: JSON.parse(data).data.fileName
          });
        } else {
          that.setData({
            twoImg: JSON.parse(data).data.fileName
          });
        }
      }
    });
  },
  upLoader(e) {
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          tempFileOne: res.tempFilePaths,
          one: !that.data.one
        });
        console.log(res.tempFilePaths, 1);

        that.upImg(res.tempFilePaths[0], "card", 1);
      }
    });
  },

  topLoader(e) {
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        console.log(res);
        that.setData({
          tempFileSecond: res.tempFilePaths,
          two: !that.data.two
        });
        that.upImg(res.tempFilePaths[0], "card", 2);
      }
    });
  },
  tapNext(e) {
    console.log(this.data.realName);
    let that = this;
    if (this.data.realName == "") {
      wx.showToast({
        title: "请输入姓名",
        icon: "none",
        image: "",
        duration: 1500,
        mask: false
      });
      return false;
    }
    if (this.data.cardText == "") {
      wx.showToast({
        title: "请输入身份证号",
        icon: "none",
        image: "",
        duration: 1500,
        mask: false
      });
      return false;
    }
    // if (!/^\d{15}|\d{}18$ /.test(this.data.cardText)) {
    //   wx.showToast({
    //     title: "请输入正确的身份证号",
    //     icon: "none",
    //     image: "",
    //     duration: 1500,
    //     mask: false
    //   });

    //   return false;
    // }
    if (this.data.one == false) {
      wx.showToast({
        title: "请上传正面身份证",
        icon: "none"
      });
      return false;
    }
    if (this.data.two == false) {
      wx.showToast({
        title: "请上传反面身份证",
        icon: "none"
      });
      return false;
    }
    Dialog.confirm({
      title: "确定认证吗?",
      message: "(一旦认证,无法更改)"
    })
      .then(() => {
        that.submit();
        // on confirm
      })
      .catch(() => {
        // on cancel
      });
  },
  submit() {
    let params = {
      sessionId: wx.getStorageSync("sessionId"),
      name: this.data.realName,
      idNumber: this.data.cardText,
      img1: this.data.oneImg,
      img2: this.data.twoImg
    };
    util._get("bank/card/realNameRoutine", params).then(res => {
      if (res.code == 1) {
        wx.showToast({
          title: res.desc,
          icon: "success"
        });
        setTimeout(() => {
          wx.navigateTo({ url: "../myBankCard/index" });
        }, 1600);
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
