import React from 'react';

const RoleSelectionPage = () => {
    const handleAdmin = () => {
      // Redirect to admin page
      alert('Admin selected')
      window.location.href = '/admin';
    };
    const handleUser = () => {
        alert('User selected')
        window.location.href = '/user';
    }
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Select Your Role
        </h1>
        <div className="flex flex-col gap-4">
          {/* Admin Button */}
          <button
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200 ease-in-out"
            onClick={() =>handleAdmin()
                 }
          >
            Join as Admin
          </button>
          {/* User Button */}
          <button
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-200 ease-in-out"
            onClick={() => handleUser()}
          >
            Join as User
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionPage;
