const header = document.querySelector("#header");

window.addEventListener("scroll", function() {
    if (this.window.scrollY > 10) {
        header.classList.add("header_fixed");
    } else {
        header.classList.remove("header_fixed");
    }
});

$(function() {
        $(".top_set > .btn_language").click(function(e){
        e.preventDefault();        
        if($(this).next('ul').is(':visible') === false){
            $(this).next('ul').stop().slideToggle();
        }
    });

 

    $(".location_info > a.btn_share").click(function(e){
        e.preventDefault();
        $(".share_box").stop().slideUp();
        if($(this).next('div').is(':visible') === false){
            $(this).next('div').stop().slideToggle();
        }
    });
    $(".location_info a.btn_close").click(function(e){
        e.preventDefault();
        $(".share_box").slideUp();
    });
    
    

});




var swiperTopNum = $('.first').find('.swiper-slide');
var swiperSubNum = $('.second').find('.swiper-slide');
var swiperSubNum = $('.third').find('.swiper-slide');

var startBtn = document.querySelector(".swiper-start");
var stopBtn = document.querySelector(".swiper-stop");


new Swiper('.first', {
    effect: 'fade',
    direction: 'horizontal',
    speed: 1300,
    slidesPerView: 1,
    spaceBetween: 10, 
    fadeEffect: {
        crossFade: false
    },    
    autoplay: {
        delay: 5000,
    },
    loop: true,
    navigation: {
        nextEl: '.common_arrows .next',
        prevEl: '.common_arrows .prev',
    },
   

    on: {
        transitionStart: function () {
            TweenMax.staggerFromTo($("#main_slider .swiper-wrapper .slider_img"), 5, { scale: '1.1' }, { scale: '1', ease: Power3.easeOut });
        },
    breakpoints: {
       
        640: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 4,
            spaceBetween: 40,
        },
        1024: {
            slidesPerView: 5,
            spaceBetween: 50,
        },
        }
    }

  

});




new Swiper('.second', {
    effect: 'slide',
    direction: 'horizontal',
    speed: 1300,
    fadeEffect: {
        crossFade: false
    },
    autoplay: {
        delay: 10000,
    },
    loop: true,
    navigation: {
        nextEl: '.common_arrows .next',
        prevEl: '.common_arrows .prev',
    },
   
});

function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('active');
}

function closeMenu() {
    const menu = document.getElementById('menu');
    menu.classList.remove('active');
}


new Swiper('.third', {
    effect: 'slide',
    direction: 'horizontal',
    speed: 800,
    slidesPerView :1,
    spaceBetween : 0,
    centeredSlides : false,  
    fadeEffect: {
        crossFade: false
    },
    autoplay: {
        delay: 5000,
    },
    loop: true,
    navigation: {
        nextEl: '.common_arrows .next',
        prevEl: '.common_arrows .prev',
    },
   
    on: {
        transitionStart: function () {
            TweenMax.staggerFromTo($("#main_slider .swiper-wrapper .slider_img"), 5, { scale: '1.1' }, { scale: '1', ease: Power3.easeOut });
        },
    breakpoints: {
       
        640: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 4,
            spaceBetween: 40,
        },
        1024: {
            slidesPerView: 5,
            spaceBetween: 50,
        },
        }
    }
   
});

function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('active');
}

function closeMenu() {
    const menu = document.getElementById('menu');
    menu.classList.remove('active');
}




