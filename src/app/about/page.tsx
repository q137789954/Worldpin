'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function About() {
  const contentRef = useRef(null)

  useEffect(() => {
    gsap.from(contentRef.current?.children || [], {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out"
    })
  }, [])

  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div ref={contentRef} className="max-w-4xl mx-auto space-y-12">
          <section>
            <h1 className="text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              关于我们
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              我们是一家致力于推动科技创新的企业，专注于开发下一代智能设备和解决方案。
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-900/50 backdrop-blur-lg p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">我们的愿景</h2>
              <p className="text-gray-300">
                通过持续创新和突破，为用户带来更智能、更便捷的未来生活方式。
              </p>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-lg p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">核心价值观</h2>
              <ul className="text-gray-300 space-y-2">
                <li>• 创新驱动发展</li>
                <li>• 用户体验至上</li>
                <li>• 追求卓越品质</li>
                <li>• 负责任的科技</li>
              </ul>
            </div>
          </section>

          <section className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">研发实力</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400">200+</div>
                <div className="text-gray-300">专利技术</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400">50+</div>
                <div className="text-gray-300">研发人员</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400">10+</div>
                <div className="text-gray-300">研发中心</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
} 