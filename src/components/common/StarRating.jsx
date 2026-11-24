function StarRating({ rating, showValue = true }) {
  const fullStars = Math.round(rating);

  return (
    <div className="d-flex align-items-center gap-1" role="img" aria-label={`Rated ${rating.toFixed(1)} out of 5`}>
      <div className="text-warning" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((position) => (
          <i
            key={position}
            className={position <= fullStars ? 'bi bi-star-fill' : 'bi bi-star'}
            style={{ fontSize: '0.9rem' }}
          />
        ))}
      </div>
      {showValue && <span className="text-body-secondary small" aria-hidden="true">{rating.toFixed(2)}</span>}
    </div>
  );
}

export default StarRating;
