// Initialize Locomotive Scroll
const scroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true,
});

// Function to move and scale the circle
function movecircle(xscale = 1, yscale = 1) {
  let circle = document.getElementById("minicircle");
  window.addEventListener("mousemove", function (event) {
    let x = event.clientX + 10;
    let y = event.clientY + 10;
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
    xscale = gsap.utils.clamp(
      0.3,
      1.7,
      Math.abs(event.clientX - xprev) / 100 + 1
    );
    yscale = gsap.utils.clamp(
      0.3,
      1.7,
      Math.abs(event.clientY - yprev) / 100 + 1
    );

    xprev = event.clientX;
    yprev = event.clientY;

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
  let circle = document.getElementById("minicircle");
  let view = document.getElementById("view");
  var rotate = 0;
  var difference = 0;

  if (circle && view) {
    elem.addEventListener("mousemove", (dets) => {
      let imgs = Array.from(elem.getElementsByTagName("img"));
      difference = dets.clientX - rotate;
      rotate = dets.clientX;

      imgs.forEach((img) => {
        gsap.to(img, {
          visibility: "visible",
          duration: 0.1,
          opacity: 1,
          ease: Power1.easeOut,
          top: dets.clientY - elem.getBoundingClientRect().top - 160,
          left: dets.clientX - 250,
          rotate: gsap.utils.clamp(-20, 20, difference),
        });
      });

      gsap.to(circle, {
        height: 70,
        width: 70,
      });

      gsap.to(view, {
        opacity: 1,
      });
    });
  } else {
    console.error("Elements with IDs 'minicircle' or 'view' are missing.");
  }
});

document.querySelectorAll(".element").forEach((elem) => {
  let circle = document.getElementById("minicircle");
  let view = document.getElementById("view");

  elem.addEventListener("mouseleave", (dets) => {
    let imgs = Array.from(elem.getElementsByTagName("img"));
    imgs.forEach((img) => {
      gsap.to(img, {
        visibility: "hidden",
        duration: 0.1,
      });
    });
    gsap.to(circle, {
      height: 9,
      width: 9,
    });
    gsap.to(view, {
      opacity: 0,
    });
  });
});

document.querySelectorAll(".element").forEach((elem) => {
  let time;
  let xprev = 0;

  elem.addEventListener("mousemove", function (event) {
    clearTimeout(time);
    let rotate = gsap.utils.clamp(-5, 5, (event.clientX - xprev) / 100);
    xprev = event.clientX;
    console.log(rotate);
    time = setTimeout(function () {
      let imgs = elem.getElementsByTagName("img");
      Array.from(imgs).forEach((img) => {
        img.style.transform = `rotate(${rotate}deg)`;
      });
    }, 100);
  });
});
