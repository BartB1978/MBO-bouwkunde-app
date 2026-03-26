import './WorkProcessCard.css'

interface WorkProcess {
  id: string
  naam: string
  beschrijving: string
  icon: string
  volgnummer: number
  activiteiten: string[]
}

interface WorkProcessCardProps {
  workProcess: WorkProcess
}

function WorkProcessCard({ workProcess }: WorkProcessCardProps) {
  return (
    <div className="work-process-card">
      <div className="work-process-header">
        <div className="work-process-icon">{workProcess.icon}</div>
        <div className="work-process-info">
          <div className="work-process-number">Werkproces {workProcess.volgnummer}</div>
          <h4 className="work-process-title">{workProcess.naam}</h4>
        </div>
      </div>
      <p className="work-process-description">{workProcess.beschrijving}</p>
      <div className="work-process-activities">
        <h5 className="activities-title">Belangrijkste activiteiten:</h5>
        <ul className="activities-list">
          {workProcess.activiteiten.map((activiteit, index) => (
            <li key={index}>{activiteit}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default WorkProcessCard
