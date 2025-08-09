import React, { useEffect } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';
import { useRecommendations } from '../contexts/RecommendationsContext';

interface RoutineRecommendationScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export function RoutineRecommendationScreen({
  onBack,
  onNext
}: RoutineRecommendationScreenProps) {
  const { recommendations, loading } = useRecommendations();

  useEffect(() => {
    // Send the new event for onboarding survey
    sendToFlutter(JSON.stringify({
      "event": "view_ob_ask_recommended_routine",
      "eventProperties": {
        "onboarding_version": 4.0
      }
    }));
  }, []);

  // Get morning and evening routines (1st and 2nd elements)
  const morningRoutine = recommendations?.[0];
  const eveningRoutine = recommendations?.[1];

  // Debug logging
  console.log('🔍 RoutineRecommendationScreen Debug:');
  console.log('loading:', loading);
  console.log('recommendations:', recommendations);
  console.log('recommendations type:', typeof recommendations);
  console.log('recommendations length:', recommendations?.length);
  console.log('morningRoutine:', morningRoutine);
  console.log('morningRoutine type:', typeof morningRoutine);
  console.log('eveningRoutine:', eveningRoutine);
  console.log('eveningRoutine type:', typeof eveningRoutine);

  // Default fallback data
  const defaultMorning = {
    displayName: "Mood Diary",
    smallThumbnailUrl: "/images/24-smoothie.png"
  };
  
  const defaultEvening = {
    displayName: "Gratitude Jar", 
    smallThumbnailUrl: "/images/24-jar.png"
  };

  return (
    <>
    <div className="flex flex-col w-full min-h-screen px-6 relative" style={{ backgroundColor: '#EEECDD' }}>
      {/* Header */}
      <div className="flex items-center justify-between mt-16 mb-8">
        <button className="p-2 text-gray-800" onClick={onBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex-1"></div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 max-w-xs mx-auto w-full" style={{ paddingBottom: '9rem', paddingTop: '5vh' }}>
        {/* Morning Routine */}
        <div className="bg-white rounded-[3rem] p-6 mb-6 shadow-sm">
          <h2 className="text-lg font-medium text-gray-800 mb-6 text-center">
            Morning Routine
          </h2>
          
          <div className="relative flex justify-start items-center ml-8">
            {/* Horizontal line connecting icons */}
            <div className="absolute top-6 left-[40%] transform -translate-x-1/2 w-16 h-0.5" style={{ backgroundColor: '#E1E0D3' }}></div>
            
            {/* Check-in */}
            <div className="flex flex-col items-start relative z-10">
              <div className="w-16 h-16 mb-2">
                <img 
                  src="/images/24-sun.png" 
                  alt="Check-in" 
                  className="w-full h-full object-contain" 
                />
              </div>
              <span className="text-sm text-gray-700">Check-in</span>
            </div>
            
            {/* Morning Routine - Dynamic */}
            <div className="flex flex-col items-center relative z-10 ml-16">
              <div className="w-16 h-16 mb-2">
                <img 
                  src={morningRoutine?.smallThumbnailUrl || defaultMorning.smallThumbnailUrl} 
                  alt={morningRoutine?.displayName || defaultMorning.displayName}
                  className="w-full h-full object-contain" 
                />
              </div>
              <span className="text-sm text-gray-700">
                {morningRoutine?.displayName || defaultMorning.displayName}
                {!morningRoutine && <span className="text-xs text-red-500 block">(fallback)</span>}
              </span>
            </div>
          </div>
        </div>
        
        {/* Evening Routine */}
        <div className="rounded-[3rem] p-6 mb-8" style={{ backgroundColor: '#605D4E' }}>
          <h2 className="text-lg font-medium text-white mb-6 text-center">
            Evening Routine
          </h2>
          
          <div className="relative flex justify-start items-center ml-8">
            {/* Horizontal line connecting icons */}
            <div className="absolute top-6 left-[40%] transform -translate-x-1/2 w-16 h-0.5" style={{ backgroundColor: '#E1E0D3' }}></div>
            
            {/* Check-in */}
            <div className="flex flex-col items-start relative z-10">
              <div className="w-16 h-16 mb-2">
                <img 
                  src="/images/24-moon.png" 
                  alt="Check-in" 
                  className="w-full h-full object-contain" 
                />
              </div>
              <span className="text-sm text-white">Check-in</span>
            </div>
            
            {/* Evening Routine - Dynamic */}
            <div className="flex flex-col items-center relative z-10 ml-16">
              <div className="w-16 h-16 mb-2">
                <img 
                  src={eveningRoutine?.smallThumbnailUrl || defaultEvening.smallThumbnailUrl} 
                  alt={eveningRoutine?.displayName || defaultEvening.displayName}
                  className="w-full h-full object-contain" 
                />
              </div>
              <span className="text-sm text-white">
                {eveningRoutine?.displayName || defaultEvening.displayName}
                {!eveningRoutine && <span className="text-xs text-red-300 block">(fallback)</span>}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Change later text - stationary above button */}
      <div className="fixed bottom-20 left-0 right-0 z-40">
        <div className="text-center">
          <p className="text-orange-500 text-sm">
            You can change this later
          </p>
        </div>
      </div>

      {/* Okay Button - same format as FocusScreen */}
      <div className="fixed bottom-0 left-0 right-0 z-50" 
           style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
        <div className="p-5 sm:p-6">
          <div className="max-w-md mx-auto">
            <button
              className="w-4/5 mx-auto block px-7 rounded-full text-white text-center font-normal bg-black hover:bg-gray-800 transition-colors shadow-lg touch-target"
              style={{ 
                height: '7.5vh', // Slightly bigger button height (same as option buttons)
                fontSize: '2.5vh' // 1/40 of viewport height
              }}
              onClick={onNext}
            >
              Okay
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