
import { supabase } from '@/integrations/supabase/client';

export const uploadResumeSecurely = async (file: File, applicationId: string): Promise<{ url?: string; filename?: string; error?: string }> => {
  try {
    console.log('Starting secure resume upload for application:', applicationId);
    
    // Generate secure filename
    const fileExt = file.name.split('.').pop();
    const secureFilename = `${applicationId}_${Date.now()}.${fileExt}`;
    
    console.log('Uploading file with name:', secureFilename);
    
    // Upload to secure bucket
    const { data, error } = await supabase.storage
      .from('resumes')
      .upload(secureFilename, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Upload error:', error);
      return { error: 'Failed to upload file. Please try again.' };
    }

    console.log('Upload successful, file path:', data.path);

    // Store the file path (not the full URL) so it can be used with signed URLs later
    return {
      url: data.path, // This is the file path we'll store in the database
      filename: file.name
    };
  } catch (error) {
    console.error('Upload error:', error);
    return { error: 'An unexpected error occurred during upload.' };
  }
};

export const getSecureResumeUrl = async (path: string): Promise<string | null> => {
  try {
    console.log('Getting secure URL for path:', path);
    
    const { data, error } = await supabase.storage
      .from('resumes')
      .createSignedUrl(path, 3600); // 1 hour expiry
    
    if (error) {
      console.error('Error creating signed URL:', error);
      return null;
    }
    
    console.log('Signed URL generated successfully');
    return data?.signedUrl || null;
  } catch (error) {
    console.error('Error getting secure URL:', error);
    return null;
  }
};
