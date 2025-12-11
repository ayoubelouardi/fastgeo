'use client';

import React, { useState, useEffect } from 'react';

interface SpeedTestResults {
  download: number;
  upload: number;
  ping: number;
  jitter: number;
}

const SpeedTest: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<SpeedTestResults | null>(null);
  const [manualMode, setManualMode] = useState(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Log all messages for debugging
      console.log('Message received from:', event.origin, event.data);

      // OpenSpeedTest usually sends an object with these keys
      // We try to be flexible in parsing
      const data = event.data;
      
      if (data) {
        // Check for OpenSpeedTest specific format
        // They might send strings like "100.5" or numbers
        const download = Number(data.download) || Number(data.dlStatus);
        const upload = Number(data.upload) || Number(data.ulStatus);
        const ping = Number(data.ping) || Number(data.pingStatus);
        const jitter = Number(data.jitter) || Number(data.jitterStatus);

        if (download || upload || ping) {
           setResults({
              download: download || 0,
              upload: upload || 0,
              ping: ping || 0,
              jitter: jitter || 0
           });
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const startTest = () => {
    setIsRunning(true);
    setResults(null);
    setManualMode(false);
  };

  const cancelTest = () => {
    setIsRunning(false);
    setResults(null);
  };

  const handleManualSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setResults({
      download: Number(formData.get('download')),
      upload: Number(formData.get('upload')),
      ping: Number(formData.get('ping')),
      jitter: Number(formData.get('jitter')),
    });
    setIsRunning(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-colors">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Internet Speed Test</h2>
        <div className="space-x-2">
          {!isRunning && !results && (
             <button
               onClick={() => setManualMode(!manualMode)}
               className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 underline"
             >
               {manualMode ? 'Cancel Manual Entry' : 'Enter Results Manually'}
             </button>
          )}
          {isRunning && (
            <button
              onClick={cancelTest}
              className="px-4 py-2 text-sm font-medium text-red-600 bg-red-100 rounded-md hover:bg-red-200 dark:bg-red-900 dark:text-red-100 transition-colors"
            >
              Cancel Test
            </button>
          )}
        </div>
      </div>

      {/* Results Display */}
      {results && (
        <div className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-center border border-blue-100 dark:border-blue-800">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Download</p>
            <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
              {results.download.toFixed(2)}
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-1">Mbps</span>
            </p>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg text-center border border-green-100 dark:border-green-800">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Upload</p>
            <p className="text-2xl font-bold text-green-700 dark:text-green-300">
              {results.upload.toFixed(2)}
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-1">Mbps</span>
            </p>
          </div>
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg text-center border border-yellow-100 dark:border-yellow-800">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Ping</p>
            <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">
              {results.ping.toFixed(0)}
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-1">ms</span>
            </p>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg text-center border border-purple-100 dark:border-purple-800">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Jitter</p>
            <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">
              {results.jitter.toFixed(0)}
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-1">ms</span>
            </p>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      {manualMode ? (
        <form onSubmit={handleManualSubmit} className="max-w-lg mx-auto space-y-4 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-lg font-medium text-center mb-4">Enter Speed Test Results</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Download (Mbps)</label>
              <input name="download" type="number" step="0.01" required className="w-full p-2 rounded border dark:bg-gray-800 dark:border-gray-600" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Upload (Mbps)</label>
              <input name="upload" type="number" step="0.01" required className="w-full p-2 rounded border dark:bg-gray-800 dark:border-gray-600" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Ping (ms)</label>
              <input name="ping" type="number" step="1" required className="w-full p-2 rounded border dark:bg-gray-800 dark:border-gray-600" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Jitter (ms)</label>
              <input name="jitter" type="number" step="1" required className="w-full p-2 rounded border dark:bg-gray-800 dark:border-gray-600" />
            </div>
          </div>
          <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save Results</button>
        </form>
      ) : !isRunning ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-700 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
          <p className="mb-6 text-gray-500 dark:text-gray-300">
            {results ? 'Test complete. Click below to run again.' : 'Click the button below to measure your internet connection speed.'}
          </p>
          <button
            onClick={startTest}
            className="px-8 py-3 text-lg font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors shadow-md"
          >
            {results ? 'Run Again' : 'Start Speed Test'}
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
