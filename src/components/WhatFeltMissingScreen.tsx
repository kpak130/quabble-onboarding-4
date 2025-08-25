import { useState, useEffect } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';
import { useLanguage } from '../contexts/LanguageContext';

interface WhatFeltMissingScreenProps {
  onBack: () => void;
  onNext: () => void;
  onSkip: () => void;
}

export function WhatFeltMissingScreen({
  onBack,
  onNext,
  onSkip
}: WhatFeltMissingScreenProps) {
  const { t } = useLanguage();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  
  const options = [
    { key: 'whatFeltMissing.couldntStayConsistent', systemName: 'couldnt_stay_consistent' },
    { key: 'whatFeltMissing.overwhelming', systemName: 'overwhelming_hard_to_follow' },
    { key: 'whatFeltMissing.tooExpensive', systemName: 'too_expensive' },
    { key: 'whatFeltMissing.noSocialSupport', systemName: 'no_social_support' },
    { key: 'whatFeltMissing.feltImpersonal', systemName: 'felt_impersonal_generic' },
    { key: 'whatFeltMissing.actuallyLiked', systemName: 'actually_liked_some' }
  ];
  
  // Create a mapping from option keys to system names
  const getSystemName = (optionKey: string): string | null => {
    const option = options.find(opt => opt.key === optionKey);
    return option ? option.systemName : null;
  };

  const handleOptionClick = (option: string) => {
    setSelectedOptions(prev => 
      prev.includes(option) 
        ? prev.filter(o => o !== option)
        : [...prev, option]
    );
  };

  useEffect(() => {
    // Send the new event for onboarding survey
    sendToFlutter(JSON.stringify({
      "event": "view_ob_survey_tried_not_working",
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
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-center leading-tight mb-2 sm:mb-3" style={{ color: '#4C4A3C' }}>
          {t('whatFeltMissing.title').split('\n').map((line, index) => (
            <span key={index}>
              {line}
              {index < t('whatFeltMissing.title').split('\n').length - 1 && <br />}
            </span>
          ))}
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl font-normal text-center" style={{ color: '#7B7968' }}>
          {t('whatFeltMissing.subtitle')}
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
          style={{ height: '15vh' }}          /* Smaller image */
        >
          <img
            src="/images/3-duck.png"
            alt="What felt missing illustration"
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
                selectedOptions.includes(option.key) 
                  ? 'bg-[#f2994a] text-white' 
                  : 'bg-white border-2'
              }`}
              style={{ 
                color: selectedOptions.includes(option.key) ? 'white' : '#4C4A3C',
                borderColor: selectedOptions.includes(option.key) ? 'transparent' : '#E1E0D3',
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
      
      {/* Next Button - always visible */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#faf7f0] z-50" 
           style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
        <div className="p-5 sm:p-6" style={{ paddingLeft: '8vw', paddingRight: '8vw' }}>
          <div className="max-w-md mx-auto">
            <button
              className={`w-full mx-auto block px-7 rounded-full text-center font-normal transition-colors shadow-lg touch-target ${
                selectedOptions.length > 0 ? 'bg-black hover:bg-gray-800 text-white' : 'text-white'
              }`}
              style={{ 
                height: '7.5vh', // Slightly bigger button height (same as option buttons)
                fontSize: '2.5vh', // 1/40 of viewport height
                backgroundColor: selectedOptions.length > 0 ? undefined : '#BBB8A5'
              }}
              disabled={selectedOptions.length === 0}
              onClick={() => {
                // Get system names for selected options
                const systemNames = selectedOptions.map(option => getSystemName(option)).filter(Boolean);
                sendToFlutter(JSON.stringify({
                  "event": "heptic",
                }));
                sendToFlutter(JSON.stringify({
                  "event": "click_next_ob_survey_tried_not_working",
                  "eventProperties": {
                    "onboarding_version": 4.0
                  },
                  "userProperties": {
                    "survey_tried_not_working": systemNames.join(', ') || selectedOptions.join(', ') || ""
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
  </>;
}