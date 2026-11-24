function ErrorMessage({ message = 'Something went wrong.', onRetry }) {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center text-center py-5 my-5">
      <i className="bi bi-exclamation-triangle-fill text-danger" style={{ fontSize: '3rem' }} />
      <h2 className="h5 mt-3 mb-1">We hit a snag</h2>
      <p className="text-body-secondary mb-3">{message}</p>
      {onRetry && (
        <button className="btn btn-outline-primary" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
