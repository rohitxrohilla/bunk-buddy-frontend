import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `text-sm font-medium transition-all duration-200 relative py-1.5 ${
      isActive(path)
        ? 'text-purple-600 font-semibold'
        : 'text-slate-600 hover:text-slate-900'
    }`;

  const activeIndicator = (path) =>
    isActive(path) ? (
      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full" />
    ) : null;

  return (
    <nav className="sticky top-0 z-50 w-full glass-panel border-b border-slate-200/50 backdrop-blur-md">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-9 h-9 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform duration-300">
              <span className="text-white font-extrabold text-sm tracking-tight">RF</span>
            </div>
            <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 bg-clip-text text-transparent">
              BunkBuddy
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/apartments" className={linkClass('/apartments')}>
              Find Apartments
              {activeIndicator('/apartments')}
            </Link>
            <Link to="/roommates" className={linkClass('/roommates')}>
              Find Roommates
              {activeIndicator('/roommates')}
            </Link>

            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className={linkClass('/dashboard')}>
                  Dashboard
                  {activeIndicator('/dashboard')}
                </Link>
                <Link to="/my-listings" className={linkClass('/my-listings')}>
                  My Listings
                  {activeIndicator('/my-listings')}
                </Link>
                <div className="flex items-center space-x-4 pl-4 border-l border-slate-200">
                  <div className="flex flex-col text-right">
                    <span className="text-xs text-slate-400">Signed in as</span>
                    <span className="text-sm font-semibold text-slate-800">{user?.fullName}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-3.5 py-1.5 rounded-lg text-sm font-medium text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100 transition-all duration-200"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4 pl-4 border-l border-slate-200">
                <Link
                  to="/login"
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-purple-600 shadow-sm hover:shadow-purple-500/10 transition-all duration-250"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-slate-600 hover:text-slate-900 focus:outline-none p-1.5 rounded-lg hover:bg-slate-100/80 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-lg animate-fade-in-down">
          <div className="px-6 py-4 space-y-3">
            <Link
              to="/apartments"
              onClick={() => setMobileOpen(false)}
              className={`block px-3 py-2 rounded-xl text-base font-medium ${
                isActive('/apartments') ? 'bg-purple-50 text-purple-600 font-semibold' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Find Apartments
            </Link>
            <Link
              to="/roommates"
              onClick={() => setMobileOpen(false)}
              className={`block px-3 py-2 rounded-xl text-base font-medium ${
                isActive('/roommates') ? 'bg-purple-50 text-purple-600 font-semibold' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Find Roommates
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className={`block px-3 py-2 rounded-xl text-base font-medium ${
                    isActive('/dashboard') ? 'bg-purple-50 text-purple-600 font-semibold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/my-listings"
                  onClick={() => setMobileOpen(false)}
                  className={`block px-3 py-2 rounded-xl text-base font-medium ${
                    isActive('/my-listings') ? 'bg-purple-50 text-purple-600 font-semibold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  My Listings
                </Link>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between px-3">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400">Signed in as</span>
                    <span className="text-sm font-semibold text-slate-800">{user?.fullName}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-rose-50 text-rose-600 rounded-xl text-sm font-medium hover:bg-rose-100 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="pt-4 border-t border-slate-100 flex flex-col space-y-2">
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block text-center px-4 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  className="block text-center px-4 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-medium hover:bg-purple-600 shadow-sm transition-all"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;