import { useState, useEffect } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';
import { useLanguage } from '../contexts/LanguageContext';

interface SorryToHeartScreenProps {
  onBack: () => void;
  onNext: () => void;
  onSkip: () => void;
}

export function SorryToHeartScreen({
  onBack,
  onNext,
  onSkip
}: SorryToHeartScreenProps) {
  const { t } = useLanguage();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
  const options = [
    { key: 'sorry.breakupRelationship', systemName: 'relationship_stress' },
    { key: 'sorry.careerAcademic', systemName: 'career_pressure' },
    { key: 'sorry.healthIssues', systemName: 'health_issues' },
    { key: 'sorry.burnout', systemName: 'burnout' },
    { key: 'sorry.loneliness2', systemName: 'loneliness' },
    { key: 'sorry.loss', systemName: 'loss' },
    { key: 'sorry.somethingElse', systemName: 'something_else' },
    { key: 'sorry.nothingSpecific', systemName: 'nothing_specific' }
  ];
  
  // Create a mapping from option keys to system names
  const getSystemName = (optionKey: string): string | null => {
    const option = options.find(opt => opt.key === optionKey);
    return option ? option.systemName : null;
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    // Send the new event for onboarding survey
    sendToFlutter(JSON.stringify({
      "event": "view_ob_survey_what_is_going_on",
      "eventProperties": {
        "onboarding_version": 4.0
      }
    }));
  }, []); 

  return <>
    <style>{`
      .scrollable-options::-webkit-scrollbar {
        display: none;
      }
    `}</style>
    <div className="flex flex-col w-full h-screen bg-[#faf7f0] text-gray-800 relative overflow-hidden">
      {/* Fixed Header - Moderately sized */}
      <div className="flex items-center justify-between pt-safe-top px-5 sm:px-6 flex-shrink-0" 
           style={{ paddingTop: 'max(3.5rem, env(safe-area-inset-top))' }}>
        <button className="p-3 touch-target" onClick={onBack} style={{ color: '#7B7968' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 sm:w-8 sm:h-8">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex-1"></div>
        {/* <button className="p-3 text-lg sm:text-xl font-normal touch-target" onClick={onSkip} style={{ color: '#7B7968' }}>
          Skip
        </button> */}
      </div>
      
      {/* Title - with padding */}
      <div className="flex flex-col items-center justify-center mb-4 sm:mb-5 px-5 flex-shrink-0 mt-4">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-center leading-tight mb-2 sm:mb-3" style={{ color: '#4C4A3C' }}>
          {t('sorry.fullTitle').split('\n').map((line, index) => (
            <span key={index}>
              {line}
              {index < t('sorry.fullTitle').split('\n').length - 1 && <br />}
            </span>
          ))}
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl font-normal text-center" style={{ color: '#7B7968' }}>
          {t('sorry.fullSubtitle')}
        </p>
      </div>
      
      {/* Image with viewport-based padding */}
      <div 
        className="flex justify-center px-5 flex-shrink-0"
        style={{ 
          paddingTop: '0.25vh', /* 1/400 of viewport height */
          paddingBottom: '2vh'  /* 1/50 of viewport height */
        }}
      >
        <div
          className="w-full max-w-sm sm:max-w-md lg:max-w-lg"
          style={{ height: '20vh' }}          /* Slightly smaller image */
        >
          <img
            src="/images/sorry-to-hear-duck.png"
            alt="Sorry to hear illustration"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      
      {/* Option Buttons with bigger text */}
      <div 
        className="flex-1 overflow-y-auto scrollable-options" 
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          paddingBottom: '9rem', // Space for fixed button
          paddingLeft: '8vw', // 1/12.5 of viewport width
          paddingRight: '8vw' // 1/12.5 of viewport width
        }}
      >
        <div className="w-full max-w-md mx-auto space-y-3 sm:space-y-4">
          {options.map(option => (
            <button 
              key={option.key} 
              className={`w-full px-6 sm:px-7 rounded-full text-center font-normal transition-colors touch-target ${
                selectedOption === option.key 
                  ? 'bg-[#f2994a] text-white' 
                  : 'bg-white border-2'
              }`}
              style={{ 
                color: selectedOption === option.key ? 'white' : '#4C4A3C',
                borderColor: selectedOption === option.key ? 'transparent' : '#E1E0D3',
                height: '7.5vh', // Slightly bigger button height
                fontSize: '2.2vh' // Slightly smaller text
              }}
              onClick={() => handleOptionClick(option.key)}
            >
              {t(option.key)}
            </button>
          ))}
        </div>
      </div>
      
      {/* Next Button - only show when option is selected */}
      {selectedOption && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#faf7f0] z-50 slide-up-animation" 
             style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
          <div className="p-5 sm:p-6" style={{ paddingLeft: '8vw', paddingRight: '8vw' }}>
            <div className="max-w-md mx-auto">
              <button
                className="w-full mx-auto block px-7 rounded-full text-white text-center font-normal bg-black hover:bg-gray-800 transition-colors shadow-lg touch-target"
                style={{ 
                  height: '7.5vh', // Slightly bigger button height (same as option buttons)
                  fontSize: '2.5vh' // 1/40 of viewport height
                }}
                onClick={() => {
                  // Get system name for selected option
                  const systemName = selectedOption ? getSystemName(selectedOption) : null;
                  
                  sendToFlutter(JSON.stringify({
                    "event": "click_next_ob_survey_what_is_going_on",
                    "eventProperties": {
                      "onboarding_version": 4.0,
                      "survey_what_is_going_on": systemName || selectedOption || ""
                    }
                  }));
                  onNext();
                }}
              >
                {t('next')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    
    <style>{`
      .slide-up-animation {
        animation: slideUpFromBottom 0.2s ease-out forwards;
      }
      
      @keyframes slideUpFromBottom {
        from {
          transform: translateY(100%);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }
      
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
  </>;
}