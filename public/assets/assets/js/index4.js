$(function(e){
  'use strict'
  
	/*-----echart-----*/
	var chartdata3 = [
		{
		  name: 'Project In',
		  type: 'bar',
		  stack: 'Stack',
		  barMaxWidth: 18,
		  data: [1453, 3425, 7654, 3245, 4532, 5643, 7635, 5465, 6754, 5432, 5435, 6545],
		  itemStyle: {
                normal: {
                    barBorderRadius: [0] ,
				}
		  }
		},
		{
		  name: 'Project take',
		  type: 'bar',
		  stack: 'Stack',
		  barMaxWidth:18,
		  data: [1123, 2435, 5463, 1245, 3245, 4534, 5435, 3452, 5432, 3452, 2564, 3456 ],
		  itemStyle: {
                normal: {
                    barBorderRadius: [0] ,
				}
		  }
		},
		{
		  name: 'On Hold',
		  type: 'bar',
		  stack: 'Stack',
		  barMaxWidth:18,
		  data: [330, 990, 2191, 2000, 1287, 1109, 2013, 1322, 1980, 2971, 3089, 1234],
		  itemStyle: {
                normal: {
                    barBorderRadius: [50, 50, 0, 0] ,
				}
		  }
		}
	];

	var option5 = {
		grid: {
		  top: '6',
		  right: '0',
		  bottom: '17',
		  left: '40',
		},
		tooltip: {
			show: true,
			showContent: true,
			alwaysShowContent: true,
			triggerOn: 'mousemove',
			trigger: 'axis',
			axisPointer:
			{
				label: {
					show: false,
				}
			}

		},
		xAxis: {
		  data: ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		  axisLine: {
			lineStyle: {
			  color: 'rgba(67, 87, 133, .09)'
			}
		  },
		  axisLabel: {
			fontSize: 10,
			color: '#8e9cad'
		  }
		},
		yAxis: {
		  splitLine: {
			lineStyle: {
			  color: 'rgba(67, 87, 133, .09)'
			}
		  },
		  axisLine: {
			lineStyle: {
			  color: 'rgba(67, 87, 133, .09)'
			}
		  },
		  axisLabel: {
			fontSize: 10,
			color: '#8e9cad'
		  }
		},
		series: chartdata3,
		color:[ '#4454c3', '#f72d66','#cedbfd']
	};
	var chart5 = document.getElementById('echart5');
	var barChart5 = echarts.init(chart5);
	barChart5.setOption(option5);
	/*-----echart-----*/
	
	/*-----canvasDoughnut-----*/
	if ($('.canvasDoughnut').length){

		var chart_doughnut_settings = {
			type: 'doughnut',
			tooltipFillColor: "rgba(51, 51, 51, 0.55)",
			data: {
				labels: [
					"Application",
					"Shortlisted",
					"Rejected",
					"On Hold",
					"Finalised"
				],
				datasets: [{
					data: [68, 55, 45, 34, 27],
					backgroundColor: ['#4454c3', '#f72d66','#2dce89', '#45aaf2','#ecb403','#ff5b51'],
					hoverBackgroundColor: ['#4454c3', '#f72d66','#2dce89', '#45aaf2','#ecb403','#ff5b51']
				}]
			},
			options: {
				legend: false,
				responsive: false
			}
		}

		$('.canvasDoughnut').each(function(){

			var chart_element = $(this);
			var chart_doughnut = new Chart( chart_element, chart_doughnut_settings);

		});
	}
	/*-----canvasDoughnut-----*/
  
	
});