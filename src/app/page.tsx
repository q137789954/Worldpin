"use client";

import Hero from "@/components/sections/Hero";
import HeroH5 from "@/components/sections/Hero/h5";
import TradeSmarter from "@/components/sections/TradeSmarter";
import TradePros from "@/components/sections/TradePros";
import TradeProsH5 from "@/components/sections/TradePros/h5";
import Need from "@/components/sections/Need";
import NeedH5 from "@/components/sections/Need/h5";
import AICompanion from "@/components/sections/AICompanion";
import AICompanionH5 from "@/components/sections/AICompanion/h5";
import DailyWearability from "@/components/sections/DailyWearability";
import DailyWearabilityH5 from "@/components/sections/DailyWearability/h5";
import Know from "@/components/sections/Know";
import KnowH5 from "@/components/sections/Know/h5";
import Footer from "@/components/Footer";
import bg_img from "@/assets/bg.png";
import { useRef, useLayoutEffect, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  const [windowHeight, setWindowHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  // 更新窗口高度
  useEffect(() => {
    const updateDimensions = () => {
      setWindowHeight(window.innerHeight || 0);
      setWindowWidth(window.innerWidth || 0);
    };

    updateDimensions(); // 初始计算

    window.addEventListener("resize", updateDimensions); // 监听窗口变化
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // 常驻背景动画
    gsap.to(".hero-bg-image", {
      duration: 5,
      scale: 1.1,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
    });

    // 根据滚动进度调整背景透明度，滚动到一定程度时背景渐隐
    gsap.to(".hero-bg-image", {
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: "#home_page",
        scroller: "#home_page",
        start: "top top",
        end: "80% top",
        scrub: true,
      },
    });
  }, []);

  return (
    <main className="h-[100vh] relative">
      {/* 背景图片区域 */}
      <div className="w-full h-[100vh] mx-auto overflow-hidden sticky top-0 z-0">
        <img
          className="hero-bg-image h-full w-full object-cover"
          src={bg_img.src}
          alt="background"
        />
      </div>
      {/* 滚动区域 */}
      <div
        id="home_page"
        className="overflow-y-scroll overflow-x-hidden absolute top-0 left-0 z-10 w-full h-[100vh]"
      >
        {!!windowWidth && !!windowHeight && (
          <>
            {windowWidth <= 1280 ? <HeroH5 /> : <Hero />}
            <div className="bg-[#0b0b0b]">
              <TradeSmarter />
              {/* 小屏时展示 TradeProsH5，其它时候展示 TradePros */}
              {windowWidth <= 1280 ? (
                <div className="flex flex-col">
                  <div className="dividing" />
                  <TradeProsH5 />
                  <div className="dividing" />
                  <NeedH5 />
                  <div className="dividing" />
                  <AICompanionH5 />
                  <div className="dividing" />
                  <DailyWearabilityH5 />
                  <div className="dividing" />
                  <KnowH5 />
                  <div className="dividing" />
                </div>
              ) : (
                <>
                  <TradePros windowHeight={windowHeight} />
                  <Need windowHeight={windowHeight} />
                  <AICompanion />
                  <DailyWearability />
                  <Know />
                </>
              )}
            </div>
            <Footer />
          </>
        )}
      </div>
    </main>
  );
}
