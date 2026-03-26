import { ChangeEvent } from 'react'
import './InteractiveControls.css'

export interface BuildingParams {
  verdiepingen: number
  oppervlakte: number
  constructieType: 'stapelbouw' | 'gietbouw' | 'houtskeletbouw' | 'staalbouw' | 'prefab betonbouw'
  isolatie: 'basis' | 'gemiddeld' | 'hoog'
  budget: number
}

interface InteractiveControlsProps {
  params: BuildingParams
  onChange: (params: BuildingParams) => void
  onReset: () => void
}

function InteractiveControls({ params, onChange, onReset }: InteractiveControlsProps) {
  const handleSliderChange = (field: keyof BuildingParams) => (e: ChangeEvent<HTMLInputElement>) => {
    onChange({ ...params, [field]: Number(e.target.value) })
  }

  const handleSelectChange = (field: keyof BuildingParams) => (e: ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...params, [field]: e.target.value })
  }

  return (
    <div className="interactive-controls">
      <div className="controls-header">
        <h3 className="controls-title">Bouwparameters instellen</h3>
        <button className="reset-button" onClick={onReset}>
          Reset
        </button>
      </div>

      <div className="controls-grid">
        <div className="control-group">
          <label className="control-label">
            <span className="label-text">Aantal verdiepingen</span>
            <span className="label-value">{params.verdiepingen}</span>
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={params.verdiepingen}
            onChange={handleSliderChange('verdiepingen')}
            className="control-slider"
          />
          <div className="slider-marks">
            <span>1</span>
            <span>10</span>
          </div>
        </div>

        <div className="control-group">
          <label className="control-label">
            <span className="label-text">Oppervlakte per verdieping (m²)</span>
            <span className="label-value">{params.oppervlakte}</span>
          </label>
          <input
            type="range"
            min="50"
            max="500"
            step="10"
            value={params.oppervlakte}
            onChange={handleSliderChange('oppervlakte')}
            className="control-slider"
          />
          <div className="slider-marks">
            <span>50m²</span>
            <span>500m²</span>
          </div>
        </div>

        <div className="control-group">
          <label className="control-label">
            <span className="label-text">Budget (× €10.000)</span>
            <span className="label-value">€{params.budget * 10}.000</span>
          </label>
          <input
            type="range"
            min="10"
            max="200"
            step="5"
            value={params.budget}
            onChange={handleSliderChange('budget')}
            className="control-slider"
          />
          <div className="slider-marks">
            <span>€100k</span>
            <span>€2M</span>
          </div>
        </div>

        <div className="control-group">
          <label className="control-label">
            <span className="label-text">Constructietype</span>
          </label>
          <select
            value={params.constructieType}
            onChange={handleSelectChange('constructieType')}
            className="control-select"
          >
            <option value="hout">Houtskelet</option>
            <option value="beton">Betonnen draagconstructie</option>
            <option value="staal">Staalframe</option>
          </select>
        </div>

        <div className="control-group">
          <label className="control-label">
            <span className="label-text">Isolatieniveau</span>
          </label>
          <select
            value={params.isolatie}
            onChange={handleSelectChange('isolatie')}
            className="control-select"
          >
            <option value="basis">Basis (Rc 2.5)</option>
            <option value="gemiddeld">Gemiddeld (Rc 4.5)</option>
            <option value="hoog">Hoog (Rc 6.0+)</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default InteractiveControls
