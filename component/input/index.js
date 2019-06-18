Component({
  /**
   * 组件的属性列表
   */
  properties: {
    key: {
      type: String, //类型（必填）
      value: '', // 属性值 （可选）
      observer: function(newVal, oldVal){  //  属性被改变时执行的函数（可选）,可以监听外部值的改变，从而进行对应操作
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    value: '' // 组件内自定义的数据
  },

  /**
   * 组件生命周期函数，在组件实例进入页面节点树时执行
   */
  attached: function () {
   // 将外部传入的值复制给value，当然也可以直接使用key值
   console.log(this.data.key);
   
    this.setData({
      value: this.data.key
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 获取input中的值
    getValue: function(e) {
      // e.detail.value取到的就是input输入的值
      this.setData({
        value: e.detail.value
      })
      // 如果想要输入就向外部传值，则可以在这里传值
      // this.triggerEvent('getKey', e.detail.value)
    },

    // 点击button才向外部传值
    getSearchWords: function() {
      console.log(this.data.value,'字');
      
      this.triggerEvent('getKeys', this.data.value)
    }
  }
})