import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useForm } from '../hooks/useForm';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import FormField from '../components/common/FormField';
import { validateRegistration } from '../utils/validators';

const INITIAL_FORM = { name: '', email: '', password: '', confirmPassword: '' };

function Register() {
  useDocumentTitle('Create account');
  const { register } = useAuth();
  const navigate = useNavigate();

  const { values, errors, handleChange, handleSubmit } = useForm(
    INITIAL_FORM,
    validateRegistration,
    ({ name, email }) => {
      // Only the name and email are kept; the password is discarded after validation.
      register(name, email);
      navigate('/', { replace: true });
    },
  );

  const field = (name, label, props = {}) => (
    <FormField
      className="mb-3"
      label={label}
      name={name}
      value={values[name]}
      onChange={handleChange}
      error={errors[name]}
      {...props}
    />
  );

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card border-0 shadow-sm p-4">
            <h1 className="h3 fw-bold text-center mb-1">Create Account</h1>
            <p className="text-body-secondary text-center mb-3">Join ShopHub in a few seconds</p>
            <p className="alert alert-info small" role="note">
              Demo sign-up: your details stay in this browser and your password is never saved.
            </p>

            <form onSubmit={handleSubmit} noValidate>
              {field('name', 'Full Name', { autoComplete: 'name', maxLength: 60 })}
              {field('email', 'Email', { type: 'email', autoComplete: 'email', maxLength: 254 })}
              {field('password', 'Password', {
                type: 'password',
                autoComplete: 'new-password',
                maxLength: 128,
                hint: 'At least 8 characters, with a letter and a number.',
              })}
              {field('confirmPassword', 'Confirm Password', {
                type: 'password',
                autoComplete: 'new-password',
                maxLength: 128,
              })}

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
