import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { dashboardAPI, interestAPI } from '../../services/api';
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

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-slate-50/50 py-10">
      <div className="container mx-auto px-6 max-w-5xl space-y-8 animate-fade-in-up">
        
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-200/60">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              Welcome, {user.fullName}!
              {user.isVerified && (
                <span className="inline-flex items-center justify-center w-5 h-5 bg-purple-100 text-purple-600 rounded-full text-xs" title="Verified User">
                  ✓
                </span>
              )}
            </h1>
            <p className="text-slate-500 text-sm mt-1">Here is a summary of match requests and active listings</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Active Listings */}
          <div className="bg-white border border-slate-200/50 rounded-2xl p-6 shadow-premium hover:shadow-premium-hover transition duration-200 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Listings</span>
              <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-extrabold text-slate-900">{dashboard?.stats.activeListingsCount || 0}</h3>
              <p className="text-[10px] text-slate-400 font-medium mt-1">Properties or roommate profiles listed</p>
            </div>
          </div>

          {/* Interest Received */}
          <div className="bg-white border border-slate-200/50 rounded-2xl p-6 shadow-premium hover:shadow-premium-hover transition duration-200 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Inquiries Received</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 17l-4 4m0 0l-4-4m4 4V3" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-extrabold text-slate-900">{dashboard?.stats.interestReceivedCount || 0}</h3>
              <p className="text-[10px] text-slate-400 font-medium mt-1">Users requesting to connect with you</p>
            </div>
          </div>

          {/* Interest Sent */}
          <div className="bg-white border border-slate-200/50 rounded-2xl p-6 shadow-premium hover:shadow-premium-hover transition duration-200 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Inquiries Sent</span>
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7l4-4m0 0l4 4m-4-4v18" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-extrabold text-slate-900">{dashboard?.stats.interestSentCount || 0}</h3>
              <p className="text-[10px] text-slate-400 font-medium mt-1">Proposals you sent to other users</p>
            </div>
          </div>

          {/* Favorites */}
          <div className="bg-white border border-slate-200/50 rounded-2xl p-6 shadow-premium hover:shadow-premium-hover transition duration-200 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Saved Items</span>
              <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-extrabold text-slate-900">{dashboard?.stats.favoritesCount || 0}</h3>
              <p className="text-[10px] text-slate-400 font-medium mt-1">Listings bookmarked for later review</p>
            </div>
          </div>
        </div>

        {/* Quiz Completion Banner */}
        {!user.hasCompletedQuiz && (
          <div className="bg-gradient-to-r from-purple-900 to-indigo-950 text-white rounded-2xl p-8 shadow-lg relative overflow-hidden border border-white/5">
            <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 space-y-4 max-w-xl">
              <h3 className="text-xl font-bold tracking-tight">Unlock Compatibility Match Scores</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Take our 5-minute lifestyle quiz to calculate percentage alignment scores with other roommate seekers, based on cleanliness, noise tolerances, schedules, and more.
              </p>
              <button
                onClick={() => navigate('/quiz')}
                className="bg-white text-slate-950 px-6 py-2.5 rounded-xl font-bold text-xs hover:bg-slate-100 shadow-sm transition-all duration-200 uppercase tracking-wider"
              >
                Complete Quiz Now
              </button>
            </div>
          </div>
        )}

        {/* Recent Interests Received */}
        <div className="bg-white border border-slate-200/50 rounded-2xl shadow-premium p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Incoming Inquiries</h2>
            <p className="text-slate-400 text-xs mt-0.5">Recent match requests and contact proposals received from verified users</p>
          </div>

          {receivedInterests.length === 0 ? (
            <div className="text-center py-16 border-2 border-dashed border-slate-100 rounded-xl space-y-2">
              <p className="text-slate-400 text-sm font-semibold">No inquiries received yet</p>
              <p className="text-slate-300 text-xs">Create search listings or browse matching profiles to start receiving requests</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {receivedInterests.slice(0, 5).map((interest) => (
                <div key={interest.interestId} className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white text-sm font-bold shadow-inner">
                      {interest.interestedUser.fullName.charAt(0)}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-slate-900 text-sm">{interest.interestedUser.fullName}</span>
                        {interest.interestedUser.isVerified && (
                          <span className="inline-flex w-3.5 h-3.5 bg-purple-100 text-purple-700 rounded-full text-[9px] items-center justify-center font-bold">✓</span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400">{interest.interestedUser.email}</p>
                      {interest.message && (
                        <p className="text-xs text-slate-500 bg-slate-50/80 border border-slate-100/50 px-3 py-1.5 rounded-lg italic mt-1.5 max-w-md">
                          "{interest.message}"
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex sm:flex-col items-end justify-between w-full sm:w-auto mt-2 sm:mt-0 gap-2">
                    {interest.compatibilityScore && (
                      <CompatibilityBadge score={interest.compatibilityScore} />
                    )}
                    <span className="text-[10px] font-semibold text-slate-400">
                      {new Date(interest.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
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