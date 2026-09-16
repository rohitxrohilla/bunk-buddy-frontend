import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apartmentAPI, fileAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { BHK_OPTIONS, FURNISHING_OPTIONS, AMENITIES_OPTIONS } from '../../utils/constants';

const CreateApartment = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [photos, setPhotos] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    rent: '',
    deposit: '',
    bhkCount: 'TWO_BHK',
    address: '',
    availableFrom: '',
    furnishingStatus: 'FURNISHED',
    amenities: [],
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAmenityToggle = (amenity) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files || files.length === 0) return;

    setUploading(true);
    setUploadError('');

    try {
      const uploadData = new FormData();
      files.forEach((file) => {
        uploadData.append('files', file);
      });

      const res = await fileAPI.uploadMultiple(uploadData);
      const newUrls = res.data.map((item) => item.url);
      setPhotos((prev) => [...prev, ...newUrls]);
    } catch (err) {
      setUploadError(err.response?.data?.message || 'Failed to upload photos. Please try again.');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleRemovePhoto = (indexToRemove) => {
    setPhotos((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await apartmentAPI.create({
        userId: user.userId,
        ...formData,
        rent: parseInt(formData.rent),
        deposit: parseInt(formData.deposit),
        photos: photos,
      });

      navigate('/my-listings');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create listing');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-6">
      <div className="max-w-2xl mx-auto space-y-8 animate-fade-in-up">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">List Your Apartment</h1>
          <p className="text-slate-500 text-sm max-w-md mx-auto">Publish your apartment to match with prospective tenants and roommates.</p>
        </div>

        <div className="bg-white border border-slate-200/60 rounded-3xl p-6 md:p-8 shadow-premium relative overflow-hidden">
          {/* Accent indicator */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
          
          {error && (
            <div className="bg-rose-50 border border-rose-100 text-rose-700 px-4 py-3 rounded-2xl text-sm mb-6 flex items-center space-x-2">
              <span>⚠️</span>
              <span className="font-medium">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                Listing Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                minLength={10}
                maxLength={200}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent text-sm placeholder:text-slate-400"
                placeholder="e.g., 2BHK Apartment in Koramangala with Modern Amenities"
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent text-sm placeholder:text-slate-400"
                placeholder="Describe your apartment layout, features, details, and guidelines..."
              />
            </div>

            {/* Rent & Deposit */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Monthly Rent (₹) *
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none text-sm">₹</span>
                  <input
                    type="number"
                    name="rent"
                    value={formData.rent}
                    onChange={handleChange}
                    required
                    min="1000"
                    className="w-full pl-8 pr-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent text-sm placeholder:text-slate-400"
                    placeholder="25000"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Security Deposit (₹) *
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none text-sm">₹</span>
                  <input
                    type="number"
                    name="deposit"
                    value={formData.deposit}
                    onChange={handleChange}
                    required
                    min="0"
                    className="w-full pl-8 pr-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent text-sm placeholder:text-slate-400"
                    placeholder="50000"
                  />
                </div>
              </div>
            </div>

            {/* BHK & Furnishing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                  BHK Size Type *
                </label>
                <select
                  name="bhkCount"
                  value={formData.bhkCount}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent text-sm"
                >
                  {BHK_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Furnishing Status *
                </label>
                <select
                  name="furnishingStatus"
                  value={formData.furnishingStatus}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent text-sm"
                >
                  {FURNISHING_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                Full Address *
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                rows="2"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent text-sm placeholder:text-slate-400"
                placeholder="e.g., Block B, Flat 402, Sunshine Heights, Koramangala, Bangalore"
              />
            </div>

            {/* Available From */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                Available From *
              </label>
              <input
                type="date"
                name="availableFrom"
                value={formData.availableFrom}
                onChange={handleChange}
                required
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent text-sm"
              />
            </div>

            {/* Amenities Selectable Chips */}
            <div className="space-y-2.5">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                Amenities Included
              </label>
              <div className="flex flex-wrap gap-2">
                {AMENITIES_OPTIONS.map((amenity) => {
                  const isChecked = formData.amenities.includes(amenity);
                  return (
                    <button
                      type="button"
                      key={amenity}
                      onClick={() => handleAmenityToggle(amenity)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition duration-150 ${
                        isChecked
                          ? 'bg-purple-600 border-purple-600 text-white shadow-sm shadow-purple-500/10'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {amenity}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Photos Upload Section */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Apartment Photos ({photos.length})
                </label>
                {uploading && (
                  <span className="text-xs text-purple-600 font-semibold animate-pulse">
                    Uploading images...
                  </span>
                )}
              </div>

              {/* Upload Input Area */}
              <label className="border-2 border-dashed border-slate-200 hover:border-purple-400 transition-colors rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer bg-slate-50/50 hover:bg-purple-50/20">
                <input
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={handleFileChange}
                  disabled={uploading}
                  className="hidden"
                />
                <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-slate-700">Click to upload or drag and drop</p>
                <p className="text-[11px] text-slate-400 mt-0.5">PNG, JPG, WEBP, GIF up to 10MB each</p>
              </label>

              {uploadError && (
                <p className="text-xs text-rose-500 font-medium">{uploadError}</p>
              )}

              {/* Photos Preview Grid */}
              {photos.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 pt-2">
                  {photos.map((url, idx) => (
                    <div key={idx} className="relative group rounded-xl overflow-hidden aspect-square border border-slate-200 bg-slate-100">
                      <img
                        src={url}
                        alt={`Apartment preview ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemovePhoto(idx)}
                        className="absolute top-1.5 right-1.5 w-6 h-6 bg-slate-900/80 hover:bg-rose-600 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Remove photo"
                      >
                        ✕
                      </button>
                      {idx === 0 && (
                        <span className="absolute bottom-1.5 left-1.5 bg-slate-900/80 text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">
                          Cover
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex space-x-3 pt-4 border-t border-slate-100">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-slate-950 hover:bg-purple-600 text-white font-bold py-3 rounded-xl transition duration-200 text-xs uppercase tracking-wider shadow-sm disabled:bg-slate-200"
              >
                {loading ? 'Creating...' : 'Create Apartment Listing'}
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-3 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs uppercase tracking-wide transition duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateApartment;