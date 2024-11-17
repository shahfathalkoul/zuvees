import React from 'react';

const JoinOptions = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500">
      <div className="p-6 bg-white rounded-lg shadow-lg max-w-sm text-center">
        <h1 className="text-2xl font-bold mb-4 text-blue-600">Join Us</h1>
        <p className="text-gray-600 mb-6">
          Choose how you want to proceed. Join as an <span className="font-semibold">Admin</span> or as a <span className="font-semibold">User</span>.
        </p>
        <div className="space-y-4">
          <button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-md transition-all"
          >
            Join as Admin
          </button>
          <button
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md shadow-md transition-all"
          >
            Join as User
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinOptions;
