
// const AMapUI = window.AMapUI;

export default {
  data() {
    return {
      regionName: "", // 区域名称
      geoJsonTree: {}, // 地图渲染文件缓存
      regionCode: null, // 区域编码
      mapBarData: [], // 3D柱状图数据
      myChart: {}, // echats实例
      level: "", // 区域等级（省、市、县等）
      previous: {}, // 上一个区域信息
      // echarts 渲染属性
      data: [], // 接口数据
      currentGeocoordSet: [], // 接口数据转换
      mapJson: {}, // 当前区域地图信息
      params: {}, // 请求参数
    };
  },
  methods: {
    // 获取地图渲染数据
    loadMapData() {
      this.$http.get('https://geo.datav.aliyun.com/areas_v2/bound/100000_full.json').then(res => {
        this.loadMap({features: res.data.features});
      })
      // this.mapJson = {};
      // if (this.geoJsonTree[areaCode]) {
      //   this.mapJson = { ...this.geoJsonTree[areaCode] };
      //   this.loadMap();
      // } else {
        // AMapUI.loadUI(["geo/DistrictExplorer"], DistrictExplorer => {
        //   //创建一个实例
        //   const districtExplorer = new DistrictExplorer();

        //   districtExplorer.loadAreaNode(areaCode, (error, areaNode) => {
        //     if (error) {
        //       console.error(error);
        //       return;
        //     }
            // this.mapJson.features = areaNode.getSubFeatures();
            // this.geoJsonTree[areaCode] = { ...this.mapJson };
        //     this.loadMap({features: areaNode.getSubFeatures()});
        //   });
        // });
      // }
    },
    // 地图渲染
    loadMap(data) {
      this.$echarts.registerMap('china', data);
      const mapbardata = [{ "name": "浙江省", "regionCode": 330000, "level": "province", "value": [120.109921, 29.181449, 562583.43], "saleAmount": 1164452.88, "saleArea": 562583.43 }, { "name": "福建省", "regionCode": 350000, "level": "province", "value": [118.006265, 26.069941, 6286.5], "saleAmount": 16190.21, "saleArea": 6286.5 }, { "name": "江西省", "regionCode": 360000, "level": "province", "value": [115.732975, 27.636112, 11158.79], "saleAmount": 15894.54, "saleArea": 11158.79 }, { "name": "四川省", "regionCode": 510000, "level": "province", "value": [102.693453, 30.674544, 4100.83], "saleAmount": 12338.65, "saleArea": 4100.83 }];
      setInterval(() => {
        console.time('cal');
        this.myChart.setOption({
          backgroundColor: '#cdcfd5',
          geo3D: {
            map: 'china',
            shading: "lambert",
            viewControl: {
              zoomSensitivity: 0,
              rotateSensitivity: 0,
              alpha: 45,
              beta: 5,
            },
            itemStyle: {
              color: "#1c2995", // 地图配色
              opacity: 0.15,
              borderWidth: 0.4,
              borderColor: "#68daff" // 地图边配色
            },
            label: {
              show: false,
              textStyle: {
                color: "#fff", //地图初始化区域字体颜色
                fontSize: 12,
                opacity: 1,
                backgroundColor: "rgba(0,23,11,0)"
              }
            },
            emphasis: {
              //当鼠标放上去  地区区域是否显示名称
              itemStyle: {
                areaColor: "#7db41b" // 鼠标移入地图配色
              },
              label: {
                show: true,
                textStyle: {
                  color: "#fff",
                  fontSize: 16,
                  backgroundColor: "rgba(0,0,0,1)" //鼠标移入文字加背景
                }
              }
            },
            light: {
              //光照阴影
              main: {
                color: "#fff", //光照颜色
                intensity: 1, //光照强度
                //shadowQuality: 'high', //阴影亮度
                shadow: false, //是否显示阴影
                alpha: 50,
                beta: -40
              },
              ambient: {
                intensity: 0.3
              }
            },
            regionHeight: 0.1,
            silent: false,
            boxDepth: 100,
            boxHeight: 15,
          },
          series: [{
            name: "接单量",
            type: "bar3D",
            coordinateSystem: "geo3D",
            shading: "lambert",
            minHeight: 0.5,
            itemStyle: {
              opacity: 1,
              color: "#3ed8ff"
            },
            emphasis: {
              itemStyle: {
                color: "#b0efff",
                opacity: 1
              },
              label: {
                show: false,
                formatter: param => {
                  return param.data.name + "/n" + param.data.value[2];
                }
              }
            },
            data: mapbardata
          }]
        });
        console.timeEnd('cal');
      }, 5000);
    },
  },
  mounted() {
    this.myChart = this.$echarts.init(document.getElementById('chart'));

    // this.myChart.on("click", params => {
    //   this.myChart.off();
    //   this.echartsMapClick(params);
    // });

    this.loadMapData();
  }
};
