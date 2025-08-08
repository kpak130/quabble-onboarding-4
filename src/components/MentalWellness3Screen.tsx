import { useEffect, useState } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';
import { useLanguage } from '../contexts/LanguageContext';

interface MentalWellness3ScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export function MentalWellness3Screen({
  onBack,
  onNext
}: MentalWellness3ScreenProps) {
  const { t } = useLanguage();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // sendToFlutter('{"event":"v2_5_7_onboarding_A::onboarding:page_4:landing"}');
    
    // Event listener for 'sign-in-complete' event from Flutter
    const handleSignInComplete = (event: any) => {
      // console.log('Sign-in complete event received from Flutter');
      // console.log('Event payload:', event.detail); // Log the payload
      
      // Access the payload data
      const payload = event.detail;
      const userId = payload.userid;
      const token = payload.accessToken;
      /*
      Future<void> _sendSignInCompleteEventToWeb() async {
        final authProvider = context.read<AuthProvider>();
        final userProvider = context.read<UserProvider>();
        final data = {
          'userId': userProvider.me.id,
          'accessToken': authProvider.getAccessToken(),
        };
        final String jsCode = """
          const event = new CustomEvent('sign-in-complete', {
            detail: ${jsonEncode(data)}
          });
          window.dispatchEvent(event);
          console.log('Flutter dispatched sign-in-complete event with data');
        """;
      }
      */

      setIsSigningIn(false);
      setError(null);
      onNext(); // Continue to next screen
    };

    // Listen for the 'sign-in-complete' event
    window.addEventListener('sign-in-complete', handleSignInComplete);
    
    // Cleanup event listener when component unmounts
    return () => {
      window.removeEventListener('sign-in-complete', handleSignInComplete);
    };
  }, [onNext]); 

  return (
    <>
    <div className="flex flex-col w-full min-h-screen relative overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: 'url(/images/12-background.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      {/* Overlay content */}
      <div className="relative z-10 flex flex-col w-full min-h-screen px-4">
        {/* Header */}
        <div className="flex items-center justify-between mt-16 mb-8">
          <div className="flex-1"></div>
          <button 
            className="w-8 h-8 text-xs font-normal text-gray-400 bg-white/20 backdrop-blur-sm rounded-full border border-gray-200/30 hover:bg-white/30 hover:text-gray-500 transition-all"
            onClick={onNext}
          >
            P
          </button>
        </div>

        {/* Main content */}
        <div className="flex flex-col items-center flex-1" style={{ paddingBottom: '9rem' }}>
          {/* Main text positioned very high from top */}
          <div className="text-center mb-2 px-4" style={{ marginTop: '-1vh' }}>
            <h1 className="font-medium text-gray-800 leading-normal" style={{ fontSize: '3vh' }}>
              {t('mentalWellness3.statistic').split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  {index < t('mentalWellness3.statistic').split('\n').length - 1 && <br />}
                </span>
              ))}
            </h1>
          </div>
          
          {/* Error message */}
          {error && (
            <div className="text-center px-4 mt-4">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
        </div>

        {/* Next Button - same format as FocusScreen */}
        <div className="fixed bottom-0 left-0 right-0 z-50" 
             style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
          <div className="p-5 sm:p-6">
            <div className="max-w-md mx-auto">
              <button
                className={`w-4/5 mx-auto block px-7 rounded-full text-white text-center font-normal transition-colors shadow-lg touch-target ${
                  isSigningIn 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : 'bg-black hover:bg-gray-800'
                }`}
                style={{ 
                  height: '7.5vh', // Slightly bigger button height (same as option buttons)
                  fontSize: '2.5vh' // 1/40 of viewport height
                }}
                disabled={isSigningIn}
                onClick={() => {
                  if (!isSigningIn) {
                    setIsSigningIn(true);
                    setError(null);
                    sendToFlutter('{"event":"request-signin"}');
                    // Wait for Flutter to dispatch 'sign-in-complete' event
                  }
                }}
              >
                {isSigningIn ? t('mentalWellness3.signingInButton') : t('next')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <style>{`
      .touch-target {
        min-height: 48px;
        min-width: 48px;
      }
      
      @media (max-width: 375px) {
        .text-2xl { font-size: 1.5rem; }
        .text-3xl { font-size: 1.875rem; }
        .text-xl { font-size: 1.25rem; }
        .text-lg { font-size: 1.125rem; }
      }
      
      @media (max-height: 667px) {
        .space-y-3 > * + * { margin-top: 0.5rem; }
        .space-y-4 > * + * { margin-top: 0.75rem; }
        .mb-4 { margin-bottom: 0.75rem; }
        .mb-5 { margin-bottom: 1rem; }
      }
      
      @media (min-width: 768px) {
        .text-2xl { font-size: 2rem; }
        .text-3xl { font-size: 2.25rem; }
        .text-xl { font-size: 1.5rem; }
      }
    `}</style>
    </>
  );
} 