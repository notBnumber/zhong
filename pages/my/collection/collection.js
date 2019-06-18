// pages/my/collection/collection.js
const util = require("../../../utils/util.js");
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:null,
    num:1,
    size:20,
    sellList: [
      // {
      //   name: "保利中心",
      //   address: "100 m² / 广州市海珠区",
      //   list: [
      //     { name: "普通住宅", state: 0 },
      //     { name: "普通住宅", state: 1 },
      //     { name: "优质学区", state: 2 }
      //   ],
      //   commisson:'总价*0.6%',
      //   price: "20.06 万元",
      //   img: "https://images.unsplash.com/photo-1551446591-142875a901a1?w=640"
      // },
      // {
      //   name: "保利中心",
      //   address: "100 m² / 广州市海珠区",
      //   list: [
      //     { name: "普通住宅", state: 0 },
      //     { name: "普通住宅", state: 1 },
      //     { name: "优质学区", state: 2 }
      //   ],
      //   commisson: '总价*0.8%',
      //   price: "20.06 万元",
      //   img: "https://images.unsplash.com/photo-1551446591-142875a901a1?w=640"
      // },
      // {
      //   name: "保利中心",
      //   address: "100 m² / 广州市海珠区",
      //   list: [
      //     { name: "普通住宅", state: 0 },
      //     { name: "普通住宅", state: 1 },
      //     { name: "优质学区", state: 2 }
      //   ],
      //   commisson: '总价*0.7%',
      //   price: "20.06 万元",
      //   img: "https://images.unsplash.com/photo-1551446591-142875a901a1?w=640"
      // }
    ]
  },
  goIndex(){
    wx.switchTab({ url: '../../index/index' });
  },
  toDetail(e) {
    console.log(e.currentTarget.dataset.type,e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '/pages/detail/detail?type='+e.currentTarget.dataset.type+'&id='+e.currentTarget.dataset.id
    })
  },
  init(num,size) {
    let params = {
      sessionId:wx.getStorageSync('sessionId'),
      pageNumber:num,
      pageSize:size
    }
    util._get('configure/collectionPage',params).then(res=> {
      if(res.code == 1) {
        console.log(res.data.newhome.list.length);
        this.data.sellList = this.data.sellList.concat(res.data.newhome.list).concat(res.data.secondhome.list).concat(res.data.rentinghome.list)

        for (let item of this.data.sellList) {
          if (item.tagName != null) {
            item.tagArr = item.tagName.split(",");
          }
        }
        console.log(this.data.sellList);
        this.setData({
          sellList:this.data.sellList
        })
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
    this.setData({
      imgUrl: app.globalData.imgUrl
    });
    this.init(this.data.num,this.data.size)
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
    this.init(1,20)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.init(++this.data.num,this.data.size)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})