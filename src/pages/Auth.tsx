import { Auth as SupabaseAuth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import HeadSEO from '@/components/seo/HeadSEO';

const Auth = () => {
  const navigate = useNavigate();
  const { session } = useAuth();

  useEffect(() => {
    if (session) {
      navigate('/');
    }
  }, [session, navigate]);

  return (
    <main className="container mx-auto py-10 px-2 flex justify-center">
      <HeadSEO title="Login / Sign Up" description="Access your ȚOMAPAN Online account." />
      <div className="w-full max-w-md">
        <SupabaseAuth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={[]}
          theme="dark"
          view="sign_in"
          additionalData={{
            sign_up: {
              options: {
                data: {
                  username: 'new_user' // Placeholder, will need a proper username field
                }
              }
            }
          }}
        />
      </div>
    </main>
  );
};

export default Auth;