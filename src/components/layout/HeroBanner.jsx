import { useEffect, useState } from 'react';
import HeroSlide from './HeroSlide';
import { HERO_SLIDES } from './heroSlides';

const AUTOPLAY_MS = 3000;
const TOTAL = HERO_SLIDES.length;

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function HeroBanner() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(() => !prefersReducedMotion());
  const [isInteracting, setIsInteracting] = useState(false);

  const goTo = (index) => setActiveIndex((index + TOTAL) % TOTAL);

  // Auto-advance every 3 seconds, but never while the visitor is hovering or focused inside, or has paused it.
  useEffect(() => {
    if (!isPlaying || isInteracting) return undefined;
    const timerId = setInterval(() => setActiveIndex((index) => (index + 1) % TOTAL), AUTOPLAY_MS);
    return () => clearInterval(timerId);
  }, [isPlaying, isInteracting]);

  const isAutoRotating = isPlaying && !isInteracting;

  return (
    <section
      className="hero-carousel"
      aria-roledescription="carousel"
      aria-label="Featured promotions"
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
      onFocus={() => setIsInteracting(true)}
      onBlur={() => setIsInteracting(false)}
    >
      <h1 className="visually-hidden">ShopHub: electronics, fashion, beauty and home essentials</h1>

      <div className="hero-stage" aria-live={isAutoRotating ? 'off' : 'polite'}>
        {HERO_SLIDES.map((slide, index) => (
          <HeroSlide
            key={slide.id}
            slide={slide}
            position={index + 1}
            total={TOTAL}
            isActive={index === activeIndex}
            isFirst={index === 0}
          />
        ))}
      </div>

      <button
        type="button"
        className="hero-arrow hero-arrow--prev btn btn-light rounded-circle shadow d-none d-md-flex"
        onClick={() => goTo(activeIndex - 1)}
        aria-label="Previous slide"
      >
        <i className="bi bi-chevron-left" aria-hidden="true" />
      </button>
      <button
        type="button"
        className="hero-arrow hero-arrow--next btn btn-light rounded-circle shadow d-none d-md-flex"
        onClick={() => goTo(activeIndex + 1)}
        aria-label="Next slide"
      >
        <i className="bi bi-chevron-right" aria-hidden="true" />
      </button>

      <div className="hero-controls d-flex align-items-center gap-2">
        <button
          type="button"
          className="btn btn-sm btn-light rounded-circle hero-pause"
          onClick={() => setIsPlaying((playing) => !playing)}
          aria-label={isPlaying ? 'Pause slide rotation' : 'Start slide rotation'}
        >
          <i className={`bi ${isPlaying ? 'bi-pause-fill' : 'bi-play-fill'}`} aria-hidden="true" />
        </button>
        <div className="d-flex">
          {HERO_SLIDES.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              className={`hero-dot ${index === activeIndex ? 'is-active' : ''}`}
              onClick={() => goTo(index)}
              aria-label={`Go to slide ${index + 1}: ${slide.badge}`}
              aria-current={index === activeIndex ? 'true' : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
