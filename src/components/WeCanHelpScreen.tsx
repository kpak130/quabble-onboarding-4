import { useEffect } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';
import { useLanguage } from '../contexts/LanguageContext';

interface WeCanHelpScreenProps {
  onBack: () => void;
  onNext: () => void;
  onSkip: () => void;
  achievementSelection?: string | null;
  cameFromYesPath?: boolean;
  fromHaveMentalIssueYes?: boolean;
  userFeelingChoice?: 'difficult_recently' | 'ongoing_challenges' | 'doing_okay' | null;
}

export function WeCanHelpScreen({
  onBack,
  onNext,
  onSkip,
  achievementSelection,
  cameFromYesPath,
  fromHaveMentalIssueYes,
  userFeelingChoice
}: WeCanHelpScreenProps) {
  const { t } = useLanguage();

  useEffect(() => {
    // Send the new event for onboarding survey
    sendToFlutter(JSON.stringify({
      "event": "view_ob_info_quabble_here_to_help",
      "eventProperties": {
        "onboarding_version": 4.0
      }
    }));
  }, []); 

  return <>
    <div 
      className="flex flex-col w-full h-screen text-white relative overflow-hidden"
      style={{
        backgroundImage: 'url(/images/we-can-help-background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Fixed Header */}
      <div className="flex items-center justify-between pt-safe-top px-5 sm:px-6 flex-shrink-0" 
           style={{ paddingTop: 'max(3.5rem, env(safe-area-inset-top))' }}>
        <button className="p-3 touch-target" onClick={onBack} style={{ color: '#FFFFFF' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 sm:w-8 sm:h-8">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex-1"></div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-start px-6 sm:px-8 pt-4 sm:pt-6" style={{ paddingBottom: '9rem' }}>
        {/* Message Text */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-medium leading-relaxed text-white">
            {fromHaveMentalIssueYes ? (
              // HaveMentalIssueScreen "Yes" → "While professional care..." message
              t('weCanHelp.messageGeneral').split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  {index < t('weCanHelp.messageGeneral').split('\n').length - 1 && <br />}
                </span>
              ))
            ) : userFeelingChoice === 'ongoing_challenges' ? (
              // AskFeelingV2Screen "ongoing_challenges" (2nd option) → "While professional care..." message
              t('weCanHelp.messageGeneral').split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  {index < t('weCanHelp.messageGeneral').split('\n').length - 1 && <br />}
                </span>
              ))
            ) : fromHaveMentalIssueYes === false && achievementSelection ? (
              // HaveMentalIssueScreen "No" with achievement → "We're here to help you..." message
              t('weCanHelp.messagePersonalized').replace('{achievement}', achievementSelection.toLowerCase()).split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  {index < t('weCanHelp.messagePersonalized').replace('{achievement}', achievementSelection.toLowerCase()).split('\n').length - 1 && <br />}
                </span>
              ))
            ) : cameFromYesPath && achievementSelection ? (
              // Other difficult paths with achievement → "We're here to help you..." message
              t('weCanHelp.messagePersonalized').replace('{achievement}', achievementSelection.toLowerCase()).split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  {index < t('weCanHelp.messagePersonalized').replace('{achievement}', achievementSelection.toLowerCase()).split('\n').length - 1 && <br />}
                </span>
              ))
            ) : achievementSelection ? (
              // AskFeelingV2Screen "doing_okay" with achievement → "So glad to hear that!" message
              t('weCanHelp.messageDoingOkay').replace('{achievement}', achievementSelection.toLowerCase()).split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  {index < t('weCanHelp.messageDoingOkay').replace('{achievement}', achievementSelection.toLowerCase()).split('\n').length - 1 && <br />}
                </span>
              ))
            ) : (
              // Default fallback
              t('weCanHelp.messageGeneral').split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  {index < t('weCanHelp.messageGeneral').split('\n').length - 1 && <br />}
                </span>
              ))
            )}
          </h1>
        </div>
      </div>
      
      {/* Next Button - matching WhereDidYouHearAboutUs layout */}
      <div className="fixed bottom-0 left-0 right-0 z-50" 
           style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
        <div className="p-5 sm:p-6" style={{ paddingLeft: '8vw', paddingRight: '8vw' }}>
          <div className="max-w-md mx-auto">
            <button
              className="w-full mx-auto block px-7 rounded-full text-white text-center font-normal transition-colors shadow-lg touch-target"
              style={{ 
                backgroundColor: '#f2994a',
                height: '7.5vh', // Slightly bigger button height (same as option buttons)
                fontSize: '2.5vh' // 1/40 of viewport height
              }}
              onClick={() => {
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
    `}</style>
  </>;
}