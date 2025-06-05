
import React, { useState, useEffect } from 'react';
import { Download, Eye, Calendar, User, Mail, Phone, Briefcase } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface JobApplication {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role: string;
  experience: string;
  qualifications: string;
  availability: string;
  additional_info?: string;
  resume_url?: string;
  resume_filename?: string;
  created_at: string;
}

export const ApplicationsViewer = () => {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('job_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching applications:', error);
        toast({
          title: "Error loading applications",
          description: "Failed to load job applications. Please try again.",
          variant: "destructive",
        });
        return;
      }

      setApplications(data || []);
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while loading applications.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadResume = async (application: JobApplication) => {
    if (!application.resume_url) {
      toast({
        title: "No resume available",
        description: "This application doesn't have a resume attached.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch(application.resume_url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = application.resume_filename || `${application.first_name}_${application.last_name}_resume.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast({
        title: "Resume downloaded",
        description: `Downloaded ${application.first_name}'s resume successfully.`,
      });
    } catch (error) {
      console.error('Error downloading resume:', error);
      toast({
        title: "Download failed",
        description: "Failed to download the resume. Please try again.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">Loading applications...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Applications</h1>
        <p className="text-gray-600">Manage and review submitted job applications</p>
      </div>

      {applications.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
            <p className="text-gray-600">Applications will appear here when candidates submit them.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {applications.map((application) => (
            <Card key={application.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">
                      {application.first_name} {application.last_name}
                    </CardTitle>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {application.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {application.phone}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(application.created_at)}
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="ml-4">
                    {application.role}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Experience</h4>
                    <p className="text-gray-600">{application.experience}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Availability</h4>
                    <p className="text-gray-600">{application.availability}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-1">Qualifications</h4>
                  <p className="text-gray-600 text-sm">{application.qualifications}</p>
                </div>
                
                {application.additional_info && (
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-1">Additional Information</h4>
                    <p className="text-gray-600 text-sm">{application.additional_info}</p>
                  </div>
                )}
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedApplication(application)}
                    className="flex items-center gap-1"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </Button>
                  
                  {application.resume_url && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadResume(application)}
                      className="flex items-center gap-1"
                    >
                      <Download className="w-4 h-4" />
                      Download Resume
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Detailed View Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-medium text-gray-900">
                Application Details - {selectedApplication.first_name} {selectedApplication.last_name}
              </h2>
              <button
                onClick={() => setSelectedApplication(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Eye className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Personal Information</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Name:</span> {selectedApplication.first_name} {selectedApplication.last_name}</p>
                      <p><span className="font-medium">Email:</span> {selectedApplication.email}</p>
                      <p><span className="font-medium">Phone:</span> {selectedApplication.phone}</p>
                      <p><span className="font-medium">Applied:</span> {formatDate(selectedApplication.created_at)}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Role & Experience</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Position:</span> {selectedApplication.role}</p>
                      <p><span className="font-medium">Experience:</span> {selectedApplication.experience}</p>
                      <p><span className="font-medium">Availability:</span> {selectedApplication.availability}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Qualifications</h3>
                    <p className="text-sm text-gray-600">{selectedApplication.qualifications}</p>
                  </div>
                  
                  {selectedApplication.additional_info && (
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Additional Information</h3>
                      <p className="text-sm text-gray-600">{selectedApplication.additional_info}</p>
                    </div>
                  )}
                  
                  {selectedApplication.resume_url && (
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Resume</h3>
                      <Button
                        onClick={() => downloadResume(selectedApplication)}
                        className="flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Download {selectedApplication.resume_filename || 'Resume'}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
