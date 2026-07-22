function SkeletonCard() {
  return (
    <div className="col-6 col-md-4 col-lg-3">
      <div className="card h-100 border-0 shadow-sm placeholder-glow">
        <div className="bg-body-secondary" style={{ height: '200px' }} />
        <div className="card-body">
          <span className="placeholder col-8 mb-2 d-block" />
          <span className="placeholder col-5 mb-2 d-block" />
          <span className="placeholder col-4 d-block" />
        </div>
      </div>
    </div>
  );
}

export default SkeletonCard;
