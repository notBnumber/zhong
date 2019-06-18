// pages/panInfo/panInfo.js
const util = require("../../utils/util.js");
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    typesList: [{
        name: "二手房"
      },
      {
        name: "租房"
      }
    ],
    stateList: [{
        name: "毛坯"
      },
      {
        name: "已装修"
      }
    ],
    numberList: [{
        name: "不限"
      },
      {
        name: "一室"
      },
      {
        name: "二室"
      },
      {
        name: "三室"
      },
      {
        name: "四室"
      },
      {
        name: "五室"
      },
      {
        name: "六室及以上"
      }
    ],
    typesIndex: 0,
    numberIndex: 0,
    state: 0,
    imgUrl: [

    ],
    name: '',
    phone: '',
    size: '',
    number: '',
    address: '',
    price: '',
    relationship: '',
    imgInfo:[]
  },
  chooseName(e) {
    this.setData({
      name: e.detail.value
    });
  },
  choosePhone(e) {
    this.setData({
      phone: e.detail.value
    });
  },
  chooseSize(e) {
    this.setData({
      size: e.detail.value
    });
  },
  chooseNumber(e) {
    this.setData({
      number: e.detail.value
    });
  },
  chooseAddress(e) {
    this.setData({
      address: e.detail.value
    });
  },
  choosePrice(e) {
    this.setData({
      price: e.detail.value
    })
  },
  chooseRelationship(e) {
    this.setData({
      relationship: e.detail.value
    })
  },
  // 提交
  submit() {
    // wx.navigateTo({
    //   url: '../panResult/panResult'
    // })
    let params = {
      sessionId: wx.getStorageSync('sessionId'),
      recommendedPerson: this.data.name,
      recommendedTele: this.data.phone,
      address: this.data.address,
      longitude: wx.getStorageSync('longitude'),
      latitude: wx.getStorageSync('latitude'),
      roomNumber: this.data.number,
      area: this.data.size,
      type: this.data.typesIndex,
      room: this.data.numberIndex,
      state: this.data.state,
      price: this.data.price,
      relation: this.data.relationship,
      img1: this.data.imgInfo[0] == undefined ? '' : this.data.imgInfo[0],
      img2: this.data.imgInfo[1] == undefined ? '' : this.data.imgInfo[1],
      img3: this.data.imgInfo[2] == undefined ? '' : this.data.imgInfo[2],
      img4: this.data.imgInfo[3] == undefined ? '' : this.data.imgInfo[3],
      img5: this.data.imgInfo[4] == undefined ? '' : this.data.imgInfo[4],
      
    }
    util._post('pushplate/submitSource', params).then(res => {
      if (res.code == 1) {
        console.log(1);

      }
    })
  },
  checkTypes(e) {
    console.log(e);

    this.setData({
      typesIndex: e.currentTarget.dataset.index
    });
  },
  checkNumber(e) {
    console.log(e);

    this.setData({
      numberIndex: e.currentTarget.dataset.index
    });
  },
  checkState(e) {
    console.log(e);

    this.setData({
      state: e.currentTarget.dataset.index
    });
  },
  chooseImg() {
    let that = this
    wx.chooseImage({
      count: 5 - that.data.imgUrl.length,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths, '图片数组');
        let arr = that.data.imgUrl.concat(tempFilePaths)
        that.setData({
          imgUrl: arr
        })
        for(let i in tempFilePaths) {
          wx.showLoading({
            title: '正在上传'+i+1+'张',
            mask: true
          });
          wx.uploadFile({
            url: app.globalData.baseUrl + "configure/saveImg", //仅为示例，非真实的接口地址
            filePath: tempFilePaths[i],
            name: "file",
            formData: {
              folderName: 'pushplate'
            },
            success(res) {
              //do something              
              wx.hideLoading();
              that.data.imgInfo.push(JSON.parse(res.data).data.fileName)
                that.setData({
                  imgInfo: that.data.imgInfo
                });
 
            }
          });
        }
      }
    })
  },
  del(e) {
    let index = e.currentTarget.dataset.index
    this.data.imgUrl.shift(index)
    this.data.imgInfo.shift(index)
    this.setData({
      imgInfo:this.data.imgInfo,
      imgUrl:this.data.imgUrl,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    util._get('configure/getRoomType').then(res => {
      if (res.code == 1) {
        this.setData({
          numberList: res.data
        })
      }
    })
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
  onShareAppMessage: function () {}
});