
import { supabase } from '@/integrations/supabase/client';

export const uploadResumeSecurely = async (file: File, applicationId: string): Promise<{ url?: string; filename?: string; error?: string }> => {
  try {
    // Generate secure filename
    const fileExt = file.name.split('.').pop();
    const secureFilename = `${applicationId}_${Date.now()}.${fileExt}`;
    
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

    // Get signed URL for secure access
    const { data: urlData } = await supabase.storage
      .from('resumes')
      .createSignedUrl(data.path, 3600); // 1 hour expiry

    return {
      url: urlData?.signedUrl,
      filename: file.name
    };
  } catch (error) {
    console.error('Upload error:', error);
    return { error: 'An unexpected error occurred during upload.' };
  }
};

export const getSecureResumeUrl = async (path: string): Promise<string | null> => {
  try {
    const { data } = await supabase.storage
      .from('resumes')
      .createSignedUrl(path, 3600);
    
    return data?.signedUrl || null;
  } catch (error) {
    console.error('Error getting secure URL:', error);
    return null;
  }
};
