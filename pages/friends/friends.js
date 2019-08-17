// pages/panInfo/panInfo.js
const util = require("../../utils/util.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    city: "",
    code: "",
    codeId: "",
    ids: "",
    relation: "",
    title: "",
    name: "",
    phone: "",
    yusuan: "请选择设置预算",
    mianjiplace: "请选择意向面积",
    yusuanId: null,
    mainjiId: null,
    numberIndexId: null,
    currentState: null,
    stateId: null,
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
        id: '',
        value: "不限"
      },
    ],
    typesIndex: null,
    numberIndex: null,
    state: null,
    imgUrl: [],
    priceList: [
      {
        name: "设置预算",
        list: [
          { name: "不限" },
          { name: "5000元以下/平方" },
          { name: "5000-10000元/平方" },
          { name: "5000元以下/平方" }
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
    openList: [{
      value:'不限',
      id:''
    }],
    specialName: null,
    quyuIndex: 0,
    quyuIndexs: 0,
    quyuRight: [],
    quId: "",
    quyuIds: [],
    quyuIndex: 0,
    quyuInfo: "请选择意向区域",
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
  chooseCity() {
    wx.navigateTo({
      url: "/pages/chooseCity/chooseCity?type=5"
    });
  },
  chooseName(e) {
    this.setData({
      name: e.detail.value
    });
  },
  choosePhone(e) {
    this.setData({
      phone: e.detail.value
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
      console.log(this.data.openList);

      console.log(this.data.openList[index].value);
      console.log(this.data.openList[index].id);

      this.setData({
        mianjiplace: this.data.openList[index].value,
        mainjiId: this.data.openList[index].id
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
    console.log(e.currentTarget.dataset.id);

    this.setData({
      numberIndex: e.currentTarget.dataset.index,
      numberIndexId: e.currentTarget.dataset.id
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
      openList:arr
    })
    // 新 二 租
    console.log(e.currentTarget.dataset.id);
    if(this.data.typesIndex ==null) {
      wx.showToast({
        title: '请先选择房屋类型',
        icon: 'none'
      })
      return
    }
    util._get("configure/getbudget?type=" + this.data.typesIndex).then(res => {
      if (res.code == 1) {
        this.setData({
          show: !this.data.show,
          openList: this.data.openList.concat(res.data),
          currentState: e.currentTarget.dataset.id,
          title: "设置预算"
        });
      }
    });
  },
  // 面积
  mianji(e) {
    let arr = [
      {value:'不限',id:''}
    ]
    this.setData({
      openList:arr
    })
    console.log(e.currentTarget.dataset.id);
    // this.setData({
    //   show: !this.data.show,
    //   openList: this.data.mianjiList,
    //   currentState: e.currentTarget.dataset.id
    // });
    if(this.data.typesIndex ==null) {
      wx.showToast({
        title: '请先选择房屋类型',
        icon: 'none'
      })
      return
    }
    util._get("configure/getArea?type=" + this.data.typesIndex).then(res => {
      if (res.code == 1) {
        this.setData({
          show: !this.data.show,
          openList: this.data.openList.concat(res.data),
          currentState: e.currentTarget.dataset.id,
          title: "面积"
        });
      }
    });
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

      console.log("初始化");
      util._get("configure/getAllArea?areaId=" + fuckId).then(res => {
        if (res.code == 1) {
          this.setData({
            quyuIndex: 0,
            quyuList: res.data
          });
          util
            ._get("configure/getAllArea?areaId=" + res.data[0].id)
            .then(res => {
              if (res.code == 1) {
                // for (let item of this.data.quyuRight) {
                //   item.state = false;
                // }
                this.data.quyuList[0].list =arrs.concat(res.data)
                this.setData({
                  quyuIndex: 0,
                  quyuList: this.data.quyuList,
                  quId: this.data.quyuList[0].id
                });
              }
            });
        }
      });

      // index = e.currentTarget.dataset.index
    } else {
      console.log("左边");

      let id = e.currentTarget.dataset.id;
      let index = e.currentTarget.dataset.index;

      util._get("configure/getAllArea?areaId=" + id).then(res => {
        if (res.code == 1) {
          // for (let item of this.data.quyuRight) {
          //   item.state = false;
          // }
          this.data.quyuList[index].list = arrs.concat(res.data)
          this.setData({
            quyuIndex: index,
            quyuList: this.data.quyuList
          });
        }
      });
      console.log(this.data.quyuList[this.data.quyuIndex]);
    }
  },
  // 区域右边
  checkQuyuRight(e) {
    let index = e.currentTarget.dataset.index;
    let quyuIndex = this.data.quyuIndex;
    // let arr = [];
    // this.data.quyuList[this.data.quyuIndex].list[state].state = !this.data
    //   .quyuList[this.data.quyuIndex].list[state].state;
    // for (let item of this.data.quyuList) {
    //   for (let items of item.list) {
    //     arr.push(items);
    //   }
    // }
    // this.setData({
    //   quyuList: this.data.quyuList,
    //   quyuCheck: arr
    // });
    // console.log(this.data.quyuRight[index]);
    // this.data.quyuCheck.push(this.data.quyuRight[index])
    this.data.quyuList[quyuIndex].list[index].state = !this.data.quyuList[
      quyuIndex
    ].list[index].state;
    // let arr = this.data.quyuList[quyuIndex].list.filter(
    //   (item, index, arr) => {
    //     if(item.state ) {
    //       arr.push(item)
    //     }
    //   }
    // );
    this.setData({
      quyuList:this.data.quyuList
    })
    let arrays = this.data.quyuList;
    let arr = [];
    for (let item of arrays) {
      if (item.list) {
        for (let items of item.list) {
          if (items.state) {
            arr.push(items);
          }
        }
      }
    }
    console.log(arr, "888888");

    // this.data.quyuCheck = this.data.quyuCheck.concat(arr)

    this.setData({
      quyuCheck: arr
    });
    this.btnQuyus();
  },
  // 区域删除
  del(e) {
    let index = e.currentTarget.dataset.index;
    let id = e.currentTarget.dataset.id;
    // console.log(id);
    // this.data.quyuCheck[index].state = false;
    // this.data.quyuCheck = this.data.quyuCheck.filter(
    //   (item, index, arr) => item.state
    // );
    for (let item of this.data.quyuList) {
      for (let y in item.list) {
        console.log(item.list[y].id, "?????");

        if (id == item.list[y].id) {
          console.log(item.list[y]);

          item.list[y].state = false;
          // item.list[y].splice(y,1)
        }
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
      if (item.list) {
        console.log(99909090);

        // for (let items of item.list) {
        //   console.log(items);
        //   items.state = false;
        // }
      }
    }
    console.log(this.data.quyuList);

    this.setData({
      quyuList: this.data.quyuList,
      quyuCheck: [],
      quyuIds: ""
    });
    this.checkQuyu(e, 2);
  },
  // btnQuyu() {
  //   let arrs = [];
  //   this.data.quyuCheck.filter((item, index, arr) => {
  //     if (item.state) {
  //       arrs.push(item.id);
  //     }
  //   });

  //   this.setData({
  //     quyuIds: arrs.toString(),
  //     show: !this.data.show
  //   });
  //   // this.screen()
  // },
  btnQuyus() {
    let arrs = [];
    let nameArr = [];
    this.data.quyuCheck.filter((item, index, arr) => {
      if (item.state) {
        arrs.push(item.id);
        nameArr.push(item.name);
      }
    });
    console.log(this.data.quyuName);

    this.setData({
      quyuIds: arrs.toString(),
      quyuName: nameArr,
      quyuInfo: nameArr.toString()
    });
  },
  btnQuyu() {
    this.setData({
      show: !this.data.show
    });
  },
  chooseRelation(e) {
    this.setData({
      relation: e.detail.value
    });
  },
  // 提交
  submit() {
    if (this.data.name == "") {
      wx.showToast({
        title: "请输入姓名",
        icon: "none"
      });
      return;
    }
    if (this.data.phone == "") {
      wx.showToast({
        title: "请输入联系方式",
        icon: "none"
      });
      return;
    }
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(this.data.phone)) {
      wx.showToast({
        title: "手机号有误！",
        icon: "none"
      });
      return false;
    }

    // if(this.data.relation == '') {
    //   wx.showToast({
    //     title: '请输入与被推荐人关系',
    //     icon: 'none'
    //   })
    //   return

    // }
    let params = {
      sessionId: wx.getStorageSync("sessionId"),
      recommendedPerson: this.data.name,
      recommendedTele: this.data.phone,
      intentionType: this.data.typesIndex == null?'':this.data.typesIndex,
      budget: this.data.yusuanId == null?'':this.data.yusuanId,
      area: this.data.mainjiId == null?'':this.data.mainjiId,
      intentionUnit: this.data.numberIndexId == null?'':this.data.numberIndexId,
      State: this.data.state == null?'':this.data.state,
      relation: this.data.relation,
      intentionalRegionIds: this.data.quyuIds.length==0?'':this.data.quyuIds
    };
    util._get("pusher/submitSource", params).then(res => {
      if (res.code == 1) {
        wx.showToast({
          title: "提交成功",
          icon: "success"
        });
        wx.redirectTo({
          url: "../friendsResult/friendsResult"
        });
      }
    });
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
    console.log( wx.getStorageSync("citys"),wx.getStorageSync("cityIds"))   ;
    
    if (
      wx.getStorageSync("citys") == "" &&
      wx.getStorageSync("cityIds") == ""
    ) {
      let params = {
        lat: wx.getStorageSync("latitude"),
        log: wx.getStorageSync("longitude")
      };
      util._get("newhome/checkCity", params).then(res => {
        if (res.code == 1) {
          this.setData({
            city: res.data.regeocode.addressComponent.city,
            cityId: res.data.regeocode.addressComponent.citycode,
            city: wx.getStorageSync("city")
          });
        }
      });
      console.log("jjjjj", wx.getStorageSync("city"));
    } else {
      console.log("999999999999");

      this.setData({
        city: wx.getStorageSync("citys")
      });
    }

    util._get("configure/getRoomType").then(res => {
      if (res.code == 1) {
        this.setData({
          numberList:   this.data.numberList.concat(res.data) ,
          numberIndexId: null
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    wx.setStorageSync("cityIds", "");
    wx.setStorageSync("citys", "");
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    wx.setStorageSync("cityIds", "");
    wx.setStorageSync("citys", "");
  },

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
