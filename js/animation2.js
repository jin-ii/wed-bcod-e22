var main = main || {};
var visualSwiper;

var progressTimeline,
    $controllerBtn = $(".controller_btn").find("a");

// 재생 정지 함수
function controllor(toggle){
    if (toggle == 'play'){
        $controllerBtn.removeClass('play').addClass('pause');
        $controllerBtn.attr('data-play', 'play');
        progressTimeline.play();
        $('.main_slide').find('.swiper-slide-active').find('video').trigger('play');
        
        // progress가 완료가 된상태에 클릭했을때 pause 면
        if(progressTimeline.progress() == 1){
            visualSwiper.slideNext(1000);
        }
        
    } else if(toggle == 'pause'){
        $controllerBtn.removeClass('pause').addClass('play');
        $controllerBtn.attr('data-play', 'pause');
        progressTimeline.pause();
        $('.main_slide').find('.swiper-slide-active').find('video').trigger('pause');
    }
}
main.utils = {
    /**
	 * main.utils.mainVisual() - 메인 상단 비주얼
	 */

    mainVisual: function(){
        var headerActive;
        visualSwiper = new Swiper('.main_slide', {
            effect: 'fade',
            loop: true,
            speed: 1000,
            touchRatio: 0,
            observer: true,
            observeParents: true,
            initialSlide:0,
            pagination: {
                el: '.main_slide .pagination',
                clickable: true,
            },
            on: {
                slideChangeTransitionStart: function(){
                    progressPagination();
                },
            }
        });

        ScrollTrigger.matchMedia({
            "(min-width: 1025px)": function() {
                visual_Motion = gsap.timeline({
                    scrollTrigger: {
                        trigger: ".sec_visual",
                        scrub: 0.5,
                        pin: true,
                        start:'30px top',
                        end:'200% bottom',
                        invalidateOnRefresh: true,
                        onEnter:function(){
                            gsap.to($('.swiper-slide .video_wrap'),1,{
                                y:0,
                                onStart:function(){
                                    headerActive = setTimeout(function(){
                                        $('#wrap').addClass('active');
                                    },700);
                                }
                            })
                            gsap.to($('.swiper-slide .video_wrap .dim'),1,{
                                width:0,
                            })
                            $('.swiper-slide').addClass('active');
                            $('.sec_visual .control_box').addClass('active');
                            $('.sec_visual .bottom_box').addClass('active');
                        },
                        onLeaveBack:function(){
                            gsap.to($('.swiper-slide .video_wrap'),1,{
                                y:'70vh'
                            })
                            gsap.to($('.swiper-slide .video_wrap .dim'),1,{
                                width:'12.6%',
                            })
                            $('.swiper-slide').removeClass('active');
                            $('.sec_visual .control_box').removeClass('active');
                            $('.sec_visual .bottom_box').removeClass('active');
                            clearTimeout(headerActive);
                            $('#wrap').removeClass('active');
                        },
                    }
                });
            },
            "(max-width: 1024px)": function() {
                $('.swiper-slide').removeClass('active');
                $('.swiper-slide .txt_box strong').removeAttr('style');
                $('.swiper-slide .txt_box span').removeAttr('style');
                visual_Motion_pin = gsap.timeline({
                    scrollTrigger: {
                        trigger: ".sec_visual",
                        scrub: 0.5,
                        pin: true,
                        start:'20px top',
                        end:'200% bottom',
                        invalidateOnRefresh: true,
                        onLeaveBack:function(){
                            $('#wrap.header_white').removeClass('active');
                        },
                    }
                });

                visual_Motion1 = gsap.timeline({
                    scrollTrigger: {
                        trigger: ".sec_visual",
                        scrub: 0.5,
                        start:'20px top',
                        end:'150% bottom',
                        invalidateOnRefresh: true,
                    }
                }).fromTo($('.sec_visual .bottom_box'),1,{
                    bottom:'-100%'
                },{
                    bottom:'0'
                });

                visual_Motion2 = gsap.timeline({
                    scrollTrigger: {
                        trigger: ".sec_visual",
                        scrub: 0.5,
                        start:'20px top',
                        end:'150% bottom',
                        invalidateOnRefresh: true,
                        onUpdate:function(self){
                            if(self.progress > 0.05){
                                $('.sec_visual .control_box').addClass('active');
                            }else{
                                $('.sec_visual .control_box').removeClass('active');
                            }
                            if(self.progress > 0.7){
                                $('#wrap.header_white').addClass('active');
                            }else{
                                $('#wrap.header_white').removeClass('active');
                            }
                        }
                    }
                }).fromTo($('.swiper-slide .video_wrap'),1,{
                    y:'71.5vh'
                },{
                    y:'0',
                });

                visual_Motion3 = gsap.timeline({
                    scrollTrigger: {
                        trigger: ".sec_visual",
                        scrub: 0.5,
                        start:'20px top',
                        end:'150% bottom',
                        invalidateOnRefresh: true,
                    }
                }).fromTo($('.swiper-slide .video_wrap .dim'),1,{
                    width:'16px'
                },{
                    width:'0'
                });

                visual_Motion4 = gsap.to($('.swiper-slide .txt_box strong'),1,{
                    color: 'white',
                    scrollTrigger: {
                        trigger: ".sec_visual",
                        scrub: 1,
                        start:'20px top',
                        end: 'bottom 50%',
                        invalidateOnRefresh: true,
                    }
                })

                visual_Motion5 = gsap.to($('.swiper-slide .txt_box span'),1,{
                    color: 'white',
                    scrollTrigger: {
                        trigger: ".sec_visual",
                        scrub: 1,
                        start:'20px top',
                        end: 'bottom 50%',
                        invalidateOnRefresh: true,
                    }
                })
            }
        });

        

        // 프로그래스 바
        // 영상일 경우 해당 영상 길이에 맞게 진행
        
        function progressPagination(){
            var parent = $('.sec_visual'),
                bullet = parent.find('.bottom_box').find('.current_bar');

            if(progressTimeline){
                progressTimeline.kill();
            }
            setTimeout(function() {
                var video = parent.find('.swiper-slide').find('video'),
                    activeVideo = parent.find('.swiper-slide-active').find('video'),
                    initVideo = activeVideo.length == 0 ? $(".swiper-slide").eq(0).find("video") : activeVideo,
                    duration,
                
                    duration = parseInt(initVideo.get(0).duration) - 0.05;
                    video.trigger('pause');
                    initVideo.get(0).currentTime = 0;
                    
                    if($controllerBtn.attr('data-play') == 'pause'){
                        initVideo.trigger('pause');
                    } else{
                        initVideo.trigger('play');
                    }

                progressTimeline = gsap.timeline()
                .fromTo(bullet, duration , {
                    width:"0%",
                },{
                    width:"100%",
                    ease: "none",
                    onComplete: function(){
                        // progress 완료 시점
                        // data 값이 play 면 다음으로 넘겨주고 ,stop 이면 video pause
                        if ($controllerBtn.attr('data-play') == 'play'){
                            visualSwiper.slideNext(1000);
                            if($(window).scrollTop() == 0){
                                if(smoother){
                                    if($(window).width() > 1024){
                                        smoother.scrollTo(31);
                                    }else{
                                        smoother.scrollTo(370,1000);
                                    }
                                }else{
                                    if($(window).width() < 1024){
                                        $('html,body').stop().animate({scrollTop:370},1000);
                                    }else{
                                        $('html,body').stop().animate({scrollTop:31},0);
                                    }
                                }
                            }
                        }
                    }
                });
                if($controllerBtn.attr('data-play') == 'pause'){
                    progressTimeline.pause();
                }
            }, 700);
        };

        // 재생 정지 버튼
        $controllerBtn.on("click", function(){
            if($(this).attr('data-play') == 'pause'){
                controllor('play');
            } else{
                controllor('pause');
            }
        });
    },
    /**
	 * main.utils.businessSlide() - 사업영역 슬라이드
	 */
    businessSlide: function(){
        var $businessSlide = $('.business_slide'),
            $pagination = $businessSlide.find('.swiper-pagination'),
            $businessSlideList = $businessSlide.find('.swiper-slide').length,
            $NumberBox = $businessSlide.find('.current_box');

        $businessSlide.find('.current_box').find('.total').text($businessSlideList);
        var realIndex = 0,
            flag = true,
            headerflag = false;
        swiper = new Swiper($businessSlide, {
            speed: 1000,
            direction: 'vertical',
            mousewheel: true,
            observer: true,
            obsreveParents: true,
            pagination: {
                el: '.business_slide .swiper-pagination',
                clickable: true,
            },
            watchOverflow : true,
            on: {
                slideChange: function() {
                    realIndex = this.realIndex;
                    $businessSlide.find('.current_box').find('.current').text(realIndex + 1);
                    flag = false;
                    $businessSlide.find(".swiper-slide").find('.txt_box').removeClass('active');
                    $businessSlide.find(".swiper-slide").eq(this.realIndex).find('.txt_box').addClass('active');
                    setTimeout(function () {
                        swiper.params.touchReleaseOnEdges = false;  
                        swiper.params.mousewheel.releaseOnEdges = false;
                    });
                },
                reachEnd: function() {
                    setTimeout(function () {
                        swiper.params.touchReleaseOnEdges = true;
                        swiper.params.mousewheel.releaseOnEdges = true;
                    }, 50);
                },
                    reachBeginning: function() {
                    setTimeout(function () {
                        swiper.params.touchReleaseOnEdges = true;
                        swiper.params.mousewheel.releaseOnEdges = true;
                    }, 50);
                },
                slideChangeTransitionEnd:function(){
                    flag = true;
                }
            },
            breakpoints: {
                1024: {
                    direction: 'horizontal',
                },
            },
        });

        var businessSlideObserver = ScrollTrigger.observe({
            target: $businessSlide,
            type: "wheel,touch",
            onUp:function(){
                if(realIndex == 0){
                    if(flag && smoother){
                        smoother.paused(false);
                    }
                }
                if(headerflag){
                    $body.attr('data-scroll','up');
                    $header.removeClass('active');
                }
            },
            onDown:function(){
                if(realIndex == $businessSlide.find(".swiper-slide").length - 1){
                    if(flag && smoother){
                        smoother.paused(false);
                    }
                }
                if(headerflag){
                    $body.attr('data-scroll','down');
                    $header.addClass('active');
                }
            },
        });

        ScrollTrigger.matchMedia({
            "(min-width: 1025px)": function() {
                business_Motion = gsap.timeline({
                    scrollTrigger: {
                        trigger: ".sec01",
                        scrub: 0.5,
                        invalidateOnRefresh: true,
                        pin:true,
                        start:'top top',
                        end:'70% top',
                        onEnter:function(){
                            // if(smoother){
                            //     smoother.paused(true);
                            // }
                            headerflag = true;
                            setTimeout(function(){
                                $('.slide_dim').addClass('on');
                            },200);
                            $('#header').addClass("scroll");
                            $('#quickMenu').addClass('on');
                            $businessSlide.find('.top_txt').addClass('active');
                            $businessSlide.find(".swiper-slide").eq(realIndex).find('.txt_box').addClass('active');
                            $pagination.addClass('active');
                            if(smoother){
                                $businessSlide.hover(function(){
                                    smoother.paused(true);
                                },function(){
                                    smoother.paused(false);
                                });
                            }
        
                        },
                        onEnterBack:function(){
                            // if(smoother){
                            //     smoother.paused(true);
                            // }
                            headerflag = true;
                            setTimeout(function(){
                                $('.slide_dim').addClass('on');
                            },200);
                            if(smoother){
                                $businessSlide.hover(function(){
                                    smoother.paused(true);
                                },function(){
                                    smoother.paused(false);
                                });
                            }
                        },
                        onLeaveBack:function(){
                            headerflag = false;
                            setTimeout(function(){
                                $('.slide_dim').removeClass('on');
                            },200);
                            $('#header').removeClass("scroll");
                            $('#quickMenu').removeClass('on');
                            $businessSlide.find('.top_txt').removeClass('active');
                            $businessSlide.find(".swiper-slide").eq(realIndex).find('.txt_box').removeClass('active');
                            $pagination.removeClass('active');
                        },
                        onLeave:function(){
                            headerflag = false;
                            setTimeout(function(){
                                $('.slide_dim').removeClass('on');
                            },200);
                        },
                    }
                });
                business_Motion1 = gsap.timeline({
                    scrollTrigger: {
                        trigger: ".sec01",
                        scrub: 0.5,
                        start:'-50% top',
                        end:'top top',
                        invalidateOnRefresh: true,
                    }
                }).to('.sec01 .business_slide',{
                    width:'90.4%',
                    height:'81vh'
                });
            },
            "(max-width: 1024px)": function() {
                business_Motion = gsap.timeline({
                    scrollTrigger: {
                        trigger: ".sec01",
                        scrub: 0.5,
                        invalidateOnRefresh: true,
                        start:'top top',
                        end:'70% top',
                        onEnter:function(){
                            headerflag = true;
                            $('#header').addClass("scroll");
                            $('#quickMenu').addClass('on');
                            $businessSlide.find('.top_txt').addClass('active');
                            $businessSlide.find(".swiper-slide").eq(realIndex).find('.txt_box').addClass('active');
                            $pagination.addClass('active');
                            $NumberBox.addClass('active');
        
                        },
                        onEnterBack:function(){
                            headerflag = true;
                        },
                        onLeaveBack:function(){
                            headerflag = false;
                            $('#header').removeClass("scroll");
                            $('#quickMenu').removeClass('on');
                            $businessSlide.find('.top_txt').removeClass('active');
                            $businessSlide.find(".swiper-slide").eq(realIndex).find('.txt_box').removeClass('active');
                            $pagination.removeClass('active');
                            $NumberBox.removeClass('active');
                        },
                        onLeave:function(){
                            headerflag = false;
                        },
                    }
                });
                gsap.set([".sec01"],{clearProps:"all"});
                business_Motion1 = gsap.timeline({
                    scrollTrigger: {
                        trigger: ".sec01",
                        scrub: 0.5,
                        start:'-50% top',
                        end:'top top',
                        invalidateOnRefresh: true,
                    }
                }).to('.sec01 .business_slide',{
                    width:'93.75%',
                    height:'calc(100% - 180px)'
                });
            },
        });
        

    },
    /**
	 * main.utils.productSearch() - 제품검색
	 */
    productSearch: function(){
        var $el = $('.product_search_popup');
        $el.find('.checkbox_area input').on('click',function(){
            var productVal = $(this).siblings().text();
            if($(this).is(':checked')){
                var _html = '';
                    _html+= '<a href="javascript:void(0)" class="btn tag"><span>' + productVal + '<span></a>';
                $el.find('.filter_wrap').find('.filter_box').append(_html);
            } else {
                $('.filter_box .tag').each(function(idx, item) {
                    if(productVal == $(item).text()) {
                        $(this).remove(); 
                    }
                })
            }
        });

        $el.find('.reset').on('click',function(){
            $el.find('.custom_checkbox .checkbox_area input').prop('checked',false);
            $el.find('.filter_box').find('.tag').remove();
        });

        $(document).on('click','.filter_box .tag',function(){
            var thisData = $(this).text();
            $(this).remove();
            $('.product_list_wrap .list li').each(function(idx,item){
                if(thisData == $(item).find('.checkbox_area').find('label').text()){
                    $(item).find('.checkbox_area').find('input').prop('checked',false);
                }
            })
        });

        $(window).on('load resize', function(){
            var $Listwrap = $('.product_list_wrap'),
                $Listbox = $Listwrap.find('.list_box');
            if($(window).width() < 1023){
                $Listbox.each(function(idx, item){
                    var $accoTit = $(item).find('>a'),
                        $accoCont = $(item).find('.list');
                    $accoTit.attr("title", "내용 열기");

                    $accoTit.off('click').on('click',function(e){
                        e.preventDefault();
                        $(item).toggleClass("active");
                        if ($(item).is(".active")) {
                            $accoTit.attr("title", "내용 닫기").parent().siblings().find('.acco_tit').attr("title", "내용 열기");
                            $accoCont.stop().slideDown();
                            $(item).siblings().removeClass("active").children(".list").stop().slideUp();
                        } else {
                            $accoTit.attr("title", "내용 열기");
                            $accoCont.stop().slideUp();
                        };
                    });
                });
            }else{
                $Listbox.find('>a').off('click');
                $Listbox.find('.list').removeAttr('style');
                $Listbox.removeClass('active');
            }
        });

        ScrollTrigger.matchMedia({
            "(min-width: 1025px)": function() {
                var group_motion = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.sec02',
                        start: 'top 30%',
                        end: 'top 30%',
                        scrub: 2,
                    }
                }).fromTo('.group_area',{
                    y: 0,
                    opacity: 0,
                    stagger : 0.2
                },{
                    y: 30,
                    opacity: 1,
                    stagger : 0.2
                }).to('.sec02', {css: {className: 'sec sec02 active'}});
            },
        });
    },
    /**
	 * main.utils.solutionSlide() - 솔루션 슬라이드
	 */
    solutionSlide: function(){
        var businessSwiper = new Swiper('.solution_slide', {
            slidesPerView: 1.2,
            spaceBetween: 50,
            speed: 1000,
            pagination: {
                el: ".solution_slide .swiper-pagination",
                type: "fraction",
            },
              navigation: {
                nextEl: ".solution_slide .swiper-button-next",
                prevEl: ".solution_slide .swiper-button-prev",
            },
            breakpoints: {
                1439: {
                    slidesPerView: 1.15,
                    spaceBetween: 50,
                },
                1024: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                },
            },
        });

    },
    /**
	 * main.utils.getCookie - 쿠기값 가져오기
	 */
    getCookie: function(cookie_name){
        var isCookie = false;
        var start, end;
        var i = 0;
    
        // cookie 문자열 전체를 검색
        while (i <= document.cookie.length) {
            start = i;
            end = start + cookie_name.length;
            // cookie_name과 동일한 문자가 있다면
            if (document.cookie.substring(start, end) == cookie_name) {
                isCookie = true;
                break;
            }
            i++;
        }
    
        // cookie_name 문자열을 cookie에서 찾았다면
        if (isCookie) {
            start = end + 1;
            end = document.cookie.indexOf(";", start);
            // 마지막 부분이라는 것을 의미(마지막에는 ";"가 없다)
            if (end < start) end = document.cookie.length;
            // cookie_name에 해당하는 value값을 추출하여 리턴한다.
            return document.cookie.substring(start, end);
        }
        // 찾지 못했다면
        return "";
    },
	/**
	 * main.utils.setCookie - 쿠기값 설정하기
	 */
    setCookie: function(name, value, expiredays){
        var todayDate = new Date();
        todayDate.setDate(todayDate.getDate() + expiredays);
        document.cookie = name + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";";
    },

    /**
	 * main.utils.enterkey - 포커스잡기 // 팝업일 경우 팝업내에만 포커스 가능하게
	 */
    enterkey: function($el){
        $($el).attr("tabindex", 0).focus();
    
        $($el).on({
            "keydown": function (e) {
                var focusList = $($el).find('input, a');
                var firstFocus = focusList.eq(0);
                var lastFocus = focusList.eq(focusList.length - 1);
    
                firstFocus.on({
                    'keydown': function (e) {
                        if (e.shiftKey && e.keyCode == 9) {
                            e.preventDefault();
                            $(lastFocus).focus();
                        }
                    }
                });
    
                lastFocus.on({
                    'keydown': function (e) {
                        if (!e.shiftKey && e.keyCode == 9) {
                            e.preventDefault();
                            $(firstFocus).focus();
                        }
                    }
                });
            }
        });
    },

    /**
	 * main.utils.mainPopup() - 메인팝업
     * @param {string} el - 해당 팝업 엘리먼트
	 */
    mainPopup: function(el){
        var $el = $(el),
			$popupMultiple = $el.find(".popup-multiple"),
			$swiperContainer = $popupMultiple.find(".swiper-container"),
			$btnMultipleClose = $popupMultiple.find(".btm-cont__close"),
			popupMultipleLen = $popupMultiple.find(".swiper-slide").length,
			popupSwiper3;

            

		function initSwiper() {
			// 1개 이상일 경우 실행
			if (popupMultipleLen > 1) {
				popupSwiper3 = new Swiper($swiperContainer, {
					observer: true,
					observeParents: true,
					pagination: {
						el: $popupMultiple.find(".swiper-pagination"),
						clickable: true,
					},
				});
			} else {
				$popupMultiple.find(".swiper-pagination").hide();
			}
		}
		initSwiper();

		function popupMultipleOpen(el) {
			$("body").addClass("pop_open");
			$(el).addClass("popup-multiple--open");
		}
		function popupMultipleClose() {
			$("body").removeClass("pop_open");
			$popupMultiple.removeClass("popup-multiple--open");

			// slide 닫기 후 첫번째 슬라이드로 이동
			setTimeout(function () {
                if(popupSwiper3){
                    popupSwiper3.slideTo(0, 100);
                }
			}, 400);
		}

        if(popupMultipleLen > 0){
            if (main.utils.getCookie("mainPopupCheck") !== "no") {
                popupMultipleOpen(".popup-multiple");
                main.utils.enterkey(".popup-multiple");
            } else{
                $el.hide();
            }
        } else{
            $el.remove();
        }
        // $focusTarget = $(this);

		$btnMultipleClose.on("click", function () {
			var popupId = $(this).closest(".popup-multiple").attr("id");
			var $this = $("#" + popupId);

			// setCookie
			if ($this.find("input[name='todayClose']").prop("checked")) {
				main.utils.setCookie(popupId + "Check", "no", 1); // 하루 쿠키 적용(마지막 인자값이 날자임)
			}

			popupMultipleClose();
			$popupMultiple.attr("tabindex", "");
			// $focusTarget.focus();
		});

		$popupMultiple.on('click', function (e) {
			if ($(e.target).is('.pop_bg') || $(e.target).is('.btm-cont__close')) {
				popupMultipleClose();
				$popupMultiple.attr("tabindex", "");
				// $focusTarget.focus();
			}
		});
    },
    init: function (){
        main.utils.mainVisual();
        main.utils.businessSlide();
        main.utils.productSearch();
        main.utils.solutionSlide();
    }
}

main.utils.init();
