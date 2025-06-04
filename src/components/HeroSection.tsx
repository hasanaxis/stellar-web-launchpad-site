
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const HeroSection = () => {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8 animate-fade-in">
            {/* Coming soon badge */}
            <div className="inline-flex items-center px-6 py-3 rounded-full border-2 border-purple-300 bg-white/80 backdrop-blur-sm">
              <span className="text-purple-600 font-medium">coming soon</span>
            </div>
            
            {/* Main heading */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                World class medical imaging, coming to
              </h1>
              <h1 className="text-5xl lg:text-6xl font-bold text-purple-600 leading-tight">
                Mickleham's{' '}
                <span className="text-gray-800">doorsteps</span>
              </h1>
            </div>
            
            {/* Subtitle */}
            <p className="text-lg text-gray-600 max-w-lg">
              Be the first to know when we are open
            </p>
            
            {/* Email signup */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-md">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 h-12 text-lg border-2 border-gray-200 focus:border-purple-400" 
              />
              <Button 
                size="lg" 
                className="h-12 px-8 bg-blue-900 hover:bg-blue-800 text-white rounded-full transition-all duration-200 hover:scale-105"
              >
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
          
          {/* Right content - Medical images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4 h-96">
              {/* Left side - Two images stacked vertically */}
              <div className="flex flex-col gap-4">
                <div className="animate-fade-in flex-1" style={{
                  animationDelay: '0.2s'
                }}>
                  <img 
                    src="/lovable-uploads/fc52230e-7547-469f-87a6-4f446ebcec8b.png" 
                    alt="Medical professional with patient during MRI scan" 
                    className="w-full h-full object-cover rounded-2xl" 
                  />
                </div>
                
                <div className="animate-fade-in flex-1" style={{
                  animationDelay: '0.6s'
                }}>
                  <img 
                    src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop" 
                    alt="Medical imaging equipment" 
                    className="w-full h-full object-cover rounded-2xl" 
                  />
                </div>
              </div>
              
              {/* Right side - Single image */}
              <div className="animate-fade-in" style={{
                animationDelay: '0.4s'
              }}>
                <img 
                  src="/lovable-uploads/783d256a-bd50-4545-b7eb-0b7cde529d06.png" 
                  alt="Medical professional with young patient near imaging equipment" 
                  className="w-full h-full object-cover rounded-2xl" 
                />
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-purple-200 rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-pink-200 rounded-full opacity-40 animate-pulse" style={{
              animationDelay: '1s'
            }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
