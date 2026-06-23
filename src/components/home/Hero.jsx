// src/components/home/Hero.jsx

import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ChatPreview from './ChatPreview';

const Hero = () => {
  const { isAuthenticated } = useAuth();

  return (
    <section className="pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center hero-bg relative overflow-hidden">
      {/* Floating elements hidden on small screens for better performance */}
      <div className="floating-element top-1/4 left-1/4 w-96 h-96 bg-primary/10 hidden sm:block"></div>
      <div className="floating-element bottom-1/4 right-1/4 w-80 h-80 bg-secondary/20 hidden sm:block"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4 sm:space-y-6">
              <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-primary/10 rounded-full border border-primary/20">
                <i className="fas fa-bolt text-primary mr-2 text-sm sm:text-base"></i>
                <span className="text-xs sm:text-sm font-medium text-primary">Peer‑to‑peer encrypted</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                Private Messaging
                <span className="gradient-text block pb-1">At the Speed of Light</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-color leading-relaxed">
                LightningChat is a blazing‑fast, privacy‑first platform. Every message, emoji, file, and call is end‑to‑end encrypted and lives only on your device. No server ever sees your conversations.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {isAuthenticated ? (
                <>
                  <Link to="/chat/" className="bg-gradient-to-r from-primary to-primary-dark text-dark-bg px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 sm:space-x-3 group">
                    <i className="fas fa-comments group-hover:rotate-12 transition-transform text-dark-bg"></i>
                    <span>Go to Chat</span>
                  </Link>
                  <Link to="#demo" className="border-2 border-primary text-primary px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-primary hover:text-dark-bg transition-all duration-300 flex items-center justify-center space-x-2 sm:space-x-3 group">
                    <i className="fas fa-play-circle group-hover:scale-110 transition-transform"></i>
                    <span>Live Demo</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/signup" className="bg-gradient-to-r from-primary to-primary-dark text-dark-bg px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 sm:space-x-3 group">
                    <i className="fas fa-rocket group-hover:rotate-12 transition-transform text-dark-bg"></i>
                    <span>Sign Up Now</span>
                  </Link>
                  <Link to="#demo" className="border-2 border-primary text-primary px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-primary hover:text-dark-bg transition-all duration-300 flex items-center justify-center space-x-2 sm:space-x-3 group">
                    <i className="fas fa-play-circle group-hover:scale-110 transition-transform"></i>
                    <span>Live Demo</span>
                  </Link>
                </>
              )}
            </div>

            {/* Trust Stats – column on mobile, row on sm+ */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 pt-6 sm:pt-8 border-t border-border-color/30">
              <div className="text-center sm:flex-1">
                <div className="text-3xl sm:text-4xl font-bold gradient-text">&lt; 5 ms</div>
                <div className="text-xs sm:text-sm text-color mt-1 sm:mt-2">Peer‑to‑peer latency</div>
              </div>
              <div className="text-center sm:flex-1">
                <div className="text-3xl sm:text-4xl font-bold gradient-text">100%</div>
                <div className="text-xs sm:text-sm text-color mt-1 sm:mt-2">Device‑only storage</div>
              </div>
              <div className="text-center sm:flex-1">
                <div className="text-3xl sm:text-4xl font-bold gradient-text">1M+</div>
                <div className="text-xs sm:text-sm text-color mt-1 sm:mt-2">Messages stored locally</div>
              </div>
            </div>
          </div>

          {/* Right Content – Chat Preview */}
          <div className="chat-preview relative" id="demo">
            <ChatPreview />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;