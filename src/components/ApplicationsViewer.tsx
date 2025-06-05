import React, { useState, useEffect } from 'react';
import { Download, Calendar, User, Mail, Phone, Briefcase } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { getSecureResumeUrl } from '@/utils/secureStorage';

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
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    if (user && isAdmin) {
      fetchApplications();
    } else {
      setLoading(false);
    }
  }, [user, isAdmin]);

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

    if (!isAdmin) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to download resumes.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Get secure signed URL for download
      const secureUrl = await getSecureResumeUrl(application.resume_url);
      
      if (!secureUrl) {
        toast({
          title: "Download failed",
          description: "Unable to generate secure download link.",
          variant: "destructive",
        });
        return;
      }

      // Create download link
      const link = document.createElement('a');
      link.href = secureUrl;
      link.download = application.resume_filename || `${application.first_name}_${application.last_name}_resume.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

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
      month: 'short',
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

  if (!user) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Authentication Required</h1>
          <p className="text-gray-600">Please sign in to view applications.</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to view applications.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Applications</h1>
        <p className="text-gray-600">Review submitted job applications</p>
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
        <Card>
          <CardHeader>
            <CardTitle>Applications ({applications.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Applied</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell className="font-medium">
                      {application.first_name} {application.last_name}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Mail className="w-4 h-4 text-gray-400" />
                        {application.email}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4 text-gray-400" />
                        {application.phone}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{application.role}</Badge>
                    </TableCell>
                    <TableCell>{application.experience}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        {formatDate(application.created_at)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedApplication(application)}
                        >
                          View
                        </Button>
                        {application.resume_url && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => downloadResume(application)}
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
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
                ✕
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
                        disabled={!isAdmin}
                      >
                        <Download className="w-4 h-4" />
                        Download {selectedApplication.resume_filename || 'Resume'}
                      </Button>
                      {!isAdmin && (
                        <p className="text-xs text-gray-500 mt-1">Admin access required to download</p>
                      )}
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
