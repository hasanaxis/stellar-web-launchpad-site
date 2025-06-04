import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
const HeroSection = () => {
  return <div className="min-h-screen relative overflow-hidden flex items-center justify-center" style={{
    background: 'radial-gradient(circle at 95% center, #E8A4D8 8%, #F2C7E3 20%, #FFFFFF 45%)'
  }}>
      <div className="container mx-auto px-6 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8 animate-fade-in">
            {/* Coming soon badge */}
            <div className="inline-flex items-center px-6 py-3 rounded-full border-2 border-purple-600 bg-white/80 backdrop-blur-sm">
              <span className="bg-gradient-to-r from-[#262262] via-[#B41E8E] to-[#EC008C] bg-clip-text text-transparent font-medium">coming soon</span>
            </div>
            
            {/* Main heading */}
            <div className="space-y-4">
              <h1 className="text-5xl font-bold leading-tight text-gray-800 lg:text-[3C4247]">
                World class medical imaging, coming to
              </h1>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-[#262262] via-[#B41E8E] to-[#EC008C] bg-clip-text text-transparent">
                  Mickleham's
                </span>{' '}
                <span className="text-gray-800 text-[3C4247]">doorsteps</span>
              </h1>
            </div>
            
            {/* Subtitle */}
            <p className="text-lg text-gray-600 max-w-lg">
              Be the first to know when we are open
            </p>
            
            {/* Email signup */}
            <div className="relative max-w-md">
              <Input type="email" placeholder="Enter your email" className="h-12 text-lg border-2 border-gray-200 focus:border-purple-400 pr-16" />
              <Button size="icon" className="absolute right-1 top-1 h-10 w-10 bg-blue-900 hover:bg-blue-800 text-white rounded-full transition-all duration-200 hover:scale-105">
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
                  <img src="/lovable-uploads/fc52230e-7547-469f-87a6-4f446ebcec8b.png" alt="Medical professional with patient during MRI scan" className="w-full h-full rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 object-fill" />
                </div>
                
                <div className="animate-fade-in flex-1" style={{
                animationDelay: '0.6s'
              }}>
                  <img alt="Medical imaging equipment" className="w-full h-full object-cover rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105" src="/lovable-uploads/b5af629a-926f-43a9-840f-49922cce91c4.png" />
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