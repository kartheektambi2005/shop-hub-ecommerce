import { useId } from 'react';

function FormField({ label, name, error, className = '', hint, ...inputProps }) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = [error && errorId, hint && hintId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={className}>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        id={id}
        name={name}
        className={`form-control ${error ? 'is-invalid' : ''}`}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        {...inputProps}
      />
      {error && (
        <div id={errorId} className="invalid-feedback">
          {error}
        </div>
      )}
      {hint && (
        <div id={hintId} className="form-text">
          {hint}
        </div>
      )}
    </div>
  );
}

export default FormField;
