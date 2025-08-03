import React from 'react';

interface RecommendedRoutineIntroScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export function RecommendedRoutineIntroScreen({
  onBack,
  onNext
}: RecommendedRoutineIntroScreenProps) {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#faf7f0] relative">
      {/* Main content - positioned at balanced location */}
      <div className="flex flex-col items-center flex-1 px-8" style={{ paddingBottom: '16rem', paddingTop: '20vh' }}>
        {/* Large circular orange section - responsive size */}
        <div className="relative mb-12" style={{ width: 'min(92vw, 32rem)', height: 'min(92vw, 32rem)' }}>
          {/* Outer light orange circle */}
          <div className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-br from-orange-200 to-orange-300 opacity-40"></div>
          
          {/* Inner orange circle with text */}
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center p-8" style={{ width: 'calc(100% - 2rem)', height: 'calc(100% - 2rem)' }}>
            <div className="text-center">
              <p className="text-white font-medium leading-relaxed" style={{ fontSize: '3vh' }}>
                Here is your<br />
                recommended routine
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Check it out button - closer to duck */}
      <div className="fixed bottom-52 left-0 right-0 flex justify-center z-10">
        <button 
          className="py-6 px-12 font-medium text-2xl hover:text-gray-900 transition-colors"
          style={{ color: '#2d2b2a' }}
          onClick={onNext}
        >
          Check it out &gt;&gt;
        </button>
      </div>

      {/* Duck at bottom - bigger and positioned lower */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center -mb-4" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <img 
          src="/images/15-duck.png" 
          alt="Quabble Duck" 
          className="w-64 h-64 object-contain" 
        />
      </div>
    </div>
  );
} 