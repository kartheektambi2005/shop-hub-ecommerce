import { Link } from 'react-router-dom';
import heroBanner from '../../assets/hero-banner.svg';

function HeroBanner() {
  return (
    <section className="bg-primary bg-gradient text-white overflow-hidden">
      <div className="container py-5">
        <div className="row align-items-center py-4 g-4">
          <div className="col-lg-6">
            <span className="badge bg-white text-primary mb-3">New Season Arrivals</span>
            <h1 className="display-4 fw-bold mb-3">Everything you need, one cart away.</h1>
            <p className="fs-5 mb-4">
              Electronics, fashion, beauty and home essentials — sourced from trusted brands
              and delivered to your door.
            </p>
            <Link to="/products" className="btn btn-light btn-lg fw-semibold px-4">
              Shop Now
            </Link>
          </div>

          <div className="col-lg-6 d-none d-lg-block">
            {/* Decorative: the heading and button already say everything the image does. */}
            <img
              src={heroBanner}
              alt=""
              width="600"
              height="440"
              className="img-fluid"
              fetchPriority="high"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
