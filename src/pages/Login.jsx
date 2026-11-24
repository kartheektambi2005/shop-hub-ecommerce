import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useForm } from '../hooks/useForm';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import FormField from '../components/common/FormField';
import { validateLogin } from '../utils/validators';

function Login() {
  useDocumentTitle('Log in');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || '/';

  const { values, errors, handleChange, handleSubmit } = useForm(
    { email: '', password: '' },
    validateLogin,
    ({ email }) => {
      // The password is checked for presence only and is never stored or sent anywhere.
      login(email);
      navigate(redirectTo, { replace: true });
    },
  );

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card border-0 shadow-sm p-4">
            <h1 className="h3 fw-bold text-center mb-1">Welcome Back</h1>
            <p className="text-body-secondary text-center mb-3">Log in to your ShopHub account</p>
            <p className="alert alert-info small" role="note">
              Demo login: use any email and password. Nothing is sent to a server, and your password is never saved.
            </p>

            <form onSubmit={handleSubmit} noValidate>
              <FormField
                className="mb-3"
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
                maxLength={254}
                placeholder="you@example.com"
                value={values.email}
                onChange={handleChange}
                error={errors.email}
              />
              <FormField
                className="mb-3"
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                maxLength={128}
                value={values.password}
                onChange={handleChange}
                error={errors.password}
              />

              <button type="submit" className="btn btn-primary w-100 mb-3">
                Log In
              </button>

              <p className="text-center text-body-secondary small mb-0">
                Don&apos;t have an account? <Link to="/register">Sign up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
