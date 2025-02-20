"use client";

import { useMemo, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import img1 from "./assets/img1.png";
import img2 from "./assets/img2.png";
import "swiper/css";
import "swiper/css/effect-fade";

const DailyWearability = () => {
  const list = useMemo(
    () => [
      {
        image: img1,
        title: "Versatile Style.",
        text: "Description: Choose how you wear WorldPin—whether as a sleek PIN, a classic necklace, or a watch—ensuring your device fits perfectly into any outfit or occasion.",
      },
      {
        image: img2,
        title: "Contextual Reminders & Follow-Ups:",
        text: "WorldPin uses AI to highlight important action items from your conversations and seamlessly integrates with your calendar and productivity apps.",
      },
    ],
    []
  );

  const sectionRef = useRef(null);
  const carouselRef = useRef(null);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // 获取滚动容器
    const scrollerElem = document.querySelector("#home_page");
    if (!scrollerElem) {
      console.warn("找不到 id 为 home_page 的滚动容器");
    }

    const triggerElem = sectionRef.current;
    if (!triggerElem) {
      console.warn("找不到 sectionRef");
      return;
    }

    // 设置初始状态
    gsap.set(carouselRef.current, { x: -50, opacity: 0 });
    gsap.set(textRef.current, { x: 50, opacity: 0 });

    // 动画：轮播区域
    gsap.to(carouselRef.current, {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: triggerElem,
        scroller: scrollerElem,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });

    // 动画：文本描述区域
    gsap.to(textRef.current, {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: triggerElem,
        scroller: scrollerElem,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });
  }, []);

  return (
    <section ref={sectionRef} className="h-[702px] w-full">
      <div className="h-full w-[1200px] mx-auto flex gap-20 items-center">
        <div ref={carouselRef} className="w-[590px] h-[590px] relative">
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            modules={[Autoplay, EffectFade]}
            loop={true}
            autoplay={{ delay: 8000, disableOnInteraction: false }}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            speed={1500}
          >
            {list.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="w-[590px] h-[590px] relative">
                  <img
                    src={item.image.src}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="w-[331px] absolute left-24 bottom-24">
                    <h3 className="text-base text-text-white">{item.title}</h3>
                    <p className="text-base text-text-secondary mt-8">
                      {item.text}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div ref={textRef} className="w-[590px] flex items-center">
          <div className="w-[578px] mx-auto">
            <div className="text-heading-2 text-text-white">
              Seamless Daily Wearability
            </div>
            <div className="text-2xl text-text-secondary">
              Enjoy a lightweight, stylish design that fits effortlessly into
              your daily routine—whether at work, meetings, or on the go.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailyWearability;
