gsap.registerPlugin();


function locomotiveScrolltriggerWorkingTogetherAnimation() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });



    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}

locomotiveScrolltriggerWorkingTogetherAnimation();


function navBarAnimation() {
    const footerSvg = document.querySelectorAll('#col2 svg path');

    gsap.to("#nav-part1 svg", {
        transform: "translateY(-100%)",
        scrollTrigger: {
            trigger: "#page1",
            scroller: "#main",
            start: "top 0",
            end: "top -2%",
            scrub: 1
        }
    })

    gsap.to("#nav-part2 #links", {
        transform: "translateY(-140%)",
        opacity: 0,
        scrollTrigger: {
            trigger: "#page1",
            scroller: "#main",
            start: "top 0",
            end: "top -2%",
            scrub: 1
        }
    })

    gsap.from("#col2 svg path",{
        opacity: 0,
        delay: 0.5,
        duration: 0.7,
        stagger: 0.3,
        scrollTrigger: {
            trigger: "#footer",
            scroller: "#main",
            start: "top center",
            //markers: true,
            end: "top -2%",
            scrub: 1
        }
    })

}

navBarAnimation();
// const scroll = new LocomotiveScroll({
//     el: document.querySelector('#main'),
//     smooth: true
// });


function videoconAnimation() {
    var videocon = document.querySelector("#video-container");
    var playbtn = document.querySelector("#play");

    videocon.addEventListener("mouseenter", function () {
        gsap.to(playbtn, {
            scale: 1,
            opacity: 1
        })
    })

    videocon.addEventListener("mouseleave", function () {
        gsap.to(playbtn, {
            scale: 0,
            opacity: 0
        })
    })

    videocon.addEventListener("mousemove", function (e) {
        console.log(e);
        gsap.to(playbtn, {
            left: e.offsetX,
            top: e.offsetY,
        })
    })
}

videoconAnimation();


function loadingAnimation() {
    gsap.from("#page1 h1", {
        y: 100,
        opacity: 0,
        delay: 0.5,
        duration: 0.7,
        stagger: 0.3
    })
}

loadingAnimation();


function cursorAnimation() {
    document.addEventListener('mousemove', function (dets) {
        gsap.to("#cursor", {
            left: dets.x,
            top: dets.y
        })
    })

    document.querySelectorAll("div#child1, div#child3, div#child5").forEach(function (elems) {
        elems.addEventListener("mouseenter", function () {
            gsap.to("#cursor", {
                transform: 'translate(-50%,-50%) scale(1)'

            })
        })
        elems.addEventListener("mouseleave", function () {
            gsap.to("#cursor", {
                transform: 'translate(-50%,-50%) scale(0)'

            })
        })
    })

    document.querySelectorAll("div#child2, div#child4, div#child6").forEach(function (elems) {
        elems.addEventListener("mouseenter", function () {
            gsap.to("#cursor", {
                transform: 'translate(-50%,-50%) scale(1)',
                backgroundColor: '#cfcfcf'
            })
        })
        elems.addEventListener("mouseleave", function () {
            gsap.to("#cursor", {
                transform: 'translate(-50%,-50%) scale(0)',
                backgroundColor: 'blanchedalmond'
            })
        })
    })
}

cursorAnimation();


function fullscreenNavBarAnimation() {
    const menuIcon = document.querySelector('.ri-menu-2-line');
    const menuCloseIcon = document.querySelector('.cross-icon');
    const navBarLinks = document.querySelectorAll("#nav-part2 #links a");
    const navBarLogo = document.querySelectorAll("#nav-part1 svg");

    menuIcon.addEventListener("click", function () {
        menuIcon.style.display = "none";
        menuCloseIcon.style.display = "block";
        menuCloseIcon.style.fontSize = "21px";
        navBarLinks.forEach((items) => {
            items.style.color = "white"
        })
        navBarLogo[0].style.color = "white";
        navBarLogo[1].style.color = "white";
        gsap.to("#fullscreen-nav", {
            height: '100vh',
            duration: 0.5
        })

        gsap.from('#fullscreen-nav .col a', {
            y: 200,
            opacity: 0,
            delay: 0.15,
            duration: 0.2,
            stagger: 0.15
        })
        gsap.from('#fullscreen-nav .col h4', {
            y: 100,
            opacity: 0,
            delay: 0.6,
            duration: 0.2,
            stagger: 0.09
        })
    })

    menuCloseIcon.addEventListener("click", function () {
        menuIcon.style.display = "block";
        menuCloseIcon.style.display = "none";
        navBarLinks.forEach((items) => {
            items.style.color = "black"
        })
        navBarLogo[0].style.color = "black";
        navBarLogo[1].style.color = "black";
        gsap.to("#fullscreen-nav", {
            height: '0vh',
            duration: 0.5
        })
    })


}

fullscreenNavBarAnimation();

function clickTabAnimation() {
    const tabBoxRadio = document.querySelectorAll('.radio');
    const tabBoxheading = document.querySelectorAll('.tabs h2');
    const tabsContent = document.querySelectorAll('.tabs-content');

    gsap.to(tabsContent[2],{
        display: "block"
    })
    

    gsap.to(tabBoxRadio[2], {
        backgroundColor: 'black'
    })
    gsap.to(tabBoxheading[2], {
        opacity: 1
    })



    tabBoxRadio.forEach((items, index) => {
        items.addEventListener("click", function () {
            let arr_index = index;
            gsap.to("#tabs-container", {
                x: (3 - (index + 1)) * 20 + '%'
            })
            gsap.to(this, {
                backgroundColor: 'black'
            })
            gsap.to(tabBoxheading[index], {
                opacity: 1
            })

            tabBoxRadio.forEach((items, index) => {
                console.log(arr_index, '====', index)
                if (arr_index !== index) {
                    gsap.to(tabBoxheading[index], {
                        opacity: 0.7
                    })
                    gsap.to(tabBoxRadio[index], {
                        backgroundColor: 'white'
                    })
                }
            })

            tabsContent.forEach((items,index) => {
                if(arr_index === index){
                    gsap.to(tabsContent[index],{
                        display: 'block '
                    })
                }else{
                    tabsContent[index].style.display = "none";
                }
            })
        })
    })


    tabBoxheading.forEach((items, index) => {
        items.addEventListener("click", function (e) {
            let arr_index = index;
            gsap.to("#tabs-container", {
                x: (3 - (index + 1)) * 20 + '%'
            })
            gsap.to(this, {
                opacity: 1
            })
            gsap.to(tabBoxRadio[index], {
                backgroundColor: 'black'
            })
            tabBoxheading.forEach((items, index) => {
                if (arr_index !== index) {
                    gsap.to(tabBoxheading[index], {
                        opacity: 0.7
                    })
                    gsap.to(tabBoxRadio[index], {
                        backgroundColor: 'white'
                    })
                }
            })

            tabsContent.forEach((items,index) => {
                if(arr_index === index){
                    gsap.to(tabsContent[index],{
                        display: 'block '
                    })
                }else{
                    tabsContent[index].style.display = "none";
                }
            })
        })
    })

}

clickTabAnimation();



