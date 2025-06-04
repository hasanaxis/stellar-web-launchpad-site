import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
const HeroSection = () => {
  return <div className="min-h-screen relative overflow-hidden flex items-center justify-center" style={{
    background: window.innerWidth <= 768 ? 'radial-gradient(circle at 95% 95%, #E8A4D8 8%, #F2C7E3 20%, #FFFFFF 45%)' : 'radial-gradient(circle at 95% 70%, #E8A4D8 8%, #F2C7E3 20%, #FFFFFF 45%)'
  }}>
      <div className="container mx-auto px-6 py-12 lg:py-20 pt-24 lg:pt-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-2 animate-fade-in mt-[50px] lg:mt-0">
            {/* Coming soon badge */}
            <div className="inline-flex items-center px-3 sm:px-6 sm:py-3 rounded-full border-2 border-purple-600 bg-white/80 backdrop-blur-sm mb-6 py-[5px]">
              <span className="text-base sm:text-lg max-w-lg\" style={{color: '#232176'}}">coming soon</span>
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
              }} className="mt-6">doorsteps</span>
              </h1>
            </div>
            
            {/* Subtitle */}
            <p style={{
            color: '#3C4247'
          }} className="text-base sm:text-lg max-w-lg mt-8 mb-6">
              Be the first to know when we are open
            </p>
            
            {/* Email signup */}
            <div className="relative max-w-md w-full mt-4">
              <Input type="email" placeholder="Enter your email" className="h-12 text-base sm:text-lg border-2 border-gray-200 focus:border-purple-400 pr-16 w-full" />
              <Button size="icon" className="absolute right-1 top-1 h-10 w-10 bg-blue-900 hover:bg-blue-800 text-white rounded-full transition-all duration-200 hover:scale-105">
                <ArrowRight className="w-5 h-5" />
              </Button>
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
    </div>;
};
export default HeroSection;