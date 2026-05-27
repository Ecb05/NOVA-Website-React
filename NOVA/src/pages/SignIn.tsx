import { SignIn, SignUp } from '@clerk/clerk-react';

export function SignInPage() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '2rem',
        background: 'linear-gradient(135deg, #05070a, #0b2f2a, #1a1b3a)',
      }}
    >
      <SignIn
        appearance={{
          elements: {
            rootBox: {
              width: '100%',
              maxWidth: '420px',
            },
            card: {
              backgroundColor: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            },
            headerTitle: {
              color: '#ffffff',
              fontSize: '1.5rem',
            },
            headerSubtitle: {
              color: 'rgba(255,255,255,0.6)',
            },
            formFieldLabel: {
              color: 'rgba(255,255,255,0.8)',
            },
            formFieldInput: {
              backgroundColor: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#ffffff',
              borderRadius: '8px',
            },
            formButtonPrimary: {
              backgroundColor: '#0b2f2a',
              borderRadius: '8px',
              fontSize: '0.95rem',
              fontWeight: 600,
              transition: 'all 0.2s ease',
            },
            footerActionLink: {
              color: '#4ade80',
            },
            identityPreviewText: {
              color: 'rgba(255,255,255,0.7)',
            },
            identityPreviewEditButton: {
              color: '#4ade80',
            },
          },
        }}
        path="/sign-in"
        signUpUrl="/sign-up"
        afterSignInUrl="/"
        afterSignUpUrl="/"
      />
    </div>
  );
}

export function SignUpPage() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '2rem',
        background: 'linear-gradient(135deg, #05070a, #0b2f2a, #1a1b3a)',
      }}
    >
      <SignUp
        appearance={{
          elements: {
            rootBox: {
              width: '100%',
              maxWidth: '420px',
            },
            card: {
              backgroundColor: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            },
            headerTitle: {
              color: '#ffffff',
              fontSize: '1.5rem',
            },
            headerSubtitle: {
              color: 'rgba(255,255,255,0.6)',
            },
            formFieldLabel: {
              color: 'rgba(255,255,255,0.8)',
            },
            formFieldInput: {
              backgroundColor: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#ffffff',
              borderRadius: '8px',
            },
            formButtonPrimary: {
              backgroundColor: '#0b2f2a',
              borderRadius: '8px',
              fontSize: '0.95rem',
              fontWeight: 600,
              transition: 'all 0.2s ease',
            },
            footerActionLink: {
              color: '#4ade80',
            },
          },
        }}
        path="/sign-up"
        signInUrl="/sign-in"
        afterSignInUrl="/"
        afterSignUpUrl="/"
      />
    </div>
  );
}
