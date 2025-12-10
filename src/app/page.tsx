import GeolocationPrompt from '@/components/GeolocationPrompt';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          <span className="block">Test Your Internet Speed</span>
          <span className="block text-blue-600 dark:text-blue-400">Map the World</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Contribute to the global internet speed map anonymously. Measure your connection and help others find the best networks.
        </p>
        <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
          <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
            <button className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 w-full">
              Start Speed Test
            </button>
            <a
              href="/map"
              className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-100 dark:hover:bg-blue-800 md:py-4 md:text-lg md:px-10 w-full"
            >
              View Map
            </a>
          </div>
        </div>
        
        <div className="mt-12">
          <GeolocationPrompt />
        </div>
      </div>
    </div>
  );
}
