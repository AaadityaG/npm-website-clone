

import axios from 'axios';
import Link from 'next/link';
import { FaDownload, FaGithub, FaTag, FaUser, FaStar } from 'react-icons/fa';

export default async function PackageDetail({ params }) {
  const { name } = params;

  // Fetch package details from the NPM registry API
  const response = await axios.get(`https://registry.npmjs.org/${name}`);
  const packageData = response.data;

  // Fetch additional package metadata from npm
  const statsResponse = await axios.get(`https://api.npmjs.org/downloads/point/last-week/${name}`);
  const weeklyDownloads = statsResponse.data.downloads;

  return (
    <div className=" w-full h-full p-8 bg-red-300">
      {/* Header Section */}
      <div className="bg-gray-100 p-6 rounded-md shadow-md mb-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{packageData.name}</h1>
        <p className="text-lg text-gray-600">{packageData.description}</p>
        
        {/* Metadata */}
        <div className="flex flex-wrap mt-4 space-x-6 text-gray-700">
          <div className="flex items-center">
            <FaDownload className="mr-2 text-blue-500" />
            <span>Weekly Downloads: {weeklyDownloads.toLocaleString()}</span>
          </div>
          {packageData.repository && packageData.repository.url && (
            <div className="flex items-center">
              <FaGithub className="mr-2 text-gray-700" />
              <a
                href={packageData.repository.url.replace('git+', '')}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-blue-600"
              >
                GitHub Repository
              </a>
            </div>
          )}
          <div className="flex items-center">
            <FaTag className="mr-2 text-green-500" />
            <span>License: {packageData.license || 'N/A'}</span>
          </div>
          <div className="flex items-center">
            <FaUser className="mr-2 text-yellow-500" />
            <span>Maintainers: {packageData.maintainers.length}</span>
          </div>
        </div>
      </div>

      {/* Maintainers Section */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-700">Maintainers:</h2>
        <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {packageData.maintainers.map((maintainer) => (
            <li
              key={maintainer.email}
              className="bg-white shadow-md rounded-md p-4 border border-gray-200"
            >
              <div className="font-semibold text-gray-900">{maintainer.name}</div>
              <div className="text-gray-600">{maintainer.email}</div>
            </li>
          ))}
        </ul>
      </div>

      {/* Versions Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-gray-700">Versions:</h2>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Object.keys(packageData.versions).map((version) => (
            <Link href={`/package/${name}/version/${version}`} key={version}>
              <p className="block bg-white shadow-md rounded-md p-4 border border-gray-200 hover:bg-gray-50">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-800">{version}</span>
                  <FaTag className="text-green-500" />
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Released on: {new Date(packageData.time[version]).toLocaleDateString()}
                </p>
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
