import { useEffect } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';

interface QuabbleToolsScreenProps {
  onNext: () => void;
}

export function QuabbleToolsScreen({
  onNext
}: QuabbleToolsScreenProps) {

  const tools = [
    { image: '/images/quabble-tool-1.png', name: 'Mood\nDiary' },
    { image: '/images/quabble-tool-2.png', name: 'Meditation' },
    { image: '/images/quabble-tool-3.png', name: 'Bamboo\nForest' },
    { image: '/images/quabble-tool-4.png', name: '1min\nBreathing' },
    { image: '/images/quabble-tool-5.png', name: 'Watermelon\nTai Chi' },
    { image: '/images/quabble-tool-6.png', name: 'Proud\nDandelion' },
    { image: '/images/quabble-tool-7.png', name: 'Gratitude\nJar' },
    { image: '/images/quabble-tool-8.png', name: 'Worry\nBox' },
    { image: '/images/quabble-tool-9.png', name: 'Treasure\nBox' },
    { image: '/images/quabble-tool-10.png', name: 'Safe\nPlace' },
    { image: '/images/quabble-tool-11.png', name: 'Moonlight' },
    { image: '/images/quabble-tool-12.png', name: 'Outdoor\nWalk' },
    { image: '/images/quabble-tool-13.png', name: '54321' },
    { image: '/images/quabble-tool-14.png', name: 'Pleasant\nActivities' },
    { image: '/images/quabble-tool-15.png', name: 'Thank\nYou' },
    { image: '/images/quabble-tool-16.png', name: 'Dear\nSelf' },
    { image: '/images/quabble-tool-17.png', name: 'Smart\nGoals' },
    { image: '/images/quabble-tool-18.png', name: 'Mindful\nEating' }
  ];

  useEffect(() => {
    // Function to be called when the component mounts
    sendToFlutter('{"event":"v2_5_7_onboarding_A::onboarding:quabble_tools:landing"}');
  }, []); 

  return <>
    <div className="flex flex-col w-full h-screen bg-[#D2E5D4] text-gray-800 relative overflow-hidden">
      {/* Content Container - starts at same position as other screens */}
      <div className="flex flex-col items-center px-5 sm:px-6" style={{ paddingTop: 'max(3.5rem, env(safe-area-inset-top))' }}>
        {/* Progress dots */}
        <div className="flex space-x-2 mb-6 sm:mb-10 mt-6">
          <div className="w-2 h-2 rounded-full bg-gray-800"></div>
          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
        </div>
        
        {/* Title and Subtitle */}
        <div className="flex flex-col items-center justify-center mb-10 sm:mb-14 flex-shrink-0">
        <h1 className="font-medium text-center leading-tight mb-3 sm:mb-4" style={{ 
          color: '#4C4A3C',
          fontSize: 'min(6.5vw, 2.25rem)'
        }}>
          Quabble has the right tools
          <br />
          for everyone
        </h1>
        <p className="text-base sm:text-lg lg:text-xl font-normal text-center" style={{ color: '#7B7968' }}>
          18 different workouts across 6 categories
          <br />
          available now and more to come!
        </p>
      </div>
      
      {/* Tools Grid */}
      <div className="flex-1 px-5 sm:px-6 flex justify-center">
        <div className="max-w-md w-full">
          <div 
            className="grid grid-cols-4 gap-1 sm:gap-2 overflow-y-auto"
            style={{ 
              height: 'calc(100vh - 20rem)', // Fixed height for scrollable area
              paddingBottom: '5rem' // More space at bottom of scroll area
            }}
          >
            {tools.map((tool, index) => (
              <div key={index} className="flex flex-col items-center h-36">
                <img
                  src={tool.image}
                  alt={tool.name}
                  className="w-24 h-24 object-contain mb-2"
                />
                <span 
                  className="text-xs text-center leading-tight break-words pb-4"
                  style={{ color: '#7B7968', lineHeight: '1.2', whiteSpace: 'pre-line' }}
                >
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
      
      {/* Next Button - matching FocusScreen layout */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#D2E5D4] z-50" 
           style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
        <div className="p-5 sm:p-6">
          <div className="max-w-md mx-auto">
            <button
              className="w-4/5 mx-auto block px-7 rounded-full text-white text-center font-normal bg-black hover:bg-gray-800 transition-colors shadow-lg touch-target"
              style={{ 
                height: '7.5vh', // Slightly bigger button height (same as option buttons)
                fontSize: '2.5vh' // 1/40 of viewport height
              }}
              onClick={() => {
                sendToFlutter('{"event":"v2_5_7_onboarding_A::onboarding:quabble_tools:click_next"}');
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
        .mb-3 { margin-bottom: 0.5rem; }
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