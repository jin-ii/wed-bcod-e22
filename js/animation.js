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


    // const ani4 = gsap.timeline();
    // ani4.from("#main_section4 .business_area1", {
    //     autoAlpha: 1,
    //     scale: 1,
    //     width: "100vw",
    //     height: "100vh"
    // });

    // ScrollTrigger.create({
    //     animation: ani4,
    //     trigger: "#main_section4 ",
    //     start: "top top",
    //     end: "+=3000",
    //     scrub: true,
    //     pin: true, 
    //     anticipatePin: 1,
    //     markers: true
    // });
