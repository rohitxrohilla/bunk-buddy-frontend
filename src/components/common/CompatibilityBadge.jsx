import React from 'react';
import { getCompatibilityText } from '../../utils/constants';

const CompatibilityBadge = ({ score }) => {
  if (!score) return null;

  // Custom visual styles that override the generic background styles for a premium SaaS look
  let styleClasses = '';
  if (score >= 85) {
    styleClasses = 'text-emerald-700 bg-emerald-50 border-emerald-200/50 shadow-emerald-500/5';
  } else if (score >= 70) {
    styleClasses = 'text-purple-700 bg-purple-50 border-purple-200/50 shadow-purple-500/5';
  } else if (score >= 50) {
    styleClasses = 'text-amber-700 bg-amber-50 border-amber-200/50 shadow-amber-500/5';
  } else {
    styleClasses = 'text-rose-700 bg-rose-50 border-rose-200/50 shadow-rose-500/5';
  }

  return (
    <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${styleClasses} shadow-sm backdrop-blur-sm transition-all duration-200`}>
      <svg className="w-3.5 h-3.5 mr-1.5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
      <span>{score}% {getCompatibilityText(score)}</span>
    </div>
  );
};

export default CompatibilityBadge;