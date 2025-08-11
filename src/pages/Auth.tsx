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
          localization={{
            variables: {
              sign_up: {
                email_label: 'Email address',
                password_label: 'Create a Password',
                button_label: 'Sign up',
                social_provider_text: 'Sign in with {{provider}}',
                link_text: 'Already have an account? Sign in',
                additional_fields: [
                  {
                    type: 'text',
                    label: 'Username',
                    key: 'username',
                    placeholder: 'Choose a username',
                  },
                ],
              },
              sign_in: {
                email_label: 'Email address',
                password_label: 'Your Password',
                button_label: 'Sign in',
                social_provider_text: 'Sign in with {{provider}}',
                link_text: "Don't have an account? Sign up",
              },
            },
          }}
        />
      </div>
    </main>
  );
};

export default Auth;