import { Link } from 'react-router-dom';

function Breadcrumbs({ trail }) {
  return (
    <nav aria-label="breadcrumb" className="container pt-3">
      <ol className="breadcrumb mb-0">
        <li className="breadcrumb-item">
          <Link to="/" className="text-decoration-none">Home</Link>
        </li>
        {trail.map((crumb, index) => (
          <li
            key={crumb.label}
            className={`breadcrumb-item ${index === trail.length - 1 ? 'active' : ''}`}
            aria-current={index === trail.length - 1 ? 'page' : undefined}
          >
            {crumb.to ? (
              <Link to={crumb.to} className="text-decoration-none">{crumb.label}</Link>
            ) : (
              crumb.label
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
