// src/components/home/CTA.jsx

import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const CTA = () => {
  const { isAuthenticated } = useAuth();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10">
      <div className="max-w-4xl mx-auto text-center">
        <div className="glass-effect rounded-3xl p-12 border border-primary/20">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Chat
            <span className="gradient-text block">at the Speed of Light?</span>
          </h2>
          <p className="text-xl text-color mb-8 opacity-90">
            Sign up now and experience truly private messaging. No server logs, no data mining – just secure, peer‑to‑peer chats.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {isAuthenticated ? (
              <>
                <Link
                  to="/chat/"
                  className="bg-gradient-to-r from-primary to-primary-dark text-dark-bg px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 group"
                >
                  <i className="fas fa-comments group-hover:rotate-12 transition-transform text-dark-bg"></i>
                  <span>Go to Chat</span>
                </Link>
                <Link
                  to="#demo"
                  className="border-2 border-primary text-primary px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary hover:text-dark-bg transition-all duration-300 flex items-center space-x-3 group wave"
                >
                  <i className="fas fa-play group-hover:scale-110 transition-transform"></i>
                  <span>Live Demo</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-primary to-primary-dark text-dark-bg px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 group"
                >
                  <i className="fas fa-user-plus group-hover:rotate-12 transition-transform text-dark-bg"></i>
                  <span>Sign Up Now</span>
                </Link>
                <Link
                  to="/login"
                  className="border-2 border-primary text-primary px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary hover:text-dark-bg transition-all duration-300 flex items-center space-x-3 group"
                >
                  <i className="fas fa-sign-in-alt group-hover:scale-110 transition-transform"></i>
                  <span>Login</span>
                </Link>
              </>
            )}
          </div>
          <div className="mt-8 text-color">
            <i className="fas fa-check-circle text-primary mr-2"></i>
            No credit card required &nbsp;·&nbsp; Works in any modern browser &nbsp;·&nbsp; Open‑source
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;