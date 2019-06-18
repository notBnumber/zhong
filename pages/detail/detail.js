// pages/detail/detail.js
const app = getApp()
const util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    params:{},
    imgUrl:'',
    imgUrls: [
      "https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640",
      "https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640",
      "https://images.unsplash.com/photo-1551446591-142875a901a1?w=640"
    ],
    isshoucang:false,
    info:{
      // name:'保利中心',
      // title:'房源副标题副标题副标题',
      // number:'80-100m²',
      // list:[
      //   {name:'普通1',state:0},
      //   {name:'普通2',state:1},
      //   {name:'普通3',state:2}
      // ],
      // Commission:'总价*0.8%',
      // money:'21000/平',
      // mianji:'70-90m²',
      // yongtu:'普通',
      // tese:'教育'
    },
    list:[],
    options:'',
    content :''
  },
  chooseContent(e) {
    this.setData({
      content:e.detail.value
    })
  },
  send(e) {
    if(this.data.content == '') {
      wx.showToast({
        title: '请输入评论内容',
        icon: 'none'
      })
    } else {
      let params = {
        sessionId:wx.getStorageSync('sessionId'),
        content:this.data.content,
        type:this.options.type,
        homeId:this.options.id
      }
      util._post('discuss/submitDiscuss',params).then(res=>{
        if (res.code == 1) {
          wx.showToast({
            title: '评论成功',
            icon: 'success'
          })
          this.setData({
            content:''
          })
          this.chooseContent(e)
          util._post("discuss/page?type="+this.data.options.type+'&homeId='+this.data.options.id+'&pageNumber=1&pageSize=999').then(res=>{
            if(res.code ==1) {
              this.setData({
                list:res.data.list
              })
            }
          })
        
  
  
        }
      })
    }
  },
  shoucang() {
    // this.setData({
    //   isshoucang:!this.data.isshoucang
    // })
    let params  = {
      sessionId:wx.getStorageSync('sessionId'),
      type:this.data.params.type,
      houseId:this.data.params.id
    }
    util._post('configure/collectionHome',params).then(res=>{
      if(res.code ==1) {
        // this.setData({
        //   isshoucang:!this.data.isshoucang
        // })

        util._post("newhome/getIsCollection?type="+this.data.params.type+'&homeId='+this.data.params.id+'&sessionId='+wx.getStorageSync('sessionId')).then(res=>{
          if(res.code ==1) {
            this.setData({
              isshoucang:res.data
            })
          }
        })
        if(this.data.isshoucang) {
          wx.showToast({
            title: '收藏成功',
            icon: 'success'
          })
        } else {
          wx.showToast({
            title: '取消收藏成功',
            icon: 'success'
          })
        }
      }
    })
  },
  getAddress() {
    let latitude  =    wx.getStorageSync('latitude')
    let longitude  = wx.getStorageSync('longitude')
    console.log(latitude,longitude);
    
    if(latitude == '' || longitude == '') {
      // wx.getLocation({
      //   type: 'wgs84',
      //   success(res) {
      //     const latitude = res.latitude
      //     const longitude = res.longitude
      //     const speed = res.speed
      //     const accuracy = res.accuracy
      //     wx.setStorageSync('latitude', latitude)
      //     wx.setStorageSync('longitude', longitude)

      //   }
      // })
      wx.openSetting({
        success: function (dataAu) {
          console.log(dataAu)
          if (dataAu.authSetting["scope.userLocation"] == true) {
            wx.showToast({
              title: '授权成功',
              icon: 'success',
              duration: 1000
            })
            //再次授权，调用getLocationt的API
            // that.getLocation(that);
            wx.getLocation({
              type: "wgs84",
              success(res) {
                const latitude = res.latitude;
                const longitude = res.longitude;
                const speed = res.speed;
                const accuracy = res.accuracy;
                wx.setStorageSync("latitude", latitude);
                wx.setStorageSync("longitude", longitude);
    
              }
            });
          } else {
            wx.showToast({
              title: '授权失败',
              icon: 'success',
              duration: 1000
            })
          }
        }
      })
    } else {
      wx.openLocation({
        latitude,
        longitude,
        scale: 18
      })
    }
    // let latitude  =    parseFloat (wx.getStorageSync('latitude'))
    // let longitude  = parseFloat (wx.getStorageSync('longitude'))
    
    
    
    // wx.getLocation({//获取当前经纬度
    //   type: 'wgs84', //返回可以用于wx.openLocation的经纬度，官方提示bug: iOS 6.3.30 type 参数不生效，只会返回 wgs84 类型的坐标信息
    //   success: function (res) {
    //     wx.openLocation({//​使用微信内置地图查看位置。
    //       latitude: 22.5542080000,//要去的纬度-地址
    //       longitude: 113.8878770000,//要去的经度-地址
    //       name: "宝安中心A地铁口",
    //       address:'宝安中心A地铁口'
    //     })
    //   }
    // })
  },
  //预览轮播图
  previewImg(e){
    wx.previewImage({
      current: e.currentTarget.dataset.url, // 当前显示图片的http链接
      urls: this.data.imgUrls // 需要预览的图片http链接列表
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      options:options
    })
    // let params = {
    //   type:options.type,
    //   homeId:options.id
    // }
    // util._post('newhome/houseDetail',params).then(res=> {
    //   if(res.code ==1) {
    //     if(res.data.tagName!=null) {
    //     res.data.tagArr = res.data.tagName.split(',')

    //     }
    //     this.setData({
    //       info:res.data
    //     })
    //   }
    // })
    if(wx.getStorageSync('sessionId')) {
      this.setData({
        params:options
      })
      Promise.all([
        util._post("newhome/houseDetail?type="+options.type+'&homeId='+options.id),
        util._post("newhome/getIsCollection?type="+options.type+'&homeId='+options.id+'&sessionId='+wx.getStorageSync('sessionId')),
        util._post("discuss/page?type="+options.type+'&homeId='+options.id+'&pageNumber=1&pageSize=999'),
      ])
        .then(result => {
          console.log(result);
          this.setData({
            info:result[0].data,
            isshoucang:result[1].data,
            list:result[2].data.list,
            imgUrl: app.globalData.imgUrl
          });
        })
        .catch(e => {
          console.log(e);
          this.setData({
            info:{},
  
          })
        });
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      setTimeout(() => {
        // wx({
        //   url: '/pages/login/login'
        // })
        wx.redirectTo({
          url: '/pages/login/login'
        })
      }, 1600);
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {

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
