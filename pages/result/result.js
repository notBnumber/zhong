// pages/result/result.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    check:null,
    list:[
      {
        name:'新房'
      },
      {
        name:'二手房'
      },
      {
        name:'租房'
      }
    ],
    isSearch:false,
    lists:[
      '保利保利',
      '保利保利',
      '保利保利',
      '保利保利',
      '保利保利'

    ],
    isSelect :false,
    options:{},
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
    specialList:[
      {
        name:'其他',
        list:[
          {
            name:'不限',
            state:false
          },
          {
            name:'教育房产',
            state:false
          }
        ]
      },
      {
        name:'用途',
        list:[
          {
            name:'别墅',
            state:false
          },
          {
            name:'特价房',
            state:false
          }
        ]
      }
    ],
    // 其他左边
    specialIndex:0,
    // 其他右边
    specialIndexs:0,
    specialRight:[],
    specialName:null
,
quyuIndex:0,
quyuIndexs:0,
quyuRight:[],
// 选中的
quyuCheck:[

],
    quyuList:[
      {
        name:'其他',
        list:[
          {
            name:'不限',
            state:false,
            id:1
          },
          {
            name:'不限',
            state:false,
            id:2
          },
          {
            name:'不限',
            state:false,
            id:3
          },
          {
            name:'教育房产',
            state:false,
            id:4
          }
        ]
      },
      {
        name:'用途',
        list:[
          {
            name:'别墅',
            state:false,
            id:5
          },
          {
            name:'特价房',
            state:false,
            id:6
          }
        ]
      }
    ],
  },
  // 搜索
  search() {
    this.setData({
      isSearch:!this.data.isSearch
    })
  },
  // 清空
  del() {
    this.setData({
      lists:[]
    })
  },
  // 下拉
  selects() {
    if (this.data.options.state == 3) {
      this.setData({
        isSelect:!this.data.isSelect
      })
    } else {
      return
    }
  },
  // 选中下拉框
  checkSelect(e) {
    this.setData({
      isSelect:!this.data.isSelect,
      check:e.currentTarget.dataset.name
    })
    
  },
  filter(e) {
    let state = e.currentTarget.dataset.index
    this.setData({
      currentState:state
    })
    if (state == 1) {
      this.setData({
        show: !this.data.show
      });
      this.setData({
        openList: this.data.priceList
      });
    } else if (state == 2) {
      this.setData({
        show: !this.data.show
      });
      this.setData({
        openList: this.data.HouseList
      });
    }
    else if (state == 3) {
      this.setData({
        show: !this.data.show
      });
      this.setData({
        openList: this.data.mianjiList
      });
    } else if (state == 0) {
      // 其他
      this.setData({
        show: !this.data.show
      });
      this.setData({
        specialName:'其他'
      });
      this.checkSpecial(e)
    }
    else if (state == 4) {
      // 区域
      this.setData({
        show: !this.data.show,
        specialName:'意向区域'
      });
      this.checkQuyu(e,1)
    }
  },
    // 其他左边选项
    checkSpecial (e) {    
      console.log(e,'其他');
      
      let state = e.currentTarget.dataset.index == undefined?0:e.currentTarget.dataset.index
      this.setData({
        specialIndex:state,
        specialRight:this.data.specialList[state].list
      })
      console.log(this.data.specialRight);
      
    },
    // 其他右边选项
    checkRight(e) {
      let state = e.currentTarget.dataset.index
      console.log(this.data.specialRight[state].state);
      // this.setData({
      //   specialIndexs:state    
      // })
      this.data.specialRight[state].state = !this.data.specialRight[state].state
      this.setData({
        specialRight:this.data.specialRight
      })
    },
    onClose() {
      this.setData({
        show: !this.data.show
      });
    },
    check(e) {
      console.log(e.currentTarget.dataset.index);
      this.setData({
        show: !this.data.show
      });
    },
      // 区域左边
  checkQuyu(e,state) {
    console.log(e,state);
    let index = ''
    if (state != null) {
      console.log('初始化');
      
      // index = e.currentTarget.dataset.index
    this.setData({
      quyuIndex:0,
      quyuRight:this.data.quyuList[0].list
    })
    } else {
      console.log('左边');
      
      index = e.currentTarget.dataset.index
      this.setData({
        quyuIndex:index,
        // quyuRight:this.data.quyuList[index].list
      })
      console.log(this.data.quyuList[this.data.quyuIndex]);
      
    }
  },
  // 区域右边
  checkQuyuRight(e) {
    let state = e.currentTarget.dataset.index
    
    let arr = []
    this.data.quyuList[this.data.quyuIndex].list[state].state= !this.data.quyuList[this.data.quyuIndex].list[state].state
    for(let item of this.data.quyuList) {
      for(let items of item.list) {
        arr.push(items)
      }
    }
    this.setData({
      quyuList:this.data.quyuList,
      quyuCheck:arr
    })

  },
  // 区域删除
  del(e) {
    let state = e.currentTarget.dataset.index
    let id = e.currentTarget.dataset.id
    console.log(id);
    
    this.data.quyuCheck = this.data.quyuCheck.filter(
      (item, index, arr) => index!=state
    );
    for(let item of this.data.quyuList) {
      for(let y in item.list) {
        console.log(item.list[y].id,"?????");
        
        if(id == item.list[y].id){
          console.log(item.list[y]);
          
          item.list[y].state = false
          // item.list[y].splice(y,1)
        }
      }
    }
    console.log(this.data.quyuList);
    
    this.setData({
      quyuCheck:this.data.quyuCheck,
      quyuList:this.data.quyuList
    })
  },
  resetQuyu(e) {
    for(let item of this.data.quyuList) {
      for (let items of item.list ) {
        console.log(items);
        items.state = false
      }
    }
    console.log(this.data.quyuList);
    
    this.setData({
      quyuList:this.data.quyuList,
      quyuCheck:[]
    })
    this.checkQuyu(e,2)
  },
  btnQuyu() {
    this.setData({
      show:!this.data.show
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      options:options
    })
    console.log(options);
    
    if (options.state == 3) {
      this.setData({
        check:this.data.list[0].name
      })
    } else {
      this.setData({
        check:this.data.list[options.state].name
      })
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
  onShow: function () {

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