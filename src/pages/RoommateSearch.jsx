import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { roommateAPI, compatibilityAPI } from "../services/api";
import RoommateCard from "../components/listing/RoommateCard";
import Loading from "../components/common/Loading";
import { useAuth } from "../context/AuthContext";

const RoommateSearch = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [roommates, setRoommates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    minBudget: "",
    maxBudget: "",
  });

  useEffect(() => {
    fetchRoommates();
  }, []);

  const fetchRoommates = async () => {
    try {
      const response = await roommateAPI.search(filters);
      let listings = response.data;

      // Calculate compatibility for each listing if user has completed quiz
      if (isAuthenticated && user?.hasCompletedQuiz) {
        const listingsWithCompatibility = await Promise.all(
          listings.map(async (listing) => {
            try {
              const compatResponse = await compatibilityAPI.calculate(
                user.userId,
                listing.user.userId,
              );
              return {
                ...listing,
                compatibilityScore: compatResponse.data.compatibilityScore,
              };
            } catch (err) {
              return { ...listing, compatibilityScore: null };
            }
          }),
        );

        // Sort by compatibility score
        listingsWithCompatibility.sort((a, b) => {
          if (!a.compatibilityScore) return 1;
          if (!b.compatibilityScore) return -1;
          return b.compatibilityScore - a.compatibilityScore;
        });

        setRoommates(listingsWithCompatibility);
      } else {
        setRoommates(listings);
      }
    } catch (error) {
      console.error("Error fetching roommates:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    fetchRoommates();
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Find Roommates</h1>
            <p className="text-gray-600 mt-2">
              {isAuthenticated && user?.hasCompletedQuiz
                ? "Sorted by compatibility with your lifestyle"
                : "Browse people looking for roommates"}
            </p>
          </div>
          {isAuthenticated && (
            <button
              onClick={() => navigate("/roommates/create")}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition font-semibold"
            >
              + Create Listing
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form
            onSubmit={handleSearch}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <input
              type="number"
              name="minBudget"
              value={filters.minBudget}
              onChange={handleFilterChange}
              placeholder="Min Budget (₹)"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="number"
              name="maxBudget"
              value={filters.maxBudget}
              onChange={handleFilterChange}
              placeholder="Max Budget (₹)"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition font-semibold"
            >
              Search
            </button>
          </form>
        </div>

        {/* Complete Quiz Banner */}
        {isAuthenticated && !user?.hasCompletedQuiz && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <div className="flex items-start">
              <svg
                className="w-6 h-6 text-yellow-600 mr-3 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Complete your lifestyle quiz
                </h3>
                <p className="text-gray-700 mb-3">
                  See compatibility scores and get personalized matches
                </p>
                <button
                  onClick={() => navigate("/quiz")}
                  className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition text-sm font-semibold"
                >
                  Take Quiz Now
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {roommates.length === 0 ? (
          <div className="text-center py-16">
            <svg
              className="w-24 h-24 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No roommate listings found
            </h3>
            <p className="text-gray-500">
              Try adjusting your filters or check back later
            </p>
          </div>
        ) : (
          <>
            <p className="text-gray-600 mb-4">
              {roommates.length} listings found
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {roommates.map((listing) => (
                <RoommateCard
                  key={listing.listingId}
                  listing={listing}
                  compatibilityScore={listing.compatibilityScore}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RoommateSearch;
