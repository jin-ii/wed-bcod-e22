
const header = document.querySelector("#header");
window.addEventListener("scroll", function(){
    if(this.window.scrollY > 10){
        header.classList.remove("header_on");
    }else{
        header.classList.add("header_on");
    }

});

$(function() {

        $(".top_set > .btn_language").click(function(e){
        e.preventDefault();
        $(".share_box").stop().slideUp();
        if($(this).next('ul').is(':visible') === false){
            $(this).next('ul').stop().slideToggle();
        }
    });


});



var swiperTopNum = $('.first').find('.swiper-slide');
var swiperSubNum = $('.second').find('.swiper-slide');

new Swiper('.first', {
    effect: 'fade',
    direction: 'horizontal',
    speed: 1300,
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


