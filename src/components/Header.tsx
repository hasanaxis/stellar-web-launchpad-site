
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { TeamApplicationForm } from './TeamApplicationForm';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const [showTeamForm, setShowTeamForm] = useState(false);
  const { user, isAdmin, signOut } = useAuth();

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-10 p-6">
        <div className="container mx-auto px-0">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/a96fd7d7-3882-4af6-9de6-21bd8b1de82d.png" 
                alt="Axis Imaging" 
                className="h-12 w-auto lg:h-16" 
              />
            </div>
            
            {/* Navigation */}
            <div className="flex items-center space-x-4">
              {!user ? (
                <>
                  <Button
                    variant="outline"
                    className="text-sm px-4 py-2 bg-white/90 backdrop-blur-sm hover:bg-white"
                    style={{ borderColor: '#EC008C', color: '#EC008C' }}
                    onClick={() => setShowTeamForm(true)}
                  >
                    Join Our Team
                  </Button>
                  <Link to="/auth">
                    <Button
                      variant="outline"
                      className="text-sm px-4 py-2 bg-white/90 backdrop-blur-sm hover:bg-white"
                    >
                      Admin Login
                    </Button>
                  </Link>
                </>
              ) : (
                <div className="flex items-center space-x-4">
                  {isAdmin && (
                    <Link to="/applications">
                      <Button
                        variant="outline"
                        className="text-sm px-4 py-2 bg-white/90 backdrop-blur-sm hover:bg-white"
                      >
                        View Applications
                      </Button>
                    </Link>
                  )}
                  <Button
                    variant="outline"
                    className="text-sm px-4 py-2 bg-white/90 backdrop-blur-sm hover:bg-white"
                    onClick={() => signOut()}
                  >
                    Sign Out
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Team Application Form Modal */}
      {showTeamForm && (
        <TeamApplicationForm 
          isOpen={showTeamForm} 
          onClose={() => setShowTeamForm(false)} 
        />
      )}
    </>
  );
};

export default Header;
