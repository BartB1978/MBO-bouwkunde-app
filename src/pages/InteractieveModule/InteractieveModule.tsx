import { useState, useEffect } from 'react'
import PageContainer from '../../components/PageContainer/PageContainer'
import InteractiveControls, { BuildingParams } from '../../components/InteractiveControls/InteractiveControls'
import VisualizationPanel from '../../components/VisualizationPanel/VisualizationPanel'
import FeedbackPanel from '../../components/FeedbackPanel/FeedbackPanel'

const DEFAULT_PARAMS: BuildingParams = {
  verdiepingen: 3,
  oppervlakte: 150,
  constructieType: 'beton',
  isolatie: 'gemiddeld',
  budget: 50
}

const STORAGE_KEY = 'mbo-bouwkunde-interactive-params'

function InteractieveModule() {
  const [params, setParams] = useState<BuildingParams>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        return DEFAULT_PARAMS
      }
    }
    return DEFAULT_PARAMS
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(params))
  }, [params])

  const handleReset = () => {
    setParams(DEFAULT_PARAMS)
  }

  return (
    <PageContainer
      title="Interactieve Module"
      subtitle="Experimenteer met bouwparameters en zie direct het resultaat"
      icon="🎮"
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          padding: '1.25rem',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-lg)',
          borderLeft: '4px solid var(--primary-color)'
        }}>
          <p style={{ color: 'var(--text-primary)', lineHeight: 1.6 }}>
            Gebruik de onderstaande controls om een gebouw te ontwerpen. Pas parameters aan en zie direct
            het effect op kosten, duurzaamheid en haalbaarheid. Jouw instellingen worden automatisch opgeslagen.
          </p>
        </div>

        <InteractiveControls
          params={params}
          onChange={setParams}
          onReset={handleReset}
        />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '2rem'
        }}>
          <VisualizationPanel params={params} />
          <FeedbackPanel params={params} />
        </div>
      </div>
    </PageContainer>
  )
}

export default InteractieveModule
