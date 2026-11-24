function QuantityStepper({ value, onChange, min = 1, max = Infinity, size = '', label = 'item' }) {
  const sizeClass = size ? `btn-${size}` : '';

  return (
    <div className="input-group" style={{ width: '130px' }} role="group" aria-label={`Quantity of ${label}`}>
      <button
        type="button"
        className={`btn btn-outline-secondary ${sizeClass}`}
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label={`Decrease quantity of ${label}`}
      >
        <i className="bi bi-dash" aria-hidden="true" />
      </button>
      <output className={`form-control text-center ${size ? `form-control-${size}` : ''}`} aria-live="polite">
        {value}
      </output>
      <button
        type="button"
        className={`btn btn-outline-secondary ${sizeClass}`}
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label={`Increase quantity of ${label}`}
      >
        <i className="bi bi-plus" aria-hidden="true" />
      </button>
    </div>
  );
}

export default QuantityStepper;
