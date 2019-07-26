// map.js
Page({
  data: {
    title:"",
    content:'',
    markers: [
      {
        // iconPath: "/images/add.png",
        id: 0,
        latitude: '23.1234330000',
        longitude: '113.3146300000',
        width: 50,
        height: 50
      }
    ],
    polyline: [
      {
        points: [
          {
            longitude: 113.3245211,
            latitude: 23.10229
          },
          {
            longitude: 113.32452,
            latitude: 23.21229
          }
        ],
        color: "#FF0000DD",
        width: 2,
        dottedLine: true
      }
    ],
    controls: [
      {
        id: 1,
        iconPath: "/images/add.png",
        position: {
          left: 0,
          top: 300 - 50,
          width: 50,
          height: 50
        },
        alpha: "#999999AA",

        clickable: true
      }
    ]
  },
  regionchange(e) {
    // console.log(e.type);
  },
  markertap(e) {
    // console.log(e.markerId);
  },
  controltap(e) {
    // console.log(e.controlId);
  },
  //b.js 页面接收参数
  onLoad: function(options) {
    console.log('999',options);
    this.data.markers[0].latitude = options.lat
    this.data.markers[0].longitude = options.lon

    this.setData( {
      markers:this.data.markers,
      title:options.title,
      content:options.content
    })
    
  },
  onShareAppMessage: function() {
    return {
      title: this.data.title,
      desc: "分享页面的内容",
      path:
        "/pages/map/map?lat=" +
        this.data.markers[0].latitude +
        "&lon=" +
        this.data.markers[0].longitude+'&title='+this.data.title+'&content='+this.data.content

        // '/pages/map/map?lat='+this.data.info.latitude+'&lon='+this.data.info.longitude+'&title='+this.data.info.houseName+'&content='+this.data.info.subheading
    };
  }
});
