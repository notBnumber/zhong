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
        value: "不限",
        id:''
      },
      
    ],
    typesIndex: null,
    numberIndex: null,
    state: null,
    imgUrl: [

    ],
    name: '',
    phone: '',
    size: '',
    number: '',
    address: '',
    price: '',
    prices: '',
    relationship: '',
    imgInfo:[],
    addressTip:'请选择地址',
    latitude:'',
    longitude:''
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
    // this.setData({
    //   address: e.detail.value
    // });
    let that = this
    wx.chooseLocation({
      success: (res)=>{
        console.log(res);
        that.setData({
          addressTip:res.address,
          latitude:res.latitude,
          longitude:res.longitude
        })
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },
  choosePrice(e) {
    this.setData({
      price: e.detail.value
    })
  },
  choosePrices(e) {
    this.setData({
      prices: e.detail.value
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
    if(this.data.name == '') {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      })
      return
    }
    if(this.data.phone == '') {
      wx.showToast({
        title: '请输入联系电话',
        icon: 'none'
      })
      return
    }
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(this.data.phone)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'none'
      })
      return false;
    }

    // if(this.data.addressTip == '请选择地址') {
    //   wx.showToast({
    //     title: '请选择地址',
    //     icon: 'none'
    //   })
    //   return
    // }
    // if(this.data.number == '') {
    //   wx.showToast({
    //     title: '请输入房号',
    //     icon: 'none'
    //   })
    //   return
    // }
    // if(this.data.size == '') {
    //   wx.showToast({
    //     title: '请输入盘源大小',
    //     icon: 'none'
    //   })
    //   return
    // }
    // if(this.data.price == '' && this.data.typesIndex == 0) {
    //   wx.showToast({
    //     title: '请输入目标价位',
    //     icon: 'none'
    //   })
    //   return
    // }
    // if(this.data.prices == '' && this.data.typesIndex == 1) {
    //   wx.showToast({
    //     title: '请输入目标价位',
    //     icon: 'none'
    //   })
    //   return
    // }
    if(this.data.relationship == '') {
      wx.showToast({
        title: '请输入与被推荐人关系',
        icon: 'none'
      })
      return
    }
    let price = ''
    if(this.data.typesIndex == 0) {
      price = this.data.price
    } else {
      price = this.data.prices
    }
    let params = {
      sessionId: wx.getStorageSync('sessionId'),
      recommendedPerson: this.data.name,
      recommendedTele: this.data.phone,
      address: this.data.addressTip,
      longitude: this.data.longitude,
      latitude: this.data.latitude,
      roomNumber: this.data.number,
      area: this.data.size,
      type: this.data.typesIndex == null?"":this.data.typesIndex,
      room: this.data.numberIndex == null?'':this.data.numberIndex,
      state: this.data.state == null?'':this.data.state,
      price: price,
      relation: this.data.relationship,
      img1: this.data.imgInfo[0] == undefined ? '' : this.data.imgInfo[0],
      img2: this.data.imgInfo[1] == undefined ? '' : this.data.imgInfo[1],
      img3: this.data.imgInfo[2] == undefined ? '' : this.data.imgInfo[2],
      img4: this.data.imgInfo[3] == undefined ? '' : this.data.imgInfo[3],
      img5: this.data.imgInfo[4] == undefined ? '' : this.data.imgInfo[4],
      style:1      
    }
    util._post('pushplate/submitSource', params).then(res => {
      if (res.code == 1) {
        console.log(1);
        // panResult

        wx.showToast({
          title: '提交成功',
          icon: 'success'
        })
        wx.redirectTo({
          url: "../panResult/panResult"
        });
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
              folderName: 'pushplate',
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
  onLoad: function (options) {
    util._get('configure/getRoomType').then(res => {
      if (res.code == 1) {
        this.setData({
          numberList: this.data.numberList.concat(res.data)
        })
      }
    })
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
  onShareAppMessage: function () {}
});