import PageContainer from '../../components/PageContainer/PageContainer'
import StageInfo from '../../components/StageInfo/StageInfo'
import StageTimeline from '../../components/StageTimeline/StageTimeline'
import WorkProcessCard from '../../components/WorkProcessCard/WorkProcessCard'
import bouwData from '../../data/bouwprocessen.json'

function TechnischOntwerp() {
  const stage = bouwData.stadia.find(s => s.id === 'TO')!
  const workProcesses = bouwData.werkprocessen.filter(wp => wp.stadiumId === 'TO')

  return (
    <PageContainer
      title="Technisch Ontwerp (TO)"
      subtitle="Gedetailleerde technische uitwerking en constructieve oplossingen"
      icon="🔧"
    >
      <StageInfo stage={stage} />

      <StageTimeline stages={bouwData.stadia} currentStageId="TO" />

      <div style={{ marginTop: '2.5rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
          Werkprocessen in deze fase
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {workProcesses.map(wp => (
            <WorkProcessCard key={wp.id} workProcess={wp} />
          ))}
        </div>
      </div>
    </PageContainer>
  )
}

export default TechnischOntwerp
