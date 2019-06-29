// pages/chooseCity/chooseCity.js
const util = require("../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cityList:[
      {keyword: 'A',valList:['阿萨德','奥司法','按格式','阿飞']},
      {keyword: 'B',valList:['巴斯夫','八十分','爸爸']},
      {keyword: 'C',valList:['茶水费','茶树网','从头','查收']},
      {keyword: 'D',valList:['大帅哥','带我去','达芬奇','订单']},
      {keyword: 'E',valList:['二手房','而']},
      {keyword: 'F',valList:['发顺丰','发生','发送']},
      {keyword: 'G',valList:['刚','高级','挂失','个人意见']},
      {keyword: 'H',valList:['划算日期','哈飒飒','哈哈哈哈','荷叶']},
      {keyword: 'I',valList:['压缩','亚索','牙刷','因为']},
      {keyword: 'J',valList:['假设法','举案说法','假的离开','几千万人']},
      {keyword: 'K',valList:['咖啡','卡死','考古家','看功能']},
      {keyword: 'L',valList:['拉司法所','拉加适量','拉升佛','来看看']},
      {keyword: 'N',valList:['那份','那个离开','那个','那天']},
      {keyword: 'M',valList:['麻烦','马上','马赛克','马飞']},
      {keyword: 'O',valList:['omg','哦','噢']},
      {keyword: 'P',valList:['骗了','漂亮','屁','骗子']},
      {keyword: 'Q',valList:['千万人防','清水房','青岛市','请我']},
      {keyword: 'R',valList:['染色费','燃烧','然后','日月凌空']},
      {keyword: 'S',valList:['沙发','是按格式','是个','是好']},
      {keyword: 'T',valList:['他是否',' 通过','泰拉科技和','他说']},
      {keyword: 'U',valList:['ui']},
      {keyword: 'V',valList:['vvvvv','vv']},
      {keyword: 'W',valList:['挖是否','忘','问题挖','我还根深蒂固']},
      {keyword: 'X',valList:['徐秩序','小程序','下噶','小样']},
      {keyword: 'Y',valList:['压他','亚沙','呀','亚商所']},
      {keyword: 'Z',valList:['咋收费','早','造','炸天']},
    ],
    position: 'A'
  },

  touchCk(e){
    console.log(e.target.dataset.id);
    this.setData({
      position: e.target.dataset.id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    util._get('newhome/getHomeArea').then(res=>{
      if(res.code == 1) {
        for(let item of res.data) {
          item.citys = item.cityName.split(',')
          item.cityIds = item.cityId.split('.')
        }
        this.setData({
          cityList:res.data
        })
      }
    })
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
