export const GENDER_OPTIONS = [
  { value: 'MALE', label: 'Male' },
  { value: 'FEMALE', label: 'Female' },
  { value: 'OTHER', label: 'Other' },
  { value: 'PREFER_NOT_TO_SAY', label: 'Prefer not to say' },
];

export const SLEEP_SCHEDULE_OPTIONS = [
  { value: 'EARLY_BIRD', label: 'Early Bird (before 11 PM)' },
  { value: 'NIGHT_OWL', label: 'Night Owl (after midnight)' },
];

export const NOISE_TOLERANCE_OPTIONS = [
  { value: 'QUIET', label: 'Quiet' },
  { value: 'MODERATE', label: 'Moderate' },
  { value: 'LIVELY', label: 'Lively' },
];

export const FREQUENCY_OPTIONS = [
  { value: 'RARELY', label: 'Rarely' },
  { value: 'SOMETIMES', label: 'Sometimes' },
  { value: 'OFTEN', label: 'Often' },
];

export const DRINKING_OPTIONS = [
  { value: 'YES', label: 'Yes' },
  { value: 'NO', label: 'No' },
  { value: 'OCCASIONALLY', label: 'Occasionally' },
];

export const PET_OPTIONS = [
  { value: 'HAVE_PETS', label: 'Have Pets' },
  { value: 'OKAY_WITH_PETS', label: 'Okay with Pets' },
  { value: 'NO_PETS', label: 'No Pets' },
];

export const SOCIAL_LEVEL_OPTIONS = [
  { value: 'PRIVATE', label: 'Private' },
  { value: 'BALANCED', label: 'Balanced' },
  { value: 'VERY_SOCIAL', label: 'Very Social' },
];

export const BHK_OPTIONS = [
  { value: 'ONE_BHK', label: '1 BHK' },
  { value: 'TWO_BHK', label: '2 BHK' },
  { value: 'THREE_BHK', label: '3 BHK' },
  { value: 'FOUR_BHK', label: '4 BHK' },
  { value: 'STUDIO', label: 'Studio' },
  { value: 'PG', label: 'PG' },
];

export const FURNISHING_OPTIONS = [
  { value: 'FURNISHED', label: 'Furnished' },
  { value: 'SEMI_FURNISHED', label: 'Semi-Furnished' },
  { value: 'UNFURNISHED', label: 'Unfurnished' },
];

export const AMENITIES_OPTIONS = [
  'WiFi',
  'Parking',
  'Gym',
  'Power Backup',
  'Laundry',
  'AC',
  'Security',
  'Swimming Pool',
  'Lift',
  'Water Supply',
];

export const getCompatibilityColor = (score) => {
  if (score >= 85) return 'text-green-600 bg-green-100';
  if (score >= 70) return 'text-blue-600 bg-blue-100';
  if (score >= 50) return 'text-yellow-600 bg-yellow-100';
  return 'text-red-600 bg-red-100';
};

export const getCompatibilityText = (score) => {
  if (score >= 85) return 'Excellent Match';
  if (score >= 70) return 'Good Match';
  if (score >= 50) return 'Moderate Match';
  return 'Low Compatibility';
};