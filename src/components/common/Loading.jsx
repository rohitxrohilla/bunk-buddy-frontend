import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh] py-12">
      <div className="text-center space-y-4">
        <div className="w-10 h-10 spinner-premium mx-auto"></div>
        <p className="text-sm font-semibold tracking-wide text-slate-400 uppercase animate-pulse">
          Syncing matches...
        </p>
      </div>
    </div>
  );
};

export default Loading;