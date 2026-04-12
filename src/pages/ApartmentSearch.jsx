import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apartmentAPI } from "../services/api";
import ApartmentCard from "../components/listing/ApartmentCard";
import Loading from "../components/common/Loading";
import { useAuth } from "../context/AuthContext";

const ApartmentSearch = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    location: "",
    minRent: "",
    maxRent: "",
  });

  useEffect(() => {
    fetchApartments();
  }, []);

  const fetchApartments = async () => {
    try {
      const response = await apartmentAPI.search(filters);
      setApartments(response.data);
    } catch (error) {
      console.error("Error fetching apartments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    fetchApartments();
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
            <h1 className="text-3xl font-bold text-gray-900">
              Find Apartments
            </h1>
            <p className="text-gray-600 mt-2">
              Browse available apartments in your area
            </p>
          </div>
          {isAuthenticated && (
            <button
              onClick={() => navigate("/apartments/create")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              + List Apartment
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form
            onSubmit={handleSearch}
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            <input
              type="text"
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              placeholder="Location (e.g., Koramangala)"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              name="minRent"
              value={filters.minRent}
              onChange={handleFilterChange}
              placeholder="Min Rent (₹)"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              name="maxRent"
              value={filters.maxRent}
              onChange={handleFilterChange}
              placeholder="Max Rent (₹)"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Search
            </button>
          </form>
        </div>

        {/* Results */}
        {apartments.length === 0 ? (
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
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No apartments found
            </h3>
            <p className="text-gray-500">
              Try adjusting your filters or check back later
            </p>
          </div>
        ) : (
          <>
            <p className="text-gray-600 mb-4">
              {apartments.length} apartments found
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {apartments.map((apartment) => (
                <ApartmentCard
                  key={apartment.listingId}
                  apartment={apartment}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ApartmentSearch;
