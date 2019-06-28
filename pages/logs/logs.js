//logs.js
const util = require('../../utils/util.js')
const WxParse = require('../../wxParse/wxParse.js');

Page({
  data: {
    logs: [],
    lists:[],
    list :[
      {
        title:'标题1',
        content:'<p>内容sss</p>'
      },      {
        title:'标题3',
        content:'<p>考虑考虑了</p>'
      },
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
      let that = this
      let arr = []
      util._get('notice/page?sessionId='+wx.getStorageSync('sessionId')).then(res=>{
        if(res.code == 1) {
          console.log(res);
          let   artilesA = res.data.list
          for(let i =0 ; i< artilesA.length ; i++){

            WxParse.wxParse('content'+i, 'html', artilesA[i]['content'], that, 5);
            // WxParse.wxParse('title'+i, 'html', artilesA[i]['content'], that, 5);

  
            if (i === artilesA.length - 1){
            
                    WxParse.wxParseTemArray('artileList', 'content', artilesA.length, that)
                    // WxParse.wxParseTemArray('artileList', 'title', artilesA.length, that)

                    // console.log( artileList);
                    // that.setData({})
   
            }
          } 
            console.log(artilesA);
            
          this.setData({
            list:artilesA
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
