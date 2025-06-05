
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEmailSignup } from '@/hooks/useEmailSignup';
import { TeamApplicationForm } from './TeamApplicationForm';

const HeroSection = () => {
  const [email, setEmail] = useState('');
  const [showTeamForm, setShowTeamForm] = useState(false);
  const { signupEmail, isLoading } = useEmailSignup();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      return;
    }

    const result = await signupEmail(email);
    if (result.success) {
      setEmail(''); // Clear the input on success
    }
  };

  return (
    <>
      <div 
        className="min-h-screen relative overflow-hidden flex items-center justify-center"
        style={{
          background: window.innerWidth <= 768 
            ? 'radial-gradient(circle at 95% 95%, #E8A4D8 8%, #F2C7E3 20%, #FFFFFF 45%)'
            : 'radial-gradient(circle at 95% 70%, #E8A4D8 8%, #F2C7E3 20%, #FFFFFF 45%)'
        }}
      >
        <div className="container mx-auto px-6 py-12 lg:py-20 pt-24 lg:pt-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="space-y-2 animate-fade-in mt-[50px] lg:mt-0">
              {/* Coming soon badge */}
              <div className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 rounded-full border border-[#232176] bg-white/90 backdrop-blur-sm mb-6 shadow-sm">
                <span className="font-medium text-sm sm:text-base" style={{ color: '#232176' }}>
                  coming soon
                </span>
              </div>
              
              {/* Main heading */}
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium leading-tight" style={{
                color: '#3C4247'
              }}>
                  World class medical imaging, coming to
                </h1>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium leading-tight">
                  <span className="bg-gradient-to-r from-[#262262] via-[#B41E8E] to-[#EC008C] bg-clip-text text-transparent">
                    Mickleham's
                  </span>{' '}
                  <span style={{
                  color: '#3C4247'
                }}>doorsteps</span>
                </h1>
              </div>
              
              {/* Subtitle */}
              <p className="text-base sm:text-lg max-w-lg" style={{
              color: '#3C4247',
              marginTop: '24px'
            }}>
                Be the first to know when we are open
              </p>
              
              {/* Email signup */}
              <form onSubmit={handleSubmit} className="relative max-w-md w-full mt-4" style={{
                marginTop: '8px'
              }}>
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 text-base sm:text-lg border-2 border-gray-200 focus:border-purple-400 pr-16 w-full" 
                  required
                />
                <Button 
                  type="submit"
                  size="icon" 
                  disabled={isLoading || !email}
                  className="absolute right-1 top-1 h-10 w-10 bg-blue-900 hover:bg-blue-800 text-white rounded-full transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                >
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </form>

              {/* Team link */}
              <div className="mt-6">
                <button
                  onClick={() => setShowTeamForm(true)}
                  className="text-sm text-gray-600 hover:text-[#232176] transition-colors duration-200 underline underline-offset-2"
                >
                  I want to join the team
                </button>
              </div>
            </div>
            
            {/* Right content - Medical images */}
            <div className="relative mt-8 lg:mt-0">
              <div className="grid grid-cols-2 gap-4 h-80 sm:h-96">
                {/* Left side - Two images stacked vertically */}
                <div className="flex flex-col gap-4">
                  <div className="animate-fade-in flex-1" style={{
                  animationDelay: '0.2s'
                }}>
                    <img src="/lovable-uploads/fc52230e-7547-469f-87a6-4f446ebcec8b.png" alt="Medical professional with patient during MRI scan" className="w-full h-full rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 object-cover lg:object-none" />
                  </div>
                  
                  <div className="animate-fade-in flex-1" style={{
                  animationDelay: '0.6s'
                }}>
                    <img alt="Medical imaging equipment" src="/lovable-uploads/c4ffcbee-4dda-47a2-b1a1-e125e853391d.png" className="w-full h-full rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 object-cover" />
                  </div>
                </div>
                
                {/* Right side - Single image */}
                <div className="animate-fade-in" style={{
                animationDelay: '0.4s'
              }}>
                  <img src="/lovable-uploads/02f4dcfa-52ea-44fb-8b38-ec95718fa3d3.png" alt="Medical professional with young patient near imaging equipment" className="w-full h-full object-cover rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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

export default HeroSection;
