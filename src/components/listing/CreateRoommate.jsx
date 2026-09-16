import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { roommateAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { GENDER_OPTIONS } from '../../utils/constants';

const CreateRoommate = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Check quiz completion
  useEffect(() => {
    if (user && !user.hasCompletedQuiz) {
      alert('Please complete your lifestyle quiz before creating a roommate listing');
      navigate('/quiz');
    }
  }, [user, navigate]);

  const [formData, setFormData] = useState({
    lookingForCount: 1,
    genderPreference: 'FEMALE',
    ageRangeMin: 22,
    ageRangeMax: 30,
    budgetPerPerson: 10000,
    moveInDate: '',
    description: '',
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
      await roommateAPI.create({
        userId: user.userId,
        ...formData,
        lookingForCount: parseInt(formData.lookingForCount),
        ageRangeMin: parseInt(formData.ageRangeMin),
        ageRangeMax: parseInt(formData.ageRangeMax),
        budgetPerPerson: parseInt(formData.budgetPerPerson),
      });

      navigate('/my-listings');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create listing');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-6">
      <div className="max-w-2xl mx-auto space-y-8 animate-fade-in-up">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">List Yourself as a Roommate</h1>
          <p className="text-slate-500 text-sm max-w-md mx-auto">Create a profile card detailing your budget, preferences, and ideal roommate demographics.</p>
        </div>

        <div className="bg-white border border-slate-200/60 rounded-3xl p-6 md:p-8 shadow-premium relative overflow-hidden">
          {/* Accent indicator */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
          
          {error && (
            <div className="bg-rose-50 border border-rose-100 text-rose-700 px-4 py-3 rounded-2xl text-sm mb-6 flex items-center space-x-2">
              <span>⚠️</span>
              <span className="font-medium">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Looking For Count */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                Number of Roommates Wanted *
              </label>
              <input
                type="number"
                name="lookingForCount"
                value={formData.lookingForCount}
                onChange={handleChange}
                required
                min="1"
                max="5"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent text-sm placeholder:text-slate-400"
              />
            </div>

            {/* Gender Preference */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                Gender Preference *
              </label>
              <select
                name="genderPreference"
                value={formData.genderPreference}
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

            {/* Age Range Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Minimum Roommate Age *
                </label>
                <input
                  type="number"
                  name="ageRangeMin"
                  value={formData.ageRangeMin}
                  onChange={handleChange}
                  required
                  min="18"
                  max="100"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent text-sm placeholder:text-slate-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Maximum Roommate Age *
                </label>
                <input
                  type="number"
                  name="ageRangeMax"
                  value={formData.ageRangeMax}
                  onChange={handleChange}
                  required
                  min="18"
                  max="100"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent text-sm placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Budget */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                Monthly Budget per Person (₹) *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none text-sm">₹</span>
                <input
                  type="number"
                  name="budgetPerPerson"
                  value={formData.budgetPerPerson}
                  onChange={handleChange}
                  required
                  min="1000"
                  className="w-full pl-8 pr-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent text-sm placeholder:text-slate-400"
                  placeholder="10000"
                />
              </div>
            </div>

            {/* Move-in Date */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                Preferred Move-in Date *
              </label>
              <input
                type="date"
                name="moveInDate"
                value={formData.moveInDate}
                onChange={handleChange}
                required
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent text-sm"
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                About Yourself & Roommate Guidelines
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent text-sm placeholder:text-slate-400"
                placeholder="Tell potential roommates about yourself, your cleaniness habits, and what kind of roommate you're looking for..."
              />
            </div>

            {/* Submit / Cancel Buttons */}
            <div className="flex space-x-3 pt-4 border-t border-slate-100">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-slate-950 hover:bg-purple-600 text-white font-bold py-3 rounded-xl transition duration-200 text-xs uppercase tracking-wider shadow-sm disabled:bg-slate-200"
              >
                {loading ? 'Creating...' : 'Create Roommate Listing'}
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-3 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs uppercase tracking-wide transition duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateRoommate;