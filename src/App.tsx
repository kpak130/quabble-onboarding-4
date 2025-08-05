import { useState, useEffect } from 'react';
import { prefetchImagesForScreen, prefetchAllCriticalImages } from './utils/imagePrefetch';
import { AgeGroupScreen } from './components/AgeGroupScreen';
import { GenderScreen } from './components/GenderScreen';
import { FocusScreen } from './components/FocusScreen';
import { ConfirmationScreen } from './components/ConfirmationScreen';
import { TestimonialsScreen } from './components/TestimonialsScreen';
import { DuckWithJarScreen } from './components/DuckWithJarScreen';
import { MentalWellness1Screen } from './components/MentalWellness1Screen';
import { MentalWellness2Screen } from './components/MentalWellness2Screen';
import { ChartScreen } from './components/ChartScreen';
import { MentalWellness3Screen } from './components/MentalWellness3Screen';
import { SignUpScreen } from './components/SignUpScreen';
import { DuckNamingScreen } from './components/DuckNamingScreen';
import { TellUsIntroScreen } from './components/TellUsIntroScreen';
import { RoutineRecommendationScreen } from './components/RoutineRecommendationScreen';
import { AppFinaleScreen } from './components/AppFinaleScreen';
import { WakeUpScreen } from './components/WakeUpScreen';
import { GoodNightScreen } from './components/GoodNightScreen';
import { MentalWellnessQuestion1 } from './components/MentalWellnessQuestion1';
import { AskFeelingScreen } from './components/AskFeelingScreen';
import { AskInterestsPage } from './components/AskInterestsPage';
import { SupportSystemScreen } from './components/SupportSystemScreen';
import { TransitionWrapper } from './components/TransitionWrapper';
import { WhereDidYouHearAboutUs } from './components/WhereDidYouHearAboutUs';
import { CustomizeRoutineScreen } from './components/CustomizeRoutineScreen';
import { RecommendedRoutineIntroScreen } from './components/RecommendedRoutineIntroScreen';
import { MindQuoteScreen } from './components/MindQuoteScreen';
import { AskFeelingV2Screen } from './components/AskFeelingV2Screen';
import { SorryToHeartScreen } from './components/SorryToHeartScreen';
import { HaveMentalIssueScreen } from './components/HaveMentalIssueScreen';
import { WhatDealingWithScreen } from './components/WhatDealingWithScreen';
import { WeCanHelpScreen } from './components/WeCanHelpScreen';
import { WhatDidYouTryScreen } from './components/WhatDidYouTryScreen';
import { WhatFeltMissingScreen } from './components/WhatFeltMissingScreen';
import { WhyQuabbleScreen } from './components/WhyQuabbleScreen';
import { StatsScreen } from './components/StatsScreen';
import { ImprovedProofScreen } from './components/ImprovedProofScreen';
import { LetsFindOutScreen } from './components/LetsFindOutScreen';
import { WhySoManyScreen } from './components/WhySoManyScreen';
import { QuabbleToolsScreen } from './components/QuabbleToolsScreen';
import { TherapistScreen } from './components/TherapistScreen';
import { RadarScreen } from './components/RadarScreen';
import { RoutineIntroScreen } from './components/RoutineIntroScreen';
import { TestimonialsV2Screen } from './components/TestimonialsV2Screen';
import { AreYouReadyScreen } from './components/AreYouReadyScreen';
import { AchivementScreen } from './components/AchivementScreen';

