export interface Badge {
  id: string
  naam: string
  beschrijving: string
  icon: string
  requirement: number
  type: 'quiz' | 'interactive' | 'teacherbot' | 'completion'
}

export interface UserProgress {
  totalXP: number
  level: number
  quizScores: { [quizId: string]: number }
  completedQuizzes: string[]
  badges: string[]
  interactiveCount: number
  teacherbotCount: number
  lastActivity: string
}

export const BADGES: Badge[] = [
  {
    id: 'eerste-stappen',
    naam: 'Eerste Stappen',
    beschrijving: 'Voltooi je eerste quiz',
    icon: '🎯',
    requirement: 1,
    type: 'quiz'
  },
  {
    id: 'quiz-expert',
    naam: 'Quiz Expert',
    beschrijving: 'Voltooi 3 quizzen',
    icon: '🏆',
    requirement: 3,
    type: 'quiz'
  },
  {
    id: 'perfectionist',
    naam: 'Perfectionist',
    beschrijving: 'Behaal 100% op een quiz',
    icon: '⭐',
    requirement: 100,
    type: 'quiz'
  },
  {
    id: 'interactief-leren',
    naam: 'Interactief Leren',
    beschrijving: 'Gebruik de interactieve module 5 keer',
    icon: '🎮',
    requirement: 5,
    type: 'interactive'
  },
  {
    id: 'nieuwsgierig',
    naam: 'Nieuwsgierig',
    beschrijving: 'Stel 5 vragen aan de teacherbot',
    icon: '🤔',
    requirement: 5,
    type: 'teacherbot'
  },
  {
    id: 'bouwmeester',
    naam: 'Bouwmeester',
    beschrijving: 'Bereik level 5',
    icon: '👷',
    requirement: 5,
    type: 'completion'
  },
  {
    id: 'professional',
    naam: 'Professional',
    beschrijving: 'Bereik level 10',
    icon: '🎓',
    requirement: 10,
    type: 'completion'
  }
]

const XP_PER_LEVEL = 100

export function calculateLevel(xp: number): number {
  return Math.floor(xp / XP_PER_LEVEL) + 1
}

export function getXPForNextLevel(currentXP: number): number {
  const currentLevel = calculateLevel(currentXP)
  return currentLevel * XP_PER_LEVEL
}

export function getXPProgress(currentXP: number): number {
  const levelXP = ((currentXP % XP_PER_LEVEL) / XP_PER_LEVEL) * 100
  return Math.round(levelXP)
}

export function getDefaultProgress(): UserProgress {
  return {
    totalXP: 0,
    level: 1,
    quizScores: {},
    completedQuizzes: [],
    badges: [],
    interactiveCount: 0,
    teacherbotCount: 0,
    lastActivity: new Date().toISOString()
  }
}

export function checkBadges(progress: UserProgress): string[] {
  const newBadges: string[] = []

  for (const badge of BADGES) {
    if (progress.badges.includes(badge.id)) continue

    let earned = false

    switch (badge.type) {
      case 'quiz':
        if (badge.id === 'eerste-stappen' && progress.completedQuizzes.length >= 1) {
          earned = true
        } else if (badge.id === 'quiz-expert' && progress.completedQuizzes.length >= 3) {
          earned = true
        } else if (badge.id === 'perfectionist') {
          const perfectScores = Object.values(progress.quizScores).filter(score => score === 100)
          if (perfectScores.length > 0) earned = true
        }
        break
      case 'interactive':
        if (progress.interactiveCount >= badge.requirement) earned = true
        break
      case 'teacherbot':
        if (progress.teacherbotCount >= badge.requirement) earned = true
        break
      case 'completion':
        if (progress.level >= badge.requirement) earned = true
        break
    }

    if (earned) {
      newBadges.push(badge.id)
    }
  }

  return newBadges
}

export function addXP(progress: UserProgress, amount: number): UserProgress {
  const newProgress = {
    ...progress,
    totalXP: progress.totalXP + amount,
    lastActivity: new Date().toISOString()
  }
  newProgress.level = calculateLevel(newProgress.totalXP)

  const newBadges = checkBadges(newProgress)
  if (newBadges.length > 0) {
    newProgress.badges = [...newProgress.badges, ...newBadges]
  }

  return newProgress
}

export function saveProgress(progress: UserProgress): void {
  localStorage.setItem('mbo-bouwkunde-progress', JSON.stringify(progress))
}

export function loadProgress(): UserProgress {
  const saved = localStorage.getItem('mbo-bouwkunde-progress')
  if (saved) {
    try {
      return JSON.parse(saved)
    } catch {
      return getDefaultProgress()
    }
  }
  return getDefaultProgress()
}
