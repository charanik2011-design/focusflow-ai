import type { Subject } from '../types'

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0]
}

export function getTodayString(): string {
  return formatDate(new Date())
}

export function getDaysUntil(dateStr: string): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = new Date(dateStr)
  target.setHours(0, 0, 0, 0)
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
}

export function getDayName(dateStr?: string): string {
  const date = dateStr ? new Date(dateStr) : new Date()
  return date.toLocaleDateString('en-US', { weekday: 'long' })
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0')
  const s = (seconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}m`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m > 0 ? `${h}h ${m}m` : `${h}h`
}

export const SUBJECT_COLORS: Record<Subject | string, { bg: string; text: string; light: string }> = {
  math:       { bg: '#c4b5fd', text: '#5b21b6', light: '#f5f3ff' },
  physics:    { bg: '#bfdbfe', text: '#1e40af', light: '#eff6ff' },
  chemistry:  { bg: '#fed7aa', text: '#9a3412', light: '#fff7ed' },
  biology:    { bg: '#bbf7d0', text: '#166534', light: '#f0fdf4' },
  history:    { bg: '#d6b4a1', text: '#78350f', light: '#fef9f0' },
  geography:  { bg: '#99f6e4', text: '#134e4a', light: '#f0fdfa' },
  civics:     { bg: '#fecaca', text: '#991b1b', light: '#fef2f2' },
  economics:  { bg: '#fef08a', text: '#854d0e', light: '#fefce8' },
  hindi:      { bg: '#fbcfe8', text: '#9d174d', light: '#fdf2f8' },
  english:    { bg: '#bae6fd', text: '#075985', light: '#f0f9ff' },
  cs:         { bg: '#1e293b', text: '#f8fafc', light: '#f1f5f9' },
  other:      { bg: '#e2e8f0', text: '#475569', light: '#f8fafc' },
}

export function getSubjectColor(subject: string) {
  const key = subject.toLowerCase().replace(/\s+/g, '')
  return SUBJECT_COLORS[key] || SUBJECT_COLORS.other
}

export function getDayOfWeek(n: number): string {
  return ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][n]
}

export function getGreeting(): string {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  if (h < 21) return 'Good evening'
  return 'Good night'
}

export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export const SUBJECTS: Subject[] = [
  'math', 'physics', 'chemistry', 'biology', 'history',
  'geography', 'civics', 'economics', 'hindi', 'english', 'cs', 'other'
]
