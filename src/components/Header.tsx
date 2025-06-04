
import React from 'react';

const Header = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-10 p-6">
      <div className="container mx-auto">
        <div className="flex items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/a96fd7d7-3882-4af6-9de6-21bd8b1de82d.png" 
              alt="Axis Imaging" 
              className="h-8 w-auto"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
