'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Apply dark mode class to html element
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  useEffect(() => {
    // Step 1: Show AgentEX
    const timer1 = setTimeout(() => {
      setCurrentStep(1)
    }, 500)

    // Step 2: Show UX/AX message
    const timer2 = setTimeout(() => {
      setCurrentStep(2)
    }, 3000)

    // Step 3: Auto-scroll to next section
    const timer3 = setTimeout(() => {
      setCurrentStep(3)
      // Auto scroll to section 2
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({
          left: window.innerWidth,
          behavior: 'smooth',
        })
      }
    }, 8000)

    // Step 4: Auto-scroll to final section
    const timer4 = setTimeout(() => {
      setCurrentStep(4)
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({
          left: window.innerWidth * 2,
          behavior: 'smooth',
        })
      }
    }, 12000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }, [])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-white dark:bg-[#1e1e1e]">
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 h-10 bg-[#f3f3f3] dark:bg-[#2d2d2d] border-b border-[#e0e0e0] dark:border-[#3e3e42] z-30 flex items-center justify-between px-4">
        {/* File Tab */}
        <div className="flex items-center h-full">
          <div className="relative h-full flex items-center px-4">
            <span className="text-[#007acc] dark:text-[#9cdcfe] text-sm font-mono">
              agentex.js
            </span>
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#007acc] dark:bg-[#007acc]"></div>
          </div>
        </div>

        {/* Right side icons */}
        <div className="flex items-center gap-3">
          {/* Sun icon button for light mode toggle */}
          <button
            onClick={toggleTheme}
            className="text-[#6a6a6a] dark:text-[#858585] hover:text-[#2d2d2d] dark:hover:text-[#d4d4d4] transition-colors cursor-pointer p-1"
            aria-label="Toggle light mode"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
            >
              <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <path
                d="M8 1v2M8 13v2M15 8h-2M3 8H1M13.5 2.5l-1.4 1.4M3.9 12.1l-1.4 1.4M13.5 13.5l-1.4-1.4M3.9 3.9l-1.4-1.4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Code editor background pattern */}
      <div className="absolute inset-0 top-10 pointer-events-none">
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-[#f3f3f3] dark:bg-[#252526] border-r border-[#e0e0e0] dark:border-[#3e3e42]">
          <div className="p-2 space-y-0.5">
            {Array.from({ length: 100 }).map((_, i) => (
              <div
                key={i}
                className="text-[#6a6a6a] dark:text-[#858585] text-xs font-mono text-right pr-2 opacity-60 dark:opacity-100"
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>
        <div className="absolute left-12 top-0 bottom-0 right-0 p-8">
          <div className="font-mono text-[#6a6a6a] dark:text-[#6a9955] text-sm leading-relaxed whitespace-pre opacity-40 dark:opacity-20">
            {Array.from({ length: 50 }).map((_, i) => {
              const patterns = [
                '// ' + '-'.repeat(60),
                '// ' + '/'.repeat(60),
                '// ' + '+'.repeat(60),
                '//',
                '// ' + '-'.repeat(30) + '/'.repeat(30),
              ]
              return patterns[i % patterns.length] + '\n'
            })}
          </div>
        </div>
      </div>

      {/* Main content container with horizontal scroll */}
      <div
        ref={scrollContainerRef}
        className="flex h-full pt-10 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Section 1: AgentEX and UX/AX Message */}
        <div className="min-w-full h-full flex flex-col justify-center items-center px-8 relative z-10 snap-center">
          <div className="max-w-4xl w-full">
            {/* AgentEX Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: currentStep >= 1 ? 1 : 0,
                y: currentStep >= 1 ? 0 : 20,
              }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="mb-12"
            >
              <h1 className="text-8xl md:text-9xl font-bold text-[#2d2d2d] dark:text-[#d4d4d4] tracking-tight">
                AgentEX
              </h1>
            </motion.div>

            {/* UX/AX Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: currentStep >= 2 ? 1 : 0,
                y: currentStep >= 2 ? 0 : 20,
              }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
              className="space-y-4"
            >
              <p className="text-2xl md:text-4xl text-[#2d2d2d] dark:text-[#d4d4d4] leading-relaxed">
                The last 10 years were about{' '}
                <span className="text-[#4ec9b0] dark:text-[#4ec9b0]">UX</span> (User Experience)—designing for humans.
              </p>
              <p className="text-2xl md:text-4xl text-[#2d2d2d] dark:text-[#d4d4d4] leading-relaxed">
                The next 10 years are about{' '}
                <span className="text-[#4ec9b0] dark:text-[#4ec9b0]">AX</span> (Agent Experience)—designing for AI.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Section 2: Domain Inquiry */}
        <div className="min-w-full h-full flex flex-col justify-center items-center px-8 relative z-10 snap-center">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-4xl w-full"
          >
            <h2 className="text-5xl md:text-7xl font-bold text-[#2d2d2d] dark:text-[#d4d4d4] text-center">
              Are you interested in this premium domain?
            </h2>
          </motion.div>
        </div>

        {/* Section 3: Inquire Button */}
        <div className="min-w-full h-full flex flex-col justify-center items-center px-8 relative z-10 snap-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <a
              href="mailto:inquiry@agentex.com?subject=Domain Inquiry - AgentEX"
              className="inline-block px-12 py-6 bg-white dark:bg-[#1e1e1e] text-[#6a6a6a] dark:text-[#858585] text-2xl font-bold rounded-none hover:bg-[#f5f5f5] dark:hover:bg-[#2d2d2d] transition-colors duration-300 cursor-pointer border border-[#e0e0e0] dark:border-[#3e3e42]"
            >
              Inquire
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      {currentStep >= 3 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed bottom-8 right-8 z-20 text-[#6a6a6a] dark:text-[#858585] text-sm font-mono"
        >
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            →
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
