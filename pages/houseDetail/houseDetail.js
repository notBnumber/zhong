// pages/houseDetail/houseDetail.js
const app = getApp();
const util = require("../../utils/util.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    city:'',
    checkNum: null,
    checkPrice: '',
    checkMianji: '',
    checkFangxing: '',
    selectName: null,
    num: 1,
    optionState: null,
    currentState: null,
    autoplay: true,
    interval: 5000,
    current: null,
    show: false,
    imgUrl: null,
    imgUrls: [
      "https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640",
      "https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640",
      "https://images.unsplash.com/photo-1551446591-142875a901a1?w=640"
    ],
    tabList: [
      { name: "区域" },
      { name: "价格" },
      { name: "房型" },
      { name: "面积" },
      { name: "其他" }
    ],
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
        zu: "1000 元/月",
        img: "https://images.unsplash.com/photo-1551446591-142875a901a1?w=640",
        yongjin: "总价*0.8%",
        mianji: "21000/平"
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
        yongjin: "总价*0.8%",
        mianji: "21000/平",
        zu: "1000 元/月"
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
        yongjin: "总价*0.8%",
        mianji: "21000/平",
        zu: "1000 元/月"
      }
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
        id: 0,
        value: "不限"
      },
      {
        id: 1,
        value: "一室"
      },
      {
        id: 2,
        value: "一室"
      },
      {
        id: 3,
        value: "一室"
      },
      {
        id: 4,
        value: "四室"
      },
      {
        id: 5,
        value: "五室"
      },
      {
        id: 6,
        value: "六室"
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
        name: "不限",
        list: [

        ]
      },
      {
        name: "用途",
        list: [
          
        ]
      },
      {
        name: "特色",
        list: [
          
        ]
      }
    ],
    // 其他左边
    specialIndex: 0,
    // 其他右边
    specialIndexs: 0,
    specialRight: [],
    // 区Id
    quId: "",
    // 区域id字符串
    quyuIds: '',
    idArr:[],
    nameArr:[],
    // 其他用途id字符串
    specialIds: "",
    // 其他特色id字符串
    specialIdsOther: "",
    specialName: null,
    quyuIndex: 0,
    quyuIndexs: 0,
    quyuRight: [],
    // 选中的
    quyuCheck: [],
    big:[],
    quyuList: [
      {
        name: "用途",
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
        name: "其他",
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
  // 确定筛选条件
  screen() {
    let optionState = this.data.optionState
    if (optionState == 0) {
      let params = {
        pageNumber: 1,
        pageSize: 20,
        cityId: wx.getStorageSync("cityId"),
        stateId: this.data.quId,
        countyId: this.data.quyuIds,
        budgetId: this.data.checkPrice,
        areaId: this.data.checkMianji,
        useId: this.data.specialIds,
        characteristicId: this.data.specialIdsOther
      };
      util._post("newhome/getNewHomePage", params).then(res => {
        if (res.code == 1) {
          for (let item of res.data.list) {
            if (item.tagName != null) {
              item.tagArr = item.tagName.split(",");
            }
          }

          this.setData({
            hotList: res.data.list
          });
          if(res.data.list.length == 0) {
            wx.showToast({
              title: '暂无数据',
              icon: 'none'
            })
          }
        }
      });
    } else if(optionState == 1){
      let params = {
        pageNumber: 1,
        pageSize: 20,
        cityId: wx.getStorageSync("cityId"),
        stateId: this.data.quId,
        countyId: this.data.quyuIds,
        budgetId: this.data.checkPrice,
        areaId: this.data.checkMianji,
        useId: this.data.specialIds,
        characteristicId: this.data.specialIdsOther,
        roomId:this.data.checkFangxing
      };
      util._post("secondhome/getSecondHome", params).then(res => {
        if (res.code == 1) {
          for (let item of res.data.list) {
            if (item.tagName != null) {
              item.tagArr = item.tagName.split(",");
            }
          }
          this.setData({
            hotList: res.data.list
          });
          if(res.data.listlength == 0) {
            wx.showToast({
              title: '暂无数据',
              icon: 'none'
            })
          }
        }
      });
    } else {
      let params = {
        pageNumber: 1,
        pageSize: 20,
        cityId: wx.getStorageSync("cityId"),
        stateId: this.data.quId,
        countyId: this.data.quyuIds,
        budgetId: this.data.checkPrice,
        areaId: this.data.checkMianji,
        useId: this.data.specialIds,
        characteristicId: this.data.specialIdsOther,
        roomId:this.data.checkFangxing
      };
      util._post("rentinghome/getRentingHome", params).then(res => {
        if (res.code == 1) {
          for (let item of res.data.list) {
            if (item.tagName != null) {
              item.tagArr = item.tagName.split(",");
            }
          }
          this.setData({
            hotList: res.data.list
          });
        }
      });
    }
  },
  toReault(e) {
    // wx.navigateTo({
    //   url: "../result/result?state=" + e.currentTarget.dataset.state
    // });
  },
  // 房屋详情
  toDetail(e) {
    console.log(e.currentTarget.dataset);

    wx.navigateTo({
      url:
        "../detail/detail?id=" +
        e.currentTarget.dataset.id +
        "&type=" +
        e.currentTarget.dataset.type
    });
  },
  //预览轮播图
  previewImg(e) {
    console.log(e.currentTarget.dataset.type);

    if(!e.currentTarget.dataset.type) {
      wx.navigateTo({
        url: "/pages/banner/banner?url=" + e.currentTarget.dataset.url
      });
    } else {
      wx.navigateTo({
        url:
          "../detail/detail?id=" +
          e.currentTarget.dataset.url +
          "&type=" +
          e.currentTarget.dataset.hometype
      });
    }
  },
  // 区域左边
  checkQuyu(e, state) {
    console.log(e, state);
    let arrs = [{lng	:	'',
		
    name	:	'不限',
        
    leveltype	:	'',
        
    id	:	'',
        
    keyword	:	'',
        
    parentid	:	'1',
        
    lat	:	''
    }]
    // index = e.currentTarget.dataset.index

    let index = "";
    if (state != null) {
      this.setData({
        quyuCheck: []
      });
      let fuckId = "";
      if (
        wx.getStorageSync("cityIds") != "" &&
        wx.getStorageSync("citys") != ""
      ) {
        fuckId = wx.getStorageSync("cityIds");
      } else {
        fuckId = wx.getStorageSync("cityId");
      }
      console.log("初始化",this.data.quyuList);

      util._get("configure/getAllArea?areaId=" + fuckId).then(res => {
        if (res.code == 1) {
          let baseArr = [{lng: "", name: "不限", leveltype: '', id: '', keyword: "", parentid: '', lat: ""}]
          console.log(res.data);
          
          this.setData({
            quyuIndex: 0,
            quyuList: baseArr.concat(res.data)
          });
          // util
          //   ._get("configure/getAllArea?areaId=")
          //   .then(res => {
          //     if (res.code == 1) {
          //       // for (let item of this.data.quyuRight) {
          //       //   item.state = false;
          //       // }
          //       this.data.quyuList[0].list =arrs.concat(res.data)
          //       this.setData({
          //         quyuIndex: 0,
          //         quyuList: this.data.quyuList,
          //         quId: this.data.quyuList[0].id
          //       });
          //     }
          //   });
        }
      });

      // index = e.currentTarget.dataset.index
    } else {
      console.log("左边",e.currentTarget.dataset.index);

      let id = e.currentTarget.dataset.id;
      let index = e.currentTarget.dataset.index;

      if(index!=0) {
        util._get("configure/getAllArea?areaId=" + id).then(res => {
          if (res.code == 1) {
            // for (let item of this.data.quyuRight) {
            //   item.state = false;
            // }
            arrs[0].id = id
            console.log(arrs,id);
            
            this.data.quyuList[index].list = arrs.concat(res.data)
            for(let i in this.data.quyuCheck) {
              if(this.data.quyuList[index].list) {
                for(let y in this.data.quyuList[index].list) {
                  if(this.data.quyuList[index].list[y].id == this.data.quyuCheck[i].id) {
                    this.data.quyuList[index].list[y].state = true
                    console.log(this.data.quyuList[index].list[y]);
                    
                  }
                }
              }
            }
            this.setData({
              quyuIndex: index,
              quyuList: this.data.quyuList
            });
          }
        });
        console.log(this.data.quyuList[this.data.quyuIndex]); 
      } else {
        console.log(1);
        
        this.data.quyuList[0].list = []
        this.setData({
          quyuIndex: index,

          quyuList:this.data.quyuList,
          quyuCheck:[]
        })
      }
    }
  },
  // 区域右边
  checkQuyuRight(e) {

    console.log(e.currentTarget.dataset.type);
    
    let index = e.currentTarget.dataset.index;
    let id = e.currentTarget.dataset.id;
    let name = e.currentTarget.dataset.name;
    let idArr = this.data.idArr;
    let nameArr = this.data.nameArr;

    let quyuIndex = this.data.quyuIndex;
    for(let i in this.data.quyuCheck) {
      if(this.data.quyuCheck[i].id == id) {
        this.data.quyuList[quyuIndex].list[index].state = true
      }
    }
    // 非不限
    if(!this.data.quyuList[quyuIndex].list[0].state) {
      if(index!=0) {
          // 非不限
        this.data.quyuList[quyuIndex].list[index].state = !this.data.quyuList[quyuIndex].list[index].state;
        this.setData({
          quyuList:this.data.quyuList
        })
        if(idArr.some(item=>item == id)) {
          let str = idArr.indexOf(id)
          // this.data.quyuCheck.splice(index,1)  //剔除
          for(let i in this.data.quyuCheck) {
            if(this.data.quyuCheck[i].name == name&& this.data.quyuCheck[i].id == id) {
              this.data.quyuCheck.splice(i,1)
            }
          }
          idArr.splice(str,1)
          nameArr.splice(str,1)
        } else {
          this.data.quyuCheck.push({name:name,id:id,state:true}) //加
          idArr.push(id)
          nameArr.push({name:name,id:id,state:true})
        }
          this.setData({
            quyuCheck:this.data.quyuCheck,
            idArr: idArr,
            nameArr: nameArr
          })
      }else {
        // 右边不限选项
        // this.data.quyuList[quyuIndex].list[index].state = !this.data.quyuList[
        //   quyuIndex
        // ].list[index].state;



        // this.data.quyuList[quyuIndex].list[index].type = quyuIndex
        // for(let item of this.data.quyuList[quyuIndex].list) {
        //   item.state = false
        // }
        this.data.quyuList[quyuIndex].list[0].state = !this.data.quyuList[quyuIndex].list[0].state
        this.data.quyuList[quyuIndex].state = true

        this.setData({
          quyuList:this.data.quyuList
        })
        
        // let arr = []
        //   console.log(arr);
          let obj = {
            name:this.data.quyuList[quyuIndex].name,id:this.data.quyuList[quyuIndex].id ,state:true    ,type:this.data.quyuIndex}
            console.log(obj,'不限选项');
            this.data.quyuCheck.push(obj)
          this.setData({
            quyuCheck:this.data.quyuCheck
          })
      }
    } else {
      if(index == 0) {
        this.data.quyuList[quyuIndex].list[0].state  = !this.data.quyuList[quyuIndex].list[0].state
      } 
      // for(let i in this.data.quyuList) {
      //   if(type == this.data.quyuList[i].type) {
      //     this.data.quyuList.splice(i,1)
      //   }
      // }
    let type = e.currentTarget.dataset.type;

      console.log(type,'删除type');
      
      for(let i in this.data.quyuCheck) {
        // if(item.list) {
        //   for(let i in item.list) {
        //     if(type == item.list[i].type) {
        //       this.data.quyuCheck.splice(i,1)
        //     }
        //   }
        // }
        if(id == this.data.quyuCheck[i].id) {
          this.data.quyuCheck.splice(i,1)
        }
      }
      this.setData({
        quyuList:this.data.quyuList,
        quyuCheck:this.data.quyuCheck
      })
    }
  },
  // 区域删除
  del(e) {
    let index = e.currentTarget.dataset.index;
    let id = e.currentTarget.dataset.id;
    console.log('typesssss',id);

    for(let item of this.data.quyuList) {
      if(item.list) {
        for(let i in item.list) {
          if(id == item.list[i].id) {
            item.list[i].state = false
          }
        }
      }
    } 
    for(let i in this.data.quyuCheck ){
      if(this.data.quyuCheck[i].id == id) {
        this.data.quyuCheck.splice(i,1)
        // console.log(this.data.quyuCheck[i]);
        
      }
    }
    console.log(this.data.quyuList);

    this.setData({
      quyuCheck: this.data.quyuCheck,
      quyuList: this.data.quyuList
    });
  },
  resetQuyu(e) {
    for (let item of this.data.quyuList) {
      // if(item.list) {
      //   for (let items of item.list) {
      //     console.log(items);
      //     items.state = false;
      //   }
      // }
    }
    console.log(this.data.quyuList);

    this.setData({
      quyuList: this.data.quyuList,
      quyuCheck: [],
      quyuIds:''
    });
    this.checkQuyu(e, 2);
  },
  btnQuyu() {
    let arrs = [];
    this.data.quyuCheck.filter((item) => {
      // if (item.state) {
        arrs.push(item.id);
      // }
    });
    let quId = []
    for(let item of this.data.quyuCheck) {
      for(let items of this.data.quyuList) {
        if(items.id == item.id) {
          quId.push(item.id)
        }
      }
    }
    if(arrs.length!=0  && quId.length!=0) {
      for(let i in arrs) {
        for(let y in quId) {
          if(quId[y].id == arrs[i].id) {
            arrs.splice(i,1)
          }
        }
      }
    }
    // let bigArr  = []
    // this.data.quyuList.filter((item, index, arr) => {
    //   if (item.state) {
    //     bigArr.push(item.id);
    //   }
    // });
    
    // // if(arrs.length!=0) {
    //   bigArr = bigArr.concat(arrs)
    // // } 
    // bigArr = bigArr.filter(item=>{
    //   return item!=''
    // })
    // console.log(bigArr,'//////////');
    this.setData({
      quyuIds: arrs.toString(),
      quId:quId.toString(),
      show: !this.data.show
    });
    this.screen()
  },
  // 其他左边选项
  checkSpecial(e) {
    console.log(e, "其他");

    let state =
      e.currentTarget.dataset.index == undefined
        ? 0
        : e.currentTarget.dataset.index;
    console.log(this.data.specialList[state],typeof(state));
    let str = state -1
    util._get("configure/getType?type=" + (state-1)).then(res => {
      let arr = [{name:'不限',id:'',type:true}]
      // return
      arr = arr.concat(res.data)
      console.log(arr);
      // return
      this.data.specialList[state].list = arr
      this.setData({
        specialIndex: state,
        specialList: this.data.specialList,
        specialIndex:state,
        quId:state ==0?'':this.data.quId
      });
    });
    console.log(this.data.specialRight);
  },
  // 其他右边选项
  checkRight(e) {
    let state = e.currentTarget.dataset.index;
    let id = e.currentTarget.dataset.id;
    let specialIndex = this.data.specialIndex
    console.log(id);
    // this.setData({
    //   specialIndexs:state
    // })
    let arr = [];
    this.data.specialList[specialIndex].list[state].state = !this.data.specialList[specialIndex].list[state].state
    if (this.data.specialIndex == 0) {
      this.data.specialList[specialIndex].list.filter(item => {
        if (item.state) {
          arr.push(item.id);
        }
      });
      console.log(arr,'其他已');

      this.setData({
        specialList: this.data.specialList,
        specialIds: arr.toString()
      });
    } else {

      this.data.specialList[specialIndex].list.filter(item => {
        if (item.state) {
          arr.push(item.id);
        }
      });
      console.log(this.data.specialList);
      console.log(arr);
      

      this.setData({
        specialList: this.data.specialList,
        specialIdsOther: arr.toString()
      });
    }
  },
  swiperChange(e) {
    // console.log(e.detail.current);
    this.setData({
      current: e.detail.current
    });
  },
  reset(e) {
    for (let item of this.data.specialList) {
      for (let items of item.list) {
        console.log(items);
        items.state = false;
      }
    }
    console.log(this.data.specialList);

    this.setData({
      specialList: this.data.specialList,
      specialIds:'',
      specialIdsOther:''
    });
    this.checkSpecial(e);
  },
  btn() {
    this.setData({
      show: !this.data.show,
    });
    this.screen()
  },
  filter(e) {
    let state = e.currentTarget.dataset.index;
    console.log(state, "下标");

    this.setData({
      checkNum: state
    });
    this.setData({
      currentState: state
    });
    if (state == 1) {
      this.setData({
        show: !this.data.show
      });
      this.setData({
        openList: this.data.priceList,
        selectName: "价格"
      });
    } else if (state == 2) {
      this.setData({
        show: !this.data.show
      });
      this.setData({
        openList: this.data.HouseList,
        selectName: "房型"
      });
    } else if (state == 3) {
      this.setData({
        show: !this.data.show
      });
      this.setData({
        openList: this.data.mianjiList,
        selectName: "面积"
      });
    } else if (state == 4) {
      // 其他
      this.setData({
        show: !this.data.show
      });
      this.setData({
        specialName: "其他"
      });
      // this.checkSpecial(e)
      // util._get("configure/getType?type=0").then(res => {
      //   let arr = [{name:'不限',id:'',type:true}]
      //   this.data.specialList[0].list = arr.concat(res.data)
      //   this.setData({
      //     specialList: this.data.specialList,
      //     specialIndex:0
      //   });
      // });
      util._get("configure/getType?type=1").then(res => {
        let arr = [{name:'不限',id:'',type:true}]

        this.data.specialList[1].list = arr.concat(res.data)
        this.setData({
          specialList: this.data.specialList,
          specialIndex:0
        });
      });
    } else if (state == 0) {
      // 区域

      this.setData({
        quyuCheck: [],
        show: !this.data.show,
        specialName: "意向区域"
      });
      this.checkQuyu(e, 1);

    }
  },
  check(e) {
    console.log(e.currentTarget.dataset.id);
    if (this.data.checkNum == 1) {
      this.setData({
        show: !this.data.show,
        checkPrice: e.currentTarget.dataset.id
      });
    } else if (this.data.checkNum == 2) {
      this.setData({
        show: !this.data.show,
        checkFangxing: e.currentTarget.dataset.id
      });
    } else {
      this.setData({
        show: !this.data.show,
        checkMianji: e.currentTarget.dataset.id
      });
    }
    this.screen()
  },
  onClose() {
    this.setData({
      show: !this.data.show
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    // this.data.tabList.splice(2, 0, { name: "房型" });
    this.setData({
      optionState: options.index
    });

    if (options.index == 0) {
      wx.setNavigationBarTitle({
        title: "新房"
      });
    } else if (options.index == 1) {
      wx.setNavigationBarTitle({
        title: "二手房"
      });
    } else if (options.index == 2) {
      wx.setNavigationBarTitle({
        title: "租房"
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
  onShow: function() {
    this.setData({
      city:wx.getStorageSync('city')
    })
    if (this.data.optionState == 0) {
      Promise.all([
        util._get("newhome/getNewHomeImage"),
        util._get("newhome/getNewHomePage?keyword="+'&cityId='+wx.getStorageSync('cityId')),
        util._get("configure/getbudget?type=0"),
        util._get("configure/getArea?type=0")
      ])
        .then(result => {
          console.log(result);
          for (let item of result[1].data.list) {
            if (item.tagName != null) {
              item.tagArr = item.tagName.split(",");
            }
          }
          if(result[1].data.list.length == 0) {
            wx.showToast({
              title: '暂无数据',
              icon: 'none'
            })
          }
          let mianji = [
            {value:'不限',id:''}
          ]
          let price = [
            {value:'不限',id:''}
          ]
          this.setData({
            imgUrl: app.globalData.imgUrl,
            imgUrls: result[0].data,
            hotList: result[1].data.list,
            priceList: price.concat(result[2].data),
            mianjiList: mianji.concat(result[3].data)
          });
        })
        .catch(e => {
          console.log(e);
          this.setData({
            hotList: []
          });
        });
    } else if (this.data.optionState == 1) {
      Promise.all([
        util._get("secondhome/getSecondHomeImage"),
        util._get("secondhome/getSecondHome?keyword="+'&cityId='+wx.getStorageSync('cityId')),
        util._get("configure/getbudget?type=1"),
        util._get("configure/getArea?type=1"),
        util._get("configure/getRoomType")
      ])
        .then(result => {
          console.log(result);
          for (let item of result[1].data.list) {
            if (item.tagName != null) {
              item.tagArr = item.tagName.split(",");
            }
          }
          if(result[1].data.list.length == 0) {
            wx.showToast({
              title: '暂无数据',
              icon: 'none'
            })
          }
          let mianji = [
            {value:'不限',id:''}
          ]
          let price = [
            {value:'不限',id:''}
          ]
          let house = [
            {value:'不限',id:''}
          ]
          this.setData({
            imgUrl: app.globalData.imgUrl,
            imgUrls: result[0].data,
            hotList: result[1].data.list,
            priceList: price.concat(result[2].data),
            mianjiList: mianji.concat(result[3].data),
            HouseList: house.concat(result[4].data)
          });
        })
        .catch(e => {
          console.log(e);
          this.setData({
            hotList: []
          });
        });
    } else {
      Promise.all([
        util._get("rentinghome/getRentingHomeImage"),
        util._get("rentinghome/getRentingHome?keyword="+'&cityId='+wx.getStorageSync('cityId')),
        util._get("configure/getbudget?type=2"),
        util._get("configure/getArea?type=2"),
        util._get("configure/getRoomType")
      ])
        .then(result => {
          console.log(result);
          for (let item of result[1].data.list) {
            if (item.tagName != null) {
              item.tagArr = item.tagName.split(",");
            }
          }
          if(result[1].data.list.length == 0) {
            wx.showToast({
              title: '暂无数据',
              icon: 'none'
            })
          }
          let mianji = [
            {value:'不限',id:''}
          ]
          let price = [
            {value:'不限',id:''}
          ]
          let house = [
            {value:'不限',id:''}
          ]
          this.setData({
            imgUrl: app.globalData.imgUrl,
            imgUrls: result[0].data,
            hotList: result[1].data.list,
            priceList: price.concat(result[2].data),
            mianjiList: mianji.concat(result[3].data),
            HouseList: house.concat(result[4].data)
          });
        })
        
        .catch(e => {
          console.log(e);
          this.setData({
            hotList: []
          });
        });
    }
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    // wx.setStorageSync("keyword", "");

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    // wx.setStorageSync("keyword", "");

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    console.log(this.data.optionState);

    if (this.data.optionState == 0) {
      // 显示顶部刷新图标
      wx.showNavigationBarLoading();
      // wx.request({
      //   url: 'https://xxx/?page=0',
      //   method: "GET",
      //   header: {
      //     'content-type': 'application/text'
      //   },
      //   success: function (res) {
      //     that.setData({
      //       moment: res.data.data
      //     });
      //     console.log(that.data.moment);
      //     // 隐藏导航栏加载框
      //     wx.hideNavigationBarLoading();
      //     // 停止下拉动作
      //     wx.stopPullDownRefresh();
      //   }
      // })
      // let arr = []
      // if()
      let params = {
        pageNumber: 1,
        pageSize: 20,
        cityId: wx.getStorageSync("cityId"),
        stateId: this.data.quId,
        countyId: this.data.quyuIds,
        budgetId: this.data.checkPrice,
        areaId: this.data.checkMianji,
        useId: this.data.specialIds,
        characteristicId: this.data.specialIdsOther
      };
      util
        ._get("newhome/getNewHomePage", params)
        .then(res => {
          console.log(res);
          if (res.code == 1) {
            for (let item of res.data.list) {
              if (item.tagName != null) {
                item.tagArr = item.tagName.split(",");
              }
            }
            this.setData({
              hotList: res.data.list
            });
            // 隐藏导航栏加载框
            wx.hideNavigationBarLoading();
            // 停止下拉动作
            wx.stopPullDownRefresh();
          }
        })
        .catch(e => {
          console.log(e);
        });
    } else if (this.data.optionState == 1) {
      // 显示顶部刷新图标
      wx.showNavigationBarLoading();
      // wx.request({
      //   url: 'https://xxx/?page=0',
      //   method: "GET",
      //   header: {
      //     'content-type': 'application/text'
      //   },
      //   success: function (res) {
      //     that.setData({
      //       moment: res.data.data
      //     });
      //     console.log(that.data.moment);
      //     // 隐藏导航栏加载框
      //     wx.hideNavigationBarLoading();
      //     // 停止下拉动作
      //     wx.stopPullDownRefresh();
      //   }
      // })
      let params = {
        pageNumber: 1,
        pageSize: 20,
        cityId: wx.getStorageSync("cityId"),
        stateId: this.data.quId,
        countyId: this.data.quyuIds,
        budgetId: this.data.checkPrice,
        areaId: this.data.checkMianji,
        useId: this.data.specialIds,
        characteristicId: this.data.specialIdsOther,
        roomId:this.data.checkFangxing
      };
      util
        ._get("secondhome/getSecondHome", params)
        .then(res => {
          if (res.code == 1) {
            for (let item of res.data.list) {
              if (item.tagName != null) {
                item.tagArr = item.tagName.split(",");
              }
            }
            this.setData({
              hotList: res.data.list
            });
            // 隐藏导航栏加载框
            wx.hideNavigationBarLoading();
            // 停止下拉动作
            wx.stopPullDownRefresh();
          }
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      // 显示顶部刷新图标
      wx.showNavigationBarLoading();
      // wx.request({
      //   url: 'https://xxx/?page=0',
      //   method: "GET",
      //   header: {
      //     'content-type': 'application/text'
      //   },
      //   success: function (res) {
      //     that.setData({
      //       moment: res.data.data
      //     });
      //     console.log(that.data.moment);
      //     // 隐藏导航栏加载框
      //     wx.hideNavigationBarLoading();
      //     // 停止下拉动作
      //     wx.stopPullDownRefresh();
      //   }
      // })
      let params = {
        pageNumber: 1,
        pageSize: 20,
        cityId: wx.getStorageSync("cityId"),
        stateId: this.data.quId,
        countyId: this.data.quyuIds,
        budgetId: this.data.checkPrice,
        areaId: this.data.checkMianji,
        useId: this.data.specialIds,
        characteristicId: this.data.specialIdsOther,
        roomId:this.data.checkFangxing
      };
      util
        ._get("configure/getRentingHome", params)
        .then(res => {
          console.log(res);

          // 隐藏导航栏加载框
          wx.hideNavigationBarLoading();
          // 停止下拉动作
          wx.stopPullDownRefresh();
        })
        .catch(e => {
          console.log(e);
        });
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.optionState == 0) {
      let params = {
        pageNumber: ++this.data.num,
        pageSize: 20,
        cityId: wx.getStorageSync("cityId"),
        stateId: this.data.quId,
        countyId: this.data.quyuIds,
        budgetId: this.data.checkPrice,
        areaId: this.data.checkMianji,
        useId: this.data.specialIds,
        characteristicId: this.data.specialIdsOther
        // room:this.data.checkFangxing
      };
      util
        ._get("newhome/getNewHomePage", params)
        .then(res => {
          console.log(res);
          if (res.code == 1) {
            for (let item of res.data.list) {
              if (item.tagName != null) {
                item.tagArr = item.tagName.split(",");
              }
            }
            this.data.list = this.data.hotList.concat(res.data.list);
            this.setData({
              hotList: this.data.list
            });
            console.log(this.data.hotList);

            // 隐藏导航栏加载框
            wx.hideNavigationBarLoading();
            // 停止下拉动作
            wx.stopPullDownRefresh();
          }
        })
        .catch(e => {
          console.log(e);
        });
    } else if (this.data.optionState == 1) {
      let params = {
        pageNumber: ++this.data.num,
        pageSize: 20,
        cityId: wx.getStorageSync("cityId"),
        stateId: this.data.quId,
        countyId: this.data.quyuIds,
        budgetId: this.data.checkPrice,
        areaId: this.data.checkMianji,
        useId: this.data.specialIds,
        characteristicId: this.data.specialIdsOther,
        roomId:this.data.checkFangxing
      };
      util
        ._get("secondhome/getSecondHome", params)
        .then(res => {
          console.log(res);
          if (res.code == 1) {
            for (let item of res.data.list) {
              if (item.tagName != null) {
                item.tagArr = item.tagName.split(",");
              }
            }
            this.data.list = this.data.hotList.concat(res.data.list);
            this.setData({
              hotList: this.data.list
            });
            console.log(this.data.hotList);

            // 隐藏导航栏加载框
            wx.hideNavigationBarLoading();
            // 停止下拉动作
            wx.stopPullDownRefresh();
          }
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      let params = {
        pageNumber: ++this.data.num,
        pageSize: 20,
        cityId: wx.getStorageSync("cityId"),
        stateId: this.data.quId,
        countyId: this.data.quyuIds,
        budgetId: this.data.checkPrice,
        areaId: this.data.checkMianji,
        useId: this.data.specialIds,
        characteristicId: this.data.specialIdsOther,
        roomId:this.data.checkFangxing
      };
      util
        ._get("configure/getRentingHome", params)
        .then(res => {
          console.log(res);
          if (res.code == 1) {
            for (let item of res.data.list) {
              if (item.tagName != null) {
                item.tagArr = item.tagName.split(",");
              }
            }
            this.data.list = this.data.hotList.concat(res.data.list);
            this.setData({
              hotList: this.data.list
            });
            console.log(this.data.hotList);

            // 隐藏导航栏加载框
            wx.hideNavigationBarLoading();
            // 停止下拉动作
            wx.stopPullDownRefresh();
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
});
