// src/components/layout/Navbar.jsx

import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LightningChatLogo from '../common/LightningChatLogo';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navRef = useRef(null);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logout();
      setShowLogoutModal(false);
    } catch (error) {
      // Error toast already handled by context
    } finally {
      setLoggingOut(false);
    }
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileMenuOpen && navRef.current && !navRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuOpen]);

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector('nav');
      if (nav) {
        if (window.scrollY > 100) {
          nav.classList.add('shadow-xl');
          nav.style.background = 'rgba(20, 29, 43, 0.95)';
        } else {
          nav.classList.remove('shadow-xl');
          nav.style.background = 'rgba(20, 29, 43, 0.85)';
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav ref={navRef} className="fixed w-full z-50 glass-effect shadow-lg py-4 sm:py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            {/* Responsive Logo */}
            <Link to="/" className="flex items-center">
              <LightningChatLogo />
            </Link>

            {/* Desktop Links – visible only from 911px and up */}
            <div className="hidden min-[911px]:flex items-center space-x-8">
              <Link to="#features" className="text-color hover:text-white transition-colors font-medium hover:scale-105 transform duration-300">Features</Link>
              <Link to="#demo" className="text-color hover:text-white transition-colors font-medium hover:scale-105 transform duration-300">Live Demo</Link>
              <Link to="#security" className="text-color hover:text-white transition-colors font-medium hover:scale-105 transform duration-300">Security</Link>
              <Link to="#about" className="text-color hover:text-white transition-colors font-medium hover:scale-105 transform duration-300">How it works</Link>

              {isAuthenticated ? (
                <>
                  <Link to="/chat/" className="text-color hover:text-white transition-colors font-medium hover:scale-105 transform duration-300">Chat</Link>
                  <button
                    onClick={() => setShowLogoutModal(true)}
                    className="bg-gradient-to-r from-primary to-primary-dark text-dark-bg px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:scale-105"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-color hover:text-white transition-colors font-medium hover:scale-105 transform duration-300">Login</Link>
                  <Link to="/signup" className="bg-gradient-to-r from-primary to-primary-dark text-dark-bg px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:scale-105">
                    Sign up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button – visible up to 910px */}
            <div className="min-[911px]:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-color hover:text-white transition-colors"
              >
                <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="min-[911px]:hidden bg-card-bg backdrop-blur-md rounded-lg mt-4 p-4 shadow-lg border border-border-color">
              <div className="flex flex-col space-y-4">
                <Link to="#features" className="text-white hover:text-primary transition-colors py-2">Features</Link>
                <Link to="#demo" className="text-white hover:text-primary transition-colors py-2">Live Demo</Link>
                <Link to="#security" className="text-white hover:text-primary transition-colors py-2">Security</Link>
                <Link to="#about" className="text-white hover:text-primary transition-colors py-2">How it works</Link>
                <hr className="border-border-color" />
                {isAuthenticated ? (
                  <>
                    <Link to="/chat/" className="text-white hover:text-primary transition-colors py-2 font-medium">Chat</Link>
                    <button
                      onClick={() => {
                        setShowLogoutModal(true);
                        setMobileMenuOpen(false);
                      }}
                      className="bg-gradient-to-r from-primary to-primary-dark text-dark-bg px-6 py-3 rounded-lg font-semibold w-full text-center hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="text-white hover:text-primary transition-colors py-2 font-medium">Login</Link>
                    <Link to="/signup" className="bg-gradient-to-r from-primary to-primary-dark text-dark-bg px-6 py-3 rounded-lg font-semibold text-center hover:shadow-lg hover:shadow-primary/30 transition-all duration-300">
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Logout Modal – unchanged */}
      <div className={`modal-overlay ${showLogoutModal ? 'active' : ''}`} onClick={() => setShowLogoutModal(false)}>
        <div className="logout-modal" onClick={(e) => e.stopPropagation()}>
          <div className="p-6 text-center border-b border-border-color bg-card-bg/90">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-5 border-2 border-primary">
              <i className="fas fa-sign-out-alt text-primary text-3xl"></i>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Confirm Logout</h2>
            <p className="text-color text-base">Are you sure you want to logout from LightningChat?</p>
          </div>
          <div className="p-6">
            <div className="flex gap-3">
              <button onClick={() => setShowLogoutModal(false)} className="modal-btn cancel">
                <i className="fas fa-times"></i> Cancel
              </button>
              <button onClick={handleLogout} disabled={loggingOut} className="modal-btn logout">
                {loggingOut ? (
                  <span className="flex items-center gap-2">
                    <i className="fas fa-spinner fa-spin"></i> Logging out...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <i className="fas fa-sign-out-alt"></i> Yes, Logout
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;