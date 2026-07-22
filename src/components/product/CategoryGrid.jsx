import { Link } from 'react-router-dom';

const CATEGORY_ICONS = {
  smartphones: 'bi-phone',
  laptops: 'bi-laptop',
  fragrances: 'bi-flower1',
  skincare: 'bi-droplet',
  groceries: 'bi-basket',
  'home-decoration': 'bi-house-heart',
  furniture: 'bi-lamp',
  tops: 'bi-bag',
  'womens-dresses': 'bi-bag-heart',
  'womens-shoes': 'bi-bag',
  'mens-shirts': 'bi-bag',
  'mens-shoes': 'bi-bag',
  'mens-watches': 'bi-smartwatch',
  'womens-watches': 'bi-smartwatch',
  'womens-bags': 'bi-handbag',
  'womens-jewellery': 'bi-gem',
  sunglasses: 'bi-sunglasses',
  automotive: 'bi-car-front',
  motorcycle: 'bi-scooter',
  lighting: 'bi-lightbulb',
};

function CategoryGrid({ categories }) {
  return (
    <section className="container py-5">
      <h3 className="fw-bold mb-4">Shop by Category</h3>
      <div className="row g-3">
        {categories.slice(0, 12).map((category) => (
          <div className="col-6 col-md-3 col-lg-2" key={category.slug}>
            <Link
              to={`/products?category=${category.slug}`}
              className="card h-100 text-center text-decoration-none border-0 shadow-sm py-4"
            >
              <i className={`bi ${CATEGORY_ICONS[category.slug] || 'bi-box-seam'} fs-2 text-primary mb-2`} />
              <span className="text-body small text-capitalize fw-medium">
                {category.name}
              </span>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CategoryGrid;
