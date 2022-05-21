(function ($) {
	"use strict";
	$('.fc-month-button').addClass('fc-state-active');
	$('.fc-agendaWeek-button').removeClass('fc-state-active');
	// ______________Cover Image
	$(".cover-image").each(function () {
		var attr = $(this).attr('data-image-src');
		if (typeof attr !== typeof undefined && attr !== false) {
			$(this).css('background', 'url(' + attr + ') center center');
		}
	});

	$('.table-subheader').click(function () {
		$(this).nextUntil('tr.table-subheader').slideToggle(100);
	});

	// ______________ Horizonatl
	$(document).ready(function () {
		$("a[data-theme]").click(function () {
			$("head link#theme").attr("href", $(this).data("theme"));
			$(this).toggleClass('active').siblings().removeClass('active');
		});
		$("a[data-effect]").click(function () {
			$("head link#effect").attr("href", $(this).data("effect"));
			$(this).toggleClass('active').siblings().removeClass('active');
		});
	});


	// ______________Full screen
	$("#fullscreen-button").on("click", function toggleFullScreen() {
		if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
			if (document.documentElement.requestFullScreen) {
				document.documentElement.requestFullScreen();
			} else if (document.documentElement.mozRequestFullScreen) {
				document.documentElement.mozRequestFullScreen();
			} else if (document.documentElement.webkitRequestFullScreen) {
				document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
			} else if (document.documentElement.msRequestFullscreen) {
				document.documentElement.msRequestFullscreen();
			}
		} else {
			if (document.cancelFullScreen) {
				document.cancelFullScreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.webkitCancelFullScreen) {
				document.webkitCancelFullScreen();
			} else if (document.msExitFullscreen) {
				document.msExitFullscreen();
			}
		}
	})

	// ______________Active Class
	$(document).ready(function () {
		$(".horizontalMenu-list li a").each(function () {
			var pageUrl = window.location.href.split(/[?#]/)[0];
			if (this.href == pageUrl) {
				$(this).addClass("active");
				$(this).parent().addClass("active"); // add active to li of the current link
				$(this).parent().parent().prev().addClass("active"); // add active class to an anchor
				$(this).parent().parent().prev().click(); // click the item to make it drop
			}
		});
		$(".horizontal-megamenu li a").each(function () {
			var pageUrl = window.location.href.split(/[?#]/)[0];
			if (this.href == pageUrl) {
				$(this).addClass("active");
				$(this).parent().addClass("active");
				$(this).parent().parent().parent().parent().parent().parent().parent().prev().addClass("active");
				$(this).parent().parent().prev().click(); // click the item to make it drop
			}
		});
		$(".horizontalMenu-list .sub-menu .sub-menu li a").each(function () {
			var pageUrl = window.location.href.split(/[?#]/)[0];
			if (this.href == pageUrl) {
				$(this).addClass("active");
				$(this).parent().addClass("active"); // add active to li of the current link
				$(this).parent().parent().parent().parent().prev().addClass("active"); // add active class to an anchor
				$(this).parent().parent().prev().click(); // click the item to make it drop
			}
		});
	});

	// ___________TOOLTIP	
	// $('[data-toggle="tooltip"]').tooltip();
	// colored tooltip
	// $('[data-toggle="tooltip-primary"]').tooltip({
	// 	template: '<div class="tooltip tooltip-primary" role="tooltip"><div class="arrow"><\/div><div class="tooltip-inner"><\/div><\/div>'
	// });
	// $('[data-toggle="tooltip-secondary"]').tooltip({
	// 	template: '<div class="tooltip tooltip-secondary" role="tooltip"><div class="arrow"><\/div><div class="tooltip-inner"><\/div><\/div>'
	// });

	// __________POPOVER
	$('[data-toggle="popover"]').popover();
	$('[data-popover-color="head-primary"]').popover({
		template: '<div class="popover popover-head-primary" role="tooltip"><div class="arrow"><\/div><h3 class="popover-header"><\/h3><div class="popover-body"><\/div><\/div>'
	});
	$('[data-popover-color="head-secondary"]').popover({
		template: '<div class="popover popover-head-secondary" role="tooltip"><div class="arrow"><\/div><h3 class="popover-header"><\/h3><div class="popover-body"><\/div><\/div>'
	});
	$('[data-popover-color="primary"]').popover({
		template: '<div class="popover popover-primary" role="tooltip"><div class="arrow"><\/div><h3 class="popover-header"><\/h3><div class="popover-body"><\/div><\/div>'
	});
	$('[data-popover-color="secondary"]').popover({
		template: '<div class="popover popover-secondary" role="tooltip"><div class="arrow"><\/div><h3 class="popover-header"><\/h3><div class="popover-body"><\/div><\/div>'
	});
	$(document).on('click', function (e) {
		$('[data-toggle="popover"],[data-original-title]').each(function () {
			//the 'is' for buttons that trigger popups
			//the 'has' for icons within a button that triggers a popup
			if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
				(($(this).popover('hide').data('bs.popover') || {}).inState || {}).click = false // fix for BS 3.3.6
			}
		});
	});

	// __________MODAL
	// showing modal with effect
	$('.modal-effect').on('click', function (e) {
		e.preventDefault();
		var effect = $(this).attr('data-effect');
		$('#modaldemo8').addClass(effect);
	});
	// hide modal with effect
	$('#modaldemo8').on('hidden.bs.modal', function (e) {
		$(this).removeClass(function (index, className) {
			return (className.match(/(^|\s)effect-\S+/g) || []).join(' ');
		});
	});

	// ______________ Page Loading
	$(window).on("load", function (e) {
		$("#global-loader").fadeOut("slow");
	})

	// ______________Back to top Button
	$(window).on("scroll", function (e) {
		if ($(this).scrollTop() > 0) {
			$('body').addClass('side-shadow');
			$('#back-to-top').fadeIn('slow');
		} else {
			$('body').removeClass('side-shadow');
			$('#back-to-top').fadeOut('slow');
		}
	});
	$("#back-to-top").on("click", function (e) {
		$("html, body").animate({
			scrollTop: 0
		}, 600);
		return false;
	});

	// ______________ StarRating
	var ratingOptions = {
		selectors: {
			starsSelector: '.rating-stars',
			starSelector: '.rating-star',
			starActiveClass: 'is--active',
			starHoverClass: 'is--hover',
			starNoHoverClass: 'is--no-hover',
			targetFormElementSelector: '.rating-value'
		}
	};
	$(".rating-stars").ratingStars(ratingOptions);

	// ______________ Chart-circle
	if ($('.chart-circle').length) {
		$('.chart-circle').each(function () {
			let $this = $(this);

			$this.circleProgress({
				fill: {
					color: $this.attr('data-color')
				},
				size: $this.height(),
				startAngle: -Math.PI / 4 * 2,
				emptyFill: '#e5e9f2',
				lineCap: 'round'
			});
		});
	}
	// ______________ Chart-circle
	if ($('.chart-circle-primary').length) {
		$('.chart-circle-primary').each(function () {
			let $this = $(this);

			$this.circleProgress({
				fill: {
					color: $this.attr('data-color')
				},
				size: $this.height(),
				startAngle: -Math.PI / 4 * 2,
				emptyFill: 'rgba(68, 84, 195, 0.4)',
				lineCap: 'round'
			});
		});
	}

	// ______________ Chart-circle
	if ($('.chart-circle-secondary').length) {
		$('.chart-circle-secondary').each(function () {
			let $this = $(this);

			$this.circleProgress({
				fill: {
					color: $this.attr('data-color')
				},
				size: $this.height(),
				startAngle: -Math.PI / 4 * 2,
				emptyFill: 'rgba(247, 45, 102, 0.4)',
				lineCap: 'round'
			});
		});
	}

	// ______________ Chart-circle
	if ($('.chart-circle-success').length) {
		$('.chart-circle-success').each(function () {
			let $this = $(this);

			$this.circleProgress({
				fill: {
					color: $this.attr('data-color')
				},
				size: $this.height(),
				startAngle: -Math.PI / 4 * 2,
				emptyFill: 'rgba(45, 206, 137, 0.5)',
				lineCap: 'round'
			});
		});
	}

	// ______________ Chart-circle
	if ($('.chart-circle-warning').length) {
		$('.chart-circle-warning').each(function () {
			let $this = $(this);

			$this.circleProgress({
				fill: {
					color: $this.attr('data-color')
				},
				size: $this.height(),
				startAngle: -Math.PI / 4 * 2,
				emptyFill: '#e5e9f2',
				lineCap: 'round'
			});
		});
	}

	// ______________ Global Search
	$(document).on("click", "[data-toggle='search']", function (e) {
		var body = $("body");

		if (body.hasClass('search-gone')) {
			body.addClass('search-gone');
			body.removeClass('search-show');
		} else {
			body.removeClass('search-gone');
			body.addClass('search-show');
		}
	});
	var toggleSidebar = function () {
		var w = $(window);
		if (w.outerWidth() <= 1024) {
			$("body").addClass("sidebar-gone");
			$(document).off("click", "body").on("click", "body", function (e) {
				if ($(e.target).hasClass('sidebar-show') || $(e.target).hasClass('search-show')) {
					$("body").removeClass("sidebar-show");
					$("body").addClass("sidebar-gone");
					$("body").removeClass("search-show");
				}
			});
		} else {
			$("body").removeClass("sidebar-gone");
		}
	}
	toggleSidebar();
	$(window).resize(toggleSidebar);

	const DIV_CARD = 'div.card';
	// ______________ Tooltip
	// $('[data-toggle="tooltip"]').tooltip();

	// ______________ Popover
	$('[data-toggle="popover"]').popover({
		html: true
	});

	// ______________ Card Remove
	$(document).on('click', '[data-toggle="card-remove"]', function (e) {
		let $card = $(this).closest(DIV_CARD);
		$card.remove();
		e.preventDefault();
		return false;
	});

	// ______________ Card Collapse
	$(document).on('click', '[data-toggle="card-collapse"]', function (e) {
		let $card = $(this).closest(DIV_CARD);
		$card.toggleClass('card-collapsed');
		e.preventDefault();
		return false;
	});

	// ______________ Card Fullscreen
	$(document).on('click', '[data-toggle="card-fullscreen"]', function (e) {
		let $card = $(this).closest(DIV_CARD);
		$card.toggleClass('card-fullscreen').removeClass('card-collapsed');
		e.preventDefault();
		return false;
	});

	// sparkline1
	$(".sparkline_bar").sparkline([2, 4, 3, 4, 5, 4, 5, 4, 3, 4], {
		height: 20,
		type: 'bar',
		colorMap: {
			'7': '#a1a1a1'
		},
		barColor: '#ff5b51'
	});

	// sparkline2
	$(".sparkline_bar1").sparkline([3, 4, 3, 4, 5, 4, 5, 6, 4, 6,], {
		height: 20,
		type: 'bar',
		colorMap: {
			'7': '#c34444'
		},
		barColor: '#44c386'
	});

	// sparkline3
	$(".sparkline_bar2").sparkline([3, 4, 3, 4, 5, 4, 5, 6, 4, 6,], {
		height: 20,
		type: 'bar',
		colorMap: {
			'7': '#a1a1a1'
		},
		barColor: '#4454c3'
	});

	// ______________ SWITCHER-toggle ______________//
	/*Theme Layouts*/
	$(document).on("click", '#myonoffswitch10', function () {
		if (this.checked) {
			$('body').addClass('default-sidebar');
			$('body').removeClass('color-sidebar');
			$('body').removeClass('dark-sidebar');
			localStorage.setItem("default-sidebar", "True");
		}
		else {
			$('body').removeClass('default-sidebar');
			localStorage.setItem("default-sidebar", "false");
		}
	});
	/*Theme Layouts*/
	$(document).on("click", '#myonoffswitch12', function () {
		if (this.checked) {
			$('body').addClass('dark-sidebar');
			$('body').removeClass('color-sidebar');
			$('body').removeClass('default-sidebar');
			localStorage.setItem("dark-sidebar", "True");
		}
		else {
			$('body').removeClass('dark-sidebar');
			localStorage.setItem("dark-sidebar", "false");
		}
	});
	/*Theme Layouts*/
	$(document).on("click", '#myonoffswitch11', function () {
		if (this.checked) {
			$('body').addClass('color-sidebar');
			$('body').removeClass('default-sidebar');
			$('body').removeClass('dark-sidebar');
			localStorage.setItem("color-sidebar", "True");
		}
		else {
			$('body').removeClass('color-sidebar');
			localStorage.setItem("color-sidebar", "false");
		}
	});

	/*Theme Layouts*/
	$(document).on("click", '#myonoffswitch3', function () {
		if (this.checked) {
			$('body').addClass('card-radius');
			localStorage.setItem("card-radius", "True");
		}
		else {
			$('body').removeClass('card-radius');
			localStorage.setItem("card-radius", "false");
		}
	});

	/*Theme Layouts*/
	$(document).on("click", '#myonoffswitch4', function () {
		if (this.checked) {
			$('body').addClass('card-shadow');
			localStorage.setItem("card-shadow", "True");
		}
		else {
			$('body').removeClass('card-shadow');
			localStorage.setItem("card-shadow", "false");
		}
	});

	/*Theme Layouts*/
	$(document).on("click", '#myonoffswitch5', function () {
		if (this.checked) {
			$('body').addClass('default-body');
			$('body').removeClass('light-dark-body');
			$('body').removeClass('white-body');
			$('body').removeClass('default-leftmenu');
			$('body').removeClass('style1-leftmenu');
			localStorage.setItem("default-body", "True");
		}
		else {
			$('body').removeClass('default-body');
			localStorage.setItem("default-body", "false");
		}
	});

	/*Theme Layouts*/
	$(document).on("click", '#myonoffswitch6', function () {
		if (this.checked) {
			$('body').addClass('white-body');
			$('body').removeClass('default-body');
			$('body').removeClass('light-dark-body');
			$('body').removeClass('default-leftmenu');
			$('body').removeClass('style1-leftmenu');
			localStorage.setItem("white-body", "True");
		}
		else {
			$('body').removeClass('white-body');
			localStorage.setItem("white-body", "false");
		}
	});

	/*Theme Layouts*/
	$(document).on("click", '#myonoffswitch7', function () {
		if (this.checked) {
			$('body').addClass('light-dark-body');
			$('body').removeClass('default-body');
			$('body').removeClass('white-body');
			$('body').removeClass('default-leftmenu');
			$('body').removeClass('style1-leftmenu');
			localStorage.setItem("light-dark-body", "True");
		}
		else {
			$('body').removeClass('light-dark-body');
			localStorage.setItem("light-dark-body", "false");
		}
	});

	/*Theme Layouts*/
	$(document).on("click", '#myonoffswitch8', function () {
		if (this.checked) {
			$('body').addClass('light-mode');
			$('body').removeClass('dark-mode');
			$('body').removeClass('default-leftmenu');
			$('body').removeClass('style1-leftmenu');
			localStorage.setItem("light-mode", "True");
		}
		else {
			$('body').removeClass('light-mode');
			localStorage.setItem("light-mode", "false");
		}
	});
	$(document).on("click", '#myonoffswitch9', function () {
		if (this.checked) {
			$('body').addClass('dark-mode');
			$('body').removeClass('light-mode');
			$('body').removeClass('default-leftmenu');
			$('body').removeClass('style1-leftmenu');
			localStorage.setItem("dark-mode", "True");
		}
		else {
			$('body').removeClass('dark-mode');
			localStorage.setItem("dark-mode", "false");
		}
	});

	/*Theme Layouts*/
	$(document).on("click", '#myonoffswitch13', function () {
		if (this.checked) {
			$('body').addClass('default-horizontal');
			$('body').removeClass('color-horizontal');
			$('body').removeClass('dark-horizontal');
			$('body').removeClass('default-leftmenu');
			$('body').removeClass('style1-leftmenu');
			localStorage.setItem("default-horizontal", "True");
		}
		else {
			$('body').removeClass('default-horizontal');
			localStorage.setItem("default-horizontal", "false");
		}
	});
	/*Theme Layouts*/
	$(document).on("click", '#myonoffswitch14', function () {
		if (this.checked) {
			$('body').addClass('dark-horizontal');
			$('body').removeClass('color-horizontal');
			$('body').removeClass('default-horizontal');
			$('body').removeClass('default-leftmenu');
			$('body').removeClass('style1-leftmenu');
			localStorage.setItem("dark-horizontal", "True");
		}
		else {
			$('body').removeClass('dark-horizontal');
			localStorage.setItem("dark-horizontal", "false");
		}
	});
	/*Theme Layouts*/
	$(document).on("click", '#myonoffswitch15', function () {
		if (this.checked) {
			$('body').addClass('color-horizontal');
			$('body').removeClass('default-horizontal');
			$('body').removeClass('dark-horizontal');
			$('body').removeClass('default-leftmenu');
			$('body').removeClass('style1-leftmenu');
			localStorage.setItem("color-horizontal", "True");
		}
		else {
			$('body').removeClass('color-horizontal');
			localStorage.setItem("color-horizontal", "false");
		}
	});

	/*Left-menu-style1*/
	$(document).on("click", '#myonoffswitch16', function () {
		if (this.checked) {
			$('body').addClass('default-leftmenu');
			$('body').removeClass('style1-leftmenu');
			localStorage.setItem("default-leftmenu", "True");
		}
		else {
			$('body').removeClass('default-leftmenu');
			localStorage.setItem("default-leftmenu", "false");
		}
	});
	$(document).on("click", '#myonoffswitch17', function () {
		if (this.checked) {
			$('body').addClass('style1-leftmenu');
			$('body').removeClass('default-leftmenu');
			localStorage.setItem("default-leftmenu", "True");
		}
		else {
			$('body').removeClass('style1-leftmenu');
			localStorage.setItem("style1-leftmenu", "false");
		}
	});

})(jQuery);

