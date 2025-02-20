"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import phone_img from "./assets/phone.png";

const AICompanion = () => {
  const sectionRef = useRef(null);
  const textContainerRef = useRef(null);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // 获取自定义滚动容器
    const scrollerElem = document.querySelector("#home_page");
    if (!scrollerElem) {
      console.warn("找不到 id 为 home_page 的滚动容器");
    }
    
    // 检查触发元素
    const triggerElem = textContainerRef.current;
    if (!triggerElem) return;

    // 预设各元素初始状态
    gsap.set(textContainerRef.current, { x: -50, opacity: 0 });
    gsap.set(imageRef.current, { scale: 0.95, opacity: 0 });
    gsap.set(overlayRef.current, { y: 30, opacity: 0 });

    /**
     * 设计的动画过程：
     * 1. 文本区域动画：文本从左侧滑入，并逐渐显示出来。
     * 2. 手机图片动画：紧接着手机图片由略缩放状态恢复到正常状态，同时淡入。
     * 3. 叠加文本动画：最后叠加的提示文本从下向上移动，同时逐渐显现。
     *
     * 这里将所有动画整合到一个 master timeline 内，timeline 绑定到滚动触发器上，
     * 并设置 scrub 属性让动画进度与滚动进度联动。
     */
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElem,
        scroller: scrollerElem,
        start: "top 80%",
        end: "+=200",
        scrub: 1,
        toggleActions: "play reverse play reverse",
      }
      
    });

    // 1. 文本区域动画：从左侧滑入并淡入
    tl.to(textContainerRef.current, {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out",
    });
    
    // 2. 手机图片动画：缩放恢复到正常状态，同时淡入
    // 这里设置稍微重叠（例如提前 0.3 秒开始），以使过渡更平滑
    tl.to(
      imageRef.current,
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      },
      "-=0.6"
    );

    // 3. 叠加文本动画：从下向上滑入并淡入
    // 同样设置部分重叠，使得整体动画连贯
    tl.to(
      overlayRef.current,
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      },
      "-=0.4"
    );

     // 离场动画：当组件底部离开视口上方 30% 时，整个组件渐渐淡出
     gsap.to(sectionRef.current, {
      opacity: 0,
      ease: "power2.out",
      duration: 1,
      scrollTrigger: {
        trigger: sectionRef.current,
        scroller: scrollerElem,
        // 当组件底部达到视口上方 30% 时开始动画，直到完全离开视口
        start: "bottom 60%",
        end: "bottom 0%",
        scrub: true,
        markers: true, // 调试用，可根据需要删除
      },
    });

    // 刷新 ScrollTrigger 以确保状态同步
    ScrollTrigger.refresh();

    return () => {
      tl.scrollTrigger && tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  return (
    <section className="h-[702px] w-full" ref={sectionRef}>
      <div className="h-full w-1200 mx-auto flex gap-20 items-center">
        <div ref={textContainerRef} className="w-[590px]">
          <div className="text-3xl font-bold text-white">
            Your Everyday AI Companion
          </div>
          <div className="mt-16 text-2xl text-text-secondary">
            WorldPin isn’t just a trading tool—it’s a wearable assistant that
            makes your day more productive and organized.
          </div>
        </div>
        <div className="relative w-[590px] h-[590px]">
          <img
            ref={imageRef}
            className="w-full h-full object-cover"
            src={phone_img.src}
            alt="Phone"
          />
          <div ref={overlayRef} className="absolute bottom-24 right-24 w-[387px]">
            <div className="text-base font-semibold text-white">
              Precision Signal Filtering.
            </div>
            <div className="mt-8 text-base text-text-secondary">
              WorldPin cuts through the noise by tracking your chosen tokens,
              key news, and social sentiment in real time, delivering concise
              bullet-point updates.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AICompanion;
