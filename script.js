// Initialize Locomotive Scroll
const scroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true,
});

// Function to move and scale the circle
function movecircle(xscale = 1, yscale = 1) {
  let circle = document.getElementById("minicircle");
  window.addEventListener("mousemove", function (event) {
    let x = event.clientX;
    let y = event.clientY;
    circle.style.transform = `translate(${x}px, ${y}px) scale(${xscale}, ${yscale})`;
  });
}

// Call movecircle with default values
movecircle();

// GSAP animation for the first page
function firstpageam() {
  let elem = gsap.timeline();
  elem.from(".animate", {
    y: "-10",
    opacity: 0,
    duration: 1,
    ease: "expo.inOut",
  });
}
firstpageam();

// Additional GSAP animations
gsap.to(".boundary-elem", {
  y: 0,
  duration: 1,
  delay: 0.4,
  stagger: 0.3,
});
gsap.from(".work h4", {
  y: 40,
  opacity: 0,
  duration: 1,
  delay: 0.4,
});

// Function to scale the circle based on mouse movement
function circlechipta() {
  let time;
  let xscale = 1;
  let yscale = 1;
  let xprev = 0;
  let yprev = 0;

  window.addEventListener("mousemove", function (event) {
    xscale = gsap.utils.clamp(0.6, 1.4, (event.clientX - xprev) / 100 + 1);
    yscale = gsap.utils.clamp(0.6, 1.4, (event.clientY - yprev) / 100 + 1);

    xprev = event.clientX;
    yprev = event.clientY;
    // console.log(xscale, yscale);

    movecircle(xscale, yscale);

    clearTimeout(time);
    time = setTimeout(function () {
      let circle = document.getElementById("minicircle");
      circle.style.transform = `translate(${xprev}px, ${yprev}px) scale(1, 1)`;
    }, 100);
  });
}
circlechipta();

document.querySelectorAll(".element").forEach((elem) => {
  elem.addEventListener("mousemove", (dets) => {
    gsap.to(elem.getElementsByTagName("img"), {
      opacity: 1,
      ease: Power1,
      top: dets.clientY - elem.getBoundingClientRect().top - 110,
      left: dets.clientX - 180,
    });
  });
});
document.querySelectorAll(".element").forEach((elem) => {
  elem.addEventListener("mousemove", () => {
    let circle = document.getElementById("minicircle");
    gsap.to(circle, {
      height: 70,
      width: 70,
    });
  });
});
document.querySelectorAll(".element").forEach((elem) => {
  elem.addEventListener("onmouseleave", () => {
    gsap.to(elem.getElementsByTagName("img"), {
      opacity: 0,
    });
  });
});
