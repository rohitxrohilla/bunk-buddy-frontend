import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apartmentAPI, interestAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import Loading from '../common/Loading';

const ApartmentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [apartment, setApartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [interestMessage, setInterestMessage] = useState('');
  const [showInterestModal, setShowInterestModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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

  if (loading) return <Loading />;
  if (!apartment) return <div>Apartment not found</div>;

  // NEW: check if this listing belongs to logged in user
  const isOwnListing =
    isAuthenticated &&
    apartment?.user?.userId === user?.userId;

  const amenities = JSON.parse(apartment.amenities || '[]');

  return (
    <div className="min-h-screen bg-gray-50 py-8">

      <div className="container mx-auto px-4 max-w-6xl">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-700 mb-6"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>

          Back to Search
        </button>


        <div className="bg-white rounded-lg shadow-lg overflow-hidden">

          {/* Image Section */}
          <div className="h-96 bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">

            <svg
              className="w-32 h-32 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>

          </div>


          <div className="p-8">

            {/* Title + Price */}
            <div className="flex justify-between items-start mb-6">

              <div>

                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {apartment.title}
                </h1>

                <p className="text-gray-600 flex items-center">

                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>

                  {apartment.address}

                </p>

              </div>


              <div className="text-right">

                <p className="text-4xl font-bold text-blue-600">
                  ₹{apartment.rent.toLocaleString()}
                </p>

                <p className="text-gray-500">
                  per month
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  Deposit: ₹{apartment.deposit.toLocaleString()}
                </p>

              </div>

            </div>



            {/* Key Details */}
            <div className="grid grid-cols-4 gap-4 mb-8 p-6 bg-gray-50 rounded-lg">

              <div className="text-center">
                <p className="text-gray-500 text-sm mb-1">
                  Type
                </p>

                <p className="text-lg font-semibold">
                  {apartment.bhkCount.replace('_', ' ')}
                </p>
              </div>


              <div className="text-center">
                <p className="text-gray-500 text-sm mb-1">
                  Furnishing
                </p>

                <p className="text-lg font-semibold">
                  {apartment.furnishingStatus.replace('_', ' ')}
                </p>
              </div>


              <div className="text-center">
                <p className="text-gray-500 text-sm mb-1">
                  Available From
                </p>

                <p className="text-lg font-semibold">
                  {new Date(apartment.availableFrom)
                    .toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                </p>
              </div>


              <div className="text-center">
                <p className="text-gray-500 text-sm mb-1">
                  Status
                </p>

                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
                  {apartment.status}
                </span>

              </div>

            </div>



            {/* Description */}
            {apartment.description && (

              <div className="mb-8">

                <h2 className="text-xl font-bold text-gray-900 mb-3">
                  Description
                </h2>

                <p className="text-gray-700 leading-relaxed">
                  {apartment.description}
                </p>

              </div>

            )}



            {/* Amenities */}
            {amenities.length > 0 && (

              <div className="mb-8">

                <h2 className="text-xl font-bold text-gray-900 mb-3">
                  Amenities
                </h2>

                <div className="grid grid-cols-3 gap-3">

                  {amenities.map((amenity, index) => (

                    <div
                      key={index}
                      className="flex items-center space-x-2 text-gray-700"
                    >

                      <svg
                        className="w-5 h-5 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <span>
                        {amenity}
                      </span>

                    </div>

                  ))}

                </div>

              </div>

            )}



            {/* Owner Info */}
            <div className="mb-8 p-6 bg-gray-50 rounded-lg">

              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Owner Information
              </h2>


              <div className="flex items-center space-x-4">

                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">

                  {apartment.user.fullName.charAt(0)}

                </div>


                <div>

                  <p className="text-lg font-semibold">
                    {apartment.user.fullName}
                  </p>

                  <p className="text-gray-600">
                    {apartment.user.occupation}
                  </p>


                  {apartment.user.isVerified && (

                    <span className="inline-flex items-center text-sm text-green-600">

                      Verified

                    </span>

                  )}

                </div>

              </div>

            </div>



            {/* Action Buttons */}
            <div className="flex space-x-4">

              {isOwnListing ? (

                <div className="flex-1 bg-gray-100 text-gray-500 py-3 rounded-lg text-center font-semibold">

                  This is your own listing

                </div>

              ) : (

                <button
                  onClick={() => setShowInterestModal(true)}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                >

                  Express Interest

                </button>

              )}


              <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">

                ❤️

              </button>

            </div>


          </div>

        </div>

      </div>



      {/* Interest Modal */}
      {showInterestModal && (

        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-lg p-8 max-w-md w-full">

            <h3 className="text-2xl font-bold mb-4">
              Express Interest
            </h3>


            <textarea
              value={interestMessage}
              onChange={(e) => setInterestMessage(e.target.value)}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 mb-4"
              placeholder="Hi! I'm interested in your apartment..."
            />


            <div className="flex space-x-4">

              <button
                onClick={handleExpressInterest}
                disabled={submitting}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
              >

                {submitting ? 'Sending...' : 'Send Interest'}

              </button>


              <button
                onClick={() => setShowInterestModal(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
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