import { Link } from 'react-router-dom'
import './StageTimeline.css'

interface Stage {
  id: string
  naam: string
  code: string
  icon: string
  color: string
  volgnummer: number
}

interface StageTimelineProps {
  stages: Stage[]
  currentStageId: string
}

const stageRoutes: { [key: string]: string } = {
  'SO': '/schets-ontwerp',
  'VO': '/voorlopig-ontwerp',
  'DO': '/definitief-ontwerp',
  'TO': '/technisch-ontwerp',
  'UO': '/uitvoering-ontwerp',
  'OPLEV': '/oplevering',
  'ONDER': '/onderhoud'
}

function StageTimeline({ stages, currentStageId }: StageTimelineProps) {
  return (
    <div className="stage-timeline">
      <h3 className="timeline-title">Alle bouwstadia</h3>
      <div className="timeline-container">
        {stages.map((stage, index) => {
          const isCurrent = stage.id === currentStageId
          const isPast = stage.volgnummer < stages.find(s => s.id === currentStageId)!.volgnummer

          return (
            <div key={stage.id} className="timeline-item-wrapper">
              <Link
                to={stageRoutes[stage.id]}
                className={`timeline-item ${isCurrent ? 'current' : ''} ${isPast ? 'past' : ''}`}
                style={{ '--stage-color': stage.color } as React.CSSProperties}
              >
                <div className="timeline-icon">{stage.icon}</div>
                <div className="timeline-content">
                  <div className="timeline-number">{stage.volgnummer}</div>
                  <div className="timeline-name">{stage.code}</div>
                </div>
              </Link>
              {index < stages.length - 1 && (
                <div className={`timeline-connector ${isPast ? 'past' : ''}`}></div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default StageTimeline
