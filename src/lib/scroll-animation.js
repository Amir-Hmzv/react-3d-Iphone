import gsap from "gsap";

export const scrolAnimation = (possition, target, isMobile,onUpdate) => {
  const tl = gsap.timeline();
  tl.to(possition, {
    x: -3.38,
    y: -10.74,
    z: -5.93,
    scrollTrigger: {
      trigger: ".sound-section",
      start: "top bottom",
      end: "top top",
      scrub: 2,
      immediateRender: false,
    },
    onUpdate,
  });
  tl.to(target, {
    x: 1.52,
    y: 0.77,
    z: -1.08,

    scrollTrigger: {
      trigger: ".sound-section",
      start: "top bottom",
      end: "top top",
      scrub: 2,
      immediateRender: false,
    },
  });
  tl.to(".jumbotron-section", {
    opacity: 0,

    scrollTrigger: {
      trigger: ".sound-section",
      start: "top bottom",
      end: "top top",
      scrub: 2,
      immediateRender: false,
    },
  });
  tl.to(".sound-section-content", {
    opacity: 1,

    scrollTrigger: {
      trigger: ".sound-section",
      start: "top bottom",
      end: "top top",
      scrub: 2,
      immediateRender: false,
    },
  });
  tl.to(possition, {
    x: 1.56,
    y: 5.00,
    z: 0.01,
    scrollTrigger: {
      trigger: ".display-section",
      start: "top bottom",
      end: "top top",
      scrub: 2,
      immediateRender: false,
    },
    onUpdate,
  });
  tl.to(target, {
    x: -0.55,
    y: 0.32,
    z: 0.0,

    scrollTrigger: {
      trigger: ".display-section",
      start: "top bottom",
      end: "top top",
      scrub: 2,
      immediateRender: false,
    },
  });
  tl.to(".display-section", {
    opacity: 1,

    scrollTrigger: {
      trigger: ".display-section",
      start: "top bottom",
      end: "top top",
      scrub: 2,
      immediateRender: false,
    },
  });
};
