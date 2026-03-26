import './StageInfo.css'

interface Stage {
  naam: string
  code: string
  beschrijving: string
  doel: string
  belangrijkePunten: string[]
}

interface StageInfoProps {
  stage: Stage
}

function StageInfo({ stage }: StageInfoProps) {
  return (
    <div className="stage-info">
      <div className="stage-intro">
        <p className="stage-description">{stage.beschrijving}</p>
      </div>

      <div className="stage-goal">
        <h3 className="section-heading">Doel van deze fase</h3>
        <p className="goal-text">{stage.doel}</p>
      </div>

      <div className="stage-points">
        <h3 className="section-heading">Belangrijke aandachtspunten</h3>
        <ul className="points-list">
          {stage.belangrijkePunten.map((punt, index) => (
            <li key={index} className="point-item">{punt}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default StageInfo
