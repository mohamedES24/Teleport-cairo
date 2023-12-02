import barba from '@barba/core';
import {gsap,Elastic,Expo,Power2,Power4} from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
gsap.registerPlugin(CustomEase);
gsap.registerPlugin(ScrollTrigger);
import Lenis from '@studio-freight/lenis'
import Sketch from './model';
import SplitType from 'split-type';

function toggeler(){
     const menuIcon = document.querySelector(".hamburger-menu");
     const navside = document.querySelector(".navside");
     menuIcon.addEventListener("click", () => {
          navside.classList.toggle("change");
      });
}

//transitions between pages
function transitionpages(){
     gsap.to(".loader",2,{
         clipPath:"polygon(0% 0%,100% 0%,100% 0%,0% 0%)",
         ease:Power4.inOut,
         delay:2,
         zIndex:100
     });
     gsap.to(".loader .img-wrapper",1,{
          clipPath:"polygon(0 100%,100% 100%,100% 0%,0% 0%)",
          ease:Power4.inOut,
          stagger:{ 
              amount:1.5,
          },
          
          // zIndex:100
      });
}
function textanimation(){
     const myText = new SplitType('#my-text');
        gsap.to('.word', {
            y: 0,
            stagger: 0.05,
            delay: 0,
            duration: 0.2
        });
        gsap.to('.line', {
          y: 0,
          stagger: 0.05,
          delay: 0,
          duration: 1.5
      });
      gsap.from(".avatar",{
          opacity:0,
          delay:0.5,
     });
          gsap.from(".navbar",{
          opacity:0,
          delay:0.5,
     });
          // gsap.from("#container",{
          //      opacity:0,
          //      delay:0.5
          // })
}    

function brandanimaton(){
     gsap.to(".before-board", {
          scrollTrigger: {
               trigger:".preview",
               start:"top 25%",
          }, // start the animation when ".box" enters the viewport (once)
          y:0,
          duration:1.5,

          ease:Power2.easeInOut,
          // onComplete:function(){     
          //      gsap.to(".preview", {clipPath:'none'})
          //    },
 
     });
     gsap.to(".board", {
          scrollTrigger: {
               trigger:".preview",
               start:"top 25%",
          }, // start the animation when ".box" enters the viewport (once)
          y:0,
          duration:1.5,
          delay:0.5,
          ease:Power2.easeInOut,
          // onComplete:function(){     
          //      gsap.to(".preview", {clipPath:'none'})
          //    },

     });
     const myText = new SplitType('#text-board');
     gsap.to('.word', {
          scrollTrigger: {
               trigger:".preview",
               start:"top 25%",
          },
          ease:"power4",
          y: 0,
          delay:0.5,
          stagger:0.1,
          duration: 0.05
      });
      gsap.to('.s-icons', {
          scrollTrigger: {
               trigger:".preview",
               start:"top 25%",
          },
          ease:"power4",
          x: 0,
          opacity:1,
          stagger:0.1,
          duration: 1,
          delay:1.5
      });
}


function comparison(){
     gsap.utils.toArray(".comparisonSection").forEach(section => {
          let tl = gsap.timeline({
                    scrollTrigger: {
                         trigger: section,
                         start: "center center",
             // makes the height of the scrolling (while pinning) match the width, thus the speed remains constant (vertical/horizontal)
                         end: () => "+=" + section.offsetWidth, 
                         scrub: true,
                         pin: true,
             anticipatePin: 1
                    },
                    defaults: {ease: "none"}
               });
          // animate the container one way...
          tl.fromTo(section.querySelector(".afterImage"), { xPercent: 100, x: 0}, {xPercent: 0})
            // ...and the image the opposite way (at the same time)
            .fromTo(section.querySelector(".afterImage img"), {xPercent: -100, x: 0}, {xPercent: 0}, 0);
     });
}



let model = new Sketch({
     domElement: document.getElementById('container')
 });

//making my own smoothscroll

// let speed = 0;
// let position = 0;
// let block = document.getElementById('block');
// window.addEventListener('wheel',(e)=>{
//      speed += e.deltaY*0.0002;
// }); 
// function raf(){
//      position += speed;
//      speed *= 0.8;
     
