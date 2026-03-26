import { useState, useEffect, useRef } from 'react'
import teacherbotData from '../../data/teacherbotData.json'
import { loadProgress, addXP, saveProgress } from '../../utils/gamification'
import './Teacherbot.css'

interface Message {
  type: 'bot' | 'user'
  text: string
  timestamp: Date
}

interface TeacherbotProps {
  topicId?: string
}

function Teacherbot({ topicId }: TeacherbotProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [currentTopic, setCurrentTopic] = useState<any>(null)
  const [stage, setStage] = useState<'start' | 'hints' | 'reflection' | 'conclusion'>('start')
  const [hintIndex, setHintIndex] = useState(0)
  const [reflectionIndex, setReflectionIndex] = useState(0)
  const [freeFormQuestion, setFreeFormQuestion] = useState('')
  const [stuckCount, setStuckCount] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (topicId) {
      const topic = teacherbotData.topics.find(t => t.id === topicId)
      if (topic) {
        setCurrentTopic(topic)
        addBotMessage(`Hoi! Ik ben je virtuele docent voor bouwkunde. Laten we het hebben over "${topic.titel}". ${topic.startVraag}`)
      }
    } else {
      addBotMessage('Hoi! Ik ben je virtuele docent voor bouwkunde MBO niveau 4. Ik heb kennis van alle onderdelen van de bouw en gebruik de socratische methode om je te helpen leren. Stel me een vraag of kies een onderwerp uit de lijst!')
    }
  }, [topicId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const addBotMessage = (text: string) => {
    setMessages(prev => [...prev, { type: 'bot', text, timestamp: new Date() }])
  }

  const addUserMessage = (text: string) => {
    setMessages(prev => [...prev, { type: 'user', text, timestamp: new Date() }])
  }

  const handleSend = () => {
    if (input.trim() === '' || !currentTopic) return

    addUserMessage(input)
    const userInput = input.toLowerCase()

    const isStuck = userInput.includes('weet ik niet') ||
                    userInput.includes('geen idee') ||
                    userInput.includes('weet niet') ||
                    userInput.includes('snap het niet') ||
                    userInput.includes('?') && userInput.length < 15 ||
                    userInput.length < 10

    let progress = loadProgress()
    progress.teacherbotCount++
    progress = addXP(progress, 5)
    saveProgress(progress)

    setTimeout(() => {
      if (stage === 'start') {
        if (isStuck) {
          setStuckCount(prev => prev + 1)
          if (stuckCount >= 1) {
            addBotMessage(`Ik zie dat je het lastig vindt. Laat me je een hint geven: ${currentTopic.hints[0]}`)
            addBotMessage('Probeer nu op basis van deze hint mijn oorspronkelijke vraag te beantwoorden.')
            setStage('hints')
            setHintIndex(1)
          } else {
            addBotMessage('Ik zie dat je vastloopt. Probeer het nog een keer: wat weet je al over dit onderwerp? Zelfs een klein beetje kennis is een goed begin!')
          }
        } else if (userInput.length < 30) {
          addBotMessage('Interessant begin! Kun je daar wat meer over vertellen? Wat bedoel je daar precies mee?')
        } else {
          addBotMessage(`Goed nagedacht! ${currentTopic.hints[0]}`)
          setStage('hints')
          setHintIndex(1)
          setStuckCount(0)
        }
      } else if (stage === 'hints') {
        if (isStuck) {
          setStuckCount(prev => prev + 1)
          if (stuckCount >= 1 && hintIndex < currentTopic.hints.length) {
            addBotMessage(`Geen probleem! Hier is een aanvullende hint: ${currentTopic.hints[hintIndex]}`)
            addBotMessage('Probeer nu met deze informatie verder te denken.')
            setHintIndex(hintIndex + 1)
            setStuckCount(0)
          } else if (hintIndex >= currentTopic.hints.length) {
            addBotMessage('Je hebt nu verschillende hints gehad. Laten we reflecteren op wat je tot nu toe hebt begrepen: ' + currentTopic.reflectieVragen[0])
            setStage('reflection')
            setReflectionIndex(1)
            setStuckCount(0)
          } else {
            addBotMessage('Probeer het nog een keer. Denk na over wat ik je net vertelde. Wat kun je hieruit opmaken?')
          }
        } else if (userInput.length > 25) {
          setStuckCount(0)
          if (hintIndex < currentTopic.hints.length) {
            addBotMessage(`Mooi! Je bent goed bezig. ${currentTopic.hints[hintIndex]}`)
            setHintIndex(hintIndex + 1)
          } else {
            addBotMessage(`Uitstekend! Laten we nu reflecteren op wat je hebt geleerd: ${currentTopic.reflectieVragen[0]}`)
            setStage('reflection')
            setReflectionIndex(1)
          }
        } else {
          addBotMessage('Interessant, maar kun je wat dieper graven? Probeer je antwoord uit te breiden.')
        }
      } else if (stage === 'reflection') {
        if (isStuck) {
          setStuckCount(prev => prev + 1)
          if (stuckCount >= 1) {
            addBotMessage('Laat me je helpen: ' + (reflectionIndex < currentTopic.reflectieVragen.length ? currentTopic.reflectieVragen[reflectionIndex] : currentTopic.conclusie))
            if (reflectionIndex < currentTopic.reflectieVragen.length) {
              setReflectionIndex(reflectionIndex + 1)
            } else {
              setStage('conclusion')
              let progress = loadProgress()
              progress = addXP(progress, 10)
              saveProgress(progress)
            }
            setStuckCount(0)
          } else {
            addBotMessage('Probeer het nog een keer. Denk terug aan wat we hebben besproken.')
          }
        } else if (reflectionIndex < currentTopic.reflectieVragen.length) {
          addBotMessage(`Goed antwoord! ${currentTopic.reflectieVragen[reflectionIndex]}`)
          setReflectionIndex(reflectionIndex + 1)
          setStuckCount(0)
        } else {
          addBotMessage(currentTopic.conclusie)
          addBotMessage('Geweldig werk! Door zelf na te denken en te reflecteren heb je meer geleerd dan wanneer ik je gewoon het antwoord had gegeven. Je hebt 20 XP verdiend!')
          setStage('conclusion')
          setStuckCount(0)

          let progress = loadProgress()
          progress = addXP(progress, 15)
          saveProgress(progress)
        }
      } else {
        addBotMessage('Kies een nieuw onderwerp uit de lijst of stel me een nieuwe vraag!')
      }
    }, 800)

    setInput('')
  }

  const handleTopicSelect = (topic: any) => {
    if (topic.id === 'bbl') {
      return
    }
    setCurrentTopic(topic)
    setMessages([])
    setStage('start')
    setHintIndex(0)
    setReflectionIndex(0)
    setStuckCount(0)
    addBotMessage(`Interessant onderwerp! Laten we het hebben over "${topic.titel}". ${topic.startVraag}`)
  }

  const handleBBLQuestionStart = () => {
    if (freeFormQuestion.trim() === '') return

    const bblTopic = teacherbotData.topics.find(t => t.id === 'bbl')
    if (!bblTopic) return

    const customBBLTopic = {
      ...bblTopic,
      startVraag: freeFormQuestion,
      hints: [
        'Welke specifieke BBL regelgeving is hier van toepassing?',
        'Wat zijn de veiligheidseisen volgens het BBL?',
        'Hoe verhouden deze eisen zich tot het omgevingsplan?',
        'Welke gevolgen heeft dit voor je ontwerp of uitvoering?'
      ]
    }

    setCurrentTopic(customBBLTopic)
    setMessages([])
    setStage('start')
    setHintIndex(0)
    setReflectionIndex(0)
    setStuckCount(0)
    addBotMessage(`Interessante BBL-vraag! Je vraagt: "${freeFormQuestion}". Wat weet je hier al over?`)
    setFreeFormQuestion('')
  }

  const handleFreeFormStart = () => {
    if (freeFormQuestion.trim() === '') return

    const customTopic = {
      id: 'custom',
      titel: 'Eigen vraag',
      startVraag: '',
      hints: [
        'Denk aan de basisprincipes: wat zijn de belangrijkste elementen die hierbij komen kijken?',
        'Overweeg de praktische toepassing: hoe zou je dit in een echt bouwproject aanpakken?',
        'Bedenk welke regelgeving of normen hier mogelijk van toepassing zijn.',
        'Denk aan de veiligheid en duurzaamheid: welke aspecten zijn hierbij belangrijk?'
      ],
      reflectieVragen: [
        'Wat heb je geleerd uit deze discussie?',
        'Hoe helpt dit je om beter te begrijpen?',
        'Welke vervolgvragen heb je nu?'
      ],
      conclusie: 'Prima discussie! Door vragen te stellen en zelf na te denken, heb je meer inzicht gekregen. Blijf altijd nieuwsgierig en blijf vragen stellen!'
    }

    setCurrentTopic(customTopic)
    setMessages([])
    setStage('start')
    setHintIndex(0)
    setReflectionIndex(0)
    setStuckCount(0)
    addBotMessage(`Interessante vraag! Je vraagt: "${freeFormQuestion}". Wat weet je hier al over?`)
    setFreeFormQuestion('')
  }

  return (
    <div className="teacherbot">
      <div className="teacherbot-header">
        <div className="bot-avatar">🤖</div>
        <div className="bot-info">
          <h3 className="bot-name">Virtuele Docent Bouwkunde</h3>
          <p className="bot-status">
            {currentTopic ? `Bespreekt: ${currentTopic.titel}` : 'Vraagbaak voor alle bouwkunde onderwerpen'}
          </p>
        </div>
      </div>

      {!currentTopic && (
        <div className="topic-selector">
          <h4 className="selector-title">Kies een onderwerp of stel een eigen vraag</h4>

          <div style={{
            padding: '1.5rem',
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-lg)',
            marginBottom: '1.5rem',
            border: '2px solid var(--primary-color)'
          }}>
            <h5 style={{
              fontSize: '1rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginBottom: '0.75rem'
            }}>
              Stel je eigen vraag
            </h5>
            <p style={{
              fontSize: '0.875rem',
              color: 'var(--text-secondary)',
              marginBottom: '1rem'
            }}>
              Heb je een specifieke vraag over bouwkunde? Stel die hier en ik help je door socratische vragen te stellen.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <input
                type="text"
                placeholder="bijv. Hoe bepaal ik de juiste funderingsdiepte?"
                value={freeFormQuestion}
                onChange={(e) => setFreeFormQuestion(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleFreeFormStart()}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9375rem'
                }}
              />
              <button
                onClick={handleFreeFormStart}
                disabled={freeFormQuestion.trim() === ''}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: freeFormQuestion.trim() ? 'var(--primary-color)' : '#ccc',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: 600,
                  cursor: freeFormQuestion.trim() ? 'pointer' : 'not-allowed',
                  fontSize: '0.9375rem'
                }}
              >
                Start gesprek
              </button>
            </div>
          </div>

          <h5 style={{
            fontSize: '0.9375rem',
            fontWeight: 600,
            color: 'var(--text-secondary)',
            marginBottom: '1rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Of kies een voorgedefinieerd onderwerp
          </h5>

          <div className="topic-list">
            {teacherbotData.topics.map(topic => {
              if (topic.id === 'bbl') {
                return (
                  <div key={topic.id} style={{
                    padding: '1.5rem',
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-lg)',
                    border: '2px solid #ff9800',
                    marginTop: '1rem'
                  }}>
                    <h5 style={{
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      marginBottom: '0.5rem'
                    }}>
                      {topic.titel}
                    </h5>
                    <p style={{
                      fontSize: '0.875rem',
                      color: 'var(--text-secondary)',
                      marginBottom: '1rem'
                    }}>
                      Voor BBL-vragen kun je een eigen specifieke vraag stellen over het Besluit Bouwwerken Leefomgeving.
                    </p>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <input
                        type="text"
                        placeholder="bijv. Wat zijn de eisen voor brandveiligheid in een woongebouw?"
                        value={freeFormQuestion}
                        onChange={(e) => setFreeFormQuestion(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleBBLQuestionStart()}
                        style={{
                          flex: 1,
                          padding: '0.75rem',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--border-color)',
                          backgroundColor: 'var(--bg-primary)',
                          color: 'var(--text-primary)',
                          fontSize: '0.9375rem'
                        }}
                      />
                      <button
                        onClick={handleBBLQuestionStart}
                        disabled={freeFormQuestion.trim() === ''}
                        style={{
                          padding: '0.75rem 1.5rem',
                          backgroundColor: freeFormQuestion.trim() ? '#ff9800' : '#ccc',
                          color: 'white',
                          border: 'none',
                          borderRadius: 'var(--radius-md)',
                          fontWeight: 600,
                          cursor: freeFormQuestion.trim() ? 'pointer' : 'not-allowed',
                          fontSize: '0.9375rem'
                        }}
                      >
                        Start BBL gesprek
                      </button>
                    </div>
                  </div>
                )
              }
              return (
                <button
                  key={topic.id}
                  className="topic-button"
                  onClick={() => handleTopicSelect(topic)}
                >
                  <div className="topic-name">{topic.titel}</div>
                  <div className="topic-meta">
                    {topic.stadium} - {topic.werkproces}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      )}

      <div className="chat-container">
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.type}`}>
              {msg.type === 'bot' && <div className="message-avatar">🤖</div>}
              <div className="message-bubble">
                <p className="message-text">{msg.text}</p>
                <span className="message-time">
                  {msg.timestamp.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              {msg.type === 'user' && <div className="message-avatar">👤</div>}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {currentTopic && (
          <div className="input-area">
            <input
              type="text"
              className="chat-input"
              placeholder="Typ je antwoord..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button className="send-button" onClick={handleSend} disabled={input.trim() === ''}>
              Verzend
            </button>
          </div>
        )}
      </div>

      {currentTopic && stage === 'conclusion' && (
        <div className="topic-actions">
          <button className="action-button" onClick={() => {
            setCurrentTopic(null)
            setMessages([])
            addBotMessage('Kies een nieuw onderwerp uit de lijst of stel me een nieuwe vraag!')
          }}>
            Kies nieuw onderwerp
          </button>
        </div>
      )}
    </div>
  )
}

export default Teacherbot
