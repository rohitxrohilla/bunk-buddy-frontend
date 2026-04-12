import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { roommateAPI, interestAPI, compatibilityAPI, quizAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import Loading from '../common/Loading';
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
            const compatResponse =
              await compatibilityAPI.calculate(
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

      alert(
        error.response?.data?.message ||
        'Failed to express interest'
      );

    } finally {

      setSubmitting(false);

    }

  };


  if (loading) return <Loading />;
  if (!listing) return <div>Listing not found</div>;


  // NEW check
  const isOwnListing =
    isAuthenticated &&
    listing?.user?.userId === user?.userId;


  return (

    <div className="min-h-screen bg-gray-50 py-8">

      <div className="container mx-auto px-4 max-w-4xl">


        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-700 mb-6"
        >
          ← Back
        </button>



        <div className="bg-white rounded-lg shadow-lg overflow-hidden">


          {/* header */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-8 text-white">

            <div className="flex items-center">

              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-purple-600 text-4xl font-bold">

                {listing.user.fullName.charAt(0)}

              </div>

              <div className="ml-6">

                <h1 className="text-3xl font-bold">

                  {listing.user.fullName}

                </h1>

                <p className="text-purple-100 mt-1">

                  {listing.user.age} years •
                  {listing.user.gender} •
                  {listing.user.occupation}

                </p>


                {listing.user.isVerified && (

                  <span className="inline-flex items-center mt-2 text-sm">

                    Verified User

                  </span>

                )}

              </div>

            </div>

          </div>



          <div className="p-8">


            {/* compatibility */}
            {compatibility && (

              <div className="mb-8 p-6 bg-blue-50 rounded-lg">

                <h2 className="text-xl font-bold mb-4">

                  Compatibility Analysis

                </h2>

                <CompatibilityBadge
                  score={compatibility.compatibilityScore}
                />

                <p className="mt-3">

                  {compatibility.summary}

                </p>

              </div>

            )}



            {/* preferences */}
            <div className="mb-8">

              <h2 className="text-xl font-bold mb-4">

                Looking For

              </h2>

              <div className="grid grid-cols-2 gap-4">

                <div className="p-4 bg-gray-50 rounded-lg">

                  {listing.lookingForCount} roommates

                </div>

                <div className="p-4 bg-gray-50 rounded-lg">

                  {listing.genderPreference}

                </div>

                <div className="p-4 bg-gray-50 rounded-lg">

                  Age:
                  {listing.ageRangeMin} - {listing.ageRangeMax}

                </div>

                <div className="p-4 bg-gray-50 rounded-lg">

                  Move-in:
                  {new Date(listing.moveInDate).toDateString()}

                </div>

              </div>

            </div>



            {/* budget */}
            <div className="mb-8 p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg">

              <p>

                ₹{listing.budgetPerPerson.toLocaleString()}

              </p>

            </div>



            {/* bio */}
            {listing.description && (

              <div className="mb-8">

                {listing.description}

              </div>

            )}



            {/* action buttons */}
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


              <button className="px-6 py-3 border rounded-lg">

                ❤️

              </button>

            </div>


          </div>

        </div>

      </div>



      {/* modal */}
      {showInterestModal && (

        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">

          <div className="bg-white p-6 rounded-lg w-full max-w-md">

            <textarea
              value={interestMessage}
              onChange={(e) => setInterestMessage(e.target.value)}
              className="w-full border rounded-lg p-3"
            />

            <button
              onClick={handleExpressInterest}
              disabled={submitting}
              className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg"
            >

              Send

            </button>

          </div>

        </div>

      )}

    </div>

  );

};

export default RoommateDetail;