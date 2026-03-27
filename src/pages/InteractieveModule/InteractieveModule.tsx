import { useState, useEffect } from 'react'
import PageContainer from '../../components/PageContainer/PageContainer'
import InteractiveControls, { BuildingParams } from '../../components/InteractiveControls/InteractiveControls'
import VisualizationPanel from '../../components/VisualizationPanel/VisualizationPanel'
import FeedbackPanel from '../../components/FeedbackPanel/FeedbackPanel'

const DEFAULT_PARAMS: BuildingParams = {
  verdiepingen: 3,
  oppervlakte: 150,
  constructieType: 'stapelbouw',
  isolatieVloer: 3.5,
  isolatieWanden: 4.5,
  isolatieDak: 6.0,
  budget: 50
}

const STORAGE_KEY = 'mbo-bouwkunde-interactive-params'

function InteractieveModule() {
  const [params, setParams] = useState<BuildingParams>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)

        if ('isolatie' in parsed && typeof parsed.isolatie === 'string') {
          const isolatieMap: Record<string, { vloer: number, wanden: number, dak: number }> = {
            'basis': { vloer: 2.5, wanden: 2.5, dak: 3.5 },
            'gemiddeld': { vloer: 3.5, wanden: 4.5, dak: 6.0 },
            'hoog': { vloer: 5.0, wanden: 6.0, dak: 7.0 }
          }
          const isolatieValues = isolatieMap[parsed.isolatie] || isolatieMap['gemiddeld']

          return {
            ...parsed,
            isolatieVloer: isolatieValues.vloer,
            isolatieWanden: isolatieValues.wanden,
            isolatieDak: isolatieValues.dak
          }
        }

        if (typeof parsed.isolatieVloer === 'number' &&
            typeof parsed.isolatieWanden === 'number' &&
            typeof parsed.isolatieDak === 'number') {
          return parsed
        }

        return DEFAULT_PARAMS
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
            het effect op kosten, duurzaamheid en haalbaarheid. Deze berekening is indicatief. Aan de uitkomst kunnen geen rechten worden ontleend.
            Jouw instellingen worden automatisch opgeslagen.
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
