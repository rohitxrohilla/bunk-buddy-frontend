import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { GENDER_OPTIONS } from '../../utils/constants';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: '',
    age: '',
    gender: 'MALE',
    occupation: '',
    bio: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.register({
        ...formData,
        age: parseInt(formData.age),
      });

      login(response.data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-16 px-6 relative">
      {/* Background glow blur */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-xl w-full relative z-10 space-y-8 animate-fade-in-up">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center space-x-2.5">
            <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-sm">RF</span>
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-800">BunkBuddy</span>
          </Link>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Create your account</h2>
          <p className="text-slate-400 text-sm">Find compatible housemates and local listings today</p>
        </div>

        {/* Card Panel */}
        <div className="bg-white border border-slate-200/65 shadow-premium p-8 sm:p-10 rounded-2xl">
          {error && (
            <div className="bg-rose-50 border border-rose-100 text-rose-700 px-4 py-3 rounded-xl text-sm mb-6 flex items-start space-x-2 animate-pulse-subtle">
              <svg className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Full Name */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent text-sm placeholder:text-slate-400"
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent text-sm placeholder:text-slate-400"
                  placeholder="john@example.com"
                />
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Password *
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent text-sm placeholder:text-slate-400"
                  placeholder="Min. 6 chars"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  pattern="[0-9]{10}"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent text-sm placeholder:text-slate-400"
                  placeholder="10 digit number"
                />
              </div>

              {/* Age */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Age *
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  min="18"
                  max="100"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent text-sm placeholder:text-slate-400"
                  placeholder="21"
                />
              </div>

              {/* Gender */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Gender *
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent text-sm"
                >
                  {GENDER_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Occupation */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Occupation
              </label>
              <input
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent text-sm placeholder:text-slate-400"
                placeholder="e.g., Graduate Student, Software Engineer"
              />
            </div>

            {/* Bio */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Short Biography
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="2"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent text-sm placeholder:text-slate-400"
                placeholder="A brief introduction about your hobbies, preferences..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-950 hover:bg-purple-600 text-white font-bold py-3 rounded-xl shadow-md transition-all duration-200 text-sm flex items-center justify-center space-x-2 disabled:bg-slate-400 pt-3"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 spinner-premium border-white/20 border-top-color-white"></div>
                  <span>Creating Account...</span>
                </>
              ) : (
                <span>Create Account</span>
              )}
            </button>
          </form>

          {/* Login Prompt */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-purple-600 hover:text-purple-700 hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;