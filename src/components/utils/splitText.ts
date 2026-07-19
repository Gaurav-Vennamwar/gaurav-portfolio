import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap-trial/ScrollSmoother';
import { SplitText } from 'gsap-trial/SplitText';

interface ParaElement extends HTMLElement {
  anim?: gsap.core.Animation;
  split?: SplitText;
}

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

// Configure only once
ScrollTrigger.config({
  ignoreMobileResize: true,
});

export default function setSplitText() {
  if (window.innerWidth < 900) return;

  const paras = document.querySelectorAll<ParaElement>('.para');
  const titles = document.querySelectorAll<ParaElement>('.title');

  const triggerStart = window.innerWidth <= 1024 ? 'top 60%' : '20% 60%';

  const toggleActions = 'play pause resume reverse';

  paras.forEach((para) => {
    para.classList.add('visible');

    para.anim?.kill();
    para.split?.revert();

    const split = new SplitText(para, {
      type: 'lines,words',
      linesClass: 'split-line',
    });

    para.split = split;

    para.anim = gsap.fromTo(
      split.words,
      {
        autoAlpha: 0,
        y: 80,
      },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.02,
        scrollTrigger: {
          trigger: para.parentElement?.parentElement,
          toggleActions: toggleActions,
          start: triggerStart,
        },
      },
    );
  });

  titles.forEach((title) => {
    title.anim?.kill();
    title.split?.revert();

    const split = new SplitText(title, {
      type: 'chars,lines',
      linesClass: 'split-line',
    });

    title.split = split;

    title.anim = gsap.fromTo(
      split.chars,
      {
        autoAlpha: 0,
        y: 80,
        rotate: 10,
      },
      {
        autoAlpha: 1,
        y: 0,
        rotate: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        stagger: 0.03,
        scrollTrigger: {
          trigger: title.parentElement?.parentElement,
          toggleActions: toggleActions,
          start: triggerStart,
        },
      },
    );
  });

  ScrollTrigger.refresh();
}
