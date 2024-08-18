import React from 'react';

const Track = ({activeSong }) => (
  <div className="flex-1 flex items-center justify-start">
    <div className="w-[50%]">
      <p className="truncate text-white font-bold text-lg">
        {activeSong?.title ? activeSong?.title : 'No active Song'}
      </p>
    </div>
  </div>
);

export default Track;