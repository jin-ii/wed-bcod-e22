const ani1 = gsap.timeline();
ani1.from("#main_section1 h3 span.text1",{autoAlpha: 0, duration: .5, x: 0 , y:-50})
    .from("#main_section1 h3 span.text2",{autoAlpha: 0, duration: .5, x:0, y: -50})    
    .from("#main_section1 h3 span.line",{autoAlpha: 0, duration: 1, x:0, width:0})
    .from("#main_section1 h3 span.text3",{autoAlpha: 0, duration: .5, y: 50})
    .from("#main_section1 span.text4",{autoAlpha: 0, duration: .5, y: 100})
    .from("#main_section1 span.text5",{autoAlpha: 0, duration: .5, y: 100})

    ScrollTrigger.create({
        trigger: "#main_section1",
        start: "top center",
        end: "bottom center",
        toggleActions: "play none none reverse",
        onEnter: () => ani1.play(),
        onLeave: () => ani1.reverse(),
        onEnterBack: () => ani1.play(),
        onLeaveBack: () => ani1.reverse(),
        markers: false
    }); 





    // 스무스 스크롤 초기화 함수
function initSmoothScroll(wrapperSelector, contentSelector) {
    return ScrollSmoother.create({
      wrapper: wrapperSelector,
      content: contentSelector,
      normalizeScroll: true,
      ignoreMobileResize: true,
      smooth: 1,
      effects: true,
    });
  }
  
  // 비즈니스 슬라이드 초기화 함수
  function initBusinessSlide(slideSelector, paginationSelector) {
    
    const $businessSlide = document.querySelector(slideSelector);
    
    const swiper = new Swiper($businessSlide, {
      direction: "vertical",
      slidesPerView: 1,
      mousewheel: false,
      pagination: {
        el: paginationSelector,
        clickable: true,
      },
      on: {
        slideChange: function () {
          $businessSlide.querySelectorAll(".business_box .area_text1").forEach((el) => el.classList.remove("active"));
          $businessSlide
            .querySelectorAll(".business_box")
            [this.activeIndex].querySelector(".area_text1")
            .classList.add("active");
        },
      },
      breakpoints: {
        1024: {
          direction: "horizontal",
        },
      },
    });
    return swiper;
  }
  
  // 스크롤 트리거 생성 함수
  function createScrollTrigger(triggerSelector, swiper, topTextSelector) {
    ScrollTrigger.create({
      trigger: triggerSelector,
      start: "top top",
      end: "bottom top",
      pin: true,
      onUpdate: function (self) {
        const slideIndex = Math.round(self.progress * (swiper.slides.length - 1));
        if (swiper.activeIndex !== slideIndex) {
          swiper.slideTo(slideIndex);
        }
      },
      onEnter: function () {
        document.querySelector(triggerSelector).classList.add("active");
        document.querySelector(topTextSelector).classList.add("active");
      },
      onLeave: function () {
        document.querySelector(triggerSelector).classList.remove("active");
        document.querySelector(topTextSelector).classList.remove("active");
      },
      onEnterBack: function () {
        document.querySelector(triggerSelector).classList.add("active");
        document.querySelector(topTextSelector).classList.add("active");
      },
      onLeaveBack: function () {
        document.querySelector(triggerSelector).classList.remove("active");
        document.querySelector(topTextSelector).classList.remove("active");
      },
    });
  }
  
  // 리사이즈 핸들러 함수
  function createResizeHandler(swiper, smoother) {
    return function handleResize() {
      if (window.innerWidth <= 1024) {
        swiper.changeDirection("vertical");
      } else {
        swiper.changeDirection("vertical");
      }
      swiper.update();
      
      // smoother 객체가 있다면 업데이트
    //   if (smoother && typeof smoother.update === 'function') {
    //     smoother.update();
    //   }
    };
  }
  
  // 초기화 함수
  function init() { 
    
    const swiper = initBusinessSlide(".business_slide", ".business_slide .swiper-pagination");
    createScrollTrigger(".main_business", swiper, "");
    
    const handleResize = createResizeHandler(swiper);
    window.addEventListener("resize", handleResize);
    handleResize(); // 초기 실행
  
    // return smoother; // smoother 객체를 반환
  }
  
  // 페이지 로드 시 초기화
  document.addEventListener("DOMContentLoaded", () => {
    init();
    // 필요한 경우 여기서 smoother 객체를 사용할 수 있습니다.
  });


	/*	스크롤시 사이즈 변경	 */  
  business_Motion1 = gsap.timeline({
    scrollTrigger: {
        trigger: ".main_business",
        scrub: 0.5,    
        start:'-40% top',
        end:'top top',
        invalidateOnRefresh: true,
    }
}).to('.main_business .business_slide',{
    width:'90.4%',
    height:'81vh'
});


  /*	secMotionActive() - 섹션 모션 클래스 추가	 */
  $(window).on('load',function(){
    $('[data-motion]').each(function(idx,item){
      ScrollTrigger.create({
        id:'#wrap' + idx,
        trigger: $(item),
        scrub: 0.5,
        start:'top 90%',
        invalidateOnRefresh: true,
        onEnter:function(){
          $(item).addClass('active');
        },
        onLeaveBack:function(){
          $(item).removeClass('active');
        },
      })
    });
  });


//   const sub1 = gsap.timeline();
// sub1.from("#sub_container .title_type1 h3", {autoAlpha: 0, duration: .5, x:0, y: 50})
//     .from("#sub_container .title_type1 p", {autoAlpha: 0, duration: .5, x:0, y: 50})    
//     .from(".wedb_do_wrap", {autoAlpha: 0, duration: .5, x:0, y: 50})
//     wedb_do_wrap

//     ScrollTrigger.create({
//         trigger: "#sub_container",
//         start: "top center",
//         end: "bottom center",
//         toggleActions: "play none none reverse",
//         markers: false
//     }); 

