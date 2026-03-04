export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface Reminder {
  id: string;
  title: string;
  time: string;
  date: string;
  subject?: string;
  completed: boolean;
  createdAt: number;
}

export interface ChecklistItem {
  id: string;
  title: string;
  subject: string;
  completed: boolean;
  date: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: number;
}

export interface TimetableSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  subject: string;
  type: 'study' | 'break' | 'exam' | 'revision';
}

export interface ExamDate {
  id: string;
  subject: string;
  date: string;
  time?: string;
  chaptersTotal: number;
  chaptersCompleted: number;
  notes?: string;
}

export interface FocusSession {
  id: string;
  date: string;
  duration: number;
  subject: string;
  rating: number;
  completedAt: number;
}

export interface MoodEntry {
  id: string;
  date: string;
  mood: 'great' | 'good' | 'okay' | 'tired' | 'stressed';
  note?: string;
  timestamp: number;
}

export interface SavedQuote {
  id: string;
  text: string;
  category: string;
  savedAt: number;
}

export interface StudyStreak {
  current: number;
  longest: number;
  lastStudyDate: string;
}

export interface BickyMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  isLoading?: boolean;
}

export type Subject =
  | 'math' | 'physics' | 'chemistry' | 'biology'
  | 'history' | 'geography' | 'civics' | 'economics'
  | 'hindi' | 'english' | 'cs' | 'other';

export type Theme = 'light' | 'dark';

export interface AppSettings {
  theme: Theme;
  dailyGoalHours: number;
  notifications: boolean;
  isPremium: boolean;
}

export interface AnalyticsData {
  weeklyHours: { day: string; hours: number }[];
  subjectDistribution: { subject: string; hours: number; color: string }[];
  focusScores: number[];
  totalHours: number;
  mostStudied: string;
  leastStudied: string;
  avgFocusScore: number;
}
