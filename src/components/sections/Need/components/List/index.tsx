import { useMemo } from "react";

import img1 from './assets/1.png';
import img2 from './assets/2.png';
import img3 from './assets/3.png';

const List = () => {
  const list = useMemo(() => [
    {
      title: 'Built-in Secure Element. ',
      text: 'WorldPin employs a CC EAL6+ certified secure chip to provide top-tier hardware-level security for critical operations.',
      image: img1.src,
    },
    {
      title: '2FA Authentication.',
      text: 'Confirm transactions securely with a simple double-tap.',
      image: img2.src,
    },
    {
      title: 'Privacy Mode. ',
      text: 'Easily activate privacy mode with a visible trust light, giving you full control over when your device is actively recording or connected.',
      image: img3.src,
    },
  ], []);

  return (
    <div className="flex shrink-0 gap-20 max-xl:flex-col">
      {list.map((item) => {
        const { image, title, text } = item;
        return (
          <div
            key={title}
            className="need_list_card h-[506px] w-[387px] flex-shrink-0 flex flex-col gap-24 max-xl:w-full max-xl:h-auto"
          >
            <div className="w-full h-[387px] max-xl:w-[300px] max-xl:h-[300px]">
              <img className="w-full h-full object-cover" src={image} alt={title} />
            </div>
            <div className="mt-24">
              <div className="text-base font-medium">{title}</div>
              <div className="text-base text-text-secondary mt-8">{text}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default List;
