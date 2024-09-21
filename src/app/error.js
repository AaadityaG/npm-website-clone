'use client'; // client component

export default function Error({ error, reset }) {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">An error occurred</h1>
      <p>{error.message}</p>
      <button onClick={() => reset()} className="bg-blue-500 text-white rounded p-2 mt-4">
        Try Again
      </button>
    </div>
  );
}
