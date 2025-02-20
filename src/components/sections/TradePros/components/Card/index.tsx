'use client'

import { FC } from "react";


interface Props {
    icon: any;
    title: string;
    text: string;
    image: any;
}

const Card:FC<Props> = (props) => {

    const { icon, title, text, image } = props;

    return (
        <div className="w-[384px] h-[535px] flex-shrink-0 rounded-2xl bg-black max-xl:w-full max-xl:h-[472px] TradePros_card" style={{border: '1px solid rgba(255, 255, 255, 0.15)'}}>
            <div className="px-24 pt-24 h-[244px]">
                <div>
                    <img src={icon} className="w-32 h-32" />
                </div>
                <div className="text-base text-text-white mt-16 font-medium">{title}</div>
                <div className="text-base text-text-secondary mt-8">{text}</div>
            </div>
            <div className="h-[290px] w-full max-xl:h-[227px]" >
                <img src={image} className="h-full w-full" />
            </div>
        </div>
    )

}

export default Card;