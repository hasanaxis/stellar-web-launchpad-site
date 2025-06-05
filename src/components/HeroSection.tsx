
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEmailSignup } from '@/hooks/useEmailSignup';

const HeroSection = () => {
  const [email, setEmail] = useState('');
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
    <div 
      className="min-h-screen relative overflow-hidden flex items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 25%, #EC4899 50%, #F472B6 75%, #FBBF24 100%)'
      }}
    >
      <div className="container mx-auto px-6 py-12 lg:py-20 pt-24 lg:pt-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-2 animate-fade-in mt-[50px] lg:mt-0">
            {/* Coming soon badge */}
            <div className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 rounded-full border border-white/30 bg-white/20 backdrop-blur-sm mb-6 shadow-sm">
              <span className="font-medium text-sm sm:text-base text-white">
                coming soon
              </span>
            </div>
            
            {/* Main heading */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium leading-tight text-white">
                Bringing world class medical imaging to
              </h1>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium leading-tight">
                <span className="text-white">
                  Mickleham's
                </span>{' '}
                <span className="text-white">doorsteps</span>
              </h1>
            </div>
            
            {/* Subtitle */}
            <p className="text-base sm:text-lg max-w-lg text-white/90" style={{
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
                className="h-12 text-base sm:text-lg border-2 border-white/30 bg-white/20 backdrop-blur-sm focus:border-white/50 pr-16 w-full text-white placeholder:text-white/70" 
                required
              />
              <Button 
                type="submit"
                size="icon" 
                disabled={isLoading || !email}
                className="absolute right-1 top-1 h-10 w-10 bg-white/20 hover:bg-white/30 text-white rounded-full transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 backdrop-blur-sm"
              >
                <ArrowRight className="w-5 h-5" />
              </Button>
            </form>
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
  );
};

export default HeroSection;
