"use client";

import { useMemo } from "react";
import Card from "./components/Card";

import Bell_icon from "./assets/Bell.png";
import Layers_icon from "./assets/Layers.png";
import Notifications_img from "./assets/img1.png";
import Latest_img from "./assets/img2.png";

export default function TradeProsH5() {

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

  return (
    <div className="w-full overflow-visible mt-[32px]">
      <div className="w-full px-20">
        <div className="text-heading-3 text-text-white">
          Trade Alongside the Pros.
        </div>
        <div className="text-lg text-text-secondary mt-16">
          Experience direct insights and real-time interactions with elite
          traders through WorldPin's exclusive engagement features.
        </div>
      </div>
      <div className="w-full pl-20 flex flex-col gap-20 pb-[16px]">
        {list.map((item) => {
          return <Card {...item} key={item.title} />;
        })}
      </div>
    </div>
  );
}
