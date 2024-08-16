$(function(){
	tl = TweenMax;

	var bgAttr = $('.main_slider .item1 .bg').css('background');
	$(".main_slider").css("background",bgAttr);

	tl.staggerFromTo($("header"), 0.6, {opacity:0}, {opacity: 1, delay:0.7, ease: Power1.easeInOut});
	tl.staggerFromTo($("section.main_home .arrows .arrow"), 0.6, {opacity:0}, {opacity: 1, delay:1, ease: Power1.easeInOut});
	tl.staggerFromTo($("#scroll_down a"), 0.8, {opacity:0,y:'-100%',scale:'1'}, {opacity: 1,y:'0px', scale:'1', delay:0.9, ease: Power1.easeInOut});
	tl.staggerFromTo($(".main_slider .item .bg"), 2, {opacity:1}, {opacity: 1, ease: Power1.easeInOut});


	//height 모바일 높이 대응
	function resetHeight(){
		$('.main_home').css('height', $(window).innerHeight());
	}
	window.addEventListener("resize", resetHeight);
	resetHeight();


	var mainSlider = new Swiper('.main_slider', {
		effect: 'fade',
		speed: 1300,
		loop:true,
		autoplay: {
			delay:4500,
		},
		fadeEffect: {
			crossFade: true,
			// disableOnInteraction: false,
		 },
		navigation: {
			nextEl: '.main_home .arrows .next',
			prevEl: '.main_home .arrows .prev',
		},
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
		allowTouchMove:false,
		simulateTouch:false,
		on: {
			init: function () {
				/*$('.main_slider .item1').removeClass('swiper-slide-active');*/
			},
			transitionStart: function () {
				var secNum = this.activeIndex +1;
				$('.main_slider .item'+secNum).addClass('ani');
				$('.main_slider .item').removeClass('first');
				tl.staggerFromTo($(".main_slider .item.swiper-slide-active .bg span"), 5, {scale:'1.1'}, {scale:'1', ease: Power3.linear});
			},
			transitionEnd: function () {
				var secNum = this.activeIndex +1;
				var bgAttr = $('.main_slider .item'+secNum+'').css('background');
				$(".main_slider").css("background",bgAttr);
			},

		},
	});
	
	var serviceSlider = new Swiper(".app_slider", {
		freeMode: true,
		cssMode:true,
		slidesPerView: "auto",
		speed: 900,
		navigation: {
			nextEl: '.application_ex .arrows .button_next',
			prevEl: '.application_ex .arrows .button_prev',
		},
	  });

	$.each($(".split"), function(i, v){
		var mainText = $(this);
		var animatedMainT = $(this).text().split("");

		mainText.empty();
		$.each(animatedMainT, function(i, v) {
			mainText.append('<p><span>'+v+'</span><span>'+v+'</span></p>');
		});
	});

	
	var solutionSlider = $('.solution .solution_list');
	var newsSlider = $('.news_notice .board_list');
	var solutionSlickOptions = { 
		speed: 700,
		slidesToShow: 1,
		variableWidth: true,
		infinite: false,
		arrows: false,
		touchMove:true,
		swipe:true,
	  };  
	var newsSlickOptions = { 
		speed: 700,
		slidesToShow: 1,
		variableWidth: true,
		infinite: false,
		arrows: false,
		touchMove:true,
		swipe:true,
	  };  
	$(window).on('load resize', function() { 
		if($(window).width() > 1279) { 
			solutionSlider.filter('.slick-initialized').slick('unslick');
			newsSlider.filter('.slick-initialized').slick('unslick');
		}else{ 
			solutionSlider.not('.slick-initialized').slick(solutionSlickOptions); 
			newsSlider.not('.slick-initialized').slick(newsSlickOptions); 
		} 
	});
	if($(window).width() > 1279) { 
		solutionSlider.filter('.slick-initialized').slick('unslick');
		newsSlider.filter('.slick-initialized').slick('unslick');
	}else{ 
		solutionSlider.not('.slick-initialized').slick(solutionSlickOptions); 
		newsSlider.not('.slick-initialized').slick(newsSlickOptions); 
	} 

});