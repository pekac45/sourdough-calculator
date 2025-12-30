import { useState } from 'react'
import './App.css'

const round = (value) => Math.round(value * 10) / 10

const SliderRow = ({
  label,
  value,
  min,
  max,
  step,
  suffix = '',
  onChange,
  helper,
}) => {
  return (
    <label className="slider-row">
      <div className="slider-label">
        <span>{label}</span>
        <span className="slider-value">
          {round(value)}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      {helper ? <p className="helper">{helper}</p> : null}
    </label>
  )
}

function App() {
  const [targetDough, setTargetDough] = useState(500)
  const [hydration, setHydration] = useState(55)
  const [preFermentPercent, setPreFermentPercent] = useState(40)
  const [whiteFlourPercent, setWhiteFlourPercent] = useState(80)
  const [saltPercent, setSaltPercent] = useState(2)
  const [loaves, setLoaves] = useState(1)
  const [extraPreFerment, setExtraPreFerment] = useState(0)
  const [stashLocked, setStashLocked] = useState(false)

  const resetDefaults = () => {
    setTargetDough(500)
    setHydration(55)
    setPreFermentPercent(40)
    setWhiteFlourPercent(80)
    setSaltPercent(2)
    setLoaves(1)
    setExtraPreFerment(0)
    setStashLocked(false)
  }

  const effectiveTargetDough = targetDough * loaves
  const flourParts =
    1 + hydration / 100 + preFermentPercent / 100 + saltPercent / 100
  const totalFlour = effectiveTargetDough / flourParts
  const totalWater = totalFlour * (hydration / 100)
  const preFermentNeeded = totalFlour * (preFermentPercent / 100)
  const salt = totalFlour * (saltPercent / 100)
  const whiteFlour = totalFlour * (whiteFlourPercent / 100)
  const wholemealFlour = totalFlour - whiteFlour

  const autoStash = preFermentNeeded / 10
  const stashAmount = stashLocked ? extraPreFerment : autoStash
  const preFermentTotal = preFermentNeeded + stashAmount
  const preFermentPart = preFermentTotal / 11
  const prefermentStarter = preFermentPart * 1
  const prefermentWholemeal = preFermentPart * 2.5
  const prefermentWhite = preFermentPart * 2.5
  const prefermentWater = preFermentPart * 5

  return (
    <main className="page">
      <section className="panel">
        <header className="panel-header">
          <div>
            <p className="eyebrow">Main bread</p>
            <h1>Sourdough calculator</h1>
            <p className="lede">
              Drag a handle to scale the whole dough. Hydration, pre-ferment,
              flour split, and salt move their matching weights together.
            </p>
          </div>
          <div className="actions">
            <div className="badge">Default 55% hydration</div>
            <button className="ghost" type="button" onClick={resetDefaults}>
              Reset to defaults
            </button>
          </div>
        </header>

        <div className="grid">
          <div className="controls">
            <SliderRow
              label="Total Dough Mass"
              value={targetDough}
              min={300}
              max={1500}
              step={10}
              suffix=" g"
              helper="Per loaf. Pull this and every ingredient will follow."
              onChange={setTargetDough}
            />
            <SliderRow
              label="Hydration"
              value={hydration}
              min={45}
              max={85}
              step={1}
              suffix="%"
              helper="Adjusts only water while flour rebalances to hit your target weight."
              onChange={setHydration}
            />
            <SliderRow
              label="Pre-ferment"
              value={preFermentPercent}
              min={20}
              max={60}
              step={1}
              suffix="% of flour"
              helper="Portion of total flour that comes from the active pre-ferment."
              onChange={setPreFermentPercent}
            />
            <SliderRow
              label="White flour share"
              value={whiteFlourPercent}
              min={50}
              max={100}
              step={1}
              suffix="% of flour"
              helper="Wholemeal makes up the rest (80/20 by default)."
              onChange={setWhiteFlourPercent}
            />
            <SliderRow
              label="Salt"
              value={saltPercent}
              min={1}
              max={3}
              step={0.1}
              suffix="% of flour"
              onChange={setSaltPercent}
            />
          </div>

          <div className="readout">
            <SliderRow
              label="Amount of loaves"
              value={loaves}
              min={1}
              max={8}
              step={1}
              suffix=""
              helper="Multiplies the whole calculation."
              onChange={setLoaves}
            />
            <div className="readout-block">
              <p className="eyebrow">Calculated weights</p>
              <ul className="totals">
                <li>
                  <span>Active pre-ferment</span>
                  <strong>{round(preFermentNeeded)} g</strong>
                </li>
                <li>
                  <span>Water</span>
                  <strong>{round(totalWater)} g</strong>
                </li>
                <li>
                  <span>White flour</span>
                  <strong>{round(whiteFlour)} g</strong>
                </li>
                <li>
                  <span>Wholemeal flour</span>
                  <strong>{round(wholemealFlour)} g</strong>
                </li>
                <li>
                  <span>Salt</span>
                  <strong>{round(salt)} g</strong>
                </li>
              </ul>
              <p className="summary">
                Total (rounded):{' '}
                <strong>
                  {round(
                    preFermentNeeded +
                      totalWater +
                      whiteFlour +
                      wholemealFlour +
                      salt,
                  )}{' '}
                  g
                </strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="panel">
        <header className="panel-header">
          <div>
            <p className="eyebrow">Active pre-ferment</p>
            <h2>Build today&apos;s starter</h2>
            <p className="lede">
              Follows the 1 : 2.5 : 2.5 : 5 ratio (starter : wholemeal :
              white : water). It automatically adds extra so you can keep some
              for next time.
            </p>
          </div>
          <div className="badge">Needs + storage</div>
        </header>

        <div className="grid">
          <div className="controls">
            <SliderRow
              label="Extra to store"
              value={stashAmount}
              min={0}
              max={60}
              step={1}
              suffix=" g"
              helper="Defaults to the starter part so it keeps the 1:2.5:2.5:5 ratio. Move it if you want more."
              onChange={(value) => {
                setExtraPreFerment(value)
                setStashLocked(true)
              }}
            />
            <div className="box">
              <p className="eyebrow">Pre-ferment total</p>
              <p className="big-number">{round(preFermentTotal)} g</p>
              <p className="helper">
                {round(preFermentNeeded)} g needed for the dough +{' '}
                {round(stashAmount)} g saved for storage.
              </p>
            </div>
          </div>

          <div className="readout">
            <div className="readout-block">
              <p className="eyebrow">Scale by ratio</p>
              <ul className="totals">
                <li>
                  <span>Starter (1 part)</span>
                  <strong>{round(prefermentStarter)} g</strong>
                </li>
                <li>
                  <span>Wholemeal flour (2.5 parts)</span>
                  <strong>{round(prefermentWholemeal)} g</strong>
                </li>
                <li>
                  <span>White flour (2.5 parts)</span>
                  <strong>{round(prefermentWhite)} g</strong>
                </li>
                <li>
                  <span>Water (5 parts)</span>
                  <strong>{round(prefermentWater)} g</strong>
                </li>
              </ul>
              <p className="summary">
                Total: <strong>{round(preFermentTotal)} g</strong>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