//      window.requestAnimationFrame(raf)
// }
// raf();
const lenis = new Lenis({
     duration: 1.2,
     // lerp: 0.1,
     easing: (t) => Math.min(1, 1 - (1 - t) * (1 - t)),
     orientation: 'vertical',
     gestureOrientation: 'vertical',
     
})

lenis.on('scroll', (e) => {
     // console.log(e);
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)



//line-breaker-animation
function breaker(){
     const myText = new SplitType('.breaker-text');
     const secline = new SplitType('.sec-line');
     gsap.to(".breaker-text .word .char", {
          scrollTrigger: {
               trigger:".skill-breaker",
               start:"top 25%",
          },
          opacity:1,
          stagger: 0.1,

          duration: 0.1,
          ease:"power4",
     });
     gsap.to(".sec-line .line", {
          scrollTrigger: {
               trigger:".skill-breaker",
               start:"top 25%",
          },
          y:0,
          delay:1,
          duration: 0.5,
          ease:Elastic.easeOut.config(1,0.3),
     });
    
}

//scroll animation
function projectreveal(){
     const projectTitle = new SplitType('.project-info-title');
     const projectInfo = new SplitType('.project-info');
     const samples = document.querySelectorAll('.sample');
     samples.forEach((section) => {
       const tl = gsap.timeline({
         scrollTrigger: {
           trigger: section,
           start: 'top 25%',
         },
       });
       tl.to(section.querySelector('.vidInsideImg'), {
         opacity: 1,
         duration: 0.9,
       });
       tl.to(section.querySelectorAll('.project-info-title .word'), {
          y:0,
          ease:Elastic.easeOut.config(1,0.3),
        });
        tl.to(section.querySelectorAll('.project-info .line'), {
          y:0,
          ease:Elastic.easeOut.config(1,0.3),
        });
     });
      
}
function hovereffect(){

// transitionpages();

//using intersection observer     
//      const sliders = document.querySelectorAll(".slide-in");
// const options = {
//      threshold:1,
//      rootmargin:"-200px 0px 0px 0px"
// }

// const animateOnScroll = new IntersectionObserver(function(entries,animateOnScroll){
//      entries.forEach(entry => {
//           if(!entry.isIntersecting){
//                return;
//           }else{
//                entry.target.classList.add('animate');
//                animateOnScroll.unobserve(entry.target);
//           }
//      });
// },options);

// sliders.forEach(slider =>{
//      animateOnScroll.observe(slider);
// });

//using gsap to change cursor on hover
gsap.set('.cursor',{xPercent:-50,ypercent:-50});
let cursor = document.querySelector(".cursor");
let folower = document.querySelector(".folower");
let hovers = document.querySelectorAll(".hovers");
// let videos = document.querySelector(".vids");
let mouseX;
let mouseY;
window.addEventListener('mousemove', e =>{
     mouseX = e.clientX;
     mouseY = e.clientY;
     gsap.to(cursor,0.1,{x: mouseX, y: mouseY});
});

hovers.forEach((hover) => {
     hover.addEventListener('mouseenter',() => {
          // gsap.to(videos,0.1,{
          //      zIndex:2,
          //      scale:1.1
          // });
          
          gsap.to(folower,1,{
               scale:1,
               opacity:1,
               top:'-50px',
               left:'-50px',
               ease: Elastic.easeOut.config(1,0.3)
          });
     });
     
     hover.addEventListener('mousemove',() => {
          gsap.to(folower,0.2,{
               x: mouseX,
               y: mouseY
          });
     });
     
     hover.addEventListener('mouseleave',() => {
          gsap.to(folower,0.2,{
               scale:0,
               opacity:0,
               // top: '10',
               // left: '40',
          });
          // gsap.to(videos,0.1,{
          //      zIndex:0,
          //      scale:0
          // });
     });
 });

const vidInsideImgElements = document.querySelectorAll('.vidInsideImg');

vidInsideImgElements.forEach(element => {
  element.addEventListener('mouseenter', () => {
     element.classList.add('action');
    element.querySelector('video').play();
  });

  element.addEventListener('mouseleave', () => {
     element.classList.remove('action');
    element.querySelector('video').pause();
    element.querySelector('video').currentTime = 0;
  });
});

}

hovereffect();

barba.init({
    transitions: [
      {
        name: 'from-home-transition',
        from: {namespace: ["home"]},
        leave(data) {    
            return gsap.to(data.current.container,{opacity: 0.,duration: 0.5,})            
        },
        enter(data) {         
            return gsap.from(data.next.container,{opacity: 0.})
        },
        once(){
               
        }
      },
      {
          name: 'from-inside-page-transition',
            to: {
                namespace: ["home"]
            },
          leave(data){
               //  gsap.to('.curtain',{duration: 0.5,y: "0%",}),

               return transitionpages(),
               gsap.to(data.current.container,{opacity: 0.,duration: 2})
          },
          
          enter(data){
               //  gsap.to('.curtain',{duration: 0.5,y: "-100%"}),
                
               return gsap.from(data.next.container,{opacity: 0.,duration: 0.5}),
               hovereffect(),
               new Sketch({
                    domElement: document.getElementById('container')
                });
          },
          once(){
               function startLoader() {
                    let counterElement = document.querySelector(".counter");
                    let currentValue = 0;
                    function upadeCounter(){
                        if (currentValue === 100){
                            return;
                        }
                        currentValue += Math.floor(Math.random() * 10) + 1;
                
                        if (currentValue > 100){
                            currentValue = 100;
                        }
                        counterElement.textContent = currentValue;
                
                        let delay = Math.floor(Math.random() * 200) + 50;
                        setTimeout(upadeCounter, delay);
                    }
                    upadeCounter();
                }

                startLoader();
                
                gsap.to(".counter",0.25,{
                    delay: 3.5,
                    opacity: 0,
                    onComplete:function(){     
                         //fade out each target when it completes
                         gsap.to(this.targets()[0], {display:"none"})
                       },
                });
             
                //adding preloader effect from codegrid
                gsap.to(".text-wrapper > div", 1, {
                    x: "500",
                    ease: Expo.easeInOut,
                    delay: 5,
                    stagger: 0.1,
                  });
               
                  gsap.to(".text-wrapper", 2.25, {
                    y: -600,
                    scale: 4.5,
                    rotate: -90,
                    ease: Expo.easeInOut,
                    delay: 5.5,
                    onComplete:function(){     
                         //fade out each target when it completes
                         gsap.to(this.targets()[0], {display:"none"})
                       },
                  });
                
                  gsap.to(".text-preloader", 1, {
                    opacity: 1,
                    ease: Expo.easeInOut,
                    delay: 4,
                  });
                
                  gsap.to(".text-wrapper > div", 4, {
                    x: "-3500",
                    ease: Expo.easeInOut,
                    delay: 6,
                    stagger: 0.05,
                  });
                
                  gsap.to(".text-container", 2, {
                    bottom: "-100%",
                    ease: Expo.easeInOut,
                    delay: 8,
                    onComplete:function(){     
                         //fade out each target when it completes
                         gsap.to(this.targets()[0], {display:"none"})
                       },
                  });
               
                  
               //overview animation
               const myText = new SplitType('#my-text'); 
               gsap.to('.word', {
                    y: 0,
                    stagger: 0.05,
                    delay: 8,
                    duration: .2
               });
               gsap.to('.line', {
                  y: 0,
                  stagger: 0.05,
                  delay: 8,
                  duration: 2
               });
               gsap.from(".swipe-in-text",{
                    delay:8,
                    display:"none",
               });
               gsap.from(".avatar",{
                    opacity:0,
                    delay:9.1,
               });
               gsap.from(".navbar",{
                    opacity:0,
                    delay:9,
               });

               // brandanimaton();
               
               brandanimaton();
               breaker();
               comparison();
               projectreveal();
               toggeler();
          }  
      }] 
  });

     barba.hooks.beforeEnter(() => {
          return gsap.to(".preloader",{display:"none"},)
     });
     barba.hooks.enter(() => {
          return window.scrollTo(0, 0),
          textanimation(),
          comparison(),
          projectreveal(),
          brandanimaton(),
          toggeler()
     });   
   
