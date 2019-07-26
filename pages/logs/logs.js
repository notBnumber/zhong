//logs.js
const util = require('../../utils/util.js')
const WxParse = require('../../wxParse/wxParse.js');

Page({
  data: {
    logs: [],
    lists:[],
    list :[

    ],
    pageNumber:1,
    end:false
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
  init(num) {
    util._get('notice/page?sessionId='+wx.getStorageSync('sessionId')+'&pageNumber='+num+'&pageSize=20').then(res=>{
      if(res.code == 1) {
        console.log(res);
        // let   artilesA = res.data.list
        if(res.data.totalPage == num || res.data.totalPage == 0) {
          this.setData({
            end:true
          })
        } else {
          this.setData({
            end:false
          })
        }
        this.setData({
          list:this.data.list.concat(res.data.list)
        })
      }
    })
  },
  onShow() {
    this.setData({
      end:false,
      pageNumber:1,
      list:[]
    })
    if(wx.getStorageSync('sessionId')) {
      this.init(1)
    } else {

    }
  },
  onLoad: function () {    
    // this.setData({
    //   logs: (wx.getStorageSync('logs') || []).map(log => {
    //     return util.formatTime(new Date(log))
    //   })
    // })
      if(wx.getStorageSync('sessionId')) {

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
  onReachBottom: function() {
    console.log(this.data.end,'???????????????');
    
    if(!this.data.end)  {
      this.init(++this.data.pageNumber)
    }
  },
})
