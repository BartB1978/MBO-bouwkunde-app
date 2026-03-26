import { BuildingParams } from '../InteractiveControls/InteractiveControls'
import './VisualizationPanel.css'

interface VisualizationPanelProps {
  params: BuildingParams
}

function VisualizationPanel({ params }: VisualizationPanelProps) {
  const totalOppervlakte = params.verdiepingen * params.oppervlakte
  const kostenPerM2 = (params.budget * 10000) / totalOppervlakte

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

  return (
    <div className="visualization-panel">
      <h3 className="viz-title">Gebouw Visualisatie</h3>

      <div className="building-visualization">
        <div className="building-container">
          <div className="building-structure">
            {Array.from({ length: params.verdiepingen }).map((_, index) => (
              <div
                key={index}
                className={`building-floor ${params.constructieType}`}
                style={{
                  width: `${Math.min(100, (params.oppervlakte / 5))}%`,
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="floor-label">V{params.verdiepingen - index}</div>
                <div className="floor-area">{params.oppervlakte}m²</div>
              </div>
            ))}
            <div className="building-foundation">
              <div className="foundation-label">Fundering</div>
            </div>
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
                {params.constructieType === 'hout' && 'Houtskelet'}
                {params.constructieType === 'beton' && 'Beton'}
                {params.constructieType === 'staal' && 'Staalframe'}
              </div>
            </div>
          </div>

          <div className="spec-item">
            <span className="spec-icon">🌡️</span>
            <div className="spec-content">
              <div className="spec-label">Isolatie</div>
              <div className="spec-value">
                {params.isolatie === 'basis' && 'Basis (Rc 2.5)'}
                {params.isolatie === 'gemiddeld' && 'Gemiddeld (Rc 4.5)'}
                {params.isolatie === 'hoog' && 'Hoog (Rc 6.0+)'}
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
