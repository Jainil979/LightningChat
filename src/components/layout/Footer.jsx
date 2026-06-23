// src/components/layout/Footer.jsx

import { Link } from 'react-router-dom';
import LightningChatLogo from '../common/LightningChatLogo';

const Footer = () => {
  return (
    <footer className="bg-darker-bg text-white py-12 px-4 sm:px-6 lg:px-8 border-t border-border-color">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 min-[1076px]:grid-cols-4 gap-8">
          <div>
            <LightningChatLogo />
            <p className="text-color mt-6 mb-6 text-sm sm:text-base">
              Private peer‑to‑peer messaging that lives on your device. No server logs, no compromises.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-card-bg rounded-lg flex items-center justify-center text-color hover:text-primary hover:bg-primary/10 transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-card-bg rounded-lg flex items-center justify-center text-color hover:text-primary hover:bg-primary/10 transition-colors">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-card-bg rounded-lg flex items-center justify-center text-color hover:text-primary hover:bg-primary/10 transition-colors">
                <i className="fab fa-github"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-card-bg rounded-lg flex items-center justify-center text-color hover:text-primary hover:bg-primary/10 transition-colors">
                <i className="fab fa-discord"></i>
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-lg text-white mb-4">Product</h4>
            <ul className="space-y-3 text-color text-sm sm:text-base">
              <li>
                <Link to="#features" className="hover:text-white transition-colors">Features</Link>
              </li>
              <li>
                <Link to="#security" className="hover:text-white transition-colors">Security</Link>
              </li>
              <li>
                <Link to="#demo" className="hover:text-white transition-colors">Live Demo</Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white transition-colors">Pricing</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg text-white mb-4">Company</h4>
            <ul className="space-y-3 text-color text-sm sm:text-base">
              <li>
                <Link to="#" className="hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white transition-colors">Careers</Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white transition-colors">Blog</Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg text-white mb-4">Legal</h4>
            <ul className="space-y-3 text-color text-sm sm:text-base">
              <li>
                <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white transition-colors">Cookie Policy</Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white transition-colors">Security Policy</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border-color mt-12 pt-8 text-center text-color text-sm">
          <p>&copy; 2026 LightningChat. All rights reserved. Private messaging for everyone.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;