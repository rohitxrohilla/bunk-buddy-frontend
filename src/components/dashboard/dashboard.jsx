import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { dashboardAPI, interestAPI, authAPI } from '../../services/api';  // ✅ ADDED authAPI
import { useAuth } from '../../context/AuthContext';
import Loading from '../common/Loading';
import CompatibilityBadge from '../common/CompatibilityBadge';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [dashboard, setDashboard] = useState(null);
  const [receivedInterests, setReceivedInterests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
    fetchInterests();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await dashboardAPI.get(user.userId);
      setDashboard(response.data);
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchInterests = async () => {
    try {
      const response = await interestAPI.getReceived(user.userId);
      setReceivedInterests(response.data);
    } catch (error) {
      console.error('Error fetching interests:', error);
    }
  };

  // ✅ NEW FUNCTION: Handle resend verification email
  const handleResendVerification = async () => {
    try {
      await authAPI.resendVerification(user.userId);
      alert('Verification email sent! Please check your inbox.'); 
    } catch (error) {
      alert('Failed to send verification email. Please try again.');
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {user.fullName}!</h1>
          <p className="text-gray-600 mt-2">Here's what's happening with your listings</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Active Listings</p>
                <p className="text-3xl font-bold text-blue-600">{dashboard?.stats.activeListingsCount || 0}</p>
              </div>
              <svg className="w-12 h-12 text-blue-600 opacity-20" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Interest Received</p>
                <p className="text-3xl font-bold text-green-600">{dashboard?.stats.interestReceivedCount || 0}</p>
              </div>
              <svg className="w-12 h-12 text-green-600 opacity-20" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
              </svg>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Interest Sent</p>
                <p className="text-3xl font-bold text-purple-600">{dashboard?.stats.interestSentCount || 0}</p>
              </div>
              <svg className="w-12 h-12 text-purple-600 opacity-20" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Favorites</p>
                <p className="text-3xl font-bold text-red-600">{dashboard?.stats.favoritesCount || 0}</p>
              </div>
              <svg className="w-12 h-12 text-red-600 opacity-20" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        {/* ✅ EMAIL VERIFICATION BANNER - ADD THIS SECTION */}
        {!user.isVerified && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-blue-600 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Verify your email address</h3>
                <p className="text-gray-700 mb-3">
                  Please check your inbox and click the verification link we sent to <strong>{user.email}</strong>
                </p>
                <button
                  onClick={handleResendVerification}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-semibold"
                >
                  Resend Verification Email
                </button>
              </div>
            </div>
          </div>
        )}
        {/* ✅ END OF EMAIL VERIFICATION BANNER */}

        {/* Quiz Completion - Changed to suggestion */}
{!user.hasCompletedQuiz && (
  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
    <div className="flex items-start">
      <svg className="w-6 h-6 text-blue-600 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
      </svg>
      <div>
        <h3 className="font-semibold text-gray-900 mb-1">Want to find compatible roommates?</h3>
        <p className="text-gray-700 mb-3">
          Complete your lifestyle quiz to unlock compatibility matching and see personalized roommate recommendations
        </p>
        <button
          onClick={() => navigate('/quiz')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-semibold"
        >
          Take Lifestyle Quiz
        </button>
      </div>
    </div>
  </div>
)}

        {/* Recent Interests */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Interest Received</h2>
          {receivedInterests.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No interests received yet</p>
          ) : (
            <div className="space-y-4">
              {receivedInterests.slice(0, 5).map((interest) => (
                <div key={interest.interestId} className="border-b pb-4 last:border-b-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                        {interest.interestedUser.fullName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{interest.interestedUser.fullName}</p>
                        <p className="text-sm text-gray-600">{interest.interestedUser.email}</p>
                        {interest.message && (
                          <p className="text-sm text-gray-500 italic mt-1">"{interest.message}"</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      {interest.compatibilityScore && (
                        <CompatibilityBadge score={interest.compatibilityScore} />
                      )}
                      <p className="text-xs text-gray-500 mt-2">
                        {new Date(interest.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;