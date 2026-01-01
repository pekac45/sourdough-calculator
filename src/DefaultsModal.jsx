export const DEFAULT_FIELDS = [
  {
    key: 'targetDough',
    label: 'Total dough mass (per loaf)',
    min: 300,
    max: 1500,
    step: 10,
    suffix: 'g',
  },
  { key: 'hydration', label: 'Hydration', min: 45, max: 85, step: 1, suffix: '%' },
  {
    key: 'preFermentPercent',
    label: 'Pre-ferment',
    min: 20,
    max: 60,
    step: 1,
    suffix: '% of flour',
  },
  {
    key: 'whiteFlourPercent',
    label: 'White flour share',
    min: 50,
    max: 100,
    step: 1,
    suffix: '% of flour',
  },
  { key: 'saltPercent', label: 'Salt', min: 1, max: 3, step: 0.1, suffix: '% of flour' },
  { key: 'loaves', label: 'Amount of loaves', min: 1, max: 8, step: 1, suffix: '' },
  {
    key: 'extraPreFerment',
    label: 'Extra to store',
    min: 0,
    max: 60,
    step: 1,
    suffix: 'g',
    subtitle: 'Extra pre-ferment for storage; base dough calculation stays the same.',
  },
]

export const DefaultsModal = ({ isOpen, defaultsDraft, onChangeDraft, onClose, onSubmit }) => {
  if (!isOpen) return null

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <form className="modal" onSubmit={onSubmit}>
        <div className="modal-header">
          <div>
            <p className="eyebrow">Defaults</p>
            <h3>Edit default values</h3>
            <p className="helper">These values are used on first load and when resetting.</p>
          </div>
          <button className="ghost" type="button" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="defaults-grid">
          {DEFAULT_FIELDS.map(({ key, label, min, max, step, suffix, subtitle }) => (
            <label key={key} className="field">
              <div className="field-label">
                <span>{label}</span>
                <span className="helper">
                  Min {min}
                  {suffix ? ` ${suffix}` : ''} / Max {max}
                  {suffix ? ` ${suffix}` : ''}
                </span>
                {subtitle ? <span className="helper italic">{subtitle}</span> : null}
              </div>
              <div className="field-input">
                <input
                  type="number"
                  min={min}
                  max={max}
                  step={step}
                  value={defaultsDraft[key]}
                  onChange={(event) => onChangeDraft(key, event.target.value)}
                />
                {suffix ? <span className="suffix">{suffix}</span> : null}
              </div>
            </label>
          ))}
        </div>

        <div className="modal-actions">
          <button className="ghost" type="button" onClick={onClose}>
            Cancel
          </button>
          <button className="primary" type="submit">
            Save defaults
          </button>
        </div>
      </form>
    </div>
  )
}

