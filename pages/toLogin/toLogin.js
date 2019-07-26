const app = getApp();
const util = require("../../utils/util.js");

Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse("button.open-type.getUserInfo")
  },
  onLoad: function() {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function(res) {
        if (res.authSetting["scope.userInfo"]) {
          wx.getUserInfo({
            success: function(res) {
              //从数据库获取用户信息
              that.queryUsreInfo();
              //用户已经授权过
              wx.switchTab({
                url: "/pages/index/index"
              });
            }
          });
        }
      }
    });
  },
  bindGetUserInfo: function(e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      //插入登录的用户的相关信息到数据库
      // wx.request({
      //     url: app.globalData.urlPath + 'user/add',
      //     data: {
      //         openid: getApp().globalData.openid,
      //         nickName: e.detail.userInfo.nickName,
      //         avatarUrl: e.detail.userInfo.avatarUrl,
      //         province:e.detail.userInfo.province,
      //         city: e.detail.userInfo.city
      //     },
      //     header: {
      //         'content-type': 'application/json'
      //     },
      //     success: function (res) {
      //         //从数据库获取用户信息
      //         that.queryUsreInfo();
      //         console.log("插入小程序登录用户信息成功！");
      //     }
      // });
      //授权成功后，跳转进入小程序首页
      let InfoObj = {
        nick:e.detail.userInfo.nickName,
        avatar:e.detail.userInfo.avatarUrl
      }
      wx.setStorageSync('InfoObj', InfoObj)
      // wx.setStorageSync('nick', e.detail.userInfo.nickName)
      // wx.setStorageSync('avatarUrl', e.detail.userInfo.avatarUrl)
      wx.getLocation({
        type: "wgs84",
        success(res) {
          const latitude = res.latitude;
          const longitude = res.longitude;
          const speed = res.speed;
          const accuracy = res.accuracy;
          wx.setStorageSync("latitude", latitude);
          wx.setStorageSync("longitude", longitude);

          let params   = { 
            lat:wx.getStorageSync('latitude'),
            log:wx.getStorageSync('longitude')
          }
          util._get('newhome/checkCity',params).then(res=> {
            if(res.code == 1) {
              // this.setData({
              //   city:res.data.regeocode.addressComponent.city,
              //   cityId:res.data.regeocode.addressComponent.citycode
              // })
              wx.setStorageSync('city', res.data.regeocode.addressComponent.city)
              util._get('configure/getCity?cityName=+'+res.data.regeocode.addressComponent.city).then(res=> {
                if(res.code == 1) {
                  // this.setData({
                  //   city:res.data.regeocode.addressComponent.city,
                  //   cityId:res.data.regeocode.addressComponent.citycode
                  // })
                  wx.setStorageSync('cityId', res.data.id)
                  
                }
              })
            }
          })
          wx.switchTab({
            url: "/pages/index/index"
          });
          // wx.navigateTo({
          //   url: '/pages/login/login'
          // })
        },
        fail: function() {
          wx.showModal({
            title: "警告",
            content:
              "您点击了拒绝授权,将无法正常显示位置信息,点击确定重新获取位置。",
            success: function(res) {
              if (res.confirm) {
                //重点:从这里开始就是重新授权调取
                wx.openSetting({
                  success: res => {
                    console.log(res, "重新获取");
                    // return false
                    if (res.authSetting["scope.userLocation"]) {
                      //如果用户重新同意了授权登录scope.userLocation是表示位置授权 true/false
                      wx.getLocation({
                        type: "wgs84",
                        success(res) {
                          const latitude = res.latitude;
                          const longitude = res.longitude;
                          const speed = res.speed;
                          const accuracy = res.accuracy;
                          wx.setStorageSync("latitude", latitude);
                          wx.setStorageSync("longitude", longitude);
                          wx.switchTab({
                            url: "/pages/index/index"
                          });
                        }
                      });
                    }
                  },
                  fail: function(res) {}
                });
                //重点:调取结束
              }
            }
          });
        }
      });
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: "警告",
        content: "您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!",
        showCancel: false,
        confirmText: "返回授权",
        success: function(res) {
          if (res.confirm) {
            console.log("用户点击了“返回授权”");
          }
        }
      });
    }
  },
  //获取用户信息接口
  queryUsreInfo: function() {
    wx.request({
      url: app.globalData.urlPath + "user/userInfo",
      data: {
        openid: app.globalData.openid
      },
      header: {
        "content-type": "application/json"
      },
      success: function(res) {
        console.log(res.data);
        getApp().globalData.userInfo = res.data;
      }
    });
  }
});
