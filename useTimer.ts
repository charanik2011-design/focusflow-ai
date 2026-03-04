import React, { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import { useTheme } from './hooks/useTheme'
import { AppLayout } from './components/layout/AppLayout'
import { ProtectedRoute } from './components/auth/ProtectedRoute'

// Lazy loaded pages
const LoginPage = lazy(() => import('./pages/LoginPage'))
const SignupPage = lazy(() => import('./pages/SignupPage'))
const HomePage = lazy(() => import('./pages/HomePage'))
const BickyPage = lazy(() => import('./pages/BickyPage'))
const TimerPage = lazy(() => import('./pages/TimerPage'))
const ChecklistPage = lazy(() => import('./pages/ChecklistPage'))
const TimetablePage = lazy(() => import('./pages/TimetablePage'))
const ExamsPage = lazy(() => import('./pages/ExamsPage'))
const AnalyticsPage = lazy(() => import('./pages/AnalyticsPage'))
const RemindersPage = lazy(() => import('./pages/RemindersPage'))
const SavedPage = lazy(() => import('./pages/SavedPage'))

const PageLoader = () => (
  <div className="flex items-center justify-center h-64">
    <div className="flex gap-1.5">
      {[0, 1, 2].map(i => (
        <div
          key={i}
          className="w-2 h-2 rounded-full bg-lavender-400 animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  </div>
)

export default function App() {
  useAuth()
  useTheme()

  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<HomePage />} />
            <Route path="bicky" element={<BickyPage />} />
            <Route path="timer" element={<TimerPage />} />
            <Route path="checklist" element={<ChecklistPage />} />
            <Route path="timetable" element={<TimetablePage />} />
            <Route path="exams" element={<ExamsPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="reminders" element={<RemindersPage />} />
            <Route path="saved" element={<SavedPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
