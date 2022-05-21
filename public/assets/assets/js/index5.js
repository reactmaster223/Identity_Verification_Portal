$(function(e){
  'use strict'
  
	/*----CryptoChart----*/
	var ctx = document.getElementById( "CryptoChart" );
	var myChart = new Chart( ctx, {
		type: 'line',
		data: {
			labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'],
			type: 'line',
			datasets: [ {
				data: [83,56,89, 73, 61, 75, 86, 56],
				label: 'Bitcon',
				backgroundColor: 'rgb(249, 162, 60,0.06)',
				borderColor: 'rgba(249, 162, 60,0.8)',
				borderWidth: '3',
				pointBorderColor: 'transparent',
				pointBackgroundColor: 'transparent',
			}
			]
		},
		options: {

			maintainAspectRatio: false,
			legend: {
				display: false
			},
			responsive: true,
			tooltips: {
				mode: 'index',
				titleFontSize: 12,
				titleFontColor: '#7886a0',
				bodyFontColor: '#7886a0',
				backgroundColor: '#fff',
				titleFontFamily: 'Montserrat',
				bodyFontFamily: 'Montserrat',
				cornerRadius: 3,
				intersect: false,
			},
			scales: {
				xAxes: [ {
					gridLines: {
						color: 'transparent',
						zeroLineColor: 'transparent'
					},
					ticks: {
						fontSize: 2,
						fontColor: 'transparent'
					}
				} ],
				yAxes: [ {
					display:false,
					ticks: {
						display: false,
					}
				} ]
			},
			title: {
				display: false,
			},
			elements: {
				line: {
					borderWidth: 1
				},
				point: {
					radius: 4,
					hitRadius: 10,
					hoverRadius: 4
				}
			}
		}
	} );
	/*----End CrptoChart----*/
	
	/*----CryptoChart1----*/
	var ctx = document.getElementById( "CryptoChart1" );
	var myChart = new Chart( ctx, {
		type: 'line',
		data: {
			labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'],
			type: 'line',
			datasets: [ {
				data: [45,78,67,78,36,78,89,84],
				label: 'Nem',
				backgroundColor: 'rgb(68, 84, 195,0.06)',
				borderColor: 'rgba(68, 84, 195,0.8)',
				borderWidth: '3',
				pointBorderColor: 'transparent',
				pointBackgroundColor: 'transparent',
			}
			]
		},
		options: {

			maintainAspectRatio: false,
			legend: {
				display: false
			},
			responsive: true,
			tooltips: {
				mode: 'index',
				titleFontSize: 12,
				titleFontColor: '#7886a0',
				bodyFontColor: '#7886a0',
				backgroundColor: '#fff',
				titleFontFamily: 'Montserrat',
				bodyFontFamily: 'Montserrat',
				cornerRadius: 3,
				intersect: false,
			},
			scales: {
				xAxes: [ {
					gridLines: {
						color: 'transparent',
						zeroLineColor: 'transparent'
					},
					ticks: {
						fontSize: 2,
						fontColor: 'transparent'
					}
				} ],
				yAxes: [ {
					display:false,
					ticks: {
						display: false,
					}
				} ]
			},
			title: {
				display: false,
			},
			elements: {
				line: {
					borderWidth: 1
				},
				point: {
					radius: 4,
					hitRadius: 10,
					hoverRadius: 4
				}
			}
		}
	} );
	/*----End CrptoChart1----*/
	
	/*----CryptoChart2----*/
	var ctx = document.getElementById( "CryptoChart2" );
	var myChart = new Chart( ctx, {
		type: 'line',
		data: {
			labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'],
			type: 'line',
			datasets: [ {
				data: [56,78,36,78,29,78,37,56],
				label: 'Ripple',
				backgroundColor: 'rgb(70, 212, 151,0.06)',
				borderColor: 'rgba(70, 212, 151,0.8)',
				borderWidth: '3',
				pointBorderColor: 'transparent',
				pointBackgroundColor: 'transparent',
			}
			]
		},
		options: {

			maintainAspectRatio: false,
			legend: {
				display: false
			},
			responsive: true,
			tooltips: {
				mode: 'index',
				titleFontSize: 12,
				titleFontColor: '#7886a0',
				bodyFontColor: '#7886a0',
				backgroundColor: '#fff',
				titleFontFamily: 'Montserrat',
				bodyFontFamily: 'Montserrat',
				cornerRadius: 3,
				intersect: false,
			},
			scales: {
				xAxes: [ {
					gridLines: {
						color: 'transparent',
						zeroLineColor: 'transparent'
					},
					ticks: {
						fontSize: 2,
						fontColor: 'transparent'
					}
				} ],
				yAxes: [ {
					display:false,
					ticks: {
						display: false,
					}
				} ]
			},
			title: {
				display: false,
			},
			elements: {
				line: {
					borderWidth: 1
				},
				point: {
					radius: 4,
					hitRadius: 10,
					hoverRadius: 4
				}
			}
		}
	} );
	/*----End CrptoChart2----*/
  
  /*----CryptoChart3----*/
	var ctx = document.getElementById( "CryptoChart3" );
	var myChart = new Chart( ctx, {
		type: 'line',
		data: {
			labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'],
			type: 'line',
			datasets: [ {
				data: [45,78,98,34,67,28,89,45],
				label: 'Neo',
				backgroundColor: 'rgb(248, 70, 120,0.06)',
				borderColor: 'rgba(248, 70, 120,0.8)',
				borderWidth: '3',
				pointBorderColor: 'transparent',
				pointBackgroundColor: 'transparent',
			}
			]
		},
		options: {

			maintainAspectRatio: false,
			legend: {
				display: false
			},
			responsive: true,
			tooltips: {
				mode: 'index',
				titleFontSize: 12,
				titleFontColor: '#7886a0',
				bodyFontColor: '#7886a0',
				backgroundColor: '#fff',
				titleFontFamily: 'Montserrat',
				bodyFontFamily: 'Montserrat',
				cornerRadius: 3,
				intersect: false,
			},
			scales: {
				xAxes: [ {
					gridLines: {
						color: 'transparent',
						zeroLineColor: 'transparent'
					},
					ticks: {
						fontSize: 2,
						fontColor: 'transparent'
					}
				} ],
				yAxes: [ {
					display:false,
					ticks: {
						display: false,
					}
				} ]
			},
			title: {
				display: false,
			},
			elements: {
				line: {
					borderWidth: 1
				},
				point: {
					radius: 4,
					hitRadius: 10,
					hoverRadius: 4
				}
			}
		}
	} );
	/*----End CrptoChart3----*/
	
	/*-----echart1-----*/
	var chartdata = [
		{
		  name: 'Last Price $',
		  type: 'line',
		  smooth: true,
		  data: [254, 678, 346, 789, 452, 389, 576, 689, 937, 457, 782, 827],
		  lineStyle:{  
			normal:{  
			   opacity:0.8,
			   width:4,
			   curveness:1
			}
		 }
		},
		{
		  name: 'Daily Change $',
		  type: 'line',
		  smooth: true,
		  data: [154, 578, 226, 589, 252, 189, 376, 289, 637, 257, 582, 727],
		  lineStyle:{  
			normal:{  
			   opacity:0.8,
			   width:4,
			   curveness:1
			}
		 }
		}
	];

	var chart = document.getElementById('echart1');
	var barChart = echarts.init(chart);

	var option = {
		grid: {
		  top: '6',
		  right: '0',
		  bottom: '17',
		  left: '35',
		},
		xAxis: {
		  data: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug',  'Sep', 'Oct', 'Nov', 'Dec'],
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
		series: chartdata,
		color:[ '#4454c3','#f72d66']
	};
	barChart.setOption(option);
	/*-----End echart1-----*/
	
	/*----P-scrolling JS ----*/
	const ps32 = new PerfectScrollbar('#scrollbar', {
	  useBothWheelAxes:true,
	  suppressScrollX:true,
	});
	/*-----P-scrolling JS -----*/

	/*----P-scrolling JS ----*/
	const ps33 = new PerfectScrollbar('#scrollbar2', {
	  useBothWheelAxes:true,
	  suppressScrollX:true,
	});
	/*-----P-scrolling JS -----*/
});