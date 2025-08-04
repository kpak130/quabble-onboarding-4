import React, { useEffect } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';

interface StatsScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export function StatsScreen({ onBack, onNext }: StatsScreenProps) {
  useEffect(() => {
    sendToFlutter('{"event":"v2_5_7_onboarding_A::onboarding:stats_screen:landing"}');
  }, []);

  return (
    <div className="flex flex-col w-full h-screen bg-[#F5F0E8] text-gray-800 relative overflow-hidden">
      <div className="flex flex-col items-center px-5 sm:px-6" style={{ paddingTop: '5vh' }}>
        <div className="flex items-center justify-between w-full mb-8 sm:mb-12">
          <button className="p-2 text-gray-800" onClick={onBack}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="flex-1"></div>
        </div>

        <div className="flex flex-col items-center justify-center mb-20 sm:mb-24 text-center max-w-sm">
          <h1 className="font-medium leading-tight" style={{ 
            color: '#4C4A3C',
            fontSize: 'min(6.5vw, 2.25rem)'
          }}>
            98% of our regular users
            <br />
            reported Quabble helps
            <br />
            managing their mental health
          </h1>
        </div>

        <div className="flex items-center justify-center mb-8">
          <img
            src="/images/98stat.png"
            alt="98% Statistics"
            className="w-full h-auto object-contain"
            style={{ 
              maxWidth: 'min(120vw, 900px)',
              maxHeight: 'min(95vh, 850px)'
            }}
          />
        </div>
      </div>

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
                sendToFlutter('{"event":"v2_5_7_onboarding_A::onboarding:stats_screen:click_next"}');
                onNext();
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}