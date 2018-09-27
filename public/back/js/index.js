/**
 * Created by me on 2018/9/27.
 */
$(function () {

  //柱状图
// 基于准备好的dom，初始化echarts实例
  var myChart1 = echarts.init(document.querySelector(".echarts1"));

  // 指定图表的配置项和数据
  var option1 = {
    //大标题
    title: {
      text: '2017年注册人数'
    },
    //提示信息
    tooltip: {},
    //图例
    legend: {
      data: ['人数']
    },
    //X轴
    xAxis: {
      data: ["1月", "2月", "3月", "4月", "5月", "6月"]
    },
    //Y轴
    yAxis: {},
    series: [{
      name: '人数',
      type: 'bar',
      data: [1000, 1500, 1800, 1200, 1000, 500]
    }]
  };

  // 使用刚指定的配置项和数据显示图表。
  myChart1.setOption(option1);

  //饼状图
  var echars2 = echarts.init(document.querySelector(".echarts2"));
  option2 = {
    title: {
      text: '热门品牌销售',
      // 子标题
      subtext: '2017年6月',
      // 水平居中
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    // 图例
    legend: {
      // 垂直排列
      orient: 'vertical',
      // 居左显示
      left: 'left',
      data: ['耐克', '阿迪', '新百伦', '李宁', '阿迪王']
    },
    series: [
      {
        name: '品牌',
        // 饼状图
        type: 'pie',
        // 圆的大小
        radius: '50%',
        // 圆心的位置
        center: ['50%', '60%'],
        data: [
          {value: 335, name: '耐克'},
          {value: 310, name: '阿迪'},
          {value: 234, name: '新百伦'},
          {value: 135, name: '李宁'},
          {value: 1548, name: '阿迪王'}
        ],
        itemStyle: {
          // 设置阴影效果
          emphasis: {
            shadowBlur: 30,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 1)'
          }
        }
      }
    ]
  };
  // 使用刚指定的配置项和数据显示图表。
  echars2.setOption(option2);
})
