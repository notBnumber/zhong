Page({
  data: {
    key: '搜索1'
  },
  onLoad: function () {
  },

  // 获取search组件的值
  getKey: function(e) {
    console.log(e);
    
    this.setData({
      key: e.detail
    })
  }
})