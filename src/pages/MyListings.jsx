import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apartmentAPI, roommateAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const MyListings = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [apartments, setApartments] = useState([]);
  const [roommates, setRoommates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('apartments');

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const [apartmentResponse, roommateResponse] = await Promise.all([
        apartmentAPI.getUserListings(user.userId),
        roommateAPI.getUserListings(user.userId),
      ]);
      setApartments(apartmentResponse.data);
      setRoommates(roommateResponse.data);
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return;

    try {
      if (type === 'apartment') {
        await apartmentAPI.delete(id);
        setApartments(apartments.filter((a) => a.listingId !== id));
      } else {
        await roommateAPI.delete(id);
        setRoommates(roommates.filter((r) => r.listingId !== id));
      }
      alert('Listing deleted successfully');
    } catch (error) {
      alert('Failed to delete listing');
    }
  };

  // Modern skeleton rows for loading state
  const renderSkeletons = () => (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-premium flex flex-col md:flex-row justify-between items-start md:items-center gap-6 overflow-hidden">
          <div className="space-y-3 flex-1 w-full">
            <div className="h-5 w-1/3 shimmer-loader rounded" />
            <div className="h-4 w-1/2 shimmer-loader rounded" />
            <div className="flex space-x-3 pt-1">
              <div className="h-4.5 w-16 shimmer-loader rounded-md" />
              <div className="h-4.5 w-24 shimmer-loader rounded-md" />
              <div className="h-4.5 w-16 shimmer-loader rounded-full" />
            </div>
          </div>
          <div className="flex space-x-3 w-full md:w-auto shrink-0">
            <div className="h-10 w-20 shimmer-loader rounded-xl flex-1 md:flex-initial" />
            <div className="h-10 w-20 shimmer-loader rounded-xl flex-1 md:flex-initial" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50/50 py-10">
      <div className="container mx-auto px-6 max-w-4xl space-y-8 animate-fade-in-up">
        {/* Page title */}
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">My Listings</h1>
          <p className="text-slate-500 text-sm mt-1">Manage, update, or remove the listings you have published</p>
        </div>

        {/* Sliding Pill Tabs */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl max-w-md border border-slate-200/50">
          <button
            onClick={() => setActiveTab('apartments')}
            className={`flex-1 text-center py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
              activeTab === 'apartments'
                ? 'bg-white text-slate-950 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Apartments ({apartments.length})
          </button>
          <button
            onClick={() => setActiveTab('roommates')}
            className={`flex-1 text-center py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
              activeTab === 'roommates'
                ? 'bg-white text-slate-950 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Roommates ({roommates.length})
          </button>
        </div>

        {loading ? (
          renderSkeletons()
        ) : (
          <div>
            {/* Apartment Listings */}
            {activeTab === 'apartments' && (
              <div className="space-y-4">
                {apartments.length === 0 ? (
                  <div className="text-center py-20 bg-white border border-slate-200/50 rounded-2xl shadow-premium space-y-5">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto text-2xl">
                      🏢
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-slate-800">No apartments listed</h3>
                      <p className="text-slate-400 text-sm max-w-sm mx-auto">
                        You have not published any apartment listings yet.
                      </p>
                    </div>
                    <button
                      onClick={() => navigate('/apartments/create')}
                      className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2.5 px-6 rounded-xl transition duration-200 text-sm shadow-sm"
                    >
                      + Create Apartment Listing
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {apartments.map((apartment) => (
                      <div key={apartment.listingId} className="premium-card bg-white rounded-2xl p-6 shadow-premium relative overflow-hidden">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center space-x-2 flex-wrap gap-y-1.5">
                              <h3 className="text-lg font-bold text-slate-900 tracking-tight">{apartment.title}</h3>
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                apartment.status.toLowerCase() === 'active'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                  : 'bg-amber-50 text-amber-700 border border-amber-100'
                              }`}>
                                {apartment.status}
                              </span>
                            </div>
                            <p className="text-slate-500 text-xs flex items-center">
                              <svg className="w-3.5 h-3.5 mr-1 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {apartment.address}
                            </p>
                            <div className="flex items-center space-x-3 text-xs text-slate-500 pt-1">
                              <span className="font-semibold text-slate-700">{apartment.bhkCount.replace('_', ' ')}</span>
                              <span className="text-slate-300">•</span>
                              <span className="font-bold text-slate-800">₹{apartment.rent.toLocaleString()}/month</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3 w-full md:w-auto shrink-0 border-t border-slate-100 md:border-none pt-4 md:pt-0">
                            <button
                              onClick={() => navigate(`/apartments/${apartment.listingId}`)}
                              className="flex-1 md:flex-initial text-center px-4 py-2.5 border border-slate-200 text-slate-700 font-bold rounded-xl text-xs hover:bg-slate-50 transition duration-200"
                            >
                              View
                            </button>
                            <button
                              onClick={() => handleDelete('apartment', apartment.listingId)}
                              className="flex-1 md:flex-initial text-center px-4 py-2.5 bg-rose-50 text-rose-600 font-bold border border-rose-100 rounded-xl text-xs hover:bg-rose-100/50 transition duration-200"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Roommate Listings */}
            {activeTab === 'roommates' && (
              <div className="space-y-4">
                {roommates.length === 0 ? (
                  <div className="text-center py-20 bg-white border border-slate-200/50 rounded-2xl shadow-premium space-y-5">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto text-2xl">
                      👥
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-slate-800">No roommate profile listed</h3>
                      <p className="text-slate-400 text-sm max-w-sm mx-auto">
                        You have not published any roommate search listings yet.
                      </p>
                    </div>
                    <button
                      onClick={() => navigate('/roommates/create')}
                      className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2.5 px-6 rounded-xl transition duration-200 text-sm shadow-sm"
                    >
                      + Create Roommate Listing
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {roommates.map((listing) => (
                      <div key={listing.listingId} className="premium-card bg-white rounded-2xl p-6 shadow-premium relative overflow-hidden">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center space-x-2 flex-wrap gap-y-1.5">
                              <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                                Looking for {listing.lookingForCount} {listing.lookingForCount === 1 ? 'Roommate' : 'Roommates'}
                              </h3>
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                listing.status.toLowerCase() === 'active'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                  : 'bg-amber-50 text-amber-700 border border-amber-100'
                              }`}>
                                {listing.status}
                              </span>
                            </div>
                            {listing.description && (
                              <p className="text-slate-500 text-xs font-light line-clamp-2 max-w-xl">
                                "{listing.description}"
                              </p>
                            )}
                            <div className="flex items-center space-x-3 text-xs text-slate-500 pt-1">
                              <span className="font-semibold text-slate-700 capitalize">{listing.genderPreference.replace('_', ' ').toLowerCase()} Preference</span>
                              <span className="text-slate-300">•</span>
                              <span className="font-bold text-slate-800">₹{listing.budgetPerPerson.toLocaleString()}/person</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3 w-full md:w-auto shrink-0 border-t border-slate-100 md:border-none pt-4 md:pt-0">
                            <button
                              onClick={() => navigate(`/roommates/${listing.listingId}`)}
                              className="flex-1 md:flex-initial text-center px-4 py-2.5 border border-slate-200 text-slate-700 font-bold rounded-xl text-xs hover:bg-slate-50 transition duration-200"
                            >
                              View
                            </button>
                            <button
                              onClick={() => handleDelete('roommate', listing.listingId)}
                              className="flex-1 md:flex-initial text-center px-4 py-2.5 bg-rose-50 text-rose-600 font-bold border border-rose-100 rounded-xl text-xs hover:bg-rose-100/50 transition duration-200"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListings;