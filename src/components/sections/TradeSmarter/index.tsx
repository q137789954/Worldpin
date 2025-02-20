'use client'

import clsx from 'clsx';
import styles from './index.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, EffectFade } from 'swiper/modules';
import { useEffect, useState, useRef, useLayoutEffect } from 'react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import img1 from './assets/imge1.png';
import img2 from './assets/iphone_2.png';

const slides = [
  {
    id: 1,
    title: "Pro Trader Signal Alerts.",
    text: 'The device vibrates immediately upon receiving a signal from an elite trader, ensuring you never miss an opportunity.',
    src: img1,
    duration: 5000,
  },
  {
    id: 2,
    title: "Trader-Centric Market Summaries.",
    text: "Get customized insights based on your trading style—whether you're a day trader, swing trader, or long-term investor.",
    src: img2,
    duration: 5000,
  },
];

export default function Hero() {
  // 每个 slide 的进度百分比
  const [progressWidths, setProgressWidths] = useState<number[]>(new Array(slides.length).fill(0));
  // 当前激活的 slide 索引
  const [activeIndex, setActiveIndex] = useState(0);
  // 是否正在 autoplay
  const [isPlaying, setIsPlaying] = useState(false);
  // 当前 tween 引用
  const tweenRef = useRef<any>(null);
  // Swiper 实例引用
  const swiperRef = useRef<any>(null);
  // 入场/离场动画容器 ref
  const sectionRef = useRef<HTMLDivElement>(null);

  // 使用 timeline 整合入场和离场动画
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (sectionRef.current) {
      // 预设初始状态：向下偏移50，透明度为0
      gsap.set(sectionRef.current, { opacity: 0, y: 50 });

      // 创建一个 timeline，将入场与离场动画串联起来
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          scroller: "#home_page",
          // 这里 start 和 end 请根据实际情况调整，确保滚动区间足够大
          start: "30% bottom", // 当组件上边缘进入视口底部30%时开始
          end: "bottom 30%",   // 当组件底部离开视口30%时结束
          scrub: true,
          onEnter: () => {
            if (swiperRef.current && swiperRef.current.autoplay) {
              swiperRef.current.autoplay.start();
            }
          },
        },
      });

      // 第一阶段：入场动画（从初始状态到正常状态）
      tl.to(sectionRef.current, {
        opacity: 1,
        y: 0,
        ease: "power2.out",
        duration: 1,
      });
      // 第二阶段：离场动画（淡出）
      tl.to(sectionRef.current, {
        opacity: 0,
        ease: "power2.out",
        duration: 1,
      });

    }
    ScrollTrigger.refresh();
  }, []);

  // 当 activeIndex 或 isPlaying 发生变化时，启动进度条动画（仅当 autoplay 运行时启动）
  useEffect(() => {
    if (!isPlaying) return;

    // 前面 slide 直接显示满进度
    setProgressWidths((prev) =>
      prev.map((w, index) => (index < activeIndex ? 100 : 0))
    );
    const baseDuration = slides[activeIndex]?.duration || 5000;
    const transitionDuration = swiperRef.current?.params?.speed || 1200;
    const totalDuration = (baseDuration + transitionDuration) / 1000; // 单位秒

    const progressObj = { progress: 0 };

    if (tweenRef.current) {
      tweenRef.current.kill();
    }
    tweenRef.current = gsap.to(progressObj, {
      progress: 100,
      duration: totalDuration,
      ease: "none",
      onUpdate: () => {
        setProgressWidths((prev) => {
          const newWidths = [...prev];
          newWidths[activeIndex] = progressObj.progress;
          return newWidths;
        });
      },
    });
    return () => {
      if (tweenRef.current) {
        tweenRef.current.kill();
      }
    };
  }, [activeIndex, isPlaying]);

  // 处理 slide 切换时的视觉动画，并更新 activeIndex
  const handleSlideChangeTransitionStart = (swiper: any) => {
    // 离场 slide 动画
    if (swiper.previousIndex !== undefined) {
      const outgoingSlide = swiper.slides[swiper.previousIndex];
      if (outgoingSlide) {
        const outgoingImage = outgoingSlide.querySelector('.slide-image');
        const outgoingText = outgoingSlide.querySelector('.slide-text');
        if (outgoingImage) {
          gsap.to(outgoingImage, { opacity: 0, y: -20, duration: 0.4, ease: "power2.inOut" });
        }
        if (outgoingText) {
          gsap.to(outgoingText, { opacity: 0, y: 20, duration: 0.4, ease: "power2.inOut" });
        }
      }
    }
    // 入场 slide 动画
    const incomingSlide = swiper.slides[swiper.activeIndex];
    if (incomingSlide) {
      const incomingImage = incomingSlide.querySelector('.slide-image');
      const incomingText = incomingSlide.querySelector('.slide-text');
      if (incomingImage) {
        gsap.fromTo(
          incomingImage,
          { opacity: 0, y: 20, immediateRender: false },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
        );
      }
      if (incomingText) {
        gsap.fromTo(
          incomingText,
          { opacity: 0, y: -20, immediateRender: false },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
        );
      }
    }
    setActiveIndex(swiper.realIndex);
  };

  return (
    <section 
      ref={sectionRef} 
      className="flex justify-center items-center h-[640px] max-xl:h-auto"
    >
      <div className="w-[1200px] h-[640px] relative max-xl:w-full max-xl:h-auto max-xl:px-20">
        <div className="w-full h-full">
          <Swiper
            modules={[Autoplay, Navigation, EffectFade]}
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            speed={1200}
            onSlideChangeTransitionStart={handleSlideChangeTransitionStart}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              // 初始时暂停 autoplay，等待滚动触发进入时启动
              if (swiper.autoplay) {
                swiper.autoplay.stop();
              }
              // 监听 autoplay 事件：启动时设置 isPlaying 为 true，停止时为 false
              swiper.on('autoplayStart', () => {
                setIsPlaying(true);
                tweenRef.current && tweenRef.current.resume();
              });
              swiper.on('autoplayStop', () => {
                setIsPlaying(false);
                tweenRef.current && tweenRef.current.pause();
              });
            }}
            autoplay={{
              delay: slides[activeIndex]?.duration || 5000,
              disableOnInteraction: false,
            }}
            navigation={{
              prevEl: '.swiper-button-prev',
              nextEl: '.swiper-button-next',
            }}
            className="h-full"
          >
            {slides.map((slide) => {
              const { src, title, text } = slide;
              return (
                <SwiperSlide key={slide.id}>
                  {/* 大屏下保持绝对定位效果；小屏使用 flex 布局上下排列 */}
                  <div className="w-full h-full relative max-xl:flex max-xl:flex-col max-xl:items-center">
                    {/* 图片部分：小屏时高度固定为640px */}
                    <div className="slide-image max-xl:relative max-xl:w-full max-xl:h-[340px]">
                      <img 
                        src={src.src} 
                        alt={title}
                        className="h-full w-auto object-contain max-xl:w-full max-xl:h-full max-xl:object-cover"
                      />
                    </div>
                    {/* 文案部分 */}
                    {/* 小屏下增加额外标题（居中显示） */}
                    <div className="hidden max-xl:flex max-xl:w-full">
                      <div className="text-heading-3 text-white">Trade Smarter.</div>
                    </div>
                    <div className="slide-text absolute right-0 bottom-20 w-[387px] max-xl:static max-xl:mt-16 max-xl:px-20">
                      <div className="text-heading-4 max-xl:text-lg">{title}</div>
                      <div className="text-base text-text-secondary max-xl:mt-16">{text}</div>
                    </div>
                    <div className="absolute left-0 bottom-0 z-10 h-56 flex justify-center items-center max-xl:hidden">
                      <div className="text-heading-2 text-white">Trade Smarter.</div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
          
          {/* 进度条区域 */}
          <div className="absolute bottom-0 right-0 w-[387px] h-2 flex gap-8 z-20 max-xl:static max-xl:mt-16 max-xl:w-full max-xl:px-20">
            {slides.map((slide, index) => (
              <div key={slide.id} className="flex-1 bg-gray-500">
                <div 
                  className="h-full bg-white"
                  style={{ width: `${progressWidths[index]}%` }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* 导航按钮 */}
      {/* <div className={clsx("swiper-button-prev absolute left-0 top-0 w-1/2 h-full cursor-pointer z-10", styles.buttonPrev)} />
      <div className={clsx("swiper-button-next absolute right-0 top-0 w-1/2 h-full cursor-pointer z-10", styles.buttonNext)} /> */}
    </section>
  );
}
