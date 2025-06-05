import React, { useState } from 'react';
import { X, Upload, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from '@/hooks/use-toast';

interface TeamApplicationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TeamApplicationForm = ({ isOpen, onClose }: TeamApplicationFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
    experience: '',
    qualifications: '',
    availability: '',
    additionalInfo: '',
    resume: null as File | null
  });

  const totalSteps = 4;

  const roles = [
    'Administrative Staff',
    'Radiographer',
    'Sonographer'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 10MB.",
          variant: "destructive",
        });
        return;
      }
      setFormData(prev => ({ ...prev, resume: file }));
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Application submitted!",
        description: "Thank you for your interest. We'll be in touch soon.",
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && formData.phone;
      case 2:
        return formData.role;
      case 3:
        return formData.experience && formData.qualifications && formData.availability;
      case 4:
        return true; // Optional step
      default:
        return false;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Join Our Team</h2>
            <p className="text-sm text-gray-600 mt-1">
              Step {currentStep} of {totalSteps}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-3">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-[#232176] h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="Enter your first name"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Enter your last name"
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter your email address"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Enter your phone number"
                  className="mt-1"
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Role Interest</h3>
              
              <div>
                <Label className="text-base font-medium">Which role are you interested in? *</Label>
                <RadioGroup
                  value={formData.role}
                  onValueChange={(value) => handleInputChange('role', value)}
                  className="mt-3 space-y-2"
                >
                  {roles.map((role) => (
                    <div key={role} className="flex items-center space-x-2">
                      <RadioGroupItem value={role} id={role} />
                      <Label htmlFor={role} className="font-normal cursor-pointer">
                        {role}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Professional Background</h3>
              
              <div>
                <Label htmlFor="experience">Years of Experience *</Label>
                <Input
                  id="experience"
                  value={formData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  placeholder="e.g., 5 years"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="qualifications">Qualifications & Certifications *</Label>
                <Textarea
                  id="qualifications"
                  value={formData.qualifications}
                  onChange={(e) => handleInputChange('qualifications', e.target.value)}
                  placeholder="List your relevant qualifications, certifications, and degrees"
                  className="mt-1 min-h-[100px]"
                />
              </div>

              <div>
                <Label htmlFor="availability">Availability *</Label>
                <Input
                  id="availability"
                  value={formData.availability}
                  onChange={(e) => handleInputChange('availability', e.target.value)}
                  placeholder="e.g., Full-time, Part-time, Weekends"
                  className="mt-1"
                />
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Final Details</h3>
              
              <div>
                <Label htmlFor="resume">Upload Resume</Label>
                <div className="mt-1">
                  <label htmlFor="resume-upload" className="cursor-pointer">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        {formData.resume ? formData.resume.name : 'Click to upload or drag and drop'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX (Max 10MB)</p>
                    </div>
                    <input
                      id="resume-upload"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div>
                <Label htmlFor="additionalInfo">Additional Information</Label>
                <Textarea
                  id="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                  placeholder="Any additional information you'd like to share..."
                  className="mt-1 min-h-[120px]"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          {currentStep < totalSteps ? (
            <Button
              onClick={nextStep}
              disabled={!isStepValid()}
              className="flex items-center gap-2 bg-[#232176] hover:bg-[#1a1a5e]"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-[#232176] hover:bg-[#1a1a5e]"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
