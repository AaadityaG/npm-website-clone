
import Link from 'next/link';
import { FaExternalLinkAlt, FaStar, FaDownload } from 'react-icons/fa';
import { SquareArrowOutUpRight } from 'lucide-react';

export default function PackageCard({ pkg }) {
  const encodedPackageName = encodeURIComponent(pkg.name);
  return (
    <div className="bg-white rounded shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl mb-6">
      <div className="p-6">
        {/* Package Name and Stars */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">{pkg.name}</h2>
          
        </div>

        {/* Package Description */}
        <p className="text-gray-700 mb-4 line-clamp-3">{pkg.description || 'No description available.'}</p>

        {/* Meta Information */}
        <div className="flex justify-start gap-5 items-center text-gray-600 text-sm mb-4">
         
          <span className="bg-green-100 text-green-600 py-1 px-3 rounded-full text-xs font-medium">
            {pkg.version || 'N/A'}
          </span>
        </div>

        {/* View Package Link */}
        <Link href={`/package/${encodedPackageName}`} className='flex items-center gap-3'>
          <div className=" text-blue-600 font-semibold hover:text-blue-800 transition-colors">
            <span className=''>View Package</span> 
          </div>
        </Link>
      </div>

      {/* Background Image (optional) */}
      <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
    </div>
  );
}
