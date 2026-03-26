import { useState } from 'react'
import PageContainer from '../../components/PageContainer/PageContainer'
import QuizCard from '../../components/QuizCard/QuizCard'
import quizData from '../../data/quizData.json'
import { loadProgress, addXP, saveProgress } from '../../utils/gamification'

function QuizModule() {
  const [selectedQuiz, setSelectedQuiz] = useState<any>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [totalPoints, setTotalPoints] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const handleQuizSelect = (quiz: any) => {
    setSelectedQuiz(quiz)
    setCurrentQuestion(0)
    setScore(0)
    setTotalPoints(quiz.vragen.reduce((sum: number, q: any) => sum + q.punten, 0))
    setIsComplete(false)
  }

  const handleAnswer = (_correct: boolean, punten: number) => {
    setScore(score + punten)
  }

  const handleNext = () => {
    if (currentQuestion < selectedQuiz.vragen.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setIsComplete(true)

      let progress = loadProgress()
      const percentage = Math.round(score / totalPoints * 100)
      const xpEarned = Math.floor(percentage / 2)

      progress.quizScores[selectedQuiz.id] = percentage
      if (!progress.completedQuizzes.includes(selectedQuiz.id)) {
        progress.completedQuizzes.push(selectedQuiz.id)
      }

      progress = addXP(progress, xpEarned)
      saveProgress(progress)
    }
  }

  const handleReset = () => {
    setSelectedQuiz(null)
    setCurrentQuestion(0)
    setScore(0)
    setIsComplete(false)
  }

  if (isComplete) {
    const percentage = Math.round(score / totalPoints * 100)
    const passed = percentage >= 60

    return (
      <PageContainer
        title="Quiz Resultaat"
        subtitle="Bekijk je score en verdien XP"
        icon="🎯"
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem',
          padding: '3rem 1rem',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '5rem',
            marginBottom: '1rem'
          }}>
            {passed ? '🎉' : '💪'}
          </div>

          <h2 style={{
            fontSize: '2rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '0.5rem'
          }}>
            {passed ? 'Goed gedaan!' : 'Bijna!'}
          </h2>

          <div style={{
            background: 'var(--bg-secondary)',
            padding: '2rem',
            borderRadius: 'var(--radius-lg)',
            width: '100%',
            maxWidth: '400px'
          }}>
            <div style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--primary-color)', marginBottom: '0.5rem' }}>
              {percentage}%
            </div>
            <div style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              {score} van {totalPoints} punten
            </div>
            <div style={{ fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 600 }}>
              +{Math.floor(percentage / 2)} XP verdiend!
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={() => handleQuizSelect(selectedQuiz)}
              style={{
                padding: '0.875rem 2rem',
                backgroundColor: 'var(--bg-secondary)',
                border: '2px solid var(--primary-color)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--primary-color)',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Opnieuw proberen
            </button>
            <button
              onClick={handleReset}
              style={{
                padding: '0.875rem 2rem',
                backgroundColor: 'var(--primary-color)',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                color: 'white',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Andere quiz
            </button>
          </div>
        </div>
      </PageContainer>
    )
  }

  if (selectedQuiz) {
    return (
      <PageContainer
        title={selectedQuiz.title}
        subtitle={selectedQuiz.beschrijving}
        icon="❓"
      >
        <div style={{ marginBottom: '2rem' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 1.5rem',
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-lg)',
            marginBottom: '2rem'
          }}>
            <button
              onClick={handleReset}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-primary)',
                fontWeight: 500,
                cursor: 'pointer'
              }}
            >
              ← Terug
            </button>
            <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
              Score: {score} / {totalPoints}
            </div>
          </div>

          <QuizCard
            vraag={selectedQuiz.vragen[currentQuestion]}
            vraagNummer={currentQuestion + 1}
            totaalVragen={selectedQuiz.vragen.length}
            onAnswer={handleAnswer}
            onNext={handleNext}
            isLastQuestion={currentQuestion === selectedQuiz.vragen.length - 1}
          />
        </div>
      </PageContainer>
    )
  }

  return (
    <PageContainer
      title="Quiz Module"
      subtitle="Test je kennis met interactieve quizzen"
      icon="❓"
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '1.5rem'
      }}>
        {quizData.quizzes.map(quiz => {
          const progress = loadProgress()
          const previousScore = progress.quizScores[quiz.id]

          return (
            <div
              key={quiz.id}
              style={{
                backgroundColor: 'var(--bg-primary)',
                border: '2px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onClick={() => handleQuizSelect(quiz)}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--primary-color)'
                e.currentTarget.style.transform = 'translateY(-4px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-color)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {quiz.title}
                </h3>
                {previousScore !== undefined && (
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    backgroundColor: 'var(--bg-tertiary)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: 'var(--primary-color)'
                  }}>
                    {previousScore}%
                  </span>
                )}
              </div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: 1.5 }}>
                {quiz.beschrijving}
              </p>
              <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: 'var(--text-light)' }}>
                <span>📝 {quiz.vragen.length} vragen</span>
                <span>⭐ {quiz.vragen.reduce((sum: number, q: any) => sum + q.punten, 0)} punten</span>
              </div>
            </div>
          )
        })}
      </div>
    </PageContainer>
  )
}

export default QuizModule
