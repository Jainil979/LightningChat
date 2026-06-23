// src/components/auth/LoginForm.jsx

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { validateEmail, validatePassword } from '../../validators/authValidators';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { login } = useAuth();            // context login – sets user & isAuthenticated
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field error on typing
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Run client‑side validation
    const newErrors = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
    };

    // Remove empty strings
    for (const key of Object.keys(newErrors)) {
      if (!newErrors[key]) delete newErrors[key];
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return; // stop if validation fails

    setLoading(true);
    try {
      await login(formData);            // protobuf API call + fetches user data
      navigate('/chat');                // success – go to chat
    } catch (err) {
      setErrors({ server: err.message || 'Login failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="glass-effect rounded-3xl p-8 sm:p-10 border border-primary/20 shadow-2xl"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-16 h-16 bg-gradient-to-r from-primary to-primary-dark rounded-2xl flex items-center justify-center mx-auto mb-5"
        >
          <i className="fas fa-sign-in-alt text-dark-bg text-2xl"></i>
        </motion.div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          Welcome <span className="gradient-text">Back</span>
        </h2>
        <p className="text-color">Log in to your private messenger</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Email */}
        <div className="relative">
          <i className="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-text text-sm sm:text-base"></i>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Email address"
            className={`w-full pl-11 pr-4 py-3 sm:py-4 bg-dark-bg/60 border rounded-xl text-white placeholder-gray-text outline-none transition focus:ring-2 focus:ring-primary/20 ${
              errors.email ? 'border-red-400 focus:border-red-400' : 'border-border-color focus:border-primary'
            }`}
          />
          {errors.email && (
            <p className="text-red-400 text-xs mt-1 ml-2 flex items-center gap-1">
              <i className="fas fa-exclamation-circle text-xs"></i>
              {errors.email}
            </p>
          )}
        </div>

        {/* Password with eye toggle */}
        <div className="relative">
          <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-text text-sm sm:text-base"></i>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Password"
            className={`w-full pl-11 pr-12 py-3 sm:py-4 bg-dark-bg/60 border rounded-xl text-white placeholder-gray-text outline-none transition focus:ring-2 focus:ring-primary/20 ${
              errors.password ? 'border-red-400 focus:border-red-400' : 'border-border-color focus:border-primary'
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-text hover:text-primary transition-colors"
            aria-label="Toggle password visibility"
          >
            <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-sm sm:text-base`}></i>
          </button>
          {errors.password && (
            <p className="text-red-400 text-xs mt-1 ml-2 flex items-center gap-1">
              <i className="fas fa-exclamation-circle text-xs"></i>
              {errors.password}
            </p>
          )}
        </div>

        {/* Server-level error */}
        {errors.server && (
          <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 rounded-lg p-3">
            <i className="fas fa-exclamation-circle"></i>
            <span>{errors.server}</span>
          </div>
        )}

        {/* Login Button – Hero‑style hover: icon rotates */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-primary to-primary-dark text-dark-bg font-semibold py-3.5 sm:py-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 flex items-center justify-center space-x-2 sm:space-x-3 group disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <i className="fas fa-spinner fa-spin text-dark-bg"></i>
              <span>Logging in...</span>
            </>
          ) : (
            <>
              <i className="fas fa-sign-in-alt group-hover:rotate-12 transition-transform text-dark-bg"></i>
              <span>Login Now</span>
            </>
          )}
        </motion.button>
      </form>

      {/* Footer link */}
      <p className="text-center mt-6 text-color text-sm sm:text-base">
        Don&apos;t have an account?{' '}
        <Link to="/signup" className="text-primary font-semibold hover:underline transition">
          Sign up
        </Link>
      </p>
    </motion.div>
  );
};

export default LoginForm;