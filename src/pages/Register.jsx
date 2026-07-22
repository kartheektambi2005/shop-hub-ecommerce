import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      register(formData.name, formData.email);
      navigate('/', { replace: true });
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card border-0 shadow-sm p-4">
            <h3 className="fw-bold text-center mb-1">Create Account</h3>
            <p className="text-body-secondary text-center mb-4">Join ShopHub in a few seconds</p>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
              </div>

              <button type="submit" className="btn btn-primary w-100 mb-3">
                Sign Up
              </button>

              <p className="text-center text-body-secondary small mb-0">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
