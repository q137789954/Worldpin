"use client";

import Link from "next/link";
import clsx from "clsx";
import styles from "./Navbar.module.css";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
        <Link href="/" className={styles.logo}>
          Worldpin
        </Link>
        <div className={styles.links}>
          <div className={clsx(styles.join, "text-secondary")}>
            Join Our Communities
          </div>
          <div className={clsx(styles.preorder, "text-primary")}>
            Preorder Coming Soon
          </div>
        </div>
      </div>
    </nav>
  );
}
