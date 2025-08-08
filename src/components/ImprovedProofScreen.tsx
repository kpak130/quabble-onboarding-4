import { useEffect } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';
import { useLanguage } from '../contexts/LanguageContext';

interface ImprovedProofScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export function ImprovedProofScreen({ onBack, onNext }: ImprovedProofScreenProps) {
  const { t } = useLanguage();
  
  useEffect(() => {
    // Send the new event for onboarding survey
    sendToFlutter(JSON.stringify({
      "event": "view_ob_info_quabble_improve_mental",
      "eventProperties": {
        "onboarding_version": 4.0
      }
    }));
  }, []);

  return (
    <div className="flex flex-col w-full h-screen bg-[#F5F0E8] text-gray-800 relative overflow-hidden">
      <div className="flex flex-col items-center px-5 sm:px-6" style={{ paddingTop: '5vh' }}>
        <div className="flex items-center justify-between w-full mb-12 sm:mb-16">
          <button className="p-2 text-gray-800" onClick={onBack}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="flex-1"></div>
        </div>

        <div className="flex flex-col items-center justify-center mb-12 sm:mb-16 text-center max-w-sm">
          <h1 className="font-medium leading-tight" style={{ 
            color: '#4C4A3C',
            fontSize: 'min(6.5vw, 2.25rem)'
          }}>
            {t('improvedProof.title').split('\n').map((line, index) => (
              <span key={index}>
                {line}
                {index < t('improvedProof.title').split('\n').length - 1 && <br />}
              </span>
            ))}
          </h1>
        </div>

        <div className="flex items-center justify-center mb-8">
          <img
            src="/images/87stat.png"
            alt="87% Improved Statistics"
            className="w-full h-auto object-contain"
            style={{ 
              maxWidth: 'min(120vw, 900px)',
              maxHeight: 'min(95vh, 850px)'
            }}
          />
        </div>
      </div>

      {/* Next Button - matching WhereDidYouHearAboutUs layout */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#F5F0E8] z-50" 
           style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
        <div className="p-5 sm:p-6" style={{ paddingLeft: '8vw', paddingRight: '8vw' }}>
          <div className="max-w-md mx-auto">
            <button
              className="w-full mx-auto block px-7 rounded-full text-white text-center font-normal bg-black hover:bg-gray-800 transition-colors shadow-lg touch-target"
              style={{ 
                height: '7.5vh',
                fontSize: '2.5vh'
              }}
              onClick={() => {
                sendToFlutter('{"event":"v2_5_7_onboarding_A::onboarding:improved_proof_screen:click_next"}');
                onNext();
              }}
            >
              {t('next')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}