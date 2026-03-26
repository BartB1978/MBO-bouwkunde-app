import { ChangeEvent } from 'react'
import './InteractiveControls.css'

export interface BuildingParams {
  verdiepingen: number
  oppervlakte: number
  constructieType: 'stapelbouw' | 'gietbouw' | 'houtskeletbouw' | 'staalbouw' | 'prefab-betonbouw'
  isolatieVloer: number
  isolatieWanden: number
  isolatieDak: number
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
            <option value="stapelbouw">Stapelbouw</option>
            <option value="gietbouw">Gietbouw</option>
            <option value="houtskeletbouw">Houtskeletbouw</option>
            <option value="staalbouw">Staalbouw</option>
            <option value="prefab-betonbouw">Prefab betonbouw</option>
          </select>
        </div>

        <div className="control-group">
          <label className="control-label">
            <span className="label-text">Isolatie vloer (Rc-waarde)</span>
            <span className="label-value">{params.isolatieVloer.toFixed(1)}</span>
          </label>
          <input
            type="range"
            min="1.0"
            max="15.0"
            step="0.1"
            value={params.isolatieVloer}
            onChange={handleSliderChange('isolatieVloer')}
            className="control-slider"
          />
          <div className="slider-marks">
            <span>Rc 1.0</span>
            <span>Rc 15.0</span>
          </div>
        </div>

        <div className="control-group">
          <label className="control-label">
            <span className="label-text">Isolatie wanden (Rc-waarde)</span>
            <span className="label-value">{params.isolatieWanden.toFixed(1)}</span>
          </label>
          <input
            type="range"
            min="1.0"
            max="15.0"
            step="0.1"
            value={params.isolatieWanden}
            onChange={handleSliderChange('isolatieWanden')}
            className="control-slider"
          />
          <div className="slider-marks">
            <span>Rc 1.0</span>
            <span>Rc 15.0</span>
          </div>
        </div>

        <div className="control-group">
          <label className="control-label">
            <span className="label-text">Isolatie dak (Rc-waarde)</span>
            <span className="label-value">{params.isolatieDak.toFixed(1)}</span>
          </label>
          <input
            type="range"
            min="1.0"
            max="15.0"
            step="0.1"
            value={params.isolatieDak}
            onChange={handleSliderChange('isolatieDak')}
            className="control-slider"
          />
          <div className="slider-marks">
            <span>Rc 1.0</span>
            <span>Rc 15.0</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InteractiveControls
