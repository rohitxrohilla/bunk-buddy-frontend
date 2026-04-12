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

  const amenities = parseAmenities(apartment.amenities);

  return (
    <div
      onClick={() => navigate(`/apartments/${apartment.listingId}`)}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer card-hover"
    >
      {/* Image Placeholder */}
      <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
        <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      </div>

      <div className="p-5">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
          {apartment.title}
        </h3>

        {/* Location */}
        <p className="text-gray-600 text-sm mb-3 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          {apartment.address.substring(0, 50)}...
        </p>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center text-sm text-gray-700">
            <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            {apartment.bhkCount.replace('_', ' ')}
          </div>

          <div className="flex items-center text-sm text-gray-700">
            <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formatDate(apartment.availableFrom)}
          </div>
        </div>

        {/* Amenities */}
        {amenities.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {amenities.slice(0, 3).map((amenity, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
              >
                {amenity}
              </span>
            ))}
            {amenities.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                +{amenities.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Price & Status */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div>
            <p className="text-2xl font-bold text-blue-600">₹{apartment.rent.toLocaleString()}</p>
            <p className="text-xs text-gray-500">per month</p>
          </div>
          <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
            {apartment.furnishingStatus.replace('_', ' ')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ApartmentCard;