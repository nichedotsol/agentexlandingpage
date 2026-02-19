'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ContactFormProps {
  isOpen: boolean
  onClose: () => void
  isDarkMode: boolean
}

export default function ContactForm({ isOpen, onClose, isDarkMode }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => {
          onClose()
          setSubmitStatus('idle')
        }, 2000)
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 dark:bg-black/80 z-40 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ 
                opacity: 0, 
                scale: 0.1,
                rotate: -5,
                y: 50
              }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                rotate: 0,
                y: 0
              }}
              exit={{ 
                opacity: 0, 
                scale: 0.1,
                rotate: 5,
                y: 50
              }}
              transition={{ 
                type: 'spring',
                stiffness: 300,
                damping: 25,
                mass: 0.8,
                duration: 0.6
              }}
              className="pointer-events-auto w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={`relative ${
                  isDarkMode ? 'bg-[#1e1e1e]' : 'bg-white'
                } border ${
                  isDarkMode ? 'border-[#3e3e42]' : 'border-[#e0e0e0]'
                } shadow-2xl overflow-hidden`}
              >
                {/* Top Bar - Code Editor Style */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className={`h-10 flex items-center justify-between px-4 ${
                    isDarkMode ? 'bg-[#2d2d2d] border-b border-[#3e3e42]' : 'bg-[#f3f3f3] border-b border-[#e0e0e0]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <span className={`text-sm font-mono ${
                        isDarkMode ? 'text-[#9cdcfe]' : 'text-[#007acc]'
                      }`}>
                        contact.js
                      </span>
                      <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                        isDarkMode ? 'bg-[#007acc]' : 'bg-[#007acc]'
                      }`}></div>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className={`text-lg font-mono ${
                      isDarkMode ? 'text-[#858585] hover:text-[#d4d4d4]' : 'text-[#6a6a6a] hover:text-[#2d2d2d]'
                    } transition-colors w-6 h-6 flex items-center justify-center`}
                    aria-label="Close"
                  >
                    ×
                  </button>
                </motion.div>

                {/* Form with Code Editor Background */}
                <form onSubmit={handleSubmit} className="relative min-h-[500px]">
                  {/* Code Editor Background Pattern */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className={`absolute left-0 top-0 bottom-0 w-12 ${
                      isDarkMode ? 'bg-[#252526] border-r border-[#3e3e42]' : 'bg-[#f3f3f3] border-r border-[#e0e0e0]'
                    }`}>
                      <div className="p-2 space-y-0.5">
                        {Array.from({ length: 30 }).map((_, i) => (
                          <div
                            key={i}
                            className={`text-xs font-mono text-right pr-2 ${
                              isDarkMode ? 'text-[#858585]' : 'text-[#6a6a6a]'
                            } opacity-60`}
                          >
                            {i + 1}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="absolute left-12 top-0 bottom-0 right-0 p-8">
                      <div className={`font-mono ${
                        isDarkMode ? 'text-[#6a9955]' : 'text-[#6a6a6a]'
                      } text-sm leading-relaxed whitespace-pre opacity-20 dark:opacity-10`}>
                        {Array.from({ length: 25 }).map((_, i) => {
                          const patterns = [
                            '// ' + '-'.repeat(50),
                            '// ' + '/'.repeat(50),
                            '// ' + '+'.repeat(50),
                            '//',
                            '// ' + '-'.repeat(25) + '/'.repeat(25),
                          ]
                          return patterns[i % patterns.length] + '\n'
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Form Content */}
                  <div className="relative pl-16 pr-6 py-8 space-y-6">
                    {/* Name */}
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.5, type: 'spring' }}
                    >
                      <label
                        htmlFor="name"
                        className={`block text-sm font-medium mb-2 ${
                          isDarkMode ? 'text-[#d4d4d4]' : 'text-[#2d2d2d]'
                        }`}
                      >
                        Name
                      </label>
                      <motion.input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        whileFocus={{ scale: 1.01 }}
                        className={`w-full px-4 py-3 border ${
                          isDarkMode
                            ? 'bg-[#252526] border-[#3e3e42] text-[#d4d4d4] focus:border-[#007acc]'
                            : 'bg-white border-[#e0e0e0] text-[#2d2d2d] focus:border-[#007acc]'
                        } focus:outline-none focus:ring-1 focus:ring-[#007acc] transition-all duration-200`}
                        placeholder="Your name"
                      />
                    </motion.div>

                    {/* Email */}
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4, duration: 0.5, type: 'spring' }}
                    >
                      <label
                        htmlFor="email"
                        className={`block text-sm font-medium mb-2 ${
                          isDarkMode ? 'text-[#d4d4d4]' : 'text-[#2d2d2d]'
                        }`}
                      >
                        Email
                      </label>
                      <motion.input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        whileFocus={{ scale: 1.01 }}
                        className={`w-full px-4 py-3 border ${
                          isDarkMode
                            ? 'bg-[#252526] border-[#3e3e42] text-[#d4d4d4] focus:border-[#007acc]'
                            : 'bg-white border-[#e0e0e0] text-[#2d2d2d] focus:border-[#007acc]'
                        } focus:outline-none focus:ring-1 focus:ring-[#007acc] transition-all duration-200`}
                        placeholder="your.email@example.com"
                      />
                    </motion.div>

                    {/* Message */}
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5, duration: 0.5, type: 'spring' }}
                    >
                      <label
                        htmlFor="message"
                        className={`block text-sm font-medium mb-2 ${
                          isDarkMode ? 'text-[#d4d4d4]' : 'text-[#2d2d2d]'
                        }`}
                      >
                        Message
                      </label>
                      <motion.textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        whileFocus={{ scale: 1.01 }}
                        className={`w-full px-4 py-3 border ${
                          isDarkMode
                            ? 'bg-[#252526] border-[#3e3e42] text-[#d4d4d4] focus:border-[#007acc]'
                            : 'bg-white border-[#e0e0e0] text-[#2d2d2d] focus:border-[#007acc]'
                        } focus:outline-none focus:ring-1 focus:ring-[#007acc] transition-all duration-200 resize-none`}
                        placeholder="Tell us about your interest in AgentEX.com..."
                      />
                    </motion.div>

                    {/* Status Messages */}
                    <AnimatePresence>
                      {submitStatus === 'success' && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9, y: -10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9, y: -10 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                          className="p-4 bg-green-500/20 border border-green-500 text-green-600 dark:text-green-400"
                        >
                          Message sent successfully! We&apos;ll get back to you soon.
                        </motion.div>
                      )}

                      {submitStatus === 'error' && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9, y: -10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9, y: -10 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                          className="p-4 bg-red-500/20 border border-red-500 text-red-600 dark:text-red-400"
                        >
                          Failed to send message. Please try again or email us directly at contact@agentex.com
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Submit Buttons */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.5, type: 'spring' }}
                      className="flex gap-4 pt-2"
                    >
                      <motion.button
                        type="button"
                        onClick={onClose}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex-1 px-6 py-3 border ${
                          isDarkMode
                            ? 'border-[#3e3e42] text-[#858585] hover:bg-[#2d2d2d]'
                            : 'border-[#e0e0e0] text-[#6a6a6a] hover:bg-[#f5f5f5]'
                        } transition-all duration-200`}
                      >
                        Cancel
                      </motion.button>
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                        className={`flex-1 px-6 py-3 ${
                          isDarkMode
                            ? 'bg-[#2d2d2d] border border-[#3e3e42] text-[#858585] hover:bg-[#3e3e3e] hover:text-[#d4d4d4]'
                            : 'bg-[#f5f5f5] border border-[#e0e0e0] text-[#6a6a6a] hover:bg-[#e5e5e5] hover:text-[#2d2d2d]'
                        } transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium`}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center gap-2">
                            <motion.span
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            >
                              ⟳
                            </motion.span>
                            Sending...
                          </span>
                        ) : (
                          'Send Message'
                        )}
                      </motion.button>
                    </motion.div>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
