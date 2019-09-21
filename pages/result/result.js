// pages/result/result.js\
const util = require("../../utils/util.js");
var app =  getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    keyword: "",
    check: null,
    checkIndex: 0,
    list: [
      {
        name: "新房"
      },
      {
        name: "二手房"
      },
      {
        name: "租房"
      }
    ],
    isSearch: false,
    lists: [],
    isSelect: false,
    resultList:[],
    options: {},
    hotList: [
      {
        name: "保利中心",
        address: "100 m² / 广州市海珠区",
        list: [
          { name: "普通住宅1", state: 0 },
          { name: "普通住宅", state: 1 },
          { name: "普通住宅", state: 2 }
        ],
        price: "20.06 万元",
        img: "https://images.unsplash.com/photo-1551446591-142875a901a1?w=640",
        yongjin: "总价*0.8%"
      },
      {
        name: "保利中心",
        address: "100 m² / 广州市海珠区",
        list: [
          { name: "普通住宅", state: 0 },
          { name: "普通住宅e", state: 1 },
          { name: "普通住宅", state: 2 }
        ],
        price: "20.06 万元",
        img: "https://images.unsplash.com/photo-1551446591-142875a901a1?w=640",
        yongjin: "总价*0.8%"
      },
      {
        name: "保利中心",
        address: "100 m² / 广州市海珠区",
        list: [
          { name: "普通住宅" },
          { name: "普通住r宅" },
          { name: "普通住宅" }
        ],
        price: "20.06 万元",
        img: "https://images.unsplash.com/photo-1551446591-142875a901a1?w=640",
        yongjin: "总价*0.8%"
      }
    ],
    tabList: [
      { name: "其他" },
      { name: "价格" },
      { name: "房型" },
      { name: "面积" },
      { name: "区域" }
    ],
    openList: [],
    priceList: [
      {
        name: "价格",
        list: [
          { name: "不限" },
          { name: "5000元以下/平方" },
          { name: "5000-10000元/平方" },
          { name: "5000元以下/平方" }
        ]
      }
    ],
    HouseList: [
      {
        name: "房型",
        list: [
          { name: "不限" },
          { name: "一室" },
          { name: "二室" },
          { name: "三室" }
        ]
      }
    ],
    mianjiList: [
      {
        name: "面积",
        list: [
          { name: "不限" },
          { name: " 70m²以下" },
          { name: "70-90m²" },
          { name: "90-110m²" }
        ]
      }
    ],
    specialList: [
      {
        name: "其他",
        list: [
          {
            name: "不限",
            state: false
          },
          {
            name: "教育房产",
            state: false
          }
        ]
      },
      {
        name: "用途",
        list: [
          {
            name: "别墅",
            state: false
          },
          {
            name: "特价房",
            state: false
          }
        ]
      }
    ],
    // 其他左边
    specialIndex: 0,
    // 其他右边
    specialIndexs: 0,
    specialRight: [],
    specialName: null,
    quyuIndex: 0,
    quyuIndexs: 0,
    quyuRight: [],
    // 选中的
    quyuCheck: [],
    quyuList: [
      {
        name: "其他",
        list: [
          {
            name: "不限",
            state: false,
            id: 1
          },
          {
            name: "不限",
            state: false,
            id: 2
          },
          {
            name: "不限",
            state: false,
            id: 3
          },
          {
            name: "教育房产",
            state: false,
            id: 4
          }
        ]
      },
      {
        name: "用途",
        list: [
          {
            name: "别墅",
            state: false,
            id: 5
          },
          {
            name: "特价房",
            state: false,
            id: 6
          }
        ]
      }
    ]
  },
  hisSearch(e) {
    let arr = []
    wx.setStorageSync('keyword', e.currentTarget.dataset.item)
    // console.log(e.currentTarget.dataset.item);
    
    // if (this.data.checkIndex == 0) {
      util
        ._get("newhome/getNewHomePage?keyword=" + e.currentTarget.dataset.item+'&cityId='+wx.getStorageSync('cityId'))
        .then(res => {
          this.setData({
            // resultList: res.data.list,
            isSearch:true
          });
          arr= arr.concat(res.data.list)
          console.log(arr,'????????/');
          util
          ._get("secondhome/getSecondHome?keyword=" + e.currentTarget.dataset.item+'&cityId='+wx.getStorageSync('cityId'))
          .then(res => {
  
            this.setData({
              // resultList: res.data.list,
              isSearch:true
  
            });
            arr= arr.concat(res.data.list)
            console.log(arr,'?二手');
            
            if(this.data.keyword!='') {
              this.searchList()
            }
            util
            ._get("rentinghome/getRentingHome?keyword=" + e.currentTarget.dataset.item+'&cityId='+wx.getStorageSync('cityId'))
            .then(res => {
    
              this.setData({
                // resultList: res.data.list.keyword,
                isSearch:true
    
              });
              arr= arr.concat(res.data.list)
              console.log(arr,'?租房');
    
              if(this.data.keyword!='') {
                this.searchList()
              }
              if(arr.length == 0 ) {
              wx.showToast({
                title: '暂无数据',
                icon: 'none',
                image: '',
                duration: 1500,
                mask: false,
                success: (result)=>{
                  
                },
                fail: ()=>{},
                complete: ()=>{}
              });
              }
              this.setData({
                resultList:arr
              })
 
            });

          });
          if(this.data.keyword!='') {
            this.searchList()
          }

        });
    // } else if (this.data.checkIndex == 1) {

    // } else {

    // }
   
  },
  searchList() {
    console.log('缓存?');
    
    this.data.lists.push(this.data.keyword)
    wx.setStorageSync('searchList', this.data.lists)
  },
  // 搜索
  search() {
    this.setData({
      isSearch: true
    });
    
    if (this.data.checkIndex == 0) {
      util
        ._get("newhome/getNewHomePage?keyword=" + this.data.keyword+'&cityId='+wx.getStorageSync('cityId'))
        .then(res => {
          this.setData({
            resultList: res.data.list,
          });
          if(this.data.keyword!='') {
            this.searchList()
          }
          if(res.data.list.length == 0) {
            this.setData({
              resultList:[]
            })
            wx.showToast({
              title: '暂无数据',
              icon: 'none'
            })
          }
        });
    } else if (this.data.checkIndex == 1) {
      util
        ._get("secondhome/getSecondHome?keyword=" + this.data.keyword+'&cityId='+wx.getStorageSync('cityId'))
        .then(res => {

          this.setData({
            resultList: res.data.list,

          });
          if(this.data.keyword!='') {
            this.searchList()
          }

          if(res.data.list.length == 0) {
            this.setData({
              resultList:[]
            })
            wx.showToast({
              title: '暂无数据',
              icon: 'none'
            })
          }
        });
    } else {
      util
        ._get("rentinghome/getRentingHome?keyword=" + this.data.keyword+'&cityId='+wx.getStorageSync('cityId'))
        .then(res => {

          this.setData({
            resultList: res.data.list,

          });
          if(this.data.keyword!='') {
            this.searchList()
          }

          if(res.data.list.length == 0) {
            this.setData({
              resultList:[]
            })
            wx.showToast({
              title: '暂无数据',
              icon: 'none'
            })
          }
        });
    }
  },
  yes(e) {
    // wx.setStorageSync('keyword', this.data.keyword)

    app.globalData.indexParams = this.data.checkIndex
    setTimeout(() => {
      wx.navigateTo({
        url: '/pages/searchDetail/searchDetail?index='+this.data.checkIndex+'&name='+e.currentTarget.dataset.name,
        success: (result)=>{
          
        },
        fail: ()=>{},
        complete: ()=>{}
      });
    }, 1);
  },
  // 清空
  del() {
    this.setData({
      lists: []
    });
  },
  // 下拉
  selects() {
    if (this.data.options.state == 3) {
      this.setData({
        isSelect: !this.data.isSelect
      });
    } else {
      return;
    }
  },
  // 选中下拉框
  checkSelect(e) {
    this.setData({
      isSelect: !this.data.isSelect,
      check: e.currentTarget.dataset.name,
      checkIndex: e.currentTarget.dataset.index
    });
  },
  chooseName(e) {
    this.setData({
      keyword: e.detail.value
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if(wx.getStorageSync('searchList').length!=0) {
       this.data.lists =  wx.getStorageSync('searchList')
       this.data.lists = this.data.lists.filter(item=>{
         return item!=''
       })
    }
    this.setData({
      options: options,
      lists:this.data.lists
    });
    console.log(options);

    if (options.state == 3) {
      this.setData({
        check: this.data.list[0].name
      });
    } else {
      this.setData({
        check: this.data.list[options.state].name,
        checkIndex:options.state
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

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
