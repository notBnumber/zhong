//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    list :[
    ]
  },
  toDetail(e) {
    let state = e.currentTarget.dataset.type
    let id = e.currentTarget.dataset.id
    console.log(state);
    
    if (state == 0 ) {
      // 平台
      wx.navigateTo({
        url: '../../pages/ptInfo/ptInfo?id='+id,
        success: (result)=>{
          
        },
        fail: ()=>{},
        complete: ()=>{}
      });
    } else if(state == 2){
      // 钱包
      // notice/noticeDetail
      wx.navigateTo({
        url: '../msg/msg?id='+id,
        success: (result)=>{
          
        },
        fail: ()=>{},
        complete: ()=>{}
      });
    }
  },
  onShow() {
    if(wx.getStorageSync('sessionId')) {
      util._get('notice/page?sessionId='+wx.getStorageSync('sessionId')).then(res=>{
        if(res.code == 1) {
          console.log(res);
          this.setData({
            list:res.data.list
          })
        }
      })
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      setTimeout(() => {
        wx.navigateTo({
          url: '/pages/login/login'
        })
      }, 1600);
    }
  },
  onLoad: function () {    
    // this.setData({
    //   logs: (wx.getStorageSync('logs') || []).map(log => {
    //     return util.formatTime(new Date(log))
    //   })
    // })

  }
})
