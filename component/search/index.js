Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    optionState: {
      type: String,
      value: "default value"
    }
  },
  data: {
    // 这里是一些组件内部数据
    someData: {}
  },
  attached: function() {
    // 将外部传入的值复制给value，当然也可以直接使用key值
    console.log("eeee", this.data.optionState, 9099989);

    this.setData({
      optionState: this.data.optionState
    });
  },
  methods: {
    // 这里是一个自定义方法
    customMethod: function() {},
    // toResult() {
    //   this.triggerEvent('myevent', {
    //     optionState: '李四'
    //   })
    // },
    toCity() {
      wx.navigateTo({
        url: "/pages/chooseCity/chooseCity?state=" + this.data.optionState
      });
    },
    toResult() {
      wx.navigateTo({
        url: "/pages/result/result?state=" + this.data.optionState
      });
    }
  },
  onLoad() {}
});
