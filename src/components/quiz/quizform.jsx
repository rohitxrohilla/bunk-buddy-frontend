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
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Lifestyle Compatibility Quiz</h2>
          <p className="text-gray-600 mt-2">
            Help us find your perfect roommate match by answering these questions
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Sleep Schedule */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                1. What's your sleep schedule? *
              </label>
              <select
                name="sleepSchedule"
                value={formData.sleepSchedule}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {SLEEP_SCHEDULE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Cleanliness Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                2. How would you rate your cleanliness? (1-10) *
              </label>
              <input
                type="range"
                name="cleanlinessLevel"
                min="1"
                max="10"
                value={formData.cleanlinessLevel}
                onChange={handleChange}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>Not Clean (1)</span>
                <span className="font-semibold text-blue-600">{formData.cleanlinessLevel}</span>
                <span>Very Clean (10)</span>
              </div>
            </div>

            {/* Noise Tolerance */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                3. What's your noise tolerance? *
              </label>
              <select
                name="noiseTolerance"
                value={formData.noiseTolerance}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {NOISE_TOLERANCE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Guest Frequency */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                4. How often do you have guests over? *
              </label>
              <select
                name="guestsFrequency"
                value={formData.guestsFrequency}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {FREQUENCY_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Smoking */}
            <div>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="smoking"
                  checked={formData.smoking}
                  onChange={handleChange}
                  className="w-5 h-5 text-blue-600"
                />
                <span className="text-sm font-medium text-gray-700">
                  5. I smoke
                </span>
              </label>
            </div>

            {/* Drinking */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                6. Do you drink alcohol? *
              </label>
              <select
                name="drinking"
                value={formData.drinking}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {DRINKING_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Pets */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                7. What's your pet situation? *
              </label>
              <select
                name="pets"
                value={formData.pets}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {PET_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Cooking Frequency */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                8. How often do you cook? *
              </label>
              <select
                name="cookingFrequency"
                value={formData.cookingFrequency}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {FREQUENCY_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Social Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                9. How social are you? *
              </label>
              <select
                name="socialLevel"
                value={formData.socialLevel}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {SOCIAL_LEVEL_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Budget Range */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  10. Minimum Budget (₹) *
                </label>
                <input
                  type="number"
                  name="budgetMin"
                  value={formData.budgetMin}
                  onChange={handleChange}
                  required
                  min="1000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum Budget (₹) *
                </label>
                <input
                  type="number"
                  name="budgetMax"
                  value={formData.budgetMax}
                  onChange={handleChange}
                  required
                  min="1000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold disabled:bg-gray-400"
              >
                {loading ? 'Saving...' : existingQuiz ? 'Update Quiz' : 'Submit Quiz'}
              </button>

              {existingQuiz && (
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
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