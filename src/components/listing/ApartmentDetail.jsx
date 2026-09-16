import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apartmentAPI, interestAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const ApartmentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [apartment, setApartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [interestMessage, setInterestMessage] = useState('');
  const [showInterestModal, setShowInterestModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  useEffect(() => {
    fetchApartment();
  }, [id]);

  const fetchApartment = async () => {
    try {
      const response = await apartmentAPI.getById(id);
      setApartment(response.data);
    } catch (error) {
      console.error('Error fetching apartment:', error);
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
        listingId: apartment.listingId,
        listingType: 'APARTMENT',
        interestedUserId: user.userId,
        message: interestMessage,
      });

      alert('Interest expressed successfully! The owner will be notified via email.');
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

  if (!apartment) {
    return (
      <div className="min-h-screen bg-slate-50/50 py-12 flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-slate-500 font-medium">Apartment not found</p>
          <button onClick={() => navigate('/apartments')} className="bg-slate-950 text-white px-5 py-2 rounded-xl text-sm">
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  const isOwnListing = isAuthenticated && apartment?.user?.userId === user?.userId;
  const amenities = JSON.parse(apartment.amenities || '[]');

  const parsePhotos = (photosData) => {
    if (!photosData) return [];
    if (Array.isArray(photosData)) return photosData;
    try {
      const parsed = JSON.parse(photosData);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  const photos = parsePhotos(apartment.photos);

  return (
    <div className="min-h-screen bg-slate-50/50 py-10">
      <div className="container mx-auto px-6 max-w-5xl space-y-6 animate-fade-in-up">
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

        {/* Details Container */}
        <div className="bg-white border border-slate-200/60 rounded-3xl shadow-premium overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Visual Column / Abstract Cover or Photos */}
          <div className="lg:col-span-5 bg-slate-950 flex flex-col justify-between relative overflow-hidden min-h-[340px] lg:min-h-full text-white">
            {photos.length > 0 ? (
              <div className="absolute inset-0 z-0">
                <img
                  src={photos[selectedPhotoIndex] || photos[0]}
                  alt={apartment.title}
                  className="w-full h-full object-cover transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/30" />
              </div>
            ) : (
              <>
                {/* Ambient Lights */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-[80px]" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/20 rounded-full blur-[80px]" />
              </>
            )}
            
            <div className="relative z-10 p-8 space-y-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/10 border border-white/10 uppercase tracking-wider text-purple-200">
                {apartment.bhkCount.replace('_', ' ')}
              </span>
              <h1 className="text-2xl font-extrabold tracking-tight leading-snug">{apartment.title}</h1>

              {/* Photo Thumbnails if multiple photos */}
              {photos.length > 1 && (
                <div className="flex gap-2 pt-2 overflow-x-auto pb-1">
                  {photos.map((imgUrl, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedPhotoIndex(i)}
                      className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                        selectedPhotoIndex === i ? 'border-purple-400 scale-105 shadow-md' : 'border-white/30 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={imgUrl} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative z-10 p-8 space-y-6 pt-6 lg:pt-0">
              {/* Rent Panel */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Monthly Rent</p>
                <div className="flex items-baseline space-x-0.5 mt-1">
                  <span className="text-lg font-bold">₹</span>
                  <span className="text-3xl font-extrabold tracking-tight">{apartment.rent.toLocaleString()}</span>
                </div>
                <div className="border-t border-white/10 mt-3 pt-3 flex justify-between text-xs text-slate-300">
                  <span>Security Deposit:</span>
                  <span className="font-semibold text-white">₹{apartment.deposit.toLocaleString()}</span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span>Furnishing Status</span>
                <span className="font-bold text-white uppercase tracking-wider px-2.5 py-0.5 bg-white/10 rounded-lg border border-white/10">
                  {apartment.furnishingStatus.replace('_', ' ')}
                </span>
              </div>
            </div>
          </div>

          {/* Info Column */}
          <div className="lg:col-span-7 p-8 space-y-8">
            {/* Header Address */}
            <div className="space-y-2">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Address & Location</p>
              <p className="text-slate-700 text-sm leading-relaxed flex items-start">
                <span className="mr-2 text-base mt-0.5">📍</span>
                <span>{apartment.address}</span>
              </p>
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-3 gap-4 border-y border-slate-100 py-6">
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">BHK Type</p>
                <p className="text-slate-800 font-bold text-sm mt-0.5">{apartment.bhkCount.replace('_', ' ')}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Available From</p>
                <p className="text-slate-800 font-bold text-sm mt-0.5">
                  {new Date(apartment.availableFrom).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Listing Status</p>
                <span className="inline-flex px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase rounded-md mt-1 border border-emerald-100">
                  {apartment.status}
                </span>
              </div>
            </div>

            {/* Description */}
            {apartment.description && (
              <div className="space-y-2">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">About this home</h2>
                <p className="text-slate-600 text-sm leading-relaxed font-light">
                  "{apartment.description}"
                </p>
              </div>
            )}

            {/* Amenities Grid */}
            {amenities.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Amenities Included</h2>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                  {amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-2 bg-slate-50 border border-slate-100 rounded-xl p-2.5">
                      <span className="text-green-500 text-xs">✓</span>
                      <span className="font-medium text-slate-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Owner Info Panel */}
            <div className="bg-slate-50 border border-slate-200/50 rounded-2xl p-5 space-y-4">
              <h2 className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Listed By</h2>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-md shadow-purple-500/10">
                  {apartment.user.fullName.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <p className="text-sm font-bold text-slate-800 leading-tight">{apartment.user.fullName}</p>
                    {apartment.user.isVerified && (
                      <span className="inline-flex text-blue-500" title="Verified User">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5">{apartment.user.occupation || 'Member'}</p>
                </div>
              </div>
            </div>

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

      {/* Interest Modal */}
      {showInterestModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 max-w-md w-full space-y-6 shadow-2xl animate-fade-in-up relative overflow-hidden">
            {/* Glow accent */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500" />
            
            <div className="space-y-1">
              <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">Express Interest</h3>
              <p className="text-slate-400 text-xs">Write a brief message to introduce yourself to the owner.</p>
            </div>

            <textarea
              value={interestMessage}
              onChange={(e) => setInterestMessage(e.target.value)}
              rows="4"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent text-sm placeholder:text-slate-400"
              placeholder="Hi! I'm interested in renting your apartment..."
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

export default ApartmentDetail;