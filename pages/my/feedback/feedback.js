// pages/my/feedback/feedback.js
const util = require("../../../utils/util.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textarea: '',
    imgUrl:[],
    image:null,
    url:null,
    resultArr:[]
  },
  innerText(e){
    this.setData({
      textarea: e.detail.value
    })
  },
  submit(){
    // wx.switchTab({ url: '../index/index' });
    this.upFile()
  },
  chooseImg(e){
    let that = this
    wx.chooseImage({
      count: 3-that.data.imgUrl.length,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        let arr = that.data.imgUrl.concat(tempFilePaths)

        that.setData({
          imgUrl: arr
        })
      }
    })
  },
  // 上传图片
  upFile() {
    let that = this
    for(let i in this.data.imgUrl) {
      wx.showLoading({
        title: '正在上传'+i+1+'张',
        mask: true
      });
      var upTask = wx.uploadFile({
        url: that.data.url+'configure/saveImg',
        filePath: this.data.imgUrl[i],
        name: "file",
        formData: {
          folderName:'suggestions'
        },
        success: (result)=>{
          console.log(JSON.parse(result.data).data.fileName);
          
                    
          that.data.resultArr.push(JSON.parse(result.data).data.fileName)
            that.setData({
              resultArr:that.data.resultArr
            })
            if(that.data.resultArr.length == that.data.imgUrl.length) {
              wx.hideLoading();
              let params = {
                sessionId:wx.getStorageSync('sessionId'),
                content:that.data.textarea,
                image1:that.data.resultArr[0]!=undefined?that.data.resultArr[0]:'',
                image2:that.data.resultArr[1]!=undefined?that.data.resultArr[1]:'',
                image3:that.data.resultArr[2]!=undefined?that.data.resultArr[2]:''
              }
              util._post('suggestions/submitSuggestWei',params).then(res=>{
                console.log(res,'999');
                if(res.code==1) {
                  wx.showToast({
                    title: '提交成功',
                    icon: 'success',
                    duration: 2000,
                  })
                  setTimeout(() => {
                    wx.switchTab({
                      url: '/pages/my/index/index',
                      success: (result)=>{
                        
                      },
                      fail: ()=>{},
                      complete: ()=>{}
                    });
                  }, 2000);
                }
              }) 
            }
        },
        fail: ()=>{},
        complete: ()=>{}
      });
    }
  },
  del(e){
    const currentIndex = e.currentTarget.dataset.index;
    var currentIcon=this.data.imgUrl.splice(currentIndex, 1)
    var currentIcons=this.data.resultArr.splice(currentIndex, 1)

    this.setData({
      imgUrl:this.data.imgUrl,
      resultArr:this.data.resultArr
    })
  
  },
  preview(e){
    const index = e.currentTarget.dataset.index;
    wx.previewImage({
      current: this.data.imgUrl[index], // 当前显示图片的http链接
      urls: this.data.imgUrl // 需要预览的图片http链接列表
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
      image: app.globalData.imgUrl,
      url:app.globalData.baseUrl
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