import { useEffect, useState } from 'react';

function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <button
      className="btn btn-primary rounded-circle position-fixed shadow"
      style={{ bottom: '24px', right: '24px', width: '48px', height: '48px', zIndex: 1050 }}
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
    >
      <i className="bi bi-arrow-up" aria-hidden="true" />
    </button>
  );
}

export default BackToTop;
