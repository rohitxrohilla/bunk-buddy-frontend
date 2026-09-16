import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { roommateAPI, compatibilityAPI } from "../services/api";
import RoommateCard from "../components/listing/RoommateCard";
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

  // Render 6 skeleton cards as loading placeholders
  const renderSkeletons = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-white border border-slate-100 rounded-2xl p-6 space-y-5 shadow-sm overflow-hidden">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 shimmer-loader rounded-2xl shrink-0" />
            <div className="space-y-2 flex-1">
              <div className="h-4.5 w-2/3 shimmer-loader rounded" />
              <div className="h-3.5 w-1/2 shimmer-loader rounded" />
            </div>
          </div>
          <div className="h-9 w-full shimmer-loader rounded-xl" />
          <div className="grid grid-cols-2 gap-2">
            <div className="h-7 w-full shimmer-loader rounded-lg" />
            <div className="h-7 w-full shimmer-loader rounded-lg" />
            <div className="h-7 w-full shimmer-loader rounded-lg col-span-2" />
          </div>
          <div className="border-t border-slate-100 pt-4 flex justify-between items-center">
            <div className="space-y-1">
              <div className="h-6 w-16 shimmer-loader rounded" />
              <div className="h-3.5 w-10 shimmer-loader rounded" />
            </div>
            <div className="h-6 w-16 shimmer-loader rounded-full" />
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
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Find Roommates</h1>
            <p className="text-slate-500 text-sm mt-1">
              {isAuthenticated && user?.hasCompletedQuiz
                ? "Sorted by compatibility with your lifestyle profile"
                : "Browse and discover people looking for roommates"}
            </p>
          </div>
          {isAuthenticated && (
            <button
              onClick={() => navigate("/roommates/create")}
              className="bg-slate-950 hover:bg-purple-600 text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-sm transition-all duration-200 uppercase tracking-wider shrink-0"
            >
              + List Yourself
            </button>
          )}
        </div>

        {/* Filters Panel */}
        <div className="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-premium">
          <form
            onSubmit={handleSearch}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none text-sm">₹</span>
              <input
                type="number"
                name="minBudget"
                value={filters.minBudget}
                onChange={handleFilterChange}
                placeholder="Min Budget"
                className="w-full pl-8 pr-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent text-sm placeholder:text-slate-400"
              />
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none text-sm">₹</span>
              <input
                type="number"
                name="maxBudget"
                value={filters.maxBudget}
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

        {/* Complete Quiz Banner */}
        {isAuthenticated && !user?.hasCompletedQuiz && (
          <div className="relative bg-slate-950 border border-slate-800 rounded-2xl p-6 md:p-8 overflow-hidden shadow-xl text-white">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/15 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-indigo-600/15 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/10 border border-purple-500/20 text-purple-300">
                  ✨ Match Optimizer
                </span>
                <h3 className="text-xl font-extrabold tracking-tight">
                  Unlock Personalized Roommate Matching
                </h3>
                <p className="text-slate-400 text-sm max-w-xl">
                  Take our compatibility quiz to see lifestyle scores for every listing and find the perfect match.
                </p>
              </div>
              <button
                onClick={() => navigate("/quiz")}
                className="bg-white hover:bg-slate-100 text-slate-950 font-bold px-6 py-3 rounded-xl transition duration-200 text-sm shadow-md tracking-wide shrink-0"
              >
                Take Quiz Now
              </button>
            </div>
          </div>
        )}

        {/* Results Area */}
        {loading ? (
          renderSkeletons()
        ) : roommates.length === 0 ? (
          <div className="text-center py-20 bg-white border border-slate-200/50 rounded-2xl shadow-premium space-y-4">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto text-2xl">
              👥
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-800">No roommate listings found</h3>
              <p className="text-slate-400 text-sm max-w-sm mx-auto">
                We couldn't find listings matching those parameters. Try clearing your filters or check back later!
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <span>{roommates.length} roommates listing active</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {roommates.map((listing) => (
                <RoommateCard
                  key={listing.listingId}
                  listing={listing}
                  compatibilityScore={listing.compatibilityScore}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoommateSearch;
