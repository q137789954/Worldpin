"use client";

import Link from "next/link";
import clsx from "clsx";
import styles from "./Navbar.module.css";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import logo_icon from '@/assets/logo.png';

export default function Navbar() {
  const navRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    // 创建一个 ScrollTrigger，当滚动时为 nav 添加 .black 类
    ScrollTrigger.create({
      trigger: "#home_page",
      scroller: "#home_page",
      start: "top top", // 当滚动容器的顶部到达视口顶部时
      end: "+=99999",
      toggleClass: {
        targets: navRef.current,
        className: styles.black,
      },
    });
    ScrollTrigger.refresh();
  }, []);

  return (
    <nav ref={navRef} className={clsx(styles.navbar)}>
      <div className={styles.content}>
        <Link href="/">
          <img className="h-[28px] w-[175px]" src={logo_icon.src} />
        </Link>
        <div className={styles.links}>
          <Link className={clsx(styles.join, "text-secondary")} href='https://x.com/Worldpin_AI' target="_blank">
            Join Our Communities
          </Link>
          <Link className={clsx(styles.preorder, "text-primary")} href='https://t.me/worldpin_official' target="_blank">
            Preorder Coming Soon
          </Link>
        </div>
      </div>
    </nav>
  );
}
