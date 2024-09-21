'use client'; // This ensures the page is a Client Component

import { useState } from 'react';
import axios from 'axios';
// import PackageCard from '@/components/PackageCard';
import PackageCard from '@/component/PackageCard';

import { FaSearch } from 'react-icons/fa';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [packages, setPackages] = useState([]);
  const [error, setError] = useState(null);

  const searchPackages = async () => {
    try {
      const response = await axios.get(`https://registry.npmjs.org/-/v1/search?text=${searchTerm}`);
      setPackages(response.data.objects);
      setError(null);
    } catch (error) {
      setError('Failed to fetch packages');
      setPackages([]);
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-rb bg-gradient-to-br from-red-500 via-pink-500 to-yellow-500 flex flex-col justify-center items-center px-6 py-10"
    >
      {/* Title Section */}
      <h1 className="lg:text-4xl md:text-4xl text-xl font-bold text-white mb-8 drop-shadow-lg text-center">
        Search NPM Packages
      </h1>
      
      {/* Search Section */}
      <div className="w-full max-w-2xl">
        <div className="relative">
          <input
            type="text"
            className="w-full rounded-lg p-4 pl-12 text-lg text-black bg-white shadow-lg outline-none focus:ring-4 transition"
            placeholder="Search for an NPM package..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <button
          className="px-10 bg-blue-600 text-white font-semibold py-3 mt-4 rounded-lg hover:bg-blue-700 transition-all shadow-lg"
          onClick={searchPackages}
        >
          Search
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-200 mt-6">{error}</p>}

      {/* Package Grid Section */}
      <div className="mt-12 w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <PackageCard key={pkg.package.name} pkg={pkg.package} />
        ))}
      </div>
    </div>
  );
}
