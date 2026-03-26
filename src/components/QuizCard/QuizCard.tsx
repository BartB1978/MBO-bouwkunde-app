import { useState } from 'react'
import './QuizCard.css'

interface QuizQuestion {
  id: string
  type: 'meerkeuze' | 'open'
  vraag: string
  opties?: string[]
  correctAntwoord?: number
  voorbeeldAntwoorden?: string[]
  uitleg: string
  punten: number
}

interface QuizCardProps {
  vraag: QuizQuestion
  vraagNummer: number
  totaalVragen: number
  onAnswer: (correct: boolean, punten: number) => void
  onNext: () => void
  isLastQuestion: boolean
}

function QuizCard({ vraag, vraagNummer, totaalVragen, onAnswer, onNext, isLastQuestion }: QuizCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [openAnswer, setOpenAnswer] = useState('')
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const handleSubmit = () => {
    if (vraag.type === 'meerkeuze') {
      if (selectedAnswer === null) return
      const correct = selectedAnswer === vraag.correctAntwoord
      setIsCorrect(correct)
      setShowFeedback(true)
      onAnswer(correct, correct ? vraag.punten : 0)
    } else {
      if (openAnswer.trim() === '') return
      const hasKeyword = vraag.voorbeeldAntwoorden?.some(antwoord =>
        openAnswer.toLowerCase().includes(antwoord.toLowerCase())
      )
      setIsCorrect(hasKeyword || false)
      setShowFeedback(true)
      onAnswer(hasKeyword || false, hasKeyword ? vraag.punten : Math.floor(vraag.punten / 2))
    }
  }

  const handleNext = () => {
    setSelectedAnswer(null)
    setOpenAnswer('')
    setShowFeedback(false)
    onNext()
  }

  return (
    <div className="quiz-card">
      <div className="quiz-header">
        <span className="quiz-progress">Vraag {vraagNummer} van {totaalVragen}</span>
        <span className="quiz-points">{vraag.punten} punten</span>
      </div>

      <h3 className="quiz-question">{vraag.vraag}</h3>

      {!showFeedback && (
        <div className="quiz-answers">
          {vraag.type === 'meerkeuze' && vraag.opties && (
            <div className="multiple-choice">
              {vraag.opties.map((optie, index) => (
                <button
                  key={index}
                  className={`choice-button ${selectedAnswer === index ? 'selected' : ''}`}
                  onClick={() => setSelectedAnswer(index)}
                >
                  <span className="choice-letter">{String.fromCharCode(65 + index)}</span>
                  <span className="choice-text">{optie}</span>
                </button>
              ))}
            </div>
          )}

          {vraag.type === 'open' && (
            <div className="open-question">
              <textarea
                className="answer-input"
                placeholder="Typ hier je antwoord..."
                value={openAnswer}
                onChange={(e) => setOpenAnswer(e.target.value)}
                rows={4}
              />
              <p className="hint-text">
                Probeer minimaal 2-3 relevante punten te noemen
              </p>
            </div>
          )}

          <button
            className="submit-button"
            onClick={handleSubmit}
            disabled={
              (vraag.type === 'meerkeuze' && selectedAnswer === null) ||
              (vraag.type === 'open' && openAnswer.trim() === '')
            }
          >
            Controleer antwoord
          </button>
        </div>
      )}

      {showFeedback && (
        <div className={`quiz-feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
          <div className="feedback-header">
            <span className="feedback-icon">
              {isCorrect ? '✓' : '✕'}
            </span>
            <span className="feedback-title">
              {isCorrect ? 'Goed gedaan!' : 'Bijna goed'}
            </span>
          </div>

          {vraag.type === 'meerkeuze' && !isCorrect && vraag.opties && (
            <div className="correct-answer">
              <strong>Juiste antwoord:</strong> {vraag.opties[vraag.correctAntwoord!]}
            </div>
          )}

          {vraag.type === 'open' && (
            <div className="example-answers">
              <strong>Voorbeeldantwoorden:</strong>
              <ul>
                {vraag.voorbeeldAntwoorden?.map((antwoord, i) => (
                  <li key={i}>{antwoord}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="feedback-explanation">
            <strong>Uitleg:</strong>
            <p>{vraag.uitleg}</p>
          </div>

          <button className="next-button" onClick={handleNext}>
            {isLastQuestion ? 'Bekijk resultaat' : 'Volgende vraag'}
          </button>
        </div>
      )}
    </div>
  )
}

export default QuizCard
