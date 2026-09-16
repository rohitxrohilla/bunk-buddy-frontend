import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  const testimonials = [
    {
      id: 1,
      name: "Rohan Sharma",
      role: "Software Engineer at Google",
      img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=120&h=120",
      rating: 5,
      review: "Found an incredible flatmate within three days. The compatibility quiz is spot on—our schedules align perfectly and the house stays spotless!"
    },
    {
      id: 2,
      name: "Sneha Patel",
      role: "Product Designer at Stripe",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120",
      rating: 5,
      review: "The UI feels extremely polished, and the verified profiles saved me from endless sketch interactions. Highly recommend BunkBuddy!"
    },
    {
      id: 3,
      name: "Vikram Malhotra",
      role: "Founder, Peak Ventures",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120",
      rating: 5,
      review: "Moving to a new city was stressful until I used this app. The search filters for specific budgets and furnishing made the move seamless."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative gradient-bg pt-20 pb-32 text-white">
        {/* Background Grid Pattern & Glows */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Column: Headline and Actions */}
            <div className="lg:col-span-7 space-y-8 text-left animate-fade-in-up">
              {/* Announcement Badge */}
              <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-3.5 py-1.5 backdrop-blur-md">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                </span>
                <span className="text-xs font-semibold tracking-wide text-purple-200">Matching Algorithm v2.4 is Live</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
                Find Trusted Matches <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-300 bg-clip-text text-transparent">Faster</span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-xl">
                Connecting verified roommates and premium rental opportunities through a high-fidelity compatibility engine. Match lifestyle habits, clean preferences, and budget ranges seamlessly.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                {!isAuthenticated ? (
                  <>
                    <Link
                      to="/register"
                      className="bg-white text-slate-950 font-bold px-8 py-3.5 rounded-xl hover:bg-slate-100 transition-all duration-200 shadow-lg shadow-white/5 text-center"
                    >
                      Get Started Free
                    </Link>
                    <Link
                      to="/login"
                      className="bg-transparent border border-white/20 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/5 hover:border-white/40 transition-all duration-200 text-center"
                    >
                      Explore Listings
                    </Link>
                  </>
                ) : (
                  <Link
                    to="/dashboard"
                    className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold px-8 py-3.5 rounded-xl hover:from-purple-600 hover:to-indigo-600 transition-all duration-200 shadow-lg shadow-purple-500/25 text-center"
                  >
                    Go to Dashboard →
                  </Link>
                )}
              </div>

              {/* Trust Badge Grid */}
              <div className="pt-8 border-t border-white/5 flex flex-wrap items-center gap-x-8 gap-y-4 text-slate-400 text-sm">
                <div className="flex items-center space-x-2">
                  <span className="text-white font-bold text-base">★ ★ ★ ★ ★</span>
                  <span>Trusted by thousands</span>
                </div>
                <div className="h-4 w-px bg-white/10 hidden sm:block" />
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.9C2.29 4.4 2.684 4 3.19 4h13.62c.506 0 .9.4 1.024.9l1.455 5.82a1 1 0 01-.157.818C19.043 11.666 18.257 12 17.5 12c-.218 0-.43-.025-.633-.074a2.986 2.986 0 01-2.454 1.48A2.986 2.986 0 0112 12c-.218 0-.43.025-.633.074a2.986 2.986 0 01-2.454 1.48A2.986 2.986 0 016 12c-.218 0-.43.025-.633.074a2.986 2.986 0 01-2.454 1.48A2.986 2.986 0 012 12c-.757 0-1.543-.334-1.812-.912a1 1 0 01-.157-.818L1.488 4.9zM4 14v3a1 1 0 001 1h10a1 1 0 001-1v-3a3 3 0 01-6 0v-1a1 1 0 10-2 0v1a3 3 0 01-4 0z" clipRule="evenodd"/></svg>
                  <span>100% Secure Audited</span>
                </div>
              </div>
            </div>

            {/* Right Column: Floating Mockup UI Cards */}
            <div className="lg:col-span-5 relative hidden lg:block animate-float">
              {/* Card 1: Roommate Mockup */}
              <div className="absolute top-0 right-4 w-72 glass-panel-dark p-5 rounded-2xl shadow-2xl border border-white/10 transform -rotate-2 hover:rotate-0 transition-transform duration-300 z-20">
                <div className="flex items-center space-x-3.5 mb-4">
                  <div className="w-11 h-11 rounded-full bg-purple-500 border border-white/20 flex items-center justify-center font-bold text-white shadow-inner">
                    S
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Sarah Jenkins</h4>
                    <p className="text-[11px] text-slate-400">Software Designer • 24y</p>
                  </div>
                </div>
                {/* Custom Compatibility gauge mock */}
                <div className="bg-purple-500/10 border border-purple-500/20 px-3 py-1.5 rounded-lg mb-3 flex items-center justify-between">
                  <span className="text-[11px] text-purple-300 font-semibold">Match Score</span>
                  <span className="text-xs font-bold text-purple-400">96% Perfect</span>
                </div>
                <div className="space-y-1.5 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Sleep:</span>
                    <span>Early Bird</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Cleanliness:</span>
                    <span>9 / 10</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Guests:</span>
                    <span>Rarely</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Apartment Mockup */}
              <div className="absolute top-48 -left-4 w-80 glass-panel p-5 rounded-2xl shadow-2xl border border-white/20 transform rotate-3 hover:rotate-0 transition-transform duration-300 z-10 text-slate-900">
                <div className="h-28 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-xl mb-4 relative overflow-hidden flex items-center justify-center">
                  <svg className="w-12 h-12 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span className="absolute top-2.5 right-2.5 bg-white/90 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-md">
                    2 BHK
                  </span>
                </div>
                <h4 className="font-bold text-sm mb-1">Luxury Studio, Indiranagar</h4>
                <p className="text-xs text-slate-500 mb-3 flex items-center">
                  <span className="text-indigo-600 mr-1">📍</span> Bangalore, KA
                </p>
                <div className="flex justify-between items-center border-t border-slate-100 pt-3">
                  <div>
                    <span className="text-base font-extrabold text-indigo-600">₹18,500</span>
                    <span className="text-[10px] text-slate-400">/mo</span>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Furnished
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Credibility Stats Section */}
      <div className="relative -mt-16 px-6 z-20">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="bg-white/80 border border-slate-200/50 shadow-premium p-6 rounded-2xl text-center backdrop-blur-md hover:scale-[1.02] transition-transform duration-200">
              <p className="text-2xl sm:text-3xl font-extrabold text-purple-600 mb-1">500+</p>
              <p className="text-xs font-semibold text-slate-500 tracking-wide uppercase">Verified Users</p>
            </div>
            <div className="bg-white/80 border border-slate-200/50 shadow-premium p-6 rounded-2xl text-center backdrop-blur-md hover:scale-[1.02] transition-transform duration-200">
              <p className="text-2xl sm:text-3xl font-extrabold text-indigo-600 mb-1">1000+</p>
              <p className="text-xs font-semibold text-slate-500 tracking-wide uppercase">Successful Matches</p>
            </div>
            <div className="bg-white/80 border border-slate-200/50 shadow-premium p-6 rounded-2xl text-center backdrop-blur-md hover:scale-[1.02] transition-transform duration-200">
              <p className="text-2xl sm:text-3xl font-extrabold text-pink-600 mb-1">98%</p>
              <p className="text-xs font-semibold text-slate-500 tracking-wide uppercase">Satisfaction Rate</p>
            </div>
            <div className="bg-white/80 border border-slate-200/50 shadow-premium p-6 rounded-2xl text-center backdrop-blur-md hover:scale-[1.02] transition-transform duration-200">
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">24/7</p>
              <p className="text-xs font-semibold text-slate-500 tracking-wide uppercase">Instant Support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-28 bg-slate-50">
        <div className="container mx-auto px-6 text-center space-y-16">
          <div className="space-y-4 max-w-2xl mx-auto">
            <h2 className="text-xs font-bold uppercase tracking-wider text-purple-600">Built for Trust</h2>
            <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Intelligent features that make roommate hunting stress-free.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white border border-slate-100 hover:border-purple-200 p-8 rounded-2xl shadow-premium hover:shadow-premium-hover transition-all duration-300 text-left space-y-5 group">
              <div className="w-12 h-12 bg-purple-50 group-hover:bg-purple-500 rounded-xl flex items-center justify-center transition-colors duration-300">
                <svg className="w-6 h-6 text-purple-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Compatibility Matching</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Our algorithm processes 10+ core lifestyle preferences to score alignment levels with 85%+ accuracy. No more awkward surprises post moving in.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-slate-100 hover:border-indigo-200 p-8 rounded-2xl shadow-premium hover:shadow-premium-hover transition-all duration-300 text-left space-y-5 group">
              <div className="w-12 h-12 bg-indigo-50 group-hover:bg-indigo-500 rounded-xl flex items-center justify-center transition-colors duration-300">
                <svg className="w-6 h-6 text-indigo-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Verified Credentials</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Every user is verified via email and authentication protocols. Express interest safely with secure email forwarding features.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-slate-100 hover:border-pink-200 p-8 rounded-2xl shadow-premium hover:shadow-premium-hover transition-all duration-300 text-left space-y-5 group">
              <div className="w-12 h-12 bg-pink-50 group-hover:bg-pink-500 rounded-xl flex items-center justify-center transition-colors duration-300">
                <svg className="w-6 h-6 text-pink-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Seamless Dashboard</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Manage your listings, received match inquiries, favorites list, and profile verification status in one cohesive space.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-24 bg-white border-y border-slate-100">
        <div className="container mx-auto px-6 max-w-5xl space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600">The Journey</h2>
            <p className="text-3xl font-extrabold tracking-tight text-slate-900">How It Works</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Step 1 */}
            <div className="text-center space-y-4 relative">
              <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto text-lg font-bold shadow-sm">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-base">Create Profile</h3>
              <p className="text-slate-400 text-xs leading-relaxed max-w-[200px] mx-auto">
                Sign up in seconds, enter occupation, details, and biography.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center space-y-4 relative">
              <div className="w-12 h-12 bg-purple-50 border border-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto text-lg font-bold shadow-sm">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-base">Lifestyle Quiz</h3>
              <p className="text-slate-400 text-xs leading-relaxed max-w-[200px] mx-auto">
                Answer key behavioral questions on sleep, noise, cleanliness.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center space-y-4 relative">
              <div className="w-12 h-12 bg-pink-50 border border-pink-100 text-pink-600 rounded-2xl flex items-center justify-center mx-auto text-lg font-bold shadow-sm">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-base">Browse Recommendations</h3>
              <p className="text-slate-400 text-xs leading-relaxed max-w-[200px] mx-auto">
                Review compatibility score tiers sorted dynamically.
              </p>
            </div>

            {/* Step 4 */}
            <div className="text-center space-y-4 relative">
              <div className="w-12 h-12 bg-slate-900 border border-slate-800 text-white rounded-2xl flex items-center justify-center mx-auto text-lg font-bold shadow-sm">
                4
              </div>
              <h3 className="font-bold text-slate-900 text-base">Connect Instantly</h3>
              <p className="text-slate-400 text-xs leading-relaxed max-w-[200px] mx-auto">
                Express interest, share notes, and finalize your agreement!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-28 bg-slate-50">
        <div className="container mx-auto px-6 max-w-6xl space-y-16">
          <div className="text-center space-y-4 max-w-xl mx-auto">
            <h2 className="text-xs font-bold uppercase tracking-wider text-purple-600">Testimonials</h2>
            <p className="text-3xl font-extrabold tracking-tight text-slate-900">
              Verified outcomes from real occupants.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test) => (
              <div
                key={test.id}
                className="bg-white border border-slate-100 p-8 rounded-2xl shadow-premium hover:shadow-premium-hover transition-all duration-300 space-y-6 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center space-x-0.5 text-amber-400 text-sm">
                    {Array.from({ length: test.rating }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <p className="text-slate-600 text-sm italic leading-relaxed">
                    "{test.review}"
                  </p>
                </div>
                <div className="flex items-center space-x-3.5 pt-4 border-t border-slate-100">
                  <img
                    src={test.img}
                    alt={test.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <h4 className="font-bold text-slate-950 text-sm">{test.name}</h4>
                    <p className="text-[10px] text-slate-400 font-semibold">{test.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-24 bg-slate-950 overflow-hidden border-t border-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(99,102,241,0.08)_0%,transparent_50%)]" />
        <div className="container mx-auto px-6 text-center space-y-8 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white max-w-xl mx-auto">
            Ready to find your perfect lifestyle match?
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-md mx-auto">
            Join thousands of professionals, students, and property listing managers today.
          </p>
          <div className="pt-4">
            <Link
              to={isAuthenticated ? "/dashboard" : "/register"}
              className="inline-block bg-white text-slate-950 font-bold px-8 py-3.5 rounded-xl hover:bg-slate-100 transition-all duration-200 shadow-md shadow-white/5"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;