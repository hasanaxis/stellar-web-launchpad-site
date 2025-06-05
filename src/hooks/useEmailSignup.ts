
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useEmailSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const signupEmail = async (email: string) => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('email_signups')
        .insert([{ email }]);

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast({
            title: "Already signed up!",
            description: "This email is already on our list. We'll notify you when we launch!",
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Success!",
          description: "Thanks for signing up! We'll notify you when we launch.",
        });
      }
      
      return { success: true };
    } catch (error) {
      console.error('Error signing up email:', error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  return { signupEmail, isLoading };
};
