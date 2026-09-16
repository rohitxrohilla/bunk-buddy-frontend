import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing! Stay tuned.');
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-900 mt-24">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-extrabold text-xs">RF</span>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">BunkBuddy</span>
            </Link>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              Find your ideal living environment. Our intelligent lifestyle compatibility engine maps roommate behaviors and apartment preferences with high fidelity.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-purple-600 text-slate-400 hover:text-white flex items-center justify-center transition-all duration-200" aria-label="Twitter">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-purple-600 text-slate-400 hover:text-white flex items-center justify-center transition-all duration-200" aria-label="LinkedIn">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-purple-600 text-slate-400 hover:text-white flex items-center justify-center transition-all duration-200" aria-label="Instagram">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Explore</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/apartments" className="hover:text-white transition-colors text-slate-400">
                  Apartment Listings
                </Link>
              </li>
              <li>
                <Link to="/roommates" className="hover:text-white transition-colors text-slate-400">
                  Find Roommates
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-white transition-colors text-slate-400">
                  Dashboard Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors text-slate-400">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors text-slate-400">
                  Security Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors text-slate-400">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Form */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Stay Updated</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Subscribe to get notified about verified listings in your area.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                placeholder="you@domain.com"
                className="bg-slate-900 border border-slate-800 text-white rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 flex-1 placeholder:text-slate-600"
              />
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium px-4 py-2 rounded-xl transition-all duration-200"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-slate-900 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2026 BunkBuddy Technologies, Inc. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-slate-300">Terms of Service</a>
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;