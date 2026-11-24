import { Link } from 'react-router-dom';

function HeroSlide({ slide, position, total, isActive, isFirst }) {
  return (
    <div
      className={`hero-slide hero-slide--${slide.theme} text-white ${isActive ? 'is-active' : ''}`}
      role="group"
      aria-roledescription="slide"
      aria-label={`${position} of ${total}`}
    >
      <div className="container py-5 hero-slide-content">
        <div className="row align-items-center py-4 g-4">
          <div className="col-lg-6">
            <span className="badge bg-white text-dark mb-3">{slide.badge}</span>
            <h2 className="display-4 fw-bold mb-3">{slide.title}</h2>
            <p className="fs-5 mb-4">{slide.text}</p>
            <Link to={slide.cta.to} className="btn btn-light btn-lg fw-semibold px-4">
              {slide.cta.label}
            </Link>
          </div>

          <div className="col-lg-6 d-none d-lg-block">
            {/* Decorative: the heading and button already say everything the image does. */}
            <img
              src={slide.image}
              alt=""
              width="600"
              height="440"
              className="img-fluid"
              loading={isFirst ? undefined : 'lazy'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSlide;
