import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home, Bot, Clock, BarChart2, Calendar, CheckSquare,
  BookOpen, Moon, Sun, LogOut, Star, ChevronLeft, ChevronRight,
  Bell, Settings
} from 'lucide-react'
import { useStore } from '../../store'
import { useTheme } from '../../hooks/useTheme'
import { logOut } from '../../services/auth'

const NAV_ITEMS = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/bicky', icon: Bot, label: 'Bicky AI' },
  { path: '/timer', icon: Clock, label: 'Focus Timer' },
  { path: '/checklist', icon: CheckSquare, label: 'Checklist' },
  { path: '/timetable', icon: Calendar, label: 'Timetable' },
  { path: '/exams', icon: BookOpen, label: 'Exams' },
  { path: '/analytics', icon: BarChart2, label: 'Analytics' },
  { path: '/reminders', icon: Bell, label: 'Reminders' },
  { path: '/saved', icon: Star, label: 'Saved Quotes' },
]

export const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const { user, streak } = useStore()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logOut()
    navigate('/login')
  }

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-screen bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 z-30 flex flex-col shadow-soft overflow-hidden"
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-slate-100 dark:border-slate-800">
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-lavender flex items-center justify-center">
                <span className="text-white font-display text-sm font-bold">F</span>
              </div>
              <span className="font-display text-slate-800 dark:text-slate-100 text-base">FocusFlow</span>
            </motion.div>
          )}
        </AnimatePresence>
        {collapsed && (
          <div className="w-8 h-8 rounded-xl bg-gradient-lavender flex items-center justify-center mx-auto">
            <span className="text-white font-display text-sm font-bold">F</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition-colors ${collapsed ? 'mx-auto mt-2 block' : ''}`}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* User info */}
      {!collapsed && (
        <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-lavender flex items-center justify-center text-white text-sm font-medium">
              {user?.displayName?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-800 dark:text-slate-100 truncate font-body">
                {user?.displayName || 'Student'}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-body">
                🔥 {streak.current} day streak
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 py-3 overflow-y-auto">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 mx-2 rounded-xl transition-all duration-200 group font-body text-sm
              ${isActive
                ? 'bg-lavender-100 dark:bg-lavender-900/30 text-lavender-700 dark:text-lavender-300 font-medium'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200'
              }`
            }
          >
            <item.icon size={18} className="flex-shrink-0" />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="truncate"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>
        ))}
      </nav>

      {/* Bottom actions */}
      <div className="py-3 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-3 px-4 py-2.5 mx-2 rounded-xl w-full text-left text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm font-body"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          {!collapsed && <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>}
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2.5 mx-2 rounded-xl w-full text-left text-slate-600 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 transition-colors text-sm font-body"
        >
          <LogOut size={18} />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </motion.aside>
  )
}
