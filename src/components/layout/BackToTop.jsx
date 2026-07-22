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
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      title="Back to top"
    >
      <i className="bi bi-arrow-up" />
    </button>
  );
}

export default BackToTop;
