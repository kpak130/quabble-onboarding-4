import { useEffect } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';

interface TherapistScreenProps {
  onNext: () => void;
}

export function TherapistScreen({
  onNext
}: TherapistScreenProps) {

  useEffect(() => {
    // Function to be called when the component mounts
    sendToFlutter('{"event":"v2_5_7_onboarding_A::onboarding:therapist:landing"}');
  }, []); 

  return <>
    <div className="flex flex-col w-full h-screen bg-[#F2EBC0] text-gray-800 relative overflow-hidden">
      {/* Content Container - starts at same position as QuabbleToolsScreen title */}
      <div className="flex flex-col items-center px-5 sm:px-6" style={{ paddingTop: 'max(3.5rem, env(safe-area-inset-top))' }}>
        {/* Progress dots */}
        <div className="flex space-x-2 mb-8 sm:mb-12 mt-4">
          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
          <div className="w-2 h-2 rounded-full bg-gray-800"></div>
        </div>
        
        {/* Title and Subtitle */}
        <div className="flex flex-col items-center justify-center mb-20 sm:mb-24 text-center max-w-sm">
          <h1 className="font-medium leading-tight mb-4 sm:mb-6" style={{ 
            color: '#4C4A3C',
            fontSize: 'min(6.5vw, 2.25rem)'
          }}>
            It's therapist-recommended
            <br />
            and backed by experts
          </h1>
          <p className="text-base sm:text-lg font-normal leading-relaxed" style={{ color: '#7B7968' }}>
            Quabble brings real wellness practices to daily life—backed by experts like our advisor, Dr. Jung Kim, Assist. Professor of Psychiatry at Harvard Medical School
          </p>
        </div>
        
        {/* Duck Image */}
        <div className="flex items-center justify-center mb-8">
          <img
            src="/images/therapist-duck.png"
            alt="Therapist Duck"
            className="w-full h-auto object-contain"
            style={{ 
              maxWidth: 'min(95vw, 600px)',
              maxHeight: 'min(65vh, 550px)'
            }}
          />
        </div>
      </div>
      
      {/* Next Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#F2EBC0] z-50" 
           style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
        <div className="p-5 sm:p-6">
          <div className="max-w-md mx-auto">
            <button
              className="w-4/5 mx-auto block px-7 rounded-full text-white text-center font-normal bg-black hover:bg-gray-800 transition-colors shadow-lg touch-target"
              style={{ 
                height: '7.5vh',
                fontSize: '2.5vh'
              }}
              onClick={() => {
                sendToFlutter('{"event":"v2_5_7_onboarding_A::onboarding:therapist:click_next"}');
                onNext();
              }}
            >
              Next
            </button>
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
        .mb-8 { margin-bottom: 1.5rem; }
        .mb-12 { margin-bottom: 2rem; }
        .mb-4 { margin-bottom: 0.75rem; }
        .mb-6 { margin-bottom: 1rem; }
      }
      
      @media (min-width: 768px) {
        .text-2xl { font-size: 2rem; }
        .text-3xl { font-size: 2.25rem; }
        .text-xl { font-size: 1.5rem; }
      }
    `}</style>
  </>;
}