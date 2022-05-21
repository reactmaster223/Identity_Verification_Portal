(function($) {
	"use strict";
	
	// ______________Active Class
	$(".app-sidebar li a").each(function() {
	  var pageUrl = window.location.href.split(/[?#]/)[0];
		if (this.href == pageUrl) { 
			$(this).addClass("active");
			$(this).parent().addClass("active"); // add active to li of the current link
			$(this).parent().parent().prev().addClass("active"); // add active class to an anchor
			$(this).parent().parent().prev().click(); // click the item to make it drop
		}
	}); 
	
	
	//Active Class
	$(".app-sidebar li a").each(function() {
		var pageUrl = window.location.href.split(/[?#]/)[0];
		if (this.href == pageUrl) {
			$(this).addClass("active");
			$(this).parent().addClass("active"); // add active to li of the current link
			$(this).parent().addClass("resp-tab-content-active"); // add active to li of the current link
			$(this).parent().parent().parent().prev().addClass("active"); // add active class to an anchor
			$(this).parent().parent().parent().prev().click(); // click the item to make it drop
		}
	});
	
	$(".submenu-list li a").each(function() {
		var pageUrl = window.location.href.split(/[?#]/)[0];
		if (this.href == pageUrl) {
			$(this).addClass("active");
			$(this).parent().parent().parent().parent().parent().addClass("active"); // add active to li of the current link
			$(this).parent().parent().parent().parent().parent().addClass("resp-tab-content-active"); // add active to li of the current link
			$(this).parent().parent().parent().prev().addClass("active"); // add active class to an anchor
			$(this).parent().parent().parent().prev().click(); // click the item to make it drop
		}
	});
	
	$(document).ready(function(){		
		
		if ($('.dashboard-dashtic.active').hasClass('active'))
        $('li.dashboard-dashtic').addClass('active');
	
		if ($('.app-dashtic.active').hasClass('active'))
        $('li.app-dashtic').addClass('active');
	
		if ($('.widget-dashtic.active').hasClass('active'))
        $('li.widget-dashtic').addClass('active');
	
		if ($('.forms-dashtic.active').hasClass('active'))
        $('li.forms-dashtic').addClass('active');
		
		if ($('.chart-dashtic.active').hasClass('active'))
        $('li.chart-dashtic').addClass('active');
	
		if ($('.map-dashtic.active').hasClass('active'))
        $('li.map-dashtic').addClass('active');
	
		if ($('.element-dashtic.active').hasClass('active'))
        $('li.element-dashtic').addClass('active');
	
		if ($('.icons-dashtic.active').hasClass('active'))
        $('li.icons-dashtic').addClass('active');
	
		if ($('.pages-dashtic.active').hasClass('active'))
        $('li.pages-dashtic').addClass('active');
		
		if ($('.ecommerce-dashtic.active').hasClass('active'))
        $('li.ecommerce-dashtic').addClass('active');
		
		if ($('.basic-dashtic.active').hasClass('active'))
        $('li.basic-dashtic').addClass('active');
	
		if ($('.account-dashtic.active').hasClass('active'))
        $('li.account-dashtic').addClass('active');
	
		if ($('.error-dashtic.active').hasClass('active'))
        $('li.error-dashtic').addClass('active');
	
	});
	
	
	// VerticalTab
	$('#sidemenu-Tab').easyResponsiveTabs({
		type: 'vertical',
		width: 'auto', 
		fit: true, 
		closed: 'accordion',
		tabidentify: 'hor_1',
		activate: function(event) {
			var $tab = $(this);
			var $info = $('#nested-tabInfo2');
			var $name = $('span', $info);
			$name.text($tab.text());
			$info.show();
		}
	});
	
	const ps11 = new PerfectScrollbar('.first-sidemenu', {
	  useBothWheelAxes:true,
	  suppressScrollX:true,
	});
	const ps12 = new PerfectScrollbar('.second-sidemenu', {
	  useBothWheelAxes:true,
	  suppressScrollX:true,
	});
	
})(jQuery);