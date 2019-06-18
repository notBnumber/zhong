// pages/my/help/help.js
const util = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
   currentIndex:null,
   dataList:[
    //  { title: '问题沙发上', content: '发顺丰阿尔泰' },
    //  { title: '放散阀', content: '阿芳阿芳答案' },
    //  { title: '发斯蒂芬', content: '大萨达阿芳啊' },
    //  {title: '范德萨发',content:'发发生态为'},
   ]
  },
  solveTap(e){
    this.setData({
      currentIndex: e.currentTarget.dataset.index
    })
  },
  goFeedBack(){
    wx.navigateTo({ url: '../feedback/feedback' });
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
    util._get('help/center/page?sessionId='+wx.getStorageSync('sessionId')).then(res=>{
      if(res.code == 1) {
        this.setData({
          dataList:res.data
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