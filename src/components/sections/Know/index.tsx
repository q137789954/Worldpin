"use client";

import { useMemo, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

import x_icon from "./assets/x_icon.png";
import discord_icon from "./assets/discord_icon.png";
import telegram_icon from "./assets/telegram_icon.png";

const Know = () => {
  const list = useMemo(() => {
    return [
      {
        icon: x_icon.src,
        title: "X",
        subTitle: "Join our community",
        link: 'https://x.com/WorldpinAI',
      },
      {
        icon: telegram_icon.src,
        title: "Telegram",
        subTitle: "Join our community",
        link: 'https://t.me/worldpin_official',
      },
      {
        icon: discord_icon.src,
        title: "Discord",
        subTitle: "Join our community",
        link: 'https://discord.gg/YTwjtzcFW6'
      },
    ];
  }, []);

  // 为左右区域添加 ref
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.set(".know_card", {
        opacity: 0,
        y: 20,
      });

      // 左侧区域入场动画（轻微上移）
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: leftRef.current,
            scroller: "#home_page",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 右侧区域整体入场动画（视觉差效果：初始下移更多）
      gsap.fromTo(
        rightRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: rightRef.current,
            scroller: "#home_page",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 针对每个 card 的入场动画：归位并渐显，使用 stagger 实现依次出现
      gsap.to(".know_card", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: rightRef.current,
          scroller: "#home_page",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // 刷新 ScrollTrigger
    ScrollTrigger.refresh();
  }, []);

  return (
    <div className="w-1200 h-[492px] mx-auto flex items-center">
      <div className="w-full flex gap-20">
        {/* 左侧区域 */}
        <div ref={leftRef} className="flex-shrink-0 w-[590px]">
          <div className="text-heading-2 text-white">Stay in the Know</div>
          <div
            className="w-[488px] text-text-secondary"
            style={{ fontSize: "24px", lineHeight: "34px" }}
          >
            Join our Telegram, Discord, and X communities for the latest updates
            and exclusive previews. Stay tuned!
          </div>
        </div>
        {/* 右侧区域 */}
        <div ref={rightRef} className="flex-grow min-w-0 flex gap-20 items-end pb-8">
          {list.map((item) => (
            <Link key={item.title} href={item.link} className="know_card" target="_blank">
              <div>
                <img className="w-64 h-64" src={item.icon} alt={item.title} />
              </div>
              <div className="text-base text-text-secondary mt-16">{item.subTitle}</div>
              <div
                className="text-text-white mt-8"
                style={{ fontSize: "24px", lineHeight: "34px" }}
              >
                {item.title}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Know;
