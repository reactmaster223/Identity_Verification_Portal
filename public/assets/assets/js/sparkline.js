$(function(e){
  'use strict'

		//Sparkline charts
			$(".sparkline_one").sparkline([2, 4, 3, 4, 5, 4, 5, 4, 3, 4, 5, 6, 4, 5, 6, 3, 5, 4, 5, 4, 5, 4, 3, 4, 5, 6, 7, 5, 4, 3, 5, 6], {
				type: 'bar',
				height: '125',
				barWidth: 13,
				colorMap: {

				},
				barSpacing: 2,
				barColor: '#00bcd4'
			});


			$(".sparkline_two").sparkline([2, 4, 3, 4, 5, 4, 5, 4, 3, 4, 5, 6, 7, 5, 4, 3, 5, 6], {
				type: 'bar',
				height: '40',
				barWidth: 9,
				colorMap: {
				},
				barSpacing: 2,
				barColor: '#00e682'
			});


			$(".sparkline_three").sparkline([2, 4, 3, 4, 5, 4, 5, 4, 3, 4, 5, 6, 7, 5, 4, 3, 5, 6], {
				type: 'line',
				width: '200',
				height: '40',
				lineColor: '#00e682',
				fillColor: '#dbddf6',
				lineWidth: 2,
				spotColor: '#00e682',
				minSpotColor: '#00e682'
			});


			$(".sparkline11").sparkline([3, 4, 3, 4, 5, 4, 5, 4, 3, 4, 6, 2, 4, 3, 4, 5, 4, 5, 4, 3], {
				type: 'bar',
				height: '43',
				barWidth: 12,
				colorMap: {
					'7': '#a1a1a1'
				},
				barSpacing: 1,
				barColor: '#00e682'
			});
			$(".sparkline12").sparkline([3, 4, 3, 4, 5, 4, 5, 4, 3, 4, 6, 2, 4, 3, 4, 5, 4, 5, 4, 3], {
				type: 'bar',
				height: '43',
				barWidth: 12,
				colorMap: {
					'7': '#a1a1a1'
				},
				barSpacing: 1,
				barColor: '#ffa22b'
			});
			$(".sparkline11a").sparkline([3, 4, 3, 4, 5, 4, 5, 4, 3, 4, 6, 2, 4, 3, 4, 5, 4, 5, 4, 3], {
				type: 'bar',
				height: '43',
				barWidth: 12,
				colorMap: {
					'7': '#a1a1a1'
				},
				barSpacing: 1,
				barColor: '#6963ff'
			});
			$(".sparkline11b").sparkline([3, 4, 3, 4, 5, 4, 5, 4, 3, 4, 6, 2, 4, 3, 4, 5, 4, 5, 4, 3], {
				type: 'bar',
				height: '43',
				barWidth: 12,
				colorMap: {
					'7': '#a1a1a1'
				},
				barSpacing: 1,
				barColor: '#ffa22b'
			});
			$(".sparkline11c").sparkline([3, 4, 3, 4, 5, 4, 5, 4, 3, 4, 6, 2, 4, 3, 4, 5, 4, 5, 4, 3], {
				type: 'bar',
				width: '200',
				height: '43',
				barWidth: 12,
				colorMap: {
					'7': '#a1a1a1'
				},
				barSpacing: 1,
				barColor: '#ffa22b'
			});
			$(".sparkline14").sparkline([3, 4, 3, 4, 5, 4, 5, 4, 3, 4, 6, 2, 4, 3, 4, 5, 4, 5, 4, 3], {
				type: 'bar',
				width: '371',
				height: '43',
				barWidth: 12,
				colorMap: {
					'7': '#a1a1a1'
				},
				barSpacing: 1,
				barColor: '#ffa22b'
			});
			$(".sparkline15").sparkline([3, 4, 3, 4, 5, 4, 5, 4, 3, 4, 6, 2, 4, 3, 4, 5, 4, 5, 4, 3], {
				type: 'bar',
				width: '270',
				height: '43',
				barWidth: 12,
				colorMap: {
					'7': '#a1a1a1'
				},
				barSpacing: 1,
				barColor: '#00bcd4'
			});
			$(".sparkline22").sparkline([2, 4, 3, 4, 7, 5, 4, 3, 5, 6, 2, 4, 3, 4, 5, 4, 5, 4, 3, 4, 6], {
				type: 'line',
				height: '40',
				width: '200',
				lineColor: '#00e682',
				fillColor: '#ffffff',
				lineWidth: 3,
				spotColor: '#ffa22b',
				minSpotColor: '#ffa22b'
			});

			$(".sparkline23").sparkline([2, 4, 3, 4, 7, 5, 4, 3, 5, 6, 2, 4, 3, 4, 5, 4, 5, 4, 3, 4, 6], {
				type: 'line',
				height: '40',
				width: '273',
				lineColor: '#00bcd4',
				fillColor: '#ffffff',
				lineWidth: 3,
				spotColor: '#ffa22b',
				minSpotColor: '#ffa22b'
			});


			$(".sparkline_bar").sparkline([2, 4, 3, 4, 5, 4, 5, 4, 3, 4, 5, 6, 4, 5, 6, 3, 5], {
				type: 'bar',
				colorMap: {
					'7': '#a1a1a1'
				},
				barColor: '#00bcd4'
			});


			$(".sparkline_area").sparkline([5, 6, 7, 9, 9, 5, 3, 2, 2, 4, 6, 7], {
				type: 'line',
				lineColor: '#ffa22b',
				fillColor: '#ffa22b',
				spotColor: '#f44336',
				minSpotColor: '#f44336',
				maxSpotColor: '#f44336',
				highlightSpotColor: '#f44336',
				highlightLineColor: '#f44336',
				spotRadius: 2.5,
				width: 85
			});


			$(".sparkline_line").sparkline([2, 4, 3, 4, 5, 4, 5, 4, 3, 4, 5, 6, 4, 5, 6, 3, 5], {
				type: 'line',
				lineColor: '#8e2de2',
				fillColor: '#f8eafa',
				width: 85,
				spotColor: '#f44336',
				minSpotColor: '#f44336'
			});


			$(".sparkline_pie").sparkline([1, 1, 2, 1], {
				type: 'pie',
				sliceColors: ['#00e682', '#ffa22b', '#6963ff', '#00ccb8']
			});


			$(".sparkline_discreet").sparkline([4, 6, 7, 7, 4, 3, 2, 1, 4, 4, 2, 4, 3, 7, 8, 9, 7, 6, 4, 3], {
				type: 'discrete',
				barWidth: 3,
				lineColor: '#f44336',
				width: '85',
			});



	});
		//---Knob chart
			$(".knob").knob({
				  change: function(value) {
					//console.log("change : " + value);
				  },
				  release: function(value) {
					//console.log(this.$.attr('value'));
					console.log("release : " + value);
				  },
				  cancel: function() {
					console.log("cancel : ", this);
				  },
				  /*format : function (value) {
				   return value + '%';
				   },*/
				  draw: function() {

					// "tron" case
					if (this.$.data('skin') == 'tron') {

					  this.cursorExt = 0.3;

					  var a = this.arc(this.cv) // Arc
						,
						pa // Previous arc
						, r = 1;

					  this.g.lineWidth = this.lineWidth;

					  if (this.o.displayPrevious) {
						pa = this.arc(this.v);
						this.g.beginPath();
						this.g.strokeStyle = this.pColor;
						this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, pa.s, pa.e, pa.d);
						this.g.stroke();
					  }

					  this.g.beginPath();
					  this.g.strokeStyle = r ? this.o.fgColor : this.fgColor;
					  this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, a.s, a.e, a.d);
					  this.g.stroke();

					  this.g.lineWidth = 2;
					  this.g.beginPath();
					  this.g.strokeStyle = this.o.fgColor;
					  this.g.arc(this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
					  this.g.stroke();

					  return false;
					}
				  }

				});



	//gauge chart
	var chart_gauge_settings = {
		  lines: 12,
		  angle: 0,
		  lineWidth: 0.4,
		  pointer: {
			  length: 0.75,
			  strokeWidth: 0.042,
			  color: '#e3edfc'
		  },
		  limitMax: 'false',
		  colorStart: '#ffa22b',
		  colorStop: '#ffa22b',
		  strokeColor: '#e9e9e9',
		  generateGradient: true
	  };


		if ($('#chart_gauge_01').length){

			var chart_gauge_01_elem = document.getElementById('chart_gauge_01');
			var chart_gauge_01 = new Gauge(chart_gauge_01_elem).setOptions(chart_gauge_settings);

		}


		if ($('#gauge-text').length){

			chart_gauge_01.maxValue = 6000;
			chart_gauge_01.animationSpeed = 32;
			chart_gauge_01.set(3200);
			chart_gauge_01.setTextField(document.getElementById("gauge-text"));

		}

		if ($('#chart_gauge_02').length){

			var chart_gauge_02_elem = document.getElementById('chart_gauge_02');
			var chart_gauge_02 = new Gauge(chart_gauge_02_elem).setOptions(chart_gauge_settings);

		}
		if ($('#gauge-text2').length){

			chart_gauge_02.maxValue = 9000;
			chart_gauge_02.animationSpeed = 32;
			chart_gauge_02.set(2400);
			chart_gauge_02.setTextField(document.getElementById("gauge-text2"));

		}

		if ($('#chart_gauge_03').length){

			var chart_gauge_03_elem = document.getElementById('chart_gauge_03');
			var chart_gauge_03 = new Gauge(chart_gauge_03_elem).setOptions(chart_gauge_settings);

		}
		if ($('#gauge-text3').length){

			chart_gauge_03.maxValue = 6000;
			chart_gauge_03.animationSpeed = 53;
			chart_gauge_03.set(5400);
			chart_gauge_03.setTextField(document.getElementById("gauge-text3"));

		}




