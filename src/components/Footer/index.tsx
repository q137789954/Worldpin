
import discord_icon from './assets/discord.png';
import telegram_icon from './assets/telegram.png';
import x_icon from './assets/x.png';
import Link from "next/link";

const Footer = () => {

    return (
        <div className="w-1200 h-[100px] mx-auto flex items-center justify-between flex-wrap max-xl:w-auto max-xl:h-auto max-xl:flex-col max-xl:gap-24 max-xl:items-start max-xl:justify-start max-xl:px-20">
            <div className="flex-shrink-0">
                <div className="text-heading-4 text-white max-xl:text-heading-3">WOrldpin</div>
                <div className="text-sm text-text-secondary max-xl:mt-8">Worldpin© 2025 All Rights Reserved.</div>
            </div>
            <div className="flex items-center justify-between text-sm text-white  max-xl:flex-col max-xl:gap-24 max-xl:items-start max-xl:justify-start">
                <div className="cursor-pointer">Preorder <span className="text-text-secondary">(Coming Soon)</span></div>
                <div className="cursor-pointer">Terms of Service</div>
                <div className="cursor-pointer">Privacy Policy</div>
            </div>
            <div className='flex gap-16 items-center justify-between'>
                <Link className='w-32 h-32 cursor-pointer' href='https://x.com/Worldpin_AI' target="_blank">
                    <img className='w-full h-full' src={x_icon.src} />
                </Link>
                <Link className='w-32 h-32 cursor-pointer' href='https://t.me/worldpin_official' target="_blank">
                    <img className='w-full h-full' src={telegram_icon.src} />
                </Link>
                <Link className='w-32 h-32 cursor-pointer' href='https://discord.gg/YTwjtzcFW6' target="_blank">
                    <img className='w-full h-full' src={discord_icon.src} />
                </Link>
            </div>
        </div>
    )
}

export default Footer;