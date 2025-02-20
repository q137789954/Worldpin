"use client";

import { useMemo } from "react";
import img1 from "./assets/img1.png";
import img2 from "./assets/img2.png";
import "swiper/css";

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

  return (
    <section className="w-full px-20">
      <div className="h-full flex flex-col gap-24 items-center">
        <div>
          <div className="text-heading-3 text-text-white">
            Seamless Daily Wearability
          </div>
          <div className="text-lg text-text-secondary mt-16">
            Enjoy a lightweight, stylish design that fits effortlessly into your
            daily routine—whether at work, meetings, or on the go.
          </div>
        </div>
        <div className="flex flex-col gap-24">
          {list.map((item, index) => (
            <div className="" key={item.title}>
              <div>
                <img src={item.image.src} alt={item.title} className="w-full" />
              </div>
              <div className="w-[331px] mt-24">
                <h3 className="text-base  text-text-white">{item.title}</h3>
                <p className="text-base text-text-secondary mt-8">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DailyWearability;
