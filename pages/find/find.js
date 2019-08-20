// pages/panInfo/panInfo.js
const app = getApp();
const util = require("../../utils/util.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    city:'',
    relationship:'',
    title:"",
    yusuan: "请选择设置预算",
    mianjiplace: "请选择意向面积",
    yusuanId:'',
    mianjiplaceId:'',
    currentState: null,
    show: false,
    typesList: [
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
    stateList: [
      {
        name: "毛坯"
      },
      {
        name: "已装修"
      }
    ],
    numberList: [
      {
        value: "不限",
        id:''
      }
    ],
    typesIndex: null,
    numberIndex: null,
    numberId:null,
    state: 0,
    imgUrl: [],
    priceList: [

    ],
    mianjiList: [
      
    ],
    openList: [{
      value:"不限",
      id:''
    }],
    specialName: null,
    quyuIds:[],
    quyuName:[],
    idArr:[],
    nameArr:[],
    quId: "",
    quyuIndex: 0,
    quyuIndexs: 0,
    quyuRight: [],
    quyuInfo:'请选择意向区域',
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
  relationship(e) {
    this.setData({
      relationship:e.detail.value
    })
  },
  chooseCity() {
    wx.navigateTo({
      url: "/pages/chooseCity/chooseCity"
    });
  },
  //关闭弹框
  onClose() {
    this.setData({
      show: !this.data.show
    });
  },
  // 选中关闭弹框
  check(e) {
    let index = e.currentTarget.dataset.index;
    console.log(index, this.data.openList);

    if (this.data.currentState == 1) {
      this.setData({
        yusuan: this.data.openList[index].value,
        yusuanId: this.data.openList[index].id        
      });
    } else if (this.data.currentState == 2) {
      this.setData({
        mianjiplace: this.data.openList[index].value,
        mianjiplaceId: this.data.openList[index].id
      });
    }
    this.setData({
      show: !this.data.show
    });
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
      numberIndex: e.currentTarget.dataset.index,
      numberId:e.currentTarget.dataset.id,
    });
  },
  checkState(e) {
    console.log(e);

    this.setData({
      state: e.currentTarget.dataset.index
    });
  },
  chooseImg() {
    let that = this;
    wx.chooseImage({
      count: 5 - that.data.imgUrl.length,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths, "图片数组");
        let arr = that.data.imgUrl.concat(tempFilePaths);
        that.setData({
          imgUrl: arr
        });
      }
    });
  },
  // 预算
  money(e) {
    let arr = [
      {value:'不限',id:''}
    ]
    this.setData({
      openList:arr,
      priceList:[]
    })
    console.log(e.currentTarget.dataset.id);
    if(this.data.typesIndex ==null) {
      wx.showToast({
        title: '请先选择房屋类型',
        icon: 'none'
      })
      return
    }
    util._get("configure/getbudget?type="+this.data.typesIndex).then(res=>{
      this.setData({
        priceList: res.data,
        show: !this.data.show,
        openList:  this.data.openList.concat(res.data),
        currentState: e.currentTarget.dataset.id,
        title:"设置预算"
      })
    })

    // this.setData({

    // });
  },
  // 面积
  mianji(e) {
    let arr = [
      {value:'不限',id:''}
    ]
    this.setData({
      openList:arr,
      mianjiList:[]
    })
    if(this.data.typesIndex ==null) {
      wx.showToast({
        title: '请先选择房屋类型',
        icon: 'none'
      })
      return
    }
    util._get("configure/getArea?type="+this.data.typesIndex).then(res=>{
      this.setData({
        mianjiList: res.data,
        show: !this.data.show,
        openList: this.data.openList.concat(res.data),
        currentState: e.currentTarget.dataset.id,
        title:"面积"
      })
    })
  },
  // 区域
  quyu(e) {
    this.setData({
      currentState: 0,
      show: !this.data.show,
      specialName: "意向区域"
    });
    this.checkQuyu(e, 1);
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

          quyuList:this.data.quyuList
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
        this.data.quyuList[quyuIndex].list[0].state = true
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
    let id = e.currentTarget.dataset.id;

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
        
      }
    }
    console.log(this.data.quyuList);

    this.setData({
      quyuCheck: this.data.quyuCheck,
      quyuList: this.data.quyuList
    });
  },
  // 重置
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
    let nameArr = []
    this.data.quyuCheck.filter((item, index, arr) => {
      if (item.state) {
        arrs.push(item.id);
        nameArr.push(item.name)
      }
    });
    arrs  = arrs.filter(item=>{
      return item!=''
    })
    console.log(this.data.quyuName);
    
    this.setData({
      quyuIds: arrs,
      quyuName:nameArr,
      quyuInfo:nameArr,
      show: !this.data.show,

    });
  },
  // btnQuyu() {
    
  //   this.setData({
  //     show: !this.data.show,
  //   });
  // },
  submit() {
    let params = {
      sessionId:wx.getStorageSync('sessionId'),
      intentionType:this.data.typesIndex,
      intentionalRegionIds:this.data.quyuIds.toString(),
      budget:this.data.yusuanId,
      area:this.data.mianjiplaceId,
      intentionUnit:this.data.numberId
    }
    util._post('findhome/submitInfo',params).then(res=>{
      if(res.code == 1) {
        wx.navigateTo({
          url: '/pages/findResult/findResult'
        })
      }

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    
    Promise.all([
      util._get("configure/getbudget?type=0"),
      util._get("configure/getArea?type=0"),
      util._get("configure/getRoomType"),      
    ])
      .then(result => {
        this.setData({
          imgUrl: app.globalData.imgUrl,
          numberList:this.data.numberList.concat(result[2].data),
          relationship:wx.getStorageSync('mobile'),
          city:wx.getStorageSync('city'),
          numberId:null
        });
      })
      .catch(e => {});
  },

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
