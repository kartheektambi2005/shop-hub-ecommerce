function StarRating({ rating, showValue = true }) {
  const fullStars = Math.round(rating);

  return (
    <div className="d-flex align-items-center gap-1">
      <div className="text-warning">
        {[1, 2, 3, 4, 5].map((position) => (
          <i
            key={position}
            className={position <= fullStars ? 'bi bi-star-fill' : 'bi bi-star'}
            style={{ fontSize: '0.9rem' }}
          />
        ))}
      </div>
      {showValue && <span className="text-body-secondary small">{rating.toFixed(2)}</span>}
    </div>
  );
}

export default StarRating;
