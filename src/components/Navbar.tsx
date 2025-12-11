import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black" suppressHydrationWarning>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" suppressHydrationWarning>
        <div className="flex justify-between h-16 items-center" suppressHydrationWarning>
          <div className="flex-shrink-0 flex items-center" suppressHydrationWarning>
            <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              FastGeo
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8" suppressHydrationWarning>
            <Link
              href="/"
              className="text-gray-900 dark:text-gray-100 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Speed Test
            </Link>
            <Link
              href="/map"
              className="text-gray-900 dark:text-gray-100 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Global Map
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
