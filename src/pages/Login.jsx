// src/pages/Login.jsx
import { Link } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';

// Static back button (always white, #3AEAB0 border on hover)
const BackButton = () => (
  <Link
    to="/"
    className="absolute top-6 left-6 sm:top-8 sm:left-8 glass-effect rounded-full px-5 py-2.5 flex items-center gap-2 text-white border border-transparent hover:border-[#3AEAB0] transition-all duration-300 z-20"
  >
    <i className="fas fa-arrow-left text-sm"></i>
    <span className="text-sm font-medium">Home</span>
  </Link>
);

const Login = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 hero-bg">
      {/* Floating elements (identical to home/signup) */}
      <div className="floating-element top-1/4 left-1/4 w-96 h-96 bg-primary/10 hidden sm:block"></div>
      <div className="floating-element bottom-1/4 right-1/4 w-80 h-80 bg-secondary/20 hidden sm:block"></div>

      <BackButton />

      <div className="relative z-10 w-full max-w-md">
        <LoginForm />
      </div>
    </section>
  );
};

export default Login;