import { Link } from 'react-router-dom';

function HeroBanner() {
  return (
    <section className="bg-primary bg-gradient text-white">
      <div className="container py-5">
        <div className="row align-items-center py-4">
          <div className="col-lg-7">
            <span className="badge bg-white text-primary mb-3">New Season Arrivals</span>
            <h1 className="display-4 fw-bold mb-3">Everything you need, one cart away.</h1>
            <p className="fs-5 mb-4 opacity-75">
              Electronics, fashion, beauty and home essentials — sourced from trusted brands
              and delivered to your door.
            </p>
            <Link to="/products" className="btn btn-light btn-lg fw-semibold px-4">
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
