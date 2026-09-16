import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { roommateAPI, interestAPI, compatibilityAPI, quizAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import CompatibilityBadge from '../common/CompatibilityBadge';

const RoommateDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [listing, setListing] = useState(null);
  const [compatibility, setCompatibility] = useState(null);
  const [loading, setLoading] = useState(true);
  const [interestMessage, setInterestMessage] = useState('');
  const [showInterestModal, setShowInterestModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchListing();
  }, [id]);

  const fetchListing = async () => {
    try {
      const response = await roommateAPI.getById(id);
      setListing(response.data);

      // compatibility calculation
      if (isAuthenticated && user.hasCompletedQuiz) {
        try {
          const quizResponse = await quizAPI.getByUserId(response.data.user.userId);

          if (quizResponse.data) {
            const compatResponse = await compatibilityAPI.calculate(
              user.userId,
              response.data.user.userId
            );
            setCompatibility(compatResponse.data);
          }
        } catch (err) {
          console.log('Compatibility skipped');
        }
      }
    } catch (error) {
      console.error('Error fetching listing:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExpressInterest = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setSubmitting(true);

    try {
      await interestAPI.express({
        listingId: listing.listingId,
        listingType: 'ROOMMATE',
        interestedUserId: user.userId,
        message: interestMessage,
      });

      alert('Interest expressed successfully!');
      setShowInterestModal(false);
      setInterestMessage('');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to express interest');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50/50 py-12 flex items-center justify-center">
        <div className="w-12 h-12 spinner-premium" />
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-slate-50/50 py-12 flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-slate-500 font-medium">Listing not found</p>
          <button onClick={() => navigate('/roommates')} className="bg-slate-950 text-white px-5 py-2 rounded-xl text-sm">
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  const isOwnListing = isAuthenticated && listing?.user?.userId === user?.userId;

  return (
    <div className="min-h-screen bg-slate-50/50 py-10">
      <div className="container mx-auto px-6 max-w-4xl space-y-6 animate-fade-in-up">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-xs font-bold text-slate-500 hover:text-slate-800 transition duration-200 uppercase tracking-wider space-x-1.5"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back to Search</span>
        </button>

        {/* Detail Panel */}
        <div className="bg-white border border-slate-200/60 rounded-3xl shadow-premium overflow-hidden">
          {/* Header section with background gradient & avatar details */}
          <div className="relative bg-slate-950 p-8 text-white overflow-hidden">
            {/* Soft decorative blur circles */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-purple-600/15 rounded-full blur-[90px] pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-52 h-52 bg-indigo-600/15 rounded-full blur-[70px] pointer-events-none" />

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-center space-x-5">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-3xl font-extrabold shadow-lg shadow-purple-500/20">
                  {listing.user.fullName.charAt(0)}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h1 className="text-2xl font-extrabold tracking-tight">{listing.user.fullName}</h1>
                    {listing.user.isVerified && (
                      <span className="inline-flex text-blue-400" title="Verified User">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                    )}
                  </div>
                  <p className="text-slate-300 text-sm font-medium">
                    {listing.user.age} yrs • {listing.user.gender} • {listing.user.occupation || 'Member'}
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="shrink-0">
                <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  listing.status.toLowerCase() === 'active'
                    ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-300'
                    : 'bg-amber-500/10 border border-amber-500/20 text-amber-300'
                }`}>
                  {listing.status}
                </span>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-8">
            {/* Compatibility Analysis */}
            {compatibility && (
              <div className="bg-indigo-50/50 border border-indigo-100/50 rounded-3xl p-6 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <h3 className="text-sm font-bold text-slate-800 tracking-tight">Compatibility Analysis</h3>
                  <CompatibilityBadge score={compatibility.compatibilityScore} />
                </div>
                <p className="text-slate-600 text-sm leading-relaxed font-light">
                  "{compatibility.summary}"
                </p>
              </div>
            )}

            {/* Grid Preferences */}
            <div className="space-y-4">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Search Preferences</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-1">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Looking For</p>
                  <p className="text-slate-800 font-bold text-sm">
                    {listing.lookingForCount} {listing.lookingForCount === 1 ? 'roommate' : 'roommates'}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-1">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Gender Preference</p>
                  <p className="text-slate-800 font-bold text-sm capitalize">
                    {listing.genderPreference.replace('_', ' ').toLowerCase()}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-1">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Target Age Range</p>
                  <p className="text-slate-800 font-bold text-sm">
                    {listing.ageRangeMin} - {listing.ageRangeMax} yrs
                  </p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-1">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Move-in Date</p>
                  <p className="text-slate-800 font-bold text-sm">
                    {new Date(listing.moveInDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Budget Display Card */}
            <div className="bg-slate-950 border border-slate-900 rounded-3xl p-6 text-white relative overflow-hidden shadow-md">
              <div className="absolute top-0 right-0 w-60 h-60 bg-purple-500/10 rounded-full blur-[80px]" />
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Target Monthly Budget</p>
                  <div className="flex items-baseline space-x-0.5 mt-1">
                    <span className="text-lg font-bold">₹</span>
                    <span className="text-3xl font-extrabold tracking-tight">
                      {listing.budgetPerPerson.toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-400 font-medium ml-1">per person / month</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-lg">
                  💰
                </div>
              </div>
            </div>

            {/* Profile Bio Description */}
            {listing.description && (
              <div className="space-y-2">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">About Me / Notes</h2>
                <p className="text-slate-600 text-sm leading-relaxed font-light">
                  "{listing.description}"
                </p>
              </div>
            )}

            {/* Action Bar */}
            <div className="flex space-x-3 pt-2">
              {isOwnListing ? (
                <div className="flex-1 bg-slate-100 border border-slate-200/50 text-slate-500 py-3 rounded-xl text-center font-bold text-xs uppercase tracking-wide">
                  This is your listing
                </div>
              ) : (
                <button
                  onClick={() => setShowInterestModal(true)}
                  className="flex-1 bg-purple-600 hover:bg-purple-500 text-white py-3 rounded-xl transition duration-200 font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-purple-500/10"
                >
                  Express Interest
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Express Interest Modal */}
      {showInterestModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 max-w-md w-full space-y-6 shadow-2xl animate-fade-in-up relative overflow-hidden">
            {/* Glow accent */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500" />

            <div className="space-y-1">
              <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">Express Interest</h3>
              <p className="text-slate-400 text-xs">Send a friendly greeting to start matching.</p>
            </div>

            <textarea
              value={interestMessage}
              onChange={(e) => setInterestMessage(e.target.value)}
              rows="4"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent text-sm placeholder:text-slate-400"
              placeholder="Hi! I think we'd make great roommates..."
            />

            <div className="flex space-x-3 pt-2">
              <button
                onClick={handleExpressInterest}
                disabled={submitting}
                className="flex-1 bg-purple-600 hover:bg-purple-500 text-white font-bold py-2.5 rounded-xl transition duration-200 text-xs uppercase tracking-wider shadow-sm disabled:bg-slate-200"
              >
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
              <button
                onClick={() => setShowInterestModal(false)}
                className="px-5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs uppercase tracking-wide transition duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoommateDetail;