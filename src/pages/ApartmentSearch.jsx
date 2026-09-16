import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apartmentAPI } from "../services/api";
import ApartmentCard from "../components/listing/ApartmentCard";
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

  // Render 6 skeleton cards as loading placeholders
  const renderSkeletons = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-white border border-slate-100 rounded-2xl p-5 space-y-4 shadow-sm overflow-hidden">
          <div className="h-44 w-full shimmer-loader rounded-xl" />
          <div className="space-y-2">
            <div className="h-5 w-2/3 shimmer-loader rounded" />
            <div className="h-4 w-1/2 shimmer-loader rounded" />
          </div>
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="h-4 w-full shimmer-loader rounded" />
            <div className="h-4 w-full shimmer-loader rounded" />
          </div>
          <div className="border-t border-slate-100 pt-4 flex justify-between items-center">
            <div className="space-y-1">
              <div className="h-6 w-16 shimmer-loader rounded" />
              <div className="h-3.5 w-10 shimmer-loader rounded" />
            </div>
            <div className="h-6 w-20 shimmer-loader rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50/50 py-10">
      <div className="container mx-auto px-6 max-w-6xl space-y-8 animate-fade-in-up">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Find Apartments</h1>
            <p className="text-slate-500 text-sm mt-1">Browse and search available apartment listings in your location</p>
          </div>
          {isAuthenticated && (
            <button
              onClick={() => navigate("/apartments/create")}
              className="bg-slate-950 hover:bg-purple-600 text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-sm transition-all duration-200 uppercase tracking-wider shrink-0"
            >
              + List Apartment
            </button>
          )}
        </div>

        {/* Filters Panel */}
        <div className="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-premium">
          <form
            onSubmit={handleSearch}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none text-sm">📍</span>
              <input
                type="text"
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                placeholder="Location (e.g., Koramangala)"
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent text-sm placeholder:text-slate-400"
              />
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none text-sm">₹</span>
              <input
                type="number"
                name="minRent"
                value={filters.minRent}
                onChange={handleFilterChange}
                placeholder="Min Budget"
                className="w-full pl-8 pr-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent text-sm placeholder:text-slate-400"
              />
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none text-sm">₹</span>
              <input
                type="number"
                name="maxRent"
                value={filters.maxRent}
                onChange={handleFilterChange}
                placeholder="Max Budget"
                className="w-full pl-8 pr-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent text-sm placeholder:text-slate-400"
              />
            </div>
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2.5 px-6 rounded-xl transition-all duration-200 text-sm shadow-sm hover:shadow-purple-500/10"
            >
              Search
            </button>
          </form>
        </div>

        {/* Results Area */}
        {loading ? (
          renderSkeletons()
        ) : apartments.length === 0 ? (
          <div className="text-center py-20 bg-white border border-slate-200/50 rounded-2xl shadow-premium space-y-4">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto text-2xl">
              🏘️
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-800">No apartments found</h3>
              <p className="text-slate-400 text-sm max-w-sm mx-auto">
                We couldn't find matches matching those filters. Try clearing your filters or check back later!
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <span>{apartments.length} apartments listed</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {apartments.map((apartment) => (
                <ApartmentCard
                  key={apartment.listingId}
                  apartment={apartment}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApartmentSearch;
