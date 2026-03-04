import React from 'react'
import { motion } from 'framer-motion'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  onClick?: () => void
  gradient?: string
}

export const Card: React.FC<CardProps> = ({
  children, className = '', hover = false, onClick, gradient
}) => {
  const base = 'rounded-2xl shadow-card bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 overflow-hidden'
  const hoverClass = hover ? 'cursor-pointer' : ''

  return (
    <motion.div
      whileHover={hover ? { y: -2, boxShadow: '0 8px 32px rgba(167,139,250,0.15)' } : {}}
      className={`${base} ${hoverClass} ${className}`}
      style={gradient ? { background: gradient } : {}}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`px-6 pt-5 pb-3 ${className}`}>{children}</div>
)

export const CardBody: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`px-6 pb-5 ${className}`}>{children}</div>
)
