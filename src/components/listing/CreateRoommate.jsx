import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { roommateAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { GENDER_OPTIONS } from '../../utils/constants';

const CreateRoommate = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ✅ CHECK IF USER HAS COMPLETED QUIZ
  React.useEffect(() => {
    if (!user.hasCompletedQuiz) {
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Find a Roommate</h1>
          <p className="text-gray-600 mt-2">Tell us what you're looking for</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Looking For Count */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Roommates *
              </label>
              <input
                type="number"
                name="lookingForCount"
                value={formData.lookingForCount}
                onChange={handleChange}
                required
                min="1"
                max="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Gender Preference */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender Preference *
              </label>
              <select
                name="genderPreference"
                value={formData.genderPreference}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="FEMALE">Female</option>
                <option value="MALE">Male</option>
                <option value="OTHER">Any</option>
              </select>
            </div>

            {/* Age Range */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Age *
                </label>
                <input
                  type="number"
                  name="ageRangeMin"
                  value={formData.ageRangeMin}
                  onChange={handleChange}
                  required
                  min="18"
                  max="100"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum Age *
                </label>
                <input
                  type="number"
                  name="ageRangeMax"
                  value={formData.ageRangeMax}
                  onChange={handleChange}
                  required
                  min="18"
                  max="100"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Budget */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Budget per Person (₹/month) *
              </label>
              <input
                type="number"
                name="budgetPerPerson"
                value={formData.budgetPerPerson}
                onChange={handleChange}
                required
                min="1000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="10000"
              />
            </div>

            {/* Move-in Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Move-in Date *
              </label>
              <input
                type="date"
                name="moveInDate"
                value={formData.moveInDate}
                onChange={handleChange}
                required
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Tell potential roommates about yourself and what you're looking for..."
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex space-x-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold disabled:bg-gray-400"
              >
                {loading ? 'Creating...' : 'Create Listing'}
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
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