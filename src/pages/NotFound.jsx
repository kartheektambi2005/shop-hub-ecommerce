import { Link } from 'react-router-dom';

function NotFound({ message = "Oops! The page you're looking for doesn't exist." }) {
  return (
    <div className="container py-5 text-center">
      <h1 className="display-1 fw-bold text-primary">404</h1>
      <p className="fs-4 mb-4">{message}</p>
      <Link to="/" className="btn btn-primary px-4">
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
