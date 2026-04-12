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

  return (
    <div
      onClick={() => navigate(`/roommates/${listing.listingId}`)}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer card-hover"
    >
      <div className="p-6">
        {/* User Info */}
        <div className="flex items-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {listing.user.fullName.charAt(0)}
          </div>
          <div className="ml-4 flex-1">
            <h3 className="text-xl font-bold text-gray-900">{listing.user.fullName}</h3>
            <p className="text-gray-600 text-sm">{listing.user.age} years • {listing.user.gender}</p>
            <p className="text-gray-500 text-sm">{listing.user.occupation}</p>
          </div>
          {listing.user.isVerified && (
            <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          )}
        </div>

        {/* Compatibility Badge */}
        {compatibilityScore && (
          <div className="mb-4">
            <CompatibilityBadge score={compatibilityScore} />
          </div>
        )}

        {/* Looking For */}
        <div className="mb-4">
          <p className="text-gray-700">
            Looking for <span className="font-semibold">{listing.lookingForCount}</span>{' '}
            {listing.lookingForCount === 1 ? 'roommate' : 'roommates'}
          </p>
        </div>

        {/* Preferences */}
        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
          <div className="flex items-center text-gray-600">
            <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {listing.genderPreference.replace('_', ' ')}
          </div>
          <div className="flex items-center text-gray-600">
            <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Age: {listing.ageRangeMin}-{listing.ageRangeMax}
          </div>
          <div className="flex items-center text-gray-600 col-span-2">
            <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Move-in: {formatDate(listing.moveInDate)}
          </div>
        </div>

        {/* Description */}
        {listing.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {listing.description}
          </p>
        )}

        {/* Budget */}
        <div className="pt-4 border-t">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-blue-600">₹{listing.budgetPerPerson.toLocaleString()}</p>
              <p className="text-xs text-gray-500">per person/month</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
              {listing.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoommateCard;