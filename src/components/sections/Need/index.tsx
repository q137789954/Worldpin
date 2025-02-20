"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef, useMemo } from "react";
import List from "./components/List";

const Need = (props: { windowHeight: number }) => {
  const { windowHeight } = props;
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);
  const listRef = useRef(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const scrollerOption = "#home_page"; // 确保页面中存在该 id 的滚动容器

    // 提前设置各元素初始状态

    // 文本初始状态：隐藏、向下偏移
    gsap.set(textRef1.current, { opacity: 0, y: 200 });
    gsap.set(textRef2.current, { opacity: 0, y: 200 });

    // 卡片初始状态（选择器范围为 .need_list_card）：
    gsap.set(".need_list_card", {
      opacity: 0,
      y: (index) => {
        if (index === 0) return -120;
        if (index === 1) return 30;
        if (index === 2) return 100;
        return 0;
      },
      x: (index) => {
        if (index === 0) return -100;
        if (index === 1) return 20;
        if (index === 2) return 100;
        return 0;
      },
    });

    // 创建 master timeline，所有动画都在此 timeline 内按顺序执行
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: textRef1.current, // 用文本区域作为触发器
        scroller: scrollerOption,
        start: "top 90%",
        end: "+=1000",
        scrub: 1,
      },
    });

    // 1. 文案动画：先让 textRef1 淡入并上移
    masterTl.to(textRef1.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
    });

    // 2. 然后让 textRef2 紧接着出现（延迟 0.2 秒）
    masterTl.to(
      textRef2.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.6"
    );

    // 3.文案隐藏
    masterTl.to(
      textRef2.current,
      {
        opacity: 0,
        y: 460,
        duration: 1,
        ease: "power2.out",
      },
    );
    masterTl.to(textRef1.current, {
      opacity: 0,
      y: 400,
      duration: 0.8,
      ease: "power2.out",
    },
    "-=0.6"
  );

    // 4. 最后，为各个卡片添加入场动画（归位且渐显，同时根据索引处理垂直和水平偏移）
    masterTl.to(
      ".need_list_card",
      {
        // 归位动画：让卡片平滑回到目标位置
        y: (index) => {
          if (index === 0) return 37;
          if (index === 1) return -37;
          if (index === 2) return 37;
          return 0;
        },
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        stagger: 0.1,
      },
      "-=0.1"
    );

    // 离场动画：当组件底部离开视口上方 30% 时，整个组件渐渐淡出
    gsap.to(sectionRef.current, {
      opacity: 0,
      ease: "power2.out",
      duration: 1,
      scrollTrigger: {
        trigger: sectionRef.current,
        scroller: scrollerOption,
        // 当组件底部达到视口上方 30% 时开始动画，直到完全离开视口
        start: "bottom 60%",
        end: "bottom 0%",
        scrub: true,
        markers: true, // 调试用，可根据需要删除
      },
    });

    ScrollTrigger.refresh()

    return () => {
      masterTl.scrollTrigger && masterTl.scrollTrigger.kill();
      masterTl.kill();
    };
  }, []);

  const top = useMemo(() => {
    if (windowHeight) {
      return (windowHeight - 693) / 2;
    }
    return 0;
  }, [windowHeight]);

  return (
    <section className="h-[1400px] w-full overflow-visible" ref={sectionRef}>
      <div className="h-full w-1200 mx-auto overflow-visible relative">
        {/* 固定在视口中心的文本 */}
        <div
          className="h-[693px] w-full flex justify-center items-center sticky z-10"
          style={{ top: top }}
        >
          <div>
            <div className="text-heading-1 text-text-white opacity-20" ref={textRef1}>
              Seamless Security,
            </div>
            <div className="text-heading-1 text-text-white opacity-20" ref={textRef2}>
              When You Need It
            </div>
          </div>
          {/* List 组件容器 */}
          <div className="h-[693px] w-full absolute top-0 left-0 z-20 overflow-x-hidden">
            <div className="w-full h-full flex items-center justify-center" ref={listRef}>
              <List />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Need;
