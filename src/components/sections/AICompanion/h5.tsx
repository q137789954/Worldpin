"use client";

import phone_img from "./assets/phone.png";

const AICompanion = () => {

  return (
    <section className="w-full px-20">
      <div className="h-full mx-auto flex flex-col gap-24 items-center">
        <div>
          <div className="text-heading-3 text-white">
            Your Everyday AI Companion
          </div>
          <div className="mt-16 text-lg text-text-secondary">
            WorldPin isn’t just a trading tool—it’s a wearable assistant that
            makes your day more productive and organized.
          </div>
        </div>
        <div>
          <img
            className="w-full"
            src={phone_img.src}
            alt="Phone"
          />
        </div>
        <div>
          <div className="text-base font-semibold text-white">
            Precision Signal Filtering.
          </div>
          <div className="mt-8 text-base text-text-secondary">
            WorldPin cuts through the noise by tracking your chosen tokens, key
            news, and social sentiment in real time, delivering concise
            bullet-point updates.
          </div>
        </div>
      </div>
    </section>
  );
};

export default AICompanion;
