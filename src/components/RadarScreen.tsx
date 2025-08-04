import { useEffect } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';

interface RadarScreenProps {
  onNext: () => void;
}

export function RadarScreen({
  onNext
}: RadarScreenProps) {

  useEffect(() => {
    // Function to be called when the component mounts
    sendToFlutter('{"event":"v2_5_7_onboarding_A::onboarding:radar:landing"}');
  }, []); 

  return <>
    <div className="flex flex-col w-full h-screen bg-[#F5F0E8] text-gray-800 relative overflow-hidden">
      {/* Content Container - starts at 8% from top */}
      <div className="flex flex-col items-center px-5 sm:px-6" style={{ paddingTop: '8vh' }}>
        {/* Progress dots */}
        <div className="flex space-x-2 mb-8 sm:mb-12">
          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
          <div className="w-2 h-2 rounded-full bg-gray-800"></div>
        </div>
        
        {/* Title and Subtitle */}
        <div className="flex flex-col items-center justify-center mb-8 sm:mb-12 text-center max-w-sm">
          <h1 className="font-medium leading-tight mb-4 sm:mb-6" style={{ 
            color: '#4C4A3C',
            fontSize: 'min(6.5vw, 2.25rem)'
          }}>
            Quabble takes a holistic
            <br />
            approach to mental health
          </h1>
          <p className="text-base sm:text-lg font-normal leading-relaxed" style={{ color: '#7B7968' }}>
            Our mind and body are deeply connected, and lasting mental health can only come from caring for all areas of life.
          </p>
        </div>
        
        {/* Radar Chart */}
        <div className="flex flex-col items-center justify-center mb-6">
          <img
            src="/images/radar.png"
            alt="Wellness Radar Chart"
            className="w-full h-auto object-contain mb-6"
            style={{ 
              maxWidth: 'min(75vw, 400px)',
              maxHeight: 'min(45vh, 350px)'
            }}
          />
          <p className="text-base sm:text-lg font-normal text-center leading-relaxed" style={{ color: '#7B7968' }}>
            Measure your progress with
            <br />
            our Wellness Radar!
          </p>
        </div>
      </div>
      
      {/* Next Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#F5F0E8] z-50" 
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
                sendToFlutter('{"event":"v2_5_7_onboarding_A::onboarding:radar:click_next"}');
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
        .mb-6 { margin-bottom: 1rem; }
        .mb-8 { margin-bottom: 1.5rem; }
        .mb-4 { margin-bottom: 0.75rem; }
      }
      
      @media (min-width: 768px) {
        .text-2xl { font-size: 2rem; }
        .text-3xl { font-size: 2.25rem; }
        .text-xl { font-size: 1.5rem; }
      }
    `}</style>
  </>;
}