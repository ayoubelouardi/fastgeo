export default function MapPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4">
      <h1 className="text-3xl font-bold mb-4">Global Speed Map</h1>
      <div className="w-full max-w-6xl h-[600px] bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Map Visualization Loading...</p>
      </div>
    </div>
  );
}
