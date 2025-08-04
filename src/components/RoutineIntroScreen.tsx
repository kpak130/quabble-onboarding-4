import { useEffect } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';

interface RoutineIntroScreenProps {
  onNext: () => void;
}

export function RoutineIntroScreen({
  onNext
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
    <div className="flex flex-col w-full h-screen bg-[#F4DCC9] text-gray-800 relative overflow-hidden">
      {/* Content Container - starts at same position as QuabbleToolsScreen title */}
      <div className="flex flex-col items-center px-5 sm:px-6" style={{ paddingTop: 'max(3.5rem, env(safe-area-inset-top))' }}>
        {/* Progress dots */}
        <div className="flex space-x-2 mb-6 sm:mb-10 mt-6">
          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
          <div className="w-2 h-2 rounded-full bg-gray-800"></div>
        </div>
        
        {/* Title */}
        <div className="flex flex-col items-center justify-center mb-20 sm:mb-24 text-center max-w-md">
          <h1 className="font-medium leading-tight" style={{ 
            color: '#4C4A3C',
            fontSize: 'min(6.5vw, 2.25rem)'
          }}>
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
          <div className="flex space-x-3 sm:space-x-4">
            {morningIcons.map((icon, index) => (
              <div key={index} className="flex items-center justify-center">
                <img
                  src={icon.image}
                  alt={icon.alt}
                  className="object-contain"
                  style={{ 
                    width: 'min(20vw, 100px)',
                    height: 'min(20vw, 100px)'
                  }}
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
          <div className="flex space-x-3 sm:space-x-4">
            {eveningIcons.map((icon, index) => (
              <div key={index} className="flex items-center justify-center">
                <img
                  src={icon.image}
                  alt={icon.alt}
                  className="object-contain"
                  style={{ 
                    width: 'min(20vw, 100px)',
                    height: 'min(20vw, 100px)'
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* I'm Ready Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-transparent z-50" 
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