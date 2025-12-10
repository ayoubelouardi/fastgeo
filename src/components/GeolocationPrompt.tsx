'use client';

import React from 'react';
import { useGeolocation } from '@/hooks/useGeolocation';

const GeolocationPrompt: React.FC = () => {
  const { location, error, loading, getLocation } = useGeolocation();

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white dark:bg-gray-800 max-w-md mx-auto mt-4">
      <h2 className="text-xl font-semibold mb-4">Geolocation Test</h2>
      
      <div className="mb-4">
        <button
          onClick={getLocation}
          disabled={loading}
          className={`px-4 py-2 rounded text-white font-medium transition-colors ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Getting Location...' : 'Get My Location'}
        </button>
      </div>

      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          <p className="font-bold">Error:</p>
          <p>{error}</p>
        </div>
      )}

      {location && (
        <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          <p className="font-bold">Success!</p>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      )}
    </div>
  );
};

export default GeolocationPrompt;
