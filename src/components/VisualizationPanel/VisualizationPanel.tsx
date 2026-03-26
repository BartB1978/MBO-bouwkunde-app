import { BuildingParams } from '../InteractiveControls/InteractiveControls'
import './VisualizationPanel.css'

interface VisualizationPanelProps {
  params: BuildingParams
}

function VisualizationPanel({ params }: VisualizationPanelProps) {
  const totalOppervlakte = params.verdiepingen * params.oppervlakte
  const kostenPerM2 = (params.budget * 10000) / totalOppervlakte

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

  return (
    <div className="visualization-panel">
      <h3 className="viz-title">Gebouw Visualisatie</h3>

      <div className="building-visualization">
        <div className="building-container">
          <div className="building-structure">
            <div className="building-foundation">
              <div className="foundation-label">Fundering</div>
            </div>
            <div
              key="bg"
              className={`building-floor ${params.constructieType}`}
              style={{
                width: `${Math.min(100, (params.oppervlakte / 5))}%`,
                animationDelay: '0s'
              }}
            >
              <div className="floor-label">BG</div>
              <div className="floor-area">{params.oppervlakte}m²</div>
            </div>
            {Array.from({ length: params.verdiepingen - 1 }).map((_, index) => (
              <div
                key={index}
                className={`building-floor ${params.constructieType}`}
                style={{
                  width: `${Math.min(100, (params.oppervlakte / 5))}%`,
                  animationDelay: `${(index + 1) * 0.1}s`
                }}
              >
                <div className="floor-label">V{index + 1}</div>
                <div className="floor-area">{params.oppervlakte}m²</div>
              </div>
            ))}
          </div>
        </div>

        <div className="building-specs">
          <div className="spec-item">
            <span className="spec-icon">📏</span>
            <div className="spec-content">
              <div className="spec-label">Totale oppervlakte</div>
              <div className="spec-value">{totalOppervlakte.toLocaleString()} m²</div>
            </div>
          </div>

          <div className="spec-item">
            <span className="spec-icon">🏗️</span>
            <div className="spec-content">
              <div className="spec-label">Constructie</div>
              <div className="spec-value">
                {params.constructieType === 'stapelbouw' && 'Stapelbouw'}
                {params.constructieType === 'gietbouw' && 'Gietbouw'}
                {params.constructieType === 'houtskeletbouw' && 'Houtskeletbouw'}
                {params.constructieType === 'staalbouw' && 'Staalbouw'}
                {params.constructieType === 'prefab-betonbouw' && 'Prefab beton'}
              </div>
            </div>
          </div>

          <div className="spec-item">
            <span className="spec-icon">🌡️</span>
            <div className="spec-content">
              <div className="spec-label">Isolatie</div>
              <div className="spec-value">
                Vloer: Rc {params.isolatieVloer.toFixed(1)}<br />
                Wanden: Rc {params.isolatieWanden.toFixed(1)}<br />
                Dak: Rc {params.isolatieDak.toFixed(1)}
              </div>
            </div>
          </div>

          <div className="spec-item">
            <span className="spec-icon">💰</span>
            <div className="spec-content">
              <div className="spec-label">Kosten per m²</div>
              <div className="spec-value">€{Math.round(kostenPerM2).toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="budget-indicator">
        <div className="budget-header">
          <span className="budget-label">Budget allocatie</span>
          <span className={`budget-status ${budgetRatio > 1.1 ? 'over' : budgetRatio > 0.9 ? 'good' : 'under'}`}>
            {budgetRatio > 1.1 && '⚠️ Over budget'}
            {budgetRatio <= 1.1 && budgetRatio > 0.9 && '✓ Binnen budget'}
            {budgetRatio <= 0.9 && '💡 Ruimte over'}
          </span>
        </div>
        <div className="budget-bar">
          <div
            className={`budget-fill ${budgetRatio > 1 ? 'over' : ''}`}
            style={{ width: `${Math.min(100, budgetRatio * 100)}%` }}
          ></div>
        </div>
        <div className="budget-info">
          <span>Geschatte kosten: €{Math.round(geschatteKosten / 1000)}k</span>
          <span>Budget: €{params.budget * 10}k</span>
        </div>
      </div>
    </div>
  )
}

export default VisualizationPanel
