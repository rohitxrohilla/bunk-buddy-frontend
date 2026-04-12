import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apartmentAPI, roommateAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/common/Loading';

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

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Listings</h1>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8 border-b">
          <button
            onClick={() => setActiveTab('apartments')}
            className={`pb-4 px-4 font-semibold transition ${
              activeTab === 'apartments'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Apartments ({apartments.length})
          </button>
          <button
            onClick={() => setActiveTab('roommates')}
            className={`pb-4 px-4 font-semibold transition ${
              activeTab === 'roommates'
                ? 'border-b-2 border-purple-600 text-purple-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Roommate Listings ({roommates.length})
          </button>
        </div>

        {/* Apartment Listings */}
        {activeTab === 'apartments' && (
          <div>
            {apartments.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-lg">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No apartment listings</h3>
                <p className="text-gray-500 mb-4">Create your first apartment listing</p>
                <button
                  onClick={() => navigate('/apartments/create')}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  + Create Listing
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {apartments.map((apartment) => (
                  <div key={apartment.listingId} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{apartment.title}</h3>
                        <p className="text-gray-600 mb-2">{apartment.address}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{apartment.bhkCount.replace('_', ' ')}</span>
                          <span>•</span>
                          <span>₹{apartment.rent.toLocaleString()}/month</span>
                          <span>•</span>
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full">
                            {apartment.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => navigate(`/apartments/${apartment.listingId}`)}
                          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDelete('apartment', apartment.listingId)}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
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
          <div>
            {roommates.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-lg">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No roommate listings</h3>
                <p className="text-gray-500 mb-4">Create your first roommate listing</p>
                <button
                  onClick={() => navigate('/roommates/create')}
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
                >
                  + Create Listing
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {roommates.map((listing) => (
                  <div key={listing.listingId} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          Looking for {listing.lookingForCount} {listing.lookingForCount === 1 ? 'Roommate' : 'Roommates'}
                        </h3>
                        <p className="text-gray-600 mb-2">{listing.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{listing.genderPreference.replace('_', ' ')}</span>
                          <span>•</span>
                          <span>₹{listing.budgetPerPerson.toLocaleString()}/person</span>
                          <span>•</span>
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full">
                            {listing.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => navigate(`/roommates/${listing.listingId}`)}
                          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDelete('roommate', listing.listingId)}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
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
    </div>
  );
};

export default MyListings;