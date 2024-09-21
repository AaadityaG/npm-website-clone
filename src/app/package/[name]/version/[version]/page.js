import axios from 'axios';

export default async function VersionDetail({ params }) {
  const { name, version } = params;

  // Fetch package version details on the server side
  const response = await axios.get(`https://registry.npmjs.org/${name}/${version}`);
  const versionData = response.data;
    
    
  return (
    <div className="bg-red-300 w-full min-h-screen h-full  px-6 py-12 ">
      {/* Package Name and Version */}
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
        {versionData.name} <span className="text-gray-500">v{versionData.version}</span>
      </h1>

      {/* Description */}
      <p className="text-lg text-gray-700 mb-8">{versionData.description || 'No description available.'}</p>

      {/* Dependencies Section */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Dependencies:</h2>
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-8">
        {versionData.dependencies && Object.keys(versionData.dependencies).length > 0 ? (
          <ul className="space-y-2">
            {Object.entries(versionData.dependencies).map(([dep, ver]) => (
              <li key={dep} className="flex justify-between bg-white p-3 rounded-md shadow-sm">
                <span className="font-medium text-gray-800">{dep}</span>
                <span className="text-gray-600">{ver}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No dependencies listed for this version.</p>
        )}
      </div>

      {/* Repository Link */}
      {versionData.repository?.url && (
        <a
        href={versionData.repository?.url
            .replace(/^git\+/, '') // Remove git+ at the start
            .replace(/\.git$/, '') // Remove .git at the end
            .replace(/^git:/, 'https:') // Replace git: with https:
          }
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg font-semibold hover:bg-blue-700 transition-all"
        >
          View Repository
        </a>
      )}
    </div>
  );
}
