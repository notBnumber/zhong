// pages/my/myBankCard/index.js
const app = getApp();
const util = require("../../../utils/util.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },
  init() {
    Promise.all([
      util._get(
        "bank/card/getBankCard?sessionId=" + wx.getStorageSync("sessionId")
      )
    ])
      .then(result => {
        // result[0].data[1].isPass = 1
        // result[0].data[2].isPass = 2
        for (let item of result[0].data) {
          item.number =
            item.bankNumber[item.bankNumber.length - 4] +
            item.bankNumber[item.bankNumber.length - 2] +
            item.bankNumber[item.bankNumber.length - 2] +
            item.bankNumber[item.bankNumber.length - 1];
        }
        console.log(result[0]);

        this.setData({
          list: result[0].data
        });
      })
      .catch(e => {
        console.log(e);
        this.setData({
          list: []
        });
      });
  },
  onClose(event) {
    let id = event.currentTarget.dataset.id;
    console.log(id,'删除id');
    
    let that = this
    const { position, instance } = event.detail;
    switch (position) {
      case "left":
      case "cell":
        instance.close();
        break;
      case "right":
        wx.showModal({
          content: "确定删除吗？",
          success(res) {
            if (res.confirm) {
              console.log("用户点击确定",that);
              that.del(id)
              instance.close();
            } else if (res.cancel) {
              console.log("用户点击取消");
              instance.close();
            }
          }
        });
        break;
    }
  },
  // 删除银行卡
  del(id) {
    console.log(id);
    
    let params = {
      id: id,
      sessionId: wx.getStorageSync("sessionId")
    };
    util._get("bank/card/deleteBankCard",params).then(res => {
      if (res.code == 1) {
        wx.showToast({
          title: res.desc,
          icon: 'success'
        })
        this.init()
      }
    });
  },
  pageTo({ currentTarget: { dataset } }) {
    // console.log(dataset);
    util._get('account/cash/judgeBank?sessionId='+wx.getStorageSync('sessionId')).then(res=>{
      if(res.code == 1) {
        wx.navigateTo({ url: "../addBankCard/index" });

      } else {
            wx.navigateTo({
      url: dataset.url
    });
      }
    })
    // wx.navigateTo({
    //   url: dataset.url
    // });
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
