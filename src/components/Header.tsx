
import React from 'react';

const Header = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-10 p-6">
      <div className="container mx-auto">
        <div className="flex items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="text-3xl font-bold">
              <span className="text-purple-600">axis</span>
            </div>
            <div className="text-sm text-purple-600 font-medium">
              imaging
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
