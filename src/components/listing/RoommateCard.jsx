import React from 'react';
import { useNavigate } from 'react-router-dom';
import CompatibilityBadge from '../common/CompatibilityBadge';

const RoommateCard = ({ listing, compatibilityScore }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Predefined modern gradient avatars
  const avatarGradients = [
    'from-indigo-500 to-purple-600',
    'from-violet-500 to-fuchsia-600',
    'from-blue-500 to-indigo-600',
    'from-emerald-400 to-teal-600',
  ];
  
  // Pick gradient based on name character code to keep it consistent
  const getGradientIndex = (name) => {
    if (!name) return 0;
    const charCodeSum = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return charCodeSum % avatarGradients.length;
  };

  const gradientClass = avatarGradients[getGradientIndex(listing.user.fullName)];

  return (
    <div
      onClick={() => navigate(`/roommates/${listing.listingId}`)}
      className="premium-card bg-white rounded-2xl p-6 cursor-pointer flex flex-col justify-between h-full hover:shadow-premium-hover transition-all duration-300 relative overflow-hidden"
    >
      {/* Visual top border accent */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 hover:opacity-100 transition-opacity duration-300" />
      
      <div>
        {/* User Info Header */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center space-x-4">
            <div className={`w-14 h-14 bg-gradient-to-br ${gradientClass} rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-md shadow-purple-500/10`}>
              {listing.user.fullName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <h3 className="text-base font-bold text-slate-800 tracking-tight leading-tight">{listing.user.fullName}</h3>
                {listing.user.isVerified && (
                  <span className="inline-flex items-center justify-center text-blue-500" title="Verified User">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {listing.user.age} yrs • {listing.user.gender}
              </p>
              <p className="text-[11px] text-slate-400 font-normal mt-0.5 max-w-[140px] truncate">
                {listing.user.occupation}
              </p>
            </div>
          </div>

          {/* Compatibility score badge at top right if present */}
          {compatibilityScore !== undefined && compatibilityScore !== null && (
            <div className="shrink-0 scale-90 origin-top-right">
              <CompatibilityBadge score={compatibilityScore} />
            </div>
          )}
        </div>

        {/* Roommate details & preferences */}
        <div className="space-y-3.5 mb-5">
          {/* Main prompt */}
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2">
            <span className="text-indigo-500 text-sm">👥</span>
            <span>
              Looking for <span className="text-indigo-600">{listing.lookingForCount}</span>{' '}
              {listing.lookingForCount === 1 ? 'roommate' : 'roommates'}
            </span>
          </div>

          {/* Grid preferences */}
          <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
            <div className="flex items-center space-x-2 bg-slate-50/50 rounded-lg p-2 border border-slate-100">
              <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="capitalize truncate font-medium">{listing.genderPreference.replace('_', ' ').toLowerCase()}</span>
            </div>
            
            <div className="flex items-center space-x-2 bg-slate-50/50 rounded-lg p-2 border border-slate-100">
              <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span className="truncate font-medium">Age {listing.ageRangeMin}-{listing.ageRangeMax}</span>
            </div>

            <div className="flex items-center space-x-2 bg-slate-50/50 rounded-lg p-2 border border-slate-100 col-span-2">
              <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="truncate font-medium">Move-in: {formatDate(listing.moveInDate)}</span>
            </div>
          </div>

          {/* Description snippet */}
          {listing.description && (
            <p className="text-xs text-slate-500 leading-relaxed font-light line-clamp-2 pt-1">
              "{listing.description}"
            </p>
          )}
        </div>
      </div>

      {/* Footer / Budget & Action */}
      <div className="pt-4 border-t border-slate-100 mt-2 flex items-center justify-between">
        <div>
          <div className="flex items-baseline space-x-0.5">
            <span className="text-xs font-semibold text-slate-400">₹</span>
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">{listing.budgetPerPerson.toLocaleString()}</span>
          </div>
          <p className="text-[10px] text-slate-400 font-medium">per person / month</p>
        </div>

        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
          listing.status.toLowerCase() === 'active' 
            ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
            : 'bg-amber-50 text-amber-700 border border-amber-100'
        }`}>
          {listing.status}
        </span>
      </div>
    </div>
  );
};

export default RoommateCard;