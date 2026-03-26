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
    stapelbouw: 1250,
    gietbouw: 1450,
    houtskeletbouw: 1100,
    staalbouw: 1650,
    'prefab-betonbouw': 1550
  }

  const kostenPerRcPerM2Vloer = 15
  const kostenPerRcPerM2Wanden = 20
  const kostenPerRcPerM2Dak = 18

  const isolatieKostenVloer = params.isolatieVloer * kostenPerRcPerM2Vloer * params.oppervlakte
  const isolatieKostenWanden = params.isolatieWanden * kostenPerRcPerM2Wanden * (params.oppervlakte * 0.8) * params.verdiepingen
  const isolatieKostenDak = params.isolatieDak * kostenPerRcPerM2Dak * params.oppervlakte
  const totaleIsolatieKosten = isolatieKostenVloer + isolatieKostenWanden + isolatieKostenDak

  const geschatteKosten = (constructieKosten[params.constructieType] * totalOppervlakte) + totaleIsolatieKosten
  const budgetRatio = geschatteKosten / (params.budget * 10000)

  const gemiddeldeRc = (params.isolatieVloer + params.isolatieWanden + params.isolatieDak) / 3

  if (budgetRatio > 1.1) {
    messages.push({
      type: 'error',
      title: 'Budget overschrijding',
      message: `Je huidige ontwerp ligt ${Math.round((budgetRatio - 1) * 100)}% boven budget. Overweeg een ander constructietype, minder verdiepingen, kleinere oppervlakte of lagere isolatiewaarden.`
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

  if (params.constructieType === 'houtskeletbouw' && params.verdiepingen > 5) {
    messages.push({
      type: 'warning',
      title: 'Houtskeletbouw beperking',
      message: 'Houtskeletbouw boven 5 verdiepingen vereist speciale maatregelen en vergunningen. Overweeg gietbouw of staalbouw voor hogere gebouwen.'
    })
  }

  if (params.constructieType === 'stapelbouw' && params.verdiepingen > 6) {
    messages.push({
      type: 'warning',
      title: 'Stapelbouw beperking',
      message: 'Stapelbouw is minder geschikt voor zeer hoge gebouwen. Voor meer dan 6 verdiepingen wordt gietbouw of staalbouw aanbevolen.'
    })
  }

  if (gemiddeldeRc >= 8.0) {
    messages.push({
      type: 'success',
      title: 'Uitstekende isolatie',
      message: 'Je isolatiewaarden zijn excellent! Dit leidt tot zeer lage energiekosten, een A++++ energielabel en een hoge gebouwwaarde. Ideaal voor passiefhuizen.'
    })
  } else if (gemiddeldeRc >= 6.0) {
    messages.push({
      type: 'success',
      title: 'Zeer goede isolatie',
      message: 'Hoge isolatiewaarden leiden tot lage energiekosten en minimaal A++ energielabel. Dit verhoogt de waarde van het gebouw op lange termijn.'
    })
  } else if (gemiddeldeRc >= 4.0) {
    messages.push({
      type: 'info',
      title: 'Goede isolatie',
      message: 'Je isolatiewaarden voldoen ruim aan de huidige normen en zorgen voor een comfortabel binnenklimaat met acceptabele energiekosten.'
    })
  } else if (gemiddeldeRc < 2.5) {
    messages.push({
      type: 'warning',
      title: 'Onvoldoende isolatie',
      message: 'Je isolatiewaarden voldoen niet aan de wettelijke minimale eisen (Rc 2.5 voor nieuwbouw). Verhoog de isolatiewaarden om aan het Bouwbesluit te voldoen.'
    })
  } else {
    messages.push({
      type: 'info',
      title: 'Basis isolatie',
      message: 'Je isolatiewaarden voldoen aan minimale eisen, maar betere isolatie bespaart jaarlijks op energiekosten en verhoogt het wooncomfort significant.'
    })
  }

  if (params.isolatieDak < params.isolatieWanden) {
    messages.push({
      type: 'warning',
      title: 'Dakisolatie te laag',
      message: 'Normaal gesproken wordt het dak beter geïsoleerd dan de wanden, omdat warme lucht stijgt. Overweeg de dakisolatie te verhogen voor optimale energie-efficiëntie.'
    })
  }

  if (params.isolatieVloer > params.isolatieWanden) {
    messages.push({
      type: 'info',
      title: 'Hoge vloerisolatie',
      message: 'Je vloerisolatie is hoger dan de wanden. Dit kan nuttig zijn bij lage gebouwen of bij gebruik van vloerverwarming, maar controleer of dit nodig is.'
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
    stapelbouw: 'Stapelbouw is geschikt voor lage tot middelhoge woongebouwen. Flexibel en relatief snel te bouwen, met goede geluidsisolatie tussen woningen.',
    gietbouw: 'Gietbouw (ter plaatse gestort beton) is zeer duurzaam en brandveilig. Ideaal voor meerlaagse gebouwen en complexe vormen, maar met langere bouwtijd.',
    houtskeletbouw: 'Houtskeletbouw is duurzaam, CO₂-arm en snel te bouwen. Geschikt voor lage tot middelhoge gebouwen. Let op vochtbeheersing en brandveiligheid.',
    staalbouw: 'Staalbouw biedt grote overspanningen, flexibiliteit en een korte bouwtijd. Goed voor hoogbouw en gebouwen met grote open ruimtes, maar vraagt om goede brandwerendheid.',
    'prefab-betonbouw': 'Prefab betonbouw combineert snelheid met de voordelen van beton. Prefab elementen zorgen voor kwaliteitscontrole in de fabriek en korte bouwtijd op locatie.'
  }

  messages.push({
    type: 'info',
    title: 'Constructietype advies',
    message: constructieAdvies[params.constructieType]
  })

  const getEnergielabel = () => {
    if (gemiddeldeRc >= 10.0) return 'A++++'
    if (gemiddeldeRc >= 8.0) return 'A+++'
    if (gemiddeldeRc >= 6.5) return 'A++'
    if (gemiddeldeRc >= 5.0) return 'A+'
    if (gemiddeldeRc >= 4.0) return 'A'
    if (gemiddeldeRc >= 3.0) return 'B'
    return 'C'
  }

  const jaarlijkseEnergiebesparing = Math.max(0, Math.round((gemiddeldeRc - 2.5) * 8 * totalOppervlakte))

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
              {params.constructieType === 'stapelbouw' && `${Math.ceil(params.verdiepingen * 2.5)} maanden`}
              {params.constructieType === 'gietbouw' && `${Math.ceil(params.verdiepingen * 3.5)} maanden`}
              {params.constructieType === 'houtskeletbouw' && `${Math.ceil(params.verdiepingen * 1.8)} maanden`}
              {params.constructieType === 'staalbouw' && `${Math.ceil(params.verdiepingen * 2.2)} maanden`}
              {params.constructieType === 'prefab-betonbouw' && `${Math.ceil(params.verdiepingen * 2.0)} maanden`}
            </span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Energielabel</span>
            <span className="summary-value">{getEnergielabel()}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">CO₂ uitstoot constructie</span>
            <span className="summary-value">
              {params.constructieType === 'stapelbouw' && 'Gemiddeld'}
              {params.constructieType === 'gietbouw' && 'Hoog'}
              {params.constructieType === 'houtskeletbouw' && 'Zeer laag'}
              {params.constructieType === 'staalbouw' && 'Gemiddeld-hoog'}
              {params.constructieType === 'prefab-betonbouw' && 'Gemiddeld-hoog'}
            </span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Gemiddelde Rc-waarde</span>
            <span className="summary-value">{gemiddeldeRc.toFixed(1)}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Energiebesparing/jaar</span>
            <span className="summary-value">
              {jaarlijkseEnergiebesparing > 0 ? `€${jaarlijkseEnergiebesparing.toLocaleString()}` : '€0'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeedbackPanel
