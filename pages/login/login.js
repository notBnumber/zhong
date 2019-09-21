// pages/login/login.js
const app = getApp();
const util = require("../../utils/util.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isChoose: false,
    phone: "",
    msg: "发送验证码",
    time: null,
    num: 60,
    code: null,
    Invitation: '',
    fun:'',
    isPhone:true
  },
  getPhone(e) {
    this.setData({
      phone: e.detail.value
    });
    // 18402022849
    util._post('account/selectMobile',{mobile:this.data.phone}).then(res=>{
      if(res.code == 1) {
        // this.setData({
        //   Invitation:res.data,
          
        // })
        if(res.data != '-1') {
          this.setData({
            Invitation:res.data,
            isPhone:true
          })
        } else {
          this.setData({
            isPhone:false,
            Invitation:''
          })
        }
      } 
    })
  },
  //
  changeCode(e) {
    this.setData({
      code: e.detail.value
    });
  },
  changeInvitation(e) {
    this.setData({
      Invitation: e.detail.value
    });
  },
  // 获取验证码
  getCode() {
    
    if (this.data.num == 60) {
      let params = {
        mobile: this.data.phone,
        type:1
      };
      let that = this;
      util
        ._get("account/code", params)
        .then(res => {
          console.log(res);
          if (res.code == 1) {
            let timer = setInterval(function name(params) {
              if (that.data.num < 1) {
                clearInterval(timer)
                that.setData({
                  msg: "发送验证码",
                  num: 60
                });
              } else {
                that.data.num--;

                that.setData({
                  msg: "重新发送" + that.data.num + "s",
                  num:that.data.num
                });
              }
            }, 1000);
            that.setData({
              time: timer,
              
            });
          }
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      wx.showToast({
        title: "请勿连续点击",
        icon: "none"
      });
    }
  },
  toLogin() {
    
    if(this.data.phone == '') {
      wx.showToast({
        title: "请输入手机号码",
        icon: "none"
      });
      return false
    }
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(this.data.phone)) {
      wx.showToast({
        title: "手机号有误！",
        icon: "none"
      });
      return false;
    }

    if(this.data.code == '') {
      wx.showToast({
        title: "请输入验证码",
        icon: "none"
      });
      return false
    }
    if(this.data.Invitation == '') {
      wx.showToast({
        title: "请输入邀请码",
        icon: "none"
      });
      return false
    }
    if(this.data.isChoose == false) {
      wx.showToast({
        title: "请先同意用户注册协议",
        icon: "none"
      });
      return false
    }
    let that = this;
    let params = {
      mobile: this.data.phone,
      code: this.data.code,
      invitedCode:this.data.Invitation
    };
    util._get("account/login", params).then(res => {
      console.log(res);
      
      if (res.code == 1) {
        wx.setStorageSync('sessionId', res.data.sessionId)
        wx.setStorageSync('mobile', res.data.mobile)

        
        wx.showToast({
          title: "登录成功",
          icon: "success"
        });
        setTimeout(() => {
          wx.switchTab({
            url: '/pages/index/index',
            success: (result)=>{
              
            },
            fail: ()=>{},
            complete: ()=>{}
          });
        }, 2000);
      }
    });
  },
  isCheck() {
    this.setData({
      isChoose: !this.data.isChoose
    });
  },
  pageTo({ currentTarget: { dataset } }) {
    console.log(dataset);
    wx.navigateTo({
      url: dataset.url
    });
  },
  pageToIndex({ currentTarget: { dataset } }) {
    wx.switchTab({
      url: dataset.url
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      msg:'发送验证码',
      phone:wx.getStorageSync('mobile')
    })
    if(wx.getStorageSync('mobile')) {
      util._post('account/selectMobile',{mobile:wx.getStorageSync('mobile')}).then(res=>{
        if(res.code == 1) {
          // this.setData({
          //   Invitation:res.data,
            
          // })
          if(res.data != '-1') {
            this.setData({
              Invitation:res.data,
              isPhone:true
            })
          } else {
            this.setData({
              isPhone:false,
              Invitation:''
            })
          }
        } 
      })
    } 
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    clearInterval(this.data.time);
    this.setData({
      time: null,
      msg: "发送验证码"
    });
  },

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
