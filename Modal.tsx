import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type {
  User, Reminder, ChecklistItem, TimetableSlot, ExamDate,
  FocusSession, MoodEntry, SavedQuote, StudyStreak,
  BickyMessage, AppSettings, Theme
} from '../types'

interface AppState {
  // Auth
  user: User | null
  setUser: (user: User | null) => void

  // Settings
  settings: AppSettings
  setTheme: (theme: Theme) => void
  updateSettings: (s: Partial<AppSettings>) => void

  // Data
  reminders: Reminder[]
  setReminders: (r: Reminder[]) => void
  addReminder: (r: Reminder) => void
  updateReminder: (id: string, updates: Partial<Reminder>) => void
  deleteReminder: (id: string) => void

  checklist: ChecklistItem[]
  setChecklist: (c: ChecklistItem[]) => void
  addChecklistItem: (c: ChecklistItem) => void
  updateChecklistItem: (id: string, updates: Partial<ChecklistItem>) => void
  deleteChecklistItem: (id: string) => void

  timetable: TimetableSlot[]
  setTimetable: (t: TimetableSlot[]) => void
  addTimetableSlot: (t: TimetableSlot) => void
  deleteTimetableSlot: (id: string) => void

  examDates: ExamDate[]
  setExamDates: (e: ExamDate[]) => void
  addExamDate: (e: ExamDate) => void
  updateExamDate: (id: string, updates: Partial<ExamDate>) => void
  deleteExamDate: (id: string) => void

  focusSessions: FocusSession[]
  setFocusSessions: (f: FocusSession[]) => void
  addFocusSession: (f: FocusSession) => void

  moodHistory: MoodEntry[]
  setMoodHistory: (m: MoodEntry[]) => void
  addMoodEntry: (m: MoodEntry) => void

  savedQuotes: SavedQuote[]
  setSavedQuotes: (q: SavedQuote[]) => void
  addSavedQuote: (q: SavedQuote) => void
  removeSavedQuote: (id: string) => void

  streak: StudyStreak
  setStreak: (s: StudyStreak) => void
  incrementStreak: () => void

  // Bicky AI chat
  bickyMessages: BickyMessage[]
  addBickyMessage: (m: BickyMessage) => void
  clearBickyMessages: () => void
  updateBickyMessage: (id: string, updates: Partial<BickyMessage>) => void

  // UI state
  activeTimer: { running: boolean; duration: number; remaining: number; subject: string } | null
  setActiveTimer: (t: AppState['activeTimer']) => void

  dailyQuote: string
  setDailyQuote: (q: string) => void
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),

      settings: { theme: 'light', dailyGoalHours: 6, notifications: true, isPremium: false },
      setTheme: (theme) => set((s) => ({ settings: { ...s.settings, theme } })),
      updateSettings: (updates) => set((s) => ({ settings: { ...s.settings, ...updates } })),

      reminders: [],
      setReminders: (reminders) => set({ reminders }),
      addReminder: (r) => set((s) => ({ reminders: [...s.reminders, r] })),
      updateReminder: (id, updates) => set((s) => ({
        reminders: s.reminders.map(r => r.id === id ? { ...r, ...updates } : r)
      })),
      deleteReminder: (id) => set((s) => ({ reminders: s.reminders.filter(r => r.id !== id) })),

      checklist: [],
      setChecklist: (checklist) => set({ checklist }),
      addChecklistItem: (c) => set((s) => ({ checklist: [...s.checklist, c] })),
      updateChecklistItem: (id, updates) => set((s) => ({
        checklist: s.checklist.map(c => c.id === id ? { ...c, ...updates } : c)
      })),
      deleteChecklistItem: (id) => set((s) => ({ checklist: s.checklist.filter(c => c.id !== id) })),

      timetable: [],
      setTimetable: (timetable) => set({ timetable }),
      addTimetableSlot: (t) => set((s) => ({ timetable: [...s.timetable, t] })),
      deleteTimetableSlot: (id) => set((s) => ({ timetable: s.timetable.filter(t => t.id !== id) })),

      examDates: [],
      setExamDates: (examDates) => set({ examDates }),
      addExamDate: (e) => set((s) => ({ examDates: [...s.examDates, e] })),
      updateExamDate: (id, updates) => set((s) => ({
        examDates: s.examDates.map(e => e.id === id ? { ...e, ...updates } : e)
      })),
      deleteExamDate: (id) => set((s) => ({ examDates: s.examDates.filter(e => e.id !== id) })),

      focusSessions: [],
      setFocusSessions: (focusSessions) => set({ focusSessions }),
      addFocusSession: (f) => set((s) => ({ focusSessions: [...s.focusSessions, f] })),

      moodHistory: [],
      setMoodHistory: (moodHistory) => set({ moodHistory }),
      addMoodEntry: (m) => set((s) => ({ moodHistory: [...s.moodHistory, m] })),

      savedQuotes: [],
      setSavedQuotes: (savedQuotes) => set({ savedQuotes }),
      addSavedQuote: (q) => set((s) => ({ savedQuotes: [...s.savedQuotes, q] })),
      removeSavedQuote: (id) => set((s) => ({ savedQuotes: s.savedQuotes.filter(q => q.id !== id) })),

      streak: { current: 0, longest: 0, lastStudyDate: '' },
      setStreak: (streak) => set({ streak }),
      incrementStreak: () => set((s) => {
        const today = new Date().toISOString().split('T')[0]
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
        const last = s.streak.lastStudyDate
        if (last === today) return s
        const newCurrent = last === yesterday ? s.streak.current + 1 : 1
        const newLongest = Math.max(newCurrent, s.streak.longest)
        return { streak: { current: newCurrent, longest: newLongest, lastStudyDate: today } }
      }),

      bickyMessages: [],
      addBickyMessage: (m) => set((s) => ({ bickyMessages: [...s.bickyMessages, m] })),
      clearBickyMessages: () => set({ bickyMessages: [] }),
      updateBickyMessage: (id, updates) => set((s) => ({
        bickyMessages: s.bickyMessages.map(m => m.id === id ? { ...m, ...updates } : m)
      })),

      activeTimer: null,
      setActiveTimer: (activeTimer) => set({ activeTimer }),

      dailyQuote: '',
      setDailyQuote: (dailyQuote) => set({ dailyQuote }),
    }),
    {
      name: 'focusflow-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        settings: state.settings,
        streak: state.streak,
        savedQuotes: state.savedQuotes,
        checklist: state.checklist,
        reminders: state.reminders,
        timetable: state.timetable,
        examDates: state.examDates,
        focusSessions: state.focusSessions,
        moodHistory: state.moodHistory,
        dailyQuote: state.dailyQuote,
        bickyMessages: state.bickyMessages,
      }),
    }
  )
)
