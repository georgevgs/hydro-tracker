import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900 text-white py-4 px-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-blue-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C12 2 6 9 6 14a6 6 0 0 0 12 0c0-5-6-12-6-12z" />
          </svg>
          <h1 className="text-xl font-bold">WaterTrack</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
