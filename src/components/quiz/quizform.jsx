import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { quizAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import {
  SLEEP_SCHEDULE_OPTIONS,
  NOISE_TOLERANCE_OPTIONS,
  FREQUENCY_OPTIONS,
  DRINKING_OPTIONS,
  PET_OPTIONS,
  SOCIAL_LEVEL_OPTIONS,
} from '../../utils/constants';

const QuizForm = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [existingQuiz, setExistingQuiz] = useState(null);

  const [formData, setFormData] = useState({
    sleepSchedule: 'EARLY_BIRD',
    cleanlinessLevel: 5,
    noiseTolerance: 'MODERATE',
    guestsFrequency: 'SOMETIMES',
    smoking: false,
    drinking: 'NO',
    pets: 'NO_PETS',
    cookingFrequency: 'SOMETIMES',
    socialLevel: 'BALANCED',
    budgetMin: 5000,
    budgetMax: 20000,
  });

  useEffect(() => {
    // Check if user already has a quiz
    const fetchQuiz = async () => {
      try {
        const response = await quizAPI.getByUserId(user.userId);
        setExistingQuiz(response.data);
        setFormData({
          sleepSchedule: response.data.sleepSchedule,
          cleanlinessLevel: response.data.cleanlinessLevel,
          noiseTolerance: response.data.noiseTolerance,
          guestsFrequency: response.data.guestsFrequency,
          smoking: response.data.smoking,
          drinking: response.data.drinking,
          pets: response.data.pets,
          cookingFrequency: response.data.cookingFrequency,
          socialLevel: response.data.socialLevel,
          budgetMin: response.data.budgetMin,
          budgetMax: response.data.budgetMax,
        });
      } catch (err) {
        // Quiz doesn't exist yet - that's fine
      }
    };

    fetchQuiz();
  }, [user.userId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate budget
    if (parseInt(formData.budgetMax) <= parseInt(formData.budgetMin)) {
      setError('Maximum budget must be greater than minimum budget');
      setLoading(false);
      return;
    }

    try {
      const payload = {
        userId: user.userId,
        ...formData,
        cleanlinessLevel: parseInt(formData.cleanlinessLevel),
        budgetMin: parseInt(formData.budgetMin),
        budgetMax: parseInt(formData.budgetMax),
      };

      if (existingQuiz) {
        await quizAPI.update(existingQuiz.quizId, payload);
      } else {
        await quizAPI.submit(payload);
      }

      updateUser({ hasCompletedQuiz: true });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit quiz. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-6">
      <div className="max-w-2xl mx-auto space-y-8 animate-fade-in-up">
        {/* Title */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Lifestyle Profile Quiz</h2>
          <p className="text-slate-500 text-sm max-w-md mx-auto">
            Help us find your perfect roommate match by telling us about your lifestyle preferences.
          </p>
        </div>

        <div className="bg-white border border-slate-200/60 rounded-3xl p-6 md:p-8 shadow-premium relative overflow-hidden">
          {/* Header line accent */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
          
          {error && (
            <div className="bg-rose-50 border border-rose-100 text-rose-700 px-4 py-3 rounded-2xl text-sm mb-6 flex items-center space-x-2">
              <span>⚠️</span>
              <span className="font-medium">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sleep Schedule */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Sleep Schedule
                </label>
                <select
                  name="sleepSchedule"
                  value={formData.sleepSchedule}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent text-sm"
                >
                  {SLEEP_SCHEDULE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Noise Tolerance */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Noise Tolerance
                </label>
                <select
                  name="noiseTolerance"
                  value={formData.noiseTolerance}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent text-sm"
                >
                  {NOISE_TOLERANCE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Guest Frequency */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Guests Frequency
                </label>
                <select
                  name="guestsFrequency"
                  value={formData.guestsFrequency}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent text-sm"
                >
                  {FREQUENCY_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Social Level */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Social Engagement
                </label>
                <select
                  name="socialLevel"
                  value={formData.socialLevel}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent text-sm"
                >
                  {SOCIAL_LEVEL_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Drinking Option */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Do you drink alcohol?
                </label>
                <select
                  name="drinking"
                  value={formData.drinking}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent text-sm"
                >
                  {DRINKING_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Pets Option */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Pet Compatibility
                </label>
                <select
                  name="pets"
                  value={formData.pets}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent text-sm"
                >
                  {PET_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Cooking Frequency */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Cooking Frequency
                </label>
                <select
                  name="cookingFrequency"
                  value={formData.cookingFrequency}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent text-sm"
                >
                  {FREQUENCY_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Cleanliness Level (1-10) Slider */}
              <div className="space-y-1.5 flex flex-col justify-center">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Cleanliness Score: <span className="text-purple-600 font-extrabold">{formData.cleanlinessLevel}/10</span>
                </label>
                <input
                  type="range"
                  name="cleanlinessLevel"
                  min="1"
                  max="10"
                  value={formData.cleanlinessLevel}
                  onChange={handleChange}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                  <span>Relaxed</span>
                  <span>Meticulous</span>
                </div>
              </div>
            </div>

            {/* Budget Range Section */}
            <div className="border-t border-slate-100 pt-6 space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Monthly Roommate Budget Range</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none text-sm">₹</span>
                  <input
                    type="number"
                    name="budgetMin"
                    value={formData.budgetMin}
                    onChange={handleChange}
                    required
                    min="1000"
                    placeholder="Min Budget"
                    className="w-full pl-8 pr-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent text-sm"
                  />
                </div>

                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none text-sm">₹</span>
                  <input
                    type="number"
                    name="budgetMax"
                    value={formData.budgetMax}
                    onChange={handleChange}
                    required
                    min="1000"
                    placeholder="Max Budget"
                    className="w-full pl-8 pr-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Smoking Checkbox */}
            <div className="border-t border-slate-100 pt-6">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="smoking"
                  checked={formData.smoking}
                  onChange={handleChange}
                  className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 border-slate-300 bg-slate-50"
                />
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider group-hover:text-slate-800 transition duration-150">
                  I smoke cigarettes / vapes
                </span>
              </label>
            </div>

            {/* Form actions */}
            <div className="flex space-x-3 pt-4 border-t border-slate-100">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-slate-950 hover:bg-purple-600 text-white font-bold py-3 rounded-xl transition duration-200 text-xs uppercase tracking-wider shadow-sm disabled:bg-slate-200"
              >
                {loading ? 'Saving...' : existingQuiz ? 'Update Lifestyle Profile' : 'Save Lifestyle Profile'}
              </button>

              {existingQuiz && (
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="px-6 py-3 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs uppercase tracking-wide transition duration-200"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QuizForm;