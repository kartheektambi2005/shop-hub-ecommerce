function ErrorPage({ onReset }) {
  return (
    <div className="container py-5 text-center">
      <i className="bi bi-bug text-danger" style={{ fontSize: '3.5rem' }} />
      <h2 className="fw-bold mt-3">Something went wrong</h2>
      <p className="text-body-secondary">
        An unexpected error occurred while rendering this page. Please try again.
      </p>
      <button className="btn btn-primary px-4" onClick={onReset}>
        Reload Page
      </button>
    </div>
  );
}

export default ErrorPage;
