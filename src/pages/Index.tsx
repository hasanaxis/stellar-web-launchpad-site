
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      
      {/* View Applications Button Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="text-center">
          <Link to="/applications">
            <Button 
              className="bg-[#EC008C] hover:bg-[#EC008C]/90 text-white px-8 py-3 text-lg font-medium"
            >
              <Eye className="w-5 h-5 mr-2" />
              View Applications
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
