// pages/my/changeName/index.js
const util = require("../../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nick:null
  },
  chooseNick(e) {
    this.setData({
      nick:e.detail.value
    })
  },
  submit(){
    let params = {
      sessionId:wx.getStorageSync('sessionId'),
      nick:this.data.nick
    }
    util._get('account/modifyNick',params).then(res=>{
      if(res.code == 1) {
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 1500
        })
        setTimeout(()=>{
          wx.navigateBack({
            delta: 1
          })
        },1500)
      }
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
