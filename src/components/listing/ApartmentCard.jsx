import React from 'react';
import { useNavigate } from 'react-router-dom';

const ApartmentCard = ({ apartment }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const parseAmenities = (amenitiesString) => {
    try {
      return JSON.parse(amenitiesString);
    } catch {
      return [];
    }
  };

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

  const amenities = parseAmenities(apartment.amenities);
  const photos = parsePhotos(apartment.photos);
  const coverPhoto = photos.length > 0 ? photos[0] : null;

  // Modern abstract vector mockups representing apartments
  const getMockupPattern = (id) => {
    const patterns = [
      // Pattern 1: Sleek perspective blocks
      <svg className="w-full h-full object-cover text-indigo-500/10" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="200" fill="url(#grid-pat-1)"/>
        <circle cx="320" cy="80" r="50" fill="url(#grad-accent)" opacity="0.8"/>
        <rect x="40" y="80" width="100" height="120" rx="8" fill="currentColor" fillOpacity="0.15"/>
        <rect x="60" y="100" width="20" height="20" rx="4" fill="white" fillOpacity="0.25"/>
        <rect x="100" y="100" width="20" height="20" rx="4" fill="white" fillOpacity="0.25"/>
        <rect x="60" y="140" width="20" height="20" rx="4" fill="white" fillOpacity="0.25"/>
        <rect x="100" y="140" width="20" height="20" rx="4" fill="white" fillOpacity="0.25"/>
        <rect x="160" y="40" width="120" height="160" rx="12" fill="currentColor" fillOpacity="0.2"/>
        <rect x="180" y="60" width="35" height="30" rx="6" fill="white" fillOpacity="0.25"/>
        <rect x="225" y="60" width="35" height="30" rx="6" fill="white" fillOpacity="0.25"/>
        <rect x="180" y="105" width="35" height="30" rx="6" fill="white" fillOpacity="0.25"/>
        <rect x="225" y="105" width="35" height="30" rx="6" fill="white" fillOpacity="0.25"/>
        <defs>
          <pattern id="grid-pat-1" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.05"/>
          </pattern>
          <linearGradient id="grad-accent" x1="270" y1="30" x2="370" y2="130" gradientUnits="userSpaceOnUse">
            <stop stopColor="#c084fc"/>
            <stop offset="1" stopColor="#6366f1"/>
          </linearGradient>
        </defs>
      </svg>,
      // Pattern 2: Minimal geometric forms
      <svg className="w-full h-full object-cover text-purple-500/10" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="200" fill="url(#grid-pat-2)"/>
        <path d="M-20 220 L160 60 L340 220 Z" fill="currentColor" fillOpacity="0.15"/>
        <path d="M120 220 L260 100 L400 220 Z" fill="currentColor" fillOpacity="0.2"/>
        <circle cx="80" cy="70" r="30" fill="url(#grad-accent-2)" opacity="0.75"/>
        <defs>
          <pattern id="grid-pat-2" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="currentColor" fillOpacity="0.05"/>
          </pattern>
          <linearGradient id="grad-accent-2" x1="50" y1="40" x2="110" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f472b6"/>
            <stop offset="1" stopColor="#a855f7"/>
          </linearGradient>
        </defs>
      </svg>,
      // Pattern 3: Isometric abstract layout
      <svg className="w-full h-full object-cover text-blue-500/10" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="200" fill="url(#grid-pat-3)"/>
        <path d="M220 20 L380 100 L220 180 L60 100 Z" fill="currentColor" fillOpacity="0.1"/>
        <path d="M220 50 L330 105 L220 160 L110 105 Z" fill="currentColor" fillOpacity="0.15"/>
        <circle cx="220" cy="100" r="25" fill="url(#grad-accent-3)" opacity="0.8"/>
        <defs>
          <pattern id="grid-pat-3" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.06"/>
          </pattern>
          <linearGradient id="grad-accent-3" x1="195" y1="75" x2="245" y2="125" gradientUnits="userSpaceOnUse">
            <stop stopColor="#38bdf8"/>
            <stop offset="1" stopColor="#3b82f6"/>
          </linearGradient>
        </defs>
      </svg>
    ];
    
    const index = (id || 0) % patterns.length;
    return patterns[index];
  };

  return (
    <div
      onClick={() => navigate(`/apartments/${apartment.listingId}`)}
      className="premium-card bg-white rounded-2xl overflow-hidden cursor-pointer flex flex-col justify-between h-full hover:shadow-premium-hover transition-all duration-300 relative group"
    >
      <div>
        {/* Cover Pattern Header */}
        <div className="h-44 bg-slate-950 relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent z-10" />
          
          {/* Render Photo or Vector Pattern */}
          {coverPhoto ? (
            <img
              src={coverPhoto}
              alt={apartment.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            getMockupPattern(apartment.listingId)
          )}

          {/* Absolute labels on header */}
          <div className="absolute top-4 left-4 z-20">
            <span className="px-2.5 py-1 bg-white/10 backdrop-blur-md border border-white/15 text-white text-[10px] font-bold rounded-lg uppercase tracking-wider">
              {apartment.bhkCount.replace('_', ' ')}
            </span>
          </div>

          <div className="absolute bottom-4 left-5 right-5 z-20">
            <h3 className="text-lg font-bold text-white tracking-tight leading-snug group-hover:text-purple-300 transition-colors duration-200 line-clamp-1">
              {apartment.title}
            </h3>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {/* Location */}
          <p className="text-slate-500 text-xs flex items-center font-medium">
            <svg className="w-3.5 h-3.5 mr-1.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate">{apartment.address}</span>
          </p>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
            <div className="flex items-center space-x-2 bg-slate-50 rounded-lg p-2 border border-slate-100">
              <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="font-semibold text-slate-700 truncate">{apartment.bhkCount.replace('_', ' ')}</span>
            </div>

            <div className="flex items-center space-x-2 bg-slate-50 rounded-lg p-2 border border-slate-100">
              <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="font-medium truncate">{formatDate(apartment.availableFrom)}</span>
            </div>
          </div>

          {/* Amenities list */}
          {amenities.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {amenities.slice(0, 3).map((amenity, index) => (
                <span
                  key={index}
                  className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-medium rounded-md border border-slate-200/40"
                >
                  {amenity}
                </span>
              ))}
              {amenities.length > 3 && (
                <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-semibold rounded-md border border-indigo-100/50">
                  +{amenities.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Price & Status Footer */}
      <div className="p-5 pt-4 border-t border-slate-100 flex items-center justify-between">
        <div>
          <div className="flex items-baseline space-x-0.5">
            <span className="text-xs font-semibold text-slate-400">₹</span>
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">
              {apartment.rent.toLocaleString()}
            </span>
          </div>
          <p className="text-[10px] text-slate-400 font-medium">per month</p>
        </div>
        
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
          apartment.furnishingStatus.toLowerCase().includes('fully') 
            ? 'bg-purple-50 text-purple-700 border border-purple-100/80' 
            : 'bg-blue-50 text-blue-700 border border-blue-100/80'
        }`}>
          {apartment.furnishingStatus.replace('_', ' ')}
        </span>
      </div>
    </div>
  );
};

export default ApartmentCard;