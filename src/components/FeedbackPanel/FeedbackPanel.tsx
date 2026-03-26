import { BuildingParams } from '../InteractiveControls/InteractiveControls'
import './FeedbackPanel.css'

interface FeedbackPanelProps {
  params: BuildingParams
}

interface FeedbackMessage {
  type: 'success' | 'warning' | 'info' | 'error'
  title: string
  message: string
}

function FeedbackPanel({ params }: FeedbackPanelProps) {
  const messages: FeedbackMessage[] = []

  const totalOppervlakte = params.verdiepingen * params.oppervlakte
  const constructieKosten = {
    hout: 1200,
    beton: 1500,
    staal: 1800
  }
  const isolatieKosten = {
    basis: 50,
    gemiddeld: 100,
    hoog: 150
  }
  const geschatteKosten = (constructieKosten[params.constructieType] + isolatieKosten[params.isolatie]) * totalOppervlakte
  const budgetRatio = geschatteKosten / (params.budget * 10000)

  if (budgetRatio > 1.1) {
    messages.push({
      type: 'error',
      title: 'Budget overschrijding',
      message: `Je huidige ontwerp ligt ${Math.round((budgetRatio - 1) * 100)}% boven budget. Overweeg een ander constructietype, minder verdiepingen of kleinere oppervlakte.`
    })
  } else if (budgetRatio > 0.95) {
    messages.push({
      type: 'success',
      title: 'Optimaal budget gebruik',
      message: 'Je ontwerp past perfect binnen het beschikbare budget. Goede balans tussen kosten en specificaties!'
    })
  } else if (budgetRatio < 0.7) {
    messages.push({
      type: 'info',
      title: 'Budget ruimte beschikbaar',
      message: 'Er is nog budget over. Je zou kunnen overwegen om de isolatie te verbeteren of een hoogwaardiger constructietype te kiezen.'
    })
  }

  if (params.verdiepingen >= 7) {
    messages.push({
      type: 'warning',
      title: 'Hoogtebouw vereisten',
      message: 'Bij gebouwen van 7 verdiepingen of hoger gelden extra eisen aan brandveiligheid, liften en vluchtroutes. Overleg met een constructeur is noodzakelijk.'
    })
  }

  if (params.constructieType === 'hout' && params.verdiepingen > 5) {
    messages.push({
      type: 'warning',
      title: 'Houtconstructie beperking',
      message: 'Houtskeletbouw boven 5 verdiepingen vereist speciale maatregelen en vergunningen. Overweeg beton of staal voor hogere gebouwen.'
    })
  }

  if (params.isolatie === 'hoog') {
    messages.push({
      type: 'success',
      title: 'Duurzame keuze',
      message: 'Hoge isolatiewaarden leiden tot lagere energiekosten en een betere EPC-waarde. Dit verhoogt de waarde van het gebouw op lange termijn.'
    })
  } else if (params.isolatie === 'basis') {
    messages.push({
      type: 'info',
      title: 'Isolatie overwegingen',
      message: 'Basis isolatie voldoet aan minimale eisen, maar betere isolatie bespaart jaarlijks op energiekosten en verhoogt het wooncomfort.'
    })
  }

  if (totalOppervlakte > 2000) {
    messages.push({
      type: 'info',
      title: 'Grote oppervlakte',
      message: 'Bij grootschalige projecten zijn er mogelijkheden voor schaalvoordelen bij materialen en efficiëntere constructiemethoden.'
    })
  }

  const constructieAdvies = {
    hout: 'Houtskeletbouw is duurzaam, snel te bouwen en geschikt voor lage tot middelhoge gebouwen. Let op vochtbeheersing en brandveiligheid.',
    beton: 'Betonconstructies zijn zeer duurzaam en brandveilig. Ideaal voor meerlaagse gebouwen, maar met langere bouwtijd.',
    staal: 'Staalframebouw biedt grote overspanningen en flexibiliteit. Goed voor industriële en kantoorgebouwen, maar vraagt om goede brandwerendheid.'
  }

  messages.push({
    type: 'info',
    title: 'Constructietype advies',
    message: constructieAdvies[params.constructieType]
  })

  return (
    <div className="feedback-panel">
      <h3 className="feedback-title">Ontwerpadvies & Feedback</h3>
      <div className="feedback-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`feedback-message ${msg.type}`}>
            <div className="message-icon">
              {msg.type === 'success' && '✓'}
              {msg.type === 'warning' && '⚠'}
              {msg.type === 'info' && 'ℹ'}
              {msg.type === 'error' && '✕'}
            </div>
            <div className="message-content">
              <div className="message-title">{msg.title}</div>
              <div className="message-text">{msg.message}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="design-summary">
        <h4 className="summary-title">Ontwerpoverzicht</h4>
        <div className="summary-grid">
          <div className="summary-item">
            <span className="summary-label">Bouwvolume</span>
            <span className="summary-value">{totalOppervlakte.toLocaleString()} m²</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Geschatte bouwtijd</span>
            <span className="summary-value">
              {params.constructieType === 'hout' && `${Math.ceil(params.verdiepingen * 2)} maanden`}
              {params.constructieType === 'beton' && `${Math.ceil(params.verdiepingen * 3)} maanden`}
              {params.constructieType === 'staal' && `${Math.ceil(params.verdiepingen * 2.5)} maanden`}
            </span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Energielabel</span>
            <span className="summary-value">
              {params.isolatie === 'hoog' && 'A+ / A++'}
              {params.isolatie === 'gemiddeld' && 'A'}
              {params.isolatie === 'basis' && 'B / C'}
            </span>
          </div>
          <div className="summary-item">
            <span className="summary-label">CO₂ uitstoot</span>
            <span className="summary-value">
              {params.constructieType === 'hout' && 'Laag'}
              {params.constructieType === 'beton' && 'Hoog'}
              {params.constructieType === 'staal' && 'Gemiddeld'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeedbackPanel
