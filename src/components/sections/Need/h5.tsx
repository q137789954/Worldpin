"use client";
import List from "./components/List";

const NeedH5 = () => {

  return (
    <div className="px-20 mt-32">
      <div className="text-heading-3 text-text-white">
        Seamless Security, When You Need It
      </div>
      {/* List 组件容器 */}
      <div className="w-full flex flex-col gap-20 pb-[16px] mt-24">
        <List />
      </div>
    </div>
  );
};

export default NeedH5;
