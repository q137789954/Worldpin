"use client";

import clsx from "clsx";
import { useMemo, useRef, useLayoutEffect } from "react";
import Card from "./components/Card";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Bell_icon from "./assets/Bell.png";
import Layers_icon from "./assets/Layers.png";
import Notifications_img from "./assets/img1.png";
import Latest_img from "./assets/img2.png";

export default function TradePros(props: { windowHeight: number }) {
  const { windowHeight } = props;
  const textRef = useRef(null);
  const listRef = useRef(null);
  const titleRef = useRef(null);
  const text2Ref = useRef(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const list = useMemo(() => {
    return [
      {
        icon: Bell_icon.src,
        title: "Precision Signal Filtering.",
        text: "WorldPin cuts through the noise by tracking your chosen tokens, key news, and social sentiment in real time, delivering concise bullet-point updates.",
        image: Notifications_img.src,
      },
      {
        icon: Layers_icon.src,
        title: "Trader-Centric Market Summaries.",
        text: "Get customized insights based on your trading style—whether you're a day trader, swing trader, or long-term investor.",
        image: Latest_img.src,
      },
    ];
  }, []);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const scrollerOption = "#home_page"; // 确保页面中存在该 id 的滚动容器

    // 提前设置各元素初始状态
    gsap.set(titleRef.current, { opacity: 0, y: 200 });
    gsap.set(text2Ref.current, { opacity: 0, y: 200 });
    gsap.set(listRef.current, { opacity: 0, x: "30%" });

    // 使用单一的 master timeline 来串联入场动画
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: textRef.current, // 以文案所在区域作为触发器
        scroller: scrollerOption,
        start: "top 80%",
        end: "+=790",
        scrub: 1,
        // markers: true,
      },
    });

    // 1. 文案动画：先让 titleRef 从底部上移并淡入
    masterTl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
    });

    // 2. 紧接着让 text2Ref 出现（部分重叠）
    masterTl.to(
      text2Ref.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.6"
    );

    // 3. 文案动画完成后，再开始整体列表从右侧滑入并显示
    masterTl.to(
      listRef.current,
      { x: "0%", opacity: 1, duration: 0.5, ease: "power2.out" },
      "-=0.5"
    );

    // 4. 最后，为各卡片添加入场动画
    masterTl.fromTo(
      ".TradePros_card",
      {
        x: (index) => {
          if (index === 0) return 20;
          if (index === 2) return 80;
          return 0;
        },
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
        stagger: 0.1,
      },
      "-=0.8"
    );

    // 离场动画：当组件底部离开视口上方30%时开始淡出
    gsap.to(sectionRef.current, {
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        scroller: scrollerOption,
        start: "bottom 60%",
        end: "bottom 0%",
        scrub: true,
      },
    });

    ScrollTrigger.refresh();

    return () => {
      masterTl.scrollTrigger && masterTl.scrollTrigger.kill();
      masterTl.kill();
    };
  }, []);

  const top = useMemo(() => {
    if (windowHeight) {
      return (windowHeight - 646) / 2;
    }
    return 0;
  }, [windowHeight]);

  return (
    <section className="w-full h-[790px] overflow-visible relative mt-56" ref={sectionRef}>
      <div
        className="w-1200 h-[535px] sticky mx-auto flex items-center gap-20 overflow-x-hidden"
        style={{ top: top }}
      >
        <div
          className="w-[387px] h-[535px] flex-col items-center flex-shrink-0"
          ref={textRef}
        >
          <div className="text-heading-2 text-text-white" ref={titleRef}>
            Trade Alongside the Pros.
          </div>
          <div className="text-base text-text-secondary mt-16" ref={text2Ref}>
            Experience direct insights and real-time interactions with elite
            traders through WorldPin’s exclusive engagement features.
          </div>
        </div>
        <div className="flex-shrink-0 min-w-0 h-[535px] w-[788px]">
          <div
            className={clsx("h-[535px] w-auto flex gap-20 pointer-events-none")}
            ref={listRef}
          >
            {list.map((item) => (
              <Card {...item} key={item.title} />
            ))}
            <div className="w-[100px] h-[535px] flex-shrink-0 " />
          </div>
        </div>
      </div>
    </section>
  );
}
