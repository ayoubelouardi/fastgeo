'use client';

import React, { useState } from 'react';

const SpeedTest: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);

  const startTest = () => {
    setIsRunning(true);
  };

  const cancelTest = () => {
    setIsRunning(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Internet Speed Test</h2>
        {isRunning && (
          <button
            onClick={cancelTest}
            className="px-4 py-2 text-sm font-medium text-red-600 bg-red-100 rounded-md hover:bg-red-200 dark:bg-red-900 dark:text-red-100"
          >
            Cancel Test
          </button>
        )}
      </div>

      {!isRunning ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-700 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
          <p className="mb-6 text-gray-500 dark:text-gray-300">
            Click the button below to measure your internet connection speed.
          </p>
          <button
            onClick={startTest}
            className="px-8 py-3 text-lg font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors shadow-md"
          >
            Start Speed Test
          </button>
        </div>
      ) : (
        <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
          <iframe
            src="//openspeedtest.com/speedtest"
            className="absolute top-0 left-0 w-full h-full border-0"
            title="OpenSpeedTest"
            allow="geolocation"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default SpeedTest;