export function App() {
  const [currentScreen, setCurrentScreen] = useState<'referral' | 'age' | 'duckjar' | 'gender' | 'focus' | 'confirmation' | 'achievement' | 'mindquote' | 'askfeelingv2' | 'sorrytoheart' | 'havementalissue' | 'whatdealingwith' | 'wecanhelp' | 'whatdidyoutry' | 'whatfeltmissing' | 'whyquabble' | 'stats' | 'improvedproof' | 'whysomany' | 'letsfindout' | 'quabbletools' | 'therapist' | 'radar' | 'routineintro' | 'testimonialsv2' | 'areyouready' | 'testimonials' | 'completion' | 'mentalwellness1' | 'mentalwellness2' | 'chart' | 'mentalwellness3' | 'signup' | 'ducknaming' | 'tellusintro' | 'routine' | 'appfinale' | 'wakeup' | 'goodnight' | 'mentalwellnessq1' | 'askfeeling' | 'askinterests' | 'supportsystem' | 'customizeroutine' | 'recommendedroutineintro'>('referral');
  
  // Add transition state
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextScreen, setNextScreen] = useState<typeof currentScreen | null>(null);
  
  // Track user's feeling choice for conditional navigation
  const [userFeelingChoice, setUserFeelingChoice] = useState<'difficult_recently' | 'ongoing_challenges' | 'doing_okay' | null>(null);

  // Check URL parameters on component mount and prefetch critical images  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const step = urlParams.get('step');
    
    if (step === 'post-signin') {
      setCurrentScreen('ducknaming');
    }

    // Prefetch critical images on app load
    prefetchAllCriticalImages();
  }, []);

  // Prefetch images for upcoming screens whenever current screen changes
  useEffect(() => {
    prefetchImagesForScreen(currentScreen);
  }, [currentScreen]);

  const performTransition = (targetScreen: typeof currentScreen) => {
    setIsTransitioning(true);
    setNextScreen(targetScreen);
    // Wait for fade out before changing screen
    setTimeout(() => {
      setCurrentScreen(targetScreen);
      setIsTransitioning(false);
    }, 300);
  };

  // Handle feeling selection and conditional navigation
  const handleFeelingNext = (feelingChoice: 'difficult_recently' | 'ongoing_challenges' | 'doing_okay') => {
    setUserFeelingChoice(feelingChoice);
    
    if (feelingChoice === 'difficult_recently') {
      performTransition('sorrytoheart');
    } else if (feelingChoice === 'ongoing_challenges') {
      performTransition('whatdealingwith');
    } else if (feelingChoice === 'doing_okay') {
      performTransition('wecanhelp');
    }
  };

  // Handle mental issue screen response
  const handleMentalIssueNext = (hasIssue: 'yes' | 'no') => {
    if (hasIssue === 'yes') {
      performTransition('wecanhelp');
    } else {
      // If No, continue with normal flow (what comes after havementalissue normally)
      performTransition('whatdealingwith');
    }
  };
  const handleNext = () => {
    if (currentScreen === 'referral') {
      performTransition('age');
    } else if (currentScreen === 'age') {
      performTransition('mentalwellness3');
    } else if (currentScreen === 'duckjar') {
      performTransition('gender');
    } else if (currentScreen === 'gender') {
      performTransition('focus');
    } else if (currentScreen === 'focus') {
      performTransition('testimonials');
    } else if (currentScreen === 'confirmation') {
      performTransition('achievement');
    } else if (currentScreen === 'achievement') {
      performTransition('mindquote');
    } else if (currentScreen === 'mindquote') {
      performTransition('askfeelingv2');
    } else if (currentScreen === 'sorrytoheart') {
      performTransition('havementalissue');
    } else if (currentScreen === 'whatdealingwith') {
      performTransition('wecanhelp');
    } else if (currentScreen === 'wecanhelp') {
      // Conditional flow based on user's feeling choice
      if (userFeelingChoice === 'ongoing_challenges') {
        performTransition('whatdidyoutry');
      } else if (userFeelingChoice === 'doing_okay' || userFeelingChoice === 'difficult_recently') {
        performTransition('whyquabble');
      } else {
        // Default fallback
        performTransition('whatdidyoutry');
      }
    } else if (currentScreen === 'whatdidyoutry') {
      performTransition('whatfeltmissing');
    } else if (currentScreen === 'whatfeltmissing') {
      performTransition('whyquabble');
    } else if (currentScreen === 'whyquabble') {
      performTransition('stats');
    } else if (currentScreen === 'stats') {
      performTransition('improvedproof');
    } else if (currentScreen === 'improvedproof') {
      performTransition('whysomany');
    } else if (currentScreen === 'whysomany') {
      performTransition('quabbletools');
    } else if (currentScreen === 'letsfindout') {
      performTransition('achievement');
    } else if (currentScreen === 'quabbletools') {
      performTransition('therapist');
    } else if (currentScreen === 'therapist') {
      performTransition('radar');
    } else if (currentScreen === 'radar') {
      performTransition('routineintro');
    } else if (currentScreen === 'routineintro') {
      performTransition('testimonialsv2');
    } else if (currentScreen === 'testimonialsv2') {
      performTransition('areyouready');
    } else if (currentScreen === 'areyouready') {
      performTransition('wakeup');
    } else if (currentScreen === 'testimonials') {
      performTransition('completion');
    } else if (currentScreen === 'completion') {
      performTransition('mentalwellness1');
    } else if (currentScreen === 'mentalwellness1') {
      performTransition('mentalwellness2');
    } else if (currentScreen === 'mentalwellness2') {
      performTransition('chart');
    } else if (currentScreen === 'chart') {
      performTransition('ducknaming');
    } else if (currentScreen === 'mentalwellness3') {
      performTransition('confirmation');
    } else if (currentScreen === 'signup') {
      performTransition('ducknaming');
    } else if (currentScreen === 'ducknaming') {
      performTransition('tellusintro');
    } else if (currentScreen === 'tellusintro') {
      performTransition('wakeup');
    } else if (currentScreen === 'routine') {
      performTransition('gender');
    } else if (currentScreen === 'appfinale') {
      performTransition('wakeup');
    } else if (currentScreen === 'wakeup') {
      performTransition('goodnight');
    } else if (currentScreen === 'goodnight') {
      performTransition('askinterests');
    } else if (currentScreen === 'mentalwellnessq1') {
      performTransition('askfeeling');
    } else if (currentScreen === 'askfeeling') {
      performTransition('askinterests');
    } else if (currentScreen === 'askinterests') {
      performTransition('supportsystem');
    } else if (currentScreen === 'supportsystem') {
      performTransition('customizeroutine');
    } else if (currentScreen === 'customizeroutine') {
      performTransition('recommendedroutineintro');
    } else if (currentScreen === 'recommendedroutineintro') {
      performTransition('routine');
    }
  };
  const handleBack = () => {
    if (currentScreen === 'age') {
      performTransition('referral');
    } else if (currentScreen === 'duckjar') {
      performTransition('age');
    } else if (currentScreen === 'gender') {
      performTransition('routine');



    } else if (currentScreen === 'quabbletools') {
      performTransition('whysomany');
    } else if (currentScreen === 'whysomany') {
      performTransition('improvedproof');
    } else if (currentScreen === 'letsfindout') {
      performTransition('improvedproof');
    } else if (currentScreen === 'improvedproof') {
      performTransition('stats');
    } else if (currentScreen === 'stats') {
      performTransition('whyquabble');
    } else if (currentScreen === 'whyquabble') {
      performTransition('whatfeltmissing');
    } else if (currentScreen === 'whatfeltmissing') {
      performTransition('whatdidyoutry');
    } else if (currentScreen === 'whatdidyoutry') {
      performTransition('wecanhelp');
    } else if (currentScreen === 'wecanhelp') {
      // Conditional back navigation based on user's feeling choice
      if (userFeelingChoice === 'ongoing_challenges') {
        performTransition('whatdealingwith');
      } else if (userFeelingChoice === 'difficult_recently') {
        performTransition('havementalissue');
      } else if (userFeelingChoice === 'doing_okay') {
        performTransition('askfeelingv2');
      } else {
        // Default fallback
        performTransition('askfeelingv2');
      }
    } else if (currentScreen === 'whatdealingwith') {
      performTransition('askfeelingv2');
    } else if (currentScreen === 'havementalissue') {
      performTransition('sorrytoheart');
    } else if (currentScreen === 'sorrytoheart') {
      performTransition('askfeelingv2');
    } else if (currentScreen === 'askfeelingv2') {
      performTransition('mindquote');
    } else if (currentScreen === 'mindquote') {
      performTransition('achievement');
    } else if (currentScreen === 'focus') {
      performTransition('gender');
    } else if (currentScreen === 'achievement') {
      performTransition('letsfindout');
    } else if (currentScreen === 'confirmation') {
      performTransition('mentalwellness3');
    } else if (currentScreen === 'testimonials') {
      performTransition('focus');
    } else if (currentScreen === 'completion') {
      performTransition('testimonials');
    } else if (currentScreen === 'mentalwellness1') {
      performTransition('completion');
    } else if (currentScreen === 'mentalwellness2') {
      performTransition('mentalwellness1');
    } else if (currentScreen === 'chart') {
      performTransition('mentalwellness2');
    } else if (currentScreen === 'mentalwellness3') {
      performTransition('age');
    } else if (currentScreen === 'signup') {
      performTransition('mentalwellness3');
    } else if (currentScreen === 'ducknaming') {
      performTransition('chart');
    } else if (currentScreen === 'tellusintro') {
      performTransition('ducknaming');
    } else if (currentScreen === 'routine') {
      performTransition('recommendedroutineintro');
    } else if (currentScreen === 'appfinale') {
      performTransition('routine');
    } else if (currentScreen === 'wakeup') {
      performTransition('areyouready');
    } else if (currentScreen === 'goodnight') {
      performTransition('wakeup');
    } else if (currentScreen === 'mentalwellnessq1') {
      performTransition('goodnight');
    } else if (currentScreen === 'askfeeling') {
      performTransition('mentalwellnessq1');
    } else if (currentScreen === 'askinterests') {
      performTransition('goodnight');
    } else if (currentScreen === 'supportsystem') {
      performTransition('askinterests');
    } else if (currentScreen === 'customizeroutine') {
      performTransition('supportsystem');
    } else if (currentScreen === 'recommendedroutineintro') {
      performTransition('customizeroutine');
    }
  };
  const handleSkip = () => {
    // Handle skip functionality - move to next screen
    handleNext();
  };
  // Render current screen with transition wrapper
  const renderCurrentScreen = () => {
    if (currentScreen === 'recommendedroutineintro') {
      return <TransitionWrapper show={!isTransitioning}>
          <RecommendedRoutineIntroScreen onBack={handleBack} onNext={handleNext} />
        </TransitionWrapper>;
    }
    if (currentScreen === 'customizeroutine') {
      return <TransitionWrapper show={!isTransitioning}>
          <CustomizeRoutineScreen onBack={handleBack} onNext={handleNext} />
        </TransitionWrapper>;
    }
    if (currentScreen === 'supportsystem') {
      return <TransitionWrapper show={!isTransitioning}>
          <SupportSystemScreen onBack={handleBack} onNext={handleNext} />
        </TransitionWrapper>;
    }
    if (currentScreen === 'askinterests') {
      return <TransitionWrapper show={!isTransitioning}>
          <AskInterestsPage onBack={handleBack} onNext={handleNext} />
        </TransitionWrapper>;
    }
    if (currentScreen === 'askfeeling') {
      return <TransitionWrapper show={!isTransitioning}>
          <AskFeelingScreen onBack={handleBack} onNext={handleNext} />
        </TransitionWrapper>;
    }
    if (currentScreen === 'mentalwellnessq1') {
      return <TransitionWrapper show={!isTransitioning}>
          <MentalWellnessQuestion1 onBack={handleBack} onNext={handleNext} />
        </TransitionWrapper>;
    }
    if (currentScreen === 'goodnight') {
      return <TransitionWrapper show={!isTransitioning}>
          <GoodNightScreen onBack={handleBack} onNext={handleNext} />
        </TransitionWrapper>;
    }
    if (currentScreen === 'wakeup') {
      return <TransitionWrapper show={!isTransitioning}>
          <WakeUpScreen onBack={handleBack} onNext={handleNext} />
        </TransitionWrapper>;
    }
    if (currentScreen === 'appfinale') {
      return <TransitionWrapper show={!isTransitioning}>
          <AppFinaleScreen onBack={handleBack} onNext={handleNext} />
        </TransitionWrapper>;
    }
    if (currentScreen === 'tellusintro') {
      return <TransitionWrapper show={!isTransitioning}>
          <TellUsIntroScreen onNext={handleNext} />
        </TransitionWrapper>;
    }
    if (currentScreen === 'routine') {
      return <TransitionWrapper show={!isTransitioning}>
          <RoutineRecommendationScreen onBack={handleBack} onNext={handleNext} />
        </TransitionWrapper>;
    }
    if (currentScreen === 'ducknaming') {
      return <TransitionWrapper show={!isTransitioning}>
          <DuckNamingScreen onBack={handleBack} onNext={handleNext} />
        </TransitionWrapper>;
    }
    if (currentScreen === 'signup') {
      return <TransitionWrapper show={!isTransitioning}>
          <SignUpScreen onBack={handleBack} onNext={handleNext} />
        </TransitionWrapper>;
    }
    if (currentScreen === 'mentalwellness3') {
      return <TransitionWrapper show={!isTransitioning}>
          <MentalWellness3Screen onBack={handleBack} onNext={handleNext} />
        </TransitionWrapper>;
    }
    if (currentScreen === 'chart') {
      return <TransitionWrapper show={!isTransitioning}>
          <ChartScreen onNext={handleNext} />
        </TransitionWrapper>;
    }
    if (currentScreen === 'mentalwellness2') {
      return <TransitionWrapper show={!isTransitioning}>
          <MentalWellness2Screen onNext={handleNext} />
        </TransitionWrapper>;
    }
    if (currentScreen === 'mentalwellness1') {
      return <TransitionWrapper show={!isTransitioning}>
          <MentalWellness1Screen onNext={handleNext} />
        </TransitionWrapper>;
    }
    if (currentScreen === 'completion') {
      return <TransitionWrapper show={!isTransitioning}>
          <DuckWithJarScreen onNext={handleNext} />
        </TransitionWrapper>;
    }
    if (currentScreen === 'testimonials') {
      return <TransitionWrapper show={!isTransitioning}>
          <TestimonialsScreen onNext={handleNext} />
        </TransitionWrapper>;
    }
    if (currentScreen === 'confirmation') {
      return <TransitionWrapper show={!isTransitioning}>
          <ConfirmationScreen onBack={handleBack} onNext={handleNext} />
        </TransitionWrapper>;
    }
    if (currentScreen === 'achievement') {
      return <TransitionWrapper show={!isTransitioning}>
          <AchivementScreen onBack={handleBack} onNext={handleNext} onSkip={handleSkip} />
        </TransitionWrapper>;
    }
    if (currentScreen === 'mindquote') {
      return <TransitionWrapper show={!isTransitioning}>
          <MindQuoteScreen onNext={handleNext} />
        </TransitionWrapper>;
    }
    if (currentScreen === 'askfeelingv2') {
      return <TransitionWrapper show={!isTransitioning}>
          <AskFeelingV2Screen onBack={handleBack} onNext={handleFeelingNext} onSkip={handleSkip} />
        </TransitionWrapper>;
    }
    if (currentScreen === 'sorrytoheart') {
      return <TransitionWrapper show={!isTransitioning}>
          <SorryToHeartScreen onBack={handleBack} onNext={handleNext} onSkip={handleSkip} />
        </TransitionWrapper>;
    }
    if (currentScreen === 'havementalissue') {
      return <TransitionWrapper show={!isTransitioning}>
          <HaveMentalIssueScreen onBack={handleBack} onNext={handleMentalIssueNext} onSkip={handleSkip} />
        </TransitionWrapper>;
    }
    if (currentScreen === 'whatdealingwith') {
      return <TransitionWrapper show={!isTransitioning}>
          <WhatDealingWithScreen onBack={handleBack} onNext={handleNext} onSkip={handleSkip} />
        </TransitionWrapper>;
    }
    if (currentScreen === 'wecanhelp') {
      return <TransitionWrapper show={!isTransitioning}>
          <WeCanHelpScreen onBack={handleBack} onNext={handleNext} onSkip={handleSkip} />
        </TransitionWrapper>;
    }
    if (currentScreen === 'whatdidyoutry') {
      return <TransitionWrapper show={!isTransitioning}>
          <WhatDidYouTryScreen onBack={handleBack} onNext={handleNext} onSkip={handleSkip} />
        </TransitionWrapper>;
    }
    if (currentScreen === 'whatfeltmissing') {
      return <TransitionWrapper show={!isTransitioning}>
          <WhatFeltMissingScreen onBack={handleBack} onNext={handleNext} onSkip={handleSkip} />
        </TransitionWrapper>;
    }
    if (currentScreen === 'whyquabble') {
      return <TransitionWrapper show={!isTransitioning}>
          <WhyQuabbleScreen onBack={handleBack} onNext={handleNext} />
        </TransitionWrapper>;
    }
    if (currentScreen === 'stats') {
      return <TransitionWrapper show={!isTransitioning}>
          <StatsScreen onBack={handleBack} onNext={handleNext} />
        </TransitionWrapper>;
    }
    if (currentScreen === 'improvedproof') {
      return <TransitionWrapper show={!isTransitioning}>
          <ImprovedProofScreen onBack={handleBack} onNext={handleNext} />
        </TransitionWrapper>;
    }
    if (currentScreen === 'whysomany') {
      return <TransitionWrapper show={!isTransitioning}>
          <WhySoManyScreen onBack={handleBack} onNext={handleNext} />
        </TransitionWrapper>;
    }
    if (currentScreen === 'letsfindout') {
      return <TransitionWrapper show={!isTransitioning}>
          <LetsFindOutScreen onBack={handleBack} onNext={handleNext} />
        </TransitionWrapper>;
    }
    if (currentScreen === 'quabbletools') {
      return <TransitionWrapper show={!isTransitioning}>
          <QuabbleToolsScreen onNext={handleNext} />
        </TransitionWrapper>;
    }
    if (currentScreen === 'therapist') {
      return <TransitionWrapper show={!isTransitioning}>
          <TherapistScreen onNext={handleNext} />
        </TransitionWrapper>;
    }
    if (currentScreen === 'radar') {
      return <TransitionWrapper show={!isTransitioning}>
          <RadarScreen onNext={handleNext} />
        </TransitionWrapper>;
    }
    if (currentScreen === 'routineintro') {
      return <TransitionWrapper show={!isTransitioning}>
          <RoutineIntroScreen onNext={handleNext} />
        </TransitionWrapper>;
    }
    if (currentScreen === 'testimonialsv2') {
      return <TransitionWrapper show={!isTransitioning}>
          <TestimonialsV2Screen onNext={handleNext} />
        </TransitionWrapper>;
    }
    if (currentScreen === 'areyouready') {
      return <TransitionWrapper show={!isTransitioning}>
          <AreYouReadyScreen onYes={handleNext} onMaybeLater={handleNext} />
        </TransitionWrapper>;
    }
    if (currentScreen === 'focus') {
      return <TransitionWrapper show={!isTransitioning}>
          <FocusScreen onBack={handleBack} onNext={handleNext} onSkip={handleSkip} />
        </TransitionWrapper>;
    }
    if (currentScreen === 'gender') {
      return <TransitionWrapper show={!isTransitioning}>
          <GenderScreen onBack={handleBack} onNext={handleNext} onSkip={handleSkip} />
        </TransitionWrapper>;
    }
    if (currentScreen === 'age') {
      return <TransitionWrapper show={!isTransitioning}>
          <AgeGroupScreen onBack={handleBack} onNext={handleNext} onSkip={handleSkip} />
        </TransitionWrapper>;
    }
    if (currentScreen === 'duckjar') {
      return <TransitionWrapper show={!isTransitioning}>
          <DuckWithJarScreen onNext={handleNext} />
        </TransitionWrapper>;
    }
    return <TransitionWrapper show={!isTransitioning}>
        <WhereDidYouHearAboutUs onNext={handleNext} onSkip={handleSkip} />
      </TransitionWrapper>;
  };
  return <div className="relative overflow-hidden">{renderCurrentScreen()}</div>;
}