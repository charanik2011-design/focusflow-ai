import type { MoodEntry, ExamDate, StudyStreak } from '../types'

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || ''

interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

async function callOpenAI(messages: ChatMessage[], maxTokens = 500): Promise<string> {
  if (!OPENAI_API_KEY || OPENAI_API_KEY === 'sk-your_openai_api_key') {
    return getMockResponse(messages[messages.length - 1]?.content || '')
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages,
      max_tokens: maxTokens,
      temperature: 0.8,
    }),
  })

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.statusText}`)
  }

  const data = await response.json()
  return data.choices[0]?.message?.content || ''
}

function getMockResponse(userMessage: string): string {
  const lower = userMessage.toLowerCase()

  if (lower.includes('how are you') || lower.includes('hello') || lower.includes('hi')) {
    return "Hey there! I'm Bicky, your study companion 🌟 I'm here and ready to help you crush your goals today. How are you feeling? Tell me what's on your mind — stressed, motivated, tired? I'll tailor a plan just for you."
  }
  if (lower.includes('stressed') || lower.includes('anxious') || lower.includes('overwhelmed')) {
    return "I hear you — that feeling of being overwhelmed is real and valid. Let's breathe for a second. Here's what we'll do: break everything into tiny steps. Start with just 20 minutes on your easiest subject. One small win at a time. You've handled tough days before — you can handle this one too. What subject should we start with?"
  }
  if (lower.includes('tired') || lower.includes('exhausted')) {
    return "Rest is part of studying smart, not a sign of weakness. Try a 20-minute focus session — that's it. Light subject, no pressure. Drink some water, maybe a small snack. Your brain needs fuel to function. What's something you feel comfortable reviewing right now?"
  }
  if (lower.includes('syllabus') || lower.includes('chapters') || lower.includes('plan')) {
    return "Let's build you a solid plan! Tell me:\n1. Which subjects or chapters do you need to cover?\n2. How many days do you have?\n3. How many hours can you study daily?\n\nOnce I know this, I'll create a realistic timetable and add reminders automatically. Don't worry — I'll make sure it's achievable, not overwhelming!"
  }
  if (lower.includes('motivat') || lower.includes('can\'t') || lower.includes('give up')) {
    return "Stop. I need you to hear this: the fact that you're here, asking for help instead of quitting? That's already strength. Most people give up silently. You didn't. That matters.\n\nYou don't need to feel motivated to start. You just need to start — motivation follows action. Pick one task. Set a 25-minute timer. Let's go. What's the first thing on your list?"
  }
  if (lower.includes('exam') || lower.includes('test') || lower.includes('tomorrow')) {
    return "Exam mode activated! 🎯 Here's the smart last-minute strategy:\n\n• Focus only on high-weightage topics\n• Do quick revision, not deep reading\n• Solve 2-3 previous year questions per chapter\n• Sleep at least 7 hours — seriously, it matters\n• Eat well tomorrow morning\n\nTell me which exam and I'll create a focused revision checklist for you right now!"
  }
  if (lower.includes('timer') || lower.includes('focus') || lower.includes('pomodoro')) {
    return "Great choice! Focused sessions are the most effective way to study. I recommend:\n\n⏱ **25 min** — Perfect for difficult topics (Pomodoro)\n⏱ **45 min** — Deep work for subjects you enjoy\n⏱ **15 min** — Quick revision sprints\n\nHead to the Timer page and I'll track your sessions. After each one, rate your focus — this helps me optimize your future sessions!"
  }

  return "I'm here for you! Whether you need help planning your studies, staying motivated, or just want to talk through your study anxiety — I've got your back. What are we working on today? 📚✨"
}

export async function generateBickyResponse(
  userMessage: string,
  conversationHistory: ChatMessage[],
  context: {
    mood?: string
    streak?: StudyStreak
    examDates?: ExamDate[]
    todayTasks?: number
    completedTasks?: number
  }
): Promise<string> {
  const contextStr = `
Context about the student:
- Current study streak: ${context.streak?.current || 0} days
- Tasks today: ${context.completedTasks || 0}/${context.todayTasks || 0} completed
- Upcoming exams: ${context.examDates?.map(e => `${e.subject} on ${e.date}`).join(', ') || 'None'}
- Current mood: ${context.mood || 'Unknown'}
  `.trim()

  const systemPrompt = `You are Bicky, an emotionally intelligent AI study companion built into FocusFlow AI.

Personality:
- Warm, calm, and genuinely caring — like a brilliant older sibling
- Direct and honest, but never harsh
- Encouraging without being fake or cringe
- Knows when to push gently and when to offer compassion
- Uses simple language, short paragraphs, occasional emojis (not excessive)
- Always actionable — never just sympathy, always a next step

${contextStr}

Capabilities you can offer:
- Create study plans and timetables
- Break down syllabi into daily tasks
- Set reminders and checklist items
- Suggest focus sessions with the timer
- Analyze study patterns and give feedback
- Provide emotional support during stress

Keep responses under 150 words unless creating a detailed plan. Be conversational, not robotic.`

  const messages: ChatMessage[] = [
    { role: 'system', content: systemPrompt },
    ...conversationHistory.slice(-8),
    { role: 'user', content: userMessage },
  ]

  return callOpenAI(messages, 400)
}

export async function generateMotivationalQuote(context: {
  mood?: string
  streak?: number
  examDays?: number
  isBeingSchedule?: boolean
}): Promise<string> {
  const systemPrompt = `Generate a single motivational quote for a student. 
Context: mood=${context.mood || 'neutral'}, streak=${context.streak || 0} days, exam in ${context.examDays || 'unknown'} days.
Return ONLY the quote text, no attribution, no quotation marks, no explanation. Make it feel genuine and specific to their situation. Max 2 sentences.`

  const messages: ChatMessage[] = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: 'Generate a motivational quote for me right now.' },
  ]

  const fallbackQuotes = [
    "The effort you put in today quietly builds the person you'll become tomorrow. Keep going.",
    "You don't have to be perfect — you just have to be consistent. That's enough.",
    "Every chapter you finish is a promise you kept to yourself. You're doing better than you think.",
    "Hard days make the breakthrough moments taste even sweeter. Stay in it.",
    "Your brain is building something incredible right now. Trust the process.",
    "The discomfort you feel during studying? That's growth happening in real time.",
    "One focused hour today is worth more than three distracted ones tomorrow.",
    "You chose to show up when it was hard. That's what champions do.",
  ]

  try {
    const quote = await callOpenAI(messages, 100)
    return quote.trim().replace(/^["']|["']$/g, '')
  } catch {
    return fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)]
  }
}

export const firestoreService = {
  async saveUserData(userId: string, collection: string, data: Record<string, unknown>) {
    const { doc, setDoc } = await import('firebase/firestore')
    const { db } = await import('../firebase/config')
    await setDoc(doc(db, 'users', userId, collection, 'data'), data, { merge: true })
  },

  async getUserData(userId: string, collection: string) {
    const { doc, getDoc } = await import('firebase/firestore')
    const { db } = await import('../firebase/config')
    const snap = await getDoc(doc(db, 'users', userId, collection, 'data'))
    return snap.exists() ? snap.data() : null
  },

  async updateStreak(userId: string, streak: object) {
    const { doc, setDoc } = await import('firebase/firestore')
    const { db } = await import('../firebase/config')
    await setDoc(doc(db, 'users', userId, 'streak', 'data'), streak)
  }
}
