"use client";

import { useMemo } from "react";

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
      },
      {
        icon: discord_icon.src,
        title: "Telegram",
        subTitle: "Join our community",
      },
      {
        icon: telegram_icon.src,
        title: "Discord",
        subTitle: "Join our community",
      },
    ];
  }, []);

  return (
    <div className="px-20">
        <div>
          <div className="text-heading-3 text-white">Stay in the Know</div>
          <div
            className="text-lg text-text-secondary mt-16"
          >
            Join our Telegram, Discord, and X communities for the latest updates
            and exclusive previews. Stay tuned!
          </div>
        </div>
        <div className="flex-grow min-w-0 flex gap-20 mt-24">
          {list.map((item) => (
            <div key={item.title} className="flex-grow flex-shrink min-w-0">
              <div>
                <img className="w-32 h-32" src={item.icon} alt={item.title} />
              </div>
              <div className="text-base text-text-secondary mt-16">{item.subTitle}</div>
              <div
                className="text-lg text-text-white mt-8"
              >
                {item.title}
              </div>
            </div>
          ))}
        </div>
      </div>
  );
};

export default Know;
