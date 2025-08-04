import { useEffect } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';

interface RoutineIntroScreenProps {
  onBack: () => void;
  onNext: () => void;
  onSkip: () => void;
}

export function RoutineIntroScreen({
  onBack,
  onNext,
  onSkip
}: RoutineIntroScreenProps) {

  useEffect(() => {
    // Function to be called when the component mounts
    sendToFlutter('{"event":"v2_5_7_onboarding_A::onboarding:routine_intro:landing"}');
  }, []); 

  const morningIcons = [
    { image: '/images/routine-intro-1.png', alt: 'Morning routine 1' },
    { image: '/images/routine-intro-2.png', alt: 'Morning routine 2' },
    { image: '/images/routine-intro-3.png', alt: 'Morning routine 3' }
  ];

  const eveningIcons = [
    { image: '/images/routine-intro-4.png', alt: 'Evening routine 1' },
    { image: '/images/routine-intro-5.png', alt: 'Evening routine 2' },
    { image: '/images/routine-intro-6.png', alt: 'Evening routine 3' }
  ];

  return <>
    <div className="flex flex-col w-full h-screen bg-[#F5F0E8] text-gray-800 relative overflow-hidden">
      {/* Fixed Header */}
      <div className="flex items-center justify-between pt-safe-top px-5 sm:px-6 flex-shrink-0" 
           style={{ paddingTop: 'max(3.5rem, env(safe-area-inset-top))' }}>
        <button className="p-3 touch-target" onClick={onBack} style={{ color: '#7B7968' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 sm:w-8 sm:h-8">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex-1 flex justify-center">
          {/* Progress dots */}
          <div className="flex space-x-2">
            <div className="w-2 h-2 rounded-full bg-gray-400"></div>
            <div className="w-2 h-2 rounded-full bg-gray-400"></div>
            <div className="w-2 h-2 rounded-full bg-gray-400"></div>
            <div className="w-2 h-2 rounded-full bg-gray-800"></div>
          </div>
        </div>
        <button className="p-3 text-lg sm:text-xl font-normal touch-target" onClick={onSkip} style={{ color: '#7B7968' }}>
          Skip
        </button>
      </div>
      
      {/* Content Container */}
      <div className="flex-1 flex flex-col justify-center items-center px-5 sm:px-6">
        {/* Title */}
        <div className="flex flex-col items-center justify-center mb-8 sm:mb-12 text-center max-w-md">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium leading-tight mb-8" style={{ color: '#4C4A3C' }}>
            It delivers bite-sized, personalized daily routines to help you build sustainable habits
          </h1>
        </div>
        
        {/* Morning Section */}
        <div className="flex flex-col items-center mb-8 sm:mb-12">
          <p className="text-base sm:text-lg font-normal text-center mb-6" style={{ color: '#7B7968' }}>
            Start your morning
            <br />
            with a positive mindset
          </p>
          <div className="flex space-x-4 sm:space-x-6">
            {morningIcons.map((icon, index) => (
              <div key={index} className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                <img
                  src={icon.image}
                  alt={icon.alt}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Evening Section */}
        <div className="flex flex-col items-center mb-8 sm:mb-12">
          <p className="text-base sm:text-lg font-normal text-center mb-6" style={{ color: '#7B7968' }}>
            End your day
            <br />
            with a kind reflection
          </p>
          <div className="flex space-x-4 sm:space-x-6">
            {eveningIcons.map((icon, index) => (
              <div key={index} className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                <img
                  src={icon.image}
                  alt={icon.alt}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* I'm Ready Button */}
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
                sendToFlutter('{"event":"v2_5_7_onboarding_A::onboarding:routine_intro:click_ready"}');
                onNext();
              }}
            >
              I'm Ready
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