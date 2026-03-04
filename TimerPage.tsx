import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface BadgeProps {
  children: React.ReactNode
  color?: string
  className?: string
}

export const Badge: React.FC<BadgeProps> = ({ children, color = '#c4b5fd', className = '' }) => (
  <span
    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium font-body ${className}`}
    style={{ backgroundColor: color + '30', color: color.replace('fd','700').replace('fe','700') }}
  >
    {children}
  </span>
)

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, size = 'md' }) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    if (isOpen) document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  const sizes = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl' }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            className={`relative w-full ${sizes[size]} bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden`}
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
          >
            {title && (
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-700">
                <h2 className="text-lg font-display text-slate-800 dark:text-slate-100">{title}</h2>
                <button
                  onClick={onClose}
                  className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <X size={18} className="text-slate-500" />
                </button>
              </div>
            )}
            <div className="p-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export const SubjectDot: React.FC<{ subject: string; size?: number }> = ({ subject, size = 10 }) => {
  const colors: Record<string, string> = {
    math: '#c4b5fd', physics: '#bfdbfe', chemistry: '#fed7aa', biology: '#bbf7d0',
    history: '#d6b4a1', geography: '#99f6e4', civics: '#fecaca', economics: '#fef08a',
    hindi: '#fbcfe8', english: '#bae6fd', cs: '#94a3b8', other: '#e2e8f0'
  }
  const color = colors[subject.toLowerCase()] || colors.other
  return <span className="inline-block rounded-full flex-shrink-0" style={{ width: size, height: size, backgroundColor: color }} />
}
