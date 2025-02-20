"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Hero() {
  const heroRef = useRef(null);

  useLayoutEffect(() => {
    // 使用 gsap.context 保证只针对当前组件的 DOM 节点
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      // 标题文字入场动画：依次淡入并上移
      tl.from(".hero-title", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out",
        stagger: 0.2,
      });
      // 副标题动画：稍作延迟后整体淡入上移
      tl.from(
        ".hero-subtitle",
        {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power2.out",
        },
        "-=0.5"
      );
      // 按钮动画：缩放+淡入
      tl.from(
        ".hero-button",
        {
          opacity: 0,
          scale: 0.9,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.5"
      );
    }, heroRef);

    // 立场动画
    gsap.registerPlugin(ScrollTrigger);
    // 根据滚动进度调整背景透明度，滚动到一定程度时背景渐隐
    const tl = gsap.to(heroRef.current, {
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: "#home_page",
        scroller: "#home_page",
        start: "top top",
        end: "30% top",
        scrub: true,
      },
    });

    return () => {
      ctx.revert();
      tl.scrollTrigger && tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={heroRef}
      className="h-[100vh] w-[1200px] mx-auto flex gap-20 items-end pb-40"
    >
      <div className="w-[793px]">
        <div className="hero-title text-heading-2 text-text-white max-xl:text-heading-3">
          Worldpin.
        </div>
        <div className="hero-title text-heading-2 text-text-secondary max-xl:text-heading-3">
          The Ultimate AI
        </div>
        <div className="hero-title text-heading-2 text-text-secondary max-xl:text-heading-3">
          Wearable for Web3.
        </div>
      </div>
      <div className="w-[387px]">
        <div className="hero-subtitle text-heading-3 text-text-white max-xl:text-lg">
          Trade Smarter. Stay Secure. Never Miss a Move.
        </div>
        <div className="mt-16">
          <div className="hero-button text-basc text-white inline-block py-12 px-20 rounded-xl bg-[rgb(0,153,255)]">
            Preorder Coming Soon
          </div>
        </div>
      </div>
    </div>
  );
}
